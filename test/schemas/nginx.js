/* globals describe, it */

'use strict'

var assert = require('assert')
var forwarded = require('../..')
var request = require('../helpers').createRequestMock

var options = {
  schemas: ['nginx']
}

describe('nginx', function () {
  it('should parse [x-real-ip]', function () {
    var result = forwarded(request({
      'x-real-ip': '10.10.10.1'
    }), options)

    assert.deepEqual(result.addrs, ['127.0.0.1', '10.10.10.1'])
  })

  it('should parse [x-real-port]', function () {
    var result = forwarded(request({
      'x-real-port': '9000'
    }), options)

    assert.deepEqual(result.port, '9000')
  })

  it('should parse [x-real-proto]', function () {
    var result = forwarded(request({
      'x-real-proto': 'https'
    }), options)

    assert.deepEqual(result.proto, 'https')
  })

  it('should parse [x-url-scheme]', function () {
    var result = forwarded(request({
      'x-url-scheme': 'https'
    }), options)

    assert.deepEqual(result.proto, 'https')
  })
})
