/* globals describe, it */

'use strict'

var assert = require('assert')
var forwarded = require('../..')
var request = require('../helpers').createRequestMock

var options = {
  schemas: ['x-forwarded']
}

describe('x-forwarded', function () {
  it('should parse [x-forwarded-for]', function () {
    var req = request({'x-forwarded-for': '10.10.10.1'})
    var result = forwarded(req, options)

    assert.deepEqual(result.addrs, ['127.0.0.1', '10.10.10.1'])
  })

  it('should parse [x-forwarded-host]', function () {
    var req = request({'x-forwarded-host': 'mockbin.com'})
    var result = forwarded(req, options)

    assert.deepEqual(result.host, 'mockbin.com')
  })

  it('should parse [x-forwarded-port]', function () {
    var req = request({'x-forwarded-port': '9000'})
    var result = forwarded(req, options)

    assert.deepEqual(result.port, '9000')
  })

  it('should parse [x-forwarded-proto]', function () {
    var req = request({'x-forwarded-proto': 'https'})
    var result = forwarded(req, options)

    assert.deepEqual(result.proto, 'https')
  })

  it('should parse [x-forwarded-protocol]', function () {
    var req = request({'x-forwarded-protocol': 'https'})
    var result = forwarded(req, options)

    assert.deepEqual(result.proto, 'https')
  })

  it('should parse [x-forwarded-ssl]', function () {
    var req = request({'x-forwarded-ssl': 'on'})
    var result = forwarded(req, options)

    assert.deepEqual(result.proto, 'https')
  })
})
