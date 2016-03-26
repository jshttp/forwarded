/* globals describe, it */

'use strict'

var assert = require('assert')
var forwarded = require('../..')
var request = require('../helpers').createRequestMock

var options = {
  schemas: ['x-cluster']
}

describe('x-cluster', function () {
  it('should parse [x-cluster-client-ip]', function () {
    var req = request({'x-cluster-client-ip': '10.10.10.1'})
    var result = forwarded(req, options)

    assert.deepEqual(result.addrs, ['127.0.0.1', '10.10.10.1'])
  })
})
