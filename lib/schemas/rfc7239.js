'use strict'

function splitMap (string, separator, cb) {
  // split into elements
  return string.split(separator)
    .filter(Boolean)
    .forEach(cb)
}

function parsePart (part) {
  var pair = part.split(/ *= */)

  var name = pair[0].toLowerCase()
  var value = pair[1]

  if (value) {
    switch (typeof this[name]) {
      case 'undefined':
        this[name] = value
        break

      // convert to array
      case 'string':
        this[name] = [this[name], value]
        break

      // append to array
      case 'object':
        this[name].push(value)
        break
    }
  }
}

var ELEMENT_SEPARATOR = / *; */
var PART_SEPARATOR = / *, */

module.exports = function (req) {
  var forwarded = {}
  var header = req.headers.forwarded

  if (!header) {
    return forwarded
  }

  splitMap(header, ELEMENT_SEPARATOR, function parseElement (el) {
    return splitMap(el, PART_SEPARATOR, parsePart.bind(forwarded))
  })

  // ensure result is an array
  if (forwarded.for && !Array.isArray(forwarded.for)) {
    forwarded.for = [forwarded.for]
  }

  // create alias
  forwarded.addrs = forwarded.for

  return forwarded
}
