/* globals describe, it */

'use strict'

var assert = require('assert')
var forwarded = require('..')
var request = require('./helpers').createRequestMock

describe('forwarded(req)', function () {
  it('should require http.IncomingMessage', function () {
    assert.throws(forwarded.bind(null), TypeError)
  })

  it('should fail with invalid schemas', function () {
    var options = {
      schemas: [
        'XFFFF'
      ]
    }

    assert.throws(function () { forwarded(request(), options) }, Error)
  })

  it('should not throw an error on a disconnected socket connection', function () {
    var req = request({}, {
      remoteAddress: '127.0.0.1'
    })

    assert.doesNotThrow(function () { forwarded(req) }, Error)
  })

  it('should convert schema names to lowercase', function () {
    var options = {
      schemas: [
        'x-forwarded'
      ]
    }

    var result = forwarded(request({
      'x-forwarded-for': '10.0.0.1'
    }), options)

    assert.deepEqual(result.addrs, ['127.0.0.1', '10.0.0.1'])
  })

  it('should get defaults', function () {
    var result = forwarded(request({
      'host': 'mockbin.com'
    }))

    assert.equal(result.host, 'mockbin.com')
    assert.equal(result.port, '5000')
    assert.deepEqual(result.addrs, ['127.0.0.1'])
    assert.deepEqual(result.proto, 'https')
  })

  it('should set proto=http when connection.encrypted=false', function () {
    var result = forwarded(request({}, {
      encrypted: false,
      remotePort: 5000
    }))

    assert.deepEqual(result.proto, 'http')
  })

  it('should skip blank entries', function () {
    var result = forwarded(request({
      'forwarded': 'for=10.0.0.2,for,for=,for=10.0.0.1'
    }))

    assert.deepEqual(result.addrs, ['127.0.0.1', '10.0.0.1', '10.0.0.2'])
  })

  it('should process all schemas in ordered sequence', function () {
    var options = {
      schemas: [
        'cloudflare',
        'fastly',
        'microsoft',
        'x-real',
        'x-cluster',
        'x-forwarded',
        'z-forwarded',
        'rfc7239'
      ]
    }

    var result = forwarded(request({
      'forwarded': 'for=0.0.0.7',
      'cf-connecting-ip': '0.0.0.1',
      'fastly-client-ip': '0.0.0.2',
      'x-real-ip': '0.0.0.3',
      'x-cluster-client-ip': '0.0.0.4',
      'x-forwarded-for': '0.0.0.5',
      'z-forwarded-for': '0.0.0.6'
    }), options)

    assert.deepEqual(result.addrs, ['127.0.0.1', '0.0.0.1', '0.0.0.2', '0.0.0.3', '0.0.0.4', '0.0.0.5', '0.0.0.6', '0.0.0.7'])
  })
})
