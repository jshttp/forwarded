'use strict'

module.exports = {
  addrs: 'x-real-ip',
  port: 'x-real-port',
  proto: function protocol (headers) {
    if (headers['x-real-proto']) {
      return headers['x-real-proto']
    }

    if (headers['x-url-scheme']) {
      return headers['x-url-scheme']
    }
  }
}
