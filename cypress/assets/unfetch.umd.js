/**
 * See
 *
 * * https://github.com/cypress-io/cypress/issues/95
 * * https://github.com/cypress-io/cypress-example-recipes/tree/master/examples/stubbing-spying__window-fetch
 * * https://github.com/cypress-io/cypress-example-recipes/blob/master/examples/stubbing-spying__window-fetch/cypress/integration/polyfill-fetch-from-tests-spec.js
 *
 * for an explanation why this is currently necessary...
 */
!(function (e, n) {
    'object' == typeof exports && 'undefined' != typeof module
        ? (module.exports = n())
        : 'function' == typeof define && define.amd
        ? define(n)
        : (e.unfetch = n())
})(this, function () {
    return function (e, n) {
        return (
            (n = n || {}),
            new Promise(function (t, o) {
                var r = new XMLHttpRequest(),
                    s = [],
                    u = [],
                    i = {},
                    f = function () {
                        return {
                            ok: 2 == ((r.status / 100) | 0),
                            statusText: r.statusText,
                            status: r.status,
                            url: r.responseURL,
                            text: function () {
                                return Promise.resolve(r.responseText)
                            },
                            json: function () {
                                return Promise.resolve(
                                    JSON.parse(r.responseText)
                                )
                            },
                            blob: function () {
                                return Promise.resolve(new Blob([r.response]))
                            },
                            clone: f,
                            headers: {
                                keys: function () {
                                    return s
                                },
                                entries: function () {
                                    return u
                                },
                                get: function (e) {
                                    return i[e.toLowerCase()]
                                },
                                has: function (e) {
                                    return e.toLowerCase() in i
                                },
                            },
                        }
                    }
                for (var a in (r.open(n.method || 'get', e, !0),
                (r.onload = function () {
                    r
                        .getAllResponseHeaders()
                        .replace(
                            /^(.*?):[^\S\n]*([\s\S]*?)$/gm,
                            function (e, n, t) {
                                s.push((n = n.toLowerCase())),
                                    u.push([n, t]),
                                    (i[n] = i[n] ? i[n] + ',' + t : t)
                            }
                        ),
                        t(f())
                }),
                (r.onerror = o),
                (r.withCredentials = 'include' == n.credentials),
                n.headers)) {
                    r.setRequestHeader(a, n.headers[a])
                }
                r.send(n.body || null)
            })
        )
    }
})
