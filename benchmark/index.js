
/**
 * Module dependencies.
 */

var benchmark = require('benchmark')
var benchmarks = require('beautify-benchmark')

/**
 * Globals for benchmark.js
 */

global.forwarded = require('..')
global.req0 = fakerequest({})
global.req1 = fakerequest({ 'x-forwarded-for': '192.168.0.10' })
global.req2 = fakerequest({ 'x-forwarded-for': '192.168.0.10, 192.168.1.20' })
global.req5 = fakerequest({ 'x-forwarded-for': '192.168.0.10, 192.168.1.20, 192.168.1.21, 192.168.1.22, 192.168.1.23' })

var suite = new benchmark.Suite()

suite.add({
  name: 'no header',
  minSamples: 100,
  fn: 'var addrs = forwarded(req0)'
})

suite.add({
  name: '1 address',
  minSamples: 100,
  fn: 'var addrs = forwarded(req1)'
})

suite.add({
  name: '2 addresses',
  minSamples: 100,
  fn: 'var addrs = forwarded(req2)'
})

suite.add({
  name: '5 addresses',
  minSamples: 100,
  fn: 'var addrs = forwarded(req5)'
})

suite.on('cycle', function onCycle (event) {
  benchmarks.add(event.target)
})

suite.on('complete', function onComplete () {
  benchmarks.log()
})

suite.run({ async: false })

function fakerequest (headers) {
  return {
    headers: headers,
    connection: {
      remoteAddress: '10.0.0.1'
    }
  }
}
