'use strict'

var debug = require('debug')('forwarded')

function isSecure (req) {
  try {
    var cf = JSON.parse(req.headers['cf-visitor'])
    return cf.scheme !== undefined
  } catch (e) {
    debug('could not parse "cf-visitor" header: %s', req.headers['cf-visitor'])
  }

  return false
}

module.exports = {
  addrs: 'cf-connecting-ip',
  proto: isSecure
}