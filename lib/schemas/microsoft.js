'use strict'

module.exports = {
  proto: function isSecure (req) {
    return req.headers['front-end-https'] === 'on'
  }
}
