'use strict'

var debug = require('debug-log')('forwarded')

module.exports = function processor (headers, schema) {
  if (typeof schema === 'function') {
    return schema(headers)
  }

  var result = {}

  var fields = ['addrs', 'host', 'port']

  fields.forEach(function (field) {
    if (schema[field] && headers[schema[field]]) {
      var value = headers[schema[field]]

      debug('found header [%s = %s]', schema[field], value)

      result[field] = value
    }
  })

  // get protocol
  if (typeof schema.proto === 'function') {
    result.proto = schema.proto(headers)
  }

  return result
}
