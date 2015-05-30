/*!
 * forwarded
 * Copyright(c) 2014 Douglas Christopher Wilson
 * MIT Licensed
*/

/**
 * Module exports.
 */

'use strict'

var Processor = require('./lib/processor')
var schemas = require('./lib/schemas')

/**
 * Get all addresses in the request, using the `X-Forwarded-For` header.
 *
 * @param {http.IncomingMessage} req
 * @api public
 */

module.exports = function forwarded (req, options) {
  options = options || {}

  var opts = {
    // default to only common + standard
    // array order matters here
    schemas: options.schemas || [
      'xff',
      'rfc7239'
    ]
  }

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
    .map(function (name) {
      if (!schemas[name]) {
        throw new Error('invalid schema')
      }

      return schemas[name]
    })

    // process schemas
    .reduce(function (forwarded, schema) {
      var result = new Processor(req, schema)

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
