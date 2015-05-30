/* globals describe, it */

'use strict'

var assert = require('assert')
var forwarded = require('../..')
var request = require('../helper')
var schemas = require('../../lib/schemas')

var options = {
  schemas: ['cloudflare']
}

describe('cloudflare', function () {
  it('should parse [cf-connecting-ip]', function () {
    var result = forwarded(request({
      'cf-connecting-ip': '10.10.10.1'
    }), options)

    assert.deepEqual(result.addrs, ['127.0.0.1', '10.10.10.1'])
  })

  describe('should parse [cf-visitor]', function () {
    it('{"scheme": "https"}', function () {
      var req = request({
        'cf-visitor': '{"scheme": "https"}'
      })

      assert.ok(schemas.cloudflare.proto(req))
    })

    it('{"scheme": "http"}', function () {
      var req = request({
        'cf-visitor': '{"scheme": "http"}'
      })

      assert.ok(!schemas.cloudflare.proto(req))
    })

    it('{}', function () {
      var req = request({
        'cf-visitor': '{}'
      })

      assert.ok(!schemas.cloudflare.proto(req))
    })

    it('{}', function () {
      var req = request({
        'cf-visitor': '{malformed}'
      })

      assert.ok(!schemas.cloudflare.proto(req))
    })
  })
})
