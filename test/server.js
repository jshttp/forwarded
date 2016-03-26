/* globals describe, it */

'use strict'

var assert = require('assert')
var request = require('./helpers').createRequestServer

describe('live server', function () {
  it('should get defaults', function (done) {
    request(null, function (result, address) {
      assert.ok(/127\.0\.0\.1:\d+/.test(result.host))
      assert.deepEqual(result.addrs, ['127.0.0.1'])
      assert.equal(result.proto, 'http')

      done()
    })
  })

  it('should get defaults', function (done) {
    var headers = {
      'host': 'mockbin.com',
      'forwarded': 'host=mockbin.com; for=0.0.0.1, for=0.0.0.2, for=private, for="1::8"; port=9000; proto=https; by=0.0.0.3'
    }

    request(headers, function (result) {
      assert.deepEqual(result.addrs, ['127.0.0.1', '1::8', 'private', '0.0.0.2', '0.0.0.1'])
      assert.equal(result.by, '0.0.0.3')
      assert.equal(result.host, 'mockbin.com')
      assert.equal(result.proto, 'https')

      done()
    })
  })
})

