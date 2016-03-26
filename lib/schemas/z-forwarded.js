'use strict'

module.exports = {
  addrs: 'z-forwarded-for',
  host: 'z-forwarded-host',
  port: 'z-forwarded-port',
  proto: function protocol (headers) {
    if (headers['x-forwarded-proto']) {
      return headers['x-forwarded-proto']
    }

    if (headers['x-forwarded-protocol']) {
      return headers['x-forwarded-protocol']
    }
  }
}
