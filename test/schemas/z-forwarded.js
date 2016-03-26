/* globals describe, it */

'use strict'

var assert = require('assert')
var forwarded = require('../..')
var request = require('../helpers').createRequestMock

var options = {
  schemas: ['z-forwarded']
}

describe('z-forwarded', function () {
  it('should parse [z-forwarded-for]', function () {
    var req = request({'z-forwarded-for': '10.10.10.1'})
    var result = forwarded(req, options)

    assert.deepEqual(result.addrs, ['127.0.0.1', '10.10.10.1'])
  })

  it('should parse [z-forwarded-host]', function () {
    var req = request({'z-forwarded-host': 'mockbin.com'})
    var result = forwarded(req, options)

    assert.deepEqual(result.host, 'mockbin.com')
  })

  it('should parse [z-forwarded-port]', function () {
    var req = request({'z-forwarded-port': '9000'})
    var result = forwarded(req, options)

    assert.deepEqual(result.port, '9000')
  })

  it('should parse [z-forwarded-proto]', function () {
    var req = request({'z-forwarded-proto': 'https'})
    var result = forwarded(req, options)

    assert.deepEqual(result.proto, 'https')
  })

  it('should parse [z-forwarded-protocol]', function () {
    var req = request({'z-forwarded-protocol': 'https'})
    var result = forwarded(req, options)

    assert.deepEqual(result.proto, 'https')
  })
})
