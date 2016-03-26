'use strict'

module.exports = {
  addrs: 'x-forwarded-for',
  host: 'x-forwarded-host',
  port: 'x-forwarded-port',
  proto: function protocol (headers) {
    if (headers['x-forwarded-proto']) {
      return headers['x-forwarded-proto']
    }

    if (headers['x-forwarded-protocol']) {
      return headers['x-forwarded-protocol']
    }

    if (headers['x-forwarded-ssl']) {
      return headers['x-forwarded-ssl'] === 'on' ? 'https' : 'http'
    }
  }
}
