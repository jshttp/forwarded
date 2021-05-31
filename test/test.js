'use strict'

var assert = require('assert')
var deepEqual = require('deep-equal')
var forwarded = require('..')

describe('forwarded(req)', function () {
  it('should require req', function () {
    assert.throws(forwarded.bind(null), /argument req.*required/)
  })

  it('should work with X-Forwarded-For header', function () {
    var req = createReq('127.0.0.1')
    assert.ok(deepEqual(forwarded(req), ['127.0.0.1']))
  })

  it('should include entries from X-Forwarded-For', function () {
    var req = createReq('127.0.0.1', {
      'x-forwarded-for': '10.0.0.2, 10.0.0.1'
    })
    assert.ok(deepEqual(forwarded(req), ['127.0.0.1', '10.0.0.1', '10.0.0.2']))
  })

  it('should skip blank entries', function () {
    var req = createReq('127.0.0.1', {
      'x-forwarded-for': '10.0.0.2,, 10.0.0.1'
    })
    assert.ok(deepEqual(forwarded(req), ['127.0.0.1', '10.0.0.1', '10.0.0.2']))
  })

  it('should trim leading OWS', function () {
    var req = createReq('127.0.0.1', {
      'x-forwarded-for': ' 10.0.0.2 ,  , 10.0.0.1 '
    })
    assert.ok(deepEqual(forwarded(req), ['127.0.0.1', '10.0.0.1', '10.0.0.2']))
  })

  describe('socket address', function () {
    it('should begin with socket address', function () {
      var req = createReq('127.0.0.1')
      assert.strictEqual(forwarded(req)[0], '127.0.0.1')
    })

    it('should use address from req.socket', function () {
      var req = createReq('127.0.0.1')
      assert.strictEqual(forwarded(req)[0], req.socket.remoteAddress)
    })

    it('should prefer req.socket', function () {
      var req = createReq('127.0.0.1')
      req.connection = { remoteAddress: '10.0.0.1' }
      assert.strictEqual(forwarded(req)[0], '127.0.0.1')
    })

    it('should use fall back to req.connection', function () {
      var req = createReq('127.0.0.1')
      req.connection = { remoteAddress: '10.0.0.1' }
      req.socket = undefined
      assert.strictEqual(forwarded(req)[0], '10.0.0.1')
    })
  })
})

function createReq (socketAddr, headers) {
  return {
    socket: {
      remoteAddress: socketAddr
    },
    headers: headers || {}
  }
}
