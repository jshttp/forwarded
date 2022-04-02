'use strict'

var assert = require('assert')
var deepEqual = require('deep-equal')
var forwarded = require('..')
var http = require('http')

describe('forwarded(req)', function () {
  it('should require req', function () {
    assert.throws(forwarded.bind(null), /argument req.*required/)
  })

  it('should work with X-Forwarded-For header', function (done) {
    request(createServer())
      .get('/')
      .expect(200, ['127.0.0.1'], done)
  })

  it('should include entries from X-Forwarded-For', function (done) {
    request(createServer())
      .get('/')
      .set('X-Forwarded-For', '10.0.0.2, 10.0.0.1')
      .expect(200, ['127.0.0.1', '10.0.0.1', '10.0.0.2'], done)
  })

  it('should skip blank entries', function (done) {
    request(createServer())
      .get('/')
      .set('X-Forwarded-For', '10.0.0.2,, 10.0.0.1')
      .expect(200, ['127.0.0.1', '10.0.0.1', '10.0.0.2'], done)
  })

  it('should trim leading OWS', function (done) {
    request(createServer())
      .get('/')
      .set('X-Forwarded-For', ' 10.0.0.2 ,  , 10.0.0.1 ')
      .expect(200, ['127.0.0.1', '10.0.0.1', '10.0.0.2'], done)
  })

  describe('socket address', function () {
    it('should begin with socket address', function () {
      var req = createReq('socket', '127.0.0.1')
      assert.strictEqual(forwarded(req)[0], '127.0.0.1')
    })

    it('should use address from req.socket', function () {
      var req = createReq('socket', '127.0.0.1')
      assert.strictEqual(forwarded(req)[0], req.socket.remoteAddress)
    })

    it('should prefer req.socket', function () {
      var req = createReq('socket', '127.0.0.1')
      req.connection = { remoteAddress: '10.0.0.1' }
      assert.strictEqual(forwarded(req)[0], '127.0.0.1')
    })

    it('should use fall back to req.connection', function () {
      var req = createReq('connection', '10.0.0.1')
      assert.strictEqual(forwarded(req)[0], '10.0.0.1')
    })
  })
})

/**
 * Fake http.IncomingMessage to test socket/connection fallback
 */

function createReq (prop, socketAddr) {
  var req = {}

  req.headers = {} // http.IncomingMessage always has this
  req[prop] = { remoteAddress: socketAddr } // fake for test

  return req
}

/**
 * Create HTTP server to echo back results
 */

function createServer () {
  return http.createServer(function (req, res) {
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(forwarded(req)) || 'undefined')
  })
}

/**
 * Fake supertest to support Node.js 0.6
 */

function request (server) {
  var headers = Object.create(null)
  var path = '/'

  function expect (statusCode, data, callback) {
    server.listen(0, '127.0.0.1', function () {
      var req = http.request({
        headers: headers,
        host: '127.0.0.1',
        path: path,
        port: server.address().port
      })

      req.on('response', function (res) {
        var body = ''
        res.setEncoding('utf8')
        res.on('data', function (c) { body += c })
        res.on('end', function () {
          try {
            assert.strictEqual(res.statusCode, statusCode)
            assert.ok(deepEqual(JSON.parse(body), data))
            callback(null)
          } catch (e) {
            callback(e)
          } finally {
            server.close()
          }
        })
      })

      req.end()
    })
  }

  return {
    expect: expect,
    get: function (p) { path = p; return this },
    set: function (k, v) { headers[k] = v; return this }
  }
}
