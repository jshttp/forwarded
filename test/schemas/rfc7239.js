/* globals describe, it */

'use strict'

var assert = require('assert')
var request = require('../helpers').createRequestMock
var schemas = require('../../lib/schemas')

describe('rfc7239', function () {
  it('should return empty object', function () {
    var req = request()
    var result = schemas.rfc7239(req.headers)

    assert.deepEqual(result, {})
  })

  it('should parse and process Forwarded header', function () {
    var req = request({'forwarded': 'host=mockbin.com, for=0.0.0.1, for=0.0.0.2, for=private, for="1::8", port=9000; proto=https; by=0.0.0.3'})
    var result = schemas.rfc7239(req.headers)

    assert.deepEqual(result, {
      addrs: ['1::8', 'private', '0.0.0.2', '0.0.0.1'],
      by: '0.0.0.3',
      port: '9000',
      ports: ['9000'],
      host: 'mockbin.com',
      proto: 'https'
    })
  })
})
