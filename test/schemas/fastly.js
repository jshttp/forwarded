/* globals describe, it */

'use strict'

var assert = require('assert')
var forwarded = require('../..')
var request = require('../helpers').createRequestMock
var schemas = require('../../lib/schemas')

var options = {
  schemas: ['fastly']
}

describe('fastly', function () {
  it('should parse [fastly-client-ip]', function () {
    var req = request({'fastly-client-ip': '10.10.10.1'})
    var result = forwarded(req, options)

    assert.deepEqual(result.addrs, ['127.0.0.1', '10.10.10.1'])
  })

  it('should parse [fastly-client-port]', function () {
    var req = request({'fastly-client-port': '9000'})
    var result = forwarded(req, options)

    assert.deepEqual(result.port, '9000')
  })

  it('should parse [fastly-ssl = 1]', function () {
    var req = request({'fastly-ssl': '1'})
    var result = schemas.fastly.proto(req.headers)

    assert.equal(result, 'https')
  })

  it('should parse [fastly-ssl = undefined]', function () {
    var req = request()
    var result = schemas.fastly.proto(req.headers)

    assert.equal(result, undefined)
  })
})
