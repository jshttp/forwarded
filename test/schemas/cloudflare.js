/* globals describe, it */

'use strict'

var assert = require('assert')
var forwarded = require('../..')
var request = require('../helpers').createRequestMock
var schemas = require('../../lib/schemas')

var options = {
  schemas: ['cloudflare']
}

describe('cloudflare', function () {
  it('should parse [cf-connecting-ip]', function () {
    var req = request({'cf-connecting-ip': '10.10.10.1'})
    var result = forwarded(req, options)

    assert.deepEqual(result.addrs, ['127.0.0.1', '10.10.10.1'])
  })

  it('should parse [cf-visitor = {"scheme": "https"}]', function () {
    var req = request({'cf-visitor': '{"scheme": "https"}'})
    var result = schemas.cloudflare.proto(req.headers)

    assert.equal(result, 'https')
  })

  it('should parse [cf-visitor = {"scheme": "http"}]', function () {
    var req = request({'cf-visitor': '{"scheme": "http"}'})
    var result = schemas.cloudflare.proto(req.headers)

    assert.equal(result, 'http')
  })

  it('should parse [cf-visitor = {}]', function () {
    var req = request({'cf-visitor': '{}'})
    var result = schemas.cloudflare.proto(req.headers)

    assert.equal(result, undefined)
  })

  it('should parse [cf-visitor = {malformed}]', function () {
    var req = request({'cf-visitor': '{malformed}'})
    var result = schemas.cloudflare.proto(req.headers)

    assert.equal(result, undefined)
  })
})
