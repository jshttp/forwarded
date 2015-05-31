/* globals describe, it */

'use strict'

var assert = require('assert')
var forwarded = require('../..')
var request = require('../helpers').createRequestMock
var schemas = require('../../lib/schemas')

var options = {
  schemas: ['xff']
}

describe('xff', function () {
  it('should parse [x-forwarded-for]', function () {
    var result = forwarded(request({
      'x-forwarded-for': '10.10.10.1'
    }), options)

    assert.deepEqual(result.addrs, ['127.0.0.1', '10.10.10.1'])
  })

  it('should parse [x-forwarded-host]', function () {
    var result = forwarded(request({
      'x-forwarded-host': 'mockbin.com'
    }), options)

    assert.deepEqual(result.host, 'mockbin.com')
  })

  it('should parse [x-forwarded-port]', function () {
    var result = forwarded(request({
      'x-forwarded-port': '9000'
    }), options)

    assert.deepEqual(result.port, '9000')
  })

  it('should parse [x-forwarded-proto]', function () {
    var result = forwarded(request({
      'x-forwarded-proto': 'https'
    }), options)

    assert.deepEqual(result.proto, 'https')
  })

  it('should parse [x-forwarded-protocol]', function () {
    var result = forwarded(request({
      'x-forwarded-protocol': 'https'
    }), options)

    assert.deepEqual(result.proto, 'https')
  })

  it('should parse [x-forwarded-ssl]', function () {
    var req = request({
      'x-forwarded-ssl': 'on'
    })

    assert.ok(schemas.xff.protoFn(req))
  })
})
