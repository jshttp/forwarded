'use strict'

var assert = require('assert')
var forwarded = require('..')

describe('forwarded(req)', function () {
  it('should require req', function () {
    assert.throws(forwarded.bind(null), /argument req.*required/)
  })

  it('should work with X-Forwarded-For header', function () {
    var req = createReq('127.0.0.1')
    assert.deepEqual(forwarded(req), ['127.0.0.1'])
  })

  it('should include entries from X-Forwarded-For', function () {
    var req = createReq('127.0.0.1', {
      'x-forwarded-for': '10.0.0.2, 10.0.0.1'
    })
    assert.deepEqual(forwarded(req), ['127.0.0.1', '10.0.0.1', '10.0.0.2'])
  })

  it('should skip blank entries', function () {
    var req = createReq('127.0.0.1', {
      'x-forwarded-for': '10.0.0.2,, 10.0.0.1'
    })
    assert.deepEqual(forwarded(req), ['127.0.0.1', '10.0.0.1', '10.0.0.2'])
  })

  it('should trim leading OWS', function () {
    var req = createReq('127.0.0.1', {
      'x-forwarded-for': ' 10.0.0.2 ,  , 10.0.0.1 '
    })
    assert.deepEqual(forwarded(req), ['127.0.0.1', '10.0.0.1', '10.0.0.2'])
  })
})

function createReq (socketAddr, headers) {
  return {
    connection: {
      remoteAddress: socketAddr
    },
    headers: headers || {}
  }
}
