'use strict'

function isSecure (req) {
  return ~['1', 'true'].indexOf(req.headers['fastly-ssl'])
}

module.exports = {
  addrs: 'fastly-client-ip',
  port: 'fastly-client-port',
  proto: isSecure
}
