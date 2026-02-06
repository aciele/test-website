/*!
 * Copyright (c) 2026 Acoustic, L.P. All rights reserved.
 *
 * NOTICE: This file contains material that is confidential and proprietary to
 * Acoustic, L.P. and/or other developers. No license is granted under any intellectual or
 * industrial property rights of Acoustic, L.P. except as may be provided in an agreement with
 * Acoustic, L.P. Any unauthorized copying or distribution of content from this file is
 * prohibited.
 *
 * @version 6.4.189
 * @flags DEBUG
 */
if (window.TLT)
  throw new Error(
    "Attempting to recreate TLT. Library may be included more than once on the page.",
  );
if (
  ((window.TLT = (function () {
    "use strict";
    let e,
      t,
      n,
      o,
      r,
      i,
      a,
      s,
      l,
      c,
      u,
      d,
      f,
      p = !1;
    const h = 6e5;
    let g = !1;
    function m(e) {
      window.TLT && e.persisted && ((TLT.terminationReason = ""), TLT.init());
    }
    function y(e, t, n, o) {
      let r = null,
        a = null,
        l = null;
      const c = d.getOriginAndPath(),
        u = TLT.getModule("replay"),
        f = TLT.getModule("TLCookie"),
        p = TLT.getModule("performance");
      t &&
        "string" == typeof t &&
        ((n && "string" == typeof n) || (n = ""),
        (a = {
          type: 2,
          screenview: {
            type: e,
            name: t,
            originalUrl: c.path,
            url: TLT.normalizeUrl("", c.path, 2),
            host: c.origin,
            referrer: n,
            title: document.title,
            queryParams: c.queryParams,
          },
        }),
        "LOAD" === e
          ? (l = { type: "screenview_load", name: t })
          : "UNLOAD" === e && (l = { type: "screenview_unload", name: t }),
        l && u && (r = u.onevent(l)),
        r && (a.dcid = r),
        ("LOAD" !== e && "UNLOAD" !== e) || i.post("", a),
        l && f && f.onevent(l),
        l && p && p.onevent(l),
        l && s && s.onevent(l));
    }
    const v = new Date().getTime();
    let w, b;
    const T = {},
      S = {},
      x = {};
    let _ = !1,
      E = null;
    const C = (function () {
      let e,
        t = [];
      function o(o) {
        return (
          d.indexOf(t, o) < 0 &&
            (function (o) {
              const r = l.framesBlacklist;
              let i, a;
              if (
                ((e = e || []), (o = o || null), void 0 !== r && r.length > 0)
              ) {
                for (a = 0; a < r.length; a += 1)
                  ((i = n.queryAll(r[a], o)),
                    i && i.length > 0 && (e = e.concat(i)));
                t = t.concat(n.queryAll("iframe", o));
              }
            })(o.ownerDocument),
          d.indexOf(e, o) > -1
        );
      }
      return (
        (o.clearCache = function () {
          e = null;
        }),
        o
      );
    })();
    let L = null;
    const O = {
        config: [
          "getConfig",
          "getDefaultConfig",
          "updateConfig",
          "getCoreConfig",
          "updateCoreConfig",
          "getModuleConfig",
          "updateModuleConfig",
          "getServiceConfig",
          "updateServiceConfig",
        ],
        queue: ["post", "setAutoFlush", "flushAll", "setXHRLog"],
        browserBase: ["getXPathFromNode", "processDOMEvent"],
      },
      k = (function () {
        const e = {};
        return {
          normalizeModuleEvents: function (t, n, o, r) {
            const i = e[t];
            let a = !1,
              s = !1;
            ((o = o || q._getLocalTop()),
              i ||
                ((e[t] = { loadFired: !1, pageHideFired: !1 }),
                d.forEach(n, function (e) {
                  switch (e.name) {
                    case "load":
                      ((a = !0),
                        n.push(d.mixin(d.mixin({}, e), { name: "pageshow" })));
                      break;
                    case "unload":
                    case "pagehide":
                      if (!s) {
                        ((s = !0),
                          n.push(
                            d.mixin(d.mixin({}, e), { name: "beforeunload" }),
                          ));
                        break;
                      }
                    case "change":
                      d.isLegacyIE &&
                        n.push(
                          d.mixin(d.mixin({}, e), { name: "propertychange" }),
                        );
                  }
                }),
                a || s
                  ? ((e[t].silentLoad = !a),
                    (e[t].silentUnload = !s),
                    a || n.push({ name: "load", target: o }),
                    s || n.push({ name: "pagehide", target: o }))
                  : delete e[t]));
          },
          canPublish: function (t, n) {
            if (!1 === Object.prototype.hasOwnProperty.call(e, t)) return !0;
            const o = e[t];
            switch (n.type) {
              case "load":
                return (
                  (o.pageHideFired = !1),
                  (o.loadFired = !0),
                  !o.silentLoad
                );
              case "pageshow":
                return (
                  (o.pageHideFired = !1),
                  (n.type = "load"),
                  !o.loadFired && !o.silentLoad
                );
              case "pagehide":
              case "beforeunload":
                return (
                  (n.type = "pagehide"),
                  (o.loadFired = !1),
                  !o.pageHideFired && !o.silentUnload
                );
            }
            return !0;
          },
          isUnload: function (e) {
            return (
              "object" == typeof e &&
              ("pagehide" === e.type ||
                "beforeunload" === e.type ||
                "pagehide" === e.type)
            );
          },
        };
      })();
    let I = {},
      D = {},
      P = {},
      M = [],
      A = function () {},
      R = null,
      j = !0,
      N = function () {},
      z = !1;
    const U = (function () {
        const e = window.location;
        let t = e.pathname,
          n = e.hash,
          o = "";
        return function () {
          let r = o;
          const i = e.pathname,
            a = e.hash;
          (i !== t
            ? (r = TLT.normalizeUrl("", i + a, 2))
            : a !== n && (r = TLT.normalizeUrl("", a, 2)),
            r !== o &&
              (o && y("UNLOAD", o), y("LOAD", r), (o = r), (t = i), (n = a)));
        };
      })(),
      H = function (e, t) {
        let n,
          o,
          r,
          i,
          a,
          s = null;
        if (!e || !t) return s;
        for (n = 0, o = e.length; n < o; n += 1)
          switch (((r = e[n]), typeof r)) {
            case "object":
              ((i = new RegExp(r.regex, r.flags)),
                (a = i.exec(t)),
                a && (s = a[0]));
              break;
            case "string":
              -1 !== t.indexOf(r) && (s = r);
          }
        return s;
      };
    let V = function (e, t) {
      let o,
        r,
        i,
        a,
        s,
        c,
        u = !1;
      const f = l.blockedElements;
      if (!f || !f.length)
        return (
          (V = function () {
            return !1;
          }),
          u
        );
      if (!e || !e.nodeType) return u;
      for (t = t || d.getDocument(e), o = 0, i = f.length; o < i && !u; o += 1)
        for (s = n.queryAll(f[o], t), r = 0, c = s.length; r < c && !u; r += 1)
          ((a = s[r]), (u = a.contains ? a.contains(e) : a === e));
      return u;
    };
    const F = function (e) {
        let t = !1;
        return (
          e &&
            "a" === d.getTagName(e) &&
            -1 !== ["intent:", "mailto:", "sms:", "tel:"].indexOf(e.protocol) &&
            (t = !0),
          t
        );
      },
      X = function () {
        let e = null;
        const t = "tltTabId";
        try {
          ((e = sessionStorage.getItem(t)),
            e || ((e = d.getRandomString(4)), sessionStorage.setItem(t, e)));
        } catch (n) {
          ((e = window.altStorage.getData(t)),
            e ||
              ((e = d.getRandomString(4)), window.altStorage.saveData(t, e)));
        }
        return e;
      },
      q = {
        debugMode: !0,
        getBlockedUA: H,
        hasExcludedProtocol: F,
        getTabIndex: X,
        getTLTSessionCookieInfo: function () {
          return T;
        },
        _loadGlobalsForUnitTesting: function (c) {
          ((d = c.utils),
            (e = c.getService("ajax")),
            (t = c.getService("browserBase")),
            (n = c.getService("browser")),
            (o = c.getService("config")),
            (r = c.getService("domCapture")),
            (i = c.getService("queue")),
            (a = c.getService("serializer")),
            (s = c.getModule("dataLayer")),
            (l = o ? o.getCoreConfig() : null));
        },
        getStartTime: function () {
          return v;
        },
        getPageId: function () {
          return w || "#";
        },
        getTabId: function () {
          return b;
        },
        isMousemovementDetected: function () {
          return p;
        },
        setSessionCookieInfo: function (e, t, n) {
          ((T.tltCookieName = t), (T.tltCookieValue = n));
        },
        getLibraryVersion: function () {
          return "6.4.189";
        },
        getCurrentWebEvent: function () {
          return I;
        },
        normalizeUrl: function (e, t, n) {
          let o;
          const r = this.getCoreConfig();
          if (r.normalization && r.normalization.urlFunction) {
            ((o = r.normalization.urlFunction),
              "string" == typeof o && (o = d.access(o)));
            try {
              t = o(t, n);
            } catch (e) {
              d.clog("URL Normalization error", t, e);
            }
          }
          return t;
        },
        getCurrentOffset: function () {
          return this.getService("message").getCurrentOffset();
        },
        initLib: function (e, t, n, o) {
          return this.initLibAdv(e, t, {}, !0, !0, !0, !0, !0, n, o);
        },
        initPro: function (e) {
          if ("object" != typeof appKey && 1 !== arguments.length)
            return void console.warn(
              "Connect SDK initialization error. TLT.initPro parameter must be an object.",
            );
          if (e.newConfig)
            return void console.warn(
              "Connect SDK initialization error. TLT.initPro does not support custom configurations. Use TLT.initLibAdv instead.",
            );
          const t = window.TLT.getDefaultConfig();
          return (
            (t.core.modules.overstat.enabled = !1),
            (t.modules.replay.domCapture.enabled = !1),
            (t.modules.replay.mousemove.enabled = !1),
            (e.newConfig = t),
            this.initLibAdv(e)
          );
        },
        initPremium: function (e) {
          if ("object" == typeof appKey || 1 === arguments.length)
            return this.initLibAdv(e);
          console.warn(
            "Connect SDK initialization error. TLT.initPremium parameter must be an object.",
          );
        },
        initUltimate: function (e) {
          if ("object" == typeof appKey || 1 === arguments.length)
            return this.initLibAdv(e);
          console.warn(
            "Connect SDK initialization error. TLT.initUltimate parameter must be an object.",
          );
        },
        initLibAdv: function (e, t, n, o, r, i, a, s, l, c) {
          if ("object" == typeof e && 1 === arguments.length) {
            const u = e;
            ((e = u.appKey),
              (t = u.postUrl),
              (n = u.newConfig || {}),
              (o = void 0 === u.addPako || u.addPako),
              (r = u.addHammer || !1),
              (i = !1),
              (a = u.addAjaxListener || !1),
              (s = void 0 === u.addRestartTLTforSPA || u.addRestartTLTforSPA),
              (l = u.remoteConfigUrl),
              (c = u.callback));
          }
          return (
            "function" != typeof c && (c = void 0),
            "object" == typeof pako &&
            void 0 !== pako &&
            void 0 !== pako.deflate &&
            void 0 !== pako.Deflate
              ? console && console.info("Pako is already loaded.")
              : !0 === o &&
                (window.pako = (function e(t, n, o) {
                  function r(a, s) {
                    if (!n[a]) {
                      if (!t[a]) {
                        var l = "function" == typeof require && require;
                        if (!s && l) return l(a, !0);
                        if (i) return i(a, !0);
                        var c = new Error("Cannot find module '" + a + "'");
                        throw ((c.code = "MODULE_NOT_FOUND"), c);
                      }
                      var u = (n[a] = { exports: {} });
                      t[a][0].call(
                        u.exports,
                        function (e) {
                          return r(t[a][1][e] || e);
                        },
                        u,
                        u.exports,
                        e,
                        t,
                        n,
                        o,
                      );
                    }
                    return n[a].exports;
                  }
                  for (
                    var i = "function" == typeof require && require, a = 0;
                    a < o.length;
                    a++
                  )
                    r(o[a]);
                  return r;
                })(
                  {
                    1: [
                      function (e, t, n) {
                        var o =
                          "undefined" != typeof Uint8Array &&
                          "undefined" != typeof Uint16Array &&
                          "undefined" != typeof Int32Array;
                        ((n.assign = function (e) {
                          for (
                            var t,
                              n,
                              o = Array.prototype.slice.call(arguments, 1);
                            o.length;
                          ) {
                            var r = o.shift();
                            if (r) {
                              if ("object" != typeof r)
                                throw new TypeError(r + "must be non-object");
                              for (var i in r)
                                ((t = r),
                                  (n = i),
                                  Object.prototype.hasOwnProperty.call(t, n) &&
                                    (e[i] = r[i]));
                            }
                          }
                          return e;
                        }),
                          (n.shrinkBuf = function (e, t) {
                            return e.length === t
                              ? e
                              : e.subarray
                                ? e.subarray(0, t)
                                : ((e.length = t), e);
                          }));
                        var r = {
                            arraySet: function (e, t, n, o, r) {
                              if (t.subarray && e.subarray)
                                e.set(t.subarray(n, n + o), r);
                              else
                                for (var i = 0; i < o; i++) e[r + i] = t[n + i];
                            },
                            flattenChunks: function (e) {
                              var t, n, o, r, i, a;
                              for (t = o = 0, n = e.length; t < n; t++)
                                o += e[t].length;
                              for (
                                a = new Uint8Array(o), t = r = 0, n = e.length;
                                t < n;
                                t++
                              )
                                ((i = e[t]), a.set(i, r), (r += i.length));
                              return a;
                            },
                          },
                          i = {
                            arraySet: function (e, t, n, o, r) {
                              for (var i = 0; i < o; i++) e[r + i] = t[n + i];
                            },
                            flattenChunks: function (e) {
                              return [].concat.apply([], e);
                            },
                          };
                        ((n.setTyped = function (e) {
                          e
                            ? ((n.Buf8 = Uint8Array),
                              (n.Buf16 = Uint16Array),
                              (n.Buf32 = Int32Array),
                              n.assign(n, r))
                            : ((n.Buf8 = Array),
                              (n.Buf16 = Array),
                              (n.Buf32 = Array),
                              n.assign(n, i));
                        }),
                          n.setTyped(o));
                      },
                      {},
                    ],
                    2: [
                      function (e, t, n) {
                        var o = e("./common"),
                          r = !0,
                          i = !0;
                        try {
                          String.fromCharCode.apply(null, [0]);
                        } catch (e) {
                          r = !1;
                        }
                        try {
                          String.fromCharCode.apply(null, new Uint8Array(1));
                        } catch (e) {
                          i = !1;
                        }
                        for (var a = new o.Buf8(256), s = 0; s < 256; s++)
                          a[s] =
                            252 <= s
                              ? 6
                              : 248 <= s
                                ? 5
                                : 240 <= s
                                  ? 4
                                  : 224 <= s
                                    ? 3
                                    : 192 <= s
                                      ? 2
                                      : 1;
                        function l(e, t) {
                          if (
                            t < 65534 &&
                            ((e.subarray && i) || (!e.subarray && r))
                          )
                            return String.fromCharCode.apply(
                              null,
                              o.shrinkBuf(e, t),
                            );
                          for (var n = "", a = 0; a < t; a++)
                            n += String.fromCharCode(e[a]);
                          return n;
                        }
                        ((a[254] = a[254] = 1),
                          (n.string2buf = function (e) {
                            var t,
                              n,
                              r,
                              i,
                              a,
                              s = e.length,
                              l = 0;
                            for (i = 0; i < s; i++)
                              (55296 == (64512 & (n = e.charCodeAt(i))) &&
                                i + 1 < s &&
                                56320 == (64512 & (r = e.charCodeAt(i + 1))) &&
                                ((n =
                                  65536 + ((n - 55296) << 10) + (r - 56320)),
                                i++),
                                (l +=
                                  n < 128
                                    ? 1
                                    : n < 2048
                                      ? 2
                                      : n < 65536
                                        ? 3
                                        : 4));
                            for (t = new o.Buf8(l), i = a = 0; a < l; i++)
                              (55296 == (64512 & (n = e.charCodeAt(i))) &&
                                i + 1 < s &&
                                56320 == (64512 & (r = e.charCodeAt(i + 1))) &&
                                ((n =
                                  65536 + ((n - 55296) << 10) + (r - 56320)),
                                i++),
                                n < 128
                                  ? (t[a++] = n)
                                  : (n < 2048
                                      ? (t[a++] = 192 | (n >>> 6))
                                      : (n < 65536
                                          ? (t[a++] = 224 | (n >>> 12))
                                          : ((t[a++] = 240 | (n >>> 18)),
                                            (t[a++] = 128 | ((n >>> 12) & 63))),
                                        (t[a++] = 128 | ((n >>> 6) & 63))),
                                    (t[a++] = 128 | (63 & n))));
                            return t;
                          }),
                          (n.buf2binstring = function (e) {
                            return l(e, e.length);
                          }),
                          (n.binstring2buf = function (e) {
                            for (
                              var t = new o.Buf8(e.length), n = 0, r = t.length;
                              n < r;
                              n++
                            )
                              t[n] = e.charCodeAt(n);
                            return t;
                          }),
                          (n.buf2string = function (e, t) {
                            var n,
                              o,
                              r,
                              i,
                              s = t || e.length,
                              c = new Array(2 * s);
                            for (n = o = 0; n < s; )
                              if ((r = e[n++]) < 128) c[o++] = r;
                              else if (4 < (i = a[r]))
                                ((c[o++] = 65533), (n += i - 1));
                              else {
                                for (
                                  r &= 2 === i ? 31 : 3 === i ? 15 : 7;
                                  1 < i && n < s;
                                )
                                  ((r = (r << 6) | (63 & e[n++])), i--);
                                1 < i
                                  ? (c[o++] = 65533)
                                  : r < 65536
                                    ? (c[o++] = r)
                                    : ((r -= 65536),
                                      (c[o++] = 55296 | ((r >> 10) & 1023)),
                                      (c[o++] = 56320 | (1023 & r)));
                              }
                            return l(c, o);
                          }),
                          (n.utf8border = function (e, t) {
                            var n;
                            for (
                              (t = t || e.length) > e.length && (t = e.length),
                                n = t - 1;
                              0 <= n && 128 == (192 & e[n]);
                            )
                              n--;
                            return n < 0 || 0 === n
                              ? t
                              : n + a[e[n]] > t
                                ? n
                                : t;
                          }));
                      },
                      { "./common": 1 },
                    ],
                    3: [
                      function (e, t, n) {
                        t.exports = function (e, t, n, o) {
                          for (
                            var r = 65535 & e, i = (e >>> 16) & 65535, a = 0;
                            0 !== n;
                          ) {
                            for (
                              n -= a = 2e3 < n ? 2e3 : n;
                              (i = (i + (r = (r + t[o++]) | 0)) | 0), --a;
                            );
                            ((r %= 65521), (i %= 65521));
                          }
                          return r | (i << 16);
                        };
                      },
                      {},
                    ],
                    4: [
                      function (e, t, n) {
                        var o = (function () {
                          for (var e, t = [], n = 0; n < 256; n++) {
                            e = n;
                            for (var o = 0; o < 8; o++)
                              e = 1 & e ? 3988292384 ^ (e >>> 1) : e >>> 1;
                            t[n] = e;
                          }
                          return t;
                        })();
                        t.exports = function (e, t, n, r) {
                          var i = o,
                            a = r + n;
                          e ^= -1;
                          for (var s = r; s < a; s++)
                            e = (e >>> 8) ^ i[255 & (e ^ t[s])];
                          return ~e;
                        };
                      },
                      {},
                    ],
                    5: [
                      function (e, t, n) {
                        var o,
                          r = e("../utils/common"),
                          i = e("./trees"),
                          a = e("./adler32"),
                          s = e("./crc32"),
                          l = e("./messages"),
                          c = 0,
                          u = 4,
                          d = 0,
                          f = -2,
                          p = -1,
                          h = 4,
                          g = 2,
                          m = 8,
                          y = 9,
                          v = 286,
                          w = 30,
                          b = 19,
                          T = 2 * v + 1,
                          S = 15,
                          x = 3,
                          _ = 258,
                          E = _ + x + 1,
                          C = 42,
                          L = 113,
                          O = 1,
                          k = 2,
                          I = 3,
                          D = 4;
                        function P(e, t) {
                          return ((e.msg = l[t]), t);
                        }
                        function M(e) {
                          return (e << 1) - (4 < e ? 9 : 0);
                        }
                        function A(e) {
                          for (var t = e.length; 0 <= --t; ) e[t] = 0;
                        }
                        function R(e) {
                          var t = e.state,
                            n = t.pending;
                          (n > e.avail_out && (n = e.avail_out),
                            0 !== n &&
                              (r.arraySet(
                                e.output,
                                t.pending_buf,
                                t.pending_out,
                                n,
                                e.next_out,
                              ),
                              (e.next_out += n),
                              (t.pending_out += n),
                              (e.total_out += n),
                              (e.avail_out -= n),
                              (t.pending -= n),
                              0 === t.pending && (t.pending_out = 0)));
                        }
                        function j(e, t) {
                          (i._tr_flush_block(
                            e,
                            0 <= e.block_start ? e.block_start : -1,
                            e.strstart - e.block_start,
                            t,
                          ),
                            (e.block_start = e.strstart),
                            R(e.strm));
                        }
                        function N(e, t) {
                          e.pending_buf[e.pending++] = t;
                        }
                        function z(e, t) {
                          ((e.pending_buf[e.pending++] = (t >>> 8) & 255),
                            (e.pending_buf[e.pending++] = 255 & t));
                        }
                        function U(e, t) {
                          var n,
                            o,
                            r = e.max_chain_length,
                            i = e.strstart,
                            a = e.prev_length,
                            s = e.nice_match,
                            l =
                              e.strstart > e.w_size - E
                                ? e.strstart - (e.w_size - E)
                                : 0,
                            c = e.window,
                            u = e.w_mask,
                            d = e.prev,
                            f = e.strstart + _,
                            p = c[i + a - 1],
                            h = c[i + a];
                          (e.prev_length >= e.good_match && (r >>= 2),
                            s > e.lookahead && (s = e.lookahead));
                          do {
                            if (
                              c[(n = t) + a] === h &&
                              c[n + a - 1] === p &&
                              c[n] === c[i] &&
                              c[++n] === c[i + 1]
                            ) {
                              ((i += 2), n++);
                              do {} while (
                                c[++i] === c[++n] &&
                                c[++i] === c[++n] &&
                                c[++i] === c[++n] &&
                                c[++i] === c[++n] &&
                                c[++i] === c[++n] &&
                                c[++i] === c[++n] &&
                                c[++i] === c[++n] &&
                                c[++i] === c[++n] &&
                                i < f
                              );
                              if (((o = _ - (f - i)), (i = f - _), a < o)) {
                                if (((e.match_start = t), s <= (a = o))) break;
                                ((p = c[i + a - 1]), (h = c[i + a]));
                              }
                            }
                          } while ((t = d[t & u]) > l && 0 != --r);
                          return a <= e.lookahead ? a : e.lookahead;
                        }
                        function H(e) {
                          var t,
                            n,
                            o,
                            i,
                            l,
                            c,
                            u,
                            d,
                            f,
                            p,
                            h = e.w_size;
                          do {
                            if (
                              ((i = e.window_size - e.lookahead - e.strstart),
                              e.strstart >= h + (h - E))
                            ) {
                              for (
                                r.arraySet(e.window, e.window, h, h, 0),
                                  e.match_start -= h,
                                  e.strstart -= h,
                                  e.block_start -= h,
                                  t = n = e.hash_size;
                                (o = e.head[--t]),
                                  (e.head[t] = h <= o ? o - h : 0),
                                  --n;
                              );
                              for (
                                t = n = h;
                                (o = e.prev[--t]),
                                  (e.prev[t] = h <= o ? o - h : 0),
                                  --n;
                              );
                              i += h;
                            }
                            if (0 === e.strm.avail_in) break;
                            if (
                              ((c = e.strm),
                              (u = e.window),
                              (d = e.strstart + e.lookahead),
                              (p = void 0),
                              (f = i) < (p = c.avail_in) && (p = f),
                              (n =
                                0 === p
                                  ? 0
                                  : ((c.avail_in -= p),
                                    r.arraySet(u, c.input, c.next_in, p, d),
                                    1 === c.state.wrap
                                      ? (c.adler = a(c.adler, u, p, d))
                                      : 2 === c.state.wrap &&
                                        (c.adler = s(c.adler, u, p, d)),
                                    (c.next_in += p),
                                    (c.total_in += p),
                                    p)),
                              (e.lookahead += n),
                              e.lookahead + e.insert >= x)
                            )
                              for (
                                l = e.strstart - e.insert,
                                  e.ins_h = e.window[l],
                                  e.ins_h =
                                    ((e.ins_h << e.hash_shift) ^
                                      e.window[l + 1]) &
                                    e.hash_mask;
                                e.insert &&
                                ((e.ins_h =
                                  ((e.ins_h << e.hash_shift) ^
                                    e.window[l + x - 1]) &
                                  e.hash_mask),
                                (e.prev[l & e.w_mask] = e.head[e.ins_h]),
                                (e.head[e.ins_h] = l),
                                l++,
                                e.insert--,
                                !(e.lookahead + e.insert < x));
                              );
                          } while (e.lookahead < E && 0 !== e.strm.avail_in);
                        }
                        function V(e, t) {
                          for (var n, o; ; ) {
                            if (e.lookahead < E) {
                              if ((H(e), e.lookahead < E && t === c)) return O;
                              if (0 === e.lookahead) break;
                            }
                            if (
                              ((n = 0),
                              e.lookahead >= x &&
                                ((e.ins_h =
                                  ((e.ins_h << e.hash_shift) ^
                                    e.window[e.strstart + x - 1]) &
                                  e.hash_mask),
                                (n = e.prev[e.strstart & e.w_mask] =
                                  e.head[e.ins_h]),
                                (e.head[e.ins_h] = e.strstart)),
                              0 !== n &&
                                e.strstart - n <= e.w_size - E &&
                                (e.match_length = U(e, n)),
                              e.match_length >= x)
                            )
                              if (
                                ((o = i._tr_tally(
                                  e,
                                  e.strstart - e.match_start,
                                  e.match_length - x,
                                )),
                                (e.lookahead -= e.match_length),
                                e.match_length <= e.max_lazy_match &&
                                  e.lookahead >= x)
                              ) {
                                for (
                                  e.match_length--;
                                  e.strstart++,
                                    (e.ins_h =
                                      ((e.ins_h << e.hash_shift) ^
                                        e.window[e.strstart + x - 1]) &
                                      e.hash_mask),
                                    (n = e.prev[e.strstart & e.w_mask] =
                                      e.head[e.ins_h]),
                                    (e.head[e.ins_h] = e.strstart),
                                    0 != --e.match_length;
                                );
                                e.strstart++;
                              } else
                                ((e.strstart += e.match_length),
                                  (e.match_length = 0),
                                  (e.ins_h = e.window[e.strstart]),
                                  (e.ins_h =
                                    ((e.ins_h << e.hash_shift) ^
                                      e.window[e.strstart + 1]) &
                                    e.hash_mask));
                            else
                              ((o = i._tr_tally(e, 0, e.window[e.strstart])),
                                e.lookahead--,
                                e.strstart++);
                            if (o && (j(e, !1), 0 === e.strm.avail_out))
                              return O;
                          }
                          return (
                            (e.insert =
                              e.strstart < x - 1 ? e.strstart : x - 1),
                            t === u
                              ? (j(e, !0), 0 === e.strm.avail_out ? I : D)
                              : e.last_lit && (j(e, !1), 0 === e.strm.avail_out)
                                ? O
                                : k
                          );
                        }
                        function F(e, t) {
                          for (var n, o, r; ; ) {
                            if (e.lookahead < E) {
                              if ((H(e), e.lookahead < E && t === c)) return O;
                              if (0 === e.lookahead) break;
                            }
                            if (
                              ((n = 0),
                              e.lookahead >= x &&
                                ((e.ins_h =
                                  ((e.ins_h << e.hash_shift) ^
                                    e.window[e.strstart + x - 1]) &
                                  e.hash_mask),
                                (n = e.prev[e.strstart & e.w_mask] =
                                  e.head[e.ins_h]),
                                (e.head[e.ins_h] = e.strstart)),
                              (e.prev_length = e.match_length),
                              (e.prev_match = e.match_start),
                              (e.match_length = x - 1),
                              0 !== n &&
                                e.prev_length < e.max_lazy_match &&
                                e.strstart - n <= e.w_size - E &&
                                ((e.match_length = U(e, n)),
                                e.match_length <= 5 &&
                                  (1 === e.strategy ||
                                    (e.match_length === x &&
                                      4096 < e.strstart - e.match_start)) &&
                                  (e.match_length = x - 1)),
                              e.prev_length >= x &&
                                e.match_length <= e.prev_length)
                            ) {
                              for (
                                r = e.strstart + e.lookahead - x,
                                  o = i._tr_tally(
                                    e,
                                    e.strstart - 1 - e.prev_match,
                                    e.prev_length - x,
                                  ),
                                  e.lookahead -= e.prev_length - 1,
                                  e.prev_length -= 2;
                                ++e.strstart <= r &&
                                  ((e.ins_h =
                                    ((e.ins_h << e.hash_shift) ^
                                      e.window[e.strstart + x - 1]) &
                                    e.hash_mask),
                                  (n = e.prev[e.strstart & e.w_mask] =
                                    e.head[e.ins_h]),
                                  (e.head[e.ins_h] = e.strstart)),
                                  0 != --e.prev_length;
                              );
                              if (
                                ((e.match_available = 0),
                                (e.match_length = x - 1),
                                e.strstart++,
                                o && (j(e, !1), 0 === e.strm.avail_out))
                              )
                                return O;
                            } else if (e.match_available) {
                              if (
                                ((o = i._tr_tally(
                                  e,
                                  0,
                                  e.window[e.strstart - 1],
                                )) && j(e, !1),
                                e.strstart++,
                                e.lookahead--,
                                0 === e.strm.avail_out)
                              )
                                return O;
                            } else
                              ((e.match_available = 1),
                                e.strstart++,
                                e.lookahead--);
                          }
                          return (
                            e.match_available &&
                              ((o = i._tr_tally(
                                e,
                                0,
                                e.window[e.strstart - 1],
                              )),
                              (e.match_available = 0)),
                            (e.insert =
                              e.strstart < x - 1 ? e.strstart : x - 1),
                            t === u
                              ? (j(e, !0), 0 === e.strm.avail_out ? I : D)
                              : e.last_lit && (j(e, !1), 0 === e.strm.avail_out)
                                ? O
                                : k
                          );
                        }
                        function X(e, t, n, o, r) {
                          ((this.good_length = e),
                            (this.max_lazy = t),
                            (this.nice_length = n),
                            (this.max_chain = o),
                            (this.func = r));
                        }
                        function q() {
                          ((this.strm = null),
                            (this.status = 0),
                            (this.pending_buf = null),
                            (this.pending_buf_size = 0),
                            (this.pending_out = 0),
                            (this.pending = 0),
                            (this.wrap = 0),
                            (this.gzhead = null),
                            (this.gzindex = 0),
                            (this.method = m),
                            (this.last_flush = -1),
                            (this.w_size = 0),
                            (this.w_bits = 0),
                            (this.w_mask = 0),
                            (this.window = null),
                            (this.window_size = 0),
                            (this.prev = null),
                            (this.head = null),
                            (this.ins_h = 0),
                            (this.hash_size = 0),
                            (this.hash_bits = 0),
                            (this.hash_mask = 0),
                            (this.hash_shift = 0),
                            (this.block_start = 0),
                            (this.match_length = 0),
                            (this.prev_match = 0),
                            (this.match_available = 0),
                            (this.strstart = 0),
                            (this.match_start = 0),
                            (this.lookahead = 0),
                            (this.prev_length = 0),
                            (this.max_chain_length = 0),
                            (this.max_lazy_match = 0),
                            (this.level = 0),
                            (this.strategy = 0),
                            (this.good_match = 0),
                            (this.nice_match = 0),
                            (this.dyn_ltree = new r.Buf16(2 * T)),
                            (this.dyn_dtree = new r.Buf16(2 * (2 * w + 1))),
                            (this.bl_tree = new r.Buf16(2 * (2 * b + 1))),
                            A(this.dyn_ltree),
                            A(this.dyn_dtree),
                            A(this.bl_tree),
                            (this.l_desc = null),
                            (this.d_desc = null),
                            (this.bl_desc = null),
                            (this.bl_count = new r.Buf16(S + 1)),
                            (this.heap = new r.Buf16(2 * v + 1)),
                            A(this.heap),
                            (this.heap_len = 0),
                            (this.heap_max = 0),
                            (this.depth = new r.Buf16(2 * v + 1)),
                            A(this.depth),
                            (this.l_buf = 0),
                            (this.lit_bufsize = 0),
                            (this.last_lit = 0),
                            (this.d_buf = 0),
                            (this.opt_len = 0),
                            (this.static_len = 0),
                            (this.matches = 0),
                            (this.insert = 0),
                            (this.bi_buf = 0),
                            (this.bi_valid = 0));
                        }
                        function B(e) {
                          var t;
                          return e && e.state
                            ? ((e.total_in = e.total_out = 0),
                              (e.data_type = g),
                              ((t = e.state).pending = 0),
                              (t.pending_out = 0),
                              t.wrap < 0 && (t.wrap = -t.wrap),
                              (t.status = t.wrap ? C : L),
                              (e.adler = 2 === t.wrap ? 0 : 1),
                              (t.last_flush = c),
                              i._tr_init(t),
                              d)
                            : P(e, f);
                        }
                        function W(e) {
                          var t,
                            n = B(e);
                          return (
                            n === d &&
                              (((t = e.state).window_size = 2 * t.w_size),
                              A(t.head),
                              (t.max_lazy_match = o[t.level].max_lazy),
                              (t.good_match = o[t.level].good_length),
                              (t.nice_match = o[t.level].nice_length),
                              (t.max_chain_length = o[t.level].max_chain),
                              (t.strstart = 0),
                              (t.block_start = 0),
                              (t.lookahead = 0),
                              (t.insert = 0),
                              (t.match_length = t.prev_length = x - 1),
                              (t.match_available = 0),
                              (t.ins_h = 0)),
                            n
                          );
                        }
                        function Y(e, t, n, o, i, a) {
                          if (!e) return f;
                          var s = 1;
                          if (
                            (t === p && (t = 6),
                            o < 0
                              ? ((s = 0), (o = -o))
                              : 15 < o && ((s = 2), (o -= 16)),
                            i < 1 ||
                              y < i ||
                              n !== m ||
                              o < 8 ||
                              15 < o ||
                              t < 0 ||
                              9 < t ||
                              a < 0 ||
                              h < a)
                          )
                            return P(e, f);
                          8 === o && (o = 9);
                          var l = new q();
                          return (
                            ((e.state = l).strm = e),
                            (l.wrap = s),
                            (l.gzhead = null),
                            (l.w_bits = o),
                            (l.w_size = 1 << l.w_bits),
                            (l.w_mask = l.w_size - 1),
                            (l.hash_bits = i + 7),
                            (l.hash_size = 1 << l.hash_bits),
                            (l.hash_mask = l.hash_size - 1),
                            (l.hash_shift = ~~((l.hash_bits + x - 1) / x)),
                            (l.window = new r.Buf8(2 * l.w_size)),
                            (l.head = new r.Buf16(l.hash_size)),
                            (l.prev = new r.Buf16(l.w_size)),
                            (l.lit_bufsize = 1 << (i + 6)),
                            (l.pending_buf_size = 4 * l.lit_bufsize),
                            (l.pending_buf = new r.Buf8(l.pending_buf_size)),
                            (l.d_buf = 1 * l.lit_bufsize),
                            (l.l_buf = 3 * l.lit_bufsize),
                            (l.level = t),
                            (l.strategy = a),
                            (l.method = n),
                            W(e)
                          );
                        }
                        ((o = [
                          new X(0, 0, 0, 0, function (e, t) {
                            var n = 65535;
                            for (
                              n > e.pending_buf_size - 5 &&
                              (n = e.pending_buf_size - 5);
                              ;
                            ) {
                              if (e.lookahead <= 1) {
                                if ((H(e), 0 === e.lookahead && t === c))
                                  return O;
                                if (0 === e.lookahead) break;
                              }
                              ((e.strstart += e.lookahead), (e.lookahead = 0));
                              var o = e.block_start + n;
                              if (
                                (0 === e.strstart || e.strstart >= o) &&
                                ((e.lookahead = e.strstart - o),
                                (e.strstart = o),
                                j(e, !1),
                                0 === e.strm.avail_out)
                              )
                                return O;
                              if (
                                e.strstart - e.block_start >= e.w_size - E &&
                                (j(e, !1), 0 === e.strm.avail_out)
                              )
                                return O;
                            }
                            return (
                              (e.insert = 0),
                              t === u
                                ? (j(e, !0), 0 === e.strm.avail_out ? I : D)
                                : (e.strstart > e.block_start &&
                                    (j(e, !1), e.strm.avail_out),
                                  O)
                            );
                          }),
                          new X(4, 4, 8, 4, V),
                          new X(4, 5, 16, 8, V),
                          new X(4, 6, 32, 32, V),
                          new X(4, 4, 16, 16, F),
                          new X(8, 16, 32, 32, F),
                          new X(8, 16, 128, 128, F),
                          new X(8, 32, 128, 256, F),
                          new X(32, 128, 258, 1024, F),
                          new X(32, 258, 258, 4096, F),
                        ]),
                          (n.deflateInit = function (e, t) {
                            return Y(e, t, m, 15, 8, 0);
                          }),
                          (n.deflateInit2 = Y),
                          (n.deflateReset = W),
                          (n.deflateResetKeep = B),
                          (n.deflateSetHeader = function (e, t) {
                            return e && e.state
                              ? 2 !== e.state.wrap
                                ? f
                                : ((e.state.gzhead = t), d)
                              : f;
                          }),
                          (n.deflate = function (e, t) {
                            var n, r, a, l;
                            if (!e || !e.state || 5 < t || t < 0)
                              return e ? P(e, f) : f;
                            if (
                              ((r = e.state),
                              !e.output ||
                                (!e.input && 0 !== e.avail_in) ||
                                (666 === r.status && t !== u))
                            )
                              return P(e, 0 === e.avail_out ? -5 : f);
                            if (
                              ((r.strm = e),
                              (n = r.last_flush),
                              (r.last_flush = t),
                              r.status === C)
                            )
                              if (2 === r.wrap)
                                ((e.adler = 0),
                                  N(r, 31),
                                  N(r, 139),
                                  N(r, 8),
                                  r.gzhead
                                    ? (N(
                                        r,
                                        (r.gzhead.text ? 1 : 0) +
                                          (r.gzhead.hcrc ? 2 : 0) +
                                          (r.gzhead.extra ? 4 : 0) +
                                          (r.gzhead.name ? 8 : 0) +
                                          (r.gzhead.comment ? 16 : 0),
                                      ),
                                      N(r, 255 & r.gzhead.time),
                                      N(r, (r.gzhead.time >> 8) & 255),
                                      N(r, (r.gzhead.time >> 16) & 255),
                                      N(r, (r.gzhead.time >> 24) & 255),
                                      N(
                                        r,
                                        9 === r.level
                                          ? 2
                                          : 2 <= r.strategy || r.level < 2
                                            ? 4
                                            : 0,
                                      ),
                                      N(r, 255 & r.gzhead.os),
                                      r.gzhead.extra &&
                                        r.gzhead.extra.length &&
                                        (N(r, 255 & r.gzhead.extra.length),
                                        N(
                                          r,
                                          (r.gzhead.extra.length >> 8) & 255,
                                        )),
                                      r.gzhead.hcrc &&
                                        (e.adler = s(
                                          e.adler,
                                          r.pending_buf,
                                          r.pending,
                                          0,
                                        )),
                                      (r.gzindex = 0),
                                      (r.status = 69))
                                    : (N(r, 0),
                                      N(r, 0),
                                      N(r, 0),
                                      N(r, 0),
                                      N(r, 0),
                                      N(
                                        r,
                                        9 === r.level
                                          ? 2
                                          : 2 <= r.strategy || r.level < 2
                                            ? 4
                                            : 0,
                                      ),
                                      N(r, 3),
                                      (r.status = L)));
                              else {
                                var p = (m + ((r.w_bits - 8) << 4)) << 8;
                                ((p |=
                                  (2 <= r.strategy || r.level < 2
                                    ? 0
                                    : r.level < 6
                                      ? 1
                                      : 6 === r.level
                                        ? 2
                                        : 3) << 6),
                                  0 !== r.strstart && (p |= 32),
                                  (p += 31 - (p % 31)),
                                  (r.status = L),
                                  z(r, p),
                                  0 !== r.strstart &&
                                    (z(r, e.adler >>> 16),
                                    z(r, 65535 & e.adler)),
                                  (e.adler = 1));
                              }
                            if (69 === r.status)
                              if (r.gzhead.extra) {
                                for (
                                  a = r.pending;
                                  r.gzindex < (65535 & r.gzhead.extra.length) &&
                                  (r.pending !== r.pending_buf_size ||
                                    (r.gzhead.hcrc &&
                                      r.pending > a &&
                                      (e.adler = s(
                                        e.adler,
                                        r.pending_buf,
                                        r.pending - a,
                                        a,
                                      )),
                                    R(e),
                                    (a = r.pending),
                                    r.pending !== r.pending_buf_size));
                                )
                                  (N(r, 255 & r.gzhead.extra[r.gzindex]),
                                    r.gzindex++);
                                (r.gzhead.hcrc &&
                                  r.pending > a &&
                                  (e.adler = s(
                                    e.adler,
                                    r.pending_buf,
                                    r.pending - a,
                                    a,
                                  )),
                                  r.gzindex === r.gzhead.extra.length &&
                                    ((r.gzindex = 0), (r.status = 73)));
                              } else r.status = 73;
                            if (73 === r.status)
                              if (r.gzhead.name) {
                                a = r.pending;
                                do {
                                  if (
                                    r.pending === r.pending_buf_size &&
                                    (r.gzhead.hcrc &&
                                      r.pending > a &&
                                      (e.adler = s(
                                        e.adler,
                                        r.pending_buf,
                                        r.pending - a,
                                        a,
                                      )),
                                    R(e),
                                    (a = r.pending),
                                    r.pending === r.pending_buf_size)
                                  ) {
                                    l = 1;
                                    break;
                                  }
                                  N(
                                    r,
                                    (l =
                                      r.gzindex < r.gzhead.name.length
                                        ? 255 &
                                          r.gzhead.name.charCodeAt(r.gzindex++)
                                        : 0),
                                  );
                                } while (0 !== l);
                                (r.gzhead.hcrc &&
                                  r.pending > a &&
                                  (e.adler = s(
                                    e.adler,
                                    r.pending_buf,
                                    r.pending - a,
                                    a,
                                  )),
                                  0 === l &&
                                    ((r.gzindex = 0), (r.status = 91)));
                              } else r.status = 91;
                            if (91 === r.status)
                              if (r.gzhead.comment) {
                                a = r.pending;
                                do {
                                  if (
                                    r.pending === r.pending_buf_size &&
                                    (r.gzhead.hcrc &&
                                      r.pending > a &&
                                      (e.adler = s(
                                        e.adler,
                                        r.pending_buf,
                                        r.pending - a,
                                        a,
                                      )),
                                    R(e),
                                    (a = r.pending),
                                    r.pending === r.pending_buf_size)
                                  ) {
                                    l = 1;
                                    break;
                                  }
                                  N(
                                    r,
                                    (l =
                                      r.gzindex < r.gzhead.comment.length
                                        ? 255 &
                                          r.gzhead.comment.charCodeAt(
                                            r.gzindex++,
                                          )
                                        : 0),
                                  );
                                } while (0 !== l);
                                (r.gzhead.hcrc &&
                                  r.pending > a &&
                                  (e.adler = s(
                                    e.adler,
                                    r.pending_buf,
                                    r.pending - a,
                                    a,
                                  )),
                                  0 === l && (r.status = 103));
                              } else r.status = 103;
                            if (
                              (103 === r.status &&
                                (r.gzhead.hcrc
                                  ? (r.pending + 2 > r.pending_buf_size && R(e),
                                    r.pending + 2 <= r.pending_buf_size &&
                                      (N(r, 255 & e.adler),
                                      N(r, (e.adler >> 8) & 255),
                                      (e.adler = 0),
                                      (r.status = L)))
                                  : (r.status = L)),
                              0 !== r.pending)
                            ) {
                              if ((R(e), 0 === e.avail_out))
                                return ((r.last_flush = -1), d);
                            } else if (
                              0 === e.avail_in &&
                              M(t) <= M(n) &&
                              t !== u
                            )
                              return P(e, -5);
                            if (666 === r.status && 0 !== e.avail_in)
                              return P(e, -5);
                            if (
                              0 !== e.avail_in ||
                              0 !== r.lookahead ||
                              (t !== c && 666 !== r.status)
                            ) {
                              var h =
                                2 === r.strategy
                                  ? (function (e, t) {
                                      for (var n; ; ) {
                                        if (
                                          0 === e.lookahead &&
                                          (H(e), 0 === e.lookahead)
                                        ) {
                                          if (t === c) return O;
                                          break;
                                        }
                                        if (
                                          ((e.match_length = 0),
                                          (n = i._tr_tally(
                                            e,
                                            0,
                                            e.window[e.strstart],
                                          )),
                                          e.lookahead--,
                                          e.strstart++,
                                          n &&
                                            (j(e, !1), 0 === e.strm.avail_out))
                                        )
                                          return O;
                                      }
                                      return (
                                        (e.insert = 0),
                                        t === u
                                          ? (j(e, !0),
                                            0 === e.strm.avail_out ? I : D)
                                          : e.last_lit &&
                                              (j(e, !1), 0 === e.strm.avail_out)
                                            ? O
                                            : k
                                      );
                                    })(r, t)
                                  : 3 === r.strategy
                                    ? (function (e, t) {
                                        for (var n, o, r, a, s = e.window; ; ) {
                                          if (e.lookahead <= _) {
                                            if (
                                              (H(e),
                                              e.lookahead <= _ && t === c)
                                            )
                                              return O;
                                            if (0 === e.lookahead) break;
                                          }
                                          if (
                                            ((e.match_length = 0),
                                            e.lookahead >= x &&
                                              0 < e.strstart &&
                                              (o = s[(r = e.strstart - 1)]) ===
                                                s[++r] &&
                                              o === s[++r] &&
                                              o === s[++r])
                                          ) {
                                            a = e.strstart + _;
                                            do {} while (
                                              o === s[++r] &&
                                              o === s[++r] &&
                                              o === s[++r] &&
                                              o === s[++r] &&
                                              o === s[++r] &&
                                              o === s[++r] &&
                                              o === s[++r] &&
                                              o === s[++r] &&
                                              r < a
                                            );
                                            ((e.match_length = _ - (a - r)),
                                              e.match_length > e.lookahead &&
                                                (e.match_length = e.lookahead));
                                          }
                                          if (
                                            (e.match_length >= x
                                              ? ((n = i._tr_tally(
                                                  e,
                                                  1,
                                                  e.match_length - x,
                                                )),
                                                (e.lookahead -= e.match_length),
                                                (e.strstart += e.match_length),
                                                (e.match_length = 0))
                                              : ((n = i._tr_tally(
                                                  e,
                                                  0,
                                                  e.window[e.strstart],
                                                )),
                                                e.lookahead--,
                                                e.strstart++),
                                            n &&
                                              (j(e, !1),
                                              0 === e.strm.avail_out))
                                          )
                                            return O;
                                        }
                                        return (
                                          (e.insert = 0),
                                          t === u
                                            ? (j(e, !0),
                                              0 === e.strm.avail_out ? I : D)
                                            : e.last_lit &&
                                                (j(e, !1),
                                                0 === e.strm.avail_out)
                                              ? O
                                              : k
                                        );
                                      })(r, t)
                                    : o[r.level].func(r, t);
                              if (
                                ((h !== I && h !== D) || (r.status = 666),
                                h === O || h === I)
                              )
                                return (
                                  0 === e.avail_out && (r.last_flush = -1),
                                  d
                                );
                              if (
                                h === k &&
                                (1 === t
                                  ? i._tr_align(r)
                                  : 5 !== t &&
                                    (i._tr_stored_block(r, 0, 0, !1),
                                    3 === t &&
                                      (A(r.head),
                                      0 === r.lookahead &&
                                        ((r.strstart = 0),
                                        (r.block_start = 0),
                                        (r.insert = 0)))),
                                R(e),
                                0 === e.avail_out)
                              )
                                return ((r.last_flush = -1), d);
                            }
                            return t !== u
                              ? d
                              : r.wrap <= 0
                                ? 1
                                : (2 === r.wrap
                                    ? (N(r, 255 & e.adler),
                                      N(r, (e.adler >> 8) & 255),
                                      N(r, (e.adler >> 16) & 255),
                                      N(r, (e.adler >> 24) & 255),
                                      N(r, 255 & e.total_in),
                                      N(r, (e.total_in >> 8) & 255),
                                      N(r, (e.total_in >> 16) & 255),
                                      N(r, (e.total_in >> 24) & 255))
                                    : (z(r, e.adler >>> 16),
                                      z(r, 65535 & e.adler)),
                                  R(e),
                                  0 < r.wrap && (r.wrap = -r.wrap),
                                  0 !== r.pending ? d : 1);
                          }),
                          (n.deflateEnd = function (e) {
                            var t;
                            return e && e.state
                              ? (t = e.state.status) !== C &&
                                69 !== t &&
                                73 !== t &&
                                91 !== t &&
                                103 !== t &&
                                t !== L &&
                                666 !== t
                                ? P(e, f)
                                : ((e.state = null), t === L ? P(e, -3) : d)
                              : f;
                          }),
                          (n.deflateSetDictionary = function (e, t) {
                            var n,
                              o,
                              i,
                              s,
                              l,
                              c,
                              u,
                              p,
                              h = t.length;
                            if (!e || !e.state) return f;
                            if (
                              2 === (s = (n = e.state).wrap) ||
                              (1 === s && n.status !== C) ||
                              n.lookahead
                            )
                              return f;
                            for (
                              1 === s && (e.adler = a(e.adler, t, h, 0)),
                                n.wrap = 0,
                                h >= n.w_size &&
                                  (0 === s &&
                                    (A(n.head),
                                    (n.strstart = 0),
                                    (n.block_start = 0),
                                    (n.insert = 0)),
                                  (p = new r.Buf8(n.w_size)),
                                  r.arraySet(p, t, h - n.w_size, n.w_size, 0),
                                  (t = p),
                                  (h = n.w_size)),
                                l = e.avail_in,
                                c = e.next_in,
                                u = e.input,
                                e.avail_in = h,
                                e.next_in = 0,
                                e.input = t,
                                H(n);
                              n.lookahead >= x;
                            ) {
                              for (
                                o = n.strstart, i = n.lookahead - (x - 1);
                                (n.ins_h =
                                  ((n.ins_h << n.hash_shift) ^
                                    n.window[o + x - 1]) &
                                  n.hash_mask),
                                  (n.prev[o & n.w_mask] = n.head[n.ins_h]),
                                  (n.head[n.ins_h] = o),
                                  o++,
                                  --i;
                              );
                              ((n.strstart = o), (n.lookahead = x - 1), H(n));
                            }
                            return (
                              (n.strstart += n.lookahead),
                              (n.block_start = n.strstart),
                              (n.insert = n.lookahead),
                              (n.lookahead = 0),
                              (n.match_length = n.prev_length = x - 1),
                              (n.match_available = 0),
                              (e.next_in = c),
                              (e.input = u),
                              (e.avail_in = l),
                              (n.wrap = s),
                              d
                            );
                          }),
                          (n.deflateInfo =
                            "pako deflate (from Nodeca project)"));
                      },
                      {
                        "../utils/common": 1,
                        "./adler32": 3,
                        "./crc32": 4,
                        "./messages": 6,
                        "./trees": 7,
                      },
                    ],
                    6: [
                      function (e, t, n) {
                        t.exports = {
                          2: "need dictionary",
                          1: "stream end",
                          0: "",
                          "-1": "file error",
                          "-2": "stream error",
                          "-3": "data error",
                          "-4": "insufficient memory",
                          "-5": "buffer error",
                          "-6": "incompatible version",
                        };
                      },
                      {},
                    ],
                    7: [
                      function (e, t, n) {
                        var o = e("../utils/common"),
                          r = 0,
                          i = 1;
                        function a(e) {
                          for (var t = e.length; 0 <= --t; ) e[t] = 0;
                        }
                        var s = 0,
                          l = 29,
                          c = 256,
                          u = c + 1 + l,
                          d = 30,
                          f = 19,
                          p = 2 * u + 1,
                          h = 15,
                          g = 16,
                          m = 7,
                          y = 256,
                          v = 16,
                          w = 17,
                          b = 18,
                          T = [
                            0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3,
                            3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0,
                          ],
                          S = [
                            0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7,
                            7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13,
                          ],
                          x = [
                            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2,
                            3, 7,
                          ],
                          _ = [
                            16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13,
                            2, 14, 1, 15,
                          ],
                          E = new Array(2 * (u + 2));
                        a(E);
                        var C = new Array(2 * d);
                        a(C);
                        var L = new Array(512);
                        a(L);
                        var O = new Array(256);
                        a(O);
                        var k = new Array(l);
                        a(k);
                        var I,
                          D,
                          P,
                          M = new Array(d);
                        function A(e, t, n, o, r) {
                          ((this.static_tree = e),
                            (this.extra_bits = t),
                            (this.extra_base = n),
                            (this.elems = o),
                            (this.max_length = r),
                            (this.has_stree = e && e.length));
                        }
                        function R(e, t) {
                          ((this.dyn_tree = e),
                            (this.max_code = 0),
                            (this.stat_desc = t));
                        }
                        function j(e) {
                          return e < 256 ? L[e] : L[256 + (e >>> 7)];
                        }
                        function N(e, t) {
                          ((e.pending_buf[e.pending++] = 255 & t),
                            (e.pending_buf[e.pending++] = (t >>> 8) & 255));
                        }
                        function z(e, t, n) {
                          e.bi_valid > g - n
                            ? ((e.bi_buf |= (t << e.bi_valid) & 65535),
                              N(e, e.bi_buf),
                              (e.bi_buf = t >> (g - e.bi_valid)),
                              (e.bi_valid += n - g))
                            : ((e.bi_buf |= (t << e.bi_valid) & 65535),
                              (e.bi_valid += n));
                        }
                        function U(e, t, n) {
                          z(e, n[2 * t], n[2 * t + 1]);
                        }
                        function H(e, t) {
                          for (
                            var n = 0;
                            (n |= 1 & e), (e >>>= 1), (n <<= 1), 0 < --t;
                          );
                          return n >>> 1;
                        }
                        function V(e, t, n) {
                          var o,
                            r,
                            i = new Array(h + 1),
                            a = 0;
                          for (o = 1; o <= h; o++)
                            i[o] = a = (a + n[o - 1]) << 1;
                          for (r = 0; r <= t; r++) {
                            var s = e[2 * r + 1];
                            0 !== s && (e[2 * r] = H(i[s]++, s));
                          }
                        }
                        function F(e) {
                          var t;
                          for (t = 0; t < u; t++) e.dyn_ltree[2 * t] = 0;
                          for (t = 0; t < d; t++) e.dyn_dtree[2 * t] = 0;
                          for (t = 0; t < f; t++) e.bl_tree[2 * t] = 0;
                          ((e.dyn_ltree[2 * y] = 1),
                            (e.opt_len = e.static_len = 0),
                            (e.last_lit = e.matches = 0));
                        }
                        function X(e) {
                          (8 < e.bi_valid
                            ? N(e, e.bi_buf)
                            : 0 < e.bi_valid &&
                              (e.pending_buf[e.pending++] = e.bi_buf),
                            (e.bi_buf = 0),
                            (e.bi_valid = 0));
                        }
                        function q(e, t, n, o) {
                          var r = 2 * t,
                            i = 2 * n;
                          return e[r] < e[i] || (e[r] === e[i] && o[t] <= o[n]);
                        }
                        function B(e, t, n) {
                          for (
                            var o = e.heap[n], r = n << 1;
                            r <= e.heap_len &&
                            (r < e.heap_len &&
                              q(t, e.heap[r + 1], e.heap[r], e.depth) &&
                              r++,
                            !q(t, o, e.heap[r], e.depth));
                          )
                            ((e.heap[n] = e.heap[r]), (n = r), (r <<= 1));
                          e.heap[n] = o;
                        }
                        function W(e, t, n) {
                          var o,
                            r,
                            i,
                            a,
                            s = 0;
                          if (0 !== e.last_lit)
                            for (
                              ;
                              (o =
                                (e.pending_buf[e.d_buf + 2 * s] << 8) |
                                e.pending_buf[e.d_buf + 2 * s + 1]),
                                (r = e.pending_buf[e.l_buf + s]),
                                s++,
                                0 === o
                                  ? U(e, r, t)
                                  : (U(e, (i = O[r]) + c + 1, t),
                                    0 !== (a = T[i]) && z(e, (r -= k[i]), a),
                                    U(e, (i = j(--o)), n),
                                    0 !== (a = S[i]) && z(e, (o -= M[i]), a)),
                                s < e.last_lit;
                            );
                          U(e, y, t);
                        }
                        function Y(e, t) {
                          var n,
                            o,
                            r,
                            i = t.dyn_tree,
                            a = t.stat_desc.static_tree,
                            s = t.stat_desc.has_stree,
                            l = t.stat_desc.elems,
                            c = -1;
                          for (
                            e.heap_len = 0, e.heap_max = p, n = 0;
                            n < l;
                            n++
                          )
                            0 !== i[2 * n]
                              ? ((e.heap[++e.heap_len] = c = n),
                                (e.depth[n] = 0))
                              : (i[2 * n + 1] = 0);
                          for (; e.heap_len < 2; )
                            ((i[
                              2 * (r = e.heap[++e.heap_len] = c < 2 ? ++c : 0)
                            ] = 1),
                              (e.depth[r] = 0),
                              e.opt_len--,
                              s && (e.static_len -= a[2 * r + 1]));
                          for (t.max_code = c, n = e.heap_len >> 1; 1 <= n; n--)
                            B(e, i, n);
                          for (
                            r = l;
                            (n = e.heap[1]),
                              (e.heap[1] = e.heap[e.heap_len--]),
                              B(e, i, 1),
                              (o = e.heap[1]),
                              (e.heap[--e.heap_max] = n),
                              (e.heap[--e.heap_max] = o),
                              (i[2 * r] = i[2 * n] + i[2 * o]),
                              (e.depth[r] =
                                (e.depth[n] >= e.depth[o]
                                  ? e.depth[n]
                                  : e.depth[o]) + 1),
                              (i[2 * n + 1] = i[2 * o + 1] = r),
                              (e.heap[1] = r++),
                              B(e, i, 1),
                              2 <= e.heap_len;
                          );
                          ((e.heap[--e.heap_max] = e.heap[1]),
                            (function (e, t) {
                              var n,
                                o,
                                r,
                                i,
                                a,
                                s,
                                l = t.dyn_tree,
                                c = t.max_code,
                                u = t.stat_desc.static_tree,
                                d = t.stat_desc.has_stree,
                                f = t.stat_desc.extra_bits,
                                g = t.stat_desc.extra_base,
                                m = t.stat_desc.max_length,
                                y = 0;
                              for (i = 0; i <= h; i++) e.bl_count[i] = 0;
                              for (
                                l[2 * e.heap[e.heap_max] + 1] = 0,
                                  n = e.heap_max + 1;
                                n < p;
                                n++
                              )
                                (m <
                                  (i =
                                    l[2 * l[2 * (o = e.heap[n]) + 1] + 1] +
                                    1) && ((i = m), y++),
                                  (l[2 * o + 1] = i),
                                  c < o ||
                                    (e.bl_count[i]++,
                                    (a = 0),
                                    g <= o && (a = f[o - g]),
                                    (s = l[2 * o]),
                                    (e.opt_len += s * (i + a)),
                                    d &&
                                      (e.static_len +=
                                        s * (u[2 * o + 1] + a))));
                              if (0 !== y) {
                                do {
                                  for (i = m - 1; 0 === e.bl_count[i]; ) i--;
                                  (e.bl_count[i]--,
                                    (e.bl_count[i + 1] += 2),
                                    e.bl_count[m]--,
                                    (y -= 2));
                                } while (0 < y);
                                for (i = m; 0 !== i; i--)
                                  for (o = e.bl_count[i]; 0 !== o; )
                                    c < (r = e.heap[--n]) ||
                                      (l[2 * r + 1] !== i &&
                                        ((e.opt_len +=
                                          (i - l[2 * r + 1]) * l[2 * r]),
                                        (l[2 * r + 1] = i)),
                                      o--);
                              }
                            })(e, t),
                            V(i, c, e.bl_count));
                        }
                        function K(e, t, n) {
                          var o,
                            r,
                            i = -1,
                            a = t[1],
                            s = 0,
                            l = 7,
                            c = 4;
                          for (
                            0 === a && ((l = 138), (c = 3)),
                              t[2 * (n + 1) + 1] = 65535,
                              o = 0;
                            o <= n;
                            o++
                          )
                            ((r = a),
                              (a = t[2 * (o + 1) + 1]),
                              (++s < l && r === a) ||
                                (s < c
                                  ? (e.bl_tree[2 * r] += s)
                                  : 0 !== r
                                    ? (r !== i && e.bl_tree[2 * r]++,
                                      e.bl_tree[2 * v]++)
                                    : s <= 10
                                      ? e.bl_tree[2 * w]++
                                      : e.bl_tree[2 * b]++,
                                (i = r),
                                (s = 0) === a
                                  ? ((l = 138), (c = 3))
                                  : r === a
                                    ? ((l = 6), (c = 3))
                                    : ((l = 7), (c = 4))));
                        }
                        function J(e, t, n) {
                          var o,
                            r,
                            i = -1,
                            a = t[1],
                            s = 0,
                            l = 7,
                            c = 4;
                          for (
                            0 === a && ((l = 138), (c = 3)), o = 0;
                            o <= n;
                            o++
                          )
                            if (
                              ((r = a),
                              (a = t[2 * (o + 1) + 1]),
                              !(++s < l && r === a))
                            ) {
                              if (s < c) for (; U(e, r, e.bl_tree), 0 != --s; );
                              else
                                0 !== r
                                  ? (r !== i && (U(e, r, e.bl_tree), s--),
                                    U(e, v, e.bl_tree),
                                    z(e, s - 3, 2))
                                  : s <= 10
                                    ? (U(e, w, e.bl_tree), z(e, s - 3, 3))
                                    : (U(e, b, e.bl_tree), z(e, s - 11, 7));
                              ((i = r),
                                (s = 0) === a
                                  ? ((l = 138), (c = 3))
                                  : r === a
                                    ? ((l = 6), (c = 3))
                                    : ((l = 7), (c = 4)));
                            }
                        }
                        a(M);
                        var Q = !1;
                        function $(e, t, n, r) {
                          var i, a, l, c;
                          (z(e, (s << 1) + (r ? 1 : 0), 3),
                            (a = t),
                            (l = n),
                            (c = !0),
                            X((i = e)),
                            c && (N(i, l), N(i, ~l)),
                            o.arraySet(
                              i.pending_buf,
                              i.window,
                              a,
                              l,
                              i.pending,
                            ),
                            (i.pending += l));
                        }
                        ((n._tr_init = function (e) {
                          (Q ||
                            ((function () {
                              var e,
                                t,
                                n,
                                o,
                                r,
                                i = new Array(h + 1);
                              for (o = n = 0; o < l - 1; o++)
                                for (k[o] = n, e = 0; e < 1 << T[o]; e++)
                                  O[n++] = o;
                              for (O[n - 1] = o, o = r = 0; o < 16; o++)
                                for (M[o] = r, e = 0; e < 1 << S[o]; e++)
                                  L[r++] = o;
                              for (r >>= 7; o < d; o++)
                                for (
                                  M[o] = r << 7, e = 0;
                                  e < 1 << (S[o] - 7);
                                  e++
                                )
                                  L[256 + r++] = o;
                              for (t = 0; t <= h; t++) i[t] = 0;
                              for (e = 0; e <= 143; )
                                ((E[2 * e + 1] = 8), e++, i[8]++);
                              for (; e <= 255; )
                                ((E[2 * e + 1] = 9), e++, i[9]++);
                              for (; e <= 279; )
                                ((E[2 * e + 1] = 7), e++, i[7]++);
                              for (; e <= 287; )
                                ((E[2 * e + 1] = 8), e++, i[8]++);
                              for (V(E, u + 1, i), e = 0; e < d; e++)
                                ((C[2 * e + 1] = 5), (C[2 * e] = H(e, 5)));
                              ((I = new A(E, T, c + 1, u, h)),
                                (D = new A(C, S, 0, d, h)),
                                (P = new A(new Array(0), x, 0, f, m)));
                            })(),
                            (Q = !0)),
                            (e.l_desc = new R(e.dyn_ltree, I)),
                            (e.d_desc = new R(e.dyn_dtree, D)),
                            (e.bl_desc = new R(e.bl_tree, P)),
                            (e.bi_buf = 0),
                            (e.bi_valid = 0),
                            F(e));
                        }),
                          (n._tr_stored_block = $),
                          (n._tr_flush_block = function (e, t, n, o) {
                            var a,
                              s,
                              l = 0;
                            (0 < e.level
                              ? (2 === e.strm.data_type &&
                                  (e.strm.data_type = (function (e) {
                                    var t,
                                      n = 4093624447;
                                    for (t = 0; t <= 31; t++, n >>>= 1)
                                      if (1 & n && 0 !== e.dyn_ltree[2 * t])
                                        return r;
                                    if (
                                      0 !== e.dyn_ltree[18] ||
                                      0 !== e.dyn_ltree[20] ||
                                      0 !== e.dyn_ltree[26]
                                    )
                                      return i;
                                    for (t = 32; t < c; t++)
                                      if (0 !== e.dyn_ltree[2 * t]) return i;
                                    return r;
                                  })(e)),
                                Y(e, e.l_desc),
                                Y(e, e.d_desc),
                                (l = (function (e) {
                                  var t;
                                  for (
                                    K(e, e.dyn_ltree, e.l_desc.max_code),
                                      K(e, e.dyn_dtree, e.d_desc.max_code),
                                      Y(e, e.bl_desc),
                                      t = f - 1;
                                    3 <= t && 0 === e.bl_tree[2 * _[t] + 1];
                                    t--
                                  );
                                  return (
                                    (e.opt_len += 3 * (t + 1) + 5 + 5 + 4),
                                    t
                                  );
                                })(e)),
                                (a = (e.opt_len + 3 + 7) >>> 3),
                                (s = (e.static_len + 3 + 7) >>> 3) <= a &&
                                  (a = s))
                              : (a = s = n + 5),
                              n + 4 <= a && -1 !== t
                                ? $(e, t, n, o)
                                : 4 === e.strategy || s === a
                                  ? (z(e, 2 + (o ? 1 : 0), 3), W(e, E, C))
                                  : (z(e, 4 + (o ? 1 : 0), 3),
                                    (function (e, t, n, o) {
                                      var r;
                                      for (
                                        z(e, t - 257, 5),
                                          z(e, n - 1, 5),
                                          z(e, o - 4, 4),
                                          r = 0;
                                        r < o;
                                        r++
                                      )
                                        z(e, e.bl_tree[2 * _[r] + 1], 3);
                                      (J(e, e.dyn_ltree, t - 1),
                                        J(e, e.dyn_dtree, n - 1));
                                    })(
                                      e,
                                      e.l_desc.max_code + 1,
                                      e.d_desc.max_code + 1,
                                      l + 1,
                                    ),
                                    W(e, e.dyn_ltree, e.dyn_dtree)),
                              F(e),
                              o && X(e));
                          }),
                          (n._tr_tally = function (e, t, n) {
                            return (
                              (e.pending_buf[e.d_buf + 2 * e.last_lit] =
                                (t >>> 8) & 255),
                              (e.pending_buf[e.d_buf + 2 * e.last_lit + 1] =
                                255 & t),
                              (e.pending_buf[e.l_buf + e.last_lit] = 255 & n),
                              e.last_lit++,
                              0 === t
                                ? e.dyn_ltree[2 * n]++
                                : (e.matches++,
                                  t--,
                                  e.dyn_ltree[2 * (O[n] + c + 1)]++,
                                  e.dyn_dtree[2 * j(t)]++),
                              e.last_lit === e.lit_bufsize - 1
                            );
                          }),
                          (n._tr_align = function (e) {
                            var t;
                            (z(e, 2, 3),
                              U(e, y, E),
                              16 === (t = e).bi_valid
                                ? (N(t, t.bi_buf),
                                  (t.bi_buf = 0),
                                  (t.bi_valid = 0))
                                : 8 <= t.bi_valid &&
                                  ((t.pending_buf[t.pending++] =
                                    255 & t.bi_buf),
                                  (t.bi_buf >>= 8),
                                  (t.bi_valid -= 8)));
                          }));
                      },
                      { "../utils/common": 1 },
                    ],
                    8: [
                      function (e, t, n) {
                        t.exports = function () {
                          ((this.input = null),
                            (this.next_in = 0),
                            (this.avail_in = 0),
                            (this.total_in = 0),
                            (this.output = null),
                            (this.next_out = 0),
                            (this.avail_out = 0),
                            (this.total_out = 0),
                            (this.msg = ""),
                            (this.state = null),
                            (this.data_type = 2),
                            (this.adler = 0));
                        };
                      },
                      {},
                    ],
                    "/lib/deflate.js": [
                      function (e, t, n) {
                        var o = e("./zlib/deflate"),
                          r = e("./utils/common"),
                          i = e("./utils/strings"),
                          a = e("./zlib/messages"),
                          s = e("./zlib/zstream"),
                          l = Object.prototype.toString,
                          c = 0,
                          u = -1,
                          d = 0,
                          f = 8;
                        function p(e) {
                          if (!(this instanceof p)) return new p(e);
                          this.options = r.assign(
                            {
                              level: u,
                              method: f,
                              chunkSize: 16384,
                              windowBits: 15,
                              memLevel: 8,
                              strategy: d,
                              to: "",
                            },
                            e || {},
                          );
                          var t = this.options;
                          (t.raw && 0 < t.windowBits
                            ? (t.windowBits = -t.windowBits)
                            : t.gzip &&
                              0 < t.windowBits &&
                              t.windowBits < 16 &&
                              (t.windowBits += 16),
                            (this.err = 0),
                            (this.msg = ""),
                            (this.ended = !1),
                            (this.chunks = []),
                            (this.strm = new s()),
                            (this.strm.avail_out = 0));
                          var n = o.deflateInit2(
                            this.strm,
                            t.level,
                            t.method,
                            t.windowBits,
                            t.memLevel,
                            t.strategy,
                          );
                          if (n !== c) throw new Error(a[n]);
                          if (
                            (t.header &&
                              o.deflateSetHeader(this.strm, t.header),
                            t.dictionary)
                          ) {
                            var h;
                            if (
                              ((h =
                                "string" == typeof t.dictionary
                                  ? i.string2buf(t.dictionary)
                                  : "[object ArrayBuffer]" ===
                                      l.call(t.dictionary)
                                    ? new Uint8Array(t.dictionary)
                                    : t.dictionary),
                              (n = o.deflateSetDictionary(this.strm, h)) !== c)
                            )
                              throw new Error(a[n]);
                            this._dict_set = !0;
                          }
                        }
                        function h(e, t) {
                          var n = new p(t);
                          if ((n.push(e, !0), n.err)) throw n.msg || a[n.err];
                          return n.result;
                        }
                        ((p.prototype.push = function (e, t) {
                          var n,
                            a,
                            s = this.strm,
                            u = this.options.chunkSize;
                          if (this.ended) return !1;
                          ((a = t === ~~t ? t : !0 === t ? 4 : 0),
                            "string" == typeof e
                              ? (s.input = i.string2buf(e))
                              : "[object ArrayBuffer]" === l.call(e)
                                ? (s.input = new Uint8Array(e))
                                : (s.input = e),
                            (s.next_in = 0),
                            (s.avail_in = s.input.length));
                          do {
                            if (
                              (0 === s.avail_out &&
                                ((s.output = new r.Buf8(u)),
                                (s.next_out = 0),
                                (s.avail_out = u)),
                              1 !== (n = o.deflate(s, a)) && n !== c)
                            )
                              return (this.onEnd(n), !(this.ended = !0));
                            (0 !== s.avail_out &&
                              (0 !== s.avail_in || (4 !== a && 2 !== a))) ||
                              ("string" === this.options.to
                                ? this.onData(
                                    i.buf2binstring(
                                      r.shrinkBuf(s.output, s.next_out),
                                    ),
                                  )
                                : this.onData(
                                    r.shrinkBuf(s.output, s.next_out),
                                  ));
                          } while (
                            (0 < s.avail_in || 0 === s.avail_out) &&
                            1 !== n
                          );
                          return 4 === a
                            ? ((n = o.deflateEnd(this.strm)),
                              this.onEnd(n),
                              (this.ended = !0),
                              n === c)
                            : 2 !== a || (this.onEnd(c), !(s.avail_out = 0));
                        }),
                          (p.prototype.onData = function (e) {
                            this.chunks.push(e);
                          }),
                          (p.prototype.onEnd = function (e) {
                            (e === c &&
                              ("string" === this.options.to
                                ? (this.result = this.chunks.join(""))
                                : (this.result = r.flattenChunks(this.chunks))),
                              (this.chunks = []),
                              (this.err = e),
                              (this.msg = this.strm.msg));
                          }),
                          (n.Deflate = p),
                          (n.deflate = h),
                          (n.deflateRaw = function (e, t) {
                            return (((t = t || {}).raw = !0), h(e, t));
                          }),
                          (n.gzip = function (e, t) {
                            console.log("GZIP DATA e", e);
                            console.log("GZIP DATA t", t);
                            return (((t = t || {}).gzip = !0), h(e, t));
                          }));
                      },
                      {
                        "./utils/common": 1,
                        "./utils/strings": 2,
                        "./zlib/deflate": 5,
                        "./zlib/messages": 6,
                        "./zlib/zstream": 8,
                      },
                    ],
                  },
                  {},
                  [],
                )("/lib/deflate.js")),
            "function" == typeof Hammer && void 0 !== Hammer
              ? console &&
                console.info(
                  "Hammer:" +
                    Hammer.VERSION +
                    " is already loaded. But you need 1.1.3.",
                )
              : !0 === r &&
                (function (e, t) {
                  var n = function e(t, n) {
                    return new e.Instance(t, n || {});
                  };
                  ((n.VERSION = "1.1.3"),
                    (n.defaults = {
                      behavior: {
                        userSelect: "none",
                        touchAction: "pan-y",
                        touchCallout: "none",
                        contentZooming: "none",
                        userDrag: "none",
                        tapHighlightColor: "rgba(0,0,0,0)",
                      },
                    }),
                    (n.DOCUMENT = document),
                    (n.HAS_POINTEREVENTS =
                      navigator.pointerEnabled || navigator.msPointerEnabled),
                    (n.HAS_TOUCHEVENTS = "ontouchstart" in e),
                    (n.IS_MOBILE =
                      /mobile|tablet|ip(ad|hone|od)|android|silk/i.test(
                        navigator.userAgent,
                      )),
                    (n.NO_MOUSEEVENTS =
                      (n.HAS_TOUCHEVENTS && n.IS_MOBILE) ||
                      n.HAS_POINTEREVENTS),
                    (n.CALCULATE_INTERVAL = 25));
                  var o = {},
                    r = (n.DIRECTION_DOWN = "down"),
                    i = (n.DIRECTION_LEFT = "left"),
                    a = (n.DIRECTION_UP = "up"),
                    s = (n.DIRECTION_RIGHT = "right"),
                    l = (n.POINTER_MOUSE = "mouse"),
                    c = (n.POINTER_TOUCH = "touch"),
                    u = (n.POINTER_PEN = "pen"),
                    d = (n.EVENT_START = "start"),
                    f = (n.EVENT_MOVE = "move"),
                    p = (n.EVENT_END = "end"),
                    h = (n.EVENT_RELEASE = "release"),
                    g = (n.EVENT_TOUCH = "touch");
                  ((n.READY = !1),
                    (n.plugins = n.plugins || {}),
                    (n.gestures = n.gestures || {}));
                  var m = (n.utils = {
                      extend: function (e, n, o) {
                        for (var r in n)
                          !n.hasOwnProperty(r) ||
                            (e[r] !== t && o) ||
                            (e[r] = n[r]);
                        return e;
                      },
                      on: function (e, t, n) {
                        e.addEventListener(t, n, !1);
                      },
                      off: function (e, t, n) {
                        e.removeEventListener(t, n, !1);
                      },
                      each: function (e, n, o) {
                        var r, i;
                        if ("forEach" in e) e.forEach(n, o);
                        else if (e.length !== t) {
                          for (r = 0, i = e.length; i > r; r++)
                            if (!1 === n.call(o, e[r], r, e)) return;
                        } else
                          for (r in e)
                            if (
                              e.hasOwnProperty(r) &&
                              !1 === n.call(o, e[r], r, e)
                            )
                              return;
                      },
                      inStr: function (e, t) {
                        return e.indexOf(t) > -1;
                      },
                      inArray: function (e, t) {
                        if (e.indexOf) {
                          var n = e.indexOf(t);
                          return -1 !== n && n;
                        }
                        for (var o = 0, r = e.length; r > o; o++)
                          if (e[o] === t) return o;
                        return !1;
                      },
                      toArray: function (e) {
                        return Array.prototype.slice.call(e, 0);
                      },
                      hasParent: function (e, t) {
                        for (; e; ) {
                          if (e == t) return !0;
                          e = e.parentNode;
                        }
                        return !1;
                      },
                      getCenter: function (e) {
                        var t = [],
                          n = [],
                          o = [],
                          r = [],
                          i = Math.min,
                          a = Math.max;
                        return 1 === e.length
                          ? {
                              pageX: e[0].pageX,
                              pageY: e[0].pageY,
                              clientX: e[0].clientX,
                              clientY: e[0].clientY,
                            }
                          : (m.each(e, function (e) {
                              (t.push(e.pageX),
                                n.push(e.pageY),
                                o.push(e.clientX),
                                r.push(e.clientY));
                            }),
                            {
                              pageX: (i.apply(Math, t) + a.apply(Math, t)) / 2,
                              pageY: (i.apply(Math, n) + a.apply(Math, n)) / 2,
                              clientX:
                                (i.apply(Math, o) + a.apply(Math, o)) / 2,
                              clientY:
                                (i.apply(Math, r) + a.apply(Math, r)) / 2,
                            });
                      },
                      getVelocity: function (e, t, n) {
                        return {
                          x: Math.abs(t / e) || 0,
                          y: Math.abs(n / e) || 0,
                        };
                      },
                      getAngle: function (e, t) {
                        var n = t.clientX - e.clientX,
                          o = t.clientY - e.clientY;
                        return (180 * Math.atan2(o, n)) / Math.PI;
                      },
                      getDirection: function (e, t) {
                        return Math.abs(e.clientX - t.clientX) >=
                          Math.abs(e.clientY - t.clientY)
                          ? e.clientX - t.clientX > 0
                            ? i
                            : s
                          : e.clientY - t.clientY > 0
                            ? a
                            : r;
                      },
                      getDistance: function (e, t) {
                        var n = t.clientX - e.clientX,
                          o = t.clientY - e.clientY;
                        return Math.sqrt(n * n + o * o);
                      },
                      getScale: function (e, t) {
                        return e.length >= 2 && t.length >= 2
                          ? this.getDistance(t[0], t[1]) /
                              this.getDistance(e[0], e[1])
                          : 1;
                      },
                      getRotation: function (e, t) {
                        return e.length >= 2 && t.length >= 2
                          ? this.getAngle(t[1], t[0]) -
                              this.getAngle(e[1], e[0])
                          : 0;
                      },
                      isVertical: function (e) {
                        return e == a || e == r;
                      },
                      setPrefixedCss: function (e, t, n, o) {
                        var r = ["", "Webkit", "Moz", "O", "ms"];
                        t = m.toCamelCase(t);
                        for (var i = 0; i < r.length; i++) {
                          var a = t;
                          if (
                            (r[i] &&
                              (a =
                                r[i] +
                                a.slice(0, 1).toUpperCase() +
                                a.slice(1)),
                            a in e.style)
                          ) {
                            e.style[a] = ((null == o || o) && n) || "";
                            break;
                          }
                        }
                      },
                      toggleBehavior: function (e, t, n) {
                        if (t && e && e.style) {
                          m.each(t, function (t, o) {
                            m.setPrefixedCss(e, o, t, n);
                          });
                          var o =
                            n &&
                            function () {
                              return !1;
                            };
                          ("none" == t.userSelect && (e.onselectstart = o),
                            "none" == t.userDrag && (e.ondragstart = o));
                        }
                      },
                      toCamelCase: function (e) {
                        return e.replace(/[_-]([a-z])/g, function (e) {
                          return e[1].toUpperCase();
                        });
                      },
                    }),
                    y = (n.event = {
                      preventMouseEvents: !1,
                      started: !1,
                      shouldDetect: !1,
                      on: function (e, t, n, o) {
                        var r = t.split(" ");
                        m.each(r, function (t) {
                          (m.on(e, t, n), o && o(t));
                        });
                      },
                      off: function (e, t, n, o) {
                        var r = t.split(" ");
                        m.each(r, function (t) {
                          (m.off(e, t, n), o && o(t));
                        });
                      },
                      onTouch: function (e, t, r) {
                        var i = this,
                          a = function (o) {
                            var a,
                              s = o.type.toLowerCase(),
                              l = n.HAS_POINTEREVENTS,
                              u = m.inStr(s, "mouse");
                            (u && i.preventMouseEvents) ||
                              (u && t == d && 0 === o.button
                                ? ((i.preventMouseEvents = !1),
                                  (i.shouldDetect = !0))
                                : l && t == d
                                  ? (i.shouldDetect =
                                      1 === o.buttons || v.matchType(c, o))
                                  : u ||
                                    t != d ||
                                    ((i.preventMouseEvents = !0),
                                    (i.shouldDetect = !0)),
                              l && t != p && v.updatePointer(t, o),
                              i.shouldDetect &&
                                (a = i.doDetect.call(i, o, t, e, r)),
                              a == p &&
                                ((i.preventMouseEvents = !1),
                                (i.shouldDetect = !1),
                                v.reset()),
                              l && t == p && v.updatePointer(t, o));
                          };
                        return (this.on(e, o[t], a), a);
                      },
                      doDetect: function (e, t, n, o) {
                        var r = this.getTouchList(e, t),
                          i = r.length,
                          a = t,
                          s = r.trigger,
                          l = i;
                        (t == d
                          ? (s = g)
                          : t == p &&
                            ((s = h),
                            (l =
                              r.length -
                              (e.changedTouches
                                ? e.changedTouches.length
                                : 1))),
                          l > 0 && this.started && (a = f),
                          (this.started = !0));
                        var c = this.collectEventData(n, a, r, e);
                        return (
                          t != p && o.call(w, c),
                          s &&
                            ((c.changedLength = l),
                            (c.eventType = s),
                            o.call(w, c),
                            (c.eventType = a),
                            delete c.changedLength),
                          a == p && (o.call(w, c), (this.started = !1)),
                          a
                        );
                      },
                      determineEventTypes: function () {
                        var t;
                        return (
                          (t = n.HAS_POINTEREVENTS
                            ? e.PointerEvent
                              ? [
                                  "pointerdown",
                                  "pointermove",
                                  "pointerup pointercancel lostpointercapture",
                                ]
                              : [
                                  "MSPointerDown",
                                  "MSPointerMove",
                                  "MSPointerUp MSPointerCancel MSLostPointerCapture",
                                ]
                            : n.NO_MOUSEEVENTS
                              ? [
                                  "touchstart",
                                  "touchmove",
                                  "touchend touchcancel",
                                ]
                              : [
                                  "touchstart mousedown",
                                  "touchmove mousemove",
                                  "touchend touchcancel mouseup",
                                ]),
                          (o[d] = t[0]),
                          (o[f] = t[1]),
                          (o[p] = t[2]),
                          o
                        );
                      },
                      getTouchList: function (e, t) {
                        if (n.HAS_POINTEREVENTS) return v.getTouchList();
                        if (e.touches) {
                          if (t == f) return e.touches;
                          var o = [],
                            r = [].concat(
                              m.toArray(e.touches),
                              m.toArray(e.changedTouches),
                            ),
                            i = [];
                          return (
                            m.each(r, function (e) {
                              (!1 === m.inArray(o, e.identifier) && i.push(e),
                                o.push(e.identifier));
                            }),
                            i
                          );
                        }
                        return ((e.identifier = 1), [e]);
                      },
                      collectEventData: function (e, t, n, o) {
                        var r = c;
                        return (
                          m.inStr(o.type, "mouse") || v.matchType(l, o)
                            ? (r = l)
                            : v.matchType(u, o) && (r = u),
                          {
                            center: m.getCenter(n),
                            timeStamp: Date.now(),
                            target: o.target,
                            touches: n,
                            eventType: t,
                            pointerType: r,
                            srcEvent: o,
                            preventDefault: function () {
                              var e = this.srcEvent;
                              (e.preventManipulation && e.preventManipulation(),
                                e.preventDefault && e.preventDefault());
                            },
                            stopPropagation: function () {
                              this.srcEvent.stopPropagation();
                            },
                            stopDetect: function () {
                              return w.stopDetect();
                            },
                          }
                        );
                      },
                    }),
                    v = (n.PointerEvent = {
                      pointers: {},
                      getTouchList: function () {
                        var e = [];
                        return (
                          m.each(this.pointers, function (t) {
                            e.push(t);
                          }),
                          e
                        );
                      },
                      updatePointer: function (e, t) {
                        e == p
                          ? delete this.pointers[t.pointerId]
                          : ((t.identifier = t.pointerId),
                            (this.pointers[t.pointerId] = t));
                      },
                      matchType: function (e, t) {
                        if (!t.pointerType) return !1;
                        var n = t.pointerType,
                          o = {};
                        return (
                          (o[l] = n === (t.MSPOINTER_TYPE_MOUSE || l)),
                          (o[c] = n === (t.MSPOINTER_TYPE_TOUCH || c)),
                          (o[u] = n === (t.MSPOINTER_TYPE_PEN || u)),
                          o[e]
                        );
                      },
                      reset: function () {
                        this.pointers = {};
                      },
                    }),
                    w = (n.detection = {
                      gestures: [],
                      current: null,
                      previous: null,
                      stopped: !1,
                      startDetect: function (e, t) {
                        this.current ||
                          ((this.stopped = !1),
                          (this.current = {
                            inst: e,
                            startEvent: m.extend({}, t),
                            lastEvent: !1,
                            lastCalcEvent: !1,
                            futureCalcEvent: !1,
                            lastCalcData: {},
                            name: "",
                          }),
                          this.detect(t));
                      },
                      detect: function (e) {
                        if (this.current && !this.stopped) {
                          e = this.extendEventData(e);
                          var t = this.current.inst,
                            n = t.options;
                          return (
                            m.each(
                              this.gestures,
                              function (o) {
                                !this.stopped &&
                                  t.enabled &&
                                  n[o.name] &&
                                  o.handler.call(o, e, t);
                              },
                              this,
                            ),
                            this.current && (this.current.lastEvent = e),
                            e.eventType == p && this.stopDetect(),
                            e
                          );
                        }
                      },
                      stopDetect: function () {
                        ((this.previous = m.extend({}, this.current)),
                          (this.current = null),
                          (this.stopped = !0));
                      },
                      getCalculatedData: function (e, t, o, r, i) {
                        var a = this.current,
                          s = !1,
                          l = a.lastCalcEvent,
                          c = a.lastCalcData;
                        (l &&
                          e.timeStamp - l.timeStamp > n.CALCULATE_INTERVAL &&
                          ((t = l.center),
                          (o = e.timeStamp - l.timeStamp),
                          (r = e.center.clientX - l.center.clientX),
                          (i = e.center.clientY - l.center.clientY),
                          (s = !0)),
                          (e.eventType == g || e.eventType == h) &&
                            (a.futureCalcEvent = e),
                          (!a.lastCalcEvent || s) &&
                            ((c.velocity = m.getVelocity(o, r, i)),
                            (c.angle = m.getAngle(t, e.center)),
                            (c.direction = m.getDirection(t, e.center)),
                            (a.lastCalcEvent = a.futureCalcEvent || e),
                            (a.futureCalcEvent = e)),
                          (e.velocityX = c.velocity.x),
                          (e.velocityY = c.velocity.y),
                          (e.interimAngle = c.angle),
                          (e.interimDirection = c.direction));
                      },
                      extendEventData: function (e) {
                        var t = this.current,
                          n = t.startEvent,
                          o = t.lastEvent || n;
                        (e.eventType == g || e.eventType == h) &&
                          ((n.touches = []),
                          m.each(e.touches, function (e) {
                            n.touches.push({
                              clientX: e.clientX,
                              clientY: e.clientY,
                            });
                          }));
                        var r = e.timeStamp - n.timeStamp,
                          i = e.center.clientX - n.center.clientX,
                          a = e.center.clientY - n.center.clientY;
                        return (
                          this.getCalculatedData(e, o.center, r, i, a),
                          m.extend(e, {
                            startEvent: n,
                            deltaTime: r,
                            deltaX: i,
                            deltaY: a,
                            distance: m.getDistance(n.center, e.center),
                            angle: m.getAngle(n.center, e.center),
                            direction: m.getDirection(n.center, e.center),
                            scale: m.getScale(n.touches, e.touches),
                            rotation: m.getRotation(n.touches, e.touches),
                          }),
                          e
                        );
                      },
                      register: function (e) {
                        var o = e.defaults || {};
                        return (
                          o[e.name] === t && (o[e.name] = !0),
                          m.extend(n.defaults, o, !0),
                          (e.index = e.index || 1e3),
                          this.gestures.push(e),
                          this.gestures.sort(function (e, t) {
                            return e.index < t.index
                              ? -1
                              : e.index > t.index
                                ? 1
                                : 0;
                          }),
                          this.gestures
                        );
                      },
                    });
                  ((n.Instance = function (e, t) {
                    var o = this;
                    (n.READY ||
                      (y.determineEventTypes(),
                      m.each(n.gestures, function (e) {
                        w.register(e);
                      }),
                      y.onTouch(n.DOCUMENT, f, w.detect),
                      y.onTouch(n.DOCUMENT, p, w.detect),
                      (n.READY = !0)),
                      (this.element = e),
                      (this.enabled = !0),
                      m.each(t, function (e, n) {
                        (delete t[n], (t[m.toCamelCase(n)] = e));
                      }),
                      (this.options = m.extend(
                        m.extend({}, n.defaults),
                        t || {},
                      )),
                      this.options.behavior &&
                        m.toggleBehavior(
                          this.element,
                          this.options.behavior,
                          !0,
                        ),
                      (this.eventStartHandler = y.onTouch(e, d, function (e) {
                        o.enabled && e.eventType == d
                          ? w.startDetect(o, e)
                          : e.eventType == g && w.detect(e);
                      })),
                      (this.eventHandlers = []));
                  }),
                    (n.Instance.prototype = {
                      on: function (e, t) {
                        var n = this;
                        return (
                          y.on(n.element, e, t, function (e) {
                            n.eventHandlers.push({ gesture: e, handler: t });
                          }),
                          n
                        );
                      },
                      off: function (e, t) {
                        var n = this;
                        return (
                          y.off(n.element, e, t, function (e) {
                            var o = m.inArray({ gesture: e, handler: t });
                            !1 !== o && n.eventHandlers.splice(o, 1);
                          }),
                          n
                        );
                      },
                      trigger: function (e, t) {
                        t || (t = {});
                        var o = n.DOCUMENT.createEvent("Event");
                        (o.initEvent(e, !0, !0), (o.gesture = t));
                        var r = this.element;
                        return (
                          m.hasParent(t.target, r) && (r = t.target),
                          r.dispatchEvent(o),
                          this
                        );
                      },
                      enable: function (e) {
                        return ((this.enabled = e), this);
                      },
                      dispose: function () {
                        var e, t;
                        for (
                          m.toggleBehavior(
                            this.element,
                            this.options.behavior,
                            !1,
                          ),
                            e = -1;
                          (t = this.eventHandlers[++e]);
                        )
                          m.off(this.element, t.gesture, t.handler);
                        return (
                          (this.eventHandlers = []),
                          y.off(this.element, o[d], this.eventStartHandler),
                          null
                        );
                      },
                    }),
                    (function (e) {
                      var t = !1;
                      n.gestures.Drag = {
                        name: e,
                        index: 50,
                        handler: function (n, o) {
                          var l = w.current;
                          if (
                            !(
                              o.options.dragMaxTouches > 0 &&
                              n.touches.length > o.options.dragMaxTouches
                            )
                          )
                            switch (n.eventType) {
                              case d:
                                t = !1;
                                break;
                              case f:
                                if (
                                  n.distance < o.options.dragMinDistance &&
                                  l.name != e
                                )
                                  return;
                                var c = l.startEvent.center;
                                if (
                                  l.name != e &&
                                  ((l.name = e),
                                  o.options.dragDistanceCorrection &&
                                    n.distance > 0)
                                ) {
                                  var u = Math.abs(
                                    o.options.dragMinDistance / n.distance,
                                  );
                                  ((c.pageX += n.deltaX * u),
                                    (c.pageY += n.deltaY * u),
                                    (c.clientX += n.deltaX * u),
                                    (c.clientY += n.deltaY * u),
                                    (n = w.extendEventData(n)));
                                }
                                (l.lastEvent.dragLockToAxis ||
                                  (o.options.dragLockToAxis &&
                                    o.options.dragLockMinDistance <=
                                      n.distance)) &&
                                  (n.dragLockToAxis = !0);
                                var g = l.lastEvent.direction;
                                (n.dragLockToAxis &&
                                  g !== n.direction &&
                                  (n.direction = m.isVertical(g)
                                    ? n.deltaY < 0
                                      ? a
                                      : r
                                    : n.deltaX < 0
                                      ? i
                                      : s),
                                  t || (o.trigger(e + "start", n), (t = !0)),
                                  o.trigger(e, n),
                                  o.trigger(e + n.direction, n));
                                var y = m.isVertical(n.direction);
                                ((o.options.dragBlockVertical && y) ||
                                  (o.options.dragBlockHorizontal && !y)) &&
                                  n.preventDefault();
                                break;
                              case h:
                                t &&
                                  n.changedLength <= o.options.dragMaxTouches &&
                                  (o.trigger(e + "end", n), (t = !1));
                                break;
                              case p:
                                t = !1;
                            }
                        },
                        defaults: {
                          dragMinDistance: 10,
                          dragDistanceCorrection: !0,
                          dragMaxTouches: 1,
                          dragBlockHorizontal: !1,
                          dragBlockVertical: !1,
                          dragLockToAxis: !1,
                          dragLockMinDistance: 25,
                        },
                      };
                    })("drag"),
                    (n.gestures.Gesture = {
                      name: "gesture",
                      index: 1337,
                      handler: function (e, t) {
                        t.trigger(this.name, e);
                      },
                    }),
                    (function (e) {
                      var t;
                      n.gestures.Hold = {
                        name: e,
                        index: 10,
                        defaults: { holdTimeout: 500, holdThreshold: 2 },
                        handler: function (n, o) {
                          var r = o.options,
                            i = w.current;
                          switch (n.eventType) {
                            case d:
                              (clearTimeout(t),
                                (i.name = e),
                                (t = setTimeout(function () {
                                  i && i.name == e && o.trigger(e, n);
                                }, r.holdTimeout)));
                              break;
                            case f:
                              n.distance > r.holdThreshold && clearTimeout(t);
                              break;
                            case h:
                              clearTimeout(t);
                          }
                        },
                      };
                    })("hold"),
                    (n.gestures.Release = {
                      name: "release",
                      index: 1 / 0,
                      handler: function (e, t) {
                        e.eventType == h && t.trigger(this.name, e);
                      },
                    }),
                    (n.gestures.Swipe = {
                      name: "swipe",
                      index: 40,
                      defaults: {
                        swipeMinTouches: 1,
                        swipeMaxTouches: 1,
                        swipeVelocityX: 0.6,
                        swipeVelocityY: 0.6,
                      },
                      handler: function (e, t) {
                        if (e.eventType == h) {
                          var n = e.touches.length,
                            o = t.options;
                          if (n < o.swipeMinTouches || n > o.swipeMaxTouches)
                            return;
                          (e.velocityX > o.swipeVelocityX ||
                            e.velocityY > o.swipeVelocityY) &&
                            (t.trigger(this.name, e),
                            t.trigger(this.name + e.direction, e));
                        }
                      },
                    }),
                    (function (e) {
                      var t = !1;
                      n.gestures.Tap = {
                        name: e,
                        index: 100,
                        handler: function (n, o) {
                          var r,
                            i,
                            a = o.options,
                            s = w.current,
                            l = w.previous;
                          switch (n.eventType) {
                            case d:
                              t = !1;
                              break;
                            case f:
                              t = t || n.distance > a.tapMaxDistance;
                              break;
                            case p:
                              !m.inStr(n.srcEvent.type, "cancel") &&
                                n.deltaTime < a.tapMaxTime &&
                                !t &&
                                ((r =
                                  l &&
                                  l.lastEvent &&
                                  n.timeStamp - l.lastEvent.timeStamp),
                                (i = !1),
                                l &&
                                  l.name == e &&
                                  r &&
                                  r < a.doubleTapInterval &&
                                  n.distance < a.doubleTapDistance &&
                                  (o.trigger("doubletap", n), (i = !0)),
                                (!i || a.tapAlways) &&
                                  ((s.name = e), o.trigger(s.name, n)));
                          }
                        },
                        defaults: {
                          tapMaxTime: 250,
                          tapMaxDistance: 10,
                          tapAlways: !0,
                          doubleTapDistance: 20,
                          doubleTapInterval: 300,
                        },
                      };
                    })("tap"),
                    (n.gestures.Touch = {
                      name: "touch",
                      index: -1 / 0,
                      defaults: { preventDefault: !1, preventMouse: !1 },
                      handler: function (e, t) {
                        return t.options.preventMouse && e.pointerType == l
                          ? void e.stopDetect()
                          : (t.options.preventDefault && e.preventDefault(),
                            void (e.eventType == g && t.trigger("touch", e)));
                      },
                    }),
                    (function (e) {
                      var t = !1;
                      n.gestures.Transform = {
                        name: e,
                        index: 45,
                        defaults: {
                          transformMinScale: 0.01,
                          transformMinRotation: 1,
                        },
                        handler: function (n, o) {
                          switch (n.eventType) {
                            case d:
                              t = !1;
                              break;
                            case f:
                              if (n.touches.length < 2) return;
                              var r = Math.abs(1 - n.scale),
                                i = Math.abs(n.rotation);
                              if (
                                r < o.options.transformMinScale &&
                                i < o.options.transformMinRotation
                              )
                                return;
                              ((w.current.name = e),
                                t || (o.trigger(e + "start", n), (t = !0)),
                                o.trigger(e, n),
                                i > o.options.transformMinRotation &&
                                  o.trigger("rotate", n),
                                r > o.options.transformMinScale &&
                                  (o.trigger("pinch", n),
                                  o.trigger(
                                    "pinch" + (n.scale < 1 ? "in" : "out"),
                                    n,
                                  )));
                              break;
                            case h:
                              t &&
                                n.changedLength < 2 &&
                                (o.trigger(e + "end", n), (t = !1));
                          }
                        },
                      };
                    })("transform"),
                    "function" == typeof define && define.amd
                      ? define(function () {
                          return n;
                        })
                      : "undefined" != typeof module && module.exports
                        ? (module.exports = n)
                        : (e.Hammer = n));
                })(window),
            "function" == typeof Hammer &&
            void 0 !== Hammer &&
            Hammer &&
            "1.1.3" == Hammer.VERSION
              ? TLT.addModule("gestures", function (e) {
                  const t = {
                      "input:radio": "radioButton",
                      "input:checkbox": "checkBox",
                      "input:text": "textBox",
                      "input:password": "textBox",
                      "input:file": "fileInput",
                      "input:button": "button",
                      "input:submit": "submitButton",
                      "input:reset": "resetButton",
                      "input:image": "image",
                      "input:color": "color",
                      "input:date": "date",
                      "input:datetime": "datetime",
                      "input:datetime-local": "datetime-local",
                      "input:number": "number",
                      "input:email": "email",
                      "input:tel": "tel",
                      "input:search": "search",
                      "input:url": "url",
                      "input:time": "time",
                      "input:week": "week",
                      "input:month": "month",
                      "textarea:": "textBox",
                      "select:": "selectList",
                      "select:select-one": "selectList",
                      "button:": "button",
                      "a:": "link",
                    },
                    n = e.utils;
                  let o,
                    r = [],
                    i = 0,
                    a = !0,
                    s = function () {};
                  const l = {
                    swipeAfterPinchInterval: 300,
                    doubleTapInterval: 300,
                    preventMouse: !0,
                    dragMinDistance: 10,
                  };
                  let c,
                    u,
                    d,
                    f = [],
                    p = [];
                  function h(t) {
                    e.post(t);
                  }
                  function g(e) {
                    let t;
                    return (
                      (t =
                        "drag" === e.type
                          ? "swipe"
                          : "hold" === e.type
                            ? "tapHold"
                            : e.type),
                      (t = "string" == typeof t ? t.toLowerCase() : "unknown"),
                      t
                    );
                  }
                  function m(e) {
                    let t = e.gesture.srcEvent.target,
                      n = 0,
                      o = 0;
                    for (; t && "BODY" !== t.tagName; )
                      ((n += t.offsetTop),
                        (o += t.offsetLeft),
                        (t = t.offsetParent));
                    return { topLeftX: o, topLeftY: n };
                  }
                  function y(e, t) {
                    ("radioButton" === t && delete e.control.position.relXY,
                      (null !== e.control.name &&
                        void 0 !== e.control.name &&
                        "" !== e.control.name) ||
                        delete e.control.name,
                      (null !== e.control.subType &&
                        void 0 !== e.control.subType &&
                        "" !== e.control.subType) ||
                        delete e.control.subType);
                  }
                  function v(o) {
                    const i = g(n.getValue(o, "webEvent")),
                      a = n.getValue(
                        o,
                        "webEvent.gesture.srcEvent.target",
                        document.body,
                      ),
                      s = n.getTagName(a) || "body",
                      l = n.getValue(a, "type", ""),
                      d = t[s.toLowerCase() + ":" + l.toLowerCase()] || s,
                      f = n.getValue(o, "webEvent.target.subtype"),
                      p = [];
                    let h, v, w, b, T, S;
                    for (
                      "1" === u
                        ? ((h = o.webEvent.gesture.touches),
                          (v = "webEvent.gesture.touches."),
                          (w =
                            ("swipe" === i &&
                              !(void 0 !== c && "swipe" === c.event.tlEvent)) ||
                            ("pinch" === i &&
                              !(void 0 !== c && "pinch" === c.event.tlEvent))),
                          (b = "swipe" === i || "pinch" === i))
                        : ((h = o.webEvent.gesture.pointers),
                          (v = "webEvent.gesture.pointers."),
                          (w =
                            "first" ===
                              n.getValue(
                                o,
                                "webEvent.gesture.firstOrLastSwipeEvent",
                              ) ||
                            "first" ===
                              n.getValue(
                                o,
                                "webEvent.gesture.firstOrLastPinchEvent",
                              )),
                          (b =
                            "last" ===
                              n.getValue(
                                o,
                                "webEvent.gesture.firstOrLastSwipeEvent",
                              ) ||
                            "last" ===
                              n.getValue(
                                o,
                                "webEvent.gesture.firstOrLastPinchEvent",
                              ))),
                        S = 0;
                      S < h.length;
                      S += 1
                    )
                      ((T = {
                        x:
                          n.getValue(o, v + S + ".pageX") -
                          m(o.webEvent).topLeftX,
                        y:
                          n.getValue(o, v + S + ".pageY") -
                          m(o.webEvent).topLeftY,
                        width: n.getValue(
                          o,
                          "webEvent.gesture.srcEvent.target.offsetWidth",
                        ),
                        height: n.getValue(
                          o,
                          "webEvent.gesture.srcEvent.target.offsetHeight",
                        ),
                      }),
                        p.push([
                          {
                            position: {
                              y: Math.round(n.getValue(o, v + S + ".pageY")),
                              x: Math.round(n.getValue(o, v + S + ".pageX")),
                            },
                            control: {
                              position: {
                                width: Math.round(
                                  n.getValue(o, v + S + ".target.offsetWidth"),
                                ),
                                height: Math.round(
                                  n.getValue(o, v + S + ".target.offsetHeight"),
                                ),
                                relXY: n.calculateRelativeXY(T),
                                scrollX: Math.round(
                                  document.documentElement.scrollLeft ||
                                    document.body.scrollLeft,
                                ),
                                scrollY: Math.round(
                                  document.documentElement.scrollTop ||
                                    document.body.scrollTop,
                                ),
                              },
                              id:
                                n.getValue(o, v + S + ".target.id") ||
                                e.getXPathFromNode(
                                  n.getValue(o, v + S + ".target"),
                                ),
                              idType: n.getValue(o, "webEvent.gesture.idType"),
                              name: n.getValue(o, v + S + ".target.name"),
                              tlType: d,
                              type: s,
                              subType: l,
                            },
                          },
                        ]),
                        y(p[S][0], d));
                    if (w) for (S = 0; S < h.length; S += 1) r.push(p[S][0]);
                    if (b) for (S = 0; S < h.length; S += 1) p[S].unshift(r[S]);
                    const x = {
                      type: 11,
                      event: { tlEvent: i, type: i },
                      touches: p,
                    };
                    return (
                      "swipe" === i &&
                        ((x.velocityX = o.webEvent.gesture.velocityX),
                        (x.velocityY = o.webEvent.gesture.velocityY)),
                      "swipe" === i &&
                        ((x.direction = o.webEvent.gesture.direction),
                        2 === x.direction && (x.direction = "left"),
                        4 === x.direction && (x.direction = "right"),
                        8 === x.direction && (x.direction = "up"),
                        16 === x.direction && (x.direction = "down")),
                      "pinch" === i &&
                        (o.webEvent.gesture.scale > 1
                          ? (x.direction = "open")
                          : o.webEvent.gesture.scale < 1 &&
                            (x.direction = "close")),
                      null != f && (x.event.subType = f),
                      x
                    );
                  }
                  function w(e, t) {
                    "1" === u
                      ? "doubletap" === t.type ||
                        "hold" === t.type ||
                        "tap" === t.type
                        ? h(
                            v({
                              webEvent: t,
                              id: e,
                              currState: n.getValue(t, "target.state"),
                            }),
                          )
                        : "release" !== t.type ||
                            void 0 === c ||
                            ("swipe" !== c.event.tlEvent &&
                              "pinch" !== c.event.tlEvent)
                          ? ("drag" !== t.type && "pinch" !== t.type) ||
                            (c = v({
                              webEvent: t,
                              id: e,
                              currState: n.getValue(t, "target.state"),
                            }))
                          : (h(c), (c = void 0), (r = []))
                      : "doubletap" === t.type ||
                          "tapHold" === t.type ||
                          "tap" === t.type
                        ? h(
                            v({
                              webEvent: t,
                              id: e,
                              currState: n.getValue(t, "target.state"),
                            }),
                          )
                        : "last" === t.gesture.firstOrLastSwipeEvent ||
                            "last" === t.gesture.firstOrLastPinchEvent
                          ? (h(
                              v({
                                webEvent: t,
                                id: e,
                                currState: n.getValue(t, "target.state"),
                              }),
                            ),
                            (r = []))
                          : ("first" !== t.gesture.firstOrLastSwipeEvent &&
                              "first" !== t.gesture.firstOrLastPinchEvent) ||
                            v({
                              webEvent: t,
                              id: e,
                              currState: n.getValue(t, "target.state"),
                            });
                  }
                  function b(e, t) {
                    const n = l.doubleTapInterval;
                    ((i += 1),
                      1 === i
                        ? ((s = (function (e, t) {
                            const n = e,
                              o = t;
                            return function () {
                              (w(n, o), (i = 0));
                            };
                          })(e, t)),
                          (o = setTimeout(function () {
                            (s(), (s = function () {}));
                          }, n)))
                        : (clearTimeout(o),
                          (t.type = "doubletap"),
                          w(e, t),
                          (s = function () {}),
                          (i = 0)));
                  }
                  function T(e, t) {
                    const n = l.swipeAfterPinchInterval;
                    (!a || ("swipe" !== t.type && "drag" !== t.type) || w(e, t),
                      "pinch" === t.type &&
                        (w(e, t),
                        (a = !1),
                        (o = setTimeout(function () {
                          a = !0;
                        }, n))));
                  }
                  function S(e) {
                    let t;
                    return (
                      document.createEvent
                        ? ((t = document.createEvent("HTMLEvents")),
                          t.initEvent(e.type, !0, !0),
                          (t.gesture = e))
                        : ((t = document.createEventObject()),
                          (t.eventType = e.type),
                          (t.gesture = e)),
                      t
                    );
                  }
                  function x(e, t) {
                    void 0 !== t &&
                      (document.createEvent
                        ? t.dispatchEvent(e)
                        : t.fireEvent("on" + e.eventType, e));
                  }
                  function _(e) {
                    const t = e.type,
                      n = e.target;
                    "tap" === t
                      ? (x(S(e), n), (d = void 0))
                      : "press" === t
                        ? ((e.type = "tapHold"), x(S(e), n), (d = void 0))
                        : "panstart" === t
                          ? ((e.type = "swipe"),
                            (e.firstOrLastSwipeEvent = "first"),
                            x(S(e), n),
                            (d = n))
                          : "panend" === t
                            ? ((e.type = "swipe"),
                              (e.firstOrLastSwipeEvent = "last"),
                              x(S(e), d),
                              (d = void 0))
                            : "pinchstart" === t
                              ? ((e.type = "pinch"),
                                (e.firstOrLastPinchEvent = "first"),
                                x(S(e), n),
                                (d = n))
                              : "pinchend" === t &&
                                ((e.type = "pinch"),
                                (e.firstOrLastPinchEvent = "last"),
                                x(S(e), d),
                                (d = void 0));
                  }
                  return {
                    createGestureQueueEvent: v,
                    utils: n,
                    handleGesture: w,
                    handleTap: b,
                    tlTypes: t,
                    postGestureEvent: h,
                    getTlEvent: g,
                    cleanGestureQueueEvent: y,
                    gestureOptions: l,
                    getElementTopLeft: m,
                    handlePinchAndSwipe: T,
                    createEvent: S,
                    callEvent: x,
                    callTealeafEvent: _,
                    init: function () {
                      let t,
                        o,
                        r,
                        i,
                        a,
                        s,
                        c,
                        h,
                        g = [],
                        m = "",
                        y = 0;
                      const v = TLT.getCoreConfig().modules.gestures.events;
                      if ("function" == typeof Hammer) {
                        for (
                          u = Hammer.VERSION.split(".")[0],
                            "1" === u &&
                              ((Hammer.defaults.behavior.userSelect = "auto"),
                              (Hammer.defaults.behavior.userDrag = "auto"),
                              (Hammer.defaults.behavior.contentZooming =
                                "auto"),
                              (Hammer.defaults.behavior.touchCallout =
                                "default"),
                              (Hammer.defaults.behavior.touchAction = "auto")),
                            e.getConfig() &&
                              e.getConfig().options &&
                              n.extend(!0, l, e.getConfig().options),
                            t = 0;
                          t < v.length;
                          t += 1
                        )
                          if (
                            ((h = v[t].name),
                            "tap" === h && (m += "tap "),
                            "swipe" === h && (m += "panstart panend "),
                            "tapHold" === h && (m += "press "),
                            "pinch" === h && (m += "pinchstart pinchend"),
                            (i = v[t].target),
                            i === window || "window" === i)
                          )
                            "1" === u && f.push(new Hammer(window, l));
                          else if (null != a)
                            for (a = i.split(", "), o = 0; o < a.length; o += 1)
                              for (
                                g = TLT.getService("browser").queryAll(
                                  a[o],
                                  document,
                                ),
                                  r = 0;
                                r < g.length;
                                r += 1
                              )
                                ((s = n.indexOf(p, g[r])),
                                  -1 === s && (p.push(g[r]), (y += 1)));
                        if ("1" === u)
                          for (t = 0; t < p.length; t += 1)
                            f.push(new Hammer(p[t], l));
                        else if (0 !== p.length)
                          for (t = 0; t < p.length; t += 1)
                            ((c = new Hammer.Manager(p[t])),
                              c.add(new Hammer.Tap({ event: "tap" })),
                              c.add(
                                new Hammer.Pan({
                                  direction: Hammer.DIRECTION_ALL,
                                }),
                              ),
                              c.add(new Hammer.Press()),
                              c.add(new Hammer.Pinch({ enable: !0 })),
                              c.on(m, function (e) {
                                ((("panend" === e.type ||
                                  "pinchend" === e.type) &&
                                  p.indexOf(d) > -1) ||
                                  p.indexOf(e.target) > -1) &&
                                  _(e);
                              }),
                              f.push(c));
                        else
                          (void 0 === window.style && (window.style = []),
                            (c = new Hammer.Manager(window)),
                            c.add(new Hammer.Tap({ event: "tap" })),
                            c.add(
                              new Hammer.Pan({
                                direction: Hammer.DIRECTION_ALL,
                              }),
                            ),
                            c.add(new Hammer.Press()),
                            c.add(new Hammer.Pinch({ enable: !0 })),
                            c.on(m, function (e) {
                              _(e);
                            }),
                            f.push(c));
                      } else
                        console.log(
                          "Hammer JS not found, gesture module not initialized",
                        );
                    },
                    destroy: function () {
                      let e;
                      if (null != f)
                        for (e = 0; e < f.length; e += 1)
                          (f[e].off(
                            "tap press pinchstart pinchend panstart panend",
                          ),
                            (f[e].enabled = !1));
                      ((f = []), (p = []));
                    },
                    onevent: function (e) {
                      if (
                        "object" != typeof e ||
                        !e.type ||
                        (!e.gesture && "pagehide" !== e.type) ||
                        !e.target
                      )
                        return;
                      if (
                        "pagehide" !== e.type &&
                        "mouse" === e.gesture.pointerType &&
                        l.preventMouse
                      )
                        return;
                      const t = n.getValue(e, "target.id");
                      switch (e.type) {
                        case "tap":
                          b(t, e);
                          break;
                        case "swipe":
                        case "pinch":
                        case "drag":
                          T(t, e);
                          break;
                        case "tapHold":
                        case "hold":
                        case "release":
                          w(t, e);
                          break;
                        case "pagehide":
                          (clearTimeout(o), s());
                      }
                    },
                  };
                })
              : console &&
                !0 === r &&
                console.info("Could not load TL.Gestures."),
            !0 === a &&
              TLT.addModule("ajaxListener", function (e) {
                let t,
                  n,
                  o,
                  r,
                  i,
                  a,
                  s = {},
                  l = !1,
                  c = !1,
                  u = !1;
                const d = e.utils;
                function f(e) {
                  const t = e.customEvent.data,
                    n = s.blockNonJSONResponse || !1,
                    o = s.fieldBlocklist || [];
                  let r;
                  function i(e, t) {
                    return o.some(
                      (t) => t === e || (t.cRegex && t.cRegex.test(e)),
                    )
                      ? "XXXXX"
                      : t;
                  }
                  return (
                    0 !== t.length &&
                      (n &&
                        ((r =
                          t.responseHeaders &&
                          t.responseHeaders["content-type"]),
                        (r && -1 !== r.indexOf("application/json")) ||
                          (t.response = "non-JSON data has been masked")),
                      (e.customEvent.data = (function (e) {
                        try {
                          const t = JSON.stringify(e, i);
                          return JSON.parse(t);
                        } catch (e) {
                          return (
                            s.debugLog &&
                              console.warn(
                                "[ajaxListener] Error applying Ajax Listener privacy:",
                                e.message,
                              ),
                            `Error applying Ajax Listener privacy - ${e.message}`
                          );
                        }
                      })(t))),
                    e
                  );
                }
                function p(e) {
                  const t = document.createElement("a");
                  return ((t.href = e), t.href);
                }
                function h(e) {
                  const t = {};
                  try {
                    const n = document.createElement("a");
                    n.href = e;
                    const o = n.search;
                    o &&
                      o.length > 1 &&
                      o
                        .substring(1)
                        .split("&")
                        .forEach((e) => {
                          const [n, o] = e.split("=");
                          n &&
                            (t[decodeURIComponent(n)] = o
                              ? decodeURIComponent(o)
                              : "");
                        });
                  } catch (e) {
                    s.debugLog &&
                      console.warn(
                        "[ajaxListener] Error extracting query parameters:",
                        e.message,
                      );
                  }
                  return t;
                }
                function g(e) {
                  const t = s.urlBlocklist;
                  return !(!t || !t.some((t) => t.cRegex.test(e)));
                }
                function m(e, t, n) {
                  const o = s.filters;
                  if (!o || !o.length) return {};
                  const r = o.find((o) => {
                    const r = !o.url || o.url.cRegex.test(e),
                      i = !o.method || o.method.cRegex.test(t),
                      a = !o.status || o.status.cRegex.test(n);
                    return r && i && a;
                  });
                  return void 0 !== r ? r : null;
                }
                function y(e) {
                  return e.split(/[\r\n]+/).reduce((e, t) => {
                    const [n, ...o] = t.split(": "),
                      r = d.rtrim(o.join(": "));
                    return (n && n.length && (e[n] = r), e);
                  }, {});
                }
                function v(e) {
                  const t = {};
                  for (const [n, o] of e.entries()) t[n] = o;
                  return t;
                }
                function w(e) {
                  return v(e);
                }
                function b(e) {
                  if (!e) return e;
                  if (
                    "object" == typeof e &&
                    -1 !== e.toString().indexOf("FormData")
                  )
                    return v(e);
                  if ("string" == typeof e)
                    try {
                      return JSON.parse(e);
                    } catch (t) {
                      return e;
                    }
                  return e;
                }
                function T(t) {
                  let n = {
                    requestHeaders: !1,
                    requestData: !1,
                    responseHeaders: !1,
                    responseData: !1,
                  };
                  const o = m(
                    p(t.tListener.url),
                    t.tListener.method,
                    t.status.toString(),
                  );
                  o &&
                    (o.log && (n = o.log),
                    (function (t, n) {
                      if (!t) return;
                      const o = {
                          type: 5,
                          customEvent: {
                            name: "ajaxListener",
                            data: { interfaceType: "XHR" },
                          },
                        },
                        r = o.customEvent.data,
                        i = document.createElement("a");
                      let a;
                      if (
                        ((i.href = t.tListener.url),
                        (r.originalURL =
                          i.host +
                          ("/" === i.pathname[0] ? "" : "/") +
                          i.pathname),
                        (r.requestURL = e.normalizeUrl
                          ? e.normalizeUrl(r.originalURL, 3)
                          : r.originalURL),
                        (r.queryParams = h(t.tListener.url)),
                        (r.description = `Full Ajax Monitor ${r.requestURL}`),
                        (r.method = t.tListener.method),
                        (r.status = t.status),
                        (r.statusText = t.statusText || ""),
                        (r.async = t.tListener.async),
                        (r.ajaxResponseTime =
                          t.tListener.end - t.tListener.start),
                        (r.locationHref = e.normalizeUrl(
                          document.location.href,
                          3,
                        )),
                        n.requestHeaders &&
                          (r.requestHeaders = t.tListener.reqHeaders),
                        n.requestData &&
                          "string" == typeof t.tListener.reqData &&
                          !t.tListener.isSystemXHR)
                      )
                        try {
                          r.request = JSON.parse(t.tListener.reqData);
                        } catch (e) {
                          r.request = t.tListener.reqData;
                        }
                      if (
                        (n.responseHeaders &&
                          (r.responseHeaders = y(t.getAllResponseHeaders())),
                        n.responseData)
                      ) {
                        if (
                          (void 0 === t.responseType
                            ? (a = t.responseText)
                            : "" === t.responseType || "text" === t.responseType
                              ? (a = t.response)
                              : "json" === t.responseType
                                ? (r.response = t.response)
                                : (r.response = typeof t.response),
                          a)
                        )
                          try {
                            r.response = JSON.parse(a);
                          } catch (e) {
                            r.response = a;
                          }
                        t.responseType && (r.responseType = t.responseType);
                      }
                      e.post(f(o));
                    })(t, n));
                }
                function S(t, n) {
                  const o = p(t.url),
                    r = t.initData.method,
                    i = n.status.toString();
                  let a = {
                    requestHeaders: !1,
                    requestData: !1,
                    responseHeaders: !1,
                    responseData: !1,
                  };
                  if (g(o)) return;
                  const l = m(o, r, i);
                  l &&
                    (l.log && (a = l.log),
                    (function (t, n, o) {
                      const r = {
                          type: 5,
                          customEvent: {
                            name: "ajaxListener",
                            data: { interfaceType: "fetch" },
                          },
                        },
                        i = r.customEvent.data,
                        a = document.createElement("a");
                      if (
                        ((a.href = t.url),
                        (i.originalURL =
                          a.host +
                          ("/" === a.pathname[0] ? "" : "/") +
                          a.pathname),
                        (i.requestURL = e.normalizeUrl
                          ? e.normalizeUrl(i.originalURL, 3)
                          : i.originalURL),
                        (i.queryParams = h(t.url)),
                        (i.description = `Full Ajax Monitor ${i.requestURL}`),
                        (i.method = t.initData.method),
                        (i.status = n.status),
                        (i.statusText = n.statusText || ""),
                        (i.async = !0),
                        (i.ajaxResponseTime = t.end - t.start),
                        (i.responseType = n.type),
                        (i.locationHref = e.normalizeUrl(
                          document.location.href,
                          3,
                        )),
                        o.requestHeaders &&
                          (t.initData.headers &&
                          -1 !==
                            t.initData.headers.toString().indexOf("Headers")
                            ? (i.requestHeaders = w(t.initData.headers))
                            : (i.requestHeaders = t.initData.headers || "")),
                        o.requestData &&
                          void 0 !== t.body &&
                          !t.isSystemXHR &&
                          (i.request = b(t.body)),
                        o.responseHeaders && (i.responseHeaders = w(n.headers)),
                        o.responseData)
                      ) {
                        const t = n.headers.get("content-type");
                        if (t && -1 !== t.indexOf("application/json"))
                          return void n
                            .clone()
                            .json()
                            .then((t) => {
                              ((i.response = t), e.post(f(r)));
                            })
                            .catch((t) => {
                              ((i.response = {}),
                                (i.responseError = `JSON parse error: ${void 0 !== t.message ? t.message : "Invalid or empty JSON"}`),
                                s.debugLog &&
                                  console.warn(
                                    "[ajaxListener] Invalid JSON in response",
                                  ),
                                e.post(f(r)));
                            });
                        if (
                          t &&
                          (-1 !== t.indexOf("text") || -1 !== t.indexOf("xml"))
                        )
                          return void n
                            .clone()
                            .text()
                            .then(function (t) {
                              ((i.response = t), e.post(f(r)));
                            });
                        i.response = `Not logging unsupported response content: ${t}`;
                      }
                      e.post(f(r));
                    })(t, n, a));
                }
                function x(e) {
                  if (!e || !e.target) return;
                  const t = e.target;
                  if (4 === t.readyState) {
                    if (
                      (t.removeEventListener("readystatechange", x),
                      (t.tListener.end = Date.now()),
                      s.debugLog && t.status >= 400)
                    ) {
                    //   (console.group("[ajaxListener] XHR Error Context"),
                    //     console.log("URL:", t.tListener.url),
                    //     console.log("Method:", t.tListener.method),
                    //     console.log("Status:", t.status, t.statusText),
                    //     console.log("Response Type:", t.responseType || "text"),
                    //     t.tListener.initiatorStack &&
                    //       console.log(
                    //         "Initiated from:",
                    //         t.tListener.initiatorStack,
                    //       ));
                      try {
                        const e = t.responseText || t.response;
                        e &&
                          "string" == typeof e &&
                          e.length < 500 &&
                          console.log("Response:", e);
                      } catch (e) {}
                      console.groupEnd();
                    }
                    T(t);
                  }
                }
                function _(e) {
                  const t = TLT.getServiceConfig("queue").queues || [];
                  for (const n of t)
                    if (n.endpoint && -1 !== e.indexOf(n.endpoint)) return !0;
                  return !1;
                }
                function E(e, n, o) {
                  const r = this,
                    i = p(n);
                  if (l && !g(i)) {
                    if (
                      (d.clog("Listening XHR (" + e + ") to " + n),
                      r.addEventListener("readystatechange", x),
                      (r.tListener = {
                        method: e,
                        url: n,
                        async: void 0 === o || !!o,
                        reqHeaders: {},
                        isSystemXHR: _(i),
                      }),
                      s.debugLog)
                    )
                      try {
                        const e = new Error().stack;
                        r.tListener.initiatorStack = e
                          .split("\n")
                          .slice(2)
                          .join("\n");
                      } catch (e) {}
                    (!(function (e) {
                      const t = e.setRequestHeader;
                      e.setRequestHeader = function (e, n) {
                        const o = this.tListener;
                        return (
                          e && e.length && (o.reqHeaders[e] = n),
                          t.apply(this, arguments)
                        );
                      };
                    })(r),
                      (function (e) {
                        const t = e.send;
                        e.send = function (e) {
                          const n = this,
                            o = n.tListener;
                          return (
                            e && (o.reqData = e),
                            (o.start = Date.now()),
                            s.debugLog &&
                              (n.addEventListener("error", function (e) {
                                (console.group(
                                  "[ajaxListener] XHR Network Error Context",
                                ),
                                  console.log("URL:", n.tListener.url),
                                  console.log("Method:", n.tListener.method),
                                  console.log("Error Event:", e),
                                  n.tListener.initiatorStack &&
                                    console.log(
                                      "Initiated from:",
                                      n.tListener.initiatorStack,
                                    ),
                                  console.groupEnd());
                              }),
                              n.addEventListener("abort", function (e) {
                                (console.group(
                                  "[ajaxListener] XHR Aborted Context",
                                ),
                                  console.log("URL:", n.tListener.url),
                                  console.log("Method:", n.tListener.method),
                                  n.tListener.initiatorStack &&
                                    console.log(
                                      "Initiated from:",
                                      n.tListener.initiatorStack,
                                    ),
                                  console.groupEnd());
                              }),
                              n.addEventListener("timeout", function (e) {
                                (console.group(
                                  "[ajaxListener] XHR Timeout Context",
                                ),
                                  console.log("URL:", n.tListener.url),
                                  console.log("Method:", n.tListener.method),
                                  console.log("Timeout:", n.timeout),
                                  n.tListener.initiatorStack &&
                                    console.log(
                                      "Initiated from:",
                                      n.tListener.initiatorStack,
                                    ),
                                  console.groupEnd());
                              })),
                            t.apply(n, arguments)
                          );
                        };
                      })(r));
                  }
                  return t.apply(r, arguments);
                }
                function C(t) {
                  t.forEach((t) => {
                    if ("resource" !== t.entryType || !t.name) return;
                    if (
                      "xmlhttprequest" !== t.initiatorType &&
                      "fetch" !== t.initiatorType
                    )
                      return;
                    const n = p(t.name);
                    if (
                      !g(n) &&
                      !_(n) &&
                      m(
                        n,
                        "GET",
                        void 0 !== t.responseStatus
                          ? t.responseStatus.toString()
                          : "200",
                      )
                    ) {
                      const o = {
                        type: 5,
                        customEvent: {
                          name: "ajaxListener",
                          data: {
                            interfaceType: "PerformanceObserver",
                            originalURL: n,
                            requestURL: e.normalizeUrl
                              ? e.normalizeUrl(n, 3)
                              : n,
                            queryParams: h(t.name),
                            description: `Full Ajax Monitor ${n}`,
                            method: "GET",
                            status:
                              void 0 !== t.responseStatus
                                ? t.responseStatus
                                : 0,
                            statusText: "",
                            async: !0,
                            ajaxResponseTime: t.duration,
                            locationHref: e.normalizeUrl(
                              document.location.href,
                              3,
                            ),
                          },
                        },
                      };
                      e.post(f(o));
                    }
                  });
                }
                function L() {
                  if (window.PerformanceObserver)
                    try {
                      ((i = new PerformanceObserver((e) => {
                        C(e.getEntries());
                      })),
                        i.observe({ entryTypes: ["resource"] }),
                        s.debugLog &&
                          console.info(
                            "[ajaxListener] PerformanceObserver fallback enabled",
                          ));
                    } catch (e) {
                      s.debugLog &&
                        console.warn(
                          "[ajaxListener] Failed to setup PerformanceObserver:",
                          e.message,
                        );
                    }
                }
                function O() {
                  let e = !1;
                  (o &&
                    c &&
                    (XMLHttpRequest.prototype.open.isTLTHook ||
                      (s.debugLog &&
                        console.warn(
                          "[ajaxListener] XHR hook has been overwritten by another tool",
                        ),
                      (c = !1),
                      (e = !0))),
                    r &&
                      u &&
                      (window.fetch.isTLTHook ||
                        (s.debugLog &&
                          console.warn(
                            "[ajaxListener] Fetch hook has been overwritten by another tool",
                          ),
                        (u = !1),
                        (e = !0))),
                    e &&
                      !i &&
                      !1 !== s.enablePerformanceObserverFallback &&
                      (s.debugLog &&
                        console.info(
                          "[ajaxListener] Enabling PerformanceObserver fallback due to hook issues",
                        ),
                      L()));
                }
                function k() {
                  const e =
                    void 0 !== s.hookHealthCheckInterval
                      ? s.hookHealthCheckInterval
                      : 5e3;
                  !1 !== s.monitorHookHealth &&
                    e > 0 &&
                    (a = setInterval(O, e));
                }
                function I() {
                  a && (clearInterval(a), (a = null));
                }
                function D() {
                  i && (i.disconnect(), (i = null));
                }
                function P(e) {
                  e && e.regex && (e.cRegex = new RegExp(e.regex, e.flags));
                }
                function M(e) {
                  let t = d.getValue(e, "cooperativeChaining", !1);
                  e &&
                    e.skipSafetyCheck &&
                    void 0 === e.cooperativeChaining &&
                    (t = !0);
                  const n = e && void 0 !== e.filters ? e.filters : [];
                  for (let e = 0, t = n.length; e < t; e += 1) {
                    const t = n[e];
                    d.forEach([t.url, t.method, t.status], P);
                  }
                  (e && e.urlBlocklist && d.forEach(e.urlBlocklist, P),
                    e && e.fieldBlocklist && d.forEach(e.fieldBlocklist, P),
                    (o =
                      d.getValue(e, "xhrEnabled", !0) && window.XMLHttpRequest),
                    !o ||
                      t ||
                      (-1 !==
                        XMLHttpRequest.toString().indexOf("[native code]") &&
                        -1 !==
                          XMLHttpRequest.toString().indexOf(
                            "XMLHttpRequest",
                          )) ||
                      (o = !1),
                    (r = d.getValue(e, "fetchEnabled", !0) && window.fetch),
                    r &&
                      !t &&
                      -1 === window.fetch.toString().indexOf("[native code]") &&
                      (r = !1));
                }
                return {
                  isUrlBlocked: g,
                  extractFetchRequestBody: b,
                  processConfig: M,
                  getFullUrl: p,
                  extractQueryParams: h,
                  maskData: f,
                  getMatchingFilter: m,
                  extractResponseHeaders: y,
                  processPerformanceEntries: C,
                  setupPerformanceObserver: L,
                  cleanupPerformanceObserver: D,
                  checkHookHealth: O,
                  startHookHealthMonitoring: k,
                  stopHookHealthMonitoring: I,
                  init: function () {
                    ((s = e.getConfig()), M(s));
                  },
                  destroy: function () {
                    ((l = !1), I(), D());
                  },
                  onevent: function (e) {
                    switch (e.type) {
                      case "load":
                        (s.preferPerformanceObserver
                          ? L()
                          : (o &&
                              (function () {
                                if (!XMLHttpRequest) return;
                                const e = XMLHttpRequest.prototype.open,
                                  n =
                                    e !==
                                      XMLHttpRequest.prototype.open
                                        .originalNative &&
                                    -1 ===
                                      e.toString().indexOf("[native code]");
                                ((t = e),
                                  (E.isTLTHook = !0),
                                  (E.originalNative = e),
                                  (XMLHttpRequest.prototype.open = E),
                                  (c = !0),
                                  n &&
                                    s.debugLog &&
                                    console.info(
                                      "[ajaxListener] Cooperative chaining: XHR hook detected and preserved",
                                    ));
                              })(),
                            r &&
                              (function () {
                                if (!window.fetch) return;
                                const e = window.fetch,
                                  t =
                                    -1 ===
                                    e.toString().indexOf("[native code]");
                                n = e;
                                const o = function (e, t) {
                                  const o = {};
                                  "object" == typeof e
                                    ? e instanceof Request
                                      ? ((o.initData = {
                                          method: e.method,
                                          headers: e.headers,
                                          body: e.body,
                                          mode: e.mode,
                                          credentials: e.credentials,
                                          cache: e.cache,
                                          redirect: e.redirect,
                                          referrer: e.referrer,
                                          integrity: e.integrity,
                                        }),
                                        (o.url = e.url),
                                        e
                                          .clone()
                                          .text()
                                          .then((e) => {
                                            e.length > 0 && (o.body = e);
                                          })
                                          .catch(() => {}))
                                      : e.href
                                        ? ((o.url = e.href),
                                          (o.initData = void 0 !== t ? t : {}),
                                          (o.body = t && t.body))
                                        : ((o.url = e.toString()),
                                          (o.initData = void 0 !== t ? t : {}),
                                          (o.body = t && t.body))
                                    : ((o.initData = void 0 !== t ? t : {}),
                                      (o.url = e),
                                      (o.body = t && t.body));
                                  const r = p(o.url);
                                  if (
                                    ((o.isSystemXHR = _(r)),
                                    (o.start = Date.now()),
                                    s.debugLog)
                                  )
                                    try {
                                      const e = new Error().stack;
                                      o.initiatorStack = e
                                        .split("\n")
                                        .slice(2)
                                        .join("\n");
                                    } catch (e) {}
                                  return n
                                    .apply(this, arguments)
                                    .then(
                                      (e) => (
                                        (o.end = Date.now()),
                                        s.debugLog &&
                                          e.status >= 400 &&
                                          (console.group(
                                            "[ajaxListener] Fetch Error Context",
                                          ),
                                          console.log("URL:", o.url),
                                          console.log(
                                            "Method:",
                                            o.initData.method || "GET",
                                          ),
                                          console.log(
                                            "Status:",
                                            e.status,
                                            e.statusText,
                                          ),
                                          console.log("Response Type:", e.type),
                                          o.initiatorStack &&
                                            console.log(
                                              "Initiated from:",
                                              o.initiatorStack,
                                            ),
                                          console.groupEnd()),
                                        S(o, e),
                                        e
                                      ),
                                    )
                                    .catch((e) => {
                                      throw (
                                        s.debugLog &&
                                          (console.group(
                                            "[ajaxListener] Fetch Network Error Context",
                                          ),
                                          console.log("URL:", o.url),
                                          console.log(
                                            "Method:",
                                            o.initData.method || "GET",
                                          ),
                                          console.log("Error:", e.message),
                                          console.log("Error Type:", e.name),
                                          o.initiatorStack &&
                                            console.log(
                                              "Initiated from:",
                                              o.initiatorStack,
                                            ),
                                          console.groupEnd()),
                                        e
                                      );
                                    });
                                };
                                ((o.isTLTHook = !0),
                                  (o.originalNative = e),
                                  (window.fetch = o),
                                  (u = !0),
                                  t &&
                                    s.debugLog &&
                                    console.info(
                                      "[ajaxListener] Cooperative chaining: Fetch hook detected and preserved",
                                    ));
                              })(),
                            k(),
                            s.enablePerformanceObserverFallback && L()),
                          (l = !0));
                        break;
                      case "pagehide":
                        ((l = !1), I(), D());
                    }
                  },
                  version: "1.4.0",
                };
              }),
            TLT.addModule("flushQueue", function () {
              return {
                onevent: function (e) {
                  if (e && "visibilitychange" === e.type)
                    (console.info("Flushing the queue on visibilitychange"),
                      TLT.flushAll());
                },
              };
            }),
            (f = n
              ? n &&
                0 === Object.keys(n).length &&
                Object.getPrototypeOf(n) === Object.prototype
                ? window.TLT.getDefaultConfig()
                : n
              : window.TLT.getDefaultConfig()),
            void 0 !== f &&
            void 0 !== f.services &&
            void 0 !== f.services.queue &&
            void 0 !== f.services.queue.queues[0]
              ? ((f.services.queue.queues[0].endpoint = t),
                void 0 === f.services.queue.queues[0].killswitchURL &&
                  void 0 !== l &&
                  (f.services.queue.queues[0].killswitchURL = l))
              : console &&
                console.warn(
                  "Not able to update defaultConfig.services.queue.queues[0].endpoint",
                ),
            void 0 !== f &&
            void 0 !== f.modules &&
            void 0 !== f.modules.TLCookie
              ? (f.modules.TLCookie.tlAppKey = e)
              : console &&
                console.warn(
                  "Not able to update defaultConfig.modules.TLCookie.tlAppKey",
                ),
            window.TLT.utils.isLegacyIE
              ? (console &&
                  (console.warn(
                    "This version of the UIC does not support Internet Explorer 10 or below.",
                  ),
                  console.info(
                    "Applications requiring Internet Explorer 8 (or below) support should use UIC 5.2.0",
                  )),
                void (window.TLT.terminationReason = "Unsupported browser"))
              : (window.TLT.init(f, c),
                !0 === s &&
                  (function () {
                    const e = window.TLT.destroy;
                    let t;
                    function n() {
                      "visible" === document.visibilityState &&
                        document.hasFocus() &&
                        (t &&
                          window.TLT &&
                          !TLT.isInitialized() &&
                          (console.log("Restarting TLT"),
                          TLT.init(t),
                          (t = null)),
                        window.removeEventListener("visibilitychange", n),
                        window.removeEventListener("focus", n));
                    }
                    window.TLT.destroy = function (o, r) {
                      ("inactivity" === r &&
                        ((t = TLT.getConfig()),
                        window.addEventListener("visibilitychange", n),
                        window.addEventListener("focus", n)),
                        e.call(window.TLT, o, r));
                    };
                  })(),
                f)
          );
        },
        updatePageId: function () {
          w = "P." + d.getRandomString(28);
        },
        init: function (e, t) {
          if (((d = this.utils), d.isLegacyIE))
            return void d.clog(
              "This version of UIC does not support Internet Explorer 8 and below. For older browsers, use UIC 5.2.0 instead.",
            );
          if (((R = t), !j)) throw new Error("init must only be called once!");
          if (!e && !this.config) throw new Error("missing configuration.");
          if (
            ((e = e || this.config),
            (this.config = e),
            (j = !1),
            e && e.modules && void 0 !== e.modules)
          )
            for (const t of Object.keys(e.modules)) {
              const n = e.modules[t],
                o = n && n.events ? n.events : void 0;
              if (o && o instanceof Array) {
                const e = o.find((e) => "unload" === e.name);
                e && (e.name = "pagehide");
              }
            }
          const n = e && e.core && e.core.modules ? e.core.modules : void 0;
          if (void 0 !== n)
            for (const e of Object.keys(n)) {
              const t = n[e],
                o = t && t.events ? t.events : void 0;
              if (o && o instanceof Array) {
                const e = o.find((e) => "unload" === e.name);
                e && (e.name = "pagehide");
              }
            }
          (void 0 !== e &&
            e.modules &&
            e.modules.TLCookie &&
            e.modules.TLCookie.sessionIDUsesFallbackStorage &&
            (g = Boolean(e.modules.TLCookie.sessionIDUsesFallbackStorage)),
            g &&
              (window.altStorage = {
                data: window.name ? JSON.parse(window.name) : {},
                saveData: function (e, t) {
                  ((this.data[e] = `"${t}"`), this.updateWindowName());
                },
                getData: function (e) {
                  return this.data[e];
                },
                removeData: function (e) {
                  return (
                    e in this.data &&
                    (delete this.data[e], this.updateWindowName(), !0)
                  );
                },
                updateWindowName: function () {
                  window.name = JSON.stringify(this.data);
                },
              }),
            (w = "P." + d.getRandomString(28)),
            (b = X()));
          const o = function (n) {
            ("load" !== (n = n || window.event || {}).type &&
              "loading" === document.readyState) ||
              (document.removeEventListener
                ? (document.removeEventListener("DOMContentLoaded", o, !1),
                  window.removeEventListener("load", o, !1))
                : (document.detachEvent("onreadystatechange", o),
                  window.detachEvent("onload", o)),
              A(e, t));
          };
          "complete" === document.readyState ||
          ("interactive" === document.readyState && !d.isIE)
            ? setTimeout(o)
            : document.addEventListener
              ? (document.addEventListener("DOMContentLoaded", o, !1),
                window.addEventListener("load", o, !1))
              : (document.attachEvent("onreadystatechange", o),
                window.attachEvent("onload", o));
        },
        isInitialized: function () {
          return _;
        },
        getState: function () {
          return E;
        },
        destroy: function (e, t) {
          let o = "",
            r = "",
            i = null,
            a = null,
            s = null,
            l = !1;
          if (j) return !1;
          if ((this.stopAll(), !e)) {
            for (o in D)
              Object.prototype.hasOwnProperty.call(D, o) &&
                ((r = o.split("|")[0]),
                (i = D[o].target),
                (l = D[o].delegateTarget || void 0),
                n && n.unsubscribe(r, i, this._publishEvent, l));
            u && (n.unsubscribe("mousemove", document, u), (u = null));
          }
          for (a in x)
            Object.prototype.hasOwnProperty.call(x, a) &&
              ((s = x[a].instance),
              s && "function" == typeof s.destroy && s.destroy(),
              (x[a].instance = null));
          (C.clearCache(),
            (D = {}),
            (I = {}),
            (M = []),
            (_ = !1),
            (j = !0),
            (E = "destroyed"),
            (TLT.terminationReason = t || E));
          try {
            (sessionStorage.setItem("tl.TR", TLT.terminationReason),
              sessionStorage.setItem(
                "tl.PU",
                this.normalizeUrl("", location.href),
              ));
          } catch (e) {}
          if ("function" == typeof R)
            try {
              R("destroyed");
            } catch (e) {}
          c || (window.addEventListener("pageshow", m), (c = !0));
        },
        _updateModules: function (e) {
          let t = null,
            n = null,
            o = !0;
          if (l && l.modules)
            try {
              for (n in l.modules)
                if (
                  Object.prototype.hasOwnProperty.call(l.modules, n) &&
                  ((t = l.modules[n]),
                  Object.prototype.hasOwnProperty.call(S, n))
                ) {
                  if (!1 === t.enabled) {
                    this.stop(n);
                    continue;
                  }
                  (this.start(n),
                    t.events && this._registerModuleEvents(n, t.events, e));
                }
              this._registerModuleEvents.clearCache();
            } catch (e) {
              throw (
                q.destroy(!1, "_updateModules: " + e.message),
                (o = !1),
                new Error(e)
              );
            }
          else o = !1;
          return o;
        },
        rebind: function (e) {
          q._updateModules(e);
        },
        getSessionData: function () {
          if (!q.isInitialized())
            throw new Error(
              "getSessionData API was called before UIC is initialized.",
            );
          let e,
            t,
            n,
            o = null,
            r = null;
          return l && l.sessionDataEnabled
            ? ((r = l.sessionData || {}),
              (e = r.sessionQueryName),
              e
                ? (t = d.getQueryStringValue(e, r.sessionQueryDelim))
                : ((e = r.sessionCookieName),
                  e
                    ? (t = d.getCookieValue(e))
                    : ((n = TLT.getTLTSessionCookieInfo()),
                      (e = n.tltCookieName),
                      (t = n.tltCookieValue))),
              e &&
                t &&
                ((o = o || {}),
                (o.tltSCN = e),
                (o.tltSCV = t),
                (o.tltSCVNeedsHashing = !!r.sessionValueNeedsHashing)),
              o)
            : (d.clog(
                "TLT.getSessionData() API called when " +
                  (l
                    ? "session data sharing is disabled."
                    : "TLT is not initialized."),
              ),
              null);
        },
        logGeolocation: function (e) {
          if (!q.isInitialized())
            throw new Error(
              "logGeolocation API was called before UIC is initialized.",
            );
          if (!e || !e.coords) return;
          const t = {
            type: 13,
            geolocation: {
              lat: d.getValue(e, "coords.latitude", 0),
              long: d.getValue(e, "coords.longitude", 0),
              accuracy: Math.ceil(d.getValue(e, "coords.accuracy", 0)),
            },
          };
          i.post("", t);
        },
        logCustomEvent: function (e, t) {
          if (!q.isInitialized())
            throw new Error(
              "logCustomEvent API was called before UIC is initialized.",
            );
          let n = null;
          ((e && "string" == typeof e) || (e = "CUSTOM"),
            (t = t || {}),
            (n = { type: 5, customEvent: { name: e, data: d.clone(t) } }),
            i.post("", n));
        },
        logExceptionEvent: function (e, t, n) {
          if (!q.isInitialized())
            throw new Error(
              "logExceptionEvent API was called before UIC is initialized.",
            );
          let o = null;
          e &&
            "string" == typeof e &&
            (t && (t = q.normalizeUrl("", t, 6)),
            (o = {
              type: 6,
              exception: {
                description: e,
                url: (t = t || ""),
                line: (n = n || -1),
              },
            }),
            i.post("", o));
        },
        logFormCompletion: function (e, t) {
          if (!q.isInitialized())
            throw new Error(
              "logFormCompletion API was called before UIC is initialized.",
            );
          const n = {
            type: 15,
            formCompletion: {
              submitted: !!e,
              valid: "boolean" == typeof t ? t : null,
            },
          };
          i.post("", n);
        },
        logDataLayer: function (e) {
          let t;
          if (!q.isInitialized())
            throw new Error(
              "logDataLayer API was called before UIC is initialized.",
            );
          if (!s)
            throw new Error(
              "logDataLayer API was called but Data Layer module not found.",
            );
          (e && "object" != typeof e) ||
            ((t = { type: "logDataLayer", data: e }), s.onevent(t));
        },
        logScreenviewLoad: function (e, t, n) {
          if (!q.isInitialized())
            throw new Error(
              "logScreenviewLoad API was called before UIC is initialized.",
            );
          y("LOAD", e, t);
        },
        logScreenviewUnload: function (e) {
          if (!q.isInitialized())
            throw new Error(
              "logScreenviewUnload API was called before UIC is initialized.",
            );
          y("UNLOAD", e);
        },
        logDOMCapture: function (e, t) {
          let n,
            o,
            a,
            s = null;
          if (!this.isInitialized())
            throw new Error(
              "logDOMCapture API was called before UIC is initialized.",
            );
          return (
            d.isLegacyIE ||
              (r &&
                ((e = e || window.document),
                (o = this.getServiceConfig("domCapture")),
                (t = d.mixin({}, o.options, t)),
                (n = r.captureDOM(e, t)),
                n &&
                  ((s =
                    t.dcid ||
                    "dcid-" + d.getSerialNumber() + "." + new Date().getTime()),
                  (n.dcid = s),
                  (n.eventOn = !!t.eventOn),
                  (a = { type: 12, domCapture: n }),
                  t.timeoutExpired && (a.domCapture.timeout = !0),
                  i.post("", a),
                  !1 !== t.qffd &&
                    !z &&
                    a.domCapture.fullDOM &&
                    (i.flush(), (z = !0))))),
            s
          );
        },
        logSignal: function (e) {
          if (!q.isInitialized())
            throw new Error(
              "logSignal API was called before UIC is initialized.",
            );
          if (window.TLT.utils.isUndefOrNull(e) || window.TLT.utils.isEmpty(e))
            return !1;
          let t = { type: 21, signal: d.clone(e) };
          return (i.post("", t), !0);
        },
        performDOMCapture: function (e, t, n) {
          return this.logDOMCapture(t, n);
        },
        performFormCompletion: function (e, t, n) {
          return this.logFormCompletion(t, n);
        },
        _bridgeCallback: function (e) {
          const t = P[e];
          return t && t.enabled ? t : null;
        },
        logScreenCapture: function () {
          if (!q.isInitialized())
            throw new Error(
              "logScreenCapture API was called before UIC is initialized.",
            );
          const e = q._bridgeCallback("screenCapture");
          null !== e && e.cbFunction();
        },
        enableTealeafFramework: function () {
          if (!q.isInitialized())
            throw new Error(
              "enableTealeafFramework API was called before UIC is initialized.",
            );
          const e = q._bridgeCallback("enableTealeafFramework");
          null !== e && e.cbFunction();
        },
        disableTealeafFramework: function () {
          if (!q.isInitialized())
            throw new Error(
              "disableTealeafFramework API was called before UIC is initialized.",
            );
          const e = q._bridgeCallback("disableTealeafFramework");
          null !== e && e.cbFunction();
        },
        startNewTLFSession: function () {
          if (!q.isInitialized())
            throw new Error(
              "startNewTLFSession API was called before UIC is initialized.",
            );
          const e = q._bridgeCallback("startNewTLFSession");
          null !== e && e.cbFunction();
        },
        currentSessionId: function () {
          if (!q.isInitialized())
            throw new Error(
              "currentSessionId API was called before UIC is initialized.",
            );
          let e;
          const t = q._bridgeCallback("currentSessionId");
          return (null !== t && (e = t.cbFunction()), e);
        },
        defaultValueForConfigurableItem: function (e) {
          if (!q.isInitialized())
            throw new Error(
              "defaultValueForConfigurableItem API was called before UIC is initialized.",
            );
          let t;
          const n = q._bridgeCallback("defaultValueForConfigurableItem");
          return (null !== n && (t = n.cbFunction(e)), t);
        },
        valueForConfigurableItem: function (e) {
          if (!q.isInitialized())
            throw new Error(
              "valueForConfigurableItem API was called before UIC is initialized.",
            );
          let t;
          const n = q._bridgeCallback("valueForConfigurableItem");
          return (null !== n && (t = n.cbFunction(e)), t);
        },
        setConfigurableItem: function (e, t) {
          if (!q.isInitialized())
            throw new Error(
              "setConfigurableItem API was called before UIC is initialized.",
            );
          let n = !1;
          const o = q._bridgeCallback("setConfigurableItem");
          return (null !== o && (n = o.cbFunction(e, t)), n);
        },
        addAdditionalHttpHeader: function (e, t) {
          if (!q.isInitialized())
            throw new Error(
              "addAdditionalHttpHeader API was called before UIC is initialized.",
            );
          let n = !1;
          const o = q._bridgeCallback("addAdditionalHttpHeader");
          return (null !== o && (n = o.cbFunction(e, t)), n);
        },
        logCustomEventBridge: function (e, t, n) {
          if (!q.isInitialized())
            throw new Error(
              "logCustomEventBridge API was called before UIC is initialized.",
            );
          let o = !1;
          const r = q._bridgeCallback("logCustomEventBridge");
          return (null !== r && (o = r.cbFunction(e, t, n)), o);
        },
        registerBridgeCallbacks: function (e) {
          let t,
            n,
            o,
            r,
            i,
            a,
            s,
            l = null;
          const c = TLT.utils;
          if (!e) return !1;
          if (0 === e.length)
            return (
              c.clog("Resetting previously registered callbacks."),
              (P = {}),
              !1
            );
          try {
            for (t = 0, o = e.length; t < o; t += 1)
              if (
                ((l = e[t]), "object" == typeof l && l.cbType && l.cbFunction)
              )
                if (
                  ((r = {
                    enabled: l.enabled,
                    cbFunction: l.cbFunction,
                    cbOrder: l.order || 0,
                  }),
                  c.isUndefOrNull(P[l.cbType]))
                )
                  r.enabled &&
                    ((P[l.cbType] = r),
                    c.clog("Registered callback: ", l.cbType, r));
                else {
                  for (
                    c.isArray(P[l.cbType]) || (P[l.cbType] = [P[l.cbType]]),
                      i = P[l.cbType],
                      n = 0,
                      s = !1,
                      a = i.length;
                    n < a;
                    n += 1
                  )
                    if (
                      i[n].cbOrder === r.cbOrder &&
                      i[n].cbFunction === r.cbFunction
                    )
                      ((s = !0),
                        r.enabled ||
                          (i.splice(n, 1),
                          i.length || delete P[l.cbType],
                          c.clog("Removed callback: ", l.cbType, r)));
                    else if (i[n].cbOrder > r.cbOrder) break;
                  s ||
                    (r.enabled &&
                      (i.splice(n, 0, r),
                      c.clog("Registered callback: ", l.cbType, r)));
                }
          } catch (e) {
            return !1;
          }
          return !0;
        },
        registerMutationCallback: function (e, t) {
          let n;
          return (
            !(!e || "function" != typeof e) &&
            (t
              ? ((n = M.indexOf(e)),
                -1 === n &&
                  (M.push(e), d.clog("Registered mutation callback: ", e)))
              : ((n = M.indexOf(e)),
                -1 !== n &&
                  (M.splice(n, 1),
                  d.clog("Unregistered mutation callback: ", e))),
            !0)
          );
        },
        invokeMutationCallbacks: function (e) {
          let t, n, o, r, i;
          const a = [],
            s = [];
          if (0 !== M.length) {
            for (
              i = Map ? new Map() : new d.WeakMap(), t = 0;
              t < e.length;
              t++
            )
              ((r = e[t].target),
                r &&
                  ((o = d.getDocument(r)),
                  void 0 === i.get(o) &&
                    (o.host ? s.push(o) : a.push(o), i.set(o, !0))));
            for (i.clear(), t = 0; t < M.length; t++) ((n = M[t]), n(e, a, s));
          }
        },
        redirectQueue: function (e) {
          let t, n, o, r, i, s, l;
          if (!e || !e.length) return e;
          if (((r = P.messageRedirect), !r)) return e;
          for (i = d.isArray(r) ? r : [r], n = 0, s = i.length; n < s; n += 1)
            if (((r = i[n]), r && r.enabled))
              for (t = 0, o = e.length; t < o; t += 1)
                ((l = r.cbFunction(a.serialize(e[t]), e[t])),
                  l && "object" == typeof l
                    ? (e[t] = l)
                    : (e.splice(t, 1), (t -= 1), (o = e.length)));
          return e;
        },
        _hasSameOrigin: function (e) {
          let t = !1;
          try {
            return (
              (t =
                e.document.location.host === document.location.host &&
                e.document.location.protocol === document.location.protocol),
              t || (t = e.document.domain === document.domain),
              t
            );
          } catch (e) {}
          return !1;
        },
        provideRequestHeaders: function () {
          let e = null;
          const t = P.addRequestHeaders;
          return (t && t.enabled && (e = t.cbFunction()), e);
        },
        _registerModuleEvents: (function () {
          let e,
            o = 0;
          function i(e) {
            const t = d.getIFrameWindow(e);
            return (
              null !== t &&
              q._hasSameOrigin(t) &&
              null !== t.document &&
              "complete" === t.document.readyState &&
              "" !== t.document.body.innerHTML
            );
          }
          function a(a, s, l) {
            if (
              ((l = l || q._getLocalTop().document),
              (e = e || new d.WeakMap()),
              (function (o, r, i) {
                let a, s, l;
                const c = d.getDocument(i),
                  u = q._getLocalTop(),
                  f = d.isIFrameDescendant(i);
                if (
                  ((i = i || c),
                  k.normalizeModuleEvents(o, r, u, c),
                  f &&
                    ((a = t.ElementData.prototype.examineID(i).id),
                    "string" == typeof a))
                )
                  for (s in ((a = a.slice(0, a.length - 1)), D))
                    if (Object.prototype.hasOwnProperty.call(D, s))
                      for (l = 0; l < D[s].length; l += 1)
                        if (o === D[s][l] && -1 !== s.indexOf(a)) {
                          delete D[s];
                          break;
                        }
                d.forEach(r, function (r) {
                  let a = "";
                  const s =
                    (function (e, t, n) {
                      return "window" === e ? t : "document" === e ? n : e;
                    })(r.target, u, c) || c;
                  (!0 !== r.recurseFrames && f) ||
                    ("string" == typeof s
                      ? d.forEach(n.queryAll(s, i), function (i) {
                          let s = e.get(i);
                          (s ||
                            ((s = t.ElementData.prototype.examineID(i)),
                            e.set(i, s)),
                            (a = r.name + "|" + s.id + s.idType),
                            -1 === d.indexOf(D[a], o) &&
                              ((D[a] = D[a] || []),
                              D[a].push(o),
                              (D[a].target = i),
                              n.subscribe(r.name, i, q._publishEvent)));
                        })
                      : ((a = q._buildToken4bubbleTarget(
                          r.name,
                          s,
                          void 0 === r.target,
                        )),
                        Object.prototype.hasOwnProperty.call(D, a)
                          ? -1 === d.indexOf(D[a], o) && D[a].push(o)
                          : ((D[a] = [o]),
                            n.subscribe(r.name, s, q._publishEvent))),
                    "" !== a && "string" != typeof s && (D[a].target = s));
                });
              })(a, s, l),
              "performance" !== a)
            ) {
              let e,
                t,
                c = null,
                u = null;
              const f = n.queryAll("iframe, frame", l);
              for (e = 0, t = f.length; e < t; e += 1)
                ((c = f[e]),
                  C(c) ||
                    (i(c)
                      ? ((u = d.getIFrameWindow(c)),
                        q._registerModuleEvents(a, s, u.document),
                        r.observeWindow(u))
                      : ((o += 1),
                        (function (e, t, n) {
                          let a = null;
                          const s = function () {
                            let i = null;
                            (C(n) ||
                              ((i = d.getIFrameWindow(n)),
                              q._hasSameOrigin(i) &&
                                (q._registerModuleEvents(e, t, i.document),
                                r.observeWindow(i))),
                              (o -= 1),
                              o ||
                                q._publishEvent({
                                  type: "loadWithFrames",
                                  custom: !0,
                                }));
                          };
                          (d.addEventListener(n, "load", function () {
                            s();
                          }),
                            d.isLegacyIE &&
                              i(n) &&
                              ((a = d.getIFrameWindow(n)),
                              d.addEventListener(
                                a.document,
                                "readystatechange",
                                function () {
                                  s();
                                },
                              )));
                        })(a, s, c))));
            }
          }
          return (
            (a.clearCache = function () {
              e && (e.clear(), (e = null));
            }),
            a
          );
        })(),
        _buildToken4currentTarget: function (e) {
          const n = e.nativeEvent ? e.nativeEvent.currentTarget : null,
            o = n
              ? t.ElementData.prototype.examineID(n)
              : {
                  id: e.target ? e.target.id : null,
                  idType: e.target ? e.target.idType : -1,
                };
          return e.type + "|" + o.id + o.idType;
        },
        _buildToken4delegateTarget: function (e, t, n) {
          return e + "|" + t + "|" + n;
        },
        _buildToken4bubbleTarget: function (e, o, r, i) {
          let a;
          const s = q._getLocalTop(),
            l = d.getDocument(o);
          let c,
            u = null,
            f = e;
          return (
            l && (a = l.defaultView || l.parentWindow),
            o === window || o === window.window
              ? (f += "|null-2|window")
              : r &&
                  a &&
                  q._hasSameOrigin(a.parent) &&
                  void 0 !== l &&
                  s.document !== l
                ? ((u = (function (e) {
                    let t = null;
                    return (
                      q._hasSameOrigin(a.parent) &&
                        d.forEach(
                          n.queryAll("iframe, frame", a.parent.document),
                          function (n) {
                            let o = null;
                            C(n) ||
                              ((o = d.getIFrameWindow(n)),
                              q._hasSameOrigin(o) &&
                                o.document === e &&
                                (t = n));
                          },
                        ),
                      t
                    );
                  })(l)),
                  u &&
                    ((c = t.ElementData.prototype.examineID(u)),
                    (f += "|" + c.xPath + "-2")))
                : (f += "|null-2|document"),
            f
          );
        },
        _reinitConfig: function () {
          q._updateModules();
        },
        _publishEvent: function (e) {
          let t,
            o,
            r,
            a,
            s = null,
            c = null,
            u =
              e.delegateTarget && e.data
                ? e.data
                : q._buildToken4currentTarget(e),
            f = null,
            p = null,
            g = !1,
            m = !1;
          const y = e.delegateTarget || null;
          ((I = e),
            e.type.match(/^(click|change|blur|mouse|touch)/) &&
              (N(h), i.resetFlushTimer()));
          if (
            (d.getValue(l, "screenviewAutoDetect", !0) && U(),
            ("load" !== e.type && "pageshow" !== e.type) ||
              e.nativeEvent.customLoad)
          )
            if (
              ("click" === e.type && (L = e.target.element),
              "beforeunload" === e.type &&
                ((g = !1),
                (a = "a" === d.getTagName(L) ? L : document.activeElement),
                a &&
                  (F(a)
                    ? (g = !0)
                    : d.forEach(l.ieExcludedLinks, function (e) {
                        let t, o;
                        const r = n.queryAll(e);
                        for (t = 0, o = r ? r.length : 0; t < o; t += 1)
                          if (r[t] && r[t] === L) {
                            g = !0;
                            break;
                          }
                      })),
                g))
            )
              I = {};
            else if (
              (k.isUnload(e) && (E = "unloading"),
              "change" !== e.type ||
                !d.isLegacyIE ||
                ("checkbox" !== e.target.element.type &&
                  "radio" !== e.target.element.type))
            ) {
              if ("propertychange" === e.type) {
                if (
                  "checked" !== e.nativeEvent.propertyName ||
                  !(
                    "checkbox" === e.target.element.type ||
                    ("radio" === e.target.element.type &&
                      e.target.element.checked)
                  )
                )
                  return void (I = {});
                ((e.type = "change"), (e.target.type = "INPUT"));
              }
              if (e.target && V(e.target.element)) I = {};
              else {
                if (
                  (Object.prototype.hasOwnProperty.call(D, u) ||
                    (Object.prototype.hasOwnProperty.call(e, "nativeEvent") &&
                      (r = e.nativeEvent.currentTarget || e.nativeEvent.target),
                    (u = q._buildToken4bubbleTarget(e.type, r, !0, y))),
                  Object.prototype.hasOwnProperty.call(D, u))
                )
                  for (f = D[u], t = 0, o = f.length; t < o; t += 1)
                    if (
                      ((s = f[t]),
                      (c = q.getModule(s)),
                      (p = d.mixin({}, e)),
                      c &&
                        q.isStarted(s) &&
                        "function" == typeof c.onevent &&
                        ((m = k.canPublish(s, p)), m))
                    )
                      try {
                        c.onevent(p);
                      } catch (e) {
                        d.clog("ERROR in " + s + " module.", e);
                      }
                (p && "pagehide" === p.type && m && q.destroy(!1, p.type),
                  (I = {}));
              }
            } else I = {};
          else I = {};
        },
        _getLocalTop: function () {
          return window.window;
        },
        addModule: function (e, t) {
          if (Object.prototype.hasOwnProperty.call(S, e))
            throw new Error(
              "Attempting to add duplicate module '" + e + "' on TLT.",
            );
          ((S[e] = { creator: t, instance: null, context: null, messages: [] }),
            this.isInitialized() && this.start(e));
        },
        getModule: function (e) {
          return S[e] && S[e].instance ? S[e].instance : null;
        },
        removeModule: function (e) {
          (this.stop(e), delete S[e]);
        },
        isStarted: function (e) {
          return (
            Object.prototype.hasOwnProperty.call(S, e) && null !== S[e].instance
          );
        },
        start: function (e) {
          let t = null;
          const n = S[e];
          if (!Object.prototype.hasOwnProperty.call(S, e))
            throw new Error(
              "Attempting to start nonexistent module '" + e + "' on TLT.",
            );
          n &&
            null === n.instance &&
            ((n.context = new TLT.ModuleContext(e, this)),
            (t = n.instance = n.creator(n.context)),
            "function" == typeof t.init && t.init());
        },
        startAll: function () {
          let e = null;
          for (e in S)
            Object.prototype.hasOwnProperty.call(S, e) && this.start(e);
        },
        stop: function (e) {
          let t = null;
          const n = S[e];
          n &&
            null !== n.instance &&
            ((t = n.instance),
            "function" == typeof t.destroy && t.destroy(),
            (n.instance = n.context = null));
        },
        stopAll: function () {
          let e = null;
          for (e in S)
            Object.prototype.hasOwnProperty.call(S, e) && this.stop(e);
        },
        addService: function (e, t) {
          if (Object.prototype.hasOwnProperty.call(x, e))
            throw new Error(
              "Attempting to add duplicate service '" + e + "' on TLT.",
            );
          x[e] = { creator: t, instance: null };
        },
        getService: function (e) {
          if (Object.prototype.hasOwnProperty.call(x, e)) {
            if (!x[e].instance) {
              try {
                ((x[e].instance = x[e].creator(this)),
                  "function" == typeof x[e].instance.init &&
                    x[e].instance.init());
              } catch (t) {
                throw (
                  d.clog(
                    "UIC terminated due to error when instanciating the " +
                      e +
                      " service.",
                  ),
                  new Error(t)
                );
              }
              "function" != typeof x[e].instance.getServiceName &&
                (x[e].instance.getServiceName = function () {
                  return e;
                });
            }
            return x[e].instance;
          }
          return null;
        },
        removeService: function (e) {
          delete x[e];
        },
        broadcast: function (e) {
          let t, n;
          if (e && "object" == typeof e) {
            if (!Object.prototype.hasOwnProperty.call(e, "type"))
              throw new Error("Message is missing property 'type'.");
            for (t in S)
              Object.prototype.hasOwnProperty.call(S, t) &&
                ((n = S[t]),
                d.indexOf(n.messages, e.type) > -1 &&
                  "function" == typeof n.instance.onmessage &&
                  n.instance.onmessage(e));
          }
        },
        listen: function (e, t) {
          let n = null;
          this.isStarted(e) &&
            ((n = S[e]), -1 === d.indexOf(n.messages, t) && n.messages.push(t));
        },
        fail: function (e, t, n) {
          e = "UIC FAILED. " + e;
          try {
            q.destroy(!!n, e);
          } catch (t) {
            d.clog(e);
          }
          throw new q.UICError(e, t);
        },
        UICError: (function () {
          function e(e, t) {
            ((this.message = e), (this.code = t));
          }
          return (
            (e.prototype = new Error()),
            (e.prototype.name = "UICError"),
            (e.prototype.constructor = e),
            e
          );
        })(),
        isCrossOrigin: function (e, t) {
          let n,
            o = !1;
          if (((t = t || window.location.origin), !e || !t)) return o;
          const r = e.match(/^\/\//);
          return (
            (e.match(/^\//) && !r) ||
              ((r || -1 !== e.indexOf("://")) &&
                (r &&
                  ((n = t.indexOf("://")),
                  -1 !== n && (t = t.substring(n + 1))),
                (o =
                  e.length < t.length ||
                  t !== e.substring(0, t.length) ||
                  (e.length > t.length && "/" !== e.charAt(t.length))))),
            o
          );
        },
      };
    function B(t, n, o, r) {
      let i = !0;
      (t && n && n.match("GetRemoteConfig")
        ? (i = !1)
        : t &&
          t.match("collectorPost") &&
          (n = t.replace("collectorPost", "switch/" + o.tlAppKey)),
        n && i
          ? (function (t, n) {
              (d.clog("Checking killswitch: " + t),
                e.sendRequest({
                  type: "GET",
                  url: t,
                  async: !0,
                  timeout: 5e3,
                  oncomplete: function (e) {
                    (!(function (e) {
                      (d.clog("Killswitch request result", e),
                        ("0" === e.responseText || 0 === e.data) &&
                          (d.clog(
                            "UIC terminated because the killswitch is enabled.",
                          ),
                          q.setAutoFlush(!1),
                          d.setCookie("TLTSID", "DND"),
                          q.destroy(!1, "killswitch")));
                    })(e),
                      n && "function" == typeof n && n(e, t));
                  },
                }));
            })(n, r)
          : n && !i
            ? (function (t, n, o) {
                d.clog("Checking remoteConfig: " + t);
                const r = {
                    appKey: n.tlAppKey,
                    osVersion: "N/A",
                    platform: "web",
                    appVersion: "N/A",
                    tealeafSDKVersion: q.getLibraryVersion(),
                    connection: "N/A",
                    signalStrength: "N/A",
                    deviceId: d.getCookieValue("TLTDID"),
                    cellularConnectionType: "N/A",
                  },
                  i = {
                    "X-Tealeaf-SaaS-AppKey": n.tlAppKey,
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Headers": "*",
                  };
                e.sendRequest({
                  url: t,
                  async: !0,
                  timeout: 5e3,
                  data: JSON.stringify(r),
                  headers: i,
                  oncomplete: function (e) {
                    (!(function (e, t) {
                      let n = !0;
                      if (e && 200 === e.statusCode && e.responseText) {
                        const o = JSON.parse(e.responseText);
                        if (o && o.appWebConfig && o.appWebConfig.UIC) {
                          let r = o.appWebConfig.UIC;
                          ((r = (function (e, t) {
                            e &&
                            e.modules &&
                            e.modules.dataLayer &&
                            e.modules.dataLayer.dataObjects &&
                            t &&
                            t.length > 0
                              ? e.modules.dataLayer.dataObjects.push.apply(
                                  e.modules.dataLayer.dataObjects,
                                  t,
                                )
                              : (e
                                  ? e.modules
                                    ? e.modules.dataLayer ||
                                      (e.modules.dataLayer = {
                                        dataObjects: {},
                                      })
                                    : (e.modules = {
                                        dataLayer: { dataObjects: {} },
                                      })
                                  : (e = {
                                      modules: {
                                        dataLayer: { dataObjects: {} },
                                      },
                                    }),
                                (e.modules.dataLayer.dataObjects = t));
                            e.core
                              ? e.core.modules
                                ? e.core.modules.dataLayer ||
                                  (e.core.modules.dataLayer = {
                                    enabled: !1,
                                    events: [
                                      { name: "load", target: window },
                                      { name: "pagehide", target: window },
                                    ],
                                  })
                                : (e.core.modules = {
                                    dataLayer: {
                                      enabled: !1,
                                      events: [
                                        { name: "load", target: window },
                                        { name: "pagehide", target: window },
                                      ],
                                    },
                                  })
                              : (e.core = {
                                  modules: {
                                    dataLayer: {
                                      enabled: !1,
                                      events: [
                                        { name: "load", target: window },
                                        { name: "pagehide", target: window },
                                      ],
                                    },
                                  },
                                });
                            return ((e.core.modules.dataLayer.enabled = !0), e);
                          })(
                            r,
                            (function (e) {
                              const t = [];
                              if (!e || 0 == Object.keys(e).length) return t;
                              const n = {};
                              e.forEach((e) => {
                                (n[e.object] ||
                                  (n[e.object] = { permittedProperties: [] }),
                                  e.property &&
                                    n[e.object].permittedProperties.push(
                                      e.property,
                                    ),
                                  n[e.object].filter ||
                                    (n[e.object].filter = []),
                                  e.matchProperty &&
                                    e.matchValue &&
                                    n[e.object].filter.push({
                                      matchProperty: e.matchProperty,
                                      matchValue: e.matchValue,
                                    }));
                              });
                              return (
                                Object.keys(n).forEach((e, o) => {
                                  const r = {
                                    dataObject: e,
                                    rules: {
                                      includeEverything: !0,
                                      permittedProperties:
                                        n[e].permittedProperties,
                                      propertyBlocklist: [],
                                      screenviewBlocklist: [],
                                      filter: n[e].filter,
                                    },
                                  };
                                  t.push(r);
                                }),
                                t
                              );
                            })(o.appWebDataLayer),
                          )),
                            (e.updatedRemoteConfigWebObj = r),
                            window.TLT.destroy(),
                            A(r, t),
                            (n = !1));
                        }
                      }
                      n &&
                        t &&
                        "function" == typeof t &&
                        t("bad remote config");
                    })(e, void 0),
                      o && "function" == typeof o && o(e, t));
                  },
                });
              })(n, o, r)
            : r && "function" == typeof r && r(void 0, n));
    }
    return (
      (N = function (e) {
        let t = null;
        const n = d.getValue(l, "inactivityTimeout", e);
        function o() {
          (d.clog("UIC self-terminated due to inactivity timeout."),
            q.destroy(!1, "inactivity"));
        }
        n
          ? ((N = function () {
              (t && (clearTimeout(t), (t = null)), (t = setTimeout(o, n)));
            }),
            N())
          : (N = function () {});
      }),
      (A = function (c, f) {
        let m,
          y,
          v,
          b,
          T,
          S = null;
        if (_)
          return void d.clog("TLT.init() called more than once. Ignoring.");
        if (TLT && TLT.replay) return;
        ((o = q.getService("config")),
          o.updateConfig(c),
          (l = o.getCoreConfig()));
        const x = H(l.blockedUserAgents, navigator.userAgent);
        if (x)
          return (
            d.clog(
              "UIC not initializing because User-Agent matches blockedUserAgents list: ",
              x,
            ),
            void (TLT.terminationReason = "blockedUA: " + x)
          );
        ((e = q.getService("ajax")),
          (d.browserBaseService = t = q.getService("browserBase")),
          (d.browserService = n = q.getService("browser")),
          (r = q.getService("domCapture")),
          (i = q.getService("queue")),
          (a = q.getService("serializer")));
        const C = o.getModuleConfig("TLCookie") || {};
        if (
          ((m = C.sessionizationCookieName || "TLTSID"),
          (y = d.getCookieValue("TLTSID")),
          "DND" === y)
        )
          return (
            "destroyed" !== E && q.destroy(!1, "killswitch"),
            void d.clog(
              "Aborting initialization because the killswitch is active.",
            )
          );
        if (
          ((y =
            d.getCookieValue(m) ||
            (function (e) {
              let t, n, o;
              if (!e) return;
              let r = null;
              try {
                r = localStorage.getItem(e);
              } catch {}
              if (null === r && g) {
                const t = window.altStorage.getData(e);
                t && (r = t.replaceAll('"', ""));
              }
              if (r)
                if (
                  ((n = r.split("|")), (t = parseInt(n[0], 10)), Date.now() > t)
                ) {
                  try {
                    localStorage.removeItem(e);
                  } catch {}
                  g && window.altStorage.removeItem(e);
                } else o = n[1];
              return o;
            })(m)),
          y || ((m = C.wcxCookieName || "WCXSID"), (y = d.getCookieValue(m))),
          !q._updateModules())
        )
          return void ("destroyed" !== E && q.destroy(!1, "modules init"));
        ((s = q.getModule("dataLayer")),
          o.subscribe && o.subscribe("configupdated", q._reinitConfig),
          (_ = !0),
          (E = "loaded"));
        try {
          "function" == typeof TLFExtensionNotify &&
            TLFExtensionNotify("Initialized");
        } catch (e) {
          d.clog("Call to TLFExtensionNotify failed.", e);
        }
        const L = q.getServiceConfig("queue"),
          O = L.queues || [];
        for (
          (d.isLegacyIE || d.isIE11) && (S = d.getOriginAndPath().origin),
            v = 0;
          v < O.length;
          v += 1
        ) {
          if (S && q.isCrossOrigin(O[v].endpoint, S))
            return (
              d.clog(
                "UIC terminated because IE 9 and below doesn't support cross-origin XHR",
              ),
              q.setAutoFlush(!1),
              void q.destroy(!1, "CORS not supported")
            );
          (!y && C.tlAppKey && B(O[v].endpoint, O[v].killswitchURL, C),
            O[v].checkEndpoint &&
              !L.asyncReqOnUnload &&
              ((L.asyncReqOnUnload = !0),
              d.clog("Pending endpoint check validation..."),
              e.sendRequest({
                oncomplete: function (e) {
                  e.success &&
                    ((L.asyncReqOnUnload = !1),
                    d.clog("Endpoint check passed: ", e),
                    d.clog("UIC will use sync on unload."));
                },
                timeout: O[v].endpointCheckTimeout || 3e3,
                url: O[v].endpoint,
                headers: {
                  "X-PageId": w,
                  "X-Tealeaf-SaaS-AppKey": C.tlAppKey,
                  "X-Tealeaf-EndpointCheck": !0,
                },
                async: !0,
                error: function (e) {
                  e.success ||
                    (d.clog("Endpoint check failed: ", e),
                    d.clog("UIC will use async on unload."),
                    (L.endpointCheckFailed = !0));
                },
              })));
        }
        const k = function (e) {
          const o = {
              type: "load",
              target: window.window,
              srcElement: window.window,
              currentTarget: window.window,
              bubbles: !0,
              cancelBubble: !1,
              cancelable: !0,
              timeStamp: +new Date(),
              customLoad: !0,
            },
            r = new t.WebEvent(o);
          (q._publishEvent(r), e && n.unsubscribe(b, T, k));
        };
        if (
          (l.screenviewLoadEvent
            ? ((b = l.screenviewLoadEvent.name),
              (T = l.screenviewLoadEvent.target || window),
              n.subscribe(b, T, k))
            : k(),
          q.isInitialized() &&
            ((E = "initialized"),
            N(h),
            (u = function (e) {
              ("mousemove" === e.type && (p = !0),
                n.unsubscribe("mousemove", document, u),
                (u = null));
            }),
            n.subscribe("mousemove", document, u, { once: !0 })),
          "function" == typeof R)
        )
          try {
            "function" == typeof f ? f(E) : R(E);
          } catch (e) {
            d.clog("Error in callback.", e);
          }
      }),
      (function () {
        let e,
          t,
          n = null;
        for (n in O)
          if (Object.prototype.hasOwnProperty.call(O, n))
            for (e = 0, t = O[n].length; e < t; e += 1)
              !(function (e, t) {
                q[t] = function () {
                  const n = this.getService(e);
                  if (n) return n[t].apply(n, arguments);
                };
              })(n, O[n][e]);
      })(),
      q
    );
  })()),
  (function () {
    "use strict";
    const e = window.navigator.userAgent.toLowerCase(),
      t = -1 !== e.indexOf("msie") || -1 !== e.indexOf("trident"),
      n = (function () {
        const e = !!window.performance;
        return t && (!e || document.documentMode < 11);
      })(),
      o = t && 11 === document.documentMode,
      r = -1 !== e.indexOf("android"),
      i = /(ipad|iphone|ipod)/.test(e),
      a = -1 !== e.indexOf("opera mini"),
      s = window.self !== window.top,
      l = -1 === e.indexOf("chrome") && -1 !== e.indexOf("safari"),
      c = {
        "a:": "link",
        "button:button": "button",
        "button:submit": "button",
        "input:button": "button",
        "input:checkbox": "checkBox",
        "input:color": "colorPicker",
        "input:date": "datePicker",
        "input:datetime": "datetimePicker",
        "input:datetime-local": "datetime-local",
        "input:email": "emailInput",
        "input:file": "fileInput",
        "input:image": "button",
        "input:month": "month",
        "input:number": "numberPicker",
        "input:password": "textBox",
        "input:radio": "radioButton",
        "input:range": "slider",
        "input:reset": "button",
        "input:search": "searchBox",
        "input:submit": "button",
        "input:tel": "tel",
        "input:text": "textBox",
        "input:time": "timePicker",
        "input:url": "urlBox",
        "input:week": "week",
        "select:": "selectList",
        "select:select-one": "selectList",
        "textarea:": "textBox",
        "textarea:textarea": "textBox",
      },
      u = {
        isIE: t,
        isLegacyIE: n,
        isIE11: o,
        isAndroid: r,
        isLandscapeZeroDegrees: !1,
        isiOS: i,
        isOperaMini: a,
        isSafari: l,
        isInIframe: s,
        getParentOrigin: function () {
          try {
            return document.referrer ? new URL(document.referrer).origin : null;
          } catch (e) {
            return null;
          }
        },
        isUndefOrNull: function (e) {
          return null == e;
        },
        isEmpty: function (e) {
          for (const t in e) if (Object.hasOwn(e, t)) return !1;
          return !0;
        },
        isArray: function (e) {
          return !(
            !e || "[object Array]" !== Object.prototype.toString.call(e)
          );
        },
        getSerialNumber: function () {
          const e = d;
          return ((d += 1), e);
        },
        getRandomString: function (e, t) {
          let n,
            o,
            r = "";
          if (!e) return r;
          for (
            "string" != typeof t && (t = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"),
              n = 0,
              o = t.length;
            n < e;
            n += 1
          )
            r += t.charAt(Math.floor(Math.random() * o));
          return r;
        },
        getValue: function (e, t, n) {
          let o, r;
          if (
            ((n = void 0 === n ? null : n),
            !e || "object" != typeof e || "string" != typeof t)
          )
            return n;
          const i = t.split(".");
          for (o = 0, r = i.length; o < r; o += 1) {
            if (!e || void 0 === e[i[o]]) return n;
            e = e[i[o]];
          }
          return e;
        },
        indexOf: function (e, t) {
          return e && e.indexOf ? e.indexOf(t) : -1;
        },
        forEach: function (e, t, n) {
          let o;
          if (!(e && e.length && t && t.call)) return 0;
          for (o = 0; o < e.length; o += 1) t.call(n, e[o], o, e);
          return 1;
        },
        some: function (e, t) {
          let n,
            o,
            r = !1;
          for (n = 0, o = e.length; n < o; n += 1)
            if (((r = t(e[n], n, e)), r)) return r;
          return r;
        },
        convertToArray: function (e) {
          let t = 0;
          const n = [];
          for (; t < e.length; ) (n.push(e[t]), (t += 1));
          return n;
        },
        mixin: function (e) {
          let t, n, o, r;
          for (o = 1, r = arguments.length; o < r; o += 1)
            for (t in ((n = arguments[o]), n))
              Object.prototype.hasOwnProperty.call(n, t) && (e[t] = n[t]);
          return e;
        },
        extend: function (e, t, n) {
          let o = "";
          for (o in n)
            Object.prototype.hasOwnProperty.call(n, o) &&
              (e && "[object Object]" === Object.prototype.toString.call(n[o])
                ? (void 0 === t[o] && (t[o] = {}), this.extend(e, t[o], n[o]))
                : (t[o] = n[o]));
          return t;
        },
        clone: function (e) {
          let t, n;
          if (null === e || "object" != typeof e) return e;
          if (e instanceof Object) {
            for (n in ((t =
              "[object Array]" === Object.prototype.toString.call(e) ? [] : {}),
            e))
              Object.prototype.hasOwnProperty.call(e, n) &&
                (t[n] = this.clone(e[n]));
            return t;
          }
        },
        parseVersion: function (e) {
          let t,
            n,
            o = [];
          if (!e || !e.length) return o;
          for (o = e.split("."), t = 0, n = o.length; t < n; t += 1)
            o[t] = /^\d+$/.test(o[t]) ? parseInt(o[t], 10) : o[t];
          return o;
        },
        isEqual: function (e, t) {
          let n, o, r, i, a;
          if (e === t) return !0;
          if (typeof e != typeof t) return !1;
          if (e instanceof Object && t instanceof Object) {
            if (
              "[object Array]" === Object.prototype.toString.call(e) &&
              "[object Array]" === Object.prototype.toString.call(t)
            ) {
              if (e.length !== t.length) return !1;
              for (n = 0, a = e.length; n < a; n += 1)
                if (!this.isEqual(e[n], t[n])) return !1;
              return !0;
            }
            if (
              "[object Object]" === Object.prototype.toString.call(e) &&
              "[object Object]" === Object.prototype.toString.call(t)
            ) {
              for (n = 0; n < 2; n += 1) {
                for (r in e)
                  if (Object.prototype.hasOwnProperty.call(e, r)) {
                    if (!Object.prototype.hasOwnProperty.call(t, r)) return !1;
                    if (((o = this.isEqual(e[r], t[r])), !o)) return !1;
                  }
                ((i = e), (e = t), (t = i));
              }
              return !0;
            }
          }
          return !1;
        },
        calculateRelativeXY: function (e) {
          if (
            u.isUndefOrNull(e) ||
            u.isUndefOrNull(e.x) ||
            u.isUndefOrNull(e.y) ||
            u.isUndefOrNull(e.width) ||
            u.isUndefOrNull(e.height)
          )
            return "0.5,0.5";
          let t = Math.abs(e.x / e.width).toFixed(4),
            n = Math.abs(e.y / e.height).toFixed(4);
          return (
            (t > 1 || t < 0) && (t = 0.5),
            (n > 1 || n < 0) && (n = 0.5),
            t + "," + n
          );
        },
        createObject: (function () {
          let e = null,
            t = null;
          return (
            "function" == typeof Object.create
              ? (e = Object.create)
              : ((t = function () {}),
                (e = function (e) {
                  if ("object" != typeof e && "function" != typeof e)
                    throw new TypeError(
                      "Object prototype need to be an object!",
                    );
                  return ((t.prototype = e), new t());
                })),
            e
          );
        })(),
        access: function (e, t) {
          let n,
            o = t || window;
          if ("string" != typeof e || "object" != typeof o) return;
          const r = e.split("."),
            i = r.length;
          for (n = 0; n < i; n += 1)
            if (0 !== n || "window" !== r[n]) {
              if (!Object.prototype.hasOwnProperty.call(o, r[n])) return;
              if (((o = o[r[n]]), n < i - 1 && !(o instanceof Object))) return;
            }
          return o;
        },
        isNumeric: function (e) {
          let t = !1;
          return (
            u.isUndefOrNull(e) || !/\S/.test(e) || (t = !isNaN(2 * e)),
            t
          );
        },
        isUpperCase: function (e) {
          return e === e.toUpperCase() && e !== e.toLowerCase();
        },
        isLowerCase: function (e) {
          return e === e.toLowerCase() && e !== e.toUpperCase();
        },
        extractResponseHeaders: function (e) {
          let t,
            n = null;
          const o = {},
            r = (e = e && e.length ? e.split("\n") : []).length;
          for (t = 0; t < r; t += 1)
            ((n = e[t].split(": ")), 2 === n.length && (o[n[0]] = n[1]));
          return o;
        },
        getTargetState: function (e) {
          let t = null,
            n = null,
            o = null,
            r = "";
          const i = this.getTagName(e);
          let a =
            {
              a: ["innerText", "href"],
              input: {
                range: ["maxValue:max", "value"],
                checkbox: ["value", "checked"],
                radio: ["value", "checked"],
                image: ["src"],
              },
              select: ["value"],
              button: ["value", "innerText"],
              textarea: ["value"],
            }[i] || null;
          if (null !== a)
            for (r in ("[object Object]" ===
              Object.prototype.toString.call(a) && (a = a[e.type] || ["value"]),
            (n = {}),
            a))
              Object.prototype.hasOwnProperty.call(a, r) &&
                (-1 !== a[r].indexOf(":")
                  ? ((o = a[r].split(":")), (n[o[0]] = e[o[1]]))
                  : "innerText" === a[r]
                    ? (n[a[r]] = this.trim(e.innerText || e.textContent))
                    : (n[a[r]] = e[a[r]]));
          return (
            "select" === i &&
              e.options &&
              !isNaN(e.selectedIndex) &&
              ((n = n || {}),
              (n.index = e.selectedIndex),
              n.index >= 0 &&
                n.index < e.options.length &&
                ((t = e.options[e.selectedIndex]),
                (n.value =
                  t.getAttribute("value") ||
                  t.getAttribute("label") ||
                  t.text ||
                  t.innerText),
                (n.text = t.text || t.innerText))),
            n && e.disabled && (n.disabled = !0),
            n
          );
        },
        getDocument: function (e) {
          let t = e;
          return (
            e &&
              9 !== e.nodeType &&
              (t = e.getRootNode
                ? e.getRootNode()
                : e.ownerDocument || e.document),
            t
          );
        },
        getWindow: function (e) {
          try {
            if (e.self !== e) {
              const t = u.getDocument(e);
              return u.isUndefOrNull(t.defaultView)
                ? t.parentWindow
                : t.defaultView;
            }
          } catch (t) {
            e = null;
          }
          return e;
        },
        getOriginAndPath: function (e) {
          let t,
            n,
            o,
            r,
            i,
            a,
            s = [];
          const l = {},
            c = {};
          ((e = e || window.location).origin
            ? (l.origin = e.origin)
            : (l.origin = (e.protocol || "") + "//" + (e.host || "")),
            (l.path = (e.pathname || "").split(";", 1)[0]),
            (l.origin.indexOf("file://") > -1 || (u.isiOS && window.Ionic)) &&
              ((t = l.path.match(/(.*)(\/.*app.*)/)),
              null !== t && ((l.path = t[2]), (l.origin = "file://"))));
          const d = e.search || "";
          try {
            ((n = new URLSearchParams(d)),
              n.forEach(function (e, t) {
                c[t] = e;
              }));
          } catch (e) {
            for (
              d.length > 1 &&
                "?" === d.charAt(0) &&
                (s = decodeURIComponent(d).substring(1).split("&")),
                i = 0;
              i < s.length;
              i += 1
            )
              ((a = s[i].indexOf("=")),
                a > -1 &&
                  ((o = s[i].substring(0, a)),
                  (r = s[i].substring(a + 1)),
                  (c[o] = r)));
          }
          return ((l.queryParams = c), l);
        },
        getIFrameWindow: function (e) {
          let t = null;
          if (!e) return t;
          try {
            t =
              e.contentWindow ||
              (e.contentDocument ? e.contentDocument.parentWindow : null);
          } catch (e) {}
          return t;
        },
        getTagName: function (e) {
          let t = "";
          return (
            u.isUndefOrNull(e) ||
              (t =
                e == document || 9 === e.nodeType
                  ? "document"
                  : e == window || e == window.window
                    ? "window"
                    : "string" == typeof e
                      ? e.toLowerCase()
                      : (e.tagName || e.nodeName || "").toLowerCase()),
            t
          );
        },
        getTlType: function (e) {
          let t,
            n = "";
          if (u.isUndefOrNull(e) || !e.type) return n;
          const o = e.type.toLowerCase();
          return (
            (t = o + ":"),
            e.subType && (t += e.subType.toLowerCase()),
            (n = c[t] || o),
            n
          );
        },
        isIFrameDescendant: function (e) {
          const t = u.getWindow(e);
          return !!t && t != TLT._getLocalTop();
        },
        getOrientationMode: function (e) {
          let t = "INVALID";
          if ("number" != typeof e) return t;
          switch (e) {
            case 0:
            case 180:
            case 360:
              t = "PORTRAIT";
              break;
            case 90:
            case -90:
            case 270:
              t = "LANDSCAPE";
              break;
            default:
              t = "UNKNOWN";
          }
          return t;
        },
        getOrientationAngle: function () {
          if ("number" == typeof window.orientation) return window.orientation;
          let e = (screen.orientation || {}).angle;
          if ("number" != typeof e)
            switch (screen.mozOrientation || screen.msOrientation) {
              case "landscape-primary":
              case "landscape-secondary":
                e = 90;
                break;
              default:
                e = 0;
            }
          return e;
        },
        clog: (function (e) {
          if (
            "object" == typeof e.console &&
            "function" == typeof e.console.log &&
            "function" == typeof e.console.log.apply
          ) {
            const t = e.console;
            return function () {
              t.log.apply(t, arguments);
            };
          }
          return function () {};
        })(window),
        trim: function (e) {
          return e && e.toString
            ? e.trim
              ? e.trim()
              : e.toString().replace(/^\s+|\s+$/g, "")
            : e;
        },
        ltrim: function (e) {
          return e && e.toString
            ? e.trimStart
              ? e.trimStart()
              : e.toString().replace(/^\s+/, "")
            : e;
        },
        rtrim: function (e) {
          return e && e.toString
            ? e.trimEnd
              ? e.trimEnd()
              : e.toString().replace(/\s+$/, "")
            : e;
        },
        setCookie: function (e, t, n, o, r, i, a) {
          let s,
            l,
            c,
            u = "";
          "None" === a ? (i = !0) : "Lax" !== a && (a = "Strict");
          const d = ";SameSite=" + a,
            f = i ? ";Secure" : "";
          if (!e) return;
          ((e = encodeURIComponent(e)), (t = encodeURIComponent(t)));
          const p = (r || location.hostname).split("."),
            h = ";Path=" + (o || "/");
          for (
            "number" == typeof n &&
              (this.isIE
                ? ((c = new Date()),
                  c.setTime(c.getTime() + 1e3 * n),
                  (u = ";Expires=" + c.toUTCString()))
                : (u = ";Max-Age=" + n)),
              l = p.length,
              s = 1 === l ? 1 : 2;
            s <= l &&
            ((document.cookie =
              e + "=" + t + ";Domain=" + p.slice(-s).join(".") + h + u + f + d),
            this.getCookieValue(e) !== t);
            s += 1
          )
            1 === l && (document.cookie = e + "=" + t + h + u + f + d);
        },
        getCookieValue: function (e, t) {
          let n,
            o,
            r,
            i,
            a,
            s = null;
          try {
            if (((t = t || document.cookie), !e || !e.toString)) return null;
            for (
              a = (e += "=").length, i = t.split(";"), n = 0, o = i.length;
              n < o;
              n += 1
            )
              if (((r = i[n]), (r = u.ltrim(r)), 0 === r.indexOf(e))) {
                s = r.substring(a, r.length);
                break;
              }
          } catch (e) {
            s = null;
          }
          return s;
        },
        getQueryStringValue: function (e, t, n) {
          let o,
            r,
            i,
            a,
            s = null;
          try {
            if (
              ((i = (n = n || window.location.search).length),
              !e || !e.toString || !i)
            )
              return null;
            ((n = (t = t || "&") + n.substring(1)),
              (e = t + e + "="),
              (o = n.indexOf(e)),
              -1 !== o &&
                ((a = o + e.length),
                (r = n.indexOf(t, a)),
                -1 === r && (r = i),
                (s = decodeURIComponent(n.substring(a, r)))));
          } catch (e) {}
          return s;
        },
        addEventListener: window.addEventListener
          ? function (e, t, n) {
              e.addEventListener(t, n, !1);
            }
          : function (e, t, n) {
              e.attachEvent("on" + t, n);
            },
        matchTarget: function (e, t) {
          let n,
            o,
            r,
            i,
            a,
            s,
            l,
            c,
            u = -1,
            d = document;
          if (!e || !t) return u;
          for (
            (this.browserService && this.browserBaseService) ||
              ((this.browserService = TLT.getService("browser")),
              (this.browserBaseService = TLT.getService("browserBase"))),
              -2 === t.idType &&
                ((r = this.browserBaseService.getNodeFromID(t.id, t.idType)),
                (d = this.getDocument(r))),
              n = 0,
              l = e.length;
            n < l && -1 === u;
            n += 1
          )
            if (((c = e[n]), "string" == typeof c)) {
              for (
                i = this.browserService.queryAll(c, d),
                  o = 0,
                  a = i ? i.length : 0;
                o < a;
                o += 1
              )
                if (
                  i[o] &&
                  ((s = this.browserBaseService.ElementData.prototype.examineID(
                    i[o],
                  )),
                  s.idType === t.idType && s.id === t.id)
                ) {
                  u = n;
                  break;
                }
            } else if (
              c &&
              c.id &&
              c.idType &&
              t.idType &&
              t.idType.toString() === c.idType.toString()
            )
              switch (typeof c.id) {
                case "string":
                  c.id === t.id && (u = n);
                  break;
                case "object":
                  (c.cRegex || (c.cRegex = new RegExp(c.id.regex, c.id.flags)),
                    (c.cRegex.lastIndex = 0),
                    c.cRegex.test(t.id) && (u = n));
              }
          return u;
        },
        applyPrivacyPatterns: function (e, t) {
          let n, o, r;
          if (!e) return "";
          if ("number" == typeof e) return e;
          const i = Date.now();
          for (n = 0, o = (t = t || []).length; n < o; n += 1)
            ((r = t[n]),
              (r.cRegex.lastIndex = 0),
              (e = e.replace(r.cRegex, r.replacement)));
          const a = Date.now() - i;
          return (
            a > 50 &&
              u.clog(
                "WARNING: Applying privacy patterns on text length " +
                  e.length +
                  " took " +
                  a +
                  "ms.",
              ),
            e
          );
        },
        WeakMap: (function () {
          function e(e, t) {
            let n, o;
            for (n = 0, o = (e = e || []).length; n < o; n += 1)
              if (e[n][0] === t) return n;
            return -1;
          }
          return function () {
            let t = [];
            ((this.set = function (n, o) {
              const r = e(t, n);
              t[r > -1 ? r : t.length] = [n, o];
            }),
              (this.get = function (n) {
                const o = t[e(t, n)];
                return o ? o[1] : void 0;
              }),
              (this.clear = function () {
                t = [];
              }),
              (this.has = function (n) {
                return e(t, n) >= 0;
              }),
              (this.remove = function (n) {
                const o = e(t, n);
                o >= 0 && t.splice(o, 1);
              }),
              (this.delete = this.remove));
          };
        })(),
      };
    let d = 1;
    (("undefined" != typeof TLT && TLT) || (window.TLT = {}), (TLT.utils = u));
  })(),
  (function () {
    "use strict";
    ((TLT.EventTarget = function () {
      this._handlers = {};
    }),
      (TLT.EventTarget.prototype = {
        constructor: TLT.EventTarget,
        publish: function (e, t) {
          let n = 0,
            o = 0;
          const r = this._handlers[e],
            i = { type: e, data: t };
          if (void 0 !== r) for (o = r.length; n < o; n += 1) r[n](i);
        },
        subscribe: function (e, t) {
          if (
            (Object.prototype.hasOwnProperty.call(this._handlers, e) ||
              (this._handlers[e] = []),
            "function" != typeof t)
          )
            throw new Error("Event handler for '" + e + "' isn't a function.");
          this._handlers[e].push(t);
        },
        unsubscribe: function (e, t) {
          let n = 0,
            o = 0;
          const r = this._handlers[e];
          if (r)
            for (o = r.length; n < o; n += 1)
              if (r[n] === t) return void r.splice(n, 1);
        },
      }));
  })(),
  (TLT.ModuleContext = (function () {
    "use strict";
    const e = [
      "broadcast",
      "getConfig:getModuleConfig",
      "listen",
      "post",
      "getXPathFromNode",
      "performDOMCapture",
      "performFormCompletion",
      "isInitialized",
      "getStartTime",
      "normalizeUrl",
      "getCurrentOffset",
      "getTabId",
      "setSessionCookieInfo",
    ];
    return function (t, n) {
      let o,
        r,
        i = null,
        a = null,
        s = null;
      const l = {};
      for (o = 0, r = e.length; o < r; o += 1)
        ((i = e[o].split(":")),
          i.length > 1 ? ((s = i[0]), (a = i[1])) : ((s = i[0]), (a = i[0])),
          (l[s] = (function (e) {
            return function () {
              const o = n.utils.convertToArray(arguments);
              if ((o.unshift(t), !Object.prototype.hasOwnProperty.call(n, e)))
                throw new Error(
                  "Attempting to access method '" +
                    e +
                    "' on TLT, but it doesn't exist. There's a misconfigured passthru method.",
                );
              return n[e].apply(n, o);
            };
          })(a)));
      return ((l.utils = n.utils), l);
    };
  })()),
  TLT.addService("config", function (e) {
    "use strict";
    function t(t, n) {
      (e.utils.extend(!0, t, n), o.publish("configupdated", o.getConfig()));
    }
    let n = { core: {}, modules: {}, services: {} },
      o = e.utils.extend(!1, e.utils.createObject(new TLT.EventTarget()), {
        getConfig: function () {
          return n;
        },
        getDefaultConfig: function () {
          function e(e, t) {
            let n;
            if (t.length > 0) return ((n = e.replace(t, "xxxxxx")), n);
          }
          const t = {
            core: {
              buildNote:
                "Acoustic Tealeaf UIC " + window.TLT.getLibraryVersion(),
              blockedElements: [],
              ieExcludedLinks: [
                'a[href*="javascript:void"]',
                "input[onclick*='javascript:']",
              ],
              blockedUserAgents: [
                {
                  regex:
                    "(Google|Bing|Face|DuckDuck|Yandex|Exa)bot|spider|archiver",
                  flags: "i",
                },
                "PhantomJS",
              ],
              inactivityTimeout: 174e4,
              frames: {
                enableCrossDomainCommunication: !1,
                eventProducer: { producerId: "" },
                eventConsumer: { childFrameHostnameWhitelist: [] },
              },
              modules: {
                replay: {
                  events: [
                    { name: "change", attachToShadows: !0, recurseFrames: !0 },
                    { name: "click", recurseFrames: !0 },
                    { name: "dblclick", recurseFrames: !0 },
                    { name: "contextmenu", recurseFrames: !0 },
                    { name: "pointerdown", recurseFrames: !0 },
                    { name: "pointerup", recurseFrames: !0 },
                    { name: "hashchange", target: window },
                    { name: "focus", recurseFrames: !0 },
                    { name: "blur", recurseFrames: !0 },
                    { name: "load", target: window },
                    { name: "pagehide", target: window },
                    { name: "resize", target: window },
                    { name: "scroll", target: window },
                    { name: "mousemove", recurseFrames: !0 },
                    { name: "orientationchange", target: window },
                    { name: "touchend" },
                    { name: "touchstart" },
                    { name: "error", target: window },
                    { name: "visibilitychange" },
                  ],
                },
                flushQueue: { events: [] },
                overstat: {
                  enabled: !0,
                  events: [
                    { name: "click", recurseFrames: !0 },
                    { name: "mousemove", recurseFrames: !0 },
                    { name: "mouseout", recurseFrames: !0 },
                    { name: "submit", recurseFrames: !0 },
                  ],
                },
                performance: {
                  enabled: !0,
                  events: [
                    { name: "load", target: window },
                    { name: "pagehide", target: window },
                  ],
                },
                ajaxListener: {
                  enabled: !0,
                  events: [
                    { name: "load", target: window },
                    { name: "pagehide", target: window },
                  ],
                },
                gestures: {
                  enabled: !0,
                  events: [
                    { name: "tap", target: window },
                    { name: "hold", target: window },
                    { name: "drag", target: window },
                    { name: "release", target: window },
                    { name: "pinch", target: window },
                  ],
                },
                dataLayer: {
                  enabled: !1,
                  events: [
                    { name: "load", target: window },
                    { name: "pagehide", target: window },
                  ],
                },
                TLCookie: { enabled: !0 },
              },
              screenviewAutoDetect: !0,
              framesBlacklist: [],
            },
            services: {
              queue: {
                asyncReqOnUnload: !0,
                useBeacon: !0,
                useFetch: !0,
                xhrEnabled: !0,
                queues: [
                  {
                    qid: "DEFAULT",
                    endpoint: "",
                    maxEvents: 30,
                    timerInterval: 6e4,
                    maxSize: 3e5,
                    checkEndpoint: !0,
                    endpointCheckTimeout: 4e3,
                    encoder: "gzip",
                  },
                ],
              },
              message: {
                privacy: [
                  { targets: ["input[type=password]"], maskType: 2 },
                  {
                    targets: ["input[id*=phone]", "input[name*=phone]"],
                    maskType: 4,
                    maskFunction: function (e) {
                      return e.slice(0, -3).replace(/\d/g, "X") + e.slice(-3);
                    },
                  },
                  {
                    exclude: !0,
                    targets: [
                      "input[type=hidden]",
                      "input[type=radio]",
                      "input[type=checkbox]",
                      "input[type=submit]",
                      "input[type=button]",
                      "input[type=search]",
                    ],
                    maskType: 4,
                    maskFunction: function (e) {
                      return e.replace(/[a-z]/gi, "X").replace(/\d/g, "9");
                    },
                  },
                ],
                privacyPatterns: [
                  {
                    pattern: { regex: "\\d{3}-\\d{2}-\\d{4}", flags: "g" },
                    replacement: "XXX-XX-XXXX",
                  },
                  {
                    pattern: {
                      regex: "<div[^<]*tlPrivate[^<]*>(.+?)</div>",
                      flags: "g",
                    },
                    replacement: function (e, t) {
                      let n;
                      if (t.length > 0)
                        return ((n = e.replace(t, "xxxxxx")), n);
                    },
                  },
                  {
                    pattern: {
                      regex: "<span[^<]*tlPrivate[^<]*>(.+?)</span>",
                      flags: "g",
                    },
                    replacement: e,
                  },
                  {
                    pattern: {
                      regex: "<p[^<]*tlPrivate[^<]*>(.+?)</p>",
                      flags: "g",
                    },
                    replacement: e,
                  },
                ],
              },
              encoder: {
                gzip: { encode: "window.pako.gzip", defaultEncoding: "gzip" },
              },
              domCapture: {
                diffEnabled: !0,
                options: {
                  maxLength: 1e7,
                  captureShadowDOM: !0,
                  captureDynamicStyles: !0,
                  captureFrames: !0,
                  debugVoidElementsEnabled: !1,
                  debugVoidElementsTimer: 1e4,
                },
              },
              browser: { normalizeTargetToParentLink: !0 },
            },
            modules: {
              overstat: { hoverThreshold: 3e3 },
              performance: {
                calculateRenderTime: !0,
                renderTimeThreshold: 6e5,
                performanceAlert: {
                  enabled: !0,
                  threshold: 3e3,
                  maxAlerts: 100,
                  blacklist: [],
                },
              },
              replay: {
                tab: !1,
                domCapture: {
                  enabled: !0,
                  screenviewBlacklist: [],
                  triggers: [
                    { event: "change" },
                    { event: "click" },
                    { event: "dblclick" },
                    { event: "contextmenu" },
                    { event: "visibilitychange" },
                    { event: "load", fullDOMCapture: !0, delay: 300 },
                  ],
                },
                mousemove: { enabled: !0, sampleRate: 200, ignoreRadius: 3 },
              },
              ajaxListener: {
                urlBlocklist: [{ regex: "brilliantcollector\\.com" }],
                filters: [
                  {
                    log: {
                      requestHeaders: !0,
                      requestData: !1,
                      responseHeaders: !0,
                      responseData: !1,
                    },
                  },
                ],
              },
              dataLayer: {
                dataObjects: [
                  {
                    dataObject: "window.dataLayer",
                    rules: {
                      screenviewBlocklist: [],
                      propertyBlocklist: [],
                      permittedProperties: [],
                      includeEverything: !0,
                    },
                  },
                ],
              },
              TLCookie: {
                appCookieWhitelist: [{ regex: ".*" }],
                tlAppKey: "",
                disableTLTDID: !1,
              },
            },
          };
          return (
            (window.TLT.utils.isiOS || window.TLT.utils.isAndroid) &&
              ((t.services.queue.queues[0].maxEvents = 10),
              (t.services.queue.queues[0].maxSize = 1e4),
              (t.services.queue.queues[0].timerInterval = 1e4),
              (t.services.queue.queues[0].endpointCheckTimeout = 1e4),
              window.TLT.utils.isiOS &&
                (t.core.modules.flushQueue && t.core.modules.flushQueue.events
                  ? t.core.modules.flushQueue.events.push({
                      name: "visibilitychange",
                    })
                  : console.log("Cannot set flushQueue events"))),
            t
          );
        },
        updateConfig: function (e) {
          t(n, e);
        },
        getCoreConfig: function () {
          return n.core;
        },
        updateCoreConfig: function (e) {
          t(n.core, e);
        },
        getServiceConfig: function (e) {
          return n.services[e] || {};
        },
        updateServiceConfig: function (e, o) {
          (void 0 === n.services[e] && (n.services[e] = {}),
            t(n.services[e], o));
        },
        getModuleConfig: function (e) {
          return n.modules[e] || {};
        },
        updateModuleConfig: function (e, o) {
          (void 0 === n.modules[e] && (n.modules[e] = {}), t(n.modules[e], o));
        },
        destroy: function () {
          n = { core: {}, modules: {}, services: {} };
        },
      });
    return o;
  }),
  TLT.addService("queue", function (e) {
    "use strict";
    const t = e.utils;
    let n = null,
      o = {},
      r = 6e5;
    const i = e.getService("ajax"),
      a = e.getService("browser"),
      s = e.getService("encoder"),
      l = e.getService("serializer"),
      c = e.getService("config"),
      u = e.getService("message");
    let d = null,
      f = {},
      p = !0,
      h = !0;
    const g = { 5: { limit: 300, count: 0 }, 6: { limit: 400, count: 0 } },
      m = [];
    let y = !0,
      v = !1,
      w = !0,
      b = !0,
      T = !1;
    const S = (function () {
      let n = {};
      function r(e) {
        return void 0 !== n[e];
      }
      function i(e) {
        return r(e) ? n[e] : null;
      }
      function a(e) {
        const t = i(e);
        null !== t && (t.data = []);
      }
      function s(e, t) {
        if (e) {
          let n;
          try {
            n = l.parse(e);
          } catch {
            n = e;
          }
          return (
            Array.isArray(n)
              ? n.unshift([t])
              : "string" == typeof n && (n = [[t], [n]]),
            l.serialize(n)
          );
        }
        return e;
      }
      function c(e, t) {
        const n = l.parse(e);
        (delete n.count,
          delete n.offset,
          delete n.screenviewOffset,
          delete n.focusInOffset,
          (n.frameId = t));
        const o = s(n && n.target && n.target.id ? n.target.id : null, t);
        if (
          (o &&
            ((n.target.id = o), delete n.target.xPath, (n.target.idType = -2)),
          12 === n.type)
        ) {
          const e =
            n && n.domCapture && n.domCapture.diffs ? n.domCapture.diffs : null;
          e &&
            e.length &&
            e.forEach((e) => {
              const n = s(e && e.xpath ? e.xpath : null, t);
              n && (e.xpath = n);
            });
          const o =
            n && n.domCapture && n.domCapture.shadows
              ? n.domCapture.shadows
              : null;
          o &&
            o.length &&
            o.forEach((e) => {
              const n = s(e && e.xpath ? e.xpath : null, t);
              n && (e.xpath = n);
            });
        } else if (18 === n.type) {
          const e =
            n && n.mousemove && n.mousemove.elements
              ? n.mousemove.elements
              : null;
          e &&
            e.length &&
            e.forEach((e) => {
              const n = s(e && e.id ? e.id : null, t);
              n && ((e.id = n), (e.idType = -2));
            });
        } else if (11 === n.type) {
          const e = n.touches;
          e &&
            e.length &&
            e.forEach((e) => {
              e.forEach((e) => {
                const n = s(
                  e && e.control && e.control.id ? e.control.id : null,
                  t,
                );
                n && (e.control.id = n);
              });
            });
        }
        return n;
      }
      return {
        exists: r,
        add: function (e, t) {
          return (
            r(e) ||
              (n[e] = {
                lastOffset: 0,
                data: [],
                queueId: e,
                url: t.url,
                eventThreshold: t.eventThreshold,
                sizeThreshold: t.sizeThreshold || 0,
                timerInterval: t.timerInterval,
                size: -1,
                serializer: t.serializer,
                encoder: t.encoder,
                crossDomainEnabled: !!t.crossDomainEnabled,
                crossDomainIFrame: t.crossDomainIFrame,
              }),
            n[e]
          );
        },
        remove: function (e) {
          r(e) && delete n[e];
        },
        reset: function () {
          n = {};
        },
        get: i,
        clear: a,
        flush: function (e) {
          let t = null;
          return (r(e) && ((t = i(e).data), a(e)), t);
        },
        push: function (n, a) {
          let s = null,
            u = null;
          const d = window.tlBridge,
            f = window.iOSJSONShuttle;
          try {
            u = l.serialize(a);
          } catch (e) {
            ((u =
              "Serialization failed: " +
              (e.name ? e.name + " - " : "") +
              e.message),
              (a = { error: u }));
          }
          if (void 0 !== d && "function" == typeof d.addMessage)
            (t.clog("Added to Android bridge: ", a), d.addMessage(u));
          else if (void 0 !== f && "function" == typeof f)
            (t.clog("Added to iOS bridge: ", a), f(u));
          else if (
            o &&
            o.frames &&
            o.frames.enableCrossDomainCommunication &&
            t.isInIframe
          )
            !(function (e) {
              const n =
                o &&
                o.frames &&
                o.frames.eventProducer &&
                o.frames.eventProducer.producerId
                  ? o.frames.eventProducer.producerId
                  : null;
              try {
                const o = { data: c(e, n), producerId: n };
                (t.clog(`Post message send from frame ${n}`, o),
                  window.top.postMessage(o, "*"));
              } catch (o) {
                t.clog(
                  `Failed to parse data for post message for frame ${n}`,
                  e,
                  o,
                );
              }
            })(u);
          else if (r(n))
            return (
              (s = i(n)),
              "undefined" != typeof console &&
                console.log("Added to queueId: ", n, " data: ", a),
              s.data.push(a),
              (s.data = e.redirectQueue(s.data)),
              s.sizeThreshold &&
                ((u = l.serialize(s.data)), (s.size = u.length)),
              s.data.length
            );
          return 0;
        },
      };
    })();
    function x(e) {
      const n = e.origin,
        r =
          o &&
          o.frames &&
          o.frames.eventConsumer &&
          o.frames.eventConsumer.childFrameHostnameWhitelist
            ? o.frames.eventConsumer.childFrameHostnameWhitelist
            : null,
        i = !(!n || !r) && r.includes(new URL(n).hostname);
      if ((r && !r.length) || i) {
        const n = e.data,
          o = n && n.producerId ? n.producerId : null;
        t.clog(`Post message received from frame ${o}`, n);
        const r = n && n.data ? n.data : null;
        if (o && r) {
          if (
            (!!(12 === r.type && r && r.domCapture && r.domCapture.fullDOM) &&
              r.domCapture.fullDOM) ||
            1 === r.type ||
            2 === r.type ||
            14 === r.type
          )
            return void t.clog(
              `Skip processing same full dom capture post message or type 1,2 or 14 for frame id ${o}`,
            );
          (t.clog(`Add post message data to queue for frame ${o}`, r),
            TLT.getService("queue").post("", r));
        }
      }
    }
    function _(e) {
      (w && (b = !0),
        e &&
          e.id &&
          t.extend(!0, m[e.id - 1], {
            rspEnd: u.getCurrentOffset(),
            success: e.success,
            statusCode: e.statusCode,
            statusText: e.statusText,
          }),
        t.clog("XHR Result: ", e));
    }
    function E() {
      const n = t.getOriginAndPath(window.location);
      return e.normalizeUrl("", n.path);
    }
    function C(e, t, n, o) {
      const r = S.get(e),
        i = { name: t, value: n };
      let a = null;
      "string" == typeof t &&
        "string" == typeof n &&
        (r.headers || (r.headers = { once: [], always: [] }),
        (a = o ? r.headers.always : r.headers.once),
        a.push(i));
    }
    function L(e, t) {
      let n, o;
      const r = S.get(e).headers;
      let i = null;
      function a(e, t) {
        let n,
          o,
          r = null;
        for (n = 0, o = e.length; n < o; n += 1)
          ((r = e[n]), (t[r.name] = r.value));
      }
      if (((t = t || {}), r))
        for (i = [r.always, r.once], n = 0, o = i.length; n < o; n += 1)
          a(i[n], t);
      return t;
    }
    function O(e) {
      let t = null;
      if (!S.exists(e)) throw new Error("Queue: " + e + " does not exist!");
      const n = S.get(e);
      ((t = n ? n.headers : null), t && (t.once = []));
    }
    function k() {
      let t,
        n,
        o = 0;
      const r = e.provideRequestHeaders();
      if (r && r.length)
        for (t = r.length; o < t; o += 1)
          ((n = r[o]), C("DEFAULT", n.name, n.value, n.recurring));
      return o;
    }
    function I(e) {
      let t,
        n,
        o = "";
      const r = [];
      if (!e || !e.length) return o;
      for (t = 0, n = e.length; t < n; t += 1) r[e[t].type] = !0;
      for (t = 0, n = r.length; t < n; t += 1)
        r[t] && (o && (o += ","), (o += t));
      return o;
    }
    function D(o, a) {
      const c = S.get(o);
      if (!c) return;
      let d = c.url ? S.flush(o) : null;
      const f = d ? d.length : 0,
        p = {
          "Content-Type": "application/json",
          "X-PageId": e.getPageId(),
          "X-Tealeaf": "device (UIC) Lib/6.4.189",
          "X-TealeafType": "GUI",
          "X-TeaLeaf-Page-Url": E(),
          "X-Tealeaf-SyncXHR": (!!a).toString(),
        };
      let h = null;
      const g = u.getCurrentOffset(),
        v = c.serializer || "json",
        w = c.encoder;
      let T, x;
      const C = n.tltWorker,
        D = "unloading" === e.getState(),
        P = t.getOriginAndPath().origin,
        M = e.isCrossOrigin(c.url, P);
      let A,
        R = null;
      if (!f || !c) return;
      const j = g - d[f - 1].offset;
      if (r && j > r + 6e4) t.clog("UIC self-terminated due to inactivity(1).");
      else {
        if (
          ((b = !1),
          (c.lastOffset = d[f - 1].offset),
          (p["X-Tealeaf-MessageTypes"] = I(d)),
          (d = u.wrapMessages(d)),
          (h = d.serialNumber),
          (m[h - 1] = { serialNumber: h, reqStart: g }),
          y && (d.log = { requests: m }),
          n.endpointCheckFailed && (d.log.endpointCheckFailed = !0),
          k(),
          L(o, p),
          !C || a || D)
        )
          if (
            (v && (d = l.serialize(d, v)),
            w &&
              ((x = s.encode(d, w)),
              x &&
                (x.data &&
                  !x.error &&
                  (x.data instanceof window.ArrayBuffer
                    ? x.data.byteLength < d.length
                      ? ((d = x.data), (p["Content-Encoding"] = x.encoding))
                      : (x.error =
                          w +
                          " encoder did not reduce payload (" +
                          x.data.byteLength +
                          ") compared to original data (" +
                          d.length +
                          ")")
                    : (x.error = "Encoder did not apply " + w + " encoding.")),
                x.error &&
                  e.logExceptionEvent("EncoderError: " + x.error, "UIC", -1))),
            c.crossDomainEnabled)
          ) {
            if (((R = t.getIFrameWindow(c.crossDomainIFrame)), !R))
              return void t.clog("Cannot access xdomain frame window.");
            if (
              ((T = {
                request: { id: h, url: c.url, async: !a, headers: p, data: d },
              }),
              "function" == typeof window.postMessage)
            )
              R.postMessage(T, c.crossDomainIFrame.src);
            else
              try {
                R.sendMessage(T);
              } catch (e) {
                return void t.clog(
                  "Cannot access sendMessage API on xdomain frame window.",
                );
              }
            b = !0;
          } else
            i.sendRequest({
              id: h,
              oncomplete: _,
              url: c.url,
              async: !a,
              isUnloading: D,
              isCrossOrigin: M,
              headers: p,
              data: d,
            });
        else
          ((C.onmessage = function (e) {
            t.clog("Message received from worker thread", e);
            _(e.data);
          }),
            (A = {
              id: h,
              url: c.url,
              headers: p,
              data: d,
              isUnloading: D,
              isCrossOrigin: M,
            }),
            C.postMessage(A),
            t.clog("Message sent to TLT worker from main thread", A));
        O(o);
      }
    }
    function P(e) {
      let t,
        o = null;
      const r = n.queues;
      for (t = 0; t < r.length; t += 1) ((o = r[t]), D(o.qid, e));
      return !0;
    }
    function M(o, i) {
      let a, s, l;
      const c = u.createMessage(i),
        d = S.get(o);
      if (
        ((s = d.data.length),
        s && ((l = c.offset - d.data[s - 1].offset), r && l > r))
      )
        return (
          t.clog("UIC self-terminated due to inactivity(2)."),
          e.setAutoFlush(!1),
          void e.destroy(!1, "inactivity(2)")
        );
      s = S.push(o, c);
      const f = d.size;
      (w && !b) ||
        ((s >= d.eventThreshold || f >= d.sizeThreshold) &&
          p &&
          "unloading" !== e.getState() &&
          ((a = e.getCurrentWebEvent()),
          "click" !== a.type || n.ddfoc
            ? D(o)
            : h &&
              ((h = !1),
              window.setTimeout(function () {
                S.exists(o) && (D(o), (h = !0));
              }, 500))));
    }
    function A(e) {
      let n = !1;
      if (!e || !e.type) return !0;
      const o = g[e.type];
      return (
        o &&
          ((o.count += 1),
          o.count > o.limit &&
            ((n = !0),
            o.count === o.limit + 1 &&
              M("DEFAULT", {
                type: 16,
                dataLimit: { messageType: e.type, maxCount: o.limit },
              }),
            t.clog(
              "WARNING: Message limit (" +
                o.limit +
                ") reached for message type [" +
                e.type +
                "]",
            ))),
        n
      );
    }
    function R(e, t) {
      f[e] = window.setTimeout(function n() {
        (p && (!w || (w && b)) && D(e), (f[e] = window.setTimeout(n, t)));
      }, t);
    }
    function j(e) {
      let t = !1;
      return (
        e && f[e] && (window.clearTimeout(f[e]), delete f[e], (t = !0)),
        t
      );
    }
    function N(e) {}
    function z() {
      (p && P(!n.asyncReqOnUnload),
        c.unsubscribe("configupdated", N),
        (function () {
          let e = 0;
          for (e in f) Object.prototype.hasOwnProperty.call(f, e) && j(e);
          f = {};
        })(),
        S.reset(),
        T && (window.removeEventListener("message", x), (T = !1)),
        (n = null),
        (d = null),
        (v = !1));
    }
    return {
      addHeaderToQueue: C,
      copyHeaders: L,
      clearHeaders: O,
      getExternalRequestHeaders: k,
      getQueueManager: function () {
        return S;
      },
      getAutoFlushing: function () {
        return p;
      },
      getMessageTypes: I,
      isMsgLimitReached: A,
      init: function () {
        var i;
        v
          ? t.clog(
              "Attempt to initialize service which has been already initialized(queueService)",
            )
          : ((i = c.getServiceConfig("queue") || {}),
            (n = i),
            (o = e.getCoreConfig()),
            (r = t.getValue(o, "inactivityTimeout", 6e5)),
            (w = t.getValue(n, "serializePost", !0)),
            t.forEach(n.queues, function (t, n) {
              let o = null;
              ("DEFAULT" === t.qid && (d = t),
                t.crossDomainEnabled &&
                  ((o = a.query(t.crossDomainFrameSelector)),
                  o || e.fail("Cross domain iframe not found")),
                S.add(t.qid, {
                  url: t.endpoint,
                  eventThreshold: t.maxEvents,
                  sizeThreshold: t.maxSize || 0,
                  serializer: t.serializer,
                  encoder: t.encoder,
                  timerInterval: t.timerInterval || 0,
                  crossDomainEnabled: t.crossDomainEnabled || !1,
                  crossDomainIFrame: o,
                }),
                void 0 !== t.timerInterval &&
                  t.timerInterval > 0 &&
                  R(t.qid, t.timerInterval));
            }),
            c.subscribe("configupdated", N),
            (v = !0),
            o &&
              o.frames &&
              o.frames.enableCrossDomainCommunication &&
              !T &&
              (window.addEventListener("message", x), (T = !0)));
      },
      destroy: function () {
        z();
      },
      _getQueue: function (e) {
        return S.get(e).data;
      },
      setAutoFlush: function (e) {
        p = !0 === e;
      },
      flush: function (e) {
        if (((e = e || d.qid), !S.exists(e)))
          throw new Error("Queue: " + e + " does not exist!");
        D(e);
      },
      flushAll: function (e) {
        return P(!!e);
      },
      post: function (o, r, i) {
        e.isInitialized()
          ? ((i =
              i ||
              (function (e) {
                let t,
                  o,
                  r,
                  i,
                  a = null,
                  s = "";
                const l = n.queues;
                for (t = 0, r = l.length; t < r; t += 1)
                  if (((a = l[t]), a && a.modules))
                    for (o = 0, i = a.modules.length; o < i; o += 1)
                      if (((s = a.modules[o]), s === e)) return a.qid;
                return d.qid;
              })(o)),
            S.exists(i)
              ? A(r) || M(i, r)
              : t.clog("Queue: " + i + " does not exist!"))
          : t.clog(
              "Attempt to post by '" + o + "' when UIC is not initialized!",
            );
      },
      resetFlushTimer: function (e) {
        ((e = e || d.qid),
          S.exists(e)
            ? (function (e) {
                let t;
                e &&
                  j(e) &&
                  ((t = S.get(e)), t.timerInterval && R(e, t.timerInterval));
              })(e)
            : t.clog(
                "Attempt to reset timer of a queue [" +
                  e +
                  "] that does not exist!",
              ));
      },
      setXHRLog: function () {
        ((y = !y), t.clog("XHR logging " + (y ? "enabled" : "disabled")));
      },
    };
  }),
  TLT.addService("browserBase", function (e) {
    "use strict";
    let t;
    const n = e.utils,
      o = { optgroup: !0, option: !0, nobr: !0 },
      r = {};
    let i,
      a,
      s,
      l,
      c,
      u,
      d = null,
      f = !1;
    function p() {
      ((i = e.getService("config")),
        (d = e.getService("serializer")),
        (a = i ? i.getServiceConfig("browser") : {}),
        (s = a.blacklist || []),
        (l = a.customid || []),
        (c = n.getValue(a, "normalizeTargetToParentLink", !0)),
        (u = n.getValue(a, "logAttributes", [])));
    }
    function h(e) {
      let t, n, o, r, i;
      const a = {};
      if (!e || !e.hasAttribute) return a;
      for (t = 0, n = u.length, i = 0; t < n && i < 5; t += 1)
        ((o = u[t]),
          e.hasAttribute(o) &&
            ((r = e.getAttribute(o) || ""), (a[o] = r.slice(0, 60)), (i += 1)));
      return a;
    }
    function g(e, t) {
      let n, o, r;
      if (!e) return null;
      if (((r = void 0 !== t ? t : e.id), !r || "string" != typeof r))
        return null;
      for (n = 0, o = s.length; n < o; n += 1)
        if ("string" == typeof s[n]) {
          if (r === s[n]) return null;
        } else if (
          "object" == typeof s[n] &&
          (s[n].cRegex || (s[n].cRegex = new RegExp(s[n].regex, s[n].flags)),
          (s[n].cRegex.lastIndex = 0),
          s[n].cRegex.test(r))
        )
          return null;
      return r;
    }
    function m(e, t) {
      const n = { type: null, subType: null };
      if (!e) return n;
      let o = e.type;
      switch (o) {
        case "focusin":
          o = "focus";
          break;
        case "focusout":
          o = "blur";
      }
      return ((n.type = o), n);
    }
    function y(e) {
      const t = { type: null, subType: null };
      return e
        ? ((t.type = n.getTagName(e)), (t.subType = e.type || null), t)
        : t;
    }
    const v = (function () {
      const t = { nobr: !0 };
      return function (o, r, i, a) {
        let s,
          l,
          c,
          u,
          d = null,
          f = null,
          p = null,
          h = !0,
          m = "",
          y = !1;
        const v = document.documentElement,
          w = [],
          b = e._getLocalTop();
        if (!o || !o.nodeType) return w;
        if (11 === o.nodeType) {
          if (!(o = o.host)) return w;
          y = !0;
        }
        for (; h; )
          if (((h = !1), (m = n.getTagName(o)), "window" !== m))
            if (m && !y && t[m]) ((o = o.parentNode), (h = !0));
            else {
              for (
                l = g(o, a);
                o &&
                (1 === o.nodeType || 9 === o.nodeType) &&
                o != document &&
                (r || !l);
                l = g(o)
              )
                if (((p = o.parentNode), p)) {
                  if (((d = p.firstChild), !d)) {
                    (w.push(["XPath Error(1)"]), (o = null));
                    break;
                  }
                  for (s = 0; d; d = d.nextSibling)
                    if (1 === d.nodeType && n.getTagName(d) === m) {
                      if (d === o) {
                        ((c = [m, s]),
                          y && (c.push("h"), (y = !1)),
                          (w[w.length] = c));
                        break;
                      }
                      s += 1;
                    }
                  (11 === p.nodeType ? ((o = p.host), (y = !0)) : (o = p),
                    (m = n.getTagName(o)));
                } else {
                  if (((f = n.getWindow(o)), !f || i))
                    return ((c = [m, 0]), (w[w.length] = c), w.reverse());
                  if (f === b) return w.reverse();
                  ((o = f.frameElement),
                    (m = n.getTagName(o)),
                    (p = o.parentNode));
                }
              (l &&
                !r &&
                ((c = [l]),
                y && (c.push("h"), (y = !1)),
                (w[w.length] = c),
                n.isIFrameDescendant(o)
                  ? ((h = !0), (o = n.getWindow(o).frameElement))
                  : i ||
                    v.contains(o) ||
                    (o.getRootNode &&
                      ((u = o.getRootNode()),
                      u && ((o = u.host), (y = !0), (h = !0))),
                    h ||
                      n.clog(
                        "Node is neither in the document nor in Shadow DOM, orphaned?",
                        o,
                      ))),
                (a = void 0));
            }
        return w.reverse();
      };
    })();
    function w(e) {
      let t = "null";
      return e && e.length ? ((t = d.serialize(e, "json")), t) : t;
    }
    function b(e, t, n, o) {
      let r;
      const i = v(e, !!t, !!o);
      return ((r = n ? i : w(i)), r);
    }
    function T(e) {
      const t = { left: -1, top: -1 },
        n = (e = e || document).documentElement || e.body.parentNode || e.body;
      return (
        (t.left = Math.round(
          "number" == typeof window.pageXOffset
            ? window.pageXOffset
            : n.scrollLeft,
        )),
        (t.top = Math.round(
          "number" == typeof window.pageYOffset
            ? window.pageYOffset
            : n.scrollTop,
        )),
        t
      );
    }
    function S(e) {
      return (
        e &&
        void 0 !== e.originalEvent &&
        void 0 !== e.isDefaultPrevented &&
        !e.isSimulated
      );
    }
    function x(e) {
      return e
        ? (e.type &&
            0 === e.type.indexOf("touch") &&
            (S(e) && (e = e.originalEvent),
            "touchstart" === e.type
              ? (e = e.touches[e.touches.length - 1])
              : "touchend" === e.type && (e = e.changedTouches[0])),
          e)
        : null;
    }
    function _(e) {
      let t,
        o,
        r,
        i = e || window.event,
        a = !1,
        s = null;
      const l = document.documentElement,
        c = document.body;
      if (
        (S(i) && (i = i.originalEvent),
        (void 0 !== e && void 0 !== i.target) ||
          ((i.target = i.srcElement || window.window),
          (i.timeStamp = Number(new Date())),
          (null !== i.pageX && void 0 !== i.pageX) ||
            ((i.pageX =
              i.clientX +
              ((l && l.scrollLeft) || (c && c.scrollLeft) || 0) -
              ((l && l.clientLeft) || (c && c.clientLeft) || 0)),
            (i.pageY =
              i.clientY +
              ((l && l.scrollTop) || (c && c.scrollTop) || 0) -
              ((l && l.clientTop) || (c && c.clientTop) || 0))),
          (i.preventDefault = function () {
            this.returnValue = !1;
          }),
          (i.stopPropagation = function () {
            this.cancelBubble = !0;
          })),
        "click" === i.type)
      ) {
        for (
          t = i.composedPath ? i.composedPath() : [], r = 0;
          r < t.length;
          r += 1
        )
          if (((o = n.getTagName(t[r])), "button" === o)) {
            ((a = !0), (s = t[r]));
            break;
          }
        if (a)
          return {
            originalEvent: i,
            target: s,
            srcElement: s,
            type: i.type,
            pageX: i.pageX,
            pageY: i.pageY,
          };
      }
      return i;
    }
    function E(e) {
      let t,
        r,
        i,
        a = null;
      if (!e || !e.type) return null;
      if (0 === e.type.indexOf("touch")) a = x(e).target;
      else if ("function" == typeof e.composedPath)
        if (((i = e.composedPath()), i && i.length)) {
          if (((a = i[0]), c))
            for (t = 0, r = i.length; t < r; t += 1)
              if ("a" === n.getTagName(i[t])) {
                a = i[t];
                break;
              }
        } else a = e.target || window.window;
      else a = e.srcElement ? e.srcElement : e.target;
      for (; a && o[n.getTagName(a)] && a.parentElement; ) a = a.parentElement;
      return (
        9 === a.nodeType && a.documentElement && (a = a.documentElement),
        a
      );
    }
    function C(e) {
      let t = 0,
        n = 0;
      const o = document.documentElement,
        r = document.body;
      return (
        (e = x(e)) &&
          (e.pageX || e.pageY
            ? ((t = e.pageX), (n = e.pageY))
            : (e.clientX || e.clientY) &&
              ((t = e.clientX),
              (n = e.clientY),
              o
                ? ((t = e.clientX + o.scrollLeft - o.clientLeft),
                  (n = e.clientY + o.scrollTop - o.clientTop))
                : r &&
                  ((t = e.clientX + r.scrollLeft - r.clientLeft),
                  (n = e.clientY + r.scrollTop - r.clientTop)))),
        { x: t, y: n }
      );
    }
    function L(e, t) {
      ((this.x = Math.round(e || 0)), (this.y = Math.round(t || 0)));
    }
    function O(e, t) {
      ((this.width = Math.round(e || 0)), (this.height = Math.round(t || 0)));
    }
    function k(e, t) {
      const o = E(e),
        r = this.examineID(o),
        i = y(o),
        a = this.examinePosition(e, o),
        s = o && o.getAttribute ? o.getAttribute("aria-label") : null;
      (s && (this.accessibility = { id: s }),
        (this.attributes = h(o)),
        o &&
          o.innerText &&
          (this.attributes.innerText = n.trim(o.innerText).slice(0, 60)),
        (this.element = o),
        (this.id = r.id),
        (this.idType = r.idType),
        (this.type = i.type),
        (this.subType = i.subType),
        (this.state = this.examineState(o)),
        (this.position = new L(a.x, a.y)),
        (this.position.relXY = a.relXY),
        (this.size = new O(a.width, a.height)),
        (this.xPath = r.xPath),
        (this.name = r.name));
    }
    function I() {
      let e,
        t,
        o,
        r = 1;
      if (document.body.getBoundingClientRect) {
        try {
          e = document.body.getBoundingClientRect();
        } catch (e) {
          return (n.clog("getBoundingClientRect failed.", e), r);
        }
        ((t = e.right - e.left),
          (o = document.body.offsetWidth),
          (r = Math.round((t / o) * 100) / 100));
      }
      return r;
    }
    function D(e) {
      let t, o, r;
      if (!e || !e.getBoundingClientRect)
        return { x: 0, y: 0, width: 0, height: 0 };
      try {
        ((t = e.getBoundingClientRect()), (r = T(document)));
      } catch (e) {
        return (
          n.clog("getBoundingClientRect failed.", e),
          { x: 0, y: 0, width: 0, height: 0 }
        );
      }
      const i = {
        x: t.left + r.left,
        y: t.top + r.top,
        width: t.right - t.left,
        height: t.bottom - t.top,
      };
      return (
        n.isIE &&
          ((i.x -= document.documentElement.clientLeft),
          (i.y -= document.documentElement.clientTop),
          (o = I()),
          1 !== o &&
            ((i.x = Math.round(i.x / o)),
            (i.y = Math.round(i.y / o)),
            (i.width = Math.round(i.width / o)),
            (i.height = Math.round(i.height / o)))),
        i
      );
    }
    function P() {
      let e = n.getOrientationAngle();
      return (
        n.isLandscapeZeroDegrees &&
          (180 === Math.abs(e) || 0 === Math.abs(e)
            ? (e = 90)
            : (90 !== Math.abs(e) && 270 !== Math.abs(e)) || (e = 0)),
        e
      );
    }
    function M(t) {
      let n, o, r, i;
      if (t) return t;
      const a = (e.getCoreConfig() || {}).modules;
      for (i in ((t = {}), a))
        if (Object.prototype.hasOwnProperty.call(a, i) && a[i].events)
          for (n = 0, o = a[i].events.length; n < o; n += 1)
            ((r = a[i].events[n]), r.state && (t[r.name] = r.state));
      return t;
    }
    function A(e) {
      let o;
      return ((t = M(t)), t[e.type] && (o = n.getValue(e, t[e.type], null)), o);
    }
    function R(e) {
      ((this.data = e.data || null),
        (this.delegateTarget = e.delegateTarget || null),
        (e.gesture || (e.originalEvent && e.originalEvent.gesture)) &&
          ((this.gesture = e.gesture || e.originalEvent.gesture),
          (this.gesture.idType = new k(
            this.gesture,
            this.gesture.target,
          ).idType)));
      const t = C((e = _(e)));
      ((this.custom = !1),
        (this.nativeEvent = !0 === this.custom ? null : e),
        (this.position = new L(t.x, t.y)),
        (this.target = new k(e, e.target)),
        (this.orientation = P()));
      const n = A(e);
      (n && (this.target.state = n), (this.timestamp = new Date().getTime()));
      const o = m(e, this.target);
      ((this.type = o.type), (this.subType = o.subType));
    }
    function j(e, t, o) {
      let r = [],
        i = [];
      if (!(this instanceof j)) return null;
      if (!e || !e.nodeType)
        return (
          (this.fullXpath = ""),
          (this.xpath = ""),
          (this.fullXpathList = []),
          void (this.xpathList = [])
        );
      (3 === e.nodeType && (e = e.parentElement), (i = v(e, !1, t, o)));
      const a = i[0];
      ((r =
        i.length && (1 === a.length || (2 === a.length && "h" === a[1]))
          ? v(e, !0, t)
          : n.clone(i)),
        (this.xpath = w(i)),
        (this.xpathList = i),
        (this.fullXpath = w(r)),
        (this.fullXpathList = r));
      const s = r[r.length - 1];
      ((this.isShadowHost = !!s && "h" === s[s.length - 1]),
        (this.applyPrefix = function (e) {
          let t;
          if (!(e instanceof j && e.fullXpathList.length)) return;
          const o = e.fullXpathList[e.fullXpathList.length - 1];
          ((t = this.fullXpathList.shift()),
            n.isEqual(t[0], o[0])
              ? ((this.fullXpathList = e.fullXpathList.concat(
                  this.fullXpathList,
                )),
                (this.fullXpath = w(this.fullXpathList)),
                (t = this.xpathList.shift()),
                1 !== t.length
                  ? ((this.xpathList = e.xpathList.concat(this.xpathList)),
                    (this.xpath = w(this.xpathList)))
                  : this.xpathList.unshift(t))
              : this.fullXpathList.unshift(t));
        }),
        (this.compare = function (e) {
          return e instanceof j
            ? this.fullXpathList.length - e.fullXpathList.length
            : 0;
        }),
        (this.isSame = function (e) {
          let t = !1;
          return e instanceof j
            ? (0 === this.compare(e) && (t = this.fullXpath === e.fullXpath), t)
            : t;
        }),
        (this.containedIn = function (e, t) {
          let o, r, i, a;
          if (!(e instanceof j)) return !1;
          if (e.fullXpathList.length > this.fullXpathList.length) return !1;
          for (o = 0, i = e.fullXpathList.length; o < i; o += 1)
            if (!n.isEqual(e.fullXpathList[o], this.fullXpathList[o]))
              return !1;
          if (!t)
            for (r = o, i = this.fullXpathList.length; r < i; r += 1)
              if (((a = this.fullXpathList[r]), "h" === a[a.length - 1]))
                return !1;
          return !0;
        }));
    }
    return (
      (r.xpath = function (e, t) {
        let o,
          r,
          i,
          a,
          s,
          l,
          c,
          u = null,
          f = null,
          p = !1;
        if (!e) return null;
        if (((u = d.parse(e)), (o = t = t || document), !u)) return null;
        for (i = 0, l = u.length; i < l && o; i += 1) {
          if (
            ((f = u[i]),
            (p = f.length > 1 && "h" === f[f.length - 1]),
            1 === f.length || (2 === f.length && p))
          )
            o = t.getElementById
              ? t.getElementById(f[0])
              : t.querySelector
                ? t.querySelector("#" + f[0])
                : null;
          else {
            for (a = 0, s = -1, c = o.childNodes.length; a < c; a += 1)
              if (
                1 === o.childNodes[a].nodeType &&
                n.getTagName(o.childNodes[a]) === f[0].toLowerCase() &&
                ((s += 1), s === f[1])
              ) {
                o = o.childNodes[a];
                break;
              }
            if (s !== f[1]) return null;
          }
          if (!o)
            return (
              n.clog("Unable to locate xpath component (" + i + ") " + f[0]),
              null
            );
          if (p && i < l - 1) {
            if (!o.shadowRoot)
              return (
                n.clog(
                  "Host (" +
                    i +
                    ") " +
                    f[0] +
                    " does not have a shadow root or the shadow root is not accessible.",
                ),
                null
              );
            ((o = o.shadowRoot), (t = o));
          }
          ((r = n.getTagName(o)),
            ("frame" === r || "iframe" === r) &&
              i < l - 1 &&
              ((o = n.getIFrameWindow(o).document), (t = o)));
        }
        return o !== t && o ? o : null;
      }),
      (k.HTML_ID = -1),
      (k.XPATH_ID = -2),
      (k.ATTRIBUTE_ID = -3),
      (k.prototype.examineID = function (e, t) {
        const o = { id: "", idType: 0, xPath: "", name: "" };
        let r,
          i,
          a = l.length;
        const s = document.documentElement;
        if (!e) return o;
        ((o.xPath = b(e, !1, !1, t)), (o.name = e.name));
        try {
          if (
            ((i = "function" != typeof s.contains || s.contains(e)),
            (t || i) && (!n.getWindow(e) || !n.isIFrameDescendant(e)))
          )
            if (g(e)) ((o.id = e.id), (o.idType = k.HTML_ID));
            else if (l.length && e.attributes)
              for (; a; )
                ((a -= 1),
                  (r = e.attributes[l[a]]),
                  void 0 !== r &&
                    ((o.id = l[a] + "=" + (r.value || r)),
                    (o.idType = k.ATTRIBUTE_ID)));
        } catch (e) {}
        return (
          o.id ||
            ((o.id = o.xPath), "null" !== o.id && (o.idType = k.XPATH_ID)),
          o
        );
      }),
      (k.prototype.examineState = function (e) {
        return n.getTargetState(e);
      }),
      (k.prototype.examinePosition = function (e, t) {
        const o = C(e),
          r = D(t);
        return (
          (r.x = o.x || o.y ? Math.round(Math.abs(o.x - r.x)) : r.width / 2),
          (r.y = o.x || o.y ? Math.round(Math.abs(o.y - r.y)) : r.height / 2),
          (r.relXY = n.calculateRelativeXY(r)),
          r
        );
      }),
      (j.prototype = {}),
      {
        getAttributesToBeLogged: h,
        normalizeEvent: _,
        normalizeTarget: E,
        getEventDetails: x,
        getEventPosition: C,
        getEventType: m,
        getElementType: y,
        getBoundingClientRectNormalized: D,
        checkId: g,
        getZoomValue: I,
        getDocScrollPosition: T,
        initCustomEventList: M,
        getCustomState: A,
        init: function () {
          f
            ? n.clog(
                "Attempt to initialize service which has been already initialized(browserBaseService)",
              )
            : (p(), i && i.subscribe("configupdated", p), (f = !0));
        },
        destroy: function () {
          (i && i.unsubscribe("configupdated", p), (f = !1));
        },
        WebEvent: R,
        ElementData: k,
        Xpath: j,
        processDOMEvent: function (t) {
          e.isInitialized()
            ? e._publishEvent(new R(t))
            : n.clog(
                "processDOMEvent API invoked when UIC is not initialized!",
              );
        },
        getNormalizedOrientation: P,
        getXPathFromNode: function (e, t, n, o, r) {
          return b(t, n, o, r);
        },
        getNodeFromID: function (e, t, n) {
          const o = "-1",
            i = "-2",
            a = "-3";
          let s,
            l = null;
          if (!e || !t) return l;
          try {
            const c = n || window.document;
            (t = t.toString()) == o
              ? c.getElementById
                ? (l = c.getElementById(e))
                : c.querySelector && (l = c.querySelector("#" + e))
              : t == a
                ? ((s = e.split("=")),
                  c.querySelector &&
                    (l = c.querySelector("[" + s[0] + '="' + s[1] + '"]')))
                : t == i && (l = r.xpath(e, c));
          } catch {}
          return l;
        },
        queryDom: r,
      }
    );
  }),
  TLT.addService("browser", function (e) {
    "use strict";
    const t = e.utils,
      n = e.getService("config"),
      o = e.getService("browserBase");
    let r = null,
      i = null;
    const a = n ? n.getServiceConfig("browser") : {},
      s = t.getValue(a, "useCapture", !0),
      l = t.getValue(a, "usePassive", !0);
    let c = !1;
    const u = "NOQUERYSELECTOR",
      d = {
        list2Array: function (e) {
          const t = e.length,
            n = [];
          if (void 0 === e.length) return [e];
          for (let o = 0; o < t; o += 1) n[o] = e[o];
          return n;
        },
        find: function (e, t, n) {
          return ((n = n || "css"), this.list2Array(this[n](e, t)));
        },
        css: function (e, t) {
          return (t = t || document).querySelectorAll(e);
        },
      },
      f = (function () {
        const n = new t.WeakMap();
        return {
          add: function (r) {
            const i = n.get(r) || [
              ((a = r),
              function (n) {
                e.isInitialized() ||
                  t.clog(n.type + " received but UIC is not initialized.", n);
                const r = new o.WebEvent(n);
                "resize" === n.type || "hashchange" === n.type
                  ? setTimeout(function () {
                      a(r);
                    }, 5)
                  : a(r);
              }),
              0,
            ];
            var a;
            return ((i[1] += 1), n.set(r, i), i[0]);
          },
          find: function (e) {
            const t = n.get(e);
            return t ? t[0] : null;
          },
          remove: function (e) {
            const t = n.get(e);
            t && ((t[1] -= 1), t[1] <= 0 && n.remove(e));
          },
        };
      })();
    function p(e) {
      const n = { capture: s, passive: l };
      return t.isIE ? s : t.mixin(n, e);
    }
    function h() {
      if (
        ((d.xpath = o.queryDom.xpath),
        document.querySelectorAll ||
          e.fail("querySelectorAll does not exist!", u),
        "function" == typeof document.addEventListener)
      )
        ((r = function (e, t, n, o) {
          ((o = p(o)), e.addEventListener(t, n, o));
        }),
          (i = function (e, t, n, o) {
            ((o = p(o)), e.removeEventListener(t, n, o));
          }));
      else {
        if (void 0 === document.attachEvent)
          throw new Error("Unsupported browser");
        ((r = function (e, t, n) {
          e.attachEvent("on" + t, n);
        }),
          (i = function (e, t, n) {
            e.detachEvent("on" + t, n);
          }));
      }
      c = !0;
    }
    return {
      queryDom: d,
      init: function () {
        c
          ? t.clog(
              "Attempt to initialize service (browserService.w3c) which has been already initialized.",
            )
          : h();
      },
      destroy: function () {
        c = !1;
      },
      getServiceName: function () {
        return "W3C";
      },
      query: function (e, t, n) {
        try {
          return d.find(e, t, n)[0] || null;
        } catch (e) {
          return (console.log(e.message), []);
        }
      },
      queryAll: function (e, t, n) {
        try {
          return d.find(e, t, n);
        } catch (e) {
          return (console.log(e.message), []);
        }
      },
      matches: function (e, t) {
        let n = !1;
        try {
          t &&
            e &&
            (t.matches
              ? (n = t.matches(e))
              : t.msMatchesSelector && (n = t.msMatchesSelector(e)));
        } catch (e) {
          console.log(e.message);
        }
        return n;
      },
      subscribe: function (e, t, n, o) {
        const i = f.add(n);
        r(t, e, i, o);
      },
      unsubscribe: function (e, n, o, r) {
        const a = f.find(o);
        if (a) {
          try {
            i(n, e, a, r);
          } catch (n) {
            t.clog("Unsubscribe failed for event: " + e + "\n" + n.message);
          }
          f.remove(o);
        }
      },
    };
  }),
  TLT.addService("ajax", function (e) {
    "use strict";
    const t = e.utils;
    let n,
      o = !1,
      r = !1,
      i = !1;
    function a(e) {
      let t = "";
      const n = [];
      for (t in e)
        Object.prototype.hasOwnProperty.call(e, t) && n.push([t, e[t]]);
      return n;
    }
    function s(e) {
      let t = "",
        n = "?";
      for (t in e)
        Object.prototype.hasOwnProperty.call(e, t) &&
          (n += encodeURIComponent(t) + "=" + encodeURIComponent(e[t]) + "&");
      return n.slice(0, -1);
    }
    function l(e) {
      let o,
        r,
        i = n(),
        s = [["X-Requested-With", "XMLHttpRequest"]],
        l = 0,
        c = "",
        u = null;
      const d = "boolean" != typeof e.async || e.async;
      for (
        e.headers && (s = s.concat(a(e.headers))),
          e.contentType && s.push(["Content-Type", e.contentType]),
          i.open(e.type.toUpperCase(), e.url, d),
          o = 0,
          r = s.length;
        o < r;
        o += 1
      )
        ((c = s[o]), c[0] && c[1] && i.setRequestHeader(c[0], c[1]));
      (e.error &&
        ((e.error = (function (e) {
          if ("function" == typeof e)
            return function (n) {
              let o = !1;
              if (!n) return;
              const r = n.target;
              if (!r) return e(n);
              const i = r.status;
              (i >= 200 && i < 300 && (o = !0),
                e({
                  headers: t.extractResponseHeaders(r.getAllResponseHeaders()),
                  responseText: r.responseText,
                  statusCode: i,
                  statusText: r.statusText,
                  id: r.id,
                  success: o,
                }));
            };
        })(e.error)),
        i.addEventListener("error", e.error)),
        (i.onreadystatechange = u =
          function () {
            4 === i.readyState &&
              ((i.onreadystatechange = u = function () {}),
              e.timeout && window.clearTimeout(l),
              e.oncomplete({
                id: e.id,
                headers: t.extractResponseHeaders(i.getAllResponseHeaders()),
                responseText: i.responseText || null,
                statusCode: i.status,
                statusText: i.statusText,
                success: i.status >= 200 && i.status < 300,
              }),
              (i = null));
          }),
        i.send(e.data || null),
        u(),
        e.timeout &&
          (l = window.setTimeout(function () {
            i &&
              ((i.onreadystatechange = function () {}),
              4 !== i.readyState &&
                (i.abort(),
                "function" == typeof e.error &&
                  e.error({
                    id: e.id,
                    statusCode: i.status,
                    statusText: "timeout",
                    success: !1,
                  })),
              e.oncomplete({
                id: e.id,
                headers: t.extractResponseHeaders(i.getAllResponseHeaders()),
                responseText: i.responseText || null,
                statusCode: i.status,
                statusText: "timeout",
                success: !1,
              }),
              (i = null));
          }, e.timeout)));
    }
    return {
      convertHeadersToArray: a,
      convertHeadersToQuery: s,
      init: function () {
        i ||
          (function () {
            const a = e.getServiceConfig("queue");
            ((n =
              void 0 !== window.XMLHttpRequest
                ? function () {
                    return new XMLHttpRequest();
                  }
                : function () {
                    return new ActiveXObject("Microsoft.XMLHTTP");
                  }),
              a &&
                ((o =
                  t.getValue(a, "useBeacon", !0) &&
                  "function" == typeof navigator.sendBeacon),
                (r =
                  t.getValue(a, "useFetch", !0) &&
                  "function" == typeof window.fetch)),
              (i = !0));
          })();
      },
      destroy: function () {
        i = !1;
      },
      sendRequest: function (e) {
        let t,
          n = !0;
        ((e.type = e.type || "POST"),
          (!e.isUnloading && e.async) ||
            !o ||
            ((n = !1),
            (t = (function (e) {
              let t,
                n = !1;
              const o = s(e.headers);
              return (
                (t =
                  "string" == typeof e.data
                    ? e.data
                    : e.data
                      ? new Uint8Array(e.data)
                      : ""),
                (n = navigator.sendBeacon(e.url + o, t)),
                n
              );
            })(e)),
            t || (n = !0)),
          n &&
            (e.async && r && !e.timeout
              ? (function (e) {
                  const t = e.headers || {},
                    n = e.id || 0,
                    o = {
                      method: e.type,
                      headers: t,
                      body: e.data,
                      mode: e.isCrossOrigin ? "cors" : "same-origin",
                      credentials: e.isCrossOrigin ? "omit" : "same-origin",
                      keepalive: !e.isCrossOrigin && e.isUnloading,
                      cache: "no-store",
                    },
                    r = e.oncomplete || function () {};
                  ((t["X-Requested-With"] = "fetch"),
                    window
                      .fetch(e.url, o)
                      .then(function (e) {
                        const t = {
                          success: e.ok,
                          statusCode: e.status,
                          statusText: e.statusText,
                          id: n,
                        };
                        t.success
                          ? e
                              .text()
                              .then(function (e) {
                                try {
                                  t.data = JSON.parse(e);
                                } catch (n) {
                                  t.data = e;
                                }
                                r(t);
                              })
                              .catch(function (e) {
                                ((t.statusCode = 1),
                                  (t.statusText = e.message),
                                  r(t));
                              })
                          : r(t);
                      })
                      .catch(function (e) {
                        const t = {
                          success: !1,
                          statusCode: 2,
                          statusText: e.message,
                          id: n,
                        };
                        r(t);
                      }));
                })(e)
              : l(e)));
      },
    };
  }),
  TLT.addService("domCapture", function (e) {
    "use strict";
    let t = e.getService("config");
    const n = e.getService("browserBase"),
      o = e.getService("browser");
    let r,
      i = e.getService("message");
    const a = {
        maxMutations: 100,
        maxLength: 1e6,
        captureShadowDOM: !1,
        captureDynamicStyles: !1,
        captureHREFStyles: !1,
        captureFrames: !1,
        removeScripts: !0,
        removeComments: !0,
        captureStyle: !0,
      },
      s = {
        childList: !0,
        attributes: !0,
        attributeOldValue: !0,
        characterData: !0,
        subtree: !0,
      };
    let l,
      c = void 0 !== window.MutationObserver,
      u = s;
    const d = [],
      f = [];
    let p;
    const h = [];
    let g = [],
      m = [],
      y = [],
      v = 0,
      w = 100,
      b = !1,
      T = !1,
      S = !1,
      x = !1,
      _ = function () {},
      E = function () {},
      C = function () {};
    const L = e._publishEvent;
    let O = !1;
    const k = e.utils;
    let I, D;
    const P = Object.getOwnPropertyDescriptor(
        Document.prototype,
        "styleSheets",
      ),
      M = Object.getOwnPropertyDescriptor(
        Document.prototype,
        "adoptedStyleSheets",
      ),
      A = {},
      R = {},
      j = {};
    let N;
    const z = {};
    function U(e) {
      let t, n;
      if (e) for (t = 0, n = e.length; t < n; t += 1) delete e[t].oldValue;
      return e;
    }
    function H(e, t) {
      let n,
        o,
        r = -1;
      if (!e || !t) return r;
      for (n = 0, o = e.length; n < o; n += 1)
        if (e[n].name === t) {
          r = n;
          break;
        }
      return r;
    }
    function V(e, t) {
      let n, o, r, i;
      for (n = 0, o = e.length, i = !1; n < o; n += 1)
        if (((r = e[n]), r.name === t.name)) {
          (r.oldValue === t.value ? e.splice(n, 1) : (r.value = t.value),
            (i = !0));
          break;
        }
      return (i || e.push(t), e);
    }
    function F(e, t) {
      let n,
        o,
        r,
        i,
        a,
        s,
        l,
        c = 0;
      for (
        e.removedNodes = t.removedNodes.length,
          e.addedNodes = k.convertToArray(t.addedNodes),
          n = 0,
          i = g.length;
        n < i;
        n += 1
      )
        if (((s = g[n]), e.isSame(s))) {
          if (e.removedNodes)
            for (o = 0; o < t.removedNodes.length; o += 1)
              ((r = s.addedNodes.indexOf(t.removedNodes[o])),
                -1 !== r && (s.addedNodes.splice(r, 1), (e.removedNodes -= 1)));
          if (
            ((s.removedNodes += e.removedNodes),
            s.addedNodes.concat(e.addedNodes),
            !s.removedNodes && !s.addedNodes.length)
          ) {
            for (l = !1, o = 0; o < g.length; o += 1)
              if (s !== g[o] && g[o].containedIn(s)) {
                l = !0;
                break;
              }
            l || (g.splice(n, 1), (c = -1));
          }
          a = !0;
          break;
        }
      return (a || (g.push(e), (c = 1)), c);
    }
    function X(e, t) {
      let n,
        o,
        r,
        i,
        a,
        s = !1;
      for (n = 0, r = g.length; !s && n < r; n += 1)
        if (((a = g[n]), e.containedIn(a)))
          for (i = a.addedNodes, o = 0; o < i.length; o += 1)
            if (i[o].contains && i[o].contains(t)) {
              s = !0;
              break;
            }
      return s;
    }
    function q(e, t) {
      let o,
        r,
        a,
        s = null,
        l = 0;
      const c = t.attributeName;
      if ("checked" === c || "selected" === c) {
        if (
          ((s = n.ElementData.prototype.examineID(t.target)),
          i.isPrivacyMatched(s))
        )
          return l;
        s = null;
      }
      ("value" === c &&
        ((s = n.ElementData.prototype.examineID(t.target)),
        (s.currState = k.getTargetState(t.target) || {}),
        s.currState.value ? i.applyPrivacyToTarget(s) : (s = null)),
        (e.attributes = [
          {
            name: c,
            oldValue: t.oldValue,
            value: s ? s.currState.value : t.target.getAttribute(c),
          },
        ]));
      const u = e.attributes[0];
      if (u.oldValue === u.value) return l;
      for (o = 0, r = y.length, a = !1; o < r; o += 1)
        if (((s = y[o]), e.isSame(s))) {
          ((s.attributes = V(s.attributes, u)),
            s.attributes.length
              ? X(e, t.target) && (y.splice(o, 1), (l = -1))
              : (y.splice(o, 1), (l = -1)),
            (a = !0));
          break;
        }
      return (a || X(e, t.target) || (y.push(e), (l = 1)), l);
    }
    function B() {
      return new window.MutationObserver(function (t) {
        t &&
          (!(function (e) {
            let t, o, r, i, a;
            if (e && e.length)
              if (b) v += e.length;
              else {
                for (t = 0, o = e.length; t < o && v < w; t += 1)
                  if (
                    ((i = e[t]),
                    (a = new n.Xpath(i.target)),
                    a &&
                      ((r = a.fullXpathList), r.length && "html" === r[0][0]))
                  )
                    switch (i.type) {
                      case "characterData":
                      case "childList":
                        v += F(a, i);
                        break;
                      case "attributes":
                        v += q(a, i);
                        break;
                      default:
                        k.clog("Unknown mutation type: " + i.type);
                    }
                v >= w &&
                  (k.clog(
                    "Switching to full DOM capture as total mutations (" +
                      v +
                      ") matched or exceeded configured threshold (" +
                      w +
                      ")",
                  ),
                  (b = !0),
                  (v += o - t));
              }
          })(t),
          k.clog("Processed [" + t.length + "] mutation records."),
          e.invokeMutationCallbacks(t));
      });
    }
    function W(e) {
      const t = p.call(this, e);
      return (l && t && l.observe(t, u), t);
    }
    function Y() {
      return Math.random().toString(16).slice(2);
    }
    function K(e, t) {
      return (this.updateOwner(), this.insertRuleOriginal(e, t));
    }
    function J(e) {
      (this.deleteRuleOriginal(e), this.updateOwner());
    }
    function Q(e) {
      (this.updateOwner(), this.replaceSyncOriginal(e));
    }
    function $(e) {
      return (this.updateOwner(), this.replaceOriginal(e));
    }
    function G() {
      if (this.ownersReference) {
        const e = Object.keys(this.ownersReference);
        for (let t = 0; t < e.length; t += 1) {
          const n = e[t];
          A[n] || (m.push(n), (A[n] = !0));
        }
      }
    }
    function Z(e) {
      (this.ownersReference || (this.ownersReference = {}),
        (this.ownersReference[e] = !0),
        (A[e] = !0));
    }
    function ee(e) {
      this.ownersReference && delete this.ownersReference[e];
    }
    function te(e) {
      ((e.domId = Y()), (R[e.domId] = e), (A[e.domId] = !0));
      let t = [].concat.apply([], e.adoptedStyleSheets);
      if (((t = t.concat.apply(t, e.styleSheets)), t))
        for (let n = 0; n < t.length; n += 1) {
          const o = t[n];
          (o.ownersReference || (o.ownersReference = {}),
            (o.ownersReference[e.domId] = !0));
        }
    }
    function ne(e, t, n) {
      let o, r;
      e.domId || te(e);
      const i = e.adoptedStyleSheets;
      if (i.length > 0)
        for (o = 0; o < i.length; o += 1)
          ((r = i[o]), r.removeOwnership(e.domId));
      for (o = 0; o < t.length; o += 1)
        ((r = t[o]),
          r && "function" == typeof r.publishOwnership
            ? r.publishOwnership(e.domId)
            : k.clog(
                "Warning: Attempted to publish ownership of a non-CSSStyleSheet object.",
              ));
      n.set.call(e, t);
    }
    function oe(e, t) {
      let n, o;
      for (e.domId || te(e), n = 0; n < t.length; n += 1)
        ((o = t[n]),
          o && "function" == typeof o.publishOwnership
            ? o.publishOwnership(e.domId)
            : k.clog(
                "Warning: Attempted to publish ownership of a non-CSSStyleSheet object.",
              ));
      return t;
    }
    function re(e) {
      if (e && e.alreadyModified) return;
      e.alreadyModified = !0;
      const t = Object.getOwnPropertyDescriptor(
          e.Document.prototype,
          "adoptedStyleSheets",
        ),
        n = Object.getOwnPropertyDescriptor(
          e.Document.prototype,
          "styleSheets",
        );
      return (
        Object.defineProperty(e.Document.prototype, "adoptedStyleSheets", {
          get: function () {
            return t.get.call(this);
          },
          set: function (e) {
            ne(this, e, t);
          },
        }),
        Object.defineProperty(e.Document.prototype, "styleSheets", {
          get: function () {
            return oe(this, n.get.call(this));
          },
          set: function (e) {
            n.set && n.set.call(this, e);
          },
        }),
        (e.CSSStyleSheet.prototype.insertRuleOriginal =
          e.CSSStyleSheet.prototype.insertRule),
        (e.CSSStyleSheet.prototype.deleteRuleOriginal =
          e.CSSStyleSheet.prototype.deleteRule),
        (e.CSSStyleSheet.prototype.insertRule = K),
        (e.CSSStyleSheet.prototype.deleteRule = J),
        (e.CSSStyleSheet.prototype.replaceSyncOriginal =
          e.CSSStyleSheet.prototype.replaceSync),
        (e.CSSStyleSheet.prototype.replaceOriginal =
          e.CSSStyleSheet.prototype.replace),
        (e.CSSStyleSheet.prototype.replaceSync = Q),
        (e.CSSStyleSheet.prototype.replace = $),
        (e.CSSStyleSheet.prototype.publishOwnership = Z),
        (e.CSSStyleSheet.prototype.removeOwnership = ee),
        void (e.CSSStyleSheet.prototype.updateOwner = G)
      );
    }
    function ie(n) {
      let o, f, g, m, y, v;
      const b = t.getCoreConfig();
      if (
        (t.subscribe("configupdated", C),
        (i = e.getService("message")),
        (r = n),
        (r.options = k.mixin({}, a, r.options)),
        (N = k.getValue(r.options, "removeInnerHTMLRegex")),
        r && r.options && r.options.debugVoidElementsEnabled)
      ) {
        const e = r.options.debugVoidElementsTimer
          ? r.options.debugVoidElementsTimer
          : 1e4;
        setTimeout(() => {
          !(function () {
            const e = ["img", "input", "link"];
            for (const t of e) {
              const e = document.querySelectorAll(t);
              for (const t of e)
                t.innerText.length > 0 &&
                  console.warn(
                    "Detected a void element with content, which goes against the W3C specifications for HTML5. The SDK will not capture any data inside the element",
                    t,
                  );
            }
          })();
        }, e);
      }
      if (
        ((c = c && k.getValue(r, "diffEnabled", !0)),
        (w = k.getValue(r.options, "maxMutations", 100)),
        c &&
          ((u = k.getValue(r, "diffObserverConfig", s)),
          (l = B()),
          d.push(window)),
        (v = r.options.captureShadowDOM && Element.prototype.attachShadow),
        v &&
          window.ShadyDOM &&
          window.ShadyDOM.inUse &&
          ((r.options.captureShadowDOM = !1), (v = !1)),
        v)
      )
        for (g in b.modules)
          if (Object.prototype.hasOwnProperty.call(b.modules, g))
            for (
              y = b.modules[g].events || [], o = 0, f = y.length;
              o < f;
              o += 1
            )
              y[o].attachToShadows &&
                ((m = y[o].name), -1 === k.indexOf(h, m) && h.push(m));
      (r.options.captureDynamicStyles &&
        document.adoptedStyleSheets &&
        (re(window),
        v &&
          ((I = Object.getOwnPropertyDescriptor(
            ShadowRoot.prototype,
            "adoptedStyleSheets",
          )),
          (D = Object.getOwnPropertyDescriptor(
            ShadowRoot.prototype,
            "styleSheets",
          )),
          Object.defineProperty(ShadowRoot.prototype, "adoptedStyleSheets", {
            get: function () {
              return I.get.call(this);
            },
            set: function (e) {
              ne(this, e, I);
            },
          }),
          Object.defineProperty(ShadowRoot.prototype, "styleSheets", {
            get: function () {
              return oe(this, D.get.call(this));
            },
            set: function (e) {
              D.set && D.set.call(this, e);
            },
          })),
        te(document)),
        l &&
          (l.observe(window.document, u),
          !p &&
            k.getValue(r, "options.captureShadowDOM", !1) &&
            ((p = Element.prototype.attachShadow),
            (Element.prototype.attachShadow = W)),
          (O = !0)),
        (S = !0));
    }
    function ae(t) {
      const n = [...t.document.querySelectorAll(["iframe", "frame"])];
      if (0 === n.length) return [t];
      const o = n.map((e) => e.contentWindow),
        r = [t];
      for (const t of o) e._hasSameOrigin(t) && r.push(...ae(t));
      return r;
    }
    function se(e) {
      (M &&
        Object.defineProperty(e.Document.prototype, "adoptedStyleSheets", M),
        P && Object.defineProperty(e.Document.prototype, "styleSheets", P),
        I &&
          Object.defineProperty(
            e.ShadowRoot.prototype,
            "adoptedStyleSheets",
            I,
          ),
        D && Object.defineProperty(e.ShadowRoot.prototype, "styleSheets", D),
        e.CSSStyleSheet.prototype.insertRuleOriginal &&
          (e.CSSStyleSheet.prototype.insertRule =
            e.CSSStyleSheet.prototype.insertRuleOriginal),
        e.CSSStyleSheet.prototype.deleteRuleOriginal &&
          (e.CSSStyleSheet.prototype.deleteRule =
            e.CSSStyleSheet.prototype.deleteRuleOriginal),
        e.CSSStyleSheet.prototype.replaceSyncOriginal &&
          (e.CSSStyleSheet.prototype.replaceSync =
            e.CSSStyleSheet.prototype.replaceSyncOriginal),
        e.CSSStyleSheet.prototype.replaceOriginal &&
          (e.CSSStyleSheet.prototype.replace =
            e.CSSStyleSheet.prototype.replaceOriginal),
        delete e.CSSStyleSheet.prototype.publishOwnership,
        delete e.CSSStyleSheet.prototype.removeOwnership,
        delete e.CSSStyleSheet.prototype.updateOwner,
        delete e.CSSStyleSheet.prototype.insertRuleOriginal,
        delete e.CSSStyleSheet.prototype.deleteRuleOriginal,
        delete e.CSSStyleSheet.prototype.replaceSyncOriginal,
        delete e.CSSStyleSheet.prototype.replaceOriginal,
        delete e.alreadyModified);
    }
    function le() {
      return "tlt-" + k.getSerialNumber();
    }
    function ce(e, t, n) {
      let o, r, i, a;
      const s = [];
      if (!e || !t) return s;
      n && 2 === n.length && ((r = n[0]), (i = n[1]));
      const l = e.querySelectorAll(t);
      if (l && l.length)
        for (o = l.length - 1; o >= 0; o -= 1)
          ((a = l[o]), r ? a[r] === i && s.push(a) : s.push(a));
      return s;
    }
    function ue(e, t, n) {
      let o, r;
      const i = ce(e, t, n);
      for (o = i.length - 1; o >= 0; o -= 1)
        ((r = i[o]), r.parentNode.removeChild(r));
      return e;
    }
    function de(e, t) {
      let n, o;
      const r = ce(e, "img"),
        i = new RegExp("^data:image/(.*?);base64");
      for (n = 0; n < r.length; n++)
        ((o = r[n]),
          i.test(o.src) &&
            o.src.length > t &&
            ((o.src = ""), o.setAttribute("removedByUIC", !0)));
      return e;
    }
    function fe(e, t) {
      let n, o;
      for (n = 0; e.hasChildNodes() && n < e.childNodes.length; n += 1)
        ((o = e.childNodes[n]),
          o.nodeType === t
            ? (e.removeChild(o), (n -= 1))
            : o.hasChildNodes() && fe(o, t));
      return e;
    }
    function pe(e) {
      let t,
        n,
        o = null;
      if (!e) return o;
      switch (e.nodeType) {
        case 1:
          ((t = e.ownerDocument),
            t && t.documentElement === e && (n = t.doctype));
          break;
        case 9:
          n = e.doctype;
      }
      return (
        n &&
          (o =
            "<!DOCTYPE " +
            n.name +
            (n.publicId ? ' PUBLIC "' + n.publicId + '"' : "") +
            (!n.publicId && n.systemId ? " SYSTEM" : "") +
            (n.systemId ? ' "' + n.systemId + '"' : "") +
            ">"),
        o
      );
    }
    function he(e, t) {
      let n, o, i;
      r.options.captureShadowDOM &&
        console.warn(
          "Please disable the captureShadoDOM flag in the configuration file as this website is most likely using a synthetic Shadow DOM polyfill",
        );
      const a = e && e.querySelectorAll("*"),
        s = (a && a.length) || 0;
      for (n = 0; n < s; n += 1)
        ((o = a[n]),
          (i = o.shadowRoot),
          i
            ? i.children.length > 0 && he(i, t)
            : "INPUT" === o.tagName && (t[t.length] = o));
    }
    function ge(e, t, n) {
      let o, r, i;
      const a = t.length;
      if (e.length === a || (he(n, (e = [])), e.length === a))
        for (o = 0; o < a; o += 1)
          switch (((r = e[o]), (i = t[o]), i.type)) {
            case "checkbox":
            case "radio":
              r.checked
                ? i.setAttribute("checked", "checked")
                : i.removeAttribute("checked");
              break;
            default:
              (i.setAttribute("value", r.value),
                i.getAttribute("type") || i.setAttribute("type", "text"));
          }
    }
    function me(e, t) {
      if (!t) return;
      const n = e.querySelectorAll("input"),
        o = t.querySelectorAll("input");
      o && ge(n, o, e);
    }
    function ye(e, t) {
      let n, o, r, i, a;
      if (!e || !t) return;
      const s = e.querySelectorAll("select"),
        l = t.querySelectorAll("select");
      if (s)
        for (r = 0, a = s.length; r < a; r += 1)
          for (n = s[r], o = l[r], i = 0; i < n.options.length; i += 1)
            i === n.selectedIndex || n.options[i].selected
              ? o.options[i].setAttribute("selected", "selected")
              : o.options[i].removeAttribute("selected");
    }
    function ve(e, t) {
      let n,
        o = null;
      if (e)
        switch (((n = e.nodeType || -1), n)) {
          case 11:
            o = e.innerHTML;
            break;
          case 9:
            o = e.documentElement ? e.documentElement.outerHTML : "";
            break;
          case 1:
            o = t ? e.innerHTML : e.outerHTML;
        }
      return o;
    }
    function we(e) {
      let t,
        n = !1;
      if (e && "object" == typeof e)
        switch (((t = e.nodeType || -1), t)) {
          case 9:
          case 1:
            n = !0;
        }
      return n;
    }
    function be(e) {
      let t, n, r;
      for (
        e.TLTListeners = e.TLTListeners || {}, t = 0, n = h.length;
        t < n;
        t += 1
      )
        ((r = h[t]),
          e.TLTListeners[r] ||
            (o.subscribe(r, e, L), (e.TLTListeners[r] = !0)));
    }
    function Te(e, t, o, r) {
      let i, a, s, d, p, h;
      const g = { shadows: [] };
      if (!e || (!r && !e.children)) return g;
      for (p = r ? [e] : e.children, i = 0, a = p.length; i < a; i += 1) {
        if (((d = p[i]), d.shadowRoot)) {
          ((h = new n.Xpath(d)), (s = E(d.ownerDocument, d.shadowRoot, "", o)));
          const e = {
            root: s.root,
            originalSize: s.originalSize,
            xpath: h.xpath,
          };
          if (
            (s.frames && s.frames.length > 0 && (e.frames = s.frames),
            g.shadows.push(e),
            (g.shadows = g.shadows.concat(s.shadows)),
            be(d.shadowRoot),
            c)
          )
            try {
              (l.observe(d.shadowRoot, u),
                (d.shadowRoot.TLTListeners.mutation = !0),
                -1 === k.indexOf(f, d) && f.push(d));
            } catch (e) {
              k.clog("Failed to observe shadow root.", e, d);
            }
        }
        ((s = Te(d, null, o)), (g.shadows = g.shadows.concat(s.shadows)));
      }
      return g;
    }
    function Se(e) {
      let t,
        n,
        o,
        r,
        i,
        a,
        s,
        l,
        c = 0;
      if (!e) return c;
      if (e.root) {
        if (((c += e.root.length), e.frames))
          for (s = e.frames, t = 0, o = s.length; t < o; t += 1)
            s[t].root && (c += s[t].root.length);
      } else if (e.diffs)
        for (t = 0, o = e.diffs.length; t < o; t += 1)
          if (((a = e.diffs[t]), (c += a.xpath.length), a.root))
            c += a.root.length;
          else if (a.attributes)
            for (n = 0, r = a.attributes.length; n < r; n += 1)
              ((i = a.attributes[n]),
                (c += i.name.length),
                i.value && (c += i.value.length));
      if (e.shadows)
        for (l = e.shadows, t = 0, o = l.length; t < o; t += 1)
          l[t].root && (c += l[t].root.length);
      return c;
    }
    function xe(e) {
      let t,
        n,
        o,
        r = [];
      if (!e || !e.children) return r;
      const i = e.children;
      for (t = 0, n = i.length; t < n; t += 1)
        ((o = i[t]),
          o.shadowRoot &&
            (o.shadowRoot.TLTListeners || r.push([o, o.shadowRoot]),
            (r = r.concat(xe(o.shadowRoot)))),
          (r = r.concat(xe(o))));
      return r;
    }
    function _e(e, t) {
      let n, o, r, i;
      if (!e || !t) return;
      if (!t.captureShadowDOM) return;
      const a = xe(e);
      for (n = 0, o = a.length, r = []; n < o; n += 1)
        ((i = Te(a[n][0], 0, t, !0)), (r = r.concat(i.shadows)));
      return r;
    }
    function Ee(e, t) {
      let n,
        o,
        r,
        i = [];
      if (!e || !e.children) return i;
      t = t || 1;
      const a = e.children;
      for (n = 0, o = a.length; n < o; n += 1)
        ((r = a[n]),
          r.shadowRoot &&
            (i.push([r, r.shadowRoot, t]),
            (i = i.concat(Ee(r.shadowRoot, t + 1)))),
          (i = i.concat(Ee(r, t))));
      return i;
    }
    function Ce(t, n) {
      let o;
      const r = performance.now(),
        i = Ee(t.documentElement),
        a = performance.now();
      (k.clog(
        "Finding Shadow DOM roots took: " +
          (a - r).toFixed(2) +
          " milliseconds.",
      ),
        k.clog("Found [" + i.length + "] Shadow DOM roots: ", i),
        (o = E(t, t, null, n)),
        o || (o = {}),
        o.shadows &&
          o.shadows.sort(function (e, t) {
            let n = 0;
            const o = e.xpath,
              r = t.xpath;
            return (
              o.length === r.length
                ? o === r || (n = o < r ? -1 : 1)
                : (n = o.length < r.length ? -1 : 1),
              0 === n && console.error("Duplicate xpath: " + o),
              n
            );
          }),
        (o.charset = t.characterSet || t.charset));
      const s = k.getOriginAndPath(t.location);
      return ((o.host = s.origin), (o.url = e.normalizeUrl("", s.path, 12)), o);
    }
    function Le(e) {
      let t, o, r, i, a, s, l, c, u, d, f;
      const p = new RegExp("^data:image/(.*?);base64"),
        h = { fullDOM: !1, diffs: [], attributeDiffs: {} };
      (!(function (e) {
        let t, n, o;
        if (e && e.length)
          for (
            e = e.sort(function (e, t) {
              return e.compare(t);
            }),
              t = 0;
            t < e.length;
            t += 1
          )
            for (o = e[t], n = t + 1; n < e.length; n += 0)
              e[n].containedIn(o) ? e.splice(n, 1) : (n += 1);
      })(g),
        (function () {
          let e, t, n, o;
          for (e = 0, n = g.length; e < n && y.length; e += 1)
            for (o = g[e], t = 0; t < y.length; t += 1)
              y[t].containedIn(o) && (y.splice(t, 1), (t -= 1));
        })());
      const v = e.captureShadowDOM;
      for (e.captureShadowDOM = !1, t = 0, o = g.length; t < o; t += 1)
        if (((d = g[t]), (u = n.getNodeFromID(d.xpath, -2)), u)) {
          if (!d.isShadowHost || ((u = u.shadowRoot), u.TLTListeners)) {
            if (
              u === window.document.body ||
              u === window.document.documentElement
            )
              return ((e.captureShadowDOM = v), Ce(window.document, e));
            ((r = E(window.document, u, d, e)),
              delete r.originalSize,
              r.shadows && 0 === r.shadows.length && delete r.shadows,
              r.frames && 0 === r.frames.length && delete r.frames,
              (r.xpath = d.xpath),
              h.diffs.push(r));
          }
        } else
          k.clog("Target is in the mutated target list but not in the DOM", d);
      for (t = 0; t < m.length; t += 1)
        ((a = m[t]),
          (s = R[a]),
          (c = Oe(s)),
          (l = new n.Xpath(s)),
          l && "null" !== l.xpath
            ? ((l = l.xpath.slice(0, -1)), (l += ',["' + a + '"]]'))
            : (l = '[["' + a + '"]]'),
          (r = { root: c, xpath: l }),
          (A[a] = !1),
          h.diffs.push(r));
      function w(e) {
        e && e.name && (h.attributeDiffs[r.xpath][e.name] = { value: e.value });
      }
      function b(t) {
        let n, o, r;
        for (n = 0, r = t.length; n < r; n += 1)
          if (
            ((o = t[n]),
            "src" === o.name &&
              p.test(o.value) &&
              o.value.length > e.discardBase64)
          ) {
            ((o.value = ""), t.push({ name: "removedByUIC", value: !0 }));
            break;
          }
        return t;
      }
      for (t = 0, o = y.length; t < o; t += 1)
        ((d = y[t]),
          (i = H(d.attributes, "id")),
          i > -1 &&
            ((u = n.getNodeFromID(d.fullXpath, -2)),
            u && (d.xpath = d.fullXpath)),
          (f = U(d.attributes)),
          Object.prototype.hasOwnProperty.call(e, "discardBase64") &&
            ((u = n.getNodeFromID(d.xpath, -2)),
            u || (u = n.getNodeFromID(d.fullXpath, -2)),
            u && "img" === u.tagName.toLowerCase() && f && (f = b(f))),
          (r = { xpath: d.xpath, attributes: f }),
          h.diffs.push(r),
          (h.attributeDiffs[r.xpath] = {}),
          k.forEach(r.attributes, w));
      e.captureShadowDOM = v;
      const T = _e(window.document, e);
      return (T && T.length && (h.shadows = T), h);
    }
    function Oe(e) {
      let t, n, o, i, a, s, l;
      const c = r.options.captureHREFStyles;
      if (!A[e.domId]) return j[e.domId];
      if (
        ((i = [].concat.apply([], e.adoptedStyleSheets)),
        (i = i.concat.apply(i, e.styleSheets)),
        i && i.length > 0)
      ) {
        for (t = [], s = 0; s < i.length; s += 1)
          if (
            ((a = i[s]),
            !(
              (!c && !e.isDocumentFromIframe && a.href) ||
              (a.ownerNode && a.ownerNode.textContent)
            ))
          ) {
            try {
              o = a.cssRules;
            } catch (e) {
              k.clog("Error accessing cssRules for stylesheet", e, a);
              continue;
            }
            for (l = 0; l < o.length; l += 1) t.push(o[l].cssText);
          }
        t.length > 0 &&
          ((n = '<style id="' + e.domId + '">' + t.join(" ") + "</style>"),
          (j[e.domId] = n));
      }
      return ((A[e.domId] = !1), n);
    }
    function ke(e) {
      const n = e.origin,
        o = t.getCoreConfig(),
        r =
          o &&
          o.frames &&
          o.frames.eventConsumer &&
          o.frames.eventConsumer.childFrameHostnameWhitelist
            ? o.frames.eventConsumer.childFrameHostnameWhitelist
            : void 0,
        i =
          n && r && r.includes(new URL(n).hostname)
            ? r.includes(new URL(n).hostname)
            : void 0;
      if ((r && !r.length) || i) {
        const t = e.data,
          n = t && t.producerId ? t.producerId : void 0,
          o = t && t.data ? t.data : void 0;
        n &&
          o.type &&
          12 === o.type &&
          o &&
          o.domCapture &&
          o.domCapture.fullDOM &&
          (k.clog(
            `Post message for full DOM capture received from frame ${n}`,
            e,
          ),
          (z[n] = o.domCapture),
          TLT.logScreenviewLoad("rootWithFrames"));
      }
    }
    return (
      (_ = function (e) {
        let t = null;
        return (
          we(e) &&
            ((t = e.cloneNode(!0)),
            !t && e.documentElement && (t = e.documentElement.cloneNode(!0))),
          t
        );
      }),
      (E = function (t, n, o, a) {
        let s,
          l,
          c,
          u,
          d,
          f,
          p = !0,
          h = {};
        const g = r.options.captureDynamicStyles;
        if (!t || !n) return h;
        const m = ve(n);
        if ((m && (h.originalSize = m.length), (s = _(n)), !s && n.host))
          ((p = !1),
            (u = document.createElement("div")),
            (u.id = "srph-" + Date.now()),
            (f = ve(n)),
            N && (f = f.replace(N, "")),
            (u.innerHTML = f),
            (s = u));
        else if (!s) return h;
        (s &&
          (a.removeScripts && (ue(s, "script"), ue(s, "noscript")),
          a.keepImports || ue(s, "link", ["rel", "import"]),
          a.removeComments && fe(s, 8),
          a.captureStyle
            ? a.useACS &&
              (function (e, t) {
                let n, o, r, i, a, s, l;
                if (!e || !t || !t.querySelectorAll) return;
                const c = e.querySelectorAll("style"),
                  u = t.querySelectorAll("style");
                for (n = 0, l = c.length; n < l; n += 1)
                  if (((s = c[n]), s.sheet)) {
                    for (
                      r = s.sheet.cssRules, o = 0, i = r.length, a = [];
                      o < i;
                      o += 1
                    )
                      a.push(r[o].cssText);
                    a.length && (u[n].innerHTML = a.join("\n"));
                  }
              })(n, s)
            : ue(s, "style"),
          Object.prototype.hasOwnProperty.call(a, "discardBase64") &&
            de(s, a.discardBase64),
          ye(n, s),
          me(n, s),
          (function (e, t) {
            let n, o, r, i;
            if (!e || !t) return;
            const a = e.querySelectorAll("textarea"),
              s = t.querySelectorAll("textarea");
            if (a && s)
              for (n = 0, o = a.length; n < o; n += 1)
                ((r = a[n]),
                  (i = s[n]),
                  i.setAttribute("value", r.value),
                  (i.value = i.textContent = r.value));
          })(n, s),
          (s = i.applyPrivacyToNode(s, o, t)),
          a.captureFrames &&
            (l = (function (t, n, o) {
              let r, i, a, s, l, c;
              const u = { frames: [] },
                d = ["iframe", "frame"];
              for (i = 0; i < d.length; i += 1)
                if (
                  ((s = d[i]),
                  (l = t.querySelectorAll(s)),
                  (c = n.querySelectorAll(s)),
                  l)
                )
                  for (r = 0, a = l.length; r < a; r += 1)
                    try {
                      let t, n, i, a, s, d, f;
                      if (((t = l[r]), (n = k.getIFrameWindow(t)), n)) {
                        const t = e._hasSameOrigin(n);
                        (k.clog("Is same origin frame", t),
                          t ||
                            ((a = c[r].getAttribute("id")),
                            (s = z[a]),
                            k.clog("Frame ID", a),
                            k.clog("Has frame dom captured", !!s)),
                          (s ||
                            (t &&
                              n.document &&
                              (o.captureAboutBlankFrames ||
                                "about:blank" !== n.location.href))) &&
                            (s ||
                              ((i = n.document),
                              i.isDocumentFromIframe ||
                                (re(n), (i.isDocumentFromIframe = !0)),
                              (s = E(i, i, "", o)),
                              (f = k.getOriginAndPath(i.location)),
                              (s.host = f.origin),
                              (s.url = e.normalizeUrl("", f.path, 12)),
                              (s.charset = i.characterSet || i.charset)),
                            a || (a = le()),
                            c[r].setAttribute("tltid", a),
                            (s.tltid = a),
                            c[r].removeAttribute("srcdoc"),
                            (d = c[r].getAttribute("src")),
                            d ||
                              ((d = n.location.href),
                              c[r].setAttribute("src", d)),
                            s.root || (s.root = "<html></html>"),
                            s.frames &&
                              ((u.frames = u.frames.concat(s.frames)),
                              delete s.frames),
                            u.frames.push(s)));
                      }
                    } catch (e) {
                      k.clog("Failed to capture frame/iframe", e, l[r]);
                    }
              return u;
            })(n, s, a))),
          a.captureShadowDOM && (c = Te(n, 0, a)),
          l && (h = k.mixin(h, l)),
          c && (h = k.mixin(h, c)));
        const y = (pe(n) || "") + ve(s || n, !p);
        return (
          (h.root = i.applyPrivacyPatterns(y)),
          g &&
            document.adoptedStyleSheets &&
            (n instanceof Document ||
              n instanceof ShadowRoot ||
              n.isDocumentFromIframe ||
              ("BODY" === n.nodeName &&
                n.ownerDocument.isDocumentFromIframe)) &&
            ("BODY" === n.nodeName && (n = n.ownerDocument),
            n.domId || te(n),
            (d = Oe(n)),
            d &&
              (n instanceof ShadowRoot
                ? (h.root += d)
                : (h.root = h.root.replace("</body>", d + "</body>")))),
          h
        );
      }),
      (C = function () {
        ((t = e.getService("config")),
          ie(t.getServiceConfig("domCapture") || {}));
      }),
      {
        updateConfig: C,
        getUniqueID: le,
        removeTags: ue,
        removeBase64Src: de,
        getTagList: ce,
        getDoctypeAsString: pe,
        fixInputs: me,
        fixSelectLists: ye,
        getHTMLText: ve,
        isNodeValidForCapture: we,
        getCapturedLength: Se,
        dupNode: _,
        getShadowDOM: Te,
        rebuildInputsList: he,
        fixInputsHelper: ge,
        createId: Y,
        removeDynamicStylesMethodsFromContextWindow: se,
        getFlattenedArrayOfWindowsFromFrames: ae,
        init: function () {
          ((t = e.getService("config")),
            S
              ? k.clog(
                  "Attempt to initialize service which has been already initialized(domCaptureService)",
                )
              : (ie(t.getServiceConfig("domCapture") || {}),
                (function () {
                  const e = t.getCoreConfig();
                  e &&
                    e.frames &&
                    e.frames.enableCrossDomainCommunication &&
                    !x &&
                    r &&
                    r.options &&
                    r.options.captureFrames &&
                    (window.addEventListener("message", ke), (x = !0));
                })()));
        },
        destroy: function () {
          !(function () {
            (t.unsubscribe("configupdated", C),
              l && (l.disconnect(), (l = null)),
              p &&
                Element.prototype.attachShadow === W &&
                ((Element.prototype.attachShadow = p), (p = null)));
            const e = ae(window);
            for (const t of e) se(t);
            x && window.removeEventListener("message", ke);
          })();
        },
        observeWindow: function (e) {
          e &&
            (k.getValue(r, "options.captureFrames", !1) ||
              (e === window) != 0) &&
            -1 === k.indexOf(d, e) &&
            (d.push(e), l && O && l.observe(e.document, u));
        },
        captureDOM: function (e, t) {
          let n,
            o,
            i,
            a = null,
            s = 0;
          if (!S || (k.isIE && document.documentMode < 11)) return a;
          if (
            ((t = k.mixin({}, r.options, t)),
            (e = e || window.document),
            !T || !c || b || t.forceFullDOM)
          ) {
            if (
              (l && l.disconnect(),
              (a = Ce(e, t)),
              (a.fullDOM = !0),
              (a.forced = !(!b && !t.forceFullDOM)),
              (T = !0),
              l)
            )
              for (n = 0, o = d.length; n < o; n += 1) {
                i = d[n];
                try {
                  l.observe(i.document, u);
                } catch (e) {
                  (k.clog(
                    "Error observing window document for diffs",
                    e,
                    i.document,
                  ),
                    d.splice(n, 1),
                    (o = d.length),
                    (n -= 1));
                }
              }
          } else ((a = Le(t)), (a.fullDOM = !a.diffs));
          return (
            c && (a.mutationCount = v),
            (g = []),
            (y = []),
            (m = []),
            (v = 0),
            (b = !1),
            t.maxLength &&
              ((s = Se(a)),
              s > t.maxLength &&
                (a = {
                  errorCode: 101,
                  error:
                    "Captured length (" +
                    s +
                    ") exceeded limit (" +
                    t.maxLength +
                    ").",
                })),
            a
          );
        },
      }
    );
  }),
  TLT.addService("encoder", function (e) {
    "use strict";
    let t = {},
      n = null,
      o = null,
      r = !1;
    function i(n) {
      let o = null;
      return n
        ? ((o = t[n]),
          o &&
            "string" == typeof o.encode &&
            (o.encode = e.utils.access(o.encode)),
          o)
        : o;
    }
    function a(e) {
      ((t = e), n.subscribe("configupdated", o), (r = !0));
    }
    return (
      (o = function () {
        ((n = e.getService("config")), a(n.getServiceConfig("encoder") || {}));
      }),
      {
        handleConfigUpdated: o,
        getEncoder: i,
        init: function () {
          ((n = e.getService("config")),
            r
              ? e.utils.clog(
                  "Attempt to initialize service (encoder) which has been already initialized.",
                )
              : a(n.getServiceConfig("encoder") || {}));
        },
        destroy: function () {
          (n.unsubscribe("configupdated", o), (r = !1));
        },
        encode: function (t, n) {
          let o;
          const r = { data: null, encoding: null, error: null };
          if (("string" != typeof t && !t) || !n)
            return (
              (r.error = "Invalid " + (t ? "type" : "data") + " parameter."),
              r
            );
          const a = i(n);
          if (!a)
            return ((r.error = "Specified encoder (" + n + ") not found."), r);
          if ("function" != typeof a.encode)
            return (
              (r.error =
                "Configured encoder (" +
                n +
                ") 'encode' method is not a function."),
              r
            );
          try {
            o = a.encode(t);
          } catch (e) {
            return (
              (r.error =
                "Exception " +
                (e.name ? e.name + " - " : "") +
                (e.message || e)),
              r
            );
          }
          return o && null !== e.utils.getValue(o, "buffer", null)
            ? ((r.data = o.buffer), (r.encoding = a.defaultEncoding), r)
            : ((r.error = "Encoder (" + n + ") returned an invalid result."),
              r);
        },
      }
    );
  }),
  TLT.addService("message", function (e) {
    "use strict";
    const t = e.utils,
      n = e.getTabId(),
      o = [];
    let r = 0,
      i = 0;
    const a = e.getStartTime(),
      s =
        window.performance &&
        performance.timeOrigin &&
        performance.timeOrigin < a
          ? Math.round(performance.timeOrigin)
          : a,
      l = Date.now() - s + 10,
      c = new Date().getTimezoneOffset(),
      u = e.getService("browserBase"),
      d = e.getService("browser");
    let f = e.getService("config"),
      p = f.getCoreConfig(),
      h = f.getServiceConfig("message") || {};
    const g = e.normalizeUrl("", window.location.href),
      m = window.location.hostname;
    let y,
      v,
      w = Object.prototype.hasOwnProperty.call(h, "privacy") ? h.privacy : [],
      b = Object.prototype.hasOwnProperty.call(h, "privacyPatterns")
        ? h.privacyPatterns
        : [];
    const T = {},
      S = "x",
      x = "X",
      _ = "9",
      E = "@",
      C = parseFloat((window.devicePixelRatio || 1).toFixed(2)),
      L = window.screen || {},
      O = L.width || 0,
      k = L.height || 0,
      I = u.getNormalizedOrientation();
    let D = O,
      P = k;
    const M = window.screen
        ? window.screen.height - window.screen.availHeight
        : 0,
      A = window.innerWidth || document.documentElement.clientWidth,
      R = window.innerHeight || document.documentElement.clientHeight;
    let j = !1;
    const N = {};
    let z = !1;
    function U() {
      const e = Date.now() - s;
      let t =
        window.performance && performance.now
          ? Math.round(performance.now())
          : e;
      return (e - t > l && (t = e), t);
    }
    function H(e) {
      let t = "";
      if (
        (delete e.timestamp,
        (this.type = e.type),
        (this.offset = U()),
        2 === e.type && "LOAD" === e.screenview.type
          ? (o.push(U()), (this.screenviewOffset = 0))
          : o.length
            ? ((this.screenviewOffset = U() - o[o.length - 1]),
              2 === e.type && "UNLOAD" === e.screenview.type && o.pop())
            : (this.screenviewOffset = 0),
        this.type)
      )
        for (t in ((this.count = i += 1), (this.fromWeb = !0), e))
          Object.prototype.hasOwnProperty.call(e, t) && (this[t] = e[t]);
    }
    function V(e, n, o) {
      let r = T.PVC_MASK_BASIC;
      return "string" != typeof n
        ? n
        : (e
            ? e.maskType === T.PVC_MASK_EMPTY.maskType
              ? (r = T.PVC_MASK_EMPTY)
              : e.maskType === T.PVC_MASK_BASIC.maskType
                ? (r = T.PVC_MASK_BASIC)
                : e.maskType === T.PVC_MASK_TYPE.maskType
                  ? (r = T.PVC_MASK_TYPE)
                  : e.maskType === T.PVC_MASK_CUSTOM.maskType &&
                    ((r =
                      "string" == typeof e.maskFunction
                        ? t.access(e.maskFunction)
                        : e.maskFunction),
                    "function" != typeof r && (r = T.PVC_MASK_BASIC))
            : (r = T.PVC_MASK_BASIC),
          r(n, o));
    }
    function F(e, t) {
      let n;
      if (e && t)
        for (n in t)
          Object.prototype.hasOwnProperty.call(t, n) &&
            ("value" === n ? (t[n] = V(e, t[n])) : delete t[n]);
    }
    function X(e, n) {
      return -1 !== t.matchTarget(e, n);
    }
    function q(e, t) {
      let n,
        o = null;
      if (!(e && e.maskAttributes && t && t.attributes)) return o;
      if ("function" == typeof e.maskAttributes)
        try {
          o = e.maskAttributes(t.id, t.attributes);
        } catch (e) {}
      else
        for (n in ((o = t.attributes), t.attributes))
          Object.prototype.hasOwnProperty.call(t.attributes, n) &&
            (o[n] = V(e, t.attributes[n]));
      return o;
    }
    function B(e) {
      let n,
        o,
        r,
        i,
        a = !1;
      if (!e || (!e.currState && !e.prevState && !e.attributes) || !e.id)
        return e;
      const s = e.prevState,
        l = e.currState;
      for (n = 0, o = w.length; n < o; n += 1)
        if (
          ((i = w[n]),
          (r = t.getValue(i, "exclude", !1)),
          X(i.targets, e) !== r)
        ) {
          (s && Object.prototype.hasOwnProperty.call(s, "value") && F(i, s),
            l && Object.prototype.hasOwnProperty.call(l, "value") && F(i, l),
            s &&
              Object.prototype.hasOwnProperty.call(s, "innerText") &&
              (s.innerText = V(i, s.innerText)),
            l &&
              Object.prototype.hasOwnProperty.call(l, "innerText") &&
              (l.innerText = V(i, l.innerText)),
            i.maskAttributes && e.attributes && (e.attributes = q(i, e)),
            (a = !0));
          break;
        }
      return (
        a ||
          (s && s.value && (s.value = t.applyPrivacyPatterns(s.value, b)),
          l && l.value && (l.value = t.applyPrivacyPatterns(l.value, b))),
        e
      );
    }
    function W(e) {
      return e && e.target ? (B(e.target), e) : e;
    }
    function Y(e, n) {
      let o, r, i, a;
      if (n && e)
        if (
          (e.value
            ? ((i = V(n, e.value, e)),
              e.setAttribute("value", i),
              (e.value = i))
            : n.maskType === T.PVC_MASK_CUSTOM.maskType && V(n, "", e),
          e.checked && e.removeAttribute("checked"),
          "select" === t.getTagName(e))
        )
          for (e.selectedIndex = -1, o = 0, r = e.options.length; o < r; o += 1)
            ((a = e.options[o]),
              a.removeAttribute("selected"),
              (a.selected = !1));
        else "textarea" === t.getTagName(e) && (e.textContent = e.value);
    }
    function K() {
      let n, o, r, i, a, s, l, c;
      for (
        f = e.getService("config"),
          h = f.getServiceConfig("message") || {},
          p = f.getCoreConfig(),
          w = h.privacy || [],
          b = h.privacyPatterns || [],
          z = t.getValue(h, "shadowDOMCacheEnabled", !0),
          n = 0,
          a = w.length;
        n < a;
        n += 1
      )
        for (i = w[n], l = i.targets, o = 0, c = l.length; o < c; o += 1)
          ((s = l[o]),
            "object" == typeof s &&
              ("string" == typeof s.idType && (s.idType = +s.idType),
              "object" == typeof s.id &&
                (s.cRegex = new RegExp(s.id.regex, s.id.flags))));
      for (r = b.length, n = r - 1; n >= 0; n -= 1)
        ((i = b[n]),
          "object" == typeof i.pattern
            ? (i.cRegex = new RegExp(i.pattern.regex, i.pattern.flags))
            : (b.splice(n, 1),
              t.clog(
                "WARNING: Ignoring invalid entry [" +
                  n +
                  "] in the privacyPatterns list.",
              )));
    }
    function J(e) {
      const t = e.dcid,
        n = e.shadows || [],
        o = e.fullDOM;
      let r, i, a, s, l;
      if (0 !== n.length && o) {
        for (a in N)
          Object.prototype.hasOwnProperty.call(N, a) && (N[a].age += 1);
        for (r = 0, i = n.length; r < i; r += 1)
          ((s = n[r]),
            (l = N[s.xpath]),
            l && l.root === s.root
              ? ((l.hitCount += 1),
                (l.age -= 1),
                (s.cacheDCID = l.dcid),
                delete s.root)
              : (N[s.xpath] = { root: s.root, dcid: t, hitCount: 0, age: 0 }));
        for (a in N)
          Object.prototype.hasOwnProperty.call(N, a) &&
            ((l = N[a]), l.age > l.hitCount + 1 && delete N[a]);
      }
    }
    return (
      t.isiOS ? 90 === Math.abs(I) && ((D = k), (D = O)) : ((D = O), (P = k)),
      (T.PVC_MASK_EMPTY = function (e) {
        return "";
      }),
      (T.PVC_MASK_BASIC = function (e) {
        return "string" != typeof e ? "" : e.length ? "XXXXX" : "";
      }),
      (T.PVC_MASK_TYPE = function (e) {
        let n,
          o,
          r = "";
        if ("string" != typeof e) return r;
        const i = e.split("");
        for (n = 0, o = i.length; n < o; n += 1)
          t.isNumeric(i[n])
            ? (r += _)
            : t.isUpperCase(i[n])
              ? (r += x)
              : t.isLowerCase(i[n])
                ? (r += S)
                : (r += E);
        return r;
      }),
      (T.PVC_MASK_EMPTY.maskType = 1),
      (T.PVC_MASK_BASIC.maskType = 2),
      (T.PVC_MASK_TYPE.maskType = 3),
      (T.PVC_MASK_CUSTOM = { maskType: 4 }),
      {
        privacyMasks: T,
        maskStr: V,
        applyMask: F,
        applyAttributeMask: q,
        privacyFilter: B,
        maskElement: Y,
        updateConfig: K,
        optimizeDOMCaptureMessage: J,
        init: function () {
          if (j)
            t.clog(
              "Attempt to initialize service which has been already initialized(messageService)",
            );
          else {
            (f.subscribe && f.subscribe("configupdated", K), K(), (j = !0));
            try {
              ((y = sessionStorage.getItem("tl.TR")),
                (v = sessionStorage.getItem("tl.PU")),
                sessionStorage.removeItem("tl.TR"),
                sessionStorage.removeItem("tl.PU"));
            } catch (e) {
              y = null;
            }
          }
        },
        destroy: function () {
          (f.unsubscribe("configupdated", K), (j = !1));
        },
        applyPrivacyToNode: function (e, n, o) {
          let r,
            i,
            a,
            s,
            l,
            c,
            f,
            p,
            h,
            g,
            m,
            y,
            v,
            b = [];
          const T = [];
          if (!e || !o) return null;
          for (r = 0, f = w.length; r < f; r += 1)
            for (
              p = w[r],
                l = t.getValue(p, "exclude", !1),
                l && (c = p),
                y = p.targets,
                i = 0,
                v = y.length;
              i < v;
              i += 1
            )
              if (((m = y[i]), "string" == typeof m))
                if (
                  ((e.id && /srph-\d{13}/.test(e.id)) ||
                    !d.matches(m, e) ||
                    (l ? b.push(e) : Y(e, p)),
                  (h = d.queryAll(m, e)),
                  l)
                )
                  b = b.concat(h);
                else
                  for (a = 0, g = h.length; a < g; a += 1)
                    ((s = h[a]), Y(s, p));
              else if ("string" == typeof m.id)
                switch (m.idType) {
                  case -1:
                  case -3:
                    ((s = u.getNodeFromID(m.id, m.idType, e)),
                      l ? b.push(s) : Y(s, p));
                    break;
                  case -2:
                    T.push({ ruleIndex: r, targetIndex: i, exclude: l });
                }
              else T.push({ ruleIndex: r, targetIndex: i, exclude: l });
          return (
            (function (e, n, o, r, i, a) {
              let s,
                l,
                c,
                f,
                p,
                h,
                g,
                m,
                y,
                v,
                b = [];
              if (!e.length && !i.length && !a) return [];
              const T = d.queryAll("input, select, textarea", n);
              if (!T || !T.length) return [];
              for (s = 0, f = i.length; s < f; s += 1)
                ((l = T.indexOf(i[s])), -1 !== l && T.splice(l, 1));
              if (e.length)
                for (s = 0, f = T.length, b = []; s < f; s += 1)
                  T[s].value &&
                    ((h = u.ElementData.prototype.examineID(T[s], !0)),
                    -2 === h.idType &&
                      ((g = new u.Xpath(T[s], !0)),
                      g.applyPrefix(o),
                      (h.id = g.xpath)),
                    b.push({ id: h.id, idType: h.idType, element: T[s] }));
              for (s = 0, f = e.length; s < f; s += 1)
                if (
                  ((y = w[e[s].ruleIndex]),
                  (m = t.getValue(y, "exclude", !1)),
                  (v = y.targets[e[s].targetIndex]),
                  "string" == typeof v.id && -2 === v.idType)
                )
                  for (l = 0; l < b.length; l += 1)
                    b[l].idType === v.idType &&
                      b[l].id === v.id &&
                      (m
                        ? ((c = T.indexOf(p)), T.splice(c, 1))
                        : ((p = b[l].element), Y(p, y)));
                else
                  for (l = 0; l < b.length; l += 1)
                    ((v.cRegex.lastIndex = 0),
                      b[l].idType === v.idType &&
                        v.cRegex.test(b[l].id) &&
                        ((p = b[l].element),
                        m ? ((c = T.indexOf(p)), T.splice(c, 1)) : Y(p, y)));
              if (a) for (s = 0, f = T.length; s < f; s += 1) Y(T[s], a);
            })(T, e, n, 0, b, c),
            e
          );
        },
        applyPrivacyToMessage: W,
        applyPrivacyToTarget: B,
        applyPrivacyPatterns: function (e) {
          return t.applyPrivacyPatterns(e, b);
        },
        isPrivacyMatched: function (e) {
          let t,
            n,
            o,
            r = !1;
          if (!e) return r;
          for (t = 0, n = w.length; t < n; t += 1)
            if (((o = w[t]), X(o.targets, e))) {
              r = !0;
              break;
            }
          return r;
        },
        createMessage: function (e) {
          if (void 0 === e.type)
            throw new TypeError("Invalid queueEvent given!");
          return (12 === e.type && z && J(e.domCapture), W(new H(e)));
        },
        wrapMessages: function (o) {
          r += 1;
          const i = {
              messageVersion: "13.0.0",
              serialNumber: r,
              sessions: [
                {
                  id: e.getPageId(),
                  tabId: n,
                  startTime: s,
                  timezoneOffset: c,
                  messages: o,
                  clientEnvironment: {
                    webEnvironment: {
                      libVersion: "6.4.189",
                      buildNote: p.buildNote || "",
                      domain: m,
                      page: g,
                      referrer: document.referrer,
                      mouseMovement: e.isMousemovementDetected(),
                      screen: {
                        devicePixelRatio: C,
                        deviceWidth: D,
                        deviceHeight: P,
                        deviceToolbarHeight: M,
                        width: A,
                        height: R,
                        orientation: I,
                      },
                    },
                  },
                },
              ],
            },
            a = i.sessions[0].clientEnvironment.webEnvironment;
          return (
            (a.screen.orientationMode = t.getOrientationMode(
              a.screen.orientation,
            )),
            y && (a.priorPage = { page: v, terminationReason: y }),
            i
          );
        },
        getCurrentOffset: U,
      }
    );
  }),
  TLT.addService("serializer", function (e) {
    "use strict";
    let t = e.getService("config"),
      n = {},
      o = {},
      r = null,
      i = !1;
    const a = {
      json:
        void 0 !== window.JSON
          ? { serialize: window.JSON.stringify, parse: window.JSON.parse }
          : {},
    };
    function s(t, n, o) {
      let r, i, a;
      for (r = 0, i = (t = t || []).length; r < i; r += 1)
        if (
          ((a = t[r]),
          "string" == typeof a && (a = e.utils.access(a)),
          "function" == typeof a)
        ) {
          n[o] = a;
          break;
        }
    }
    function l(l) {
      let c;
      for (c in l)
        Object.prototype.hasOwnProperty.call(l, c) &&
          (s(l[c].stringifiers, n, c), s(l[c].parsers, o, c));
      ((n.json = n.json || a.json.serialize),
        (o.json = o.json || a.json.parse),
        ("function" == typeof n.json && "function" == typeof o.json) ||
          e.fail(
            "JSON parser and/or serializer not provided in the UIC config. Can't continue.",
          ),
        (function () {
          let e;
          return (
            "function" != typeof n.json || "function" != typeof o.json
              ? (e = !0)
              : ((e =
                  void 0 === o.json('{"foo": "bar"}') ||
                  "bar" !== o.json('{"foo": "bar"}').foo),
                void 0 === o.json("[1, 2]")
                  ? (e = !0)
                  : ((e = e || 1 !== o.json("[1, 2]")[0]),
                    (e = e || 2 !== o.json("[1,2]")[1])),
                (e = e || '{"foo":"bar"}' !== n.json({ foo: "bar" })),
                (e = e || "[1,2]" !== n.json([1, 2]))),
            e
          );
        })() &&
          ("function" != typeof n.json && "function" != typeof o.json
            ? console.log(
                "parse.json() and serialize.json() are not a functions.",
              )
            : "function" != typeof n.json
              ? console.log("serialize.json() is not a function.")
              : "function" != typeof o.json
                ? console.log("parse.json() is not a function.")
                : (void 0 === o.json('{"foo": "bar"}')
                    ? console.log("parse.json('{'foo': 'bar'}') is undefined")
                    : "bar" !== o.json('{"foo":"bar"}').foo &&
                      console.log("Parsing of JSON object is failing."),
                  void 0 === o.json("[1, 2]")
                    ? console.log("parse.json('[1, 2]') is undefined")
                    : (1 === o.json("[1,2]")[0] && 2 === o.json("[1,2]")[1]) ||
                      console.log("Parsing of JSON array is failing."),
                  '{"foo":"bar"}' !== n.json({ foo: "bar" }) &&
                    console.log("Stringification of JSON object is failing."),
                  "[1,2]" !== n.json([1, 2]) &&
                    console.log("Stringification of JSON array is failing.")),
          e.fail(
            "JSON stringification and parsing are not working as expected",
          )),
        t && t.subscribe("configupdated", r),
        (i = !0));
    }
    return (
      (r = function () {
        ((t = e.getService("config")), l(t.getServiceConfig("serializer")));
      }),
      {
        updateConfig: r,
        init: function () {
          let n;
          i
            ? e.utils.clog(
                "Attempt to initialize service which has been already initialized(serializerService)",
              )
            : ((n = t ? t.getServiceConfig("serializer") : {}), l(n));
        },
        destroy: function () {
          ((n = {}),
            (o = {}),
            t && t.unsubscribe("configupdated", r),
            (i = !1));
        },
        parse: function (t, n) {
          return (
            "function" != typeof o[(n = n || "json")] &&
              e.utils.clog(
                "Unsupported type of data in parse method of serializer service: " +
                  n,
              ),
            o[n](t)
          );
        },
        serialize: function (t, o) {
          "function" != typeof n[(o = o || "json")] &&
            e.utils.clog(
              "Unsupported type of data in serializer method of serializer service: " +
                o,
            );
          return n[o](t);
        },
      }
    );
  }),
  TLT.addModule("TLCookie", function (e) {
    "use strict";
    let t,
      n,
      o,
      r,
      i = {},
      a = [],
      s = 0,
      l = !0,
      c = !1,
      u = !1,
      d = null,
      f = "CoreID6",
      p = "WCXSID",
      h = "TLTSID";
    const g = "TLTDID",
      m = e.utils;
    function y() {
      const e = "123456789";
      return m.getRandomString(1, e) + m.getRandomString(31, e + "0");
    }
    function v() {
      const e = y(),
        t = !!i.secureTLTSID,
        n = i.samesite;
      return (
        m.setCookie(h, e, void 0, void 0, void 0, t, n),
        m.getCookieValue(h)
      );
    }
    function w() {
      if (!d && window.cmRetrieveUserID)
        try {
          window.cmRetrieveUserID(function (e) {
            d = e;
          });
        } catch (e) {
          (m.clog("Error when invoking cmRetrieveUserID: ", e), (d = null));
        }
    }
    function b(e) {
      let t, n, o;
      if (!e) return;
      let r = null;
      try {
        r = localStorage.getItem(e);
      } catch {}
      if (null === r && u) {
        const t = window.altStorage.getData(e);
        t && (r = t.replaceAll('"', ""));
      }
      if (r)
        if (((n = r.split("|")), (t = parseInt(n[0], 10)), Date.now() > t)) {
          try {
            localStorage.removeItem(e);
          } catch {}
          u && window.altStorage.removeItem(e);
        } else o = n[1];
      return o;
    }
    function T(e, t) {
      if (!e) return;
      const n = Date.now() + s;
      t = t || y();
      try {
        localStorage.setItem(e, n + "|" + t);
      } catch {}
      return (u && window.altStorage.saveData(e, n + "|" + t), b(e));
    }
    function S() {
      return a;
    }
    function x(i) {
      if (
        ((a = []),
        (l = m.getValue(i, "sessionIDUsesCookie", !0)),
        (c = m.getValue(i, "sessionIDUsesStorage", !1)),
        (u = m.getValue(i, "sessionIDUsesFallbackStorage", !1)),
        i.tlAppKey &&
          ((o = i.tlAppKey),
          a.push({ name: "X-Tealeaf-SaaS-AppKey", value: o })),
        i.visitorCookieName && (f = i.visitorCookieName),
        i.wcxCookieName && (p = i.wcxCookieName),
        (t = m.getCookieValue(p)),
        t && a.push({ name: "X-WCXSID", value: t }),
        i.sessionizationCookieName && (h = i.sessionizationCookieName),
        c)
      ) {
        s = m.getValue(i, "sessionIDStorageTTL", 6e5);
        try {
          n = b(h);
        } catch (e) {
          (m.clog("TLCookie: Local Storage read access exception.", e),
            (c = !1));
        }
      }
      if ((!n && l && (n = m.getCookieValue(h)), !n))
        if (t) ((h = p), (n = t));
        else {
          if (c)
            try {
              n = T(h);
            } catch (e) {
              (m.clog("TLCookie: Local Storage write access exception.", e),
                (c = !1));
            }
          !n && l && (n = v());
        }
      e.setSessionCookieInfo(h, n);
      const d = void 0 !== i && void 0 !== i.disableTLTDID && i.disableTLTDID;
      (!1 === d &&
        ((r = m.getCookieValue(g)),
        (r && void 0 !== r) || (r = y()),
        m.setCookie(g, r, 31536e3, void 0, void 0, false, "Lax")),
        n || (n = "Check7UIC7Cookie7Configuration77"),
        a.push({ name: "X-Tealeaf-SaaS-TLTSID", value: n }),
        !1 === d && a.push({ name: "X-Tealeaf-TLTDID", value: r }),
        a.length &&
          TLT.registerBridgeCallbacks([
            { enabled: !0, cbType: "addRequestHeaders", cbFunction: S },
          ]));
    }
    function _(e) {
      let t,
        n,
        o,
        r = !1;
      const a = i.appCookieWhitelist;
      if (!a || !a.length) return r;
      for (t = 0, n = a.length; t < n && !r; t += 1)
        ((o = a[t]),
          o.regex
            ? (o.cRegex || (o.cRegex = new RegExp(o.regex, o.flags)),
              (o.cRegex.lastIndex = 0),
              (r = o.cRegex.test(e)))
            : (r = o === e));
      return r;
    }
    function E() {
      let t,
        n,
        o,
        r,
        i = [],
        a = "",
        s = "";
      const l = document.cookie,
        c = {};
      if (l) {
        for (i = l.split("; "), t = 0, o = i.length; t < o; t += 1) {
          if (((r = i[t]), (n = r.indexOf("=")), n >= 0))
            try {
              a = decodeURIComponent(r.substring(0, n));
            } catch (e) {
              a = r.substring(0, n);
            }
          if (((s = r.substring(n + 1)), _(a)))
            try {
              c[a] = decodeURIComponent(s);
            } catch (e) {
              c[a] = s;
            }
        }
        (d && !c[f] && (c[f] = d), e.post({ type: 14, cookies: c }));
      }
    }
    return {
      processConfig: x,
      createTLTSIDCookie: v,
      isCookieWhitelisted: _,
      postAppCookies: E,
      addReqHeaders: S,
      getSIDFromStorage: b,
      setSIDInStorage: T,
      init: function () {
        ((i = e.getConfig() || {}), x(i), w());
      },
      destroy: function () {
        (c && T(h, n),
          window.setTimeout(function () {
            TLT.registerBridgeCallbacks([
              { enabled: !1, cbType: "addRequestHeaders", cbFunction: S },
            ]);
          }));
      },
      onevent: function (e) {
        if ("screenview_load" === e.type)
          m.getValue(i, "appCookieWhitelist.length", 0) && (w(), E());
      },
    };
  }),
  TLT &&
    "function" == typeof TLT.addModule &&
    TLT.addModule("dataLayer", function (e) {
      "use strict";
      let t,
        n,
        o = !1,
        r = !0,
        i = "",
        a = [],
        s = 0,
        l = 0;
      const c = e.utils,
        u = new Set();
      function d(e, t) {
        let n,
          o,
          r,
          i = -1;
        if (!e || !t) return i;
        for (n = 0, o = t.length; n < o && -1 === i; n += 1)
          switch (((r = t[n]), typeof r)) {
            case "string":
              e === r && (i = n);
              break;
            case "object":
              (r.cRegex || (r.cRegex = new RegExp(r.regex, r.flags)),
                (r.cRegex.lastIndex = 0),
                r.cRegex.test(e) && (i = n));
          }
        return i;
      }
      function f(e, t, n, o) {
        let i, a;
        const s = {},
          l = n && n.propertyBlocklist ? n.propertyBlocklist : [],
          u = n && n.rootProperties ? n.rootProperties : {};
        if (!e) return null;
        if (t) {
          if (((t += 1) > 5 && !o) || t > 10)
            return "Serialization error: Exceeds nesting limit (5) or (10) for a permitted property.";
        } else t = 1;
        for (i in e)
          if (Object.prototype.hasOwnProperty.call(e, i))
            if (d(i, l) >= 0)
              c.clog("dataLayer: Not recording blocked property '" + i + "'");
            else {
              if (
                (1 === t && ((o = ""), i in u && (o = i)),
                (!r && !o) ||
                  (t > 5 &&
                    o &&
                    i !== u[o][t - 1] &&
                    n.rootProperties[o][t - 1]))
              )
                continue;
              switch (((a = e[i]), typeof a)) {
                case "object":
                  if (a instanceof Node)
                    a.nodeName
                      ? ((s[i] = a.nodeName.toLowerCase()),
                        a.id && (s[i] += "#" + a.id))
                      : (s[i] = "DOMNode: unknown");
                  else if (a instanceof Window)
                    s[i] = "DOMWindow: " + a.location.href;
                  else
                    try {
                      s[i] = f(a, t, n, o);
                    } catch (e) {
                      s[i] = "Serialization error: " + e.message;
                    }
                  break;
                case "function":
                case "undefined":
                  c.clog("dataLayer: Not recording function value '" + i + "'");
                  break;
                default:
                  (n &&
                    n.privacyPatterns &&
                    (a = c.applyPrivacyPatterns(a, n.privacyPatterns)),
                    (s[i] = a));
              }
            }
        return s;
      }
      function p(e) {
        let t = null;
        if (!e) return t;
        switch (typeof e) {
          case "string":
            t = c.access(e);
            break;
          case "object":
            t = e;
            break;
          case "function":
            try {
              t = e();
            } catch (e) {
              c.clog(
                "dataLayer: Error executing configured dataObject function.",
                e,
              );
            }
        }
        return t;
      }
      function h() {
        let e, t;
        if (o)
          for (t = 0; t < a.length; t += 1)
            if (
              ((e = a[t].rules ? a[t].rules.screenviewBlocklist : []),
              !(d(i, e) >= 0))
            ) {
              let e = p(a[t].dataObject);
              if (!e) return;
              const n = a[t].rules;
              if (
                n &&
                ((r = void 0 === n.includeEverything || n.includeEverything),
                n.privacyPatterns)
              )
                for (let e = n.privacyPatterns.length - 1; e >= 0; e -= 1) {
                  const t = n.privacyPatterns[e];
                  "object" == typeof t.pattern
                    ? (t.cRegex = new RegExp(t.pattern.regex, t.pattern.flags))
                    : n.privacyPatterns.splice(e, 1);
                }
              (e instanceof Array
                ? ((e = e
                    .filter((e) => {
                      if (n && n.filter)
                        for (const t of n.filter) {
                          let n, o;
                          const r = t.matchProperty,
                            i = t.matchValue;
                          let a = !1;
                          return (
                            "[object Arguments]" ===
                            Object.prototype.toString.call(e)
                              ? ((n = e[0]), (o = e[1]), (a = !0))
                              : ((n = e[t.matchProperty]), (o = t.matchValue)),
                            g(e, n, o, r, i, a)
                          );
                        }
                      return !0;
                    })
                    .map((e) => f(e, 0, n))),
                  e.forEach(function (e) {
                    m(e);
                  }))
                : m(f(e, 0, n)),
                (r = !0));
            }
      }
      function g(e, t, n, o, r, i) {
        if (i) {
          if (
            "string" == typeof t &&
            "string" == typeof o &&
            "string" == typeof n &&
            "string" == typeof r &&
            t === o &&
            n === r
          )
            return !0;
          if (
            "string" == typeof t &&
            "string" == typeof o &&
            "object" == typeof n &&
            (null === r || "" === r || void 0 === r) &&
            t === o
          )
            return !0;
          if (
            "string" == typeof t &&
            "string" == typeof o &&
            "string" == typeof n &&
            "object" == typeof r &&
            "object" == typeof r
          ) {
            return new RegExp(r).test(n);
          }
          if (
            "string" == typeof t &&
            "object" == typeof o &&
            "string" == typeof t &&
            (null === r || "" === r || void 0 === r)
          ) {
            return new RegExp(o).test(t);
          }
        } else {
          if ("string" == typeof t && "string" == typeof n && t === n)
            return !0;
          if (
            !(
              "string" != typeof t ||
              "string" != typeof o ||
              "object" != typeof e ||
              (null !== n && "" !== n && void 0 !== n) ||
              (null !== r && "" !== r && void 0 !== r)
            ) &&
            Object.prototype.hasOwnProperty.call(e, o)
          )
            return !0;
          if (
            "string" == typeof t &&
            "string" == typeof o &&
            "object" == typeof e &&
            "object" == typeof r
          ) {
            return new RegExp(r).test(e[o]);
          }
          if (
            "object" == typeof o &&
            "object" == typeof e &&
            (null === r || "" === r || void 0 === r)
          ) {
            const t = Object.keys(e);
            for (const e of t) {
              if (new RegExp(o).test(e)) return !0;
            }
          }
        }
        return !1;
      }
      function m(t) {
        if (!t) return void console.log("TLT null Datalayer object");
        let n;
        try {
          ((n = JSON.stringify(t)), console.log("TLT key:" + n));
        } catch (e) {
          ((n = Object.keys(t)
            .map((e) => `${e}=${t[e]}`)
            .join("_")),
            console.log("TLT fixed key:" + n));
        }
        if (u.has(n))
          return void console.log("TLT duplicate Datalayer object:" + t);
        n && u.add(n);
        const o = { type: 19, dataLayer: t };
        e.post(o);
      }
      function y(e, t) {
        return setTimeout(function () {
          (console.log(`TLT waitDataLog: push ${l} >= ${t.length} - 1 `),
            l >= t.length - 1
              ? (console.log(
                  `TLT log push Datalayer array: =======TLT waitDataLog:${l} >= ${t.length} - 1 `,
                ),
                h())
              : (console.log("TLT not Datalayer array: " + l),
                (l = t.length),
                y(e, t)));
        }, e);
      }
      function v(e) {
        let t;
        if (e && e.dataObject && "string" == typeof e.dataObject) {
          t = e.dataObject.replace(/\window\./, "");
          const n = window[t];
          if (n) w(n, "window['" + e + "']", t);
          else {
            if (((s += 300), s > 5e4))
              return void console.log(
                "TLT Datalayer timeout window['" +
                  e +
                  "'] has never not loaded!!!",
              );
            (setTimeout(function () {
              v(e);
            }, 300),
              console.log(
                "TLT Datalayer timeout window['" + e + "'] has not loaded",
              ));
          }
        } else {
          if (
            !e ||
            (!Array.isArray(e.dataObject) && "object" != typeof e.dataObject)
          )
            return void console.log(
              "TLT empty or null Datalayer configuration object",
            );
          w(e, "trackObj as object", t);
        }
      }
      function w(e, t, o) {
        if (e) {
          if ((console.log("TLT start tracking:" + t), Array.isArray(e))) {
            const t = {
              get: (t, o, r) => (
                "push" == o &&
                  (console.log("TLT Datalayer array update:"),
                  (l = e.length - 1),
                  n && clearTimeout(n),
                  (n = setTimeout(function () {
                    (console.log(`TLT waitDataLog;; push dlArrIndex:${l}`),
                      y(25, e));
                  }, 300))),
                Reflect.get(t, o, r)
              ),
              set: (e, t, n, o) => (
                console.log("TLT Datalayer array set:" + t),
                Reflect.set(e, t, n, o),
                !0
              ),
            };
            window && window[o]
              ? (window[o] = new Proxy(window[o], t))
              : (e = new Proxy(e, t));
          } else if ("object" == typeof e && !Array.isArray(e) && null !== e) {
            new Proxy(e, {
              set: function (e, t, n) {
                return (
                  console.log(
                    `TLT Datalayer object update for the property ${t} has been updated with ${n}`,
                  ),
                  console.log("TLT log Datalayer object"),
                  h(),
                  !0
                );
              },
            }) && h();
          }
        } else console.log("TLT empty or null Datalayer configuration object");
      }
      return {
        init: function () {
          if (((t = e.getConfig()), (o = !0), (a = []), t.dataObjects)) {
            a = t.dataObjects;
            for (const e of a)
              if (e.rules && e.rules.permittedProperties) {
                const t = e.rules.permittedProperties;
                e.rules.rootProperties = {};
                for (let n = 0; n < t.length; n += 1)
                  "string" == typeof t[n] &&
                    ((t[n] = t[n].split(".")),
                    (e.rules.rootProperties[t[n][0]] = t[n]));
              }
          }
        },
        destroy: function () {
          ((t = null), (o = !1));
        },
        onevent: function (e) {
          if (e && "object" == typeof e && e.type)
            switch (e.type) {
              case "load":
                i = "";
                break;
              case "screenview_load":
                ((i = e.name),
                  a &&
                    a.forEach(function (e) {
                      v(e);
                    }));
                break;
              case "click":
              case "pointerdown":
              case "pagehide":
                break;
              case "logDataLayer":
                (e.data && "object" != typeof e.data) || h();
            }
          else c.clog("dataLayer: Invalid event object passed to onevent", e);
        },
        onmessage: function (e) {},
      };
    }),
  !TLT || "function" != typeof TLT.addModule)
)
  throw new Error("Overstat module included but TLT is not defined!!!");
if (
  (TLT.addModule("overstat", function (e) {
    "use strict";
    const t = e.utils,
      n = {},
      o = {
        updateInterval: 250,
        hoverThreshold: 1e3,
        hoverThresholdMax: 12e4,
        gridCellMaxX: 10,
        gridCellMaxY: 10,
        gridCellMinWidth: 20,
        gridCellMinHeight: 20,
      },
      r = 50;
    function i(t) {
      const n = (e.getConfig() || {})[t];
      return "number" == typeof n ? n : o[t];
    }
    function a(n, o) {
      const r = t.getValue(n, "webEvent.target", {}),
        i = t.getValue(r, "element.tagName") || "",
        a = "input" === i.toLowerCase() ? t.getValue(r, "element.type") : "",
        s = t.getTlType(r),
        l = {
          type: 9,
          event: {
            hoverDuration: n.hoverDuration,
            hoverToClick: t.getValue(o, "hoverToClick"),
          },
          target: {
            id: r.id || "",
            idType: r.idType || "",
            name: r.name || "",
            tlType: s,
            type: i,
            subType: a,
            position: {
              width: t.getValue(r, "element.offsetWidth", 0),
              height: t.getValue(r, "element.offsetHeight", 0),
              relXY: n.relXY,
            },
          },
        };
      l.target.id &&
        (r.accessibility && (l.target.accessibility = r.accessibility),
        r.attributes && (l.target.attributes = r.attributes),
        t.clog("Overstat - posted hover event"),
        t.clog(l),
        e.post(l));
    }
    function s(e) {
      return (e && !e.nodeType && e.element && (e = e.element), e);
    }
    function l(e) {
      return (
        !(e = s(e)) ||
        e === document.body ||
        e === document.html ||
        e === document
      );
    }
    function c(e) {
      return (e = s(e)) ? e.parentNode : null;
    }
    function u(e) {
      return (e = s(e)) ? e.offsetParent || e.parentElement || c(e) : null;
    }
    function d(e) {
      const t = (function (e) {
        return (e = s(e)) && e.tagName ? e.tagName.toUpperCase() : "";
      })(e);
      return (
        1 !==
          (function (e) {
            return ((e = s(e)) && e.nodeType) || -1;
          })(e) ||
        "TR" === t ||
        "TBODY" === t ||
        "THEAD" === t
      );
    }
    function f(o, l, c, u) {
      var d;
      ((this.xPath =
        null !== o
          ? (d = o)
            ? d.xPath
              ? d.xPath
              : ((d = s(d)), e.getXPathFromNode(d))
            : ""
          : ""),
        (this.domNode = o),
        (this.hoverDuration = 0),
        (this.hoverUpdateTime = 0),
        (this.gridX = Math.max(l, 0)),
        (this.gridY = Math.max(c, 0)),
        (this.parentKey = ""),
        (this.updateTimer = -1),
        (this.disposed = !1),
        (this.childKeys = {}),
        (this.webEvent = u),
        (this.getKey = function () {
          return this.xPath + ":" + this.gridX + "," + this.gridY;
        }),
        (this.update = function () {
          const e = new Date().getTime(),
            t = this.getKey();
          (0 !== this.hoverUpdateTime &&
            (this.hoverDuration += e - this.hoverUpdateTime),
            (this.hoverUpdateTime = e),
            clearTimeout(this.updateTimer),
            (this.updateTimer = setTimeout(function () {
              !(function (e, t) {
                const o = n[e];
                if (o && o[t]) o[t]();
              })(t, "update");
            }, i("updateInterval"))));
        }),
        (this.dispose = function (e) {
          if (
            (clearTimeout(this.updateTimer),
            delete n[this.getKey()],
            (this.disposed = !0),
            e)
          ) {
            const e = this.clone();
            ((n[e.getKey()] = e), e.update());
          }
        }),
        (this.process = function (e) {
          if ((clearTimeout(this.updateTimer), this.disposed)) return !1;
          let o = !1,
            s = this,
            l = 0;
          if (this.hoverDuration >= i("hoverThreshold")) {
            for (
              this.hoverDuration = Math.min(
                this.hoverDuration,
                i("hoverThresholdMax"),
              ),
                o = !0,
                a(this, { hoverToClick: !!e });
              void 0 !== s && l++ < r;
            )
              (s.dispose(e), (s = n[s.parentKey]));
            l >= r && t.clog("Overstat process() hit iterations limit");
          } else this.dispose(e);
          return o;
        }),
        (this.clone = function () {
          const e = new f(this.domNode, this.gridX, this.gridY);
          return ((e.parentKey = this.parentKey), e);
        }));
    }
    function p(e, n, o) {
      const i = (function (e) {
        if (e && e.position) return { x: e.position.x, y: e.position.y };
        const n =
          (e = s(e)) && e.getBoundingClientRect
            ? e.getBoundingClientRect()
            : null;
        let o = 0,
          i = 0,
          a = o,
          c = i,
          d = 0,
          f = 0,
          p = u(e),
          h = 0;
        for (
          n
            ? ((o = n.left), (i = n.top))
            : e && ((o = e.offsetLeft), (i = e.offsetHeight));
          p && h++ < r && !l(p);
        )
          ((d = p.offsetLeft - (p.scrollLeft || 0)),
            (f = p.offsetTop - (p.scrollTop || 0)),
            (d === a && f === c) || ((o += d), (i += f), (a = d), (c = f)),
            (p = u(p)));
        return (
          h >= r &&
            t.clog("Overstat calculateNodeOffset() hit iterations limit"),
          isNaN(o) && (o = 0),
          isNaN(i) && (i = 0),
          { x: o, y: i }
        );
      })((e = s(e)));
      let a = n - i.x,
        c = o - i.y;
      return (isFinite(a) || (a = 0), isFinite(c) || (c = 0), { x: a, y: c });
    }
    function h(e, t) {
      return (
        (e = Math.floor(1e4 * Math.min(Math.max(e, 0), 1)) / 1e4) +
        "," +
        (t = Math.floor(1e4 * Math.min(Math.max(t, 0), 1)) / 1e4)
      );
    }
    function g(e) {
      let o = e;
      let i = null,
        a = !1,
        s = 0;
      const l = {};
      for (
        l[e.getKey()] = !0;
        void 0 !== o &&
        s++ < r &&
        ((l[o.parentKey] = !0),
        "" !== o.parentKey && o.parentKey !== o.getKey());
      )
        (s >= r && t.clog("Overstat cleanupHoverEvents() hit iterations limit"),
          (o = n[o.parentKey]));
      for (i in n)
        Object.prototype.hasOwnProperty.call(n, i) &&
          !l[i] &&
          ((o = n[i]), o && (a ? o.dispose() : (a = o.process())));
    }
    function m(e, o, r) {
      if ((o || (o = e.target), l(o))) return null;
      if (t.isiOS || t.isAndroid) return null;
      let a, c, y, v, w, b, T;
      return (
        d(o)
          ? (y = m(e, u(o), r))
          : ((a = p(o, e.position.x, e.position.y)),
            (c = (function (e, t, n) {
              const o = (e = s(e)).getBoundingClientRect
                  ? e.getBoundingClientRect()
                  : null,
                r = o ? o.width : e.offsetWidth,
                a = o ? o.height : e.offsetHeight,
                l =
                  r && r > 0
                    ? Math.max(r / i("gridCellMaxX"), i("gridCellMinWidth"))
                    : i("gridCellMinWidth"),
                c =
                  a && a > 0
                    ? Math.max(a / i("gridCellMaxY"), i("gridCellMinHeight"))
                    : i("gridCellMinHeight");
              let u = Math.min(Math.floor(t / l), i("gridCellMaxX")),
                d = Math.min(Math.floor(n / c), i("gridCellMaxY"));
              const f = r > 0 ? t / r : 0,
                p = a > 0 ? n / a : 0;
              let g = "";
              return (
                isFinite(u) || (u = 0),
                isFinite(d) || (d = 0),
                (g = h(f, p)),
                { x: u, y: d, relXY: g }
              );
            })(o, a.x, a.y)),
            (y = new f(o, c.x, c.y, e)),
            (y.relXY = c.relXY),
            (v = y.getKey()),
            n[v] ? (y = n[v]) : (n[v] = y),
            y.update(),
            r ||
              ((T = u(o)),
              T &&
                ((b = m(e, T, !0)),
                null !== b &&
                  ((w = b.getKey()),
                  (v = y.getKey()),
                  v !== w && (y.parentKey = w))),
              g(y))),
        y
      );
    }
    function y(e) {
      (function (e, n) {
        let o = 0;
        if (!n || n === e) return !1;
        for (n = c(n); !l(n) && o++ < r; ) {
          if (n === e) return !0;
          n = c(n);
        }
        return (
          o >= r && t.clog("Overstat isChildOf() hit iterations limit"),
          !1
        );
      })(
        (e = (function (e) {
          return (e.nativeEvent && (e = e.nativeEvent), e);
        })(e)).target,
        e.relatedTarget,
      ) ||
        (function (e, t) {
          let o = null,
            r = null,
            i = !1;
          for (r in n)
            Object.prototype.hasOwnProperty.call(n, r) &&
              ((o = n[r]),
              o &&
                o.domNode === e &&
                o.getKey() !== t &&
                (i ? o.dispose() : (i = o.process())));
        })(e.target);
    }
    function v(o) {
      if (t.getValue(o, "target.id"))
        switch (o.type) {
          case "mousemove":
            m(o);
            break;
          case "mouseout":
            y(o);
            break;
          case "click":
            !(function () {
              let e = null,
                t = null,
                o = !1;
              for (t in n)
                Object.prototype.hasOwnProperty.call(n, t) &&
                  ((e = n[t]), e && (o ? e.dispose() : (o = e.process(!0))));
            })();
            break;
          case "submit":
            e.performFormCompletion(!0);
        }
    }
    return {
      DEBUG: 1,
      formatRelXY: h,
      postUIEvent: a,
      init: function () {},
      destroy: function () {
        let e;
        for (e in n)
          Object.prototype.hasOwnProperty.call(n, e) &&
            (n[e].dispose(), delete n[e]);
      },
      onevent: function (e) {
        "object" == typeof e && e.type && v(e);
      },
      onmessage: function (e) {},
      createHoverEvent: function (e, t, n, o) {
        return new f(e, t, n, o);
      },
      cleanupHoverEvents: g,
      eventMap: n,
    };
  }),
  !TLT || "function" != typeof TLT.addModule)
)
  throw new Error("Performance module included but TLT is not defined!!!");
(TLT.addModule("performance", function (e) {
  "use strict";
  const t = { loadReceived: !1, unloadReceived: !1, perfEventSent: !1 };
  let n,
    o = null,
    r = null,
    i = {},
    a = 0;
  const s = e.utils,
    l = "https:" === window.location.protocol;
  let c,
    u,
    d = [],
    f = 0;
  const p = { enabled: !1, resourceTypes: [], blacklist: [] };
  function h(e) {
    let t = 0,
      n = "",
      o = 0;
    const r = {};
    if (!e || "object" != typeof e || !e.navigationStart) return {};
    for (n in ((t = e.navigationStart), e))
      (Object.prototype.hasOwnProperty.call(e, n) || "number" == typeof e[n]) &&
        ((o = e[n]),
        (r[n] =
          "number" == typeof o && o && "navigationStart" !== n ? o - t : o));
    return r;
  }
  function g(e) {
    let t,
      n,
      o = 0;
    return (
      e &&
        ((t =
          e.responseEnd > 0 && e.responseEnd < e.domLoading
            ? e.responseEnd
            : e.domLoading),
        (n = e.loadEventStart),
        s.isNumeric(t) && s.isNumeric(n) && n > t && (o = n - t)),
      o
    );
  }
  function m(r, i) {
    let s, l, c;
    const u = { type: 7, performance: {} };
    let d, f;
    if (!r || t.perfEventSent) return;
    const p = r.performance || {},
      m = p.timing,
      y = p.navigation;
    if (m) {
      if (!m.loadEventStart && !i) return;
      ((u.performance.timing = h(m)), (u.performance.timing.renderTime = g(m)));
    } else {
      if (!n.calculateRenderTime) return;
      u.performance.timing = { renderTime: a, calculated: !0 };
    }
    const v = u.performance.timing;
    if (
      (n.renderTimeThreshold &&
        v.renderTime > n.renderTimeThreshold &&
        ((v.invalidRenderTime = v.renderTime), delete v.renderTime),
      p.getEntriesByType)
    )
      for (d = p.getEntriesByType("paint"), s = 0, l = d.length; s < l; s += 1)
        ((f = d[s]), f.startTime > 0 && (v[f.name] = Math.round(f.startTime)));
    if (
      (!v["first-paint"] &&
        v.msFirstPaint &&
        ((v["first-paint"] = v.msFirstPaint), delete v.msFirstPaint),
      y)
    ) {
      switch (y.type) {
        case 0:
          c = "NAVIGATE";
          break;
        case 1:
          c = "RELOAD";
          break;
        case 2:
          c = "BACKFORWARD";
          break;
        default:
          c = "UNKNOWN";
      }
      u.performance.navigation = { type: c, redirectCount: y.redirectCount };
    }
    (e.post(u), (t.perfEventSent = !0), o && (clearInterval(o), (o = null)));
  }
  function y(t) {
    const n = { type: 20, violations: {} },
      o = n.violations;
    t &&
      t.length &&
      ((o.total = t.length), t.splice(10), (o.urls = t), e.post(n));
  }
  function v(t) {
    let n;
    const o = u.blacklist;
    let r, i, a;
    if (!t || !t.name) return;
    const s = t.name,
      c = t.initiatorType;
    if (
      (l && 0 === s.indexOf("http:") && d.push(s),
      !(
        (Object.prototype.hasOwnProperty.call(u, "maxAlerts") &&
          f >= u.maxAlerts) ||
        (Object.prototype.hasOwnProperty.call(u, "threshold") &&
          t.duration < u.threshold) ||
        (t.transferSize && t.transferSize < t.encodedBodySize) ||
        t.responseStart === t.responseEnd ||
        (u.resourceTypes.length > 0 && -1 === u.resourceTypes.indexOf(c))
      ))
    ) {
      for (i = !1, n = 0; n < o.length; n += 1)
        switch (((r = o[n]), typeof r)) {
          case "object":
            (r.cRegex || (r.cRegex = new RegExp(r.regex, r.flags)),
              (r.cRegex.lastIndex = 0),
              r.cRegex.test(s) && (i = !0));
            break;
          case "string":
            -1 !== s.indexOf(r) && (i = !0);
        }
      i ||
        ((f += 1),
        (a = {
          urlNormalized: e.normalizeUrl(s, 17),
          url: s,
          initiator: c,
          duration: Math.round(t.duration),
          responseEnd: Math.round(t.responseEnd),
        }),
        void 0 !== t.transferSize &&
          ((a.transferSize = t.transferSize),
          t.duration &&
            (a.bps = Math.round((t.transferSize / t.duration) * 1e3))),
        e.post({ type: 17, resourceData: a }));
    }
  }
  function w() {
    ((i = {}), r && (clearTimeout(r), (r = null)));
  }
  function b() {
    const t = { type: 20, pageExperience: s.clone(i) };
    (i.fid || i.lcp || i.cls) &&
      ((t.pageExperience.https = "https:" === window.location.protocol),
      e.post(t),
      w());
  }
  function T(e) {
    if (e && e.name) {
      switch (e.name) {
        case "FID":
          i.fid = Math.round(e.value);
          break;
        case "LCP":
          i.lcp = Math.round(e.value);
          break;
        case "CLS":
          i.cls = Number(e.value.toFixed(2));
      }
      void 0 !== i.fid && void 0 !== i.lcp && void 0 !== i.cls && b();
    }
  }
  function S() {
    if (!n || !n.pageExperience || !n.pageExperience.enabled) return;
    w();
    const e = n.pageExperience.api;
    (e.getCLS(T), e.getLCP(T), e.getFID(T), (r = setTimeout(b, 3e5)));
  }
  function x() {
    if (!n || !s.getValue(n, "pageExperience.enabled", !0)) return;
    n.pageExperience = n.pageExperience || {};
    const e = n.pageExperience;
    (!e.api &&
      window.webVitals &&
      (e.api = {
        getCLS: webVitals.getCLS,
        getLCP: webVitals.getLCP,
        getFID: webVitals.getFID,
      }),
      e.api
        ? (e.enabled = !0)
        : ((e.enabled = !1),
          s.clog(
            "Performance Module: Web Vitals JS not found. Page Experience Signals will not be logged.",
          )));
  }
  return {
    parseTiming: h,
    getRenderTime: g,
    postPerformanceEvent: m,
    postMixedModeViolations: y,
    processPerformanceEntry: v,
    initPageExperience: x,
    logPageExperience: S,
    collectVitals: T,
    postPageExperienceMsg: b,
    init: function () {
      ((n = e.getConfig()), (u = s.mixin({}, p, n.performanceAlert)), x());
    },
    destroy: function () {
      (b(),
        o && (clearInterval(o), (o = null), m(window, !0)),
        c && c.disconnect(),
        l && (y(d), (d = [])),
        (n = null));
    },
    onevent: function (r) {
      if ("object" == typeof r && r.type)
        switch (r.type) {
          case "load":
            ((t.loadReceived = !0),
              (function (t) {
                const n = e.getStartTime();
                t.timestamp > n && !a && (a = t.timestamp - n);
              })(r),
              t.perfEventSent ||
                o ||
                (o = setInterval(
                  function () {
                    e.isInitialized() && m(window);
                  },
                  s.getValue(n, "delay", 2e3),
                )),
              (function () {
                if (
                  !u.enabled ||
                  "function" != typeof window.PerformanceObserver
                )
                  return;
                c = new window.PerformanceObserver(function (e, t) {
                  s.forEach(e.getEntries(), v);
                });
                const e = window.performance.getEntriesByType("resource");
                (setTimeout(function () {
                  s.forEach(e, v);
                }),
                  c.observe({ entryTypes: ["resource"] }));
              })());
            break;
          case "screenview_load":
            (S(), t.perfEventSent || m(window));
            break;
          case "screenview_unload":
          default:
            break;
          case "pagehide":
            ((t.unloadReceived = !0), b(), t.perfEventSent || m(window));
        }
      else s.clog("Invalid event object passed to onevent: ", r);
    },
    onmessage: function (e) {},
  };
}),
  TLT.addModule("replay", function (e) {
    "use strict";
    const t = e.utils;
    let n = 0;
    const o = { scale: 0, timestamp: 0 },
      r = {};
    let i = null,
      a = [],
      s = !0,
      l = null,
      c = null,
      u = 0,
      d = null;
    const f = new Date().getTime();
    let p = null;
    const h = "root";
    let g,
      m = null,
      y = null,
      v = null,
      w = null,
      b = null,
      T = { inFocus: !1 },
      S = null,
      x = e.getConfig() || {};
    const _ = t.getValue(x, "viewPortWidthHeightLimit", 1e4);
    let E = 1,
      C = 1;
    const L = {},
      O = t.getValue(x, "mousemove") || {},
      k = t.getValue(x, "tab", !1),
      I = O.sampleRate,
      D = O.ignoreRadius;
    let P = null,
      M = {},
      A = 0;
    let R = 0,
      j = [],
      N = "visible" === document.visibilityState;
    const z = [],
      U = [],
      H = [];
    function V(e) {
      let t = !1,
        n = null;
      if ("object" != typeof e || !e.type) return t;
      switch (e.type.toLowerCase()) {
        case "input":
          ((n = "|" + (e.subType || "") + "|"),
            (t =
              -1 !== "|button|image|submit|reset|".indexOf(n.toLowerCase())));
          break;
        case "select":
        case "textarea":
          break;
        default:
          t = !0;
      }
      return t;
    }
    function F(e) {
      const t = [];
      for (e = e.parentNode; e; ) (t.push(e), (e = e.parentNode));
      return t;
    }
    function X(e) {
      return t.some(e, function (e) {
        const n = t.getTagName(e);
        return "a" === n || "button" === n ? e : null;
      });
    }
    function q(e) {
      let t = e.type;
      const n = e.target;
      if (
        ((t = "string" == typeof t ? t.toLowerCase() : "unknown"),
        "blur" === t && (t = "focusout"),
        "change" === t)
      )
        if ("INPUT" === n.type)
          switch (n.subType) {
            case "text":
            case "date":
            case "time":
              t = n.subType + "Change";
              break;
            default:
              t = "valueChange";
          }
        else t = "TEXTAREA" === n.type ? "textChange" : "valueChange";
      return t;
    }
    function B(e, t, n) {
      let o, r, i;
      if (document.querySelector(e)) return !0;
      for (o = 0; o < t.length; o++)
        if (((i = t[o]), i.querySelector(e))) return !0;
      for (o = 0; o < n.length; o++)
        if (((r = n[o]), r.querySelector(e))) return !0;
      return !1;
    }
    function W(n, o, r) {
      let i, a, s, l, c, u, d, f, p;
      for (i = 0; i < z.length; i++)
        ((d = z[i]),
          (a = d.delayUntil.selector),
          (s = t.getValue(d.delayUntil, "exists", !0)),
          (l = d.delayUntil.dualSnapshot || !1),
          (c = B(a, o, r)),
          (u = d.lastStatus || !1),
          (f = d.config || {}),
          (p = d.timerId),
          ((!0 === s && !0 === c && !1 === u) ||
            (!1 === s && !1 === c && !0 === u) ||
            (!0 === l && !0 === c && !1 === u) ||
            (!0 === l && !1 === c && !0 === u)) &&
            (e.performDOMCapture(document, f),
            (l && !1 !== c) ||
              (z.splice(i--, 1),
              0 === z.length && TLT.registerMutationCallback(W, !1),
              p && clearTimeout(p))),
          (d.lastStatus = c));
    }
    function Y(n, o, r) {
      let i,
        a = null;
      return n
        ? (((o = o || {}).eventOn = s),
          (s = !1),
          r
            ? ((a =
                "dcid-" +
                t.getSerialNumber() +
                "." +
                new Date().getTime() +
                "s"),
              "object" == typeof r
                ? ((o.dcid = a),
                  (i = { config: o, delayUntil: r, lastStatus: !1 }),
                  z.push(i),
                  TLT.registerMutationCallback(W, !0),
                  r &&
                    void 0 !== r.timeout &&
                    r.timeout >= 0 &&
                    (i.timerId = window.setTimeout(function () {
                      !(function (t) {
                        let n, o, r;
                        for (n = 0; n < z.length; n += 1)
                          ((o = z[n]),
                            (r = o.config || {}),
                            r.dcid === t &&
                              ((r.timeoutExpired = !0),
                              e.performDOMCapture(document, r),
                              z.splice(n--, 1),
                              0 === z.length &&
                                TLT.registerMutationCallback(W, !1)));
                      })(a);
                    }, r.timeout)))
                : window.setTimeout(function () {
                    ((o.dcid = a), e.performDOMCapture(n, o));
                  }, r))
            : (delete o.dcid, (a = e.performDOMCapture(n, o))),
          a)
        : a;
    }
    function K(t, n) {
      let o, r, i, a;
      for (o = 0, r = t.length; o < r; o += 1)
        switch (
          ((i = t[o]),
          (a =
            n && 0 === n.indexOf("#")
              ? location.pathname + n
              : void 0 === n || n === h
                ? location.pathname + location.hash
                : n),
          (a = e.normalizeUrl(a, 2)),
          typeof i)
        ) {
          case "object":
            if (
              (i.cRegex || (i.cRegex = new RegExp(i.regex, i.flags)),
              (i.cRegex.lastIndex = 0),
              i.cRegex.test(a))
            )
              return !0;
            break;
          case "string":
            if (i === a) return !0;
        }
      return !1;
    }
    function J() {
      let t = !1;
      if (
        !O.enabled ||
        Object.prototype.hasOwnProperty.call(window, "ontouchstart")
      )
        return;
      if (0 === U.length) return;
      A >= 1e3 && (t = !0);
      const n = {
        type: 18,
        mousemove: {
          elements: H.slice(0),
          data: U.slice(0),
          config: { ignoreRadius: O.ignoreRadius, sampleRate: O.sampleRate },
          limitReached: t,
          maxInactivity: R,
        },
      };
      return (e.post(n), (H.length = 0), (U.length = 0), (M = {}), (R = 0), n);
    }
    function Q(n, o, r) {
      let i,
        a,
        s = !1;
      const l = {};
      let c,
        u,
        d,
        f,
        p,
        h = !1,
        g = null,
        m = 0;
      if (!n || (!o && !r)) return g;
      if (!o && "load" !== n && "pagehide" !== n) return g;
      if (
        ((x = e.getConfig() || {}),
        (h = t.getValue(x, "domCapture.enabled", !1)),
        !h || t.isLegacyIE)
      )
        return g;
      if (K(t.getValue(x, "domCapture.screenviewBlacklist", []), r)) return g;
      const y = t.getValue(x, "domCapture.triggers") || [];
      for (i = 0, u = y.length; !s && i < u; i += 1) {
        if (((c = y[i]), c.event === n))
          if ("load" === n || "pagehide" === n)
            if (c.screenviews)
              for (f = c.screenviews, a = 0, p = f.length; !s && a < p; a += 1)
                switch (((d = f[a]), typeof d)) {
                  case "object":
                    (d.cRegex || (d.cRegex = new RegExp(d.regex, d.flags)),
                      (d.cRegex.lastIndex = 0),
                      (s = d.cRegex.test(r)));
                    break;
                  case "string":
                    s = d === r;
                }
            else s = !0;
          else s = !c.targets || -1 !== t.matchTarget(c.targets, o);
        "change" === c.event && c.delayUntil && (j = j.concat(c.targets));
      }
      return (
        s &&
          ((m = c.delay || c.delayUntil || ("load" === c.event ? 7 : 0)),
          (l.forceFullDOM = !!c.fullDOMCapture),
          (g = Y(window.document, l, m)),
          g && J()),
        g
      );
    }
    function $(e) {
      let n = null;
      const o = t.getValue(e, "webEvent.target", {}),
        r = o.type,
        i = o.subType || "",
        a = t.getTlType(o),
        s = F(t.getValue(o, "element")),
        l = t.getValue(e, "webEvent.subType", null),
        c = {
          timestamp: t.getValue(e, "webEvent.timestamp", 0),
          type: 4,
          target: {
            id: o.id || "",
            idType: o.idType,
            name: o.name,
            tlType: a,
            type: r,
            position: {
              width: t.getValue(o, "size.width"),
              height: t.getValue(o, "size.height"),
            },
            currState: e.currState || null,
          },
          event: {
            tlEvent: q(t.getValue(e, "webEvent")),
            type: t.getValue(e, "webEvent.type", "UNKNOWN"),
          },
        };
      return (
        o.accessibility && (c.target.accessibility = o.accessibility),
        o.attributes && (c.target.attributes = o.attributes),
        i && (c.target.subType = i),
        "number" == typeof e.dwell && e.dwell > 0 && (c.target.dwell = e.dwell),
        "number" == typeof e.visitedCount &&
          (c.target.visitedCount = e.visitedCount),
        void 0 !== e.prevState && (c.prevState = e.prevState),
        l && (c.event.subType = l),
        (n = X(s)),
        (c.target.isParentLink = !!n),
        n &&
          (n.href &&
            ((c.target.currState = c.target.currState || {}),
            (c.target.currState.href = c.target.currState.href || n.href)),
          n.value &&
            ((c.target.currState = c.target.currState || {}),
            (c.target.currState.value = c.target.currState.value || n.value)),
          (n.innerText || n.textContent) &&
            ((c.target.currState = c.target.currState || {}),
            (c.target.currState.innerText = t.trim(
              c.target.currState.innerText || n.innerText || n.textContent,
            )))),
        t.isUndefOrNull(c.target.currState) && delete c.target.currState,
        t.isUndefOrNull(c.target.name) && delete c.target.name,
        c
      );
    }
    function G(t) {
      e.post(t);
    }
    function Z(t) {
      let n, o, r, i, a;
      const s = { mouseout: !0, mouseover: !0 },
        l = [],
        c = t.length;
      for (n = 0; n < c; n += 1)
        if (((r = t[n]), r))
          if (s[r.event.type]) l.push(r);
          else {
            for (o = n + 1; o < c && t[o] && s[t[o].event.type]; o += 1);
            (o < c &&
              ((i = t[o]),
              i &&
                r.target.id === i.target.id &&
                r.event.type !== i.event.type &&
                ("click" === r.event.type && ((a = r), (r = i), (i = a)),
                "click" === i.event.type
                  ? ((r.target.position = i.target.position), (n += 1))
                  : "blur" === i.event.type &&
                    ((r.target.dwell = i.target.dwell),
                    (r.target.visitedCount = i.target.visitedCount),
                    (r.focusInOffset = i.focusInOffset),
                    (r.target.position = i.target.position),
                    (n += 1)),
                (t[o] = null),
                (t[n] = r))),
              l.push(t[n]));
          }
      for (r = l.shift(); r; r = l.shift()) e.post(r);
      t.splice(0, t.length);
    }
    function ee(e, n) {
      a.push(
        $({ webEvent: e, id: n, currState: t.getValue(e, "target.state") }),
      );
    }
    function te(e, n, o) {
      let i,
        s,
        l = !1;
      if (!e) return;
      if (0 === a.length) return;
      if (!(n = n || (r[e] ? r[e].webEvent : {}))) return;
      ((s =
        "blur" === n.type || "change" === n.type
          ? t.getValue(n, "target.state", {})
          : (n.target && t.getTargetState(n.target.element)) || {}),
        s && s.disabled && (o = !0));
      const c = a[a.length - 1];
      (r[e]
        ? ((c.focusInOffset = r[e].focusInOffset),
          (c.target.visitedCount = r[e].visitedCount),
          r[e].focus &&
            ((r[e].dwell = Number(new Date()) - r[e].focus),
            (c.target.dwell = r[e].dwell)),
          r[e].processedChange ||
            !r[e].prevState ||
            o ||
            t.isEqual(r[e].prevState, s) ||
            ((n.type = "change"),
            (c.event.type = n.type),
            (c.event.tlEvent = q(n)),
            (c.target.prevState = r[e].prevState),
            (c.target.currState = s)))
        : (r[e] = {}),
        "click" === c.event.type
          ? V(c.target) || ((c.target.currState = s), (l = !0))
          : "focus" === c.event.type && (l = !0),
        l && !o && ((c.event.type = "blur"), (c.event.tlEvent = "focusout")),
        c.dcid || ((i = Q(c.event.type, n.target)), i && (c.dcid = i)),
        o || (T.inFocus = !1),
        (r[e].prevState = s ? t.mixin({}, s) : s),
        Z(a));
    }
    function ne(e, n) {
      const o = a.length,
        i = o ? a[o - 1] : null;
      T.inFocus && T.target.id === e
        ? (i && i.target.id === e) ||
          (ee(n, e), (r[e].processedChange = !1), (r[e].processedClick = !1))
        : (T.inFocus && te(T.target.id, T),
          (T = n),
          (T.inFocus = !0),
          r[e] || (r[e] = {}),
          (r[e].focus = T.dwellStart = Number(new Date())),
          (r[e].focusInOffset = y ? T.dwellStart - Number(y) : -1),
          "focus" === n.type
            ? (r[e].prevState = t.getValue(n, "target.state"))
            : "click" !== n.type ||
              r[e].prevState ||
              ((r[e].prevState = t.getValue(n, "target.state")),
              !r[e].prevState ||
                ("checkbox" !== n.target.subType &&
                  "radio" !== n.target.subType) ||
                (r[e].prevState.checked = !r[e].prevState.checked)),
          (r[e].visitedCount = r[e].visitedCount + 1 || 1),
          (r[e].webEvent = n),
          (r[e].processedChange = !1),
          (r[e].processedClick = !1),
          a.length &&
            console.warn("Focus on [" + e + "] but tmpQueue is not empty!", a),
          ee(n, e));
    }
    function oe(e, n) {
      ne(e, n);
      const o = a[a.length - 1];
      ((o.event.type = "change"),
        (o.event.tlEvent = q(n)),
        (o.target.currState = n.target.state),
        r[e].prevState &&
          ((o.target.prevState = r[e].prevState),
          "boolean" == typeof o.target.currState.checked &&
            (o.target.prevState.checked = !o.target.currState.checked)),
        (r[e].webEvent = n),
        (r[e].processedChange = !0),
        -1 !== t.matchTarget(j, n.target) && te(e, n));
    }
    function re(e, n) {
      if ("select" === n.target.type && S && S.target.id === e)
        return void (S = null);
      ne(e, n);
      const o = a[a.length - 1];
      "focus" === o.event.type &&
        ((o.event.type = "click"), (o.event.tlEvent = q(n)));
      const i = n.nativeEvent;
      (i &&
        (!window.MouseEvent ||
          !(i instanceof MouseEvent && 0 === i.detail) ||
          (window.PointerEvent &&
            i instanceof PointerEvent &&
            "" !== i.pointerType)) &&
        (o.target.position.relXY = t.getValue(n, "target.position.relXY")),
        r[e].processedChange || (r[e].webEvent = n),
        (r[e].processedClick = !0),
        V(n.target) && te(e, n, !0),
        (S = n));
    }
    function ie(e, n) {
      const o = e;
      if (t.getValue(n, "target.element.disabled", !1))
        switch (n.type) {
          case "pointerdown":
            d = o;
            break;
          case "pointerup":
            (o === d && ((n.type = "click"), re(e, n)), (d = null));
        }
    }
    function ae(n) {
      let o,
        r,
        i,
        a = 0,
        s = 0;
      if (
        !O.enabled ||
        Object.prototype.hasOwnProperty.call(window, "ontouchstart")
      )
        return;
      if (A >= 1e3) return;
      const l = {
        element: { id: n.target.id, idType: n.target.idType },
        x: n.position.x,
        y: n.position.y,
        offset: e.getCurrentOffset(),
      };
      if (null !== P) {
        if (((a = l.offset - P.offset), I && a < I)) return;
        if (
          ((r = Math.abs(l.x - P.x)),
          (i = Math.abs(l.y - P.y)),
          (s = r > i ? r : i),
          D && s < D)
        )
          return;
        a > R && (R = a);
      }
      const c = JSON.stringify(l.element);
      ((o = M[c]),
        void 0 === o && (H.push(l.element), (o = H.length - 1), (M[c] = o)));
      const u = t.getValue(n, "target.position.relXY").split(",");
      (U.push([o, u[0], u[1], l.offset]), (A += 1), (P = l));
    }
    function se(e) {
      const o = e.orientation;
      (G({
        type: 4,
        event: { type: "orientationchange" },
        target: {
          prevState: {
            orientation: n,
            orientationMode: t.getOrientationMode(n),
          },
          currState: {
            orientation: o,
            orientationMode: t.getOrientationMode(o),
          },
        },
      }),
        (n = o));
    }
    function le() {
      let e;
      const t = E - C;
      return (
        (e = isNaN(t) ? "INVALID" : t < 0 ? "CLOSE" : t > 0 ? "OPEN" : "NONE"),
        e
      );
    }
    function ce() {
      let e;
      (l &&
        ((e = l.clientState),
        e.viewPortHeight > 0 &&
          e.viewPortHeight < _ &&
          e.viewPortWidth > 0 &&
          e.viewPortWidth < _ &&
          G(l),
        (c = l),
        (l = null),
        (v = b || v),
        (w = null)),
        (ce.timeoutId = 0));
    }
    function ue(e) {
      let n = null;
      if (!t.isOperaMini)
        return (
          (l = (function (e) {
            const n = document.documentElement || {},
              o = document.body || {},
              r = window.screen,
              i = r.width,
              a = r.height,
              s = t.getValue(e, "orientation", 0);
            let l;
            const u = {
                type: 1,
                clientState: {
                  pageWidth: Math.max(
                    o.clientWidth || 0,
                    n.offsetWidth || 0,
                    n.scrollWidth || 0,
                  ),
                  pageHeight: Math.max(
                    o.clientHeight || 0,
                    n.offsetHeight || 0,
                    n.scrollHeight || 0,
                  ),
                  viewPortWidth: window.innerWidth || n.clientWidth,
                  viewPortHeight: window.innerHeight || n.clientHeight,
                  viewPortX: Math.round(
                    window.pageXOffset || (n || o).scrollLeft || 0,
                  ),
                  viewPortY: Math.round(
                    window.pageYOffset || (n || o).scrollTop || 0,
                  ),
                  deviceOrientation: s,
                  event: t.getValue(e, "type"),
                },
              },
              d = u.clientState;
            ((l = t.isiOS && 90 === Math.abs(s) ? a : i),
              (c = c || u),
              "pagehide" === d.event &&
                d.viewPortHeight === d.pageHeight &&
                d.viewPortWidth === d.pageWidth &&
                c.clientState.viewPortHeight < d.viewPortHeight &&
                ((d.viewPortHeight = c.clientState.viewPortHeight),
                (d.viewPortWidth = c.clientState.viewPortWidth)),
              d.viewPortY + d.viewPortHeight > d.pageHeight &&
                (d.viewPortY = d.pageHeight - d.viewPortHeight),
              d.viewPortY < 0 && (d.viewPortY = 0));
            const f = d.viewPortWidth ? l / d.viewPortWidth : 1;
            return (
              (d.deviceScale = f.toFixed(3)),
              (d.viewTime = 0),
              v && w && (d.viewTime = w.getTime() - v.getTime()),
              "scroll" === e.type &&
                ((d.viewPortXStart = c.clientState.viewPortX),
                (d.viewPortYStart = c.clientState.viewPortY)),
              u
            );
          })(e)),
          "scroll" === e.type || "resize" === e.type
            ? (ce.timeoutId && window.clearTimeout(ce.timeoutId),
              (ce.timeoutId = window.setTimeout(
                ce,
                t.getValue(x, "scrollTimeout", 2e3),
              )))
            : "touchstart" === e.type || "load" === e.type
              ? l && (C = parseFloat(l.clientState.deviceScale))
              : "touchend" === e.type &&
                l &&
                ((E = parseFloat(l.clientState.deviceScale)), ce()),
          ("load" !== e.type && "pagehide" !== e.type) ||
            ("pagehide" === e.type &&
              f &&
              ((n = t.clone(l)),
              (n.clientState.event = "attention"),
              (n.clientState.viewTime = new Date().getTime() - f)),
            ce(),
            n && ((l = n), ce())),
          l
        );
    }
    function de(e, n) {
      const o = ["type", "name", "target.id"];
      let r,
        i,
        a = null,
        s = !0;
      let l = 0,
        c = 0,
        u = 0;
      if (!e || !n || "object" != typeof e || "object" != typeof n) return !1;
      for (r = 0, i = o.length; s && r < i; r += 1)
        if (((a = o[r]), t.getValue(e, a) !== t.getValue(n, a))) {
          s = !1;
          break;
        }
      return (
        s &&
          ((c = t.getValue(e, "timestamp")),
          (u = t.getValue(n, "timestamp")),
          (isNaN(c) && isNaN(u)) ||
            ((l = Math.abs(
              t.getValue(e, "timestamp") - t.getValue(n, "timestamp"),
            )),
            (isNaN(l) || l > 10) && (s = !1))),
        s
      );
    }
    function fe(e) {
      const n = {
          type: 4,
          event: { tlEvent: q(e), type: e.type },
          target: {
            id: t.getValue(e, "target.id"),
            idType: t.getValue(e, "target.idType"),
            currState: t.getValue(e, "target.state"),
          },
        },
        o = Q(e.type, e.target);
      (o && (n.dcid = o), G(n));
    }
    function pe(t) {
      let n,
        o,
        r = null;
      for (n in L)
        Object.prototype.hasOwnProperty.call(L, n) &&
          ((o = L[n].exception),
          o.repeats > 1 && ((r = { type: 6, exception: o }), e.post(r)));
      (a && Z(a),
        (w = new Date()),
        ue(t),
        (g !== h && e.normalizeUrl(location.hash, 2) !== g) ||
          TLT.logScreenviewUnload(g));
    }
    function he() {
      g = t.getValue(x, "forceRootScreenview", !1)
        ? h
        : e.normalizeUrl(location.hash, 2) || h;
    }
    return {
      currOrientation: n,
      pastEvents: r,
      lastEventId: i,
      getTmpQueue: function () {
        return a;
      },
      getPendingQueue: function () {
        return z;
      },
      getTabConfig: function () {
        return k;
      },
      postEventQueue: Z,
      eventCounter: 0,
      curClientState: l,
      getViewEventStart: function () {
        return m;
      },
      setViewEventStart: function (e) {
        m = e;
      },
      viewTimeStart: y,
      parentElements: F,
      getParentLink: X,
      createQueueEvent: $,
      postUIEvent: G,
      handleFocus: ne,
      handleBlur: te,
      handleChange: oe,
      handleClick: re,
      handleOrientationChange: se,
      handleClientState: ue,
      getPinchType: le,
      saveTouchState: function (e) {
        ((o.scale = e.scale),
          (o.rotation = e.rotation),
          (o.timestamp = new Date().getTime()));
      },
      isDuplicateTouch: function (e) {
        let t = !1;
        return e
          ? ((t =
              o.scale === e.scale &&
              Math.abs(new Date().getTime() - o.timestamp) < 500),
            t)
          : t;
      },
      getTlEvent: q,
      isDuplicateEvent: de,
      scheduleDOMCapture: Y,
      addDOMCapture: Q,
      mutationDomCapture: W,
      isTargetClickable: V,
      defaultEventHandler: fe,
      isScreenviewBlacklisted: K,
      handleMousemove: ae,
      logMousemove: J,
      init: function () {
        a = [];
      },
      destroy: function () {
        (te(i),
          (a = []),
          ce.timeoutId &&
            (window.clearTimeout(ce.timeoutId), (ce.timeoutId = 0)));
      },
      onevent: function (o) {
        let s,
          l,
          c = null,
          d = null;
        if ("object" == typeof o && o.type) {
          if (!de(o, p)) {
            switch (
              ((p = o),
            //   "undefined" != typeof console &&
            //     console.log("Replay event[" + o.type + "]: ", o),
              (c = t.getValue(o, "target.id")),
              r[c] || (r[c] = {}),
              (function (e, n) {
                let o = !1;
                const i = a.length,
                  s = i ? a[i - 1] : null;
                if (!s) return o;
                const l = s.target.id;
                (l !== e &&
                  "selectList" !== s.target.tltype &&
                  (("focus" !== n.type &&
                    "click" !== n.type &&
                    "change" !== n.type &&
                    "blur" !== n.type &&
                    "pagehide" !== n.type) ||
                    (te(l), (o = !0))),
                  l === e &&
                    (("click" === n.type && r[e].processedClick) ||
                      ("change" === n.type && r[e].processedChange) ||
                      ("pointerup" === n.type &&
                        r[e].processedClick &&
                        t.getValue(n.target, "state.disabled", !1))) &&
                    (te(l, null, !0), (o = !0)));
              })(c, o),
              o.type)
            ) {
              case "hashchange":
                break;
              case "focus":
                ne(c, o);
                break;
              case "blur":
                te(c, o);
                break;
              case "pointerdown":
              case "pointerup":
                ie(c, o);
                break;
              case "click":
                re(c, o);
                break;
              case "change":
                oe(c, o);
                break;
              case "orientationchange":
                se(o);
                break;
              case "touchstart":
                !(function (e) {
                  2 === t.getValue(e, "nativeEvent.touches.length", 0) && ue(e);
                })(o);
                break;
              case "touchend":
                !(function (e) {
                  const n = {},
                    o =
                      t.getValue(e, "nativeEvent.rotation", 0) ||
                      t.getValue(
                        e,
                        "nativeEvent.touches[0].webkitRotationAngle",
                        0,
                      );
                  let r = null;
                  const i = {
                    type: 4,
                    event: { type: "touchend" },
                    target: {
                      id: t.getValue(e, "target.id"),
                      idType: t.getValue(e, "target.idType"),
                    },
                  };
                  2 ===
                    t.getValue(e, "nativeEvent.changedTouches.length", 0) +
                      t.getValue(e, "nativeEvent.touches.length", 0) &&
                    (ue(e),
                    (r = {
                      rotation: o ? o.toFixed(2) : 0,
                      scale: E ? E.toFixed(2) : 1,
                    }),
                    (r.pinch = le()),
                    (n.scale = C ? C.toFixed(2) : 1),
                    (i.target.prevState = n),
                    (i.target.currState = r),
                    G(i));
                })(o);
                break;
              case "loadWithFrames":
                TLT.logScreenviewLoad("rootWithFrames");
                break;
              case "load":
                ((n = o.orientation),
                  (v = new Date()),
                  ("number" != typeof t.getOrientationAngle() || t.isAndroid) &&
                    ((l = window.screen.width > window.screen.height ? 90 : 0),
                    (s = t.getOrientationAngle()),
                    Math.abs(s) === l ||
                      (180 === s && 0 === l) ||
                      (270 === s && 90 === l) ||
                      ((t.isLandscapeZeroDegrees = !0),
                      180 === Math.abs(s) || 0 === Math.abs(s)
                        ? (n = 90)
                        : (90 !== Math.abs(s) && 270 !== Math.abs(s)) ||
                          (n = 0))),
                  setTimeout(function () {
                    e.isInitialized() && ue(o);
                  }, 100),
                  he(),
                  TLT.logScreenviewLoad(g));
                break;
              case "screenview_load":
                ((y = new Date()),
                  (function () {
                    let e;
                    for (e in r)
                      Object.prototype.hasOwnProperty.call(r, e) &&
                        (r[e].visitedCount = 0);
                  })(),
                  (d = Q("load", null, o.name)));
                break;
              case "screenview_unload":
                d = Q("pagehide", null, o.name);
                break;
              case "resize":
              case "scroll":
                (w || (w = new Date()), (b = new Date()), ue(o));
                break;
              case "pagehide":
                pe(o);
                break;
              case "mousemove":
                ae(o);
                break;
              case "error":
                !(function (n) {
                  let o;
                  const r = t.getValue(n, "nativeEvent.message");
                  let i = t.getValue(n, "nativeEvent.filename", "");
                  const a = t.getValue(n, "nativeEvent.lineno", -1),
                    s = t.getValue(n, "nativeEvent.error");
                  if ("string" == typeof r) {
                    if (
                      (i && (i = e.normalizeUrl(i, 6)),
                      (o =
                        s && s.stack
                          ? s.stack.toString()
                          : (r + " " + i + " " + a).toString()),
                      L[o])
                    )
                      L[o].exception.repeats += 1;
                    else {
                      const t = {
                        type: 6,
                        exception: { description: r, url: i, line: a },
                      };
                      (e.post(t),
                        (L[o] = {
                          exception: {
                            description: r,
                            url: i,
                            line: a,
                            repeats: 1,
                          },
                        }));
                    }
                    u += 1;
                  }
                })(o);
                break;
              case "visibilitychange":
                (!(function (e) {
                  const t = "visible" === document.visibilityState,
                    n = {
                      type: 4,
                      event: { type: "visibilitychange" },
                      target: {
                        prevState: { visible: N },
                        currState: { visible: t },
                      },
                    },
                    o = Q(e.type, e.target);
                  (o && (n.dcid = o), G(n), (N = t));
                })(o),
                  k &&
                    (!1 === N && TLT
                      ? (pe(o), TLT.flushAll(), TLT.updatePageId())
                      : (g || he(),
                        (g !== h && e.normalizeUrl(location.hash, 2) !== g) ||
                          TLT.logScreenviewLoad(g))));
                break;
              default:
                fe(o);
            }
            return ((i = c), d);
          }
          p = o;
        }
      },
      onmessage: function () {},
    };
  }));
