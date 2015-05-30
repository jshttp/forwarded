'use strict'

module.exports = {
  cloudflare: require('./cloudflare'),
  fastly: require('./fastly'),
  microsoft: require('./microsoft'),
  nginx: require('./nginx'),
  rackspace: require('./rackspace'),
  rfc7239: require('./rfc7239'),
  xff: require('./xff'),
  zscaler: require('./zscaler')
}
