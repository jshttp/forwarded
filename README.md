# forwarded

[![NPM Version][npm-image]][npm-url]
[![NPM Downloads][downloads-image]][downloads-url]
[![Node.js Version][node-version-image]][node-version-url]
[![Build Status][ci-image]][ci-url]
[![Test Coverage][coveralls-image]][coveralls-url]

Parse HTTP X-Forwarded-For header

## Installation

This is a [Node.js](https://nodejs.org/en/) module available through the
[npm registry](https://www.npmjs.com/). Installation is done using the
[`npm install` command](https://docs.npmjs.com/getting-started/installing-npm-packages-locally):

```sh
$ npm install forwarded
```

## API

```js
var forwarded = require('forwarded')
```

### forwarded(req)

```js
var addresses = forwarded(req)
```

Parse the `X-Forwarded-For` header from the given [Node.js `IncomingMessage` object][nodejs-http-incomingmessage].
Returns an array of the addresses, including the socket address for the `req`, in reverse
order (i.e. index `0` is the socket address and the last index is the furthest address,
typically the end-user).

## Testing

```sh
$ npm test
```

## License

[MIT](LICENSE)

[nodejs-http-incomingmessage]: https://nodejs.org/dist/latest/docs/api/http.html#class-httpincomingmessage

[ci-image]: https://badgen.net/github/checks/jshttp/forwarded/master?label=ci
[ci-url]: https://github.com/jshttp/forwarded/actions?query=workflow%3Aci
[npm-image]: https://img.shields.io/npm/v/forwarded.svg
[npm-url]: https://npmjs.org/package/forwarded
[node-version-image]: https://img.shields.io/node/v/forwarded.svg
[node-version-url]: https://nodejs.org/en/download/
[coveralls-image]: https://img.shields.io/coveralls/jshttp/forwarded/master.svg
[coveralls-url]: https://coveralls.io/r/jshttp/forwarded?branch=master
[downloads-image]: https://img.shields.io/npm/dm/forwarded.svg
[downloads-url]: https://npmjs.org/package/forwarded
