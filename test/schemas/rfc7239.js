/* globals describe, it */

'use strict'

var assert = require('assert')
var forwarded = require('../..')
var request = require('../helper')
var schemas = require('../../lib/schemas')

var options = {
  schemas: ['rfc7239']
}

describe('rfc7239', function () {
  it('should return empty object', function () {
    var req = request()

    assert.deepEqual(schemas.rfc7239(req), {})
  })

  it('should parse and process Forwarded header', function () {
    var req = request({
      'forwarded': 'host= mockbin.com, for=0.0.0.1, for=0.0.0.2, for=private, for=1::8, for=; port= 9000; proto=https; by=0.0.0.3'
    })

    assert.deepEqual(forwarded(req, options), {
      addrs: ['127.0.0.1', '1::8', 'private', '0.0.0.2', '0.0.0.1'],
      by: '0.0.0.3',
      port: '9000',
      ports: ['5000', '9000'],
      host: 'mockbin.com',
      proto: 'https'
    })
  })
})
