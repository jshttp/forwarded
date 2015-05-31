/* globals describe, it */

'use strict'

var assert = require('assert')
var request = require('../helpers').createRequestMock
var schemas = require('../../lib/schemas')

describe('microsoft', function () {
  it('should detect https protocol', function () {
    var req = request({
      'front-end-https': 'on'
    })

    assert.ok(schemas.microsoft.proto(req))
  })
})
