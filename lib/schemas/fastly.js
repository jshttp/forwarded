'use strict'

function isSecure (req) {
  return req.headers['fastly-ssl'] !== undefined
}

module.exports = {
  addrs: 'fastly-client-ip',
  port: 'fastly-client-port',
  proto: isSecure
}
