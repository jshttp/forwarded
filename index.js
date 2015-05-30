'use strict'

var Processor = require('./lib/processor')
var schemas = require('./lib/schemas')
var util = require('util')

/**
 * Get all addresses in the request, using the `X-Forwarded-For` header.
 *
 * @param {http.IncomingMessage} req
 * @api public
 */

module.exports = function forwarded (req, options) {
  var opts = util._extend({
    // default to only common + standard
    // array order matters here
    schemas: [
      'xff',
      'rfc7239'
    ]
  }, options)

  // consistent case
  opts.schemas.map(Function.prototype.call, String.prototype.toLowerCase)

  if (!req) {
    throw new TypeError('argument req is required')
  }

  // start with default values from socket connection
  var forwarded = {
    addrs: [req.connection.remoteAddress],
    by: null,
    host: req.headers && req.headers.host ? req.headers.host : undefined,
    port: req.connection.remotePort.toString(),
    ports: [req.connection.remotePort.toString()],
    proto: req.connection.encrypted ? 'https' : 'http'
  }

  // alias "for" to keep with RFC7239 naming
  forwarded.for = forwarded.addrs

  return opts.schemas
    // check if schemas exist
    .filter(function (name) {
      return schemas[name]
    })

    // process schemas
    .reduce(function (forwarded, name) {
      var result = new Processor(req, schemas[name])

      // update forwarded object
      return {
        addrs: forwarded.addrs.concat(result.addrs).filter(Boolean),
        by: result.by ? result.by : forwarded.by,
        host: result.host ? result.host : forwarded.host,
        port: result.port ? result.port : forwarded.port,
        ports: forwarded.ports.concat([result.port]).filter(Boolean),
        proto: result.proto ? result.proto : forwarded.proto
      }
    }, forwarded)
}
