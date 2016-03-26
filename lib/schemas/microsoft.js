'use strict'

module.exports = {
  proto: function protocol (headers) {
    if (headers['front-end-https']) {
      return headers['front-end-https'] === 'on' ? 'https' : 'http'
    }
  }
}
