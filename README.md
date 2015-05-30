# forwarded

[![NPM Version][npm-image]][npm-url]
[![NPM Downloads][downloads-image]][downloads-url]
[![Node.js Version][node-version-image]][node-version-url]
[![Build Status][travis-image]][travis-url]
[![Test Coverage][coveralls-image]][coveralls-url]

Parse *Forwarded* HTTP headers, using the standard: [RFC 7239](https://tools.ietf.org/html/rfc7239) *(Forwarded HTTP Extension)*, as well as commonly used none-standard headers (e.g. `X-Forwarded-*`, `X-Real-*`, etc ...)

review [`schemas` folder](lib/schemas) for a full list of supported headers schemas.

## Installation

```sh
$ npm install forwarded
```

## API

```js
var forwarded = require('forwarded')
```

### forwarded(req[, options])

returns an object who's properties represent [RFC 7239 Parameters (Section 5)](http://tools.ietf.org/html/rfc7239#section-5)

```js
var result = forwarded(req)
```

#### options

| name      | type    | description                               | required | default              |
| --------- | ------- | ----------------------------------------- | -------- | -------------------- |
| `schemas` | `array` | ordered list of header schemas to process | no       | `['xff', 'rfc7239']` |

Parse appropriate headers from the request matching the selected [schemas](#options).

### returned object

| name      | type      | description                                                                              | default                                |
| --------- | --------- | ---------------------------------------------------------------------------------------- | -------------------------------------- |
| `for`     | `array`   | alias of `addrs`                                                                                                                  |
| `by`      | `string`  | [RFC 7239 Section 5.1](http://tools.ietf.org/html/rfc7239#section-5.1) compatible result | `null`                                 |
| `addrs`   | `array`   | [RFC 7239 Section 5.2](http://tools.ietf.org/html/rfc7239#section-5.2) compatible result | `[request.connection.remoteAddress]`   |
| `host`    | `string`  | [RFC 7239 Section 5.3](http://tools.ietf.org/html/rfc7239#section-5.3) compatible result | `request.headers.host`                 |
| `proto`   | `string`  | [RFC 7239 Section 5.4](http://tools.ietf.org/html/rfc7239#section-5.4) compatible result | `request.connection.encrypted`         |
| `port`    | `string`  | the last known port used by the client/proxy in chain of proxies                         | `request.connection.remotePort`        |
| `ports`   | `array`   | ordered list of known ports in the chain of proxies                                      | `[request.connection.remotePort]`      |

###### Notes

- `forwarded().addrs` & `forwarded().ports`: return arrays of the addresses & ports respectively, including the socket address/port for the request. In reverse order (i.e. index `0` is the socket address/port and the last index is the furthest address/port, typically the end-user).

## Testing

```sh
$ npm test
```

## TODO
- [ ] process [`Via`](http://tools.ietf.org/html/rfc7230#section-5.7.1) header
- [ ] extract ports from [`Forwarded`](http://tools.ietf.org/html/rfc7239#section-5.2) header: `Forwarded: for=x.x.x.x:yyyy`

## License

[MIT](LICENSE)

[npm-image]: https://img.shields.io/npm/v/forwarded.svg?style=flat
[npm-url]: https://npmjs.org/package/forwarded
[node-version-image]: https://img.shields.io/node/v/forwarded.svg?style=flat
[node-version-url]: http://nodejs.org/download/
[travis-image]: https://img.shields.io/travis/jshttp/forwarded.svg?style=flat
[travis-url]: https://travis-ci.org/jshttp/forwarded
[coveralls-image]: https://img.shields.io/coveralls/jshttp/forwarded.svg?style=flat
[coveralls-url]: https://coveralls.io/r/jshttp/forwarded?branch=master
[downloads-image]: https://img.shields.io/npm/dm/forwarded.svg?style=flat
[downloads-url]: https://npmjs.org/package/forwarded
