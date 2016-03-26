'use strict'

function isSecure (req) {
  return req.headers['x-forwarded-ssl'] === 'on'
}

module.exports = {
  addrs: 'x-forwarded-for',
  host: 'x-forwarded-host',
  port: 'x-forwarded-port',
  proto: ['x-forwarded-proto', 'x-forwarded-protocol', isSecure],
  protoFn: isSecure
}
