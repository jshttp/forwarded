/*!
 * forwarded
 * Copyright(c) 2014 Douglas Christopher Wilson
 * Copyright(c) 2015 Ahmad Nassri
 * MIT Licensed
*/

'use strict'

/**
 * Module exports.
 * @public
 */

var processor = require('./lib/processor')
var schemas = require('./lib/schemas')

/**
 * Get all addresses in the request, using the `X-Forwarded-For` header.
 *
 * @param {http.IncomingMessage} req
 * @return {object}
 * @public
 */

module.exports = function forwarded (req, options) {
  options = options || {}

  var opts = {
    // default to only common + standard
    // array order matters here
    schemas: options.schemas || [
      'rfc7239'
    ]
  }

  if (!req) {
    throw new TypeError('argument req is required')
  }

  // start with default values from socket connection
  var forwarded = {
    addrs: [req.connection.remoteAddress],
    by: null,
    host: req.headers && req.headers.host ? req.headers.host : undefined,
    port: req.connection.remotePort ? req.connection.remotePort.toString() : undefined,
    ports: [],
    proto: req.connection.encrypted ? 'https' : 'http'
  }

  // add default port to ports array if present
  if (forwarded.port) {
    forwarded.ports.push(forwarded.port)
  }

  // alias "for" to keep with RFC7239 naming
  forwarded.for = forwarded.addrs

  return opts.schemas
    // check if schemas exist
    .map(function (name) {
      // adjust case
      name = name.toLowerCase()

      if (!schemas[name]) {
        throw new Error('invalid schema')
      }

      return schemas[name]
    })

    // process schemas
    .reduce(function (forwarded, schema) {
      var result = processor(req.headers, schema)

      // ensure reverse order of addresses
      if (result.addrs) {
        result.addrs.reverse()
      }

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
