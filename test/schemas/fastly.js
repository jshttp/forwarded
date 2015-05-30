/* globals describe, it */

'use strict'

var assert = require('assert')
var forwarded = require('../..')
var request = require('../helper')
var schemas = require('../../lib/schemas')

var options = {
  schemas: ['fastly']
}

describe('fastly', function () {
  it('should parse [fastly-client-ip]', function () {
    var result = forwarded(request({
      'fastly-client-ip': '10.10.10.1'
    }), options)

    assert.deepEqual(result.addrs, ['127.0.0.1', '10.10.10.1'])
  })

  it('should parse [fastly-client-port]', function () {
    var result = forwarded(request({
      'fastly-client-port': '9000'
    }), options)

    assert.deepEqual(result.port, '9000')
  })

  it('should parse [fastly-ssl]', function () {
    var req = request({
      'fastly-ssl': '1'
    })

    assert.ok(schemas.fastly.proto(req))
  })
})
