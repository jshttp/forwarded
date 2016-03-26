'use strict'

module.exports = {
  'cloudflare': require('./cloudflare'),
  'fastly': require('./fastly'),
  'microsoft': require('./microsoft'),
  'rfc7239': require('./rfc7239'),
  'x-cluster': require('./x-cluster'),
  'x-forwarded': require('./x-forwarded'),
  'x-real': require('./x-real'),
  'z-forwarded': require('./z-forwarded')
}
