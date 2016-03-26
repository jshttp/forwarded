'use strict'

module.exports = {
  addrs: 'fastly-client-ip',
  port: 'fastly-client-port',
  proto: function protocol (headers) {
    return headers['fastly-ssl'] ? 'https' : undefined
  }
}
