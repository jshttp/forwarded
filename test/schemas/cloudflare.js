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

  it('should parse [cf-visitor]', function () {
    var req = request({
      'cf-visitor': '{"scheme": "https"}'
    })

    assert.ok(schemas.cloudflare.proto(req))

    req = request({
      'cf-visitor': '{malformed}'
    })

    assert.ok(!schemas.cloudflare.proto(req))
  })
})