'use strict'

var debug = require('debug-log')('forwarded')

module.exports = {
  addrs: 'cf-connecting-ip',
  proto: function protocol (headers) {
    try {
      var cf = JSON.parse(headers['cf-visitor'])
      if (cf.scheme) {
        return cf.scheme
      }
    } catch (e) {
      debug('could not parse "cf-visitor" header: %s', headers['cf-visitor'])
    }
  }
}
