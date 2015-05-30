/* globals describe, it */

'use strict'

var assert = require('assert')
var forwarded = require('../..')
var request = require('../helper')

var options = {
  schemas: ['zscaler']
}

describe('zscaler', function () {
  it('should parse [z-forwarded-for]', function () {
    var result = forwarded(request({
      'z-forwarded-for': '10.10.10.1'
    }), options)

    assert.deepEqual(result.addrs, ['127.0.0.1', '10.10.10.1'])
  })

  it('should parse [z-forwarded-host]', function () {
    var result = forwarded(request({
      'z-forwarded-host': 'mockbin.com'
    }), options)

    assert.deepEqual(result.host, 'mockbin.com')
  })

  it('should parse [z-forwarded-port]', function () {
    var result = forwarded(request({
      'z-forwarded-port': '9000'
    }), options)

    assert.deepEqual(result.port, '9000')
  })

  it('should parse [z-forwarded-proto]', function () {
    var result = forwarded(request({
      'z-forwarded-proto': 'https'
    }), options)

    assert.deepEqual(result.proto, 'https')
  })

  it('should parse [z-forwarded-protocol]', function () {
    var result = forwarded(request({
      'z-forwarded-protocol': 'https'
    }), options)

    assert.deepEqual(result.proto, 'https')
  })
})
