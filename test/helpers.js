'use strict'

var forwarded = require('..')
var http = require('http')

var createServer = function (done) {
  var server = http.createServer(function (req, res) {
    res.write(JSON.stringify(forwarded(req)))
    res.end()
  })

  server.listen(0, 'localhost', function () {
    done(server)
  })
}

exports.createRequest = function (headers, done) {
  createServer(function (server) {

    var options = {
      headers: headers,
      host: server.address().address,
      port: server.address().port
    }

    http.get(options, function (res) {

      var body = ''

      res.on('data', function (chunk) {
        body += chunk
      })

      res.on('end', function () {
        server.close()

        server.on('close', function () {
          done(JSON.parse(body))
        })
      })
    })
  })
}

exports.createRequestMock = function (headers, connection) {
  return {
    connection: connection || {
      encrypted: true,
      remoteAddress: '127.0.0.1',
      remotePort: 5000
    },

    headers: headers || {}
  }
}
