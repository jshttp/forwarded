'use strict'

var debug = require('debug-log')('forwarded')

function processor (req, schema) {
  if (typeof schema === 'function') {
    return schema(req)
  }

  this.req = req
  this.schema = schema

  return {
    addrs: this.addrs(),
    host: this.host(),
    port: this.port(),
    proto: this.protocol()
  }
}

processor.prototype.host = function () {
  if (this.schema.host && this.req.headers[this.schema.host]) {
    var value = this.req.headers[this.schema.host]

    debug('found header [%s = %s]', this.schema.host, value)

    return this.req.headers[this.schema.host]
  }
}

processor.prototype.port = function () {
  if (this.schema.port && this.req.headers[this.schema.port]) {
    var value = this.req.headers[this.schema.port]

    debug('found header [%s = %s]', this.schema.port, value)

    return value
  }
}

processor.prototype.addrs = function () {
  if (this.schema.addrs && this.req.headers[this.schema.addrs]) {
    var value = this.req.headers[this.schema.addrs]

    debug('found header [%s = %s]', this.schema.addrs, value)

    return value
      .split(/ *, */)
      .filter(Boolean)
      .reverse()
  }
}

processor.prototype.protocol = function () {
  // utility
  function runner (obj) {
    // multiple possible values
    if (Array.isArray(obj)) {
      // get the last succesful item
      return obj.map(runner.bind(this)).reduce(function (prev, curr) {
        return curr ? curr : prev
      })
    }

    if (typeof obj === 'function') {
      return obj.call(this, this.req)
    }

    if (this.req.headers[obj]) {
      debug('found header [%s = %s]', obj, this.req.headers[obj])

      return this.req.headers[obj]
    }
  }

  // actually run
  if (this.schema.proto) {
    return runner.call(this, this.schema.proto)
  }
}

module.exports = processor
