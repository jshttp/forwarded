/* globals describe, it */

'use strict'

var assert = require('assert')
var forwarded = require('../..')
var request = require('../helpers').createRequestMock

var options = {
  schemas: ['x-real']
}

describe('x-real', function () {
  it('should parse [x-real-ip]', function () {
    var req = request({'x-real-ip': '10.10.10.1'})
    var result = forwarded(req, options)

    assert.deepEqual(result.addrs, ['127.0.0.1', '10.10.10.1'])
  })

  it('should parse [x-real-port]', function () {
    var req = request({'x-real-port': '9000'})
    var result = forwarded(req, options)

    assert.deepEqual(result.port, '9000')
  })

  it('should parse [x-real-proto]', function () {
    var req = request({'x-real-proto': 'https'})
    var result = forwarded(req, options)

    assert.deepEqual(result.proto, 'https')
  })

  it('should parse [x-url-scheme]', function () {
    var req = request({'x-url-scheme': 'https'})
    var result = forwarded(req, options)

    assert.deepEqual(result.proto, 'https')
  })
})
