'use strict'

module.exports = function createRequest (headers, connection) {
  return {
    connection: connection || {
      encrypted: true,
      remoteAddress: '127.0.0.1',
      remotePort: 5000
    },

    headers: headers || {}
  }
}
