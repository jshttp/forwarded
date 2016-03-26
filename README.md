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

| name      | type    | description                               | required | default                      |
| --------- | ------- | ----------------------------------------- | -------- | ---------------------------- |
| `schemas` | `array` | ordered list of header schemas to process | no       | `['rfc7239', 'x-forwarded']` |

Parse appropriate headers from the request matching the selected [schemas](#options).

###### available schemas

| name                | key           | description                                                                               |
| ------------------- | ------------- | ----------------------------------------------------------------------------------------- |
| RFC 7239            | `rfc7239`     | [RFC 7239 Standard][rfc7239]                                                              |
| X-Forwarded-*       | `x-forwarded` | Headers using the prefix [`X-Forwarded-*`][x-forwarded], a de facto standard              |
| X-Real-*            | `x-real`      | Headers using the prefix [`X-Real-*`][x-real], mostly common in NGINX servers             |
| Z-Forwarded-*       | `z-forwarded` | less common version of `X-Forwarded-*` used by [Z Scaler][z-forwarded]                    |
| X-Cluster-Client-IP | `x-cluster`   | used by [Rackspace][x-cluster], X-Ray servers                                             |
| Cloudflare          | `cloudflare`  | Headers used by [Cloudflare][cloudflare]                                                  |
| Fastly              | `fastly`      | Headers used by Fastly, for [IP][fastly-ip], Port, and [SSL][fastly-ssl] info             |
| Microsoft           | `microsoft`   | Non-standard header field used by [Microsoft][microsoft] applications and load-balancers  |
| Weblogic            | `weblogic`    | Forwarded IP by Oracle's [Weblogic][weblogic] Proxy                                       |

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

- [ ] extract ports from [`Forwarded`](http://tools.ietf.org/html/rfc7239#section-5.2) header: `Forwarded: for=x.x.x.x:yyyy`

## License

[MIT](LICENSE)

[npm-image]: https://img.shields.io/npm/v/forwarded.svg
[npm-url]: https://npmjs.org/package/forwarded
[node-version-image]: https://img.shields.io/node/v/forwarded.svg
[node-version-url]: http://nodejs.org/download/
[travis-image]: https://img.shields.io/travis/jshttp/forwarded/master.svg
[travis-url]: https://travis-ci.org/jshttp/forwarded
[coveralls-image]: https://img.shields.io/coveralls/jshttp/forwarded/master.svg
[coveralls-url]: https://coveralls.io/r/jshttp/forwarded?branch=master
[downloads-image]: https://img.shields.io/npm/dm/forwarded.svg
[downloads-url]: https://npmjs.org/package/forwarded
[rfc7239]: https://tools.ietf.org/html/rfc7239
[x-forwarded]: https://en.wikipedia.org/wiki/X-Forwarded-For
[z-forwarded]: https://en.wikipedia.org/wiki/X-Forwarded-For#Proxy_servers_and_caching_engines
[x-real]: http://nginx.org/en/docs/http/ngx_http_realip_module.html
[x-cluster]: https://support.rackspace.com/how-to/controlling-access-to-linux-cloud-sites-based-on-the-client-ip-address/
[cloudflare]: https://support.cloudflare.com/hc/en-us/articles/200170986-How-does-CloudFlare-handle-HTTP-Request-headers-
[fastly-ssl]: https://docs.fastly.com/guides/securing-communications/tls-termination
[fastly-ip]: https://docs.fastly.com/guides/basic-configuration/adding-or-modifying-headers-on-http-requests-and-responses
[weblogic]: https://blogs.oracle.com/wlscoherence/entry/obtaining_the_correct_client_ip
[microsoft]: http://technet.microsoft.com/en-us/library/aa997519(v=exchg.65).aspx
