
/**
 * Module dependencies.
 */

var benchmark = require('benchmark')
var benchmarks = require('beautify-benchmark')

/**
 * Globals for benchmark.js
 */

global.fakerequest = fakerequest
global.forwarded = require('..')

var suite = new benchmark.Suite()

suite.add({
  name: 'no header',
  minSamples: 100,
  fn: 'var addrs = forwarded(fakerequest({}))'
})

suite.add({
  name: '1 address',
  minSamples: 100,
  fn: 'var addrs = forwarded(fakerequest({ "x-forwarded-for": "192.168.0.10" }))'
})

suite.add({
  name: '2 addresses',
  minSamples: 100,
  fn: 'var addrs = forwarded(fakerequest({ "x-forwarded-for": "192.168.0.10, 192.168.1.20" }))'
})

suite.add({
  name: '5 addresses',
  minSamples: 100,
  fn: 'var addrs = forwarded(fakerequest({ "x-forwarded-for": "192.168.0.10, 192.168.1.20, 192.168.1.21, 192.168.1.22, 192.168.1.23" }))'
})

suite.on('cycle', function onCycle (event) {
  benchmarks.add(event.target)
})

suite.on('complete', function onComplete () {
  benchmarks.log()
})

suite.run({async: false})

function fakerequest (headers) {
  return {
    headers: headers,
    connection: {
      remoteAddress: '10.0.0.1'
    }
  }
}
