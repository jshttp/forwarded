'use strict'

var parse = require('forwarded-parse')
var debug = require('debug-log')('forwarded')

module.exports = function (headers) {
  if (!headers.forwarded) {
    return {}
  }

  try {
    var result = parse(headers.forwarded)

    var forwarded = {
      addrs: result.for ? result.for.reverse() : [],
      by: result.by ? result.by[0] : undefined,
      host: result.host ? result.host[0] : undefined,
      port: result.port ? result.port[0] : undefined,
      ports: result.port,
      proto: result.proto ? result.proto[0] : undefined
    }
  } catch (e) {
    debug(e)
  }

  return forwarded
}
