/* globals describe, it */

'use strict'

var assert = require('assert')
var forwarded = require('../..')
var request = require('../helpers').createRequestMock

var options = {
  schemas: ['rackspace']
}

describe('rackspace', function () {
  it('should parse [x-cluster-client-ip]', function () {
    var result = forwarded(request({
      'x-cluster-client-ip': '10.10.10.1'
    }), options)

    assert.deepEqual(result.addrs, ['127.0.0.1', '10.10.10.1'])
  })
})
