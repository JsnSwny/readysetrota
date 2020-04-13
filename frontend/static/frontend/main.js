!(function (e) {
  var t = {};
  function n(r) {
    if (t[r]) return t[r].exports;
    var a = (t[r] = { i: r, l: !1, exports: {} });
    return e[r].call(a.exports, a, a.exports, n), (a.l = !0), a.exports;
  }
  (n.m = e),
    (n.c = t),
    (n.d = function (e, t, r) {
      n.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: r });
    }),
    (n.r = function (e) {
      "undefined" != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
        Object.defineProperty(e, "__esModule", { value: !0 });
    }),
    (n.t = function (e, t) {
      if ((1 & t && (e = n(e)), 8 & t)) return e;
      if (4 & t && "object" == typeof e && e && e.__esModule) return e;
      var r = Object.create(null);
      if (
        (n.r(r),
        Object.defineProperty(r, "default", { enumerable: !0, value: e }),
        2 & t && "string" != typeof e)
      )
        for (var a in e)
          n.d(
            r,
            a,
            function (t) {
              return e[t];
            }.bind(null, a)
          );
      return r;
    }),
    (n.n = function (e) {
      var t =
        e && e.__esModule
          ? function () {
              return e.default;
            }
          : function () {
              return e;
            };
      return n.d(t, "a", t), t;
    }),
    (n.o = function (e, t) {
      return Object.prototype.hasOwnProperty.call(e, t);
    }),
    (n.p = ""),
    n((n.s = 56));
})([
  function (e, t, n) {
    "use strict";
    e.exports = n(26);
  },
  function (e, t, n) {
    e.exports = n(34);
  },
  function (e, t, n) {
    "use strict";
    var r = n(15),
      a = Object.prototype.toString;
    function o(e) {
      return "[object Array]" === a.call(e);
    }
    function i(e) {
      return void 0 === e;
    }
    function l(e) {
      return null !== e && "object" == typeof e;
    }
    function u(e) {
      return "[object Function]" === a.call(e);
    }
    function c(e, t) {
      if (null != e)
        if (("object" != typeof e && (e = [e]), o(e)))
          for (var n = 0, r = e.length; n < r; n++) t.call(null, e[n], n, e);
        else
          for (var a in e)
            Object.prototype.hasOwnProperty.call(e, a) &&
              t.call(null, e[a], a, e);
    }
    e.exports = {
      isArray: o,
      isArrayBuffer: function (e) {
        return "[object ArrayBuffer]" === a.call(e);
      },
      isBuffer: function (e) {
        return (
          null !== e &&
          !i(e) &&
          null !== e.constructor &&
          !i(e.constructor) &&
          "function" == typeof e.constructor.isBuffer &&
          e.constructor.isBuffer(e)
        );
      },
      isFormData: function (e) {
        return "undefined" != typeof FormData && e instanceof FormData;
      },
      isArrayBufferView: function (e) {
        return "undefined" != typeof ArrayBuffer && ArrayBuffer.isView
          ? ArrayBuffer.isView(e)
          : e && e.buffer && e.buffer instanceof ArrayBuffer;
      },
      isString: function (e) {
        return "string" == typeof e;
      },
      isNumber: function (e) {
        return "number" == typeof e;
      },
      isObject: l,
      isUndefined: i,
      isDate: function (e) {
        return "[object Date]" === a.call(e);
      },
      isFile: function (e) {
        return "[object File]" === a.call(e);
      },
      isBlob: function (e) {
        return "[object Blob]" === a.call(e);
      },
      isFunction: u,
      isStream: function (e) {
        return l(e) && u(e.pipe);
      },
      isURLSearchParams: function (e) {
        return (
          "undefined" != typeof URLSearchParams && e instanceof URLSearchParams
        );
      },
      isStandardBrowserEnv: function () {
        return (
          ("undefined" == typeof navigator ||
            ("ReactNative" !== navigator.product &&
              "NativeScript" !== navigator.product &&
              "NS" !== navigator.product)) &&
          "undefined" != typeof window &&
          "undefined" != typeof document
        );
      },
      forEach: c,
      merge: function e() {
        var t = {};
        function n(n, r) {
          "object" == typeof t[r] && "object" == typeof n
            ? (t[r] = e(t[r], n))
            : (t[r] = n);
        }
        for (var r = 0, a = arguments.length; r < a; r++) c(arguments[r], n);
        return t;
      },
      deepMerge: function e() {
        var t = {};
        function n(n, r) {
          "object" == typeof t[r] && "object" == typeof n
            ? (t[r] = e(t[r], n))
            : (t[r] = "object" == typeof n ? e({}, n) : n);
        }
        for (var r = 0, a = arguments.length; r < a; r++) c(arguments[r], n);
        return t;
      },
      extend: function (e, t, n) {
        return (
          c(t, function (t, a) {
            e[a] = n && "function" == typeof t ? r(t, n) : t;
          }),
          e
        );
      },
      trim: function (e) {
        return e.replace(/^\s*/, "").replace(/\s*$/, "");
      },
    };
  },
  ,
  function (e, t, n) {
    e.exports = n(30)();
  },
  function (e, t, n) {
    "use strict";
    n.r(t),
      n.d(t, "__DO_NOT_USE__ActionTypes", function () {
        return o;
      }),
      n.d(t, "applyMiddleware", function () {
        return y;
      }),
      n.d(t, "bindActionCreators", function () {
        return f;
      }),
      n.d(t, "combineReducers", function () {
        return c;
      }),
      n.d(t, "compose", function () {
        return h;
      }),
      n.d(t, "createStore", function () {
        return l;
      });
    var r = n(10),
      a = function () {
        return Math.random().toString(36).substring(7).split("").join(".");
      },
      o = {
        INIT: "@@redux/INIT" + a(),
        REPLACE: "@@redux/REPLACE" + a(),
        PROBE_UNKNOWN_ACTION: function () {
          return "@@redux/PROBE_UNKNOWN_ACTION" + a();
        },
      };
    function i(e) {
      if ("object" != typeof e || null === e) return !1;
      for (var t = e; null !== Object.getPrototypeOf(t); )
        t = Object.getPrototypeOf(t);
      return Object.getPrototypeOf(e) === t;
    }
    function l(e, t, n) {
      var a;
      if (
        ("function" == typeof t && "function" == typeof n) ||
        ("function" == typeof n && "function" == typeof arguments[3])
      )
        throw new Error(
          "It looks like you are passing several store enhancers to createStore(). This is not supported. Instead, compose them together to a single function."
        );
      if (
        ("function" == typeof t && void 0 === n && ((n = t), (t = void 0)),
        void 0 !== n)
      ) {
        if ("function" != typeof n)
          throw new Error("Expected the enhancer to be a function.");
        return n(l)(e, t);
      }
      if ("function" != typeof e)
        throw new Error("Expected the reducer to be a function.");
      var u = e,
        c = t,
        s = [],
        f = s,
        d = !1;
      function p() {
        f === s && (f = s.slice());
      }
      function m() {
        if (d)
          throw new Error(
            "You may not call store.getState() while the reducer is executing. The reducer has already received the state as an argument. Pass it down from the top reducer instead of reading it from the store."
          );
        return c;
      }
      function h(e) {
        if ("function" != typeof e)
          throw new Error("Expected the listener to be a function.");
        if (d)
          throw new Error(
            "You may not call store.subscribe() while the reducer is executing. If you would like to be notified after the store has been updated, subscribe from a component and invoke store.getState() in the callback to access the latest state. See https://redux.js.org/api-reference/store#subscribelistener for more details."
          );
        var t = !0;
        return (
          p(),
          f.push(e),
          function () {
            if (t) {
              if (d)
                throw new Error(
                  "You may not unsubscribe from a store listener while the reducer is executing. See https://redux.js.org/api-reference/store#subscribelistener for more details."
                );
              (t = !1), p();
              var n = f.indexOf(e);
              f.splice(n, 1), (s = null);
            }
          }
        );
      }
      function y(e) {
        if (!i(e))
          throw new Error(
            "Actions must be plain objects. Use custom middleware for async actions."
          );
        if (void 0 === e.type)
          throw new Error(
            'Actions may not have an undefined "type" property. Have you misspelled a constant?'
          );
        if (d) throw new Error("Reducers may not dispatch actions.");
        try {
          (d = !0), (c = u(c, e));
        } finally {
          d = !1;
        }
        for (var t = (s = f), n = 0; n < t.length; n++) {
          (0, t[n])();
        }
        return e;
      }
      function g(e) {
        if ("function" != typeof e)
          throw new Error("Expected the nextReducer to be a function.");
        (u = e), y({ type: o.REPLACE });
      }
      function v() {
        var e,
          t = h;
        return (
          ((e = {
            subscribe: function (e) {
              if ("object" != typeof e || null === e)
                throw new TypeError("Expected the observer to be an object.");
              function n() {
                e.next && e.next(m());
              }
              return n(), { unsubscribe: t(n) };
            },
          })[r.a] = function () {
            return this;
          }),
          e
        );
      }
      return (
        y({ type: o.INIT }),
        ((a = { dispatch: y, subscribe: h, getState: m, replaceReducer: g })[
          r.a
        ] = v),
        a
      );
    }
    function u(e, t) {
      var n = t && t.type;
      return (
        "Given " +
        ((n && 'action "' + String(n) + '"') || "an action") +
        ', reducer "' +
        e +
        '" returned undefined. To ignore an action, you must explicitly return the previous state. If you want this reducer to hold no value, you can return null instead of undefined.'
      );
    }
    function c(e) {
      for (var t = Object.keys(e), n = {}, r = 0; r < t.length; r++) {
        var a = t[r];
        0, "function" == typeof e[a] && (n[a] = e[a]);
      }
      var i,
        l = Object.keys(n);
      try {
        !(function (e) {
          Object.keys(e).forEach(function (t) {
            var n = e[t];
            if (void 0 === n(void 0, { type: o.INIT }))
              throw new Error(
                'Reducer "' +
                  t +
                  "\" returned undefined during initialization. If the state passed to the reducer is undefined, you must explicitly return the initial state. The initial state may not be undefined. If you don't want to set a value for this reducer, you can use null instead of undefined."
              );
            if (void 0 === n(void 0, { type: o.PROBE_UNKNOWN_ACTION() }))
              throw new Error(
                'Reducer "' +
                  t +
                  "\" returned undefined when probed with a random type. Don't try to handle " +
                  o.INIT +
                  ' or other actions in "redux/*" namespace. They are considered private. Instead, you must return the current state for any unknown actions, unless it is undefined, in which case you must return the initial state, regardless of the action type. The initial state may not be undefined, but can be null.'
              );
          });
        })(n);
      } catch (e) {
        i = e;
      }
      return function (e, t) {
        if ((void 0 === e && (e = {}), i)) throw i;
        for (var r = !1, a = {}, o = 0; o < l.length; o++) {
          var c = l[o],
            s = n[c],
            f = e[c],
            d = s(f, t);
          if (void 0 === d) {
            var p = u(c, t);
            throw new Error(p);
          }
          (a[c] = d), (r = r || d !== f);
        }
        return (r = r || l.length !== Object.keys(e).length) ? a : e;
      };
    }
    function s(e, t) {
      return function () {
        return t(e.apply(this, arguments));
      };
    }
    function f(e, t) {
      if ("function" == typeof e) return s(e, t);
      if ("object" != typeof e || null === e)
        throw new Error(
          "bindActionCreators expected an object or a function, instead received " +
            (null === e ? "null" : typeof e) +
            '. Did you write "import ActionCreators from" instead of "import * as ActionCreators from"?'
        );
      var n = {};
      for (var r in e) {
        var a = e[r];
        "function" == typeof a && (n[r] = s(a, t));
      }
      return n;
    }
    function d(e, t, n) {
      return (
        t in e
          ? Object.defineProperty(e, t, {
              value: n,
              enumerable: !0,
              configurable: !0,
              writable: !0,
            })
          : (e[t] = n),
        e
      );
    }
    function p(e, t) {
      var n = Object.keys(e);
      return (
        Object.getOwnPropertySymbols &&
          n.push.apply(n, Object.getOwnPropertySymbols(e)),
        t &&
          (n = n.filter(function (t) {
            return Object.getOwnPropertyDescriptor(e, t).enumerable;
          })),
        n
      );
    }
    function m(e) {
      for (var t = 1; t < arguments.length; t++) {
        var n = null != arguments[t] ? arguments[t] : {};
        t % 2
          ? p(n, !0).forEach(function (t) {
              d(e, t, n[t]);
            })
          : Object.getOwnPropertyDescriptors
          ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
          : p(n).forEach(function (t) {
              Object.defineProperty(
                e,
                t,
                Object.getOwnPropertyDescriptor(n, t)
              );
            });
      }
      return e;
    }
    function h() {
      for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
        t[n] = arguments[n];
      return 0 === t.length
        ? function (e) {
            return e;
          }
        : 1 === t.length
        ? t[0]
        : t.reduce(function (e, t) {
            return function () {
              return e(t.apply(void 0, arguments));
            };
          });
    }
    function y() {
      for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
        t[n] = arguments[n];
      return function (e) {
        return function () {
          var n = e.apply(void 0, arguments),
            r = function () {
              throw new Error(
                "Dispatching while constructing your middleware is not allowed. Other middleware would not be applied to this dispatch."
              );
            },
            a = {
              getState: n.getState,
              dispatch: function () {
                return r.apply(void 0, arguments);
              },
            },
            o = t.map(function (e) {
              return e(a);
            });
          return m({}, n, { dispatch: (r = h.apply(void 0, o)(n.dispatch)) });
        };
      };
    }
  },
  function (e, t, n) {
    "use strict";
    var r = n(8),
      a = {
        childContextTypes: !0,
        contextType: !0,
        contextTypes: !0,
        defaultProps: !0,
        displayName: !0,
        getDefaultProps: !0,
        getDerivedStateFromError: !0,
        getDerivedStateFromProps: !0,
        mixins: !0,
        propTypes: !0,
        type: !0,
      },
      o = {
        name: !0,
        length: !0,
        prototype: !0,
        caller: !0,
        callee: !0,
        arguments: !0,
        arity: !0,
      },
      i = {
        $$typeof: !0,
        compare: !0,
        defaultProps: !0,
        displayName: !0,
        propTypes: !0,
        type: !0,
      },
      l = {};
    function u(e) {
      return r.isMemo(e) ? i : l[e.$$typeof] || a;
    }
    (l[r.ForwardRef] = {
      $$typeof: !0,
      render: !0,
      defaultProps: !0,
      displayName: !0,
      propTypes: !0,
    }),
      (l[r.Memo] = i);
    var c = Object.defineProperty,
      s = Object.getOwnPropertyNames,
      f = Object.getOwnPropertySymbols,
      d = Object.getOwnPropertyDescriptor,
      p = Object.getPrototypeOf,
      m = Object.prototype;
    e.exports = function e(t, n, r) {
      if ("string" != typeof n) {
        if (m) {
          var a = p(n);
          a && a !== m && e(t, a, r);
        }
        var i = s(n);
        f && (i = i.concat(f(n)));
        for (var l = u(t), h = u(n), y = 0; y < i.length; ++y) {
          var g = i[y];
          if (!(o[g] || (r && r[g]) || (h && h[g]) || (l && l[g]))) {
            var v = d(n, g);
            try {
              c(t, g, v);
            } catch (e) {}
          }
        }
      }
      return t;
    };
  },
  function (e, t, n) {
    "use strict";
    !(function e() {
      if (
        "undefined" != typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ &&
        "function" == typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE
      ) {
        0;
        try {
          __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(e);
        } catch (e) {
          console.error(e);
        }
      }
    })(),
      (e.exports = n(27));
  },
  function (e, t, n) {
    "use strict";
    e.exports = n(32);
  },
  ,
  function (e, t, n) {
    "use strict";
    (function (e, r) {
      var a,
        o = n(23);
      a =
        "undefined" != typeof self
          ? self
          : "undefined" != typeof window
          ? window
          : void 0 !== e
          ? e
          : r;
      var i = Object(o.a)(a);
      t.a = i;
    }.call(this, n(14), n(33)(e)));
  },
  function (e, t) {
    e.exports = function (e, t) {
      (e.prototype = Object.create(t.prototype)),
        (e.prototype.constructor = e),
        (e.__proto__ = t);
    };
  },
  function (e, t, n) {
    var r = n(51);
    (e.exports = p),
      (e.exports.parse = o),
      (e.exports.compile = function (e, t) {
        return l(o(e, t), t);
      }),
      (e.exports.tokensToFunction = l),
      (e.exports.tokensToRegExp = d);
    var a = new RegExp(
      [
        "(\\\\.)",
        "([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?|(\\*))",
      ].join("|"),
      "g"
    );
    function o(e, t) {
      for (
        var n, r = [], o = 0, i = 0, l = "", s = (t && t.delimiter) || "/";
        null != (n = a.exec(e));

      ) {
        var f = n[0],
          d = n[1],
          p = n.index;
        if (((l += e.slice(i, p)), (i = p + f.length), d)) l += d[1];
        else {
          var m = e[i],
            h = n[2],
            y = n[3],
            g = n[4],
            v = n[5],
            b = n[6],
            w = n[7];
          l && (r.push(l), (l = ""));
          var E = null != h && null != m && m !== h,
            x = "+" === b || "*" === b,
            _ = "?" === b || "*" === b,
            S = n[2] || s,
            k = g || v;
          r.push({
            name: y || o++,
            prefix: h || "",
            delimiter: S,
            optional: _,
            repeat: x,
            partial: E,
            asterisk: !!w,
            pattern: k ? c(k) : w ? ".*" : "[^" + u(S) + "]+?",
          });
        }
      }
      return i < e.length && (l += e.substr(i)), l && r.push(l), r;
    }
    function i(e) {
      return encodeURI(e).replace(/[\/?#]/g, function (e) {
        return "%" + e.charCodeAt(0).toString(16).toUpperCase();
      });
    }
    function l(e, t) {
      for (var n = new Array(e.length), a = 0; a < e.length; a++)
        "object" == typeof e[a] &&
          (n[a] = new RegExp("^(?:" + e[a].pattern + ")$", f(t)));
      return function (t, a) {
        for (
          var o = "",
            l = t || {},
            u = (a || {}).pretty ? i : encodeURIComponent,
            c = 0;
          c < e.length;
          c++
        ) {
          var s = e[c];
          if ("string" != typeof s) {
            var f,
              d = l[s.name];
            if (null == d) {
              if (s.optional) {
                s.partial && (o += s.prefix);
                continue;
              }
              throw new TypeError('Expected "' + s.name + '" to be defined');
            }
            if (r(d)) {
              if (!s.repeat)
                throw new TypeError(
                  'Expected "' +
                    s.name +
                    '" to not repeat, but received `' +
                    JSON.stringify(d) +
                    "`"
                );
              if (0 === d.length) {
                if (s.optional) continue;
                throw new TypeError(
                  'Expected "' + s.name + '" to not be empty'
                );
              }
              for (var p = 0; p < d.length; p++) {
                if (((f = u(d[p])), !n[c].test(f)))
                  throw new TypeError(
                    'Expected all "' +
                      s.name +
                      '" to match "' +
                      s.pattern +
                      '", but received `' +
                      JSON.stringify(f) +
                      "`"
                  );
                o += (0 === p ? s.prefix : s.delimiter) + f;
              }
            } else {
              if (
                ((f = s.asterisk
                  ? encodeURI(d).replace(/[?#]/g, function (e) {
                      return "%" + e.charCodeAt(0).toString(16).toUpperCase();
                    })
                  : u(d)),
                !n[c].test(f))
              )
                throw new TypeError(
                  'Expected "' +
                    s.name +
                    '" to match "' +
                    s.pattern +
                    '", but received "' +
                    f +
                    '"'
                );
              o += s.prefix + f;
            }
          } else o += s;
        }
        return o;
      };
    }
    function u(e) {
      return e.replace(/([.+*?=^!:${}()[\]|\/\\])/g, "\\$1");
    }
    function c(e) {
      return e.replace(/([=!:$\/()])/g, "\\$1");
    }
    function s(e, t) {
      return (e.keys = t), e;
    }
    function f(e) {
      return e && e.sensitive ? "" : "i";
    }
    function d(e, t, n) {
      r(t) || ((n = t || n), (t = []));
      for (
        var a = (n = n || {}).strict, o = !1 !== n.end, i = "", l = 0;
        l < e.length;
        l++
      ) {
        var c = e[l];
        if ("string" == typeof c) i += u(c);
        else {
          var d = u(c.prefix),
            p = "(?:" + c.pattern + ")";
          t.push(c),
            c.repeat && (p += "(?:" + d + p + ")*"),
            (i += p = c.optional
              ? c.partial
                ? d + "(" + p + ")?"
                : "(?:" + d + "(" + p + "))?"
              : d + "(" + p + ")");
        }
      }
      var m = u(n.delimiter || "/"),
        h = i.slice(-m.length) === m;
      return (
        a || (i = (h ? i.slice(0, -m.length) : i) + "(?:" + m + "(?=$))?"),
        (i += o ? "$" : a && h ? "" : "(?=" + m + "|$)"),
        s(new RegExp("^" + i, f(n)), t)
      );
    }
    function p(e, t, n) {
      return (
        r(t) || ((n = t || n), (t = [])),
        (n = n || {}),
        e instanceof RegExp
          ? (function (e, t) {
              var n = e.source.match(/\((?!\?)/g);
              if (n)
                for (var r = 0; r < n.length; r++)
                  t.push({
                    name: r,
                    prefix: null,
                    delimiter: null,
                    optional: !1,
                    repeat: !1,
                    partial: !1,
                    asterisk: !1,
                    pattern: null,
                  });
              return s(e, t);
            })(e, t)
          : r(e)
          ? (function (e, t, n) {
              for (var r = [], a = 0; a < e.length; a++)
                r.push(p(e[a], t, n).source);
              return s(new RegExp("(?:" + r.join("|") + ")", f(n)), t);
            })(e, t, n)
          : (function (e, t, n) {
              return d(o(e, n), t, n);
            })(e, t, n)
      );
    }
  },
  function (e, t, n) {
    "use strict";
    /*
object-assign
(c) Sindre Sorhus
@license MIT
*/ var r =
        Object.getOwnPropertySymbols,
      a = Object.prototype.hasOwnProperty,
      o = Object.prototype.propertyIsEnumerable;
    function i(e) {
      if (null == e)
        throw new TypeError(
          "Object.assign cannot be called with null or undefined"
        );
      return Object(e);
    }
    e.exports = (function () {
      try {
        if (!Object.assign) return !1;
        var e = new String("abc");
        if (((e[5] = "de"), "5" === Object.getOwnPropertyNames(e)[0]))
          return !1;
        for (var t = {}, n = 0; n < 10; n++)
          t["_" + String.fromCharCode(n)] = n;
        if (
          "0123456789" !==
          Object.getOwnPropertyNames(t)
            .map(function (e) {
              return t[e];
            })
            .join("")
        )
          return !1;
        var r = {};
        return (
          "abcdefghijklmnopqrst".split("").forEach(function (e) {
            r[e] = e;
          }),
          "abcdefghijklmnopqrst" === Object.keys(Object.assign({}, r)).join("")
        );
      } catch (e) {
        return !1;
      }
    })()
      ? Object.assign
      : function (e, t) {
          for (var n, l, u = i(e), c = 1; c < arguments.length; c++) {
            for (var s in (n = Object(arguments[c])))
              a.call(n, s) && (u[s] = n[s]);
            if (r) {
              l = r(n);
              for (var f = 0; f < l.length; f++)
                o.call(n, l[f]) && (u[l[f]] = n[l[f]]);
            }
          }
          return u;
        };
  },
  function (e, t) {
    var n;
    n = (function () {
      return this;
    })();
    try {
      n = n || new Function("return this")();
    } catch (e) {
      "object" == typeof window && (n = window);
    }
    e.exports = n;
  },
  function (e, t, n) {
    "use strict";
    e.exports = function (e, t) {
      return function () {
        for (var n = new Array(arguments.length), r = 0; r < n.length; r++)
          n[r] = arguments[r];
        return e.apply(t, n);
      };
    };
  },
  function (e, t, n) {
    "use strict";
    var r = n(2);
    function a(e) {
      return encodeURIComponent(e)
        .replace(/%40/gi, "@")
        .replace(/%3A/gi, ":")
        .replace(/%24/g, "$")
        .replace(/%2C/gi, ",")
        .replace(/%20/g, "+")
        .replace(/%5B/gi, "[")
        .replace(/%5D/gi, "]");
    }
    e.exports = function (e, t, n) {
      if (!t) return e;
      var o;
      if (n) o = n(t);
      else if (r.isURLSearchParams(t)) o = t.toString();
      else {
        var i = [];
        r.forEach(t, function (e, t) {
          null != e &&
            (r.isArray(e) ? (t += "[]") : (e = [e]),
            r.forEach(e, function (e) {
              r.isDate(e)
                ? (e = e.toISOString())
                : r.isObject(e) && (e = JSON.stringify(e)),
                i.push(a(t) + "=" + a(e));
            }));
        }),
          (o = i.join("&"));
      }
      if (o) {
        var l = e.indexOf("#");
        -1 !== l && (e = e.slice(0, l)),
          (e += (-1 === e.indexOf("?") ? "?" : "&") + o);
      }
      return e;
    };
  },
  function (e, t, n) {
    "use strict";
    e.exports = function (e) {
      return !(!e || !e.__CANCEL__);
    };
  },
  function (e, t, n) {
    "use strict";
    (function (t) {
      var r = n(2),
        a = n(40),
        o = { "Content-Type": "application/x-www-form-urlencoded" };
      function i(e, t) {
        !r.isUndefined(e) &&
          r.isUndefined(e["Content-Type"]) &&
          (e["Content-Type"] = t);
      }
      var l,
        u = {
          adapter:
            (("undefined" != typeof XMLHttpRequest ||
              (void 0 !== t &&
                "[object process]" === Object.prototype.toString.call(t))) &&
              (l = n(19)),
            l),
          transformRequest: [
            function (e, t) {
              return (
                a(t, "Accept"),
                a(t, "Content-Type"),
                r.isFormData(e) ||
                r.isArrayBuffer(e) ||
                r.isBuffer(e) ||
                r.isStream(e) ||
                r.isFile(e) ||
                r.isBlob(e)
                  ? e
                  : r.isArrayBufferView(e)
                  ? e.buffer
                  : r.isURLSearchParams(e)
                  ? (i(t, "application/x-www-form-urlencoded;charset=utf-8"),
                    e.toString())
                  : r.isObject(e)
                  ? (i(t, "application/json;charset=utf-8"), JSON.stringify(e))
                  : e
              );
            },
          ],
          transformResponse: [
            function (e) {
              if ("string" == typeof e)
                try {
                  e = JSON.parse(e);
                } catch (e) {}
              return e;
            },
          ],
          timeout: 0,
          xsrfCookieName: "XSRF-TOKEN",
          xsrfHeaderName: "X-XSRF-TOKEN",
          maxContentLength: -1,
          validateStatus: function (e) {
            return e >= 200 && e < 300;
          },
        };
      (u.headers = { common: { Accept: "application/json, text/plain, */*" } }),
        r.forEach(["delete", "get", "head"], function (e) {
          u.headers[e] = {};
        }),
        r.forEach(["post", "put", "patch"], function (e) {
          u.headers[e] = r.merge(o);
        }),
        (e.exports = u);
    }.call(this, n(39)));
  },
  function (e, t, n) {
    "use strict";
    var r = n(2),
      a = n(41),
      o = n(16),
      i = n(43),
      l = n(46),
      u = n(47),
      c = n(20);
    e.exports = function (e) {
      return new Promise(function (t, s) {
        var f = e.data,
          d = e.headers;
        r.isFormData(f) && delete d["Content-Type"];
        var p = new XMLHttpRequest();
        if (e.auth) {
          var m = e.auth.username || "",
            h = e.auth.password || "";
          d.Authorization = "Basic " + btoa(m + ":" + h);
        }
        var y = i(e.baseURL, e.url);
        if (
          (p.open(
            e.method.toUpperCase(),
            o(y, e.params, e.paramsSerializer),
            !0
          ),
          (p.timeout = e.timeout),
          (p.onreadystatechange = function () {
            if (
              p &&
              4 === p.readyState &&
              (0 !== p.status ||
                (p.responseURL && 0 === p.responseURL.indexOf("file:")))
            ) {
              var n =
                  "getAllResponseHeaders" in p
                    ? l(p.getAllResponseHeaders())
                    : null,
                r = {
                  data:
                    e.responseType && "text" !== e.responseType
                      ? p.response
                      : p.responseText,
                  status: p.status,
                  statusText: p.statusText,
                  headers: n,
                  config: e,
                  request: p,
                };
              a(t, s, r), (p = null);
            }
          }),
          (p.onabort = function () {
            p && (s(c("Request aborted", e, "ECONNABORTED", p)), (p = null));
          }),
          (p.onerror = function () {
            s(c("Network Error", e, null, p)), (p = null);
          }),
          (p.ontimeout = function () {
            var t = "timeout of " + e.timeout + "ms exceeded";
            e.timeoutErrorMessage && (t = e.timeoutErrorMessage),
              s(c(t, e, "ECONNABORTED", p)),
              (p = null);
          }),
          r.isStandardBrowserEnv())
        ) {
          var g = n(48),
            v =
              (e.withCredentials || u(y)) && e.xsrfCookieName
                ? g.read(e.xsrfCookieName)
                : void 0;
          v && (d[e.xsrfHeaderName] = v);
        }
        if (
          ("setRequestHeader" in p &&
            r.forEach(d, function (e, t) {
              void 0 === f && "content-type" === t.toLowerCase()
                ? delete d[t]
                : p.setRequestHeader(t, e);
            }),
          r.isUndefined(e.withCredentials) ||
            (p.withCredentials = !!e.withCredentials),
          e.responseType)
        )
          try {
            p.responseType = e.responseType;
          } catch (t) {
            if ("json" !== e.responseType) throw t;
          }
        "function" == typeof e.onDownloadProgress &&
          p.addEventListener("progress", e.onDownloadProgress),
          "function" == typeof e.onUploadProgress &&
            p.upload &&
            p.upload.addEventListener("progress", e.onUploadProgress),
          e.cancelToken &&
            e.cancelToken.promise.then(function (e) {
              p && (p.abort(), s(e), (p = null));
            }),
          void 0 === f && (f = null),
          p.send(f);
      });
    };
  },
  function (e, t, n) {
    "use strict";
    var r = n(42);
    e.exports = function (e, t, n, a, o) {
      var i = new Error(e);
      return r(i, t, n, a, o);
    };
  },
  function (e, t, n) {
    "use strict";
    var r = n(2);
    e.exports = function (e, t) {
      t = t || {};
      var n = {},
        a = ["url", "method", "params", "data"],
        o = ["headers", "auth", "proxy"],
        i = [
          "baseURL",
          "url",
          "transformRequest",
          "transformResponse",
          "paramsSerializer",
          "timeout",
          "withCredentials",
          "adapter",
          "responseType",
          "xsrfCookieName",
          "xsrfHeaderName",
          "onUploadProgress",
          "onDownloadProgress",
          "maxContentLength",
          "validateStatus",
          "maxRedirects",
          "httpAgent",
          "httpsAgent",
          "cancelToken",
          "socketPath",
        ];
      r.forEach(a, function (e) {
        void 0 !== t[e] && (n[e] = t[e]);
      }),
        r.forEach(o, function (a) {
          r.isObject(t[a])
            ? (n[a] = r.deepMerge(e[a], t[a]))
            : void 0 !== t[a]
            ? (n[a] = t[a])
            : r.isObject(e[a])
            ? (n[a] = r.deepMerge(e[a]))
            : void 0 !== e[a] && (n[a] = e[a]);
        }),
        r.forEach(i, function (r) {
          void 0 !== t[r] ? (n[r] = t[r]) : void 0 !== e[r] && (n[r] = e[r]);
        });
      var l = a.concat(o).concat(i),
        u = Object.keys(t).filter(function (e) {
          return -1 === l.indexOf(e);
        });
      return (
        r.forEach(u, function (r) {
          void 0 !== t[r] ? (n[r] = t[r]) : void 0 !== e[r] && (n[r] = e[r]);
        }),
        n
      );
    };
  },
  function (e, t, n) {
    "use strict";
    function r(e) {
      this.message = e;
    }
    (r.prototype.toString = function () {
      return "Cancel" + (this.message ? ": " + this.message : "");
    }),
      (r.prototype.__CANCEL__ = !0),
      (e.exports = r);
  },
  function (e, t, n) {
    "use strict";
    function r(e) {
      var t,
        n = e.Symbol;
      return (
        "function" == typeof n
          ? n.observable
            ? (t = n.observable)
            : ((t = n("observable")), (n.observable = t))
          : (t = "@@observable"),
        t
      );
    }
    n.d(t, "a", function () {
      return r;
    });
  },
  function (e, t, n) {
    "use strict";
    (function (t) {
      var n = "__global_unique_id__";
      e.exports = function () {
        return (t[n] = (t[n] || 0) + 1);
      };
    }.call(this, n(14)));
  },
  function (e, t, n) {
    "use strict";
    var r = n(5).compose;
    (t.__esModule = !0),
      (t.composeWithDevTools =
        "undefined" != typeof window &&
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
          ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
          : function () {
              if (0 !== arguments.length)
                return "object" == typeof arguments[0]
                  ? r
                  : r.apply(null, arguments);
            }),
      (t.devToolsEnhancer =
        "undefined" != typeof window && window.__REDUX_DEVTOOLS_EXTENSION__
          ? window.__REDUX_DEVTOOLS_EXTENSION__
          : function () {
              return function (e) {
                return e;
              };
            });
  },
  function (e, t, n) {
    "use strict";
    /** @license React v16.13.1
     * react.production.min.js
     *
     * Copyright (c) Facebook, Inc. and its affiliates.
     *
     * This source code is licensed under the MIT license found in the
     * LICENSE file in the root directory of this source tree.
     */ var r = n(13),
      a = "function" == typeof Symbol && Symbol.for,
      o = a ? Symbol.for("react.element") : 60103,
      i = a ? Symbol.for("react.portal") : 60106,
      l = a ? Symbol.for("react.fragment") : 60107,
      u = a ? Symbol.for("react.strict_mode") : 60108,
      c = a ? Symbol.for("react.profiler") : 60114,
      s = a ? Symbol.for("react.provider") : 60109,
      f = a ? Symbol.for("react.context") : 60110,
      d = a ? Symbol.for("react.forward_ref") : 60112,
      p = a ? Symbol.for("react.suspense") : 60113,
      m = a ? Symbol.for("react.memo") : 60115,
      h = a ? Symbol.for("react.lazy") : 60116,
      y = "function" == typeof Symbol && Symbol.iterator;
    function g(e) {
      for (
        var t = "https://reactjs.org/docs/error-decoder.html?invariant=" + e,
          n = 1;
        n < arguments.length;
        n++
      )
        t += "&args[]=" + encodeURIComponent(arguments[n]);
      return (
        "Minified React error #" +
        e +
        "; visit " +
        t +
        " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
      );
    }
    var v = {
        isMounted: function () {
          return !1;
        },
        enqueueForceUpdate: function () {},
        enqueueReplaceState: function () {},
        enqueueSetState: function () {},
      },
      b = {};
    function w(e, t, n) {
      (this.props = e),
        (this.context = t),
        (this.refs = b),
        (this.updater = n || v);
    }
    function E() {}
    function x(e, t, n) {
      (this.props = e),
        (this.context = t),
        (this.refs = b),
        (this.updater = n || v);
    }
    (w.prototype.isReactComponent = {}),
      (w.prototype.setState = function (e, t) {
        if ("object" != typeof e && "function" != typeof e && null != e)
          throw Error(g(85));
        this.updater.enqueueSetState(this, e, t, "setState");
      }),
      (w.prototype.forceUpdate = function (e) {
        this.updater.enqueueForceUpdate(this, e, "forceUpdate");
      }),
      (E.prototype = w.prototype);
    var _ = (x.prototype = new E());
    (_.constructor = x), r(_, w.prototype), (_.isPureReactComponent = !0);
    var S = { current: null },
      k = Object.prototype.hasOwnProperty,
      T = { key: !0, ref: !0, __self: !0, __source: !0 };
    function C(e, t, n) {
      var r,
        a = {},
        i = null,
        l = null;
      if (null != t)
        for (r in (void 0 !== t.ref && (l = t.ref),
        void 0 !== t.key && (i = "" + t.key),
        t))
          k.call(t, r) && !T.hasOwnProperty(r) && (a[r] = t[r]);
      var u = arguments.length - 2;
      if (1 === u) a.children = n;
      else if (1 < u) {
        for (var c = Array(u), s = 0; s < u; s++) c[s] = arguments[s + 2];
        a.children = c;
      }
      if (e && e.defaultProps)
        for (r in (u = e.defaultProps)) void 0 === a[r] && (a[r] = u[r]);
      return {
        $$typeof: o,
        type: e,
        key: i,
        ref: l,
        props: a,
        _owner: S.current,
      };
    }
    function O(e) {
      return "object" == typeof e && null !== e && e.$$typeof === o;
    }
    var P = /\/+/g,
      N = [];
    function j(e, t, n, r) {
      if (N.length) {
        var a = N.pop();
        return (
          (a.result = e),
          (a.keyPrefix = t),
          (a.func = n),
          (a.context = r),
          (a.count = 0),
          a
        );
      }
      return { result: e, keyPrefix: t, func: n, context: r, count: 0 };
    }
    function M(e) {
      (e.result = null),
        (e.keyPrefix = null),
        (e.func = null),
        (e.context = null),
        (e.count = 0),
        10 > N.length && N.push(e);
    }
    function D(e, t, n) {
      return null == e
        ? 0
        : (function e(t, n, r, a) {
            var l = typeof t;
            ("undefined" !== l && "boolean" !== l) || (t = null);
            var u = !1;
            if (null === t) u = !0;
            else
              switch (l) {
                case "string":
                case "number":
                  u = !0;
                  break;
                case "object":
                  switch (t.$$typeof) {
                    case o:
                    case i:
                      u = !0;
                  }
              }
            if (u) return r(a, t, "" === n ? "." + R(t, 0) : n), 1;
            if (((u = 0), (n = "" === n ? "." : n + ":"), Array.isArray(t)))
              for (var c = 0; c < t.length; c++) {
                var s = n + R((l = t[c]), c);
                u += e(l, s, r, a);
              }
            else if (
              (null === t || "object" != typeof t
                ? (s = null)
                : (s =
                    "function" == typeof (s = (y && t[y]) || t["@@iterator"])
                      ? s
                      : null),
              "function" == typeof s)
            )
              for (t = s.call(t), c = 0; !(l = t.next()).done; )
                u += e((l = l.value), (s = n + R(l, c++)), r, a);
            else if ("object" === l)
              throw (
                ((r = "" + t),
                Error(
                  g(
                    31,
                    "[object Object]" === r
                      ? "object with keys {" + Object.keys(t).join(", ") + "}"
                      : r,
                    ""
                  )
                ))
              );
            return u;
          })(e, "", t, n);
    }
    function R(e, t) {
      return "object" == typeof e && null !== e && null != e.key
        ? (function (e) {
            var t = { "=": "=0", ":": "=2" };
            return (
              "$" +
              ("" + e).replace(/[=:]/g, function (e) {
                return t[e];
              })
            );
          })(e.key)
        : t.toString(36);
    }
    function A(e, t) {
      e.func.call(e.context, t, e.count++);
    }
    function I(e, t, n) {
      var r = e.result,
        a = e.keyPrefix;
      (e = e.func.call(e.context, t, e.count++)),
        Array.isArray(e)
          ? U(e, r, n, function (e) {
              return e;
            })
          : null != e &&
            (O(e) &&
              (e = (function (e, t) {
                return {
                  $$typeof: o,
                  type: e.type,
                  key: t,
                  ref: e.ref,
                  props: e.props,
                  _owner: e._owner,
                };
              })(
                e,
                a +
                  (!e.key || (t && t.key === e.key)
                    ? ""
                    : ("" + e.key).replace(P, "$&/") + "/") +
                  n
              )),
            r.push(e));
    }
    function U(e, t, n, r, a) {
      var o = "";
      null != n && (o = ("" + n).replace(P, "$&/") + "/"),
        D(e, I, (t = j(t, o, r, a))),
        M(t);
    }
    var L = { current: null };
    function z() {
      var e = L.current;
      if (null === e) throw Error(g(321));
      return e;
    }
    var F = {
      ReactCurrentDispatcher: L,
      ReactCurrentBatchConfig: { suspense: null },
      ReactCurrentOwner: S,
      IsSomeRendererActing: { current: !1 },
      assign: r,
    };
    (t.Children = {
      map: function (e, t, n) {
        if (null == e) return e;
        var r = [];
        return U(e, r, null, t, n), r;
      },
      forEach: function (e, t, n) {
        if (null == e) return e;
        D(e, A, (t = j(null, null, t, n))), M(t);
      },
      count: function (e) {
        return D(
          e,
          function () {
            return null;
          },
          null
        );
      },
      toArray: function (e) {
        var t = [];
        return (
          U(e, t, null, function (e) {
            return e;
          }),
          t
        );
      },
      only: function (e) {
        if (!O(e)) throw Error(g(143));
        return e;
      },
    }),
      (t.Component = w),
      (t.Fragment = l),
      (t.Profiler = c),
      (t.PureComponent = x),
      (t.StrictMode = u),
      (t.Suspense = p),
      (t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = F),
      (t.cloneElement = function (e, t, n) {
        if (null == e) throw Error(g(267, e));
        var a = r({}, e.props),
          i = e.key,
          l = e.ref,
          u = e._owner;
        if (null != t) {
          if (
            (void 0 !== t.ref && ((l = t.ref), (u = S.current)),
            void 0 !== t.key && (i = "" + t.key),
            e.type && e.type.defaultProps)
          )
            var c = e.type.defaultProps;
          for (s in t)
            k.call(t, s) &&
              !T.hasOwnProperty(s) &&
              (a[s] = void 0 === t[s] && void 0 !== c ? c[s] : t[s]);
        }
        var s = arguments.length - 2;
        if (1 === s) a.children = n;
        else if (1 < s) {
          c = Array(s);
          for (var f = 0; f < s; f++) c[f] = arguments[f + 2];
          a.children = c;
        }
        return {
          $$typeof: o,
          type: e.type,
          key: i,
          ref: l,
          props: a,
          _owner: u,
        };
      }),
      (t.createContext = function (e, t) {
        return (
          void 0 === t && (t = null),
          ((e = {
            $$typeof: f,
            _calculateChangedBits: t,
            _currentValue: e,
            _currentValue2: e,
            _threadCount: 0,
            Provider: null,
            Consumer: null,
          }).Provider = { $$typeof: s, _context: e }),
          (e.Consumer = e)
        );
      }),
      (t.createElement = C),
      (t.createFactory = function (e) {
        var t = C.bind(null, e);
        return (t.type = e), t;
      }),
      (t.createRef = function () {
        return { current: null };
      }),
      (t.forwardRef = function (e) {
        return { $$typeof: d, render: e };
      }),
      (t.isValidElement = O),
      (t.lazy = function (e) {
        return { $$typeof: h, _ctor: e, _status: -1, _result: null };
      }),
      (t.memo = function (e, t) {
        return { $$typeof: m, type: e, compare: void 0 === t ? null : t };
      }),
      (t.useCallback = function (e, t) {
        return z().useCallback(e, t);
      }),
      (t.useContext = function (e, t) {
        return z().useContext(e, t);
      }),
      (t.useDebugValue = function () {}),
      (t.useEffect = function (e, t) {
        return z().useEffect(e, t);
      }),
      (t.useImperativeHandle = function (e, t, n) {
        return z().useImperativeHandle(e, t, n);
      }),
      (t.useLayoutEffect = function (e, t) {
        return z().useLayoutEffect(e, t);
      }),
      (t.useMemo = function (e, t) {
        return z().useMemo(e, t);
      }),
      (t.useReducer = function (e, t, n) {
        return z().useReducer(e, t, n);
      }),
      (t.useRef = function (e) {
        return z().useRef(e);
      }),
      (t.useState = function (e) {
        return z().useState(e);
      }),
      (t.version = "16.13.1");
  },
  function (e, t, n) {
    "use strict";
    /** @license React v16.13.1
     * react-dom.production.min.js
     *
     * Copyright (c) Facebook, Inc. and its affiliates.
     *
     * This source code is licensed under the MIT license found in the
     * LICENSE file in the root directory of this source tree.
     */ var r = n(0),
      a = n(13),
      o = n(28);
    function i(e) {
      for (
        var t = "https://reactjs.org/docs/error-decoder.html?invariant=" + e,
          n = 1;
        n < arguments.length;
        n++
      )
        t += "&args[]=" + encodeURIComponent(arguments[n]);
      return (
        "Minified React error #" +
        e +
        "; visit " +
        t +
        " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
      );
    }
    if (!r) throw Error(i(227));
    function l(e, t, n, r, a, o, i, l, u) {
      var c = Array.prototype.slice.call(arguments, 3);
      try {
        t.apply(n, c);
      } catch (e) {
        this.onError(e);
      }
    }
    var u = !1,
      c = null,
      s = !1,
      f = null,
      d = {
        onError: function (e) {
          (u = !0), (c = e);
        },
      };
    function p(e, t, n, r, a, o, i, s, f) {
      (u = !1), (c = null), l.apply(d, arguments);
    }
    var m = null,
      h = null,
      y = null;
    function g(e, t, n) {
      var r = e.type || "unknown-event";
      (e.currentTarget = y(n)),
        (function (e, t, n, r, a, o, l, d, m) {
          if ((p.apply(this, arguments), u)) {
            if (!u) throw Error(i(198));
            var h = c;
            (u = !1), (c = null), s || ((s = !0), (f = h));
          }
        })(r, t, void 0, e),
        (e.currentTarget = null);
    }
    var v = null,
      b = {};
    function w() {
      if (v)
        for (var e in b) {
          var t = b[e],
            n = v.indexOf(e);
          if (!(-1 < n)) throw Error(i(96, e));
          if (!x[n]) {
            if (!t.extractEvents) throw Error(i(97, e));
            for (var r in ((x[n] = t), (n = t.eventTypes))) {
              var a = void 0,
                o = n[r],
                l = t,
                u = r;
              if (_.hasOwnProperty(u)) throw Error(i(99, u));
              _[u] = o;
              var c = o.phasedRegistrationNames;
              if (c) {
                for (a in c) c.hasOwnProperty(a) && E(c[a], l, u);
                a = !0;
              } else
                o.registrationName
                  ? (E(o.registrationName, l, u), (a = !0))
                  : (a = !1);
              if (!a) throw Error(i(98, r, e));
            }
          }
        }
    }
    function E(e, t, n) {
      if (S[e]) throw Error(i(100, e));
      (S[e] = t), (k[e] = t.eventTypes[n].dependencies);
    }
    var x = [],
      _ = {},
      S = {},
      k = {};
    function T(e) {
      var t,
        n = !1;
      for (t in e)
        if (e.hasOwnProperty(t)) {
          var r = e[t];
          if (!b.hasOwnProperty(t) || b[t] !== r) {
            if (b[t]) throw Error(i(102, t));
            (b[t] = r), (n = !0);
          }
        }
      n && w();
    }
    var C = !(
        "undefined" == typeof window ||
        void 0 === window.document ||
        void 0 === window.document.createElement
      ),
      O = null,
      P = null,
      N = null;
    function j(e) {
      if ((e = h(e))) {
        if ("function" != typeof O) throw Error(i(280));
        var t = e.stateNode;
        t && ((t = m(t)), O(e.stateNode, e.type, t));
      }
    }
    function M(e) {
      P ? (N ? N.push(e) : (N = [e])) : (P = e);
    }
    function D() {
      if (P) {
        var e = P,
          t = N;
        if (((N = P = null), j(e), t)) for (e = 0; e < t.length; e++) j(t[e]);
      }
    }
    function R(e, t) {
      return e(t);
    }
    function A(e, t, n, r, a) {
      return e(t, n, r, a);
    }
    function I() {}
    var U = R,
      L = !1,
      z = !1;
    function F() {
      (null === P && null === N) || (I(), D());
    }
    function W(e, t, n) {
      if (z) return e(t, n);
      z = !0;
      try {
        return U(e, t, n);
      } finally {
        (z = !1), F();
      }
    }
    var H = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,
      Y = Object.prototype.hasOwnProperty,
      B = {},
      $ = {};
    function q(e, t, n, r, a, o) {
      (this.acceptsBooleans = 2 === t || 3 === t || 4 === t),
        (this.attributeName = r),
        (this.attributeNamespace = a),
        (this.mustUseProperty = n),
        (this.propertyName = e),
        (this.type = t),
        (this.sanitizeURL = o);
    }
    var V = {};
    "children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style"
      .split(" ")
      .forEach(function (e) {
        V[e] = new q(e, 0, !1, e, null, !1);
      }),
      [
        ["acceptCharset", "accept-charset"],
        ["className", "class"],
        ["htmlFor", "for"],
        ["httpEquiv", "http-equiv"],
      ].forEach(function (e) {
        var t = e[0];
        V[t] = new q(t, 1, !1, e[1], null, !1);
      }),
      ["contentEditable", "draggable", "spellCheck", "value"].forEach(function (
        e
      ) {
        V[e] = new q(e, 2, !1, e.toLowerCase(), null, !1);
      }),
      [
        "autoReverse",
        "externalResourcesRequired",
        "focusable",
        "preserveAlpha",
      ].forEach(function (e) {
        V[e] = new q(e, 2, !1, e, null, !1);
      }),
      "allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope"
        .split(" ")
        .forEach(function (e) {
          V[e] = new q(e, 3, !1, e.toLowerCase(), null, !1);
        }),
      ["checked", "multiple", "muted", "selected"].forEach(function (e) {
        V[e] = new q(e, 3, !0, e, null, !1);
      }),
      ["capture", "download"].forEach(function (e) {
        V[e] = new q(e, 4, !1, e, null, !1);
      }),
      ["cols", "rows", "size", "span"].forEach(function (e) {
        V[e] = new q(e, 6, !1, e, null, !1);
      }),
      ["rowSpan", "start"].forEach(function (e) {
        V[e] = new q(e, 5, !1, e.toLowerCase(), null, !1);
      });
    var Q = /[\-:]([a-z])/g;
    function G(e) {
      return e[1].toUpperCase();
    }
    "accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height"
      .split(" ")
      .forEach(function (e) {
        var t = e.replace(Q, G);
        V[t] = new q(t, 1, !1, e, null, !1);
      }),
      "xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type"
        .split(" ")
        .forEach(function (e) {
          var t = e.replace(Q, G);
          V[t] = new q(t, 1, !1, e, "http://www.w3.org/1999/xlink", !1);
        }),
      ["xml:base", "xml:lang", "xml:space"].forEach(function (e) {
        var t = e.replace(Q, G);
        V[t] = new q(t, 1, !1, e, "http://www.w3.org/XML/1998/namespace", !1);
      }),
      ["tabIndex", "crossOrigin"].forEach(function (e) {
        V[e] = new q(e, 1, !1, e.toLowerCase(), null, !1);
      }),
      (V.xlinkHref = new q(
        "xlinkHref",
        1,
        !1,
        "xlink:href",
        "http://www.w3.org/1999/xlink",
        !0
      )),
      ["src", "href", "action", "formAction"].forEach(function (e) {
        V[e] = new q(e, 1, !1, e.toLowerCase(), null, !0);
      });
    var X = r.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function K(e, t, n, r) {
      var a = V.hasOwnProperty(t) ? V[t] : null;
      (null !== a
        ? 0 === a.type
        : !r &&
          2 < t.length &&
          ("o" === t[0] || "O" === t[0]) &&
          ("n" === t[1] || "N" === t[1])) ||
        ((function (e, t, n, r) {
          if (
            null == t ||
            (function (e, t, n, r) {
              if (null !== n && 0 === n.type) return !1;
              switch (typeof t) {
                case "function":
                case "symbol":
                  return !0;
                case "boolean":
                  return (
                    !r &&
                    (null !== n
                      ? !n.acceptsBooleans
                      : "data-" !== (e = e.toLowerCase().slice(0, 5)) &&
                        "aria-" !== e)
                  );
                default:
                  return !1;
              }
            })(e, t, n, r)
          )
            return !0;
          if (r) return !1;
          if (null !== n)
            switch (n.type) {
              case 3:
                return !t;
              case 4:
                return !1 === t;
              case 5:
                return isNaN(t);
              case 6:
                return isNaN(t) || 1 > t;
            }
          return !1;
        })(t, n, a, r) && (n = null),
        r || null === a
          ? (function (e) {
              return (
                !!Y.call($, e) ||
                (!Y.call(B, e) && (H.test(e) ? ($[e] = !0) : ((B[e] = !0), !1)))
              );
            })(t) &&
            (null === n ? e.removeAttribute(t) : e.setAttribute(t, "" + n))
          : a.mustUseProperty
          ? (e[a.propertyName] = null === n ? 3 !== a.type && "" : n)
          : ((t = a.attributeName),
            (r = a.attributeNamespace),
            null === n
              ? e.removeAttribute(t)
              : ((n =
                  3 === (a = a.type) || (4 === a && !0 === n) ? "" : "" + n),
                r ? e.setAttributeNS(r, t, n) : e.setAttribute(t, n))));
    }
    X.hasOwnProperty("ReactCurrentDispatcher") ||
      (X.ReactCurrentDispatcher = { current: null }),
      X.hasOwnProperty("ReactCurrentBatchConfig") ||
        (X.ReactCurrentBatchConfig = { suspense: null });
    var J = /^(.*)[\\\/]/,
      Z = "function" == typeof Symbol && Symbol.for,
      ee = Z ? Symbol.for("react.element") : 60103,
      te = Z ? Symbol.for("react.portal") : 60106,
      ne = Z ? Symbol.for("react.fragment") : 60107,
      re = Z ? Symbol.for("react.strict_mode") : 60108,
      ae = Z ? Symbol.for("react.profiler") : 60114,
      oe = Z ? Symbol.for("react.provider") : 60109,
      ie = Z ? Symbol.for("react.context") : 60110,
      le = Z ? Symbol.for("react.concurrent_mode") : 60111,
      ue = Z ? Symbol.for("react.forward_ref") : 60112,
      ce = Z ? Symbol.for("react.suspense") : 60113,
      se = Z ? Symbol.for("react.suspense_list") : 60120,
      fe = Z ? Symbol.for("react.memo") : 60115,
      de = Z ? Symbol.for("react.lazy") : 60116,
      pe = Z ? Symbol.for("react.block") : 60121,
      me = "function" == typeof Symbol && Symbol.iterator;
    function he(e) {
      return null === e || "object" != typeof e
        ? null
        : "function" == typeof (e = (me && e[me]) || e["@@iterator"])
        ? e
        : null;
    }
    function ye(e) {
      if (null == e) return null;
      if ("function" == typeof e) return e.displayName || e.name || null;
      if ("string" == typeof e) return e;
      switch (e) {
        case ne:
          return "Fragment";
        case te:
          return "Portal";
        case ae:
          return "Profiler";
        case re:
          return "StrictMode";
        case ce:
          return "Suspense";
        case se:
          return "SuspenseList";
      }
      if ("object" == typeof e)
        switch (e.$$typeof) {
          case ie:
            return "Context.Consumer";
          case oe:
            return "Context.Provider";
          case ue:
            var t = e.render;
            return (
              (t = t.displayName || t.name || ""),
              e.displayName ||
                ("" !== t ? "ForwardRef(" + t + ")" : "ForwardRef")
            );
          case fe:
            return ye(e.type);
          case pe:
            return ye(e.render);
          case de:
            if ((e = 1 === e._status ? e._result : null)) return ye(e);
        }
      return null;
    }
    function ge(e) {
      var t = "";
      do {
        e: switch (e.tag) {
          case 3:
          case 4:
          case 6:
          case 7:
          case 10:
          case 9:
            var n = "";
            break e;
          default:
            var r = e._debugOwner,
              a = e._debugSource,
              o = ye(e.type);
            (n = null),
              r && (n = ye(r.type)),
              (r = o),
              (o = ""),
              a
                ? (o =
                    " (at " +
                    a.fileName.replace(J, "") +
                    ":" +
                    a.lineNumber +
                    ")")
                : n && (o = " (created by " + n + ")"),
              (n = "\n    in " + (r || "Unknown") + o);
        }
        (t += n), (e = e.return);
      } while (e);
      return t;
    }
    function ve(e) {
      switch (typeof e) {
        case "boolean":
        case "number":
        case "object":
        case "string":
        case "undefined":
          return e;
        default:
          return "";
      }
    }
    function be(e) {
      var t = e.type;
      return (
        (e = e.nodeName) &&
        "input" === e.toLowerCase() &&
        ("checkbox" === t || "radio" === t)
      );
    }
    function we(e) {
      e._valueTracker ||
        (e._valueTracker = (function (e) {
          var t = be(e) ? "checked" : "value",
            n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t),
            r = "" + e[t];
          if (
            !e.hasOwnProperty(t) &&
            void 0 !== n &&
            "function" == typeof n.get &&
            "function" == typeof n.set
          ) {
            var a = n.get,
              o = n.set;
            return (
              Object.defineProperty(e, t, {
                configurable: !0,
                get: function () {
                  return a.call(this);
                },
                set: function (e) {
                  (r = "" + e), o.call(this, e);
                },
              }),
              Object.defineProperty(e, t, { enumerable: n.enumerable }),
              {
                getValue: function () {
                  return r;
                },
                setValue: function (e) {
                  r = "" + e;
                },
                stopTracking: function () {
                  (e._valueTracker = null), delete e[t];
                },
              }
            );
          }
        })(e));
    }
    function Ee(e) {
      if (!e) return !1;
      var t = e._valueTracker;
      if (!t) return !0;
      var n = t.getValue(),
        r = "";
      return (
        e && (r = be(e) ? (e.checked ? "true" : "false") : e.value),
        (e = r) !== n && (t.setValue(e), !0)
      );
    }
    function xe(e, t) {
      var n = t.checked;
      return a({}, t, {
        defaultChecked: void 0,
        defaultValue: void 0,
        value: void 0,
        checked: null != n ? n : e._wrapperState.initialChecked,
      });
    }
    function _e(e, t) {
      var n = null == t.defaultValue ? "" : t.defaultValue,
        r = null != t.checked ? t.checked : t.defaultChecked;
      (n = ve(null != t.value ? t.value : n)),
        (e._wrapperState = {
          initialChecked: r,
          initialValue: n,
          controlled:
            "checkbox" === t.type || "radio" === t.type
              ? null != t.checked
              : null != t.value,
        });
    }
    function Se(e, t) {
      null != (t = t.checked) && K(e, "checked", t, !1);
    }
    function ke(e, t) {
      Se(e, t);
      var n = ve(t.value),
        r = t.type;
      if (null != n)
        "number" === r
          ? ((0 === n && "" === e.value) || e.value != n) && (e.value = "" + n)
          : e.value !== "" + n && (e.value = "" + n);
      else if ("submit" === r || "reset" === r)
        return void e.removeAttribute("value");
      t.hasOwnProperty("value")
        ? Ce(e, t.type, n)
        : t.hasOwnProperty("defaultValue") && Ce(e, t.type, ve(t.defaultValue)),
        null == t.checked &&
          null != t.defaultChecked &&
          (e.defaultChecked = !!t.defaultChecked);
    }
    function Te(e, t, n) {
      if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
        var r = t.type;
        if (
          !(
            ("submit" !== r && "reset" !== r) ||
            (void 0 !== t.value && null !== t.value)
          )
        )
          return;
        (t = "" + e._wrapperState.initialValue),
          n || t === e.value || (e.value = t),
          (e.defaultValue = t);
      }
      "" !== (n = e.name) && (e.name = ""),
        (e.defaultChecked = !!e._wrapperState.initialChecked),
        "" !== n && (e.name = n);
    }
    function Ce(e, t, n) {
      ("number" === t && e.ownerDocument.activeElement === e) ||
        (null == n
          ? (e.defaultValue = "" + e._wrapperState.initialValue)
          : e.defaultValue !== "" + n && (e.defaultValue = "" + n));
    }
    function Oe(e, t) {
      return (
        (e = a({ children: void 0 }, t)),
        (t = (function (e) {
          var t = "";
          return (
            r.Children.forEach(e, function (e) {
              null != e && (t += e);
            }),
            t
          );
        })(t.children)) && (e.children = t),
        e
      );
    }
    function Pe(e, t, n, r) {
      if (((e = e.options), t)) {
        t = {};
        for (var a = 0; a < n.length; a++) t["$" + n[a]] = !0;
        for (n = 0; n < e.length; n++)
          (a = t.hasOwnProperty("$" + e[n].value)),
            e[n].selected !== a && (e[n].selected = a),
            a && r && (e[n].defaultSelected = !0);
      } else {
        for (n = "" + ve(n), t = null, a = 0; a < e.length; a++) {
          if (e[a].value === n)
            return (
              (e[a].selected = !0), void (r && (e[a].defaultSelected = !0))
            );
          null !== t || e[a].disabled || (t = e[a]);
        }
        null !== t && (t.selected = !0);
      }
    }
    function Ne(e, t) {
      if (null != t.dangerouslySetInnerHTML) throw Error(i(91));
      return a({}, t, {
        value: void 0,
        defaultValue: void 0,
        children: "" + e._wrapperState.initialValue,
      });
    }
    function je(e, t) {
      var n = t.value;
      if (null == n) {
        if (((n = t.children), (t = t.defaultValue), null != n)) {
          if (null != t) throw Error(i(92));
          if (Array.isArray(n)) {
            if (!(1 >= n.length)) throw Error(i(93));
            n = n[0];
          }
          t = n;
        }
        null == t && (t = ""), (n = t);
      }
      e._wrapperState = { initialValue: ve(n) };
    }
    function Me(e, t) {
      var n = ve(t.value),
        r = ve(t.defaultValue);
      null != n &&
        ((n = "" + n) !== e.value && (e.value = n),
        null == t.defaultValue && e.defaultValue !== n && (e.defaultValue = n)),
        null != r && (e.defaultValue = "" + r);
    }
    function De(e) {
      var t = e.textContent;
      t === e._wrapperState.initialValue &&
        "" !== t &&
        null !== t &&
        (e.value = t);
    }
    var Re = "http://www.w3.org/1999/xhtml",
      Ae = "http://www.w3.org/2000/svg";
    function Ie(e) {
      switch (e) {
        case "svg":
          return "http://www.w3.org/2000/svg";
        case "math":
          return "http://www.w3.org/1998/Math/MathML";
        default:
          return "http://www.w3.org/1999/xhtml";
      }
    }
    function Ue(e, t) {
      return null == e || "http://www.w3.org/1999/xhtml" === e
        ? Ie(t)
        : "http://www.w3.org/2000/svg" === e && "foreignObject" === t
        ? "http://www.w3.org/1999/xhtml"
        : e;
    }
    var Le,
      ze = (function (e) {
        return "undefined" != typeof MSApp && MSApp.execUnsafeLocalFunction
          ? function (t, n, r, a) {
              MSApp.execUnsafeLocalFunction(function () {
                return e(t, n);
              });
            }
          : e;
      })(function (e, t) {
        if (e.namespaceURI !== Ae || "innerHTML" in e) e.innerHTML = t;
        else {
          for (
            (Le = Le || document.createElement("div")).innerHTML =
              "<svg>" + t.valueOf().toString() + "</svg>",
              t = Le.firstChild;
            e.firstChild;

          )
            e.removeChild(e.firstChild);
          for (; t.firstChild; ) e.appendChild(t.firstChild);
        }
      });
    function Fe(e, t) {
      if (t) {
        var n = e.firstChild;
        if (n && n === e.lastChild && 3 === n.nodeType)
          return void (n.nodeValue = t);
      }
      e.textContent = t;
    }
    function We(e, t) {
      var n = {};
      return (
        (n[e.toLowerCase()] = t.toLowerCase()),
        (n["Webkit" + e] = "webkit" + t),
        (n["Moz" + e] = "moz" + t),
        n
      );
    }
    var He = {
        animationend: We("Animation", "AnimationEnd"),
        animationiteration: We("Animation", "AnimationIteration"),
        animationstart: We("Animation", "AnimationStart"),
        transitionend: We("Transition", "TransitionEnd"),
      },
      Ye = {},
      Be = {};
    function $e(e) {
      if (Ye[e]) return Ye[e];
      if (!He[e]) return e;
      var t,
        n = He[e];
      for (t in n) if (n.hasOwnProperty(t) && t in Be) return (Ye[e] = n[t]);
      return e;
    }
    C &&
      ((Be = document.createElement("div").style),
      "AnimationEvent" in window ||
        (delete He.animationend.animation,
        delete He.animationiteration.animation,
        delete He.animationstart.animation),
      "TransitionEvent" in window || delete He.transitionend.transition);
    var qe = $e("animationend"),
      Ve = $e("animationiteration"),
      Qe = $e("animationstart"),
      Ge = $e("transitionend"),
      Xe = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange seeked seeking stalled suspend timeupdate volumechange waiting".split(
        " "
      ),
      Ke = new ("function" == typeof WeakMap ? WeakMap : Map)();
    function Je(e) {
      var t = Ke.get(e);
      return void 0 === t && ((t = new Map()), Ke.set(e, t)), t;
    }
    function Ze(e) {
      var t = e,
        n = e;
      if (e.alternate) for (; t.return; ) t = t.return;
      else {
        e = t;
        do {
          0 != (1026 & (t = e).effectTag) && (n = t.return), (e = t.return);
        } while (e);
      }
      return 3 === t.tag ? n : null;
    }
    function et(e) {
      if (13 === e.tag) {
        var t = e.memoizedState;
        if (
          (null === t && null !== (e = e.alternate) && (t = e.memoizedState),
          null !== t)
        )
          return t.dehydrated;
      }
      return null;
    }
    function tt(e) {
      if (Ze(e) !== e) throw Error(i(188));
    }
    function nt(e) {
      if (
        !(e = (function (e) {
          var t = e.alternate;
          if (!t) {
            if (null === (t = Ze(e))) throw Error(i(188));
            return t !== e ? null : e;
          }
          for (var n = e, r = t; ; ) {
            var a = n.return;
            if (null === a) break;
            var o = a.alternate;
            if (null === o) {
              if (null !== (r = a.return)) {
                n = r;
                continue;
              }
              break;
            }
            if (a.child === o.child) {
              for (o = a.child; o; ) {
                if (o === n) return tt(a), e;
                if (o === r) return tt(a), t;
                o = o.sibling;
              }
              throw Error(i(188));
            }
            if (n.return !== r.return) (n = a), (r = o);
            else {
              for (var l = !1, u = a.child; u; ) {
                if (u === n) {
                  (l = !0), (n = a), (r = o);
                  break;
                }
                if (u === r) {
                  (l = !0), (r = a), (n = o);
                  break;
                }
                u = u.sibling;
              }
              if (!l) {
                for (u = o.child; u; ) {
                  if (u === n) {
                    (l = !0), (n = o), (r = a);
                    break;
                  }
                  if (u === r) {
                    (l = !0), (r = o), (n = a);
                    break;
                  }
                  u = u.sibling;
                }
                if (!l) throw Error(i(189));
              }
            }
            if (n.alternate !== r) throw Error(i(190));
          }
          if (3 !== n.tag) throw Error(i(188));
          return n.stateNode.current === n ? e : t;
        })(e))
      )
        return null;
      for (var t = e; ; ) {
        if (5 === t.tag || 6 === t.tag) return t;
        if (t.child) (t.child.return = t), (t = t.child);
        else {
          if (t === e) break;
          for (; !t.sibling; ) {
            if (!t.return || t.return === e) return null;
            t = t.return;
          }
          (t.sibling.return = t.return), (t = t.sibling);
        }
      }
      return null;
    }
    function rt(e, t) {
      if (null == t) throw Error(i(30));
      return null == e
        ? t
        : Array.isArray(e)
        ? Array.isArray(t)
          ? (e.push.apply(e, t), e)
          : (e.push(t), e)
        : Array.isArray(t)
        ? [e].concat(t)
        : [e, t];
    }
    function at(e, t, n) {
      Array.isArray(e) ? e.forEach(t, n) : e && t.call(n, e);
    }
    var ot = null;
    function it(e) {
      if (e) {
        var t = e._dispatchListeners,
          n = e._dispatchInstances;
        if (Array.isArray(t))
          for (var r = 0; r < t.length && !e.isPropagationStopped(); r++)
            g(e, t[r], n[r]);
        else t && g(e, t, n);
        (e._dispatchListeners = null),
          (e._dispatchInstances = null),
          e.isPersistent() || e.constructor.release(e);
      }
    }
    function lt(e) {
      if ((null !== e && (ot = rt(ot, e)), (e = ot), (ot = null), e)) {
        if ((at(e, it), ot)) throw Error(i(95));
        if (s) throw ((e = f), (s = !1), (f = null), e);
      }
    }
    function ut(e) {
      return (
        (e = e.target || e.srcElement || window).correspondingUseElement &&
          (e = e.correspondingUseElement),
        3 === e.nodeType ? e.parentNode : e
      );
    }
    function ct(e) {
      if (!C) return !1;
      var t = (e = "on" + e) in document;
      return (
        t ||
          ((t = document.createElement("div")).setAttribute(e, "return;"),
          (t = "function" == typeof t[e])),
        t
      );
    }
    var st = [];
    function ft(e) {
      (e.topLevelType = null),
        (e.nativeEvent = null),
        (e.targetInst = null),
        (e.ancestors.length = 0),
        10 > st.length && st.push(e);
    }
    function dt(e, t, n, r) {
      if (st.length) {
        var a = st.pop();
        return (
          (a.topLevelType = e),
          (a.eventSystemFlags = r),
          (a.nativeEvent = t),
          (a.targetInst = n),
          a
        );
      }
      return {
        topLevelType: e,
        eventSystemFlags: r,
        nativeEvent: t,
        targetInst: n,
        ancestors: [],
      };
    }
    function pt(e) {
      var t = e.targetInst,
        n = t;
      do {
        if (!n) {
          e.ancestors.push(n);
          break;
        }
        var r = n;
        if (3 === r.tag) r = r.stateNode.containerInfo;
        else {
          for (; r.return; ) r = r.return;
          r = 3 !== r.tag ? null : r.stateNode.containerInfo;
        }
        if (!r) break;
        (5 !== (t = n.tag) && 6 !== t) || e.ancestors.push(n), (n = Cn(r));
      } while (n);
      for (n = 0; n < e.ancestors.length; n++) {
        t = e.ancestors[n];
        var a = ut(e.nativeEvent);
        r = e.topLevelType;
        var o = e.nativeEvent,
          i = e.eventSystemFlags;
        0 === n && (i |= 64);
        for (var l = null, u = 0; u < x.length; u++) {
          var c = x[u];
          c && (c = c.extractEvents(r, t, o, a, i)) && (l = rt(l, c));
        }
        lt(l);
      }
    }
    function mt(e, t, n) {
      if (!n.has(e)) {
        switch (e) {
          case "scroll":
            Qt(t, "scroll", !0);
            break;
          case "focus":
          case "blur":
            Qt(t, "focus", !0),
              Qt(t, "blur", !0),
              n.set("blur", null),
              n.set("focus", null);
            break;
          case "cancel":
          case "close":
            ct(e) && Qt(t, e, !0);
            break;
          case "invalid":
          case "submit":
          case "reset":
            break;
          default:
            -1 === Xe.indexOf(e) && Vt(e, t);
        }
        n.set(e, null);
      }
    }
    var ht,
      yt,
      gt,
      vt = !1,
      bt = [],
      wt = null,
      Et = null,
      xt = null,
      _t = new Map(),
      St = new Map(),
      kt = [],
      Tt = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput close cancel copy cut paste click change contextmenu reset submit".split(
        " "
      ),
      Ct = "focus blur dragenter dragleave mouseover mouseout pointerover pointerout gotpointercapture lostpointercapture".split(
        " "
      );
    function Ot(e, t, n, r, a) {
      return {
        blockedOn: e,
        topLevelType: t,
        eventSystemFlags: 32 | n,
        nativeEvent: a,
        container: r,
      };
    }
    function Pt(e, t) {
      switch (e) {
        case "focus":
        case "blur":
          wt = null;
          break;
        case "dragenter":
        case "dragleave":
          Et = null;
          break;
        case "mouseover":
        case "mouseout":
          xt = null;
          break;
        case "pointerover":
        case "pointerout":
          _t.delete(t.pointerId);
          break;
        case "gotpointercapture":
        case "lostpointercapture":
          St.delete(t.pointerId);
      }
    }
    function Nt(e, t, n, r, a, o) {
      return null === e || e.nativeEvent !== o
        ? ((e = Ot(t, n, r, a, o)),
          null !== t && null !== (t = On(t)) && yt(t),
          e)
        : ((e.eventSystemFlags |= r), e);
    }
    function jt(e) {
      var t = Cn(e.target);
      if (null !== t) {
        var n = Ze(t);
        if (null !== n)
          if (13 === (t = n.tag)) {
            if (null !== (t = et(n)))
              return (
                (e.blockedOn = t),
                void o.unstable_runWithPriority(e.priority, function () {
                  gt(n);
                })
              );
          } else if (3 === t && n.stateNode.hydrate)
            return void (e.blockedOn =
              3 === n.tag ? n.stateNode.containerInfo : null);
      }
      e.blockedOn = null;
    }
    function Mt(e) {
      if (null !== e.blockedOn) return !1;
      var t = Jt(
        e.topLevelType,
        e.eventSystemFlags,
        e.container,
        e.nativeEvent
      );
      if (null !== t) {
        var n = On(t);
        return null !== n && yt(n), (e.blockedOn = t), !1;
      }
      return !0;
    }
    function Dt(e, t, n) {
      Mt(e) && n.delete(t);
    }
    function Rt() {
      for (vt = !1; 0 < bt.length; ) {
        var e = bt[0];
        if (null !== e.blockedOn) {
          null !== (e = On(e.blockedOn)) && ht(e);
          break;
        }
        var t = Jt(
          e.topLevelType,
          e.eventSystemFlags,
          e.container,
          e.nativeEvent
        );
        null !== t ? (e.blockedOn = t) : bt.shift();
      }
      null !== wt && Mt(wt) && (wt = null),
        null !== Et && Mt(Et) && (Et = null),
        null !== xt && Mt(xt) && (xt = null),
        _t.forEach(Dt),
        St.forEach(Dt);
    }
    function At(e, t) {
      e.blockedOn === t &&
        ((e.blockedOn = null),
        vt ||
          ((vt = !0),
          o.unstable_scheduleCallback(o.unstable_NormalPriority, Rt)));
    }
    function It(e) {
      function t(t) {
        return At(t, e);
      }
      if (0 < bt.length) {
        At(bt[0], e);
        for (var n = 1; n < bt.length; n++) {
          var r = bt[n];
          r.blockedOn === e && (r.blockedOn = null);
        }
      }
      for (
        null !== wt && At(wt, e),
          null !== Et && At(Et, e),
          null !== xt && At(xt, e),
          _t.forEach(t),
          St.forEach(t),
          n = 0;
        n < kt.length;
        n++
      )
        (r = kt[n]).blockedOn === e && (r.blockedOn = null);
      for (; 0 < kt.length && null === (n = kt[0]).blockedOn; )
        jt(n), null === n.blockedOn && kt.shift();
    }
    var Ut = {},
      Lt = new Map(),
      zt = new Map(),
      Ft = [
        "abort",
        "abort",
        qe,
        "animationEnd",
        Ve,
        "animationIteration",
        Qe,
        "animationStart",
        "canplay",
        "canPlay",
        "canplaythrough",
        "canPlayThrough",
        "durationchange",
        "durationChange",
        "emptied",
        "emptied",
        "encrypted",
        "encrypted",
        "ended",
        "ended",
        "error",
        "error",
        "gotpointercapture",
        "gotPointerCapture",
        "load",
        "load",
        "loadeddata",
        "loadedData",
        "loadedmetadata",
        "loadedMetadata",
        "loadstart",
        "loadStart",
        "lostpointercapture",
        "lostPointerCapture",
        "playing",
        "playing",
        "progress",
        "progress",
        "seeking",
        "seeking",
        "stalled",
        "stalled",
        "suspend",
        "suspend",
        "timeupdate",
        "timeUpdate",
        Ge,
        "transitionEnd",
        "waiting",
        "waiting",
      ];
    function Wt(e, t) {
      for (var n = 0; n < e.length; n += 2) {
        var r = e[n],
          a = e[n + 1],
          o = "on" + (a[0].toUpperCase() + a.slice(1));
        (o = {
          phasedRegistrationNames: { bubbled: o, captured: o + "Capture" },
          dependencies: [r],
          eventPriority: t,
        }),
          zt.set(r, t),
          Lt.set(r, o),
          (Ut[a] = o);
      }
    }
    Wt(
      "blur blur cancel cancel click click close close contextmenu contextMenu copy copy cut cut auxclick auxClick dblclick doubleClick dragend dragEnd dragstart dragStart drop drop focus focus input input invalid invalid keydown keyDown keypress keyPress keyup keyUp mousedown mouseDown mouseup mouseUp paste paste pause pause play play pointercancel pointerCancel pointerdown pointerDown pointerup pointerUp ratechange rateChange reset reset seeked seeked submit submit touchcancel touchCancel touchend touchEnd touchstart touchStart volumechange volumeChange".split(
        " "
      ),
      0
    ),
      Wt(
        "drag drag dragenter dragEnter dragexit dragExit dragleave dragLeave dragover dragOver mousemove mouseMove mouseout mouseOut mouseover mouseOver pointermove pointerMove pointerout pointerOut pointerover pointerOver scroll scroll toggle toggle touchmove touchMove wheel wheel".split(
          " "
        ),
        1
      ),
      Wt(Ft, 2);
    for (
      var Ht = "change selectionchange textInput compositionstart compositionend compositionupdate".split(
          " "
        ),
        Yt = 0;
      Yt < Ht.length;
      Yt++
    )
      zt.set(Ht[Yt], 0);
    var Bt = o.unstable_UserBlockingPriority,
      $t = o.unstable_runWithPriority,
      qt = !0;
    function Vt(e, t) {
      Qt(t, e, !1);
    }
    function Qt(e, t, n) {
      var r = zt.get(t);
      switch (void 0 === r ? 2 : r) {
        case 0:
          r = Gt.bind(null, t, 1, e);
          break;
        case 1:
          r = Xt.bind(null, t, 1, e);
          break;
        default:
          r = Kt.bind(null, t, 1, e);
      }
      n ? e.addEventListener(t, r, !0) : e.addEventListener(t, r, !1);
    }
    function Gt(e, t, n, r) {
      L || I();
      var a = Kt,
        o = L;
      L = !0;
      try {
        A(a, e, t, n, r);
      } finally {
        (L = o) || F();
      }
    }
    function Xt(e, t, n, r) {
      $t(Bt, Kt.bind(null, e, t, n, r));
    }
    function Kt(e, t, n, r) {
      if (qt)
        if (0 < bt.length && -1 < Tt.indexOf(e))
          (e = Ot(null, e, t, n, r)), bt.push(e);
        else {
          var a = Jt(e, t, n, r);
          if (null === a) Pt(e, r);
          else if (-1 < Tt.indexOf(e)) (e = Ot(a, e, t, n, r)), bt.push(e);
          else if (
            !(function (e, t, n, r, a) {
              switch (t) {
                case "focus":
                  return (wt = Nt(wt, e, t, n, r, a)), !0;
                case "dragenter":
                  return (Et = Nt(Et, e, t, n, r, a)), !0;
                case "mouseover":
                  return (xt = Nt(xt, e, t, n, r, a)), !0;
                case "pointerover":
                  var o = a.pointerId;
                  return _t.set(o, Nt(_t.get(o) || null, e, t, n, r, a)), !0;
                case "gotpointercapture":
                  return (
                    (o = a.pointerId),
                    St.set(o, Nt(St.get(o) || null, e, t, n, r, a)),
                    !0
                  );
              }
              return !1;
            })(a, e, t, n, r)
          ) {
            Pt(e, r), (e = dt(e, r, null, t));
            try {
              W(pt, e);
            } finally {
              ft(e);
            }
          }
        }
    }
    function Jt(e, t, n, r) {
      if (null !== (n = Cn((n = ut(r))))) {
        var a = Ze(n);
        if (null === a) n = null;
        else {
          var o = a.tag;
          if (13 === o) {
            if (null !== (n = et(a))) return n;
            n = null;
          } else if (3 === o) {
            if (a.stateNode.hydrate)
              return 3 === a.tag ? a.stateNode.containerInfo : null;
            n = null;
          } else a !== n && (n = null);
        }
      }
      e = dt(e, r, n, t);
      try {
        W(pt, e);
      } finally {
        ft(e);
      }
      return null;
    }
    var Zt = {
        animationIterationCount: !0,
        borderImageOutset: !0,
        borderImageSlice: !0,
        borderImageWidth: !0,
        boxFlex: !0,
        boxFlexGroup: !0,
        boxOrdinalGroup: !0,
        columnCount: !0,
        columns: !0,
        flex: !0,
        flexGrow: !0,
        flexPositive: !0,
        flexShrink: !0,
        flexNegative: !0,
        flexOrder: !0,
        gridArea: !0,
        gridRow: !0,
        gridRowEnd: !0,
        gridRowSpan: !0,
        gridRowStart: !0,
        gridColumn: !0,
        gridColumnEnd: !0,
        gridColumnSpan: !0,
        gridColumnStart: !0,
        fontWeight: !0,
        lineClamp: !0,
        lineHeight: !0,
        opacity: !0,
        order: !0,
        orphans: !0,
        tabSize: !0,
        widows: !0,
        zIndex: !0,
        zoom: !0,
        fillOpacity: !0,
        floodOpacity: !0,
        stopOpacity: !0,
        strokeDasharray: !0,
        strokeDashoffset: !0,
        strokeMiterlimit: !0,
        strokeOpacity: !0,
        strokeWidth: !0,
      },
      en = ["Webkit", "ms", "Moz", "O"];
    function tn(e, t, n) {
      return null == t || "boolean" == typeof t || "" === t
        ? ""
        : n ||
          "number" != typeof t ||
          0 === t ||
          (Zt.hasOwnProperty(e) && Zt[e])
        ? ("" + t).trim()
        : t + "px";
    }
    function nn(e, t) {
      for (var n in ((e = e.style), t))
        if (t.hasOwnProperty(n)) {
          var r = 0 === n.indexOf("--"),
            a = tn(n, t[n], r);
          "float" === n && (n = "cssFloat"),
            r ? e.setProperty(n, a) : (e[n] = a);
        }
    }
    Object.keys(Zt).forEach(function (e) {
      en.forEach(function (t) {
        (t = t + e.charAt(0).toUpperCase() + e.substring(1)), (Zt[t] = Zt[e]);
      });
    });
    var rn = a(
      { menuitem: !0 },
      {
        area: !0,
        base: !0,
        br: !0,
        col: !0,
        embed: !0,
        hr: !0,
        img: !0,
        input: !0,
        keygen: !0,
        link: !0,
        meta: !0,
        param: !0,
        source: !0,
        track: !0,
        wbr: !0,
      }
    );
    function an(e, t) {
      if (t) {
        if (rn[e] && (null != t.children || null != t.dangerouslySetInnerHTML))
          throw Error(i(137, e, ""));
        if (null != t.dangerouslySetInnerHTML) {
          if (null != t.children) throw Error(i(60));
          if (
            "object" != typeof t.dangerouslySetInnerHTML ||
            !("__html" in t.dangerouslySetInnerHTML)
          )
            throw Error(i(61));
        }
        if (null != t.style && "object" != typeof t.style)
          throw Error(i(62, ""));
      }
    }
    function on(e, t) {
      if (-1 === e.indexOf("-")) return "string" == typeof t.is;
      switch (e) {
        case "annotation-xml":
        case "color-profile":
        case "font-face":
        case "font-face-src":
        case "font-face-uri":
        case "font-face-format":
        case "font-face-name":
        case "missing-glyph":
          return !1;
        default:
          return !0;
      }
    }
    var ln = Re;
    function un(e, t) {
      var n = Je(
        (e = 9 === e.nodeType || 11 === e.nodeType ? e : e.ownerDocument)
      );
      t = k[t];
      for (var r = 0; r < t.length; r++) mt(t[r], e, n);
    }
    function cn() {}
    function sn(e) {
      if (
        void 0 ===
        (e = e || ("undefined" != typeof document ? document : void 0))
      )
        return null;
      try {
        return e.activeElement || e.body;
      } catch (t) {
        return e.body;
      }
    }
    function fn(e) {
      for (; e && e.firstChild; ) e = e.firstChild;
      return e;
    }
    function dn(e, t) {
      var n,
        r = fn(e);
      for (e = 0; r; ) {
        if (3 === r.nodeType) {
          if (((n = e + r.textContent.length), e <= t && n >= t))
            return { node: r, offset: t - e };
          e = n;
        }
        e: {
          for (; r; ) {
            if (r.nextSibling) {
              r = r.nextSibling;
              break e;
            }
            r = r.parentNode;
          }
          r = void 0;
        }
        r = fn(r);
      }
    }
    function pn() {
      for (var e = window, t = sn(); t instanceof e.HTMLIFrameElement; ) {
        try {
          var n = "string" == typeof t.contentWindow.location.href;
        } catch (e) {
          n = !1;
        }
        if (!n) break;
        t = sn((e = t.contentWindow).document);
      }
      return t;
    }
    function mn(e) {
      var t = e && e.nodeName && e.nodeName.toLowerCase();
      return (
        t &&
        (("input" === t &&
          ("text" === e.type ||
            "search" === e.type ||
            "tel" === e.type ||
            "url" === e.type ||
            "password" === e.type)) ||
          "textarea" === t ||
          "true" === e.contentEditable)
      );
    }
    var hn = null,
      yn = null;
    function gn(e, t) {
      switch (e) {
        case "button":
        case "input":
        case "select":
        case "textarea":
          return !!t.autoFocus;
      }
      return !1;
    }
    function vn(e, t) {
      return (
        "textarea" === e ||
        "option" === e ||
        "noscript" === e ||
        "string" == typeof t.children ||
        "number" == typeof t.children ||
        ("object" == typeof t.dangerouslySetInnerHTML &&
          null !== t.dangerouslySetInnerHTML &&
          null != t.dangerouslySetInnerHTML.__html)
      );
    }
    var bn = "function" == typeof setTimeout ? setTimeout : void 0,
      wn = "function" == typeof clearTimeout ? clearTimeout : void 0;
    function En(e) {
      for (; null != e; e = e.nextSibling) {
        var t = e.nodeType;
        if (1 === t || 3 === t) break;
      }
      return e;
    }
    function xn(e) {
      e = e.previousSibling;
      for (var t = 0; e; ) {
        if (8 === e.nodeType) {
          var n = e.data;
          if ("$" === n || "$!" === n || "$?" === n) {
            if (0 === t) return e;
            t--;
          } else "/$" === n && t++;
        }
        e = e.previousSibling;
      }
      return null;
    }
    var _n = Math.random().toString(36).slice(2),
      Sn = "__reactInternalInstance$" + _n,
      kn = "__reactEventHandlers$" + _n,
      Tn = "__reactContainere$" + _n;
    function Cn(e) {
      var t = e[Sn];
      if (t) return t;
      for (var n = e.parentNode; n; ) {
        if ((t = n[Tn] || n[Sn])) {
          if (
            ((n = t.alternate),
            null !== t.child || (null !== n && null !== n.child))
          )
            for (e = xn(e); null !== e; ) {
              if ((n = e[Sn])) return n;
              e = xn(e);
            }
          return t;
        }
        n = (e = n).parentNode;
      }
      return null;
    }
    function On(e) {
      return !(e = e[Sn] || e[Tn]) ||
        (5 !== e.tag && 6 !== e.tag && 13 !== e.tag && 3 !== e.tag)
        ? null
        : e;
    }
    function Pn(e) {
      if (5 === e.tag || 6 === e.tag) return e.stateNode;
      throw Error(i(33));
    }
    function Nn(e) {
      return e[kn] || null;
    }
    function jn(e) {
      do {
        e = e.return;
      } while (e && 5 !== e.tag);
      return e || null;
    }
    function Mn(e, t) {
      var n = e.stateNode;
      if (!n) return null;
      var r = m(n);
      if (!r) return null;
      n = r[t];
      e: switch (t) {
        case "onClick":
        case "onClickCapture":
        case "onDoubleClick":
        case "onDoubleClickCapture":
        case "onMouseDown":
        case "onMouseDownCapture":
        case "onMouseMove":
        case "onMouseMoveCapture":
        case "onMouseUp":
        case "onMouseUpCapture":
        case "onMouseEnter":
          (r = !r.disabled) ||
            (r = !(
              "button" === (e = e.type) ||
              "input" === e ||
              "select" === e ||
              "textarea" === e
            )),
            (e = !r);
          break e;
        default:
          e = !1;
      }
      if (e) return null;
      if (n && "function" != typeof n) throw Error(i(231, t, typeof n));
      return n;
    }
    function Dn(e, t, n) {
      (t = Mn(e, n.dispatchConfig.phasedRegistrationNames[t])) &&
        ((n._dispatchListeners = rt(n._dispatchListeners, t)),
        (n._dispatchInstances = rt(n._dispatchInstances, e)));
    }
    function Rn(e) {
      if (e && e.dispatchConfig.phasedRegistrationNames) {
        for (var t = e._targetInst, n = []; t; ) n.push(t), (t = jn(t));
        for (t = n.length; 0 < t--; ) Dn(n[t], "captured", e);
        for (t = 0; t < n.length; t++) Dn(n[t], "bubbled", e);
      }
    }
    function An(e, t, n) {
      e &&
        n &&
        n.dispatchConfig.registrationName &&
        (t = Mn(e, n.dispatchConfig.registrationName)) &&
        ((n._dispatchListeners = rt(n._dispatchListeners, t)),
        (n._dispatchInstances = rt(n._dispatchInstances, e)));
    }
    function In(e) {
      e && e.dispatchConfig.registrationName && An(e._targetInst, null, e);
    }
    function Un(e) {
      at(e, Rn);
    }
    var Ln = null,
      zn = null,
      Fn = null;
    function Wn() {
      if (Fn) return Fn;
      var e,
        t,
        n = zn,
        r = n.length,
        a = "value" in Ln ? Ln.value : Ln.textContent,
        o = a.length;
      for (e = 0; e < r && n[e] === a[e]; e++);
      var i = r - e;
      for (t = 1; t <= i && n[r - t] === a[o - t]; t++);
      return (Fn = a.slice(e, 1 < t ? 1 - t : void 0));
    }
    function Hn() {
      return !0;
    }
    function Yn() {
      return !1;
    }
    function Bn(e, t, n, r) {
      for (var a in ((this.dispatchConfig = e),
      (this._targetInst = t),
      (this.nativeEvent = n),
      (e = this.constructor.Interface)))
        e.hasOwnProperty(a) &&
          ((t = e[a])
            ? (this[a] = t(n))
            : "target" === a
            ? (this.target = r)
            : (this[a] = n[a]));
      return (
        (this.isDefaultPrevented = (
          null != n.defaultPrevented ? n.defaultPrevented : !1 === n.returnValue
        )
          ? Hn
          : Yn),
        (this.isPropagationStopped = Yn),
        this
      );
    }
    function $n(e, t, n, r) {
      if (this.eventPool.length) {
        var a = this.eventPool.pop();
        return this.call(a, e, t, n, r), a;
      }
      return new this(e, t, n, r);
    }
    function qn(e) {
      if (!(e instanceof this)) throw Error(i(279));
      e.destructor(), 10 > this.eventPool.length && this.eventPool.push(e);
    }
    function Vn(e) {
      (e.eventPool = []), (e.getPooled = $n), (e.release = qn);
    }
    a(Bn.prototype, {
      preventDefault: function () {
        this.defaultPrevented = !0;
        var e = this.nativeEvent;
        e &&
          (e.preventDefault
            ? e.preventDefault()
            : "unknown" != typeof e.returnValue && (e.returnValue = !1),
          (this.isDefaultPrevented = Hn));
      },
      stopPropagation: function () {
        var e = this.nativeEvent;
        e &&
          (e.stopPropagation
            ? e.stopPropagation()
            : "unknown" != typeof e.cancelBubble && (e.cancelBubble = !0),
          (this.isPropagationStopped = Hn));
      },
      persist: function () {
        this.isPersistent = Hn;
      },
      isPersistent: Yn,
      destructor: function () {
        var e,
          t = this.constructor.Interface;
        for (e in t) this[e] = null;
        (this.nativeEvent = this._targetInst = this.dispatchConfig = null),
          (this.isPropagationStopped = this.isDefaultPrevented = Yn),
          (this._dispatchInstances = this._dispatchListeners = null);
      },
    }),
      (Bn.Interface = {
        type: null,
        target: null,
        currentTarget: function () {
          return null;
        },
        eventPhase: null,
        bubbles: null,
        cancelable: null,
        timeStamp: function (e) {
          return e.timeStamp || Date.now();
        },
        defaultPrevented: null,
        isTrusted: null,
      }),
      (Bn.extend = function (e) {
        function t() {}
        function n() {
          return r.apply(this, arguments);
        }
        var r = this;
        t.prototype = r.prototype;
        var o = new t();
        return (
          a(o, n.prototype),
          (n.prototype = o),
          (n.prototype.constructor = n),
          (n.Interface = a({}, r.Interface, e)),
          (n.extend = r.extend),
          Vn(n),
          n
        );
      }),
      Vn(Bn);
    var Qn = Bn.extend({ data: null }),
      Gn = Bn.extend({ data: null }),
      Xn = [9, 13, 27, 32],
      Kn = C && "CompositionEvent" in window,
      Jn = null;
    C && "documentMode" in document && (Jn = document.documentMode);
    var Zn = C && "TextEvent" in window && !Jn,
      er = C && (!Kn || (Jn && 8 < Jn && 11 >= Jn)),
      tr = String.fromCharCode(32),
      nr = {
        beforeInput: {
          phasedRegistrationNames: {
            bubbled: "onBeforeInput",
            captured: "onBeforeInputCapture",
          },
          dependencies: ["compositionend", "keypress", "textInput", "paste"],
        },
        compositionEnd: {
          phasedRegistrationNames: {
            bubbled: "onCompositionEnd",
            captured: "onCompositionEndCapture",
          },
          dependencies: "blur compositionend keydown keypress keyup mousedown".split(
            " "
          ),
        },
        compositionStart: {
          phasedRegistrationNames: {
            bubbled: "onCompositionStart",
            captured: "onCompositionStartCapture",
          },
          dependencies: "blur compositionstart keydown keypress keyup mousedown".split(
            " "
          ),
        },
        compositionUpdate: {
          phasedRegistrationNames: {
            bubbled: "onCompositionUpdate",
            captured: "onCompositionUpdateCapture",
          },
          dependencies: "blur compositionupdate keydown keypress keyup mousedown".split(
            " "
          ),
        },
      },
      rr = !1;
    function ar(e, t) {
      switch (e) {
        case "keyup":
          return -1 !== Xn.indexOf(t.keyCode);
        case "keydown":
          return 229 !== t.keyCode;
        case "keypress":
        case "mousedown":
        case "blur":
          return !0;
        default:
          return !1;
      }
    }
    function or(e) {
      return "object" == typeof (e = e.detail) && "data" in e ? e.data : null;
    }
    var ir = !1;
    var lr = {
        eventTypes: nr,
        extractEvents: function (e, t, n, r) {
          var a;
          if (Kn)
            e: {
              switch (e) {
                case "compositionstart":
                  var o = nr.compositionStart;
                  break e;
                case "compositionend":
                  o = nr.compositionEnd;
                  break e;
                case "compositionupdate":
                  o = nr.compositionUpdate;
                  break e;
              }
              o = void 0;
            }
          else
            ir
              ? ar(e, n) && (o = nr.compositionEnd)
              : "keydown" === e &&
                229 === n.keyCode &&
                (o = nr.compositionStart);
          return (
            o
              ? (er &&
                  "ko" !== n.locale &&
                  (ir || o !== nr.compositionStart
                    ? o === nr.compositionEnd && ir && (a = Wn())
                    : ((zn = "value" in (Ln = r) ? Ln.value : Ln.textContent),
                      (ir = !0))),
                (o = Qn.getPooled(o, t, n, r)),
                a ? (o.data = a) : null !== (a = or(n)) && (o.data = a),
                Un(o),
                (a = o))
              : (a = null),
            (e = Zn
              ? (function (e, t) {
                  switch (e) {
                    case "compositionend":
                      return or(t);
                    case "keypress":
                      return 32 !== t.which ? null : ((rr = !0), tr);
                    case "textInput":
                      return (e = t.data) === tr && rr ? null : e;
                    default:
                      return null;
                  }
                })(e, n)
              : (function (e, t) {
                  if (ir)
                    return "compositionend" === e || (!Kn && ar(e, t))
                      ? ((e = Wn()), (Fn = zn = Ln = null), (ir = !1), e)
                      : null;
                  switch (e) {
                    case "paste":
                      return null;
                    case "keypress":
                      if (
                        !(t.ctrlKey || t.altKey || t.metaKey) ||
                        (t.ctrlKey && t.altKey)
                      ) {
                        if (t.char && 1 < t.char.length) return t.char;
                        if (t.which) return String.fromCharCode(t.which);
                      }
                      return null;
                    case "compositionend":
                      return er && "ko" !== t.locale ? null : t.data;
                    default:
                      return null;
                  }
                })(e, n))
              ? (((t = Gn.getPooled(nr.beforeInput, t, n, r)).data = e), Un(t))
              : (t = null),
            null === a ? t : null === t ? a : [a, t]
          );
        },
      },
      ur = {
        color: !0,
        date: !0,
        datetime: !0,
        "datetime-local": !0,
        email: !0,
        month: !0,
        number: !0,
        password: !0,
        range: !0,
        search: !0,
        tel: !0,
        text: !0,
        time: !0,
        url: !0,
        week: !0,
      };
    function cr(e) {
      var t = e && e.nodeName && e.nodeName.toLowerCase();
      return "input" === t ? !!ur[e.type] : "textarea" === t;
    }
    var sr = {
      change: {
        phasedRegistrationNames: {
          bubbled: "onChange",
          captured: "onChangeCapture",
        },
        dependencies: "blur change click focus input keydown keyup selectionchange".split(
          " "
        ),
      },
    };
    function fr(e, t, n) {
      return (
        ((e = Bn.getPooled(sr.change, e, t, n)).type = "change"), M(n), Un(e), e
      );
    }
    var dr = null,
      pr = null;
    function mr(e) {
      lt(e);
    }
    function hr(e) {
      if (Ee(Pn(e))) return e;
    }
    function yr(e, t) {
      if ("change" === e) return t;
    }
    var gr = !1;
    function vr() {
      dr && (dr.detachEvent("onpropertychange", br), (pr = dr = null));
    }
    function br(e) {
      if ("value" === e.propertyName && hr(pr))
        if (((e = fr(pr, e, ut(e))), L)) lt(e);
        else {
          L = !0;
          try {
            R(mr, e);
          } finally {
            (L = !1), F();
          }
        }
    }
    function wr(e, t, n) {
      "focus" === e
        ? (vr(), (pr = n), (dr = t).attachEvent("onpropertychange", br))
        : "blur" === e && vr();
    }
    function Er(e) {
      if ("selectionchange" === e || "keyup" === e || "keydown" === e)
        return hr(pr);
    }
    function xr(e, t) {
      if ("click" === e) return hr(t);
    }
    function _r(e, t) {
      if ("input" === e || "change" === e) return hr(t);
    }
    C &&
      (gr =
        ct("input") && (!document.documentMode || 9 < document.documentMode));
    var Sr = {
        eventTypes: sr,
        _isInputEventSupported: gr,
        extractEvents: function (e, t, n, r) {
          var a = t ? Pn(t) : window,
            o = a.nodeName && a.nodeName.toLowerCase();
          if ("select" === o || ("input" === o && "file" === a.type))
            var i = yr;
          else if (cr(a))
            if (gr) i = _r;
            else {
              i = Er;
              var l = wr;
            }
          else
            (o = a.nodeName) &&
              "input" === o.toLowerCase() &&
              ("checkbox" === a.type || "radio" === a.type) &&
              (i = xr);
          if (i && (i = i(e, t))) return fr(i, n, r);
          l && l(e, a, t),
            "blur" === e &&
              (e = a._wrapperState) &&
              e.controlled &&
              "number" === a.type &&
              Ce(a, "number", a.value);
        },
      },
      kr = Bn.extend({ view: null, detail: null }),
      Tr = {
        Alt: "altKey",
        Control: "ctrlKey",
        Meta: "metaKey",
        Shift: "shiftKey",
      };
    function Cr(e) {
      var t = this.nativeEvent;
      return t.getModifierState
        ? t.getModifierState(e)
        : !!(e = Tr[e]) && !!t[e];
    }
    function Or() {
      return Cr;
    }
    var Pr = 0,
      Nr = 0,
      jr = !1,
      Mr = !1,
      Dr = kr.extend({
        screenX: null,
        screenY: null,
        clientX: null,
        clientY: null,
        pageX: null,
        pageY: null,
        ctrlKey: null,
        shiftKey: null,
        altKey: null,
        metaKey: null,
        getModifierState: Or,
        button: null,
        buttons: null,
        relatedTarget: function (e) {
          return (
            e.relatedTarget ||
            (e.fromElement === e.srcElement ? e.toElement : e.fromElement)
          );
        },
        movementX: function (e) {
          if ("movementX" in e) return e.movementX;
          var t = Pr;
          return (
            (Pr = e.screenX),
            jr ? ("mousemove" === e.type ? e.screenX - t : 0) : ((jr = !0), 0)
          );
        },
        movementY: function (e) {
          if ("movementY" in e) return e.movementY;
          var t = Nr;
          return (
            (Nr = e.screenY),
            Mr ? ("mousemove" === e.type ? e.screenY - t : 0) : ((Mr = !0), 0)
          );
        },
      }),
      Rr = Dr.extend({
        pointerId: null,
        width: null,
        height: null,
        pressure: null,
        tangentialPressure: null,
        tiltX: null,
        tiltY: null,
        twist: null,
        pointerType: null,
        isPrimary: null,
      }),
      Ar = {
        mouseEnter: {
          registrationName: "onMouseEnter",
          dependencies: ["mouseout", "mouseover"],
        },
        mouseLeave: {
          registrationName: "onMouseLeave",
          dependencies: ["mouseout", "mouseover"],
        },
        pointerEnter: {
          registrationName: "onPointerEnter",
          dependencies: ["pointerout", "pointerover"],
        },
        pointerLeave: {
          registrationName: "onPointerLeave",
          dependencies: ["pointerout", "pointerover"],
        },
      },
      Ir = {
        eventTypes: Ar,
        extractEvents: function (e, t, n, r, a) {
          var o = "mouseover" === e || "pointerover" === e,
            i = "mouseout" === e || "pointerout" === e;
          if (
            (o && 0 == (32 & a) && (n.relatedTarget || n.fromElement)) ||
            (!i && !o)
          )
            return null;
          ((o =
            r.window === r
              ? r
              : (o = r.ownerDocument)
              ? o.defaultView || o.parentWindow
              : window),
          i)
            ? ((i = t),
              null !==
                (t = (t = n.relatedTarget || n.toElement) ? Cn(t) : null) &&
                (t !== Ze(t) || (5 !== t.tag && 6 !== t.tag)) &&
                (t = null))
            : (i = null);
          if (i === t) return null;
          if ("mouseout" === e || "mouseover" === e)
            var l = Dr,
              u = Ar.mouseLeave,
              c = Ar.mouseEnter,
              s = "mouse";
          else
            ("pointerout" !== e && "pointerover" !== e) ||
              ((l = Rr),
              (u = Ar.pointerLeave),
              (c = Ar.pointerEnter),
              (s = "pointer"));
          if (
            ((e = null == i ? o : Pn(i)),
            (o = null == t ? o : Pn(t)),
            ((u = l.getPooled(u, i, n, r)).type = s + "leave"),
            (u.target = e),
            (u.relatedTarget = o),
            ((n = l.getPooled(c, t, n, r)).type = s + "enter"),
            (n.target = o),
            (n.relatedTarget = e),
            (s = t),
            (r = i) && s)
          )
            e: {
              for (c = s, i = 0, e = l = r; e; e = jn(e)) i++;
              for (e = 0, t = c; t; t = jn(t)) e++;
              for (; 0 < i - e; ) (l = jn(l)), i--;
              for (; 0 < e - i; ) (c = jn(c)), e--;
              for (; i--; ) {
                if (l === c || l === c.alternate) break e;
                (l = jn(l)), (c = jn(c));
              }
              l = null;
            }
          else l = null;
          for (
            c = l, l = [];
            r && r !== c && (null === (i = r.alternate) || i !== c);

          )
            l.push(r), (r = jn(r));
          for (
            r = [];
            s && s !== c && (null === (i = s.alternate) || i !== c);

          )
            r.push(s), (s = jn(s));
          for (s = 0; s < l.length; s++) An(l[s], "bubbled", u);
          for (s = r.length; 0 < s--; ) An(r[s], "captured", n);
          return 0 == (64 & a) ? [u] : [u, n];
        },
      };
    var Ur =
        "function" == typeof Object.is
          ? Object.is
          : function (e, t) {
              return (
                (e === t && (0 !== e || 1 / e == 1 / t)) || (e != e && t != t)
              );
            },
      Lr = Object.prototype.hasOwnProperty;
    function zr(e, t) {
      if (Ur(e, t)) return !0;
      if (
        "object" != typeof e ||
        null === e ||
        "object" != typeof t ||
        null === t
      )
        return !1;
      var n = Object.keys(e),
        r = Object.keys(t);
      if (n.length !== r.length) return !1;
      for (r = 0; r < n.length; r++)
        if (!Lr.call(t, n[r]) || !Ur(e[n[r]], t[n[r]])) return !1;
      return !0;
    }
    var Fr = C && "documentMode" in document && 11 >= document.documentMode,
      Wr = {
        select: {
          phasedRegistrationNames: {
            bubbled: "onSelect",
            captured: "onSelectCapture",
          },
          dependencies: "blur contextmenu dragend focus keydown keyup mousedown mouseup selectionchange".split(
            " "
          ),
        },
      },
      Hr = null,
      Yr = null,
      Br = null,
      $r = !1;
    function qr(e, t) {
      var n =
        t.window === t ? t.document : 9 === t.nodeType ? t : t.ownerDocument;
      return $r || null == Hr || Hr !== sn(n)
        ? null
        : ("selectionStart" in (n = Hr) && mn(n)
            ? (n = { start: n.selectionStart, end: n.selectionEnd })
            : (n = {
                anchorNode: (n = (
                  (n.ownerDocument && n.ownerDocument.defaultView) ||
                  window
                ).getSelection()).anchorNode,
                anchorOffset: n.anchorOffset,
                focusNode: n.focusNode,
                focusOffset: n.focusOffset,
              }),
          Br && zr(Br, n)
            ? null
            : ((Br = n),
              ((e = Bn.getPooled(Wr.select, Yr, e, t)).type = "select"),
              (e.target = Hr),
              Un(e),
              e));
    }
    var Vr = {
        eventTypes: Wr,
        extractEvents: function (e, t, n, r, a, o) {
          if (
            !(o = !(a =
              o ||
              (r.window === r
                ? r.document
                : 9 === r.nodeType
                ? r
                : r.ownerDocument)))
          ) {
            e: {
              (a = Je(a)), (o = k.onSelect);
              for (var i = 0; i < o.length; i++)
                if (!a.has(o[i])) {
                  a = !1;
                  break e;
                }
              a = !0;
            }
            o = !a;
          }
          if (o) return null;
          switch (((a = t ? Pn(t) : window), e)) {
            case "focus":
              (cr(a) || "true" === a.contentEditable) &&
                ((Hr = a), (Yr = t), (Br = null));
              break;
            case "blur":
              Br = Yr = Hr = null;
              break;
            case "mousedown":
              $r = !0;
              break;
            case "contextmenu":
            case "mouseup":
            case "dragend":
              return ($r = !1), qr(n, r);
            case "selectionchange":
              if (Fr) break;
            case "keydown":
            case "keyup":
              return qr(n, r);
          }
          return null;
        },
      },
      Qr = Bn.extend({
        animationName: null,
        elapsedTime: null,
        pseudoElement: null,
      }),
      Gr = Bn.extend({
        clipboardData: function (e) {
          return "clipboardData" in e ? e.clipboardData : window.clipboardData;
        },
      }),
      Xr = kr.extend({ relatedTarget: null });
    function Kr(e) {
      var t = e.keyCode;
      return (
        "charCode" in e
          ? 0 === (e = e.charCode) && 13 === t && (e = 13)
          : (e = t),
        10 === e && (e = 13),
        32 <= e || 13 === e ? e : 0
      );
    }
    var Jr = {
        Esc: "Escape",
        Spacebar: " ",
        Left: "ArrowLeft",
        Up: "ArrowUp",
        Right: "ArrowRight",
        Down: "ArrowDown",
        Del: "Delete",
        Win: "OS",
        Menu: "ContextMenu",
        Apps: "ContextMenu",
        Scroll: "ScrollLock",
        MozPrintableKey: "Unidentified",
      },
      Zr = {
        8: "Backspace",
        9: "Tab",
        12: "Clear",
        13: "Enter",
        16: "Shift",
        17: "Control",
        18: "Alt",
        19: "Pause",
        20: "CapsLock",
        27: "Escape",
        32: " ",
        33: "PageUp",
        34: "PageDown",
        35: "End",
        36: "Home",
        37: "ArrowLeft",
        38: "ArrowUp",
        39: "ArrowRight",
        40: "ArrowDown",
        45: "Insert",
        46: "Delete",
        112: "F1",
        113: "F2",
        114: "F3",
        115: "F4",
        116: "F5",
        117: "F6",
        118: "F7",
        119: "F8",
        120: "F9",
        121: "F10",
        122: "F11",
        123: "F12",
        144: "NumLock",
        145: "ScrollLock",
        224: "Meta",
      },
      ea = kr.extend({
        key: function (e) {
          if (e.key) {
            var t = Jr[e.key] || e.key;
            if ("Unidentified" !== t) return t;
          }
          return "keypress" === e.type
            ? 13 === (e = Kr(e))
              ? "Enter"
              : String.fromCharCode(e)
            : "keydown" === e.type || "keyup" === e.type
            ? Zr[e.keyCode] || "Unidentified"
            : "";
        },
        location: null,
        ctrlKey: null,
        shiftKey: null,
        altKey: null,
        metaKey: null,
        repeat: null,
        locale: null,
        getModifierState: Or,
        charCode: function (e) {
          return "keypress" === e.type ? Kr(e) : 0;
        },
        keyCode: function (e) {
          return "keydown" === e.type || "keyup" === e.type ? e.keyCode : 0;
        },
        which: function (e) {
          return "keypress" === e.type
            ? Kr(e)
            : "keydown" === e.type || "keyup" === e.type
            ? e.keyCode
            : 0;
        },
      }),
      ta = Dr.extend({ dataTransfer: null }),
      na = kr.extend({
        touches: null,
        targetTouches: null,
        changedTouches: null,
        altKey: null,
        metaKey: null,
        ctrlKey: null,
        shiftKey: null,
        getModifierState: Or,
      }),
      ra = Bn.extend({
        propertyName: null,
        elapsedTime: null,
        pseudoElement: null,
      }),
      aa = Dr.extend({
        deltaX: function (e) {
          return "deltaX" in e
            ? e.deltaX
            : "wheelDeltaX" in e
            ? -e.wheelDeltaX
            : 0;
        },
        deltaY: function (e) {
          return "deltaY" in e
            ? e.deltaY
            : "wheelDeltaY" in e
            ? -e.wheelDeltaY
            : "wheelDelta" in e
            ? -e.wheelDelta
            : 0;
        },
        deltaZ: null,
        deltaMode: null,
      }),
      oa = {
        eventTypes: Ut,
        extractEvents: function (e, t, n, r) {
          var a = Lt.get(e);
          if (!a) return null;
          switch (e) {
            case "keypress":
              if (0 === Kr(n)) return null;
            case "keydown":
            case "keyup":
              e = ea;
              break;
            case "blur":
            case "focus":
              e = Xr;
              break;
            case "click":
              if (2 === n.button) return null;
            case "auxclick":
            case "dblclick":
            case "mousedown":
            case "mousemove":
            case "mouseup":
            case "mouseout":
            case "mouseover":
            case "contextmenu":
              e = Dr;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              e = ta;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              e = na;
              break;
            case qe:
            case Ve:
            case Qe:
              e = Qr;
              break;
            case Ge:
              e = ra;
              break;
            case "scroll":
              e = kr;
              break;
            case "wheel":
              e = aa;
              break;
            case "copy":
            case "cut":
            case "paste":
              e = Gr;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              e = Rr;
              break;
            default:
              e = Bn;
          }
          return Un((t = e.getPooled(a, t, n, r))), t;
        },
      };
    if (v) throw Error(i(101));
    (v = Array.prototype.slice.call(
      "ResponderEventPlugin SimpleEventPlugin EnterLeaveEventPlugin ChangeEventPlugin SelectEventPlugin BeforeInputEventPlugin".split(
        " "
      )
    )),
      w(),
      (m = Nn),
      (h = On),
      (y = Pn),
      T({
        SimpleEventPlugin: oa,
        EnterLeaveEventPlugin: Ir,
        ChangeEventPlugin: Sr,
        SelectEventPlugin: Vr,
        BeforeInputEventPlugin: lr,
      });
    var ia = [],
      la = -1;
    function ua(e) {
      0 > la || ((e.current = ia[la]), (ia[la] = null), la--);
    }
    function ca(e, t) {
      la++, (ia[la] = e.current), (e.current = t);
    }
    var sa = {},
      fa = { current: sa },
      da = { current: !1 },
      pa = sa;
    function ma(e, t) {
      var n = e.type.contextTypes;
      if (!n) return sa;
      var r = e.stateNode;
      if (r && r.__reactInternalMemoizedUnmaskedChildContext === t)
        return r.__reactInternalMemoizedMaskedChildContext;
      var a,
        o = {};
      for (a in n) o[a] = t[a];
      return (
        r &&
          (((e = e.stateNode).__reactInternalMemoizedUnmaskedChildContext = t),
          (e.__reactInternalMemoizedMaskedChildContext = o)),
        o
      );
    }
    function ha(e) {
      return null != (e = e.childContextTypes);
    }
    function ya() {
      ua(da), ua(fa);
    }
    function ga(e, t, n) {
      if (fa.current !== sa) throw Error(i(168));
      ca(fa, t), ca(da, n);
    }
    function va(e, t, n) {
      var r = e.stateNode;
      if (((e = t.childContextTypes), "function" != typeof r.getChildContext))
        return n;
      for (var o in (r = r.getChildContext()))
        if (!(o in e)) throw Error(i(108, ye(t) || "Unknown", o));
      return a({}, n, {}, r);
    }
    function ba(e) {
      return (
        (e =
          ((e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext) ||
          sa),
        (pa = fa.current),
        ca(fa, e),
        ca(da, da.current),
        !0
      );
    }
    function wa(e, t, n) {
      var r = e.stateNode;
      if (!r) throw Error(i(169));
      n
        ? ((e = va(e, t, pa)),
          (r.__reactInternalMemoizedMergedChildContext = e),
          ua(da),
          ua(fa),
          ca(fa, e))
        : ua(da),
        ca(da, n);
    }
    var Ea = o.unstable_runWithPriority,
      xa = o.unstable_scheduleCallback,
      _a = o.unstable_cancelCallback,
      Sa = o.unstable_requestPaint,
      ka = o.unstable_now,
      Ta = o.unstable_getCurrentPriorityLevel,
      Ca = o.unstable_ImmediatePriority,
      Oa = o.unstable_UserBlockingPriority,
      Pa = o.unstable_NormalPriority,
      Na = o.unstable_LowPriority,
      ja = o.unstable_IdlePriority,
      Ma = {},
      Da = o.unstable_shouldYield,
      Ra = void 0 !== Sa ? Sa : function () {},
      Aa = null,
      Ia = null,
      Ua = !1,
      La = ka(),
      za =
        1e4 > La
          ? ka
          : function () {
              return ka() - La;
            };
    function Fa() {
      switch (Ta()) {
        case Ca:
          return 99;
        case Oa:
          return 98;
        case Pa:
          return 97;
        case Na:
          return 96;
        case ja:
          return 95;
        default:
          throw Error(i(332));
      }
    }
    function Wa(e) {
      switch (e) {
        case 99:
          return Ca;
        case 98:
          return Oa;
        case 97:
          return Pa;
        case 96:
          return Na;
        case 95:
          return ja;
        default:
          throw Error(i(332));
      }
    }
    function Ha(e, t) {
      return (e = Wa(e)), Ea(e, t);
    }
    function Ya(e, t, n) {
      return (e = Wa(e)), xa(e, t, n);
    }
    function Ba(e) {
      return null === Aa ? ((Aa = [e]), (Ia = xa(Ca, qa))) : Aa.push(e), Ma;
    }
    function $a() {
      if (null !== Ia) {
        var e = Ia;
        (Ia = null), _a(e);
      }
      qa();
    }
    function qa() {
      if (!Ua && null !== Aa) {
        Ua = !0;
        var e = 0;
        try {
          var t = Aa;
          Ha(99, function () {
            for (; e < t.length; e++) {
              var n = t[e];
              do {
                n = n(!0);
              } while (null !== n);
            }
          }),
            (Aa = null);
        } catch (t) {
          throw (null !== Aa && (Aa = Aa.slice(e + 1)), xa(Ca, $a), t);
        } finally {
          Ua = !1;
        }
      }
    }
    function Va(e, t, n) {
      return (
        1073741821 - (1 + (((1073741821 - e + t / 10) / (n /= 10)) | 0)) * n
      );
    }
    function Qa(e, t) {
      if (e && e.defaultProps)
        for (var n in ((t = a({}, t)), (e = e.defaultProps)))
          void 0 === t[n] && (t[n] = e[n]);
      return t;
    }
    var Ga = { current: null },
      Xa = null,
      Ka = null,
      Ja = null;
    function Za() {
      Ja = Ka = Xa = null;
    }
    function eo(e) {
      var t = Ga.current;
      ua(Ga), (e.type._context._currentValue = t);
    }
    function to(e, t) {
      for (; null !== e; ) {
        var n = e.alternate;
        if (e.childExpirationTime < t)
          (e.childExpirationTime = t),
            null !== n &&
              n.childExpirationTime < t &&
              (n.childExpirationTime = t);
        else {
          if (!(null !== n && n.childExpirationTime < t)) break;
          n.childExpirationTime = t;
        }
        e = e.return;
      }
    }
    function no(e, t) {
      (Xa = e),
        (Ja = Ka = null),
        null !== (e = e.dependencies) &&
          null !== e.firstContext &&
          (e.expirationTime >= t && (Ni = !0), (e.firstContext = null));
    }
    function ro(e, t) {
      if (Ja !== e && !1 !== t && 0 !== t)
        if (
          (("number" == typeof t && 1073741823 !== t) ||
            ((Ja = e), (t = 1073741823)),
          (t = { context: e, observedBits: t, next: null }),
          null === Ka)
        ) {
          if (null === Xa) throw Error(i(308));
          (Ka = t),
            (Xa.dependencies = {
              expirationTime: 0,
              firstContext: t,
              responders: null,
            });
        } else Ka = Ka.next = t;
      return e._currentValue;
    }
    var ao = !1;
    function oo(e) {
      e.updateQueue = {
        baseState: e.memoizedState,
        baseQueue: null,
        shared: { pending: null },
        effects: null,
      };
    }
    function io(e, t) {
      (e = e.updateQueue),
        t.updateQueue === e &&
          (t.updateQueue = {
            baseState: e.baseState,
            baseQueue: e.baseQueue,
            shared: e.shared,
            effects: e.effects,
          });
    }
    function lo(e, t) {
      return ((e = {
        expirationTime: e,
        suspenseConfig: t,
        tag: 0,
        payload: null,
        callback: null,
        next: null,
      }).next = e);
    }
    function uo(e, t) {
      if (null !== (e = e.updateQueue)) {
        var n = (e = e.shared).pending;
        null === n ? (t.next = t) : ((t.next = n.next), (n.next = t)),
          (e.pending = t);
      }
    }
    function co(e, t) {
      var n = e.alternate;
      null !== n && io(n, e),
        null === (n = (e = e.updateQueue).baseQueue)
          ? ((e.baseQueue = t.next = t), (t.next = t))
          : ((t.next = n.next), (n.next = t));
    }
    function so(e, t, n, r) {
      var o = e.updateQueue;
      ao = !1;
      var i = o.baseQueue,
        l = o.shared.pending;
      if (null !== l) {
        if (null !== i) {
          var u = i.next;
          (i.next = l.next), (l.next = u);
        }
        (i = l),
          (o.shared.pending = null),
          null !== (u = e.alternate) &&
            null !== (u = u.updateQueue) &&
            (u.baseQueue = l);
      }
      if (null !== i) {
        u = i.next;
        var c = o.baseState,
          s = 0,
          f = null,
          d = null,
          p = null;
        if (null !== u)
          for (var m = u; ; ) {
            if ((l = m.expirationTime) < r) {
              var h = {
                expirationTime: m.expirationTime,
                suspenseConfig: m.suspenseConfig,
                tag: m.tag,
                payload: m.payload,
                callback: m.callback,
                next: null,
              };
              null === p ? ((d = p = h), (f = c)) : (p = p.next = h),
                l > s && (s = l);
            } else {
              null !== p &&
                (p = p.next = {
                  expirationTime: 1073741823,
                  suspenseConfig: m.suspenseConfig,
                  tag: m.tag,
                  payload: m.payload,
                  callback: m.callback,
                  next: null,
                }),
                ou(l, m.suspenseConfig);
              e: {
                var y = e,
                  g = m;
                switch (((l = t), (h = n), g.tag)) {
                  case 1:
                    if ("function" == typeof (y = g.payload)) {
                      c = y.call(h, c, l);
                      break e;
                    }
                    c = y;
                    break e;
                  case 3:
                    y.effectTag = (-4097 & y.effectTag) | 64;
                  case 0:
                    if (
                      null ==
                      (l =
                        "function" == typeof (y = g.payload)
                          ? y.call(h, c, l)
                          : y)
                    )
                      break e;
                    c = a({}, c, l);
                    break e;
                  case 2:
                    ao = !0;
                }
              }
              null !== m.callback &&
                ((e.effectTag |= 32),
                null === (l = o.effects) ? (o.effects = [m]) : l.push(m));
            }
            if (null === (m = m.next) || m === u) {
              if (null === (l = o.shared.pending)) break;
              (m = i.next = l.next),
                (l.next = u),
                (o.baseQueue = i = l),
                (o.shared.pending = null);
            }
          }
        null === p ? (f = c) : (p.next = d),
          (o.baseState = f),
          (o.baseQueue = p),
          iu(s),
          (e.expirationTime = s),
          (e.memoizedState = c);
      }
    }
    function fo(e, t, n) {
      if (((e = t.effects), (t.effects = null), null !== e))
        for (t = 0; t < e.length; t++) {
          var r = e[t],
            a = r.callback;
          if (null !== a) {
            if (((r.callback = null), (r = a), (a = n), "function" != typeof r))
              throw Error(i(191, r));
            r.call(a);
          }
        }
    }
    var po = X.ReactCurrentBatchConfig,
      mo = new r.Component().refs;
    function ho(e, t, n, r) {
      (n = null == (n = n(r, (t = e.memoizedState))) ? t : a({}, t, n)),
        (e.memoizedState = n),
        0 === e.expirationTime && (e.updateQueue.baseState = n);
    }
    var yo = {
      isMounted: function (e) {
        return !!(e = e._reactInternalFiber) && Ze(e) === e;
      },
      enqueueSetState: function (e, t, n) {
        e = e._reactInternalFiber;
        var r = ql(),
          a = po.suspense;
        ((a = lo((r = Vl(r, e, a)), a)).payload = t),
          null != n && (a.callback = n),
          uo(e, a),
          Ql(e, r);
      },
      enqueueReplaceState: function (e, t, n) {
        e = e._reactInternalFiber;
        var r = ql(),
          a = po.suspense;
        ((a = lo((r = Vl(r, e, a)), a)).tag = 1),
          (a.payload = t),
          null != n && (a.callback = n),
          uo(e, a),
          Ql(e, r);
      },
      enqueueForceUpdate: function (e, t) {
        e = e._reactInternalFiber;
        var n = ql(),
          r = po.suspense;
        ((r = lo((n = Vl(n, e, r)), r)).tag = 2),
          null != t && (r.callback = t),
          uo(e, r),
          Ql(e, n);
      },
    };
    function go(e, t, n, r, a, o, i) {
      return "function" == typeof (e = e.stateNode).shouldComponentUpdate
        ? e.shouldComponentUpdate(r, o, i)
        : !t.prototype ||
            !t.prototype.isPureReactComponent ||
            !zr(n, r) ||
            !zr(a, o);
    }
    function vo(e, t, n) {
      var r = !1,
        a = sa,
        o = t.contextType;
      return (
        "object" == typeof o && null !== o
          ? (o = ro(o))
          : ((a = ha(t) ? pa : fa.current),
            (o = (r = null != (r = t.contextTypes)) ? ma(e, a) : sa)),
        (t = new t(n, o)),
        (e.memoizedState =
          null !== t.state && void 0 !== t.state ? t.state : null),
        (t.updater = yo),
        (e.stateNode = t),
        (t._reactInternalFiber = e),
        r &&
          (((e = e.stateNode).__reactInternalMemoizedUnmaskedChildContext = a),
          (e.__reactInternalMemoizedMaskedChildContext = o)),
        t
      );
    }
    function bo(e, t, n, r) {
      (e = t.state),
        "function" == typeof t.componentWillReceiveProps &&
          t.componentWillReceiveProps(n, r),
        "function" == typeof t.UNSAFE_componentWillReceiveProps &&
          t.UNSAFE_componentWillReceiveProps(n, r),
        t.state !== e && yo.enqueueReplaceState(t, t.state, null);
    }
    function wo(e, t, n, r) {
      var a = e.stateNode;
      (a.props = n), (a.state = e.memoizedState), (a.refs = mo), oo(e);
      var o = t.contextType;
      "object" == typeof o && null !== o
        ? (a.context = ro(o))
        : ((o = ha(t) ? pa : fa.current), (a.context = ma(e, o))),
        so(e, n, a, r),
        (a.state = e.memoizedState),
        "function" == typeof (o = t.getDerivedStateFromProps) &&
          (ho(e, t, o, n), (a.state = e.memoizedState)),
        "function" == typeof t.getDerivedStateFromProps ||
          "function" == typeof a.getSnapshotBeforeUpdate ||
          ("function" != typeof a.UNSAFE_componentWillMount &&
            "function" != typeof a.componentWillMount) ||
          ((t = a.state),
          "function" == typeof a.componentWillMount && a.componentWillMount(),
          "function" == typeof a.UNSAFE_componentWillMount &&
            a.UNSAFE_componentWillMount(),
          t !== a.state && yo.enqueueReplaceState(a, a.state, null),
          so(e, n, a, r),
          (a.state = e.memoizedState)),
        "function" == typeof a.componentDidMount && (e.effectTag |= 4);
    }
    var Eo = Array.isArray;
    function xo(e, t, n) {
      if (
        null !== (e = n.ref) &&
        "function" != typeof e &&
        "object" != typeof e
      ) {
        if (n._owner) {
          if ((n = n._owner)) {
            if (1 !== n.tag) throw Error(i(309));
            var r = n.stateNode;
          }
          if (!r) throw Error(i(147, e));
          var a = "" + e;
          return null !== t &&
            null !== t.ref &&
            "function" == typeof t.ref &&
            t.ref._stringRef === a
            ? t.ref
            : (((t = function (e) {
                var t = r.refs;
                t === mo && (t = r.refs = {}),
                  null === e ? delete t[a] : (t[a] = e);
              })._stringRef = a),
              t);
        }
        if ("string" != typeof e) throw Error(i(284));
        if (!n._owner) throw Error(i(290, e));
      }
      return e;
    }
    function _o(e, t) {
      if ("textarea" !== e.type)
        throw Error(
          i(
            31,
            "[object Object]" === Object.prototype.toString.call(t)
              ? "object with keys {" + Object.keys(t).join(", ") + "}"
              : t,
            ""
          )
        );
    }
    function So(e) {
      function t(t, n) {
        if (e) {
          var r = t.lastEffect;
          null !== r
            ? ((r.nextEffect = n), (t.lastEffect = n))
            : (t.firstEffect = t.lastEffect = n),
            (n.nextEffect = null),
            (n.effectTag = 8);
        }
      }
      function n(n, r) {
        if (!e) return null;
        for (; null !== r; ) t(n, r), (r = r.sibling);
        return null;
      }
      function r(e, t) {
        for (e = new Map(); null !== t; )
          null !== t.key ? e.set(t.key, t) : e.set(t.index, t), (t = t.sibling);
        return e;
      }
      function a(e, t) {
        return ((e = Tu(e, t)).index = 0), (e.sibling = null), e;
      }
      function o(t, n, r) {
        return (
          (t.index = r),
          e
            ? null !== (r = t.alternate)
              ? (r = r.index) < n
                ? ((t.effectTag = 2), n)
                : r
              : ((t.effectTag = 2), n)
            : n
        );
      }
      function l(t) {
        return e && null === t.alternate && (t.effectTag = 2), t;
      }
      function u(e, t, n, r) {
        return null === t || 6 !== t.tag
          ? (((t = Pu(n, e.mode, r)).return = e), t)
          : (((t = a(t, n)).return = e), t);
      }
      function c(e, t, n, r) {
        return null !== t && t.elementType === n.type
          ? (((r = a(t, n.props)).ref = xo(e, t, n)), (r.return = e), r)
          : (((r = Cu(n.type, n.key, n.props, null, e.mode, r)).ref = xo(
              e,
              t,
              n
            )),
            (r.return = e),
            r);
      }
      function s(e, t, n, r) {
        return null === t ||
          4 !== t.tag ||
          t.stateNode.containerInfo !== n.containerInfo ||
          t.stateNode.implementation !== n.implementation
          ? (((t = Nu(n, e.mode, r)).return = e), t)
          : (((t = a(t, n.children || [])).return = e), t);
      }
      function f(e, t, n, r, o) {
        return null === t || 7 !== t.tag
          ? (((t = Ou(n, e.mode, r, o)).return = e), t)
          : (((t = a(t, n)).return = e), t);
      }
      function d(e, t, n) {
        if ("string" == typeof t || "number" == typeof t)
          return ((t = Pu("" + t, e.mode, n)).return = e), t;
        if ("object" == typeof t && null !== t) {
          switch (t.$$typeof) {
            case ee:
              return (
                ((n = Cu(t.type, t.key, t.props, null, e.mode, n)).ref = xo(
                  e,
                  null,
                  t
                )),
                (n.return = e),
                n
              );
            case te:
              return ((t = Nu(t, e.mode, n)).return = e), t;
          }
          if (Eo(t) || he(t))
            return ((t = Ou(t, e.mode, n, null)).return = e), t;
          _o(e, t);
        }
        return null;
      }
      function p(e, t, n, r) {
        var a = null !== t ? t.key : null;
        if ("string" == typeof n || "number" == typeof n)
          return null !== a ? null : u(e, t, "" + n, r);
        if ("object" == typeof n && null !== n) {
          switch (n.$$typeof) {
            case ee:
              return n.key === a
                ? n.type === ne
                  ? f(e, t, n.props.children, r, a)
                  : c(e, t, n, r)
                : null;
            case te:
              return n.key === a ? s(e, t, n, r) : null;
          }
          if (Eo(n) || he(n)) return null !== a ? null : f(e, t, n, r, null);
          _o(e, n);
        }
        return null;
      }
      function m(e, t, n, r, a) {
        if ("string" == typeof r || "number" == typeof r)
          return u(t, (e = e.get(n) || null), "" + r, a);
        if ("object" == typeof r && null !== r) {
          switch (r.$$typeof) {
            case ee:
              return (
                (e = e.get(null === r.key ? n : r.key) || null),
                r.type === ne
                  ? f(t, e, r.props.children, a, r.key)
                  : c(t, e, r, a)
              );
            case te:
              return s(
                t,
                (e = e.get(null === r.key ? n : r.key) || null),
                r,
                a
              );
          }
          if (Eo(r) || he(r)) return f(t, (e = e.get(n) || null), r, a, null);
          _o(t, r);
        }
        return null;
      }
      function h(a, i, l, u) {
        for (
          var c = null, s = null, f = i, h = (i = 0), y = null;
          null !== f && h < l.length;
          h++
        ) {
          f.index > h ? ((y = f), (f = null)) : (y = f.sibling);
          var g = p(a, f, l[h], u);
          if (null === g) {
            null === f && (f = y);
            break;
          }
          e && f && null === g.alternate && t(a, f),
            (i = o(g, i, h)),
            null === s ? (c = g) : (s.sibling = g),
            (s = g),
            (f = y);
        }
        if (h === l.length) return n(a, f), c;
        if (null === f) {
          for (; h < l.length; h++)
            null !== (f = d(a, l[h], u)) &&
              ((i = o(f, i, h)),
              null === s ? (c = f) : (s.sibling = f),
              (s = f));
          return c;
        }
        for (f = r(a, f); h < l.length; h++)
          null !== (y = m(f, a, h, l[h], u)) &&
            (e && null !== y.alternate && f.delete(null === y.key ? h : y.key),
            (i = o(y, i, h)),
            null === s ? (c = y) : (s.sibling = y),
            (s = y));
        return (
          e &&
            f.forEach(function (e) {
              return t(a, e);
            }),
          c
        );
      }
      function y(a, l, u, c) {
        var s = he(u);
        if ("function" != typeof s) throw Error(i(150));
        if (null == (u = s.call(u))) throw Error(i(151));
        for (
          var f = (s = null), h = l, y = (l = 0), g = null, v = u.next();
          null !== h && !v.done;
          y++, v = u.next()
        ) {
          h.index > y ? ((g = h), (h = null)) : (g = h.sibling);
          var b = p(a, h, v.value, c);
          if (null === b) {
            null === h && (h = g);
            break;
          }
          e && h && null === b.alternate && t(a, h),
            (l = o(b, l, y)),
            null === f ? (s = b) : (f.sibling = b),
            (f = b),
            (h = g);
        }
        if (v.done) return n(a, h), s;
        if (null === h) {
          for (; !v.done; y++, v = u.next())
            null !== (v = d(a, v.value, c)) &&
              ((l = o(v, l, y)),
              null === f ? (s = v) : (f.sibling = v),
              (f = v));
          return s;
        }
        for (h = r(a, h); !v.done; y++, v = u.next())
          null !== (v = m(h, a, y, v.value, c)) &&
            (e && null !== v.alternate && h.delete(null === v.key ? y : v.key),
            (l = o(v, l, y)),
            null === f ? (s = v) : (f.sibling = v),
            (f = v));
        return (
          e &&
            h.forEach(function (e) {
              return t(a, e);
            }),
          s
        );
      }
      return function (e, r, o, u) {
        var c =
          "object" == typeof o && null !== o && o.type === ne && null === o.key;
        c && (o = o.props.children);
        var s = "object" == typeof o && null !== o;
        if (s)
          switch (o.$$typeof) {
            case ee:
              e: {
                for (s = o.key, c = r; null !== c; ) {
                  if (c.key === s) {
                    switch (c.tag) {
                      case 7:
                        if (o.type === ne) {
                          n(e, c.sibling),
                            ((r = a(c, o.props.children)).return = e),
                            (e = r);
                          break e;
                        }
                        break;
                      default:
                        if (c.elementType === o.type) {
                          n(e, c.sibling),
                            ((r = a(c, o.props)).ref = xo(e, c, o)),
                            (r.return = e),
                            (e = r);
                          break e;
                        }
                    }
                    n(e, c);
                    break;
                  }
                  t(e, c), (c = c.sibling);
                }
                o.type === ne
                  ? (((r = Ou(o.props.children, e.mode, u, o.key)).return = e),
                    (e = r))
                  : (((u = Cu(
                      o.type,
                      o.key,
                      o.props,
                      null,
                      e.mode,
                      u
                    )).ref = xo(e, r, o)),
                    (u.return = e),
                    (e = u));
              }
              return l(e);
            case te:
              e: {
                for (c = o.key; null !== r; ) {
                  if (r.key === c) {
                    if (
                      4 === r.tag &&
                      r.stateNode.containerInfo === o.containerInfo &&
                      r.stateNode.implementation === o.implementation
                    ) {
                      n(e, r.sibling),
                        ((r = a(r, o.children || [])).return = e),
                        (e = r);
                      break e;
                    }
                    n(e, r);
                    break;
                  }
                  t(e, r), (r = r.sibling);
                }
                ((r = Nu(o, e.mode, u)).return = e), (e = r);
              }
              return l(e);
          }
        if ("string" == typeof o || "number" == typeof o)
          return (
            (o = "" + o),
            null !== r && 6 === r.tag
              ? (n(e, r.sibling), ((r = a(r, o)).return = e), (e = r))
              : (n(e, r), ((r = Pu(o, e.mode, u)).return = e), (e = r)),
            l(e)
          );
        if (Eo(o)) return h(e, r, o, u);
        if (he(o)) return y(e, r, o, u);
        if ((s && _o(e, o), void 0 === o && !c))
          switch (e.tag) {
            case 1:
            case 0:
              throw (
                ((e = e.type),
                Error(i(152, e.displayName || e.name || "Component")))
              );
          }
        return n(e, r);
      };
    }
    var ko = So(!0),
      To = So(!1),
      Co = {},
      Oo = { current: Co },
      Po = { current: Co },
      No = { current: Co };
    function jo(e) {
      if (e === Co) throw Error(i(174));
      return e;
    }
    function Mo(e, t) {
      switch ((ca(No, t), ca(Po, e), ca(Oo, Co), (e = t.nodeType))) {
        case 9:
        case 11:
          t = (t = t.documentElement) ? t.namespaceURI : Ue(null, "");
          break;
        default:
          t = Ue(
            (t = (e = 8 === e ? t.parentNode : t).namespaceURI || null),
            (e = e.tagName)
          );
      }
      ua(Oo), ca(Oo, t);
    }
    function Do() {
      ua(Oo), ua(Po), ua(No);
    }
    function Ro(e) {
      jo(No.current);
      var t = jo(Oo.current),
        n = Ue(t, e.type);
      t !== n && (ca(Po, e), ca(Oo, n));
    }
    function Ao(e) {
      Po.current === e && (ua(Oo), ua(Po));
    }
    var Io = { current: 0 };
    function Uo(e) {
      for (var t = e; null !== t; ) {
        if (13 === t.tag) {
          var n = t.memoizedState;
          if (
            null !== n &&
            (null === (n = n.dehydrated) || "$?" === n.data || "$!" === n.data)
          )
            return t;
        } else if (19 === t.tag && void 0 !== t.memoizedProps.revealOrder) {
          if (0 != (64 & t.effectTag)) return t;
        } else if (null !== t.child) {
          (t.child.return = t), (t = t.child);
          continue;
        }
        if (t === e) break;
        for (; null === t.sibling; ) {
          if (null === t.return || t.return === e) return null;
          t = t.return;
        }
        (t.sibling.return = t.return), (t = t.sibling);
      }
      return null;
    }
    function Lo(e, t) {
      return { responder: e, props: t };
    }
    var zo = X.ReactCurrentDispatcher,
      Fo = X.ReactCurrentBatchConfig,
      Wo = 0,
      Ho = null,
      Yo = null,
      Bo = null,
      $o = !1;
    function qo() {
      throw Error(i(321));
    }
    function Vo(e, t) {
      if (null === t) return !1;
      for (var n = 0; n < t.length && n < e.length; n++)
        if (!Ur(e[n], t[n])) return !1;
      return !0;
    }
    function Qo(e, t, n, r, a, o) {
      if (
        ((Wo = o),
        (Ho = t),
        (t.memoizedState = null),
        (t.updateQueue = null),
        (t.expirationTime = 0),
        (zo.current = null === e || null === e.memoizedState ? gi : vi),
        (e = n(r, a)),
        t.expirationTime === Wo)
      ) {
        o = 0;
        do {
          if (((t.expirationTime = 0), !(25 > o))) throw Error(i(301));
          (o += 1),
            (Bo = Yo = null),
            (t.updateQueue = null),
            (zo.current = bi),
            (e = n(r, a));
        } while (t.expirationTime === Wo);
      }
      if (
        ((zo.current = yi),
        (t = null !== Yo && null !== Yo.next),
        (Wo = 0),
        (Bo = Yo = Ho = null),
        ($o = !1),
        t)
      )
        throw Error(i(300));
      return e;
    }
    function Go() {
      var e = {
        memoizedState: null,
        baseState: null,
        baseQueue: null,
        queue: null,
        next: null,
      };
      return null === Bo ? (Ho.memoizedState = Bo = e) : (Bo = Bo.next = e), Bo;
    }
    function Xo() {
      if (null === Yo) {
        var e = Ho.alternate;
        e = null !== e ? e.memoizedState : null;
      } else e = Yo.next;
      var t = null === Bo ? Ho.memoizedState : Bo.next;
      if (null !== t) (Bo = t), (Yo = e);
      else {
        if (null === e) throw Error(i(310));
        (e = {
          memoizedState: (Yo = e).memoizedState,
          baseState: Yo.baseState,
          baseQueue: Yo.baseQueue,
          queue: Yo.queue,
          next: null,
        }),
          null === Bo ? (Ho.memoizedState = Bo = e) : (Bo = Bo.next = e);
      }
      return Bo;
    }
    function Ko(e, t) {
      return "function" == typeof t ? t(e) : t;
    }
    function Jo(e) {
      var t = Xo(),
        n = t.queue;
      if (null === n) throw Error(i(311));
      n.lastRenderedReducer = e;
      var r = Yo,
        a = r.baseQueue,
        o = n.pending;
      if (null !== o) {
        if (null !== a) {
          var l = a.next;
          (a.next = o.next), (o.next = l);
        }
        (r.baseQueue = a = o), (n.pending = null);
      }
      if (null !== a) {
        (a = a.next), (r = r.baseState);
        var u = (l = o = null),
          c = a;
        do {
          var s = c.expirationTime;
          if (s < Wo) {
            var f = {
              expirationTime: c.expirationTime,
              suspenseConfig: c.suspenseConfig,
              action: c.action,
              eagerReducer: c.eagerReducer,
              eagerState: c.eagerState,
              next: null,
            };
            null === u ? ((l = u = f), (o = r)) : (u = u.next = f),
              s > Ho.expirationTime && ((Ho.expirationTime = s), iu(s));
          } else
            null !== u &&
              (u = u.next = {
                expirationTime: 1073741823,
                suspenseConfig: c.suspenseConfig,
                action: c.action,
                eagerReducer: c.eagerReducer,
                eagerState: c.eagerState,
                next: null,
              }),
              ou(s, c.suspenseConfig),
              (r = c.eagerReducer === e ? c.eagerState : e(r, c.action));
          c = c.next;
        } while (null !== c && c !== a);
        null === u ? (o = r) : (u.next = l),
          Ur(r, t.memoizedState) || (Ni = !0),
          (t.memoizedState = r),
          (t.baseState = o),
          (t.baseQueue = u),
          (n.lastRenderedState = r);
      }
      return [t.memoizedState, n.dispatch];
    }
    function Zo(e) {
      var t = Xo(),
        n = t.queue;
      if (null === n) throw Error(i(311));
      n.lastRenderedReducer = e;
      var r = n.dispatch,
        a = n.pending,
        o = t.memoizedState;
      if (null !== a) {
        n.pending = null;
        var l = (a = a.next);
        do {
          (o = e(o, l.action)), (l = l.next);
        } while (l !== a);
        Ur(o, t.memoizedState) || (Ni = !0),
          (t.memoizedState = o),
          null === t.baseQueue && (t.baseState = o),
          (n.lastRenderedState = o);
      }
      return [o, r];
    }
    function ei(e) {
      var t = Go();
      return (
        "function" == typeof e && (e = e()),
        (t.memoizedState = t.baseState = e),
        (e = (e = t.queue = {
          pending: null,
          dispatch: null,
          lastRenderedReducer: Ko,
          lastRenderedState: e,
        }).dispatch = hi.bind(null, Ho, e)),
        [t.memoizedState, e]
      );
    }
    function ti(e, t, n, r) {
      return (
        (e = { tag: e, create: t, destroy: n, deps: r, next: null }),
        null === (t = Ho.updateQueue)
          ? ((t = { lastEffect: null }),
            (Ho.updateQueue = t),
            (t.lastEffect = e.next = e))
          : null === (n = t.lastEffect)
          ? (t.lastEffect = e.next = e)
          : ((r = n.next), (n.next = e), (e.next = r), (t.lastEffect = e)),
        e
      );
    }
    function ni() {
      return Xo().memoizedState;
    }
    function ri(e, t, n, r) {
      var a = Go();
      (Ho.effectTag |= e),
        (a.memoizedState = ti(1 | t, n, void 0, void 0 === r ? null : r));
    }
    function ai(e, t, n, r) {
      var a = Xo();
      r = void 0 === r ? null : r;
      var o = void 0;
      if (null !== Yo) {
        var i = Yo.memoizedState;
        if (((o = i.destroy), null !== r && Vo(r, i.deps)))
          return void ti(t, n, o, r);
      }
      (Ho.effectTag |= e), (a.memoizedState = ti(1 | t, n, o, r));
    }
    function oi(e, t) {
      return ri(516, 4, e, t);
    }
    function ii(e, t) {
      return ai(516, 4, e, t);
    }
    function li(e, t) {
      return ai(4, 2, e, t);
    }
    function ui(e, t) {
      return "function" == typeof t
        ? ((e = e()),
          t(e),
          function () {
            t(null);
          })
        : null != t
        ? ((e = e()),
          (t.current = e),
          function () {
            t.current = null;
          })
        : void 0;
    }
    function ci(e, t, n) {
      return (
        (n = null != n ? n.concat([e]) : null), ai(4, 2, ui.bind(null, t, e), n)
      );
    }
    function si() {}
    function fi(e, t) {
      return (Go().memoizedState = [e, void 0 === t ? null : t]), e;
    }
    function di(e, t) {
      var n = Xo();
      t = void 0 === t ? null : t;
      var r = n.memoizedState;
      return null !== r && null !== t && Vo(t, r[1])
        ? r[0]
        : ((n.memoizedState = [e, t]), e);
    }
    function pi(e, t) {
      var n = Xo();
      t = void 0 === t ? null : t;
      var r = n.memoizedState;
      return null !== r && null !== t && Vo(t, r[1])
        ? r[0]
        : ((e = e()), (n.memoizedState = [e, t]), e);
    }
    function mi(e, t, n) {
      var r = Fa();
      Ha(98 > r ? 98 : r, function () {
        e(!0);
      }),
        Ha(97 < r ? 97 : r, function () {
          var r = Fo.suspense;
          Fo.suspense = void 0 === t ? null : t;
          try {
            e(!1), n();
          } finally {
            Fo.suspense = r;
          }
        });
    }
    function hi(e, t, n) {
      var r = ql(),
        a = po.suspense;
      a = {
        expirationTime: (r = Vl(r, e, a)),
        suspenseConfig: a,
        action: n,
        eagerReducer: null,
        eagerState: null,
        next: null,
      };
      var o = t.pending;
      if (
        (null === o ? (a.next = a) : ((a.next = o.next), (o.next = a)),
        (t.pending = a),
        (o = e.alternate),
        e === Ho || (null !== o && o === Ho))
      )
        ($o = !0), (a.expirationTime = Wo), (Ho.expirationTime = Wo);
      else {
        if (
          0 === e.expirationTime &&
          (null === o || 0 === o.expirationTime) &&
          null !== (o = t.lastRenderedReducer)
        )
          try {
            var i = t.lastRenderedState,
              l = o(i, n);
            if (((a.eagerReducer = o), (a.eagerState = l), Ur(l, i))) return;
          } catch (e) {}
        Ql(e, r);
      }
    }
    var yi = {
        readContext: ro,
        useCallback: qo,
        useContext: qo,
        useEffect: qo,
        useImperativeHandle: qo,
        useLayoutEffect: qo,
        useMemo: qo,
        useReducer: qo,
        useRef: qo,
        useState: qo,
        useDebugValue: qo,
        useResponder: qo,
        useDeferredValue: qo,
        useTransition: qo,
      },
      gi = {
        readContext: ro,
        useCallback: fi,
        useContext: ro,
        useEffect: oi,
        useImperativeHandle: function (e, t, n) {
          return (
            (n = null != n ? n.concat([e]) : null),
            ri(4, 2, ui.bind(null, t, e), n)
          );
        },
        useLayoutEffect: function (e, t) {
          return ri(4, 2, e, t);
        },
        useMemo: function (e, t) {
          var n = Go();
          return (
            (t = void 0 === t ? null : t),
            (e = e()),
            (n.memoizedState = [e, t]),
            e
          );
        },
        useReducer: function (e, t, n) {
          var r = Go();
          return (
            (t = void 0 !== n ? n(t) : t),
            (r.memoizedState = r.baseState = t),
            (e = (e = r.queue = {
              pending: null,
              dispatch: null,
              lastRenderedReducer: e,
              lastRenderedState: t,
            }).dispatch = hi.bind(null, Ho, e)),
            [r.memoizedState, e]
          );
        },
        useRef: function (e) {
          return (e = { current: e }), (Go().memoizedState = e);
        },
        useState: ei,
        useDebugValue: si,
        useResponder: Lo,
        useDeferredValue: function (e, t) {
          var n = ei(e),
            r = n[0],
            a = n[1];
          return (
            oi(
              function () {
                var n = Fo.suspense;
                Fo.suspense = void 0 === t ? null : t;
                try {
                  a(e);
                } finally {
                  Fo.suspense = n;
                }
              },
              [e, t]
            ),
            r
          );
        },
        useTransition: function (e) {
          var t = ei(!1),
            n = t[0];
          return (t = t[1]), [fi(mi.bind(null, t, e), [t, e]), n];
        },
      },
      vi = {
        readContext: ro,
        useCallback: di,
        useContext: ro,
        useEffect: ii,
        useImperativeHandle: ci,
        useLayoutEffect: li,
        useMemo: pi,
        useReducer: Jo,
        useRef: ni,
        useState: function () {
          return Jo(Ko);
        },
        useDebugValue: si,
        useResponder: Lo,
        useDeferredValue: function (e, t) {
          var n = Jo(Ko),
            r = n[0],
            a = n[1];
          return (
            ii(
              function () {
                var n = Fo.suspense;
                Fo.suspense = void 0 === t ? null : t;
                try {
                  a(e);
                } finally {
                  Fo.suspense = n;
                }
              },
              [e, t]
            ),
            r
          );
        },
        useTransition: function (e) {
          var t = Jo(Ko),
            n = t[0];
          return (t = t[1]), [di(mi.bind(null, t, e), [t, e]), n];
        },
      },
      bi = {
        readContext: ro,
        useCallback: di,
        useContext: ro,
        useEffect: ii,
        useImperativeHandle: ci,
        useLayoutEffect: li,
        useMemo: pi,
        useReducer: Zo,
        useRef: ni,
        useState: function () {
          return Zo(Ko);
        },
        useDebugValue: si,
        useResponder: Lo,
        useDeferredValue: function (e, t) {
          var n = Zo(Ko),
            r = n[0],
            a = n[1];
          return (
            ii(
              function () {
                var n = Fo.suspense;
                Fo.suspense = void 0 === t ? null : t;
                try {
                  a(e);
                } finally {
                  Fo.suspense = n;
                }
              },
              [e, t]
            ),
            r
          );
        },
        useTransition: function (e) {
          var t = Zo(Ko),
            n = t[0];
          return (t = t[1]), [di(mi.bind(null, t, e), [t, e]), n];
        },
      },
      wi = null,
      Ei = null,
      xi = !1;
    function _i(e, t) {
      var n = Su(5, null, null, 0);
      (n.elementType = "DELETED"),
        (n.type = "DELETED"),
        (n.stateNode = t),
        (n.return = e),
        (n.effectTag = 8),
        null !== e.lastEffect
          ? ((e.lastEffect.nextEffect = n), (e.lastEffect = n))
          : (e.firstEffect = e.lastEffect = n);
    }
    function Si(e, t) {
      switch (e.tag) {
        case 5:
          var n = e.type;
          return (
            null !==
              (t =
                1 !== t.nodeType || n.toLowerCase() !== t.nodeName.toLowerCase()
                  ? null
                  : t) && ((e.stateNode = t), !0)
          );
        case 6:
          return (
            null !==
              (t = "" === e.pendingProps || 3 !== t.nodeType ? null : t) &&
            ((e.stateNode = t), !0)
          );
        case 13:
        default:
          return !1;
      }
    }
    function ki(e) {
      if (xi) {
        var t = Ei;
        if (t) {
          var n = t;
          if (!Si(e, t)) {
            if (!(t = En(n.nextSibling)) || !Si(e, t))
              return (
                (e.effectTag = (-1025 & e.effectTag) | 2),
                (xi = !1),
                void (wi = e)
              );
            _i(wi, n);
          }
          (wi = e), (Ei = En(t.firstChild));
        } else (e.effectTag = (-1025 & e.effectTag) | 2), (xi = !1), (wi = e);
      }
    }
    function Ti(e) {
      for (
        e = e.return;
        null !== e && 5 !== e.tag && 3 !== e.tag && 13 !== e.tag;

      )
        e = e.return;
      wi = e;
    }
    function Ci(e) {
      if (e !== wi) return !1;
      if (!xi) return Ti(e), (xi = !0), !1;
      var t = e.type;
      if (
        5 !== e.tag ||
        ("head" !== t && "body" !== t && !vn(t, e.memoizedProps))
      )
        for (t = Ei; t; ) _i(e, t), (t = En(t.nextSibling));
      if ((Ti(e), 13 === e.tag)) {
        if (!(e = null !== (e = e.memoizedState) ? e.dehydrated : null))
          throw Error(i(317));
        e: {
          for (e = e.nextSibling, t = 0; e; ) {
            if (8 === e.nodeType) {
              var n = e.data;
              if ("/$" === n) {
                if (0 === t) {
                  Ei = En(e.nextSibling);
                  break e;
                }
                t--;
              } else ("$" !== n && "$!" !== n && "$?" !== n) || t++;
            }
            e = e.nextSibling;
          }
          Ei = null;
        }
      } else Ei = wi ? En(e.stateNode.nextSibling) : null;
      return !0;
    }
    function Oi() {
      (Ei = wi = null), (xi = !1);
    }
    var Pi = X.ReactCurrentOwner,
      Ni = !1;
    function ji(e, t, n, r) {
      t.child = null === e ? To(t, null, n, r) : ko(t, e.child, n, r);
    }
    function Mi(e, t, n, r, a) {
      n = n.render;
      var o = t.ref;
      return (
        no(t, a),
        (r = Qo(e, t, n, r, o, a)),
        null === e || Ni
          ? ((t.effectTag |= 1), ji(e, t, r, a), t.child)
          : ((t.updateQueue = e.updateQueue),
            (t.effectTag &= -517),
            e.expirationTime <= a && (e.expirationTime = 0),
            Qi(e, t, a))
      );
    }
    function Di(e, t, n, r, a, o) {
      if (null === e) {
        var i = n.type;
        return "function" != typeof i ||
          ku(i) ||
          void 0 !== i.defaultProps ||
          null !== n.compare ||
          void 0 !== n.defaultProps
          ? (((e = Cu(n.type, null, r, null, t.mode, o)).ref = t.ref),
            (e.return = t),
            (t.child = e))
          : ((t.tag = 15), (t.type = i), Ri(e, t, i, r, a, o));
      }
      return (
        (i = e.child),
        a < o &&
        ((a = i.memoizedProps),
        (n = null !== (n = n.compare) ? n : zr)(a, r) && e.ref === t.ref)
          ? Qi(e, t, o)
          : ((t.effectTag |= 1),
            ((e = Tu(i, r)).ref = t.ref),
            (e.return = t),
            (t.child = e))
      );
    }
    function Ri(e, t, n, r, a, o) {
      return null !== e &&
        zr(e.memoizedProps, r) &&
        e.ref === t.ref &&
        ((Ni = !1), a < o)
        ? ((t.expirationTime = e.expirationTime), Qi(e, t, o))
        : Ii(e, t, n, r, o);
    }
    function Ai(e, t) {
      var n = t.ref;
      ((null === e && null !== n) || (null !== e && e.ref !== n)) &&
        (t.effectTag |= 128);
    }
    function Ii(e, t, n, r, a) {
      var o = ha(n) ? pa : fa.current;
      return (
        (o = ma(t, o)),
        no(t, a),
        (n = Qo(e, t, n, r, o, a)),
        null === e || Ni
          ? ((t.effectTag |= 1), ji(e, t, n, a), t.child)
          : ((t.updateQueue = e.updateQueue),
            (t.effectTag &= -517),
            e.expirationTime <= a && (e.expirationTime = 0),
            Qi(e, t, a))
      );
    }
    function Ui(e, t, n, r, a) {
      if (ha(n)) {
        var o = !0;
        ba(t);
      } else o = !1;
      if ((no(t, a), null === t.stateNode))
        null !== e &&
          ((e.alternate = null), (t.alternate = null), (t.effectTag |= 2)),
          vo(t, n, r),
          wo(t, n, r, a),
          (r = !0);
      else if (null === e) {
        var i = t.stateNode,
          l = t.memoizedProps;
        i.props = l;
        var u = i.context,
          c = n.contextType;
        "object" == typeof c && null !== c
          ? (c = ro(c))
          : (c = ma(t, (c = ha(n) ? pa : fa.current)));
        var s = n.getDerivedStateFromProps,
          f =
            "function" == typeof s ||
            "function" == typeof i.getSnapshotBeforeUpdate;
        f ||
          ("function" != typeof i.UNSAFE_componentWillReceiveProps &&
            "function" != typeof i.componentWillReceiveProps) ||
          ((l !== r || u !== c) && bo(t, i, r, c)),
          (ao = !1);
        var d = t.memoizedState;
        (i.state = d),
          so(t, r, i, a),
          (u = t.memoizedState),
          l !== r || d !== u || da.current || ao
            ? ("function" == typeof s &&
                (ho(t, n, s, r), (u = t.memoizedState)),
              (l = ao || go(t, n, l, r, d, u, c))
                ? (f ||
                    ("function" != typeof i.UNSAFE_componentWillMount &&
                      "function" != typeof i.componentWillMount) ||
                    ("function" == typeof i.componentWillMount &&
                      i.componentWillMount(),
                    "function" == typeof i.UNSAFE_componentWillMount &&
                      i.UNSAFE_componentWillMount()),
                  "function" == typeof i.componentDidMount &&
                    (t.effectTag |= 4))
                : ("function" == typeof i.componentDidMount &&
                    (t.effectTag |= 4),
                  (t.memoizedProps = r),
                  (t.memoizedState = u)),
              (i.props = r),
              (i.state = u),
              (i.context = c),
              (r = l))
            : ("function" == typeof i.componentDidMount && (t.effectTag |= 4),
              (r = !1));
      } else
        (i = t.stateNode),
          io(e, t),
          (l = t.memoizedProps),
          (i.props = t.type === t.elementType ? l : Qa(t.type, l)),
          (u = i.context),
          "object" == typeof (c = n.contextType) && null !== c
            ? (c = ro(c))
            : (c = ma(t, (c = ha(n) ? pa : fa.current))),
          (f =
            "function" == typeof (s = n.getDerivedStateFromProps) ||
            "function" == typeof i.getSnapshotBeforeUpdate) ||
            ("function" != typeof i.UNSAFE_componentWillReceiveProps &&
              "function" != typeof i.componentWillReceiveProps) ||
            ((l !== r || u !== c) && bo(t, i, r, c)),
          (ao = !1),
          (u = t.memoizedState),
          (i.state = u),
          so(t, r, i, a),
          (d = t.memoizedState),
          l !== r || u !== d || da.current || ao
            ? ("function" == typeof s &&
                (ho(t, n, s, r), (d = t.memoizedState)),
              (s = ao || go(t, n, l, r, u, d, c))
                ? (f ||
                    ("function" != typeof i.UNSAFE_componentWillUpdate &&
                      "function" != typeof i.componentWillUpdate) ||
                    ("function" == typeof i.componentWillUpdate &&
                      i.componentWillUpdate(r, d, c),
                    "function" == typeof i.UNSAFE_componentWillUpdate &&
                      i.UNSAFE_componentWillUpdate(r, d, c)),
                  "function" == typeof i.componentDidUpdate &&
                    (t.effectTag |= 4),
                  "function" == typeof i.getSnapshotBeforeUpdate &&
                    (t.effectTag |= 256))
                : ("function" != typeof i.componentDidUpdate ||
                    (l === e.memoizedProps && u === e.memoizedState) ||
                    (t.effectTag |= 4),
                  "function" != typeof i.getSnapshotBeforeUpdate ||
                    (l === e.memoizedProps && u === e.memoizedState) ||
                    (t.effectTag |= 256),
                  (t.memoizedProps = r),
                  (t.memoizedState = d)),
              (i.props = r),
              (i.state = d),
              (i.context = c),
              (r = s))
            : ("function" != typeof i.componentDidUpdate ||
                (l === e.memoizedProps && u === e.memoizedState) ||
                (t.effectTag |= 4),
              "function" != typeof i.getSnapshotBeforeUpdate ||
                (l === e.memoizedProps && u === e.memoizedState) ||
                (t.effectTag |= 256),
              (r = !1));
      return Li(e, t, n, r, o, a);
    }
    function Li(e, t, n, r, a, o) {
      Ai(e, t);
      var i = 0 != (64 & t.effectTag);
      if (!r && !i) return a && wa(t, n, !1), Qi(e, t, o);
      (r = t.stateNode), (Pi.current = t);
      var l =
        i && "function" != typeof n.getDerivedStateFromError
          ? null
          : r.render();
      return (
        (t.effectTag |= 1),
        null !== e && i
          ? ((t.child = ko(t, e.child, null, o)), (t.child = ko(t, null, l, o)))
          : ji(e, t, l, o),
        (t.memoizedState = r.state),
        a && wa(t, n, !0),
        t.child
      );
    }
    function zi(e) {
      var t = e.stateNode;
      t.pendingContext
        ? ga(0, t.pendingContext, t.pendingContext !== t.context)
        : t.context && ga(0, t.context, !1),
        Mo(e, t.containerInfo);
    }
    var Fi,
      Wi,
      Hi,
      Yi = { dehydrated: null, retryTime: 0 };
    function Bi(e, t, n) {
      var r,
        a = t.mode,
        o = t.pendingProps,
        i = Io.current,
        l = !1;
      if (
        ((r = 0 != (64 & t.effectTag)) ||
          (r = 0 != (2 & i) && (null === e || null !== e.memoizedState)),
        r
          ? ((l = !0), (t.effectTag &= -65))
          : (null !== e && null === e.memoizedState) ||
            void 0 === o.fallback ||
            !0 === o.unstable_avoidThisFallback ||
            (i |= 1),
        ca(Io, 1 & i),
        null === e)
      ) {
        if ((void 0 !== o.fallback && ki(t), l)) {
          if (
            ((l = o.fallback),
            ((o = Ou(null, a, 0, null)).return = t),
            0 == (2 & t.mode))
          )
            for (
              e = null !== t.memoizedState ? t.child.child : t.child,
                o.child = e;
              null !== e;

            )
              (e.return = o), (e = e.sibling);
          return (
            ((n = Ou(l, a, n, null)).return = t),
            (o.sibling = n),
            (t.memoizedState = Yi),
            (t.child = o),
            n
          );
        }
        return (
          (a = o.children),
          (t.memoizedState = null),
          (t.child = To(t, null, a, n))
        );
      }
      if (null !== e.memoizedState) {
        if (((a = (e = e.child).sibling), l)) {
          if (
            ((o = o.fallback),
            ((n = Tu(e, e.pendingProps)).return = t),
            0 == (2 & t.mode) &&
              (l = null !== t.memoizedState ? t.child.child : t.child) !==
                e.child)
          )
            for (n.child = l; null !== l; ) (l.return = n), (l = l.sibling);
          return (
            ((a = Tu(a, o)).return = t),
            (n.sibling = a),
            (n.childExpirationTime = 0),
            (t.memoizedState = Yi),
            (t.child = n),
            a
          );
        }
        return (
          (n = ko(t, e.child, o.children, n)),
          (t.memoizedState = null),
          (t.child = n)
        );
      }
      if (((e = e.child), l)) {
        if (
          ((l = o.fallback),
          ((o = Ou(null, a, 0, null)).return = t),
          (o.child = e),
          null !== e && (e.return = o),
          0 == (2 & t.mode))
        )
          for (
            e = null !== t.memoizedState ? t.child.child : t.child, o.child = e;
            null !== e;

          )
            (e.return = o), (e = e.sibling);
        return (
          ((n = Ou(l, a, n, null)).return = t),
          (o.sibling = n),
          (n.effectTag |= 2),
          (o.childExpirationTime = 0),
          (t.memoizedState = Yi),
          (t.child = o),
          n
        );
      }
      return (t.memoizedState = null), (t.child = ko(t, e, o.children, n));
    }
    function $i(e, t) {
      e.expirationTime < t && (e.expirationTime = t);
      var n = e.alternate;
      null !== n && n.expirationTime < t && (n.expirationTime = t),
        to(e.return, t);
    }
    function qi(e, t, n, r, a, o) {
      var i = e.memoizedState;
      null === i
        ? (e.memoizedState = {
            isBackwards: t,
            rendering: null,
            renderingStartTime: 0,
            last: r,
            tail: n,
            tailExpiration: 0,
            tailMode: a,
            lastEffect: o,
          })
        : ((i.isBackwards = t),
          (i.rendering = null),
          (i.renderingStartTime = 0),
          (i.last = r),
          (i.tail = n),
          (i.tailExpiration = 0),
          (i.tailMode = a),
          (i.lastEffect = o));
    }
    function Vi(e, t, n) {
      var r = t.pendingProps,
        a = r.revealOrder,
        o = r.tail;
      if ((ji(e, t, r.children, n), 0 != (2 & (r = Io.current))))
        (r = (1 & r) | 2), (t.effectTag |= 64);
      else {
        if (null !== e && 0 != (64 & e.effectTag))
          e: for (e = t.child; null !== e; ) {
            if (13 === e.tag) null !== e.memoizedState && $i(e, n);
            else if (19 === e.tag) $i(e, n);
            else if (null !== e.child) {
              (e.child.return = e), (e = e.child);
              continue;
            }
            if (e === t) break e;
            for (; null === e.sibling; ) {
              if (null === e.return || e.return === t) break e;
              e = e.return;
            }
            (e.sibling.return = e.return), (e = e.sibling);
          }
        r &= 1;
      }
      if ((ca(Io, r), 0 == (2 & t.mode))) t.memoizedState = null;
      else
        switch (a) {
          case "forwards":
            for (n = t.child, a = null; null !== n; )
              null !== (e = n.alternate) && null === Uo(e) && (a = n),
                (n = n.sibling);
            null === (n = a)
              ? ((a = t.child), (t.child = null))
              : ((a = n.sibling), (n.sibling = null)),
              qi(t, !1, a, n, o, t.lastEffect);
            break;
          case "backwards":
            for (n = null, a = t.child, t.child = null; null !== a; ) {
              if (null !== (e = a.alternate) && null === Uo(e)) {
                t.child = a;
                break;
              }
              (e = a.sibling), (a.sibling = n), (n = a), (a = e);
            }
            qi(t, !0, n, null, o, t.lastEffect);
            break;
          case "together":
            qi(t, !1, null, null, void 0, t.lastEffect);
            break;
          default:
            t.memoizedState = null;
        }
      return t.child;
    }
    function Qi(e, t, n) {
      null !== e && (t.dependencies = e.dependencies);
      var r = t.expirationTime;
      if ((0 !== r && iu(r), t.childExpirationTime < n)) return null;
      if (null !== e && t.child !== e.child) throw Error(i(153));
      if (null !== t.child) {
        for (
          n = Tu((e = t.child), e.pendingProps), t.child = n, n.return = t;
          null !== e.sibling;

        )
          (e = e.sibling), ((n = n.sibling = Tu(e, e.pendingProps)).return = t);
        n.sibling = null;
      }
      return t.child;
    }
    function Gi(e, t) {
      switch (e.tailMode) {
        case "hidden":
          t = e.tail;
          for (var n = null; null !== t; )
            null !== t.alternate && (n = t), (t = t.sibling);
          null === n ? (e.tail = null) : (n.sibling = null);
          break;
        case "collapsed":
          n = e.tail;
          for (var r = null; null !== n; )
            null !== n.alternate && (r = n), (n = n.sibling);
          null === r
            ? t || null === e.tail
              ? (e.tail = null)
              : (e.tail.sibling = null)
            : (r.sibling = null);
      }
    }
    function Xi(e, t, n) {
      var r = t.pendingProps;
      switch (t.tag) {
        case 2:
        case 16:
        case 15:
        case 0:
        case 11:
        case 7:
        case 8:
        case 12:
        case 9:
        case 14:
          return null;
        case 1:
          return ha(t.type) && ya(), null;
        case 3:
          return (
            Do(),
            ua(da),
            ua(fa),
            (n = t.stateNode).pendingContext &&
              ((n.context = n.pendingContext), (n.pendingContext = null)),
            (null !== e && null !== e.child) || !Ci(t) || (t.effectTag |= 4),
            null
          );
        case 5:
          Ao(t), (n = jo(No.current));
          var o = t.type;
          if (null !== e && null != t.stateNode)
            Wi(e, t, o, r, n), e.ref !== t.ref && (t.effectTag |= 128);
          else {
            if (!r) {
              if (null === t.stateNode) throw Error(i(166));
              return null;
            }
            if (((e = jo(Oo.current)), Ci(t))) {
              (r = t.stateNode), (o = t.type);
              var l = t.memoizedProps;
              switch (((r[Sn] = t), (r[kn] = l), o)) {
                case "iframe":
                case "object":
                case "embed":
                  Vt("load", r);
                  break;
                case "video":
                case "audio":
                  for (e = 0; e < Xe.length; e++) Vt(Xe[e], r);
                  break;
                case "source":
                  Vt("error", r);
                  break;
                case "img":
                case "image":
                case "link":
                  Vt("error", r), Vt("load", r);
                  break;
                case "form":
                  Vt("reset", r), Vt("submit", r);
                  break;
                case "details":
                  Vt("toggle", r);
                  break;
                case "input":
                  _e(r, l), Vt("invalid", r), un(n, "onChange");
                  break;
                case "select":
                  (r._wrapperState = { wasMultiple: !!l.multiple }),
                    Vt("invalid", r),
                    un(n, "onChange");
                  break;
                case "textarea":
                  je(r, l), Vt("invalid", r), un(n, "onChange");
              }
              for (var u in (an(o, l), (e = null), l))
                if (l.hasOwnProperty(u)) {
                  var c = l[u];
                  "children" === u
                    ? "string" == typeof c
                      ? r.textContent !== c && (e = ["children", c])
                      : "number" == typeof c &&
                        r.textContent !== "" + c &&
                        (e = ["children", "" + c])
                    : S.hasOwnProperty(u) && null != c && un(n, u);
                }
              switch (o) {
                case "input":
                  we(r), Te(r, l, !0);
                  break;
                case "textarea":
                  we(r), De(r);
                  break;
                case "select":
                case "option":
                  break;
                default:
                  "function" == typeof l.onClick && (r.onclick = cn);
              }
              (n = e), (t.updateQueue = n), null !== n && (t.effectTag |= 4);
            } else {
              switch (
                ((u = 9 === n.nodeType ? n : n.ownerDocument),
                e === ln && (e = Ie(o)),
                e === ln
                  ? "script" === o
                    ? (((e = u.createElement("div")).innerHTML =
                        "<script></script>"),
                      (e = e.removeChild(e.firstChild)))
                    : "string" == typeof r.is
                    ? (e = u.createElement(o, { is: r.is }))
                    : ((e = u.createElement(o)),
                      "select" === o &&
                        ((u = e),
                        r.multiple
                          ? (u.multiple = !0)
                          : r.size && (u.size = r.size)))
                  : (e = u.createElementNS(e, o)),
                (e[Sn] = t),
                (e[kn] = r),
                Fi(e, t),
                (t.stateNode = e),
                (u = on(o, r)),
                o)
              ) {
                case "iframe":
                case "object":
                case "embed":
                  Vt("load", e), (c = r);
                  break;
                case "video":
                case "audio":
                  for (c = 0; c < Xe.length; c++) Vt(Xe[c], e);
                  c = r;
                  break;
                case "source":
                  Vt("error", e), (c = r);
                  break;
                case "img":
                case "image":
                case "link":
                  Vt("error", e), Vt("load", e), (c = r);
                  break;
                case "form":
                  Vt("reset", e), Vt("submit", e), (c = r);
                  break;
                case "details":
                  Vt("toggle", e), (c = r);
                  break;
                case "input":
                  _e(e, r), (c = xe(e, r)), Vt("invalid", e), un(n, "onChange");
                  break;
                case "option":
                  c = Oe(e, r);
                  break;
                case "select":
                  (e._wrapperState = { wasMultiple: !!r.multiple }),
                    (c = a({}, r, { value: void 0 })),
                    Vt("invalid", e),
                    un(n, "onChange");
                  break;
                case "textarea":
                  je(e, r), (c = Ne(e, r)), Vt("invalid", e), un(n, "onChange");
                  break;
                default:
                  c = r;
              }
              an(o, c);
              var s = c;
              for (l in s)
                if (s.hasOwnProperty(l)) {
                  var f = s[l];
                  "style" === l
                    ? nn(e, f)
                    : "dangerouslySetInnerHTML" === l
                    ? null != (f = f ? f.__html : void 0) && ze(e, f)
                    : "children" === l
                    ? "string" == typeof f
                      ? ("textarea" !== o || "" !== f) && Fe(e, f)
                      : "number" == typeof f && Fe(e, "" + f)
                    : "suppressContentEditableWarning" !== l &&
                      "suppressHydrationWarning" !== l &&
                      "autoFocus" !== l &&
                      (S.hasOwnProperty(l)
                        ? null != f && un(n, l)
                        : null != f && K(e, l, f, u));
                }
              switch (o) {
                case "input":
                  we(e), Te(e, r, !1);
                  break;
                case "textarea":
                  we(e), De(e);
                  break;
                case "option":
                  null != r.value && e.setAttribute("value", "" + ve(r.value));
                  break;
                case "select":
                  (e.multiple = !!r.multiple),
                    null != (n = r.value)
                      ? Pe(e, !!r.multiple, n, !1)
                      : null != r.defaultValue &&
                        Pe(e, !!r.multiple, r.defaultValue, !0);
                  break;
                default:
                  "function" == typeof c.onClick && (e.onclick = cn);
              }
              gn(o, r) && (t.effectTag |= 4);
            }
            null !== t.ref && (t.effectTag |= 128);
          }
          return null;
        case 6:
          if (e && null != t.stateNode) Hi(0, t, e.memoizedProps, r);
          else {
            if ("string" != typeof r && null === t.stateNode)
              throw Error(i(166));
            (n = jo(No.current)),
              jo(Oo.current),
              Ci(t)
                ? ((n = t.stateNode),
                  (r = t.memoizedProps),
                  (n[Sn] = t),
                  n.nodeValue !== r && (t.effectTag |= 4))
                : (((n = (9 === n.nodeType
                    ? n
                    : n.ownerDocument
                  ).createTextNode(r))[Sn] = t),
                  (t.stateNode = n));
          }
          return null;
        case 13:
          return (
            ua(Io),
            (r = t.memoizedState),
            0 != (64 & t.effectTag)
              ? ((t.expirationTime = n), t)
              : ((n = null !== r),
                (r = !1),
                null === e
                  ? void 0 !== t.memoizedProps.fallback && Ci(t)
                  : ((r = null !== (o = e.memoizedState)),
                    n ||
                      null === o ||
                      (null !== (o = e.child.sibling) &&
                        (null !== (l = t.firstEffect)
                          ? ((t.firstEffect = o), (o.nextEffect = l))
                          : ((t.firstEffect = t.lastEffect = o),
                            (o.nextEffect = null)),
                        (o.effectTag = 8)))),
                n &&
                  !r &&
                  0 != (2 & t.mode) &&
                  ((null === e &&
                    !0 !== t.memoizedProps.unstable_avoidThisFallback) ||
                  0 != (1 & Io.current)
                    ? Cl === wl && (Cl = El)
                    : ((Cl !== wl && Cl !== El) || (Cl = xl),
                      0 !== Ml && null !== Sl && (Du(Sl, Tl), Ru(Sl, Ml)))),
                (n || r) && (t.effectTag |= 4),
                null)
          );
        case 4:
          return Do(), null;
        case 10:
          return eo(t), null;
        case 17:
          return ha(t.type) && ya(), null;
        case 19:
          if ((ua(Io), null === (r = t.memoizedState))) return null;
          if (((o = 0 != (64 & t.effectTag)), null === (l = r.rendering))) {
            if (o) Gi(r, !1);
            else if (Cl !== wl || (null !== e && 0 != (64 & e.effectTag)))
              for (l = t.child; null !== l; ) {
                if (null !== (e = Uo(l))) {
                  for (
                    t.effectTag |= 64,
                      Gi(r, !1),
                      null !== (o = e.updateQueue) &&
                        ((t.updateQueue = o), (t.effectTag |= 4)),
                      null === r.lastEffect && (t.firstEffect = null),
                      t.lastEffect = r.lastEffect,
                      r = t.child;
                    null !== r;

                  )
                    (l = n),
                      ((o = r).effectTag &= 2),
                      (o.nextEffect = null),
                      (o.firstEffect = null),
                      (o.lastEffect = null),
                      null === (e = o.alternate)
                        ? ((o.childExpirationTime = 0),
                          (o.expirationTime = l),
                          (o.child = null),
                          (o.memoizedProps = null),
                          (o.memoizedState = null),
                          (o.updateQueue = null),
                          (o.dependencies = null))
                        : ((o.childExpirationTime = e.childExpirationTime),
                          (o.expirationTime = e.expirationTime),
                          (o.child = e.child),
                          (o.memoizedProps = e.memoizedProps),
                          (o.memoizedState = e.memoizedState),
                          (o.updateQueue = e.updateQueue),
                          (l = e.dependencies),
                          (o.dependencies =
                            null === l
                              ? null
                              : {
                                  expirationTime: l.expirationTime,
                                  firstContext: l.firstContext,
                                  responders: l.responders,
                                })),
                      (r = r.sibling);
                  return ca(Io, (1 & Io.current) | 2), t.child;
                }
                l = l.sibling;
              }
          } else {
            if (!o)
              if (null !== (e = Uo(l))) {
                if (
                  ((t.effectTag |= 64),
                  (o = !0),
                  null !== (n = e.updateQueue) &&
                    ((t.updateQueue = n), (t.effectTag |= 4)),
                  Gi(r, !0),
                  null === r.tail && "hidden" === r.tailMode && !l.alternate)
                )
                  return (
                    null !== (t = t.lastEffect = r.lastEffect) &&
                      (t.nextEffect = null),
                    null
                  );
              } else
                2 * za() - r.renderingStartTime > r.tailExpiration &&
                  1 < n &&
                  ((t.effectTag |= 64),
                  (o = !0),
                  Gi(r, !1),
                  (t.expirationTime = t.childExpirationTime = n - 1));
            r.isBackwards
              ? ((l.sibling = t.child), (t.child = l))
              : (null !== (n = r.last) ? (n.sibling = l) : (t.child = l),
                (r.last = l));
          }
          return null !== r.tail
            ? (0 === r.tailExpiration && (r.tailExpiration = za() + 500),
              (n = r.tail),
              (r.rendering = n),
              (r.tail = n.sibling),
              (r.lastEffect = t.lastEffect),
              (r.renderingStartTime = za()),
              (n.sibling = null),
              (t = Io.current),
              ca(Io, o ? (1 & t) | 2 : 1 & t),
              n)
            : null;
      }
      throw Error(i(156, t.tag));
    }
    function Ki(e) {
      switch (e.tag) {
        case 1:
          ha(e.type) && ya();
          var t = e.effectTag;
          return 4096 & t ? ((e.effectTag = (-4097 & t) | 64), e) : null;
        case 3:
          if ((Do(), ua(da), ua(fa), 0 != (64 & (t = e.effectTag))))
            throw Error(i(285));
          return (e.effectTag = (-4097 & t) | 64), e;
        case 5:
          return Ao(e), null;
        case 13:
          return (
            ua(Io),
            4096 & (t = e.effectTag)
              ? ((e.effectTag = (-4097 & t) | 64), e)
              : null
          );
        case 19:
          return ua(Io), null;
        case 4:
          return Do(), null;
        case 10:
          return eo(e), null;
        default:
          return null;
      }
    }
    function Ji(e, t) {
      return { value: e, source: t, stack: ge(t) };
    }
    (Fi = function (e, t) {
      for (var n = t.child; null !== n; ) {
        if (5 === n.tag || 6 === n.tag) e.appendChild(n.stateNode);
        else if (4 !== n.tag && null !== n.child) {
          (n.child.return = n), (n = n.child);
          continue;
        }
        if (n === t) break;
        for (; null === n.sibling; ) {
          if (null === n.return || n.return === t) return;
          n = n.return;
        }
        (n.sibling.return = n.return), (n = n.sibling);
      }
    }),
      (Wi = function (e, t, n, r, o) {
        var i = e.memoizedProps;
        if (i !== r) {
          var l,
            u,
            c = t.stateNode;
          switch ((jo(Oo.current), (e = null), n)) {
            case "input":
              (i = xe(c, i)), (r = xe(c, r)), (e = []);
              break;
            case "option":
              (i = Oe(c, i)), (r = Oe(c, r)), (e = []);
              break;
            case "select":
              (i = a({}, i, { value: void 0 })),
                (r = a({}, r, { value: void 0 })),
                (e = []);
              break;
            case "textarea":
              (i = Ne(c, i)), (r = Ne(c, r)), (e = []);
              break;
            default:
              "function" != typeof i.onClick &&
                "function" == typeof r.onClick &&
                (c.onclick = cn);
          }
          for (l in (an(n, r), (n = null), i))
            if (!r.hasOwnProperty(l) && i.hasOwnProperty(l) && null != i[l])
              if ("style" === l)
                for (u in (c = i[l]))
                  c.hasOwnProperty(u) && (n || (n = {}), (n[u] = ""));
              else
                "dangerouslySetInnerHTML" !== l &&
                  "children" !== l &&
                  "suppressContentEditableWarning" !== l &&
                  "suppressHydrationWarning" !== l &&
                  "autoFocus" !== l &&
                  (S.hasOwnProperty(l)
                    ? e || (e = [])
                    : (e = e || []).push(l, null));
          for (l in r) {
            var s = r[l];
            if (
              ((c = null != i ? i[l] : void 0),
              r.hasOwnProperty(l) && s !== c && (null != s || null != c))
            )
              if ("style" === l)
                if (c) {
                  for (u in c)
                    !c.hasOwnProperty(u) ||
                      (s && s.hasOwnProperty(u)) ||
                      (n || (n = {}), (n[u] = ""));
                  for (u in s)
                    s.hasOwnProperty(u) &&
                      c[u] !== s[u] &&
                      (n || (n = {}), (n[u] = s[u]));
                } else n || (e || (e = []), e.push(l, n)), (n = s);
              else
                "dangerouslySetInnerHTML" === l
                  ? ((s = s ? s.__html : void 0),
                    (c = c ? c.__html : void 0),
                    null != s && c !== s && (e = e || []).push(l, s))
                  : "children" === l
                  ? c === s ||
                    ("string" != typeof s && "number" != typeof s) ||
                    (e = e || []).push(l, "" + s)
                  : "suppressContentEditableWarning" !== l &&
                    "suppressHydrationWarning" !== l &&
                    (S.hasOwnProperty(l)
                      ? (null != s && un(o, l), e || c === s || (e = []))
                      : (e = e || []).push(l, s));
          }
          n && (e = e || []).push("style", n),
            (o = e),
            (t.updateQueue = o) && (t.effectTag |= 4);
        }
      }),
      (Hi = function (e, t, n, r) {
        n !== r && (t.effectTag |= 4);
      });
    var Zi = "function" == typeof WeakSet ? WeakSet : Set;
    function el(e, t) {
      var n = t.source,
        r = t.stack;
      null === r && null !== n && (r = ge(n)),
        null !== n && ye(n.type),
        (t = t.value),
        null !== e && 1 === e.tag && ye(e.type);
      try {
        console.error(t);
      } catch (e) {
        setTimeout(function () {
          throw e;
        });
      }
    }
    function tl(e) {
      var t = e.ref;
      if (null !== t)
        if ("function" == typeof t)
          try {
            t(null);
          } catch (t) {
            vu(e, t);
          }
        else t.current = null;
    }
    function nl(e, t) {
      switch (t.tag) {
        case 0:
        case 11:
        case 15:
        case 22:
          return;
        case 1:
          if (256 & t.effectTag && null !== e) {
            var n = e.memoizedProps,
              r = e.memoizedState;
            (t = (e = t.stateNode).getSnapshotBeforeUpdate(
              t.elementType === t.type ? n : Qa(t.type, n),
              r
            )),
              (e.__reactInternalSnapshotBeforeUpdate = t);
          }
          return;
        case 3:
        case 5:
        case 6:
        case 4:
        case 17:
          return;
      }
      throw Error(i(163));
    }
    function rl(e, t) {
      if (null !== (t = null !== (t = t.updateQueue) ? t.lastEffect : null)) {
        var n = (t = t.next);
        do {
          if ((n.tag & e) === e) {
            var r = n.destroy;
            (n.destroy = void 0), void 0 !== r && r();
          }
          n = n.next;
        } while (n !== t);
      }
    }
    function al(e, t) {
      if (null !== (t = null !== (t = t.updateQueue) ? t.lastEffect : null)) {
        var n = (t = t.next);
        do {
          if ((n.tag & e) === e) {
            var r = n.create;
            n.destroy = r();
          }
          n = n.next;
        } while (n !== t);
      }
    }
    function ol(e, t, n) {
      switch (n.tag) {
        case 0:
        case 11:
        case 15:
        case 22:
          return void al(3, n);
        case 1:
          if (((e = n.stateNode), 4 & n.effectTag))
            if (null === t) e.componentDidMount();
            else {
              var r =
                n.elementType === n.type
                  ? t.memoizedProps
                  : Qa(n.type, t.memoizedProps);
              e.componentDidUpdate(
                r,
                t.memoizedState,
                e.__reactInternalSnapshotBeforeUpdate
              );
            }
          return void (null !== (t = n.updateQueue) && fo(n, t, e));
        case 3:
          if (null !== (t = n.updateQueue)) {
            if (((e = null), null !== n.child))
              switch (n.child.tag) {
                case 5:
                  e = n.child.stateNode;
                  break;
                case 1:
                  e = n.child.stateNode;
              }
            fo(n, t, e);
          }
          return;
        case 5:
          return (
            (e = n.stateNode),
            void (
              null === t &&
              4 & n.effectTag &&
              gn(n.type, n.memoizedProps) &&
              e.focus()
            )
          );
        case 6:
        case 4:
        case 12:
          return;
        case 13:
          return void (
            null === n.memoizedState &&
            ((n = n.alternate),
            null !== n &&
              ((n = n.memoizedState),
              null !== n && ((n = n.dehydrated), null !== n && It(n))))
          );
        case 19:
        case 17:
        case 20:
        case 21:
          return;
      }
      throw Error(i(163));
    }
    function il(e, t, n) {
      switch (("function" == typeof xu && xu(t), t.tag)) {
        case 0:
        case 11:
        case 14:
        case 15:
        case 22:
          if (null !== (e = t.updateQueue) && null !== (e = e.lastEffect)) {
            var r = e.next;
            Ha(97 < n ? 97 : n, function () {
              var e = r;
              do {
                var n = e.destroy;
                if (void 0 !== n) {
                  var a = t;
                  try {
                    n();
                  } catch (e) {
                    vu(a, e);
                  }
                }
                e = e.next;
              } while (e !== r);
            });
          }
          break;
        case 1:
          tl(t),
            "function" == typeof (n = t.stateNode).componentWillUnmount &&
              (function (e, t) {
                try {
                  (t.props = e.memoizedProps),
                    (t.state = e.memoizedState),
                    t.componentWillUnmount();
                } catch (t) {
                  vu(e, t);
                }
              })(t, n);
          break;
        case 5:
          tl(t);
          break;
        case 4:
          sl(e, t, n);
      }
    }
    function ll(e) {
      var t = e.alternate;
      (e.return = null),
        (e.child = null),
        (e.memoizedState = null),
        (e.updateQueue = null),
        (e.dependencies = null),
        (e.alternate = null),
        (e.firstEffect = null),
        (e.lastEffect = null),
        (e.pendingProps = null),
        (e.memoizedProps = null),
        (e.stateNode = null),
        null !== t && ll(t);
    }
    function ul(e) {
      return 5 === e.tag || 3 === e.tag || 4 === e.tag;
    }
    function cl(e) {
      e: {
        for (var t = e.return; null !== t; ) {
          if (ul(t)) {
            var n = t;
            break e;
          }
          t = t.return;
        }
        throw Error(i(160));
      }
      switch (((t = n.stateNode), n.tag)) {
        case 5:
          var r = !1;
          break;
        case 3:
        case 4:
          (t = t.containerInfo), (r = !0);
          break;
        default:
          throw Error(i(161));
      }
      16 & n.effectTag && (Fe(t, ""), (n.effectTag &= -17));
      e: t: for (n = e; ; ) {
        for (; null === n.sibling; ) {
          if (null === n.return || ul(n.return)) {
            n = null;
            break e;
          }
          n = n.return;
        }
        for (
          n.sibling.return = n.return, n = n.sibling;
          5 !== n.tag && 6 !== n.tag && 18 !== n.tag;

        ) {
          if (2 & n.effectTag) continue t;
          if (null === n.child || 4 === n.tag) continue t;
          (n.child.return = n), (n = n.child);
        }
        if (!(2 & n.effectTag)) {
          n = n.stateNode;
          break e;
        }
      }
      r
        ? (function e(t, n, r) {
            var a = t.tag,
              o = 5 === a || 6 === a;
            if (o)
              (t = o ? t.stateNode : t.stateNode.instance),
                n
                  ? 8 === r.nodeType
                    ? r.parentNode.insertBefore(t, n)
                    : r.insertBefore(t, n)
                  : (8 === r.nodeType
                      ? (n = r.parentNode).insertBefore(t, r)
                      : (n = r).appendChild(t),
                    (null !== (r = r._reactRootContainer) && void 0 !== r) ||
                      null !== n.onclick ||
                      (n.onclick = cn));
            else if (4 !== a && null !== (t = t.child))
              for (e(t, n, r), t = t.sibling; null !== t; )
                e(t, n, r), (t = t.sibling);
          })(e, n, t)
        : (function e(t, n, r) {
            var a = t.tag,
              o = 5 === a || 6 === a;
            if (o)
              (t = o ? t.stateNode : t.stateNode.instance),
                n ? r.insertBefore(t, n) : r.appendChild(t);
            else if (4 !== a && null !== (t = t.child))
              for (e(t, n, r), t = t.sibling; null !== t; )
                e(t, n, r), (t = t.sibling);
          })(e, n, t);
    }
    function sl(e, t, n) {
      for (var r, a, o = t, l = !1; ; ) {
        if (!l) {
          l = o.return;
          e: for (;;) {
            if (null === l) throw Error(i(160));
            switch (((r = l.stateNode), l.tag)) {
              case 5:
                a = !1;
                break e;
              case 3:
              case 4:
                (r = r.containerInfo), (a = !0);
                break e;
            }
            l = l.return;
          }
          l = !0;
        }
        if (5 === o.tag || 6 === o.tag) {
          e: for (var u = e, c = o, s = n, f = c; ; )
            if ((il(u, f, s), null !== f.child && 4 !== f.tag))
              (f.child.return = f), (f = f.child);
            else {
              if (f === c) break e;
              for (; null === f.sibling; ) {
                if (null === f.return || f.return === c) break e;
                f = f.return;
              }
              (f.sibling.return = f.return), (f = f.sibling);
            }
          a
            ? ((u = r),
              (c = o.stateNode),
              8 === u.nodeType ? u.parentNode.removeChild(c) : u.removeChild(c))
            : r.removeChild(o.stateNode);
        } else if (4 === o.tag) {
          if (null !== o.child) {
            (r = o.stateNode.containerInfo),
              (a = !0),
              (o.child.return = o),
              (o = o.child);
            continue;
          }
        } else if ((il(e, o, n), null !== o.child)) {
          (o.child.return = o), (o = o.child);
          continue;
        }
        if (o === t) break;
        for (; null === o.sibling; ) {
          if (null === o.return || o.return === t) return;
          4 === (o = o.return).tag && (l = !1);
        }
        (o.sibling.return = o.return), (o = o.sibling);
      }
    }
    function fl(e, t) {
      switch (t.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
        case 22:
          return void rl(3, t);
        case 1:
          return;
        case 5:
          var n = t.stateNode;
          if (null != n) {
            var r = t.memoizedProps,
              a = null !== e ? e.memoizedProps : r;
            e = t.type;
            var o = t.updateQueue;
            if (((t.updateQueue = null), null !== o)) {
              for (
                n[kn] = r,
                  "input" === e &&
                    "radio" === r.type &&
                    null != r.name &&
                    Se(n, r),
                  on(e, a),
                  t = on(e, r),
                  a = 0;
                a < o.length;
                a += 2
              ) {
                var l = o[a],
                  u = o[a + 1];
                "style" === l
                  ? nn(n, u)
                  : "dangerouslySetInnerHTML" === l
                  ? ze(n, u)
                  : "children" === l
                  ? Fe(n, u)
                  : K(n, l, u, t);
              }
              switch (e) {
                case "input":
                  ke(n, r);
                  break;
                case "textarea":
                  Me(n, r);
                  break;
                case "select":
                  (t = n._wrapperState.wasMultiple),
                    (n._wrapperState.wasMultiple = !!r.multiple),
                    null != (e = r.value)
                      ? Pe(n, !!r.multiple, e, !1)
                      : t !== !!r.multiple &&
                        (null != r.defaultValue
                          ? Pe(n, !!r.multiple, r.defaultValue, !0)
                          : Pe(n, !!r.multiple, r.multiple ? [] : "", !1));
              }
            }
          }
          return;
        case 6:
          if (null === t.stateNode) throw Error(i(162));
          return void (t.stateNode.nodeValue = t.memoizedProps);
        case 3:
          return void (
            (t = t.stateNode).hydrate && ((t.hydrate = !1), It(t.containerInfo))
          );
        case 12:
          return;
        case 13:
          if (
            ((n = t),
            null === t.memoizedState
              ? (r = !1)
              : ((r = !0), (n = t.child), (Rl = za())),
            null !== n)
          )
            e: for (e = n; ; ) {
              if (5 === e.tag)
                (o = e.stateNode),
                  r
                    ? "function" == typeof (o = o.style).setProperty
                      ? o.setProperty("display", "none", "important")
                      : (o.display = "none")
                    : ((o = e.stateNode),
                      (a =
                        null != (a = e.memoizedProps.style) &&
                        a.hasOwnProperty("display")
                          ? a.display
                          : null),
                      (o.style.display = tn("display", a)));
              else if (6 === e.tag)
                e.stateNode.nodeValue = r ? "" : e.memoizedProps;
              else {
                if (
                  13 === e.tag &&
                  null !== e.memoizedState &&
                  null === e.memoizedState.dehydrated
                ) {
                  ((o = e.child.sibling).return = e), (e = o);
                  continue;
                }
                if (null !== e.child) {
                  (e.child.return = e), (e = e.child);
                  continue;
                }
              }
              if (e === n) break;
              for (; null === e.sibling; ) {
                if (null === e.return || e.return === n) break e;
                e = e.return;
              }
              (e.sibling.return = e.return), (e = e.sibling);
            }
          return void dl(t);
        case 19:
          return void dl(t);
        case 17:
          return;
      }
      throw Error(i(163));
    }
    function dl(e) {
      var t = e.updateQueue;
      if (null !== t) {
        e.updateQueue = null;
        var n = e.stateNode;
        null === n && (n = e.stateNode = new Zi()),
          t.forEach(function (t) {
            var r = wu.bind(null, e, t);
            n.has(t) || (n.add(t), t.then(r, r));
          });
      }
    }
    var pl = "function" == typeof WeakMap ? WeakMap : Map;
    function ml(e, t, n) {
      ((n = lo(n, null)).tag = 3), (n.payload = { element: null });
      var r = t.value;
      return (
        (n.callback = function () {
          Il || ((Il = !0), (Ul = r)), el(e, t);
        }),
        n
      );
    }
    function hl(e, t, n) {
      (n = lo(n, null)).tag = 3;
      var r = e.type.getDerivedStateFromError;
      if ("function" == typeof r) {
        var a = t.value;
        n.payload = function () {
          return el(e, t), r(a);
        };
      }
      var o = e.stateNode;
      return (
        null !== o &&
          "function" == typeof o.componentDidCatch &&
          (n.callback = function () {
            "function" != typeof r &&
              (null === Ll ? (Ll = new Set([this])) : Ll.add(this), el(e, t));
            var n = t.stack;
            this.componentDidCatch(t.value, {
              componentStack: null !== n ? n : "",
            });
          }),
        n
      );
    }
    var yl,
      gl = Math.ceil,
      vl = X.ReactCurrentDispatcher,
      bl = X.ReactCurrentOwner,
      wl = 0,
      El = 3,
      xl = 4,
      _l = 0,
      Sl = null,
      kl = null,
      Tl = 0,
      Cl = wl,
      Ol = null,
      Pl = 1073741823,
      Nl = 1073741823,
      jl = null,
      Ml = 0,
      Dl = !1,
      Rl = 0,
      Al = null,
      Il = !1,
      Ul = null,
      Ll = null,
      zl = !1,
      Fl = null,
      Wl = 90,
      Hl = null,
      Yl = 0,
      Bl = null,
      $l = 0;
    function ql() {
      return 0 != (48 & _l)
        ? 1073741821 - ((za() / 10) | 0)
        : 0 !== $l
        ? $l
        : ($l = 1073741821 - ((za() / 10) | 0));
    }
    function Vl(e, t, n) {
      if (0 == (2 & (t = t.mode))) return 1073741823;
      var r = Fa();
      if (0 == (4 & t)) return 99 === r ? 1073741823 : 1073741822;
      if (0 != (16 & _l)) return Tl;
      if (null !== n) e = Va(e, 0 | n.timeoutMs || 5e3, 250);
      else
        switch (r) {
          case 99:
            e = 1073741823;
            break;
          case 98:
            e = Va(e, 150, 100);
            break;
          case 97:
          case 96:
            e = Va(e, 5e3, 250);
            break;
          case 95:
            e = 2;
            break;
          default:
            throw Error(i(326));
        }
      return null !== Sl && e === Tl && --e, e;
    }
    function Ql(e, t) {
      if (50 < Yl) throw ((Yl = 0), (Bl = null), Error(i(185)));
      if (null !== (e = Gl(e, t))) {
        var n = Fa();
        1073741823 === t
          ? 0 != (8 & _l) && 0 == (48 & _l)
            ? Zl(e)
            : (Kl(e), 0 === _l && $a())
          : Kl(e),
          0 == (4 & _l) ||
            (98 !== n && 99 !== n) ||
            (null === Hl
              ? (Hl = new Map([[e, t]]))
              : (void 0 === (n = Hl.get(e)) || n > t) && Hl.set(e, t));
      }
    }
    function Gl(e, t) {
      e.expirationTime < t && (e.expirationTime = t);
      var n = e.alternate;
      null !== n && n.expirationTime < t && (n.expirationTime = t);
      var r = e.return,
        a = null;
      if (null === r && 3 === e.tag) a = e.stateNode;
      else
        for (; null !== r; ) {
          if (
            ((n = r.alternate),
            r.childExpirationTime < t && (r.childExpirationTime = t),
            null !== n &&
              n.childExpirationTime < t &&
              (n.childExpirationTime = t),
            null === r.return && 3 === r.tag)
          ) {
            a = r.stateNode;
            break;
          }
          r = r.return;
        }
      return (
        null !== a && (Sl === a && (iu(t), Cl === xl && Du(a, Tl)), Ru(a, t)), a
      );
    }
    function Xl(e) {
      var t = e.lastExpiredTime;
      if (0 !== t) return t;
      if (!Mu(e, (t = e.firstPendingTime))) return t;
      var n = e.lastPingedTime;
      return 2 >= (e = n > (e = e.nextKnownPendingLevel) ? n : e) && t !== e
        ? 0
        : e;
    }
    function Kl(e) {
      if (0 !== e.lastExpiredTime)
        (e.callbackExpirationTime = 1073741823),
          (e.callbackPriority = 99),
          (e.callbackNode = Ba(Zl.bind(null, e)));
      else {
        var t = Xl(e),
          n = e.callbackNode;
        if (0 === t)
          null !== n &&
            ((e.callbackNode = null),
            (e.callbackExpirationTime = 0),
            (e.callbackPriority = 90));
        else {
          var r = ql();
          if (
            (1073741823 === t
              ? (r = 99)
              : 1 === t || 2 === t
              ? (r = 95)
              : (r =
                  0 >= (r = 10 * (1073741821 - t) - 10 * (1073741821 - r))
                    ? 99
                    : 250 >= r
                    ? 98
                    : 5250 >= r
                    ? 97
                    : 95),
            null !== n)
          ) {
            var a = e.callbackPriority;
            if (e.callbackExpirationTime === t && a >= r) return;
            n !== Ma && _a(n);
          }
          (e.callbackExpirationTime = t),
            (e.callbackPriority = r),
            (t =
              1073741823 === t
                ? Ba(Zl.bind(null, e))
                : Ya(r, Jl.bind(null, e), {
                    timeout: 10 * (1073741821 - t) - za(),
                  })),
            (e.callbackNode = t);
        }
      }
    }
    function Jl(e, t) {
      if ((($l = 0), t)) return Au(e, (t = ql())), Kl(e), null;
      var n = Xl(e);
      if (0 !== n) {
        if (((t = e.callbackNode), 0 != (48 & _l))) throw Error(i(327));
        if ((hu(), (e === Sl && n === Tl) || nu(e, n), null !== kl)) {
          var r = _l;
          _l |= 16;
          for (var a = au(); ; )
            try {
              uu();
              break;
            } catch (t) {
              ru(e, t);
            }
          if ((Za(), (_l = r), (vl.current = a), 1 === Cl))
            throw ((t = Ol), nu(e, n), Du(e, n), Kl(e), t);
          if (null === kl)
            switch (
              ((a = e.finishedWork = e.current.alternate),
              (e.finishedExpirationTime = n),
              (r = Cl),
              (Sl = null),
              r)
            ) {
              case wl:
              case 1:
                throw Error(i(345));
              case 2:
                Au(e, 2 < n ? 2 : n);
                break;
              case El:
                if (
                  (Du(e, n),
                  n === (r = e.lastSuspendedTime) &&
                    (e.nextKnownPendingLevel = fu(a)),
                  1073741823 === Pl && 10 < (a = Rl + 500 - za()))
                ) {
                  if (Dl) {
                    var o = e.lastPingedTime;
                    if (0 === o || o >= n) {
                      (e.lastPingedTime = n), nu(e, n);
                      break;
                    }
                  }
                  if (0 !== (o = Xl(e)) && o !== n) break;
                  if (0 !== r && r !== n) {
                    e.lastPingedTime = r;
                    break;
                  }
                  e.timeoutHandle = bn(du.bind(null, e), a);
                  break;
                }
                du(e);
                break;
              case xl:
                if (
                  (Du(e, n),
                  n === (r = e.lastSuspendedTime) &&
                    (e.nextKnownPendingLevel = fu(a)),
                  Dl && (0 === (a = e.lastPingedTime) || a >= n))
                ) {
                  (e.lastPingedTime = n), nu(e, n);
                  break;
                }
                if (0 !== (a = Xl(e)) && a !== n) break;
                if (0 !== r && r !== n) {
                  e.lastPingedTime = r;
                  break;
                }
                if (
                  (1073741823 !== Nl
                    ? (r = 10 * (1073741821 - Nl) - za())
                    : 1073741823 === Pl
                    ? (r = 0)
                    : ((r = 10 * (1073741821 - Pl) - 5e3),
                      0 > (r = (a = za()) - r) && (r = 0),
                      (n = 10 * (1073741821 - n) - a) <
                        (r =
                          (120 > r
                            ? 120
                            : 480 > r
                            ? 480
                            : 1080 > r
                            ? 1080
                            : 1920 > r
                            ? 1920
                            : 3e3 > r
                            ? 3e3
                            : 4320 > r
                            ? 4320
                            : 1960 * gl(r / 1960)) - r) && (r = n)),
                  10 < r)
                ) {
                  e.timeoutHandle = bn(du.bind(null, e), r);
                  break;
                }
                du(e);
                break;
              case 5:
                if (1073741823 !== Pl && null !== jl) {
                  o = Pl;
                  var l = jl;
                  if (
                    (0 >= (r = 0 | l.busyMinDurationMs)
                      ? (r = 0)
                      : ((a = 0 | l.busyDelayMs),
                        (r =
                          (o =
                            za() -
                            (10 * (1073741821 - o) -
                              (0 | l.timeoutMs || 5e3))) <= a
                            ? 0
                            : a + r - o)),
                    10 < r)
                  ) {
                    Du(e, n), (e.timeoutHandle = bn(du.bind(null, e), r));
                    break;
                  }
                }
                du(e);
                break;
              default:
                throw Error(i(329));
            }
          if ((Kl(e), e.callbackNode === t)) return Jl.bind(null, e);
        }
      }
      return null;
    }
    function Zl(e) {
      var t = e.lastExpiredTime;
      if (((t = 0 !== t ? t : 1073741823), 0 != (48 & _l))) throw Error(i(327));
      if ((hu(), (e === Sl && t === Tl) || nu(e, t), null !== kl)) {
        var n = _l;
        _l |= 16;
        for (var r = au(); ; )
          try {
            lu();
            break;
          } catch (t) {
            ru(e, t);
          }
        if ((Za(), (_l = n), (vl.current = r), 1 === Cl))
          throw ((n = Ol), nu(e, t), Du(e, t), Kl(e), n);
        if (null !== kl) throw Error(i(261));
        (e.finishedWork = e.current.alternate),
          (e.finishedExpirationTime = t),
          (Sl = null),
          du(e),
          Kl(e);
      }
      return null;
    }
    function eu(e, t) {
      var n = _l;
      _l |= 1;
      try {
        return e(t);
      } finally {
        0 === (_l = n) && $a();
      }
    }
    function tu(e, t) {
      var n = _l;
      (_l &= -2), (_l |= 8);
      try {
        return e(t);
      } finally {
        0 === (_l = n) && $a();
      }
    }
    function nu(e, t) {
      (e.finishedWork = null), (e.finishedExpirationTime = 0);
      var n = e.timeoutHandle;
      if ((-1 !== n && ((e.timeoutHandle = -1), wn(n)), null !== kl))
        for (n = kl.return; null !== n; ) {
          var r = n;
          switch (r.tag) {
            case 1:
              null != (r = r.type.childContextTypes) && ya();
              break;
            case 3:
              Do(), ua(da), ua(fa);
              break;
            case 5:
              Ao(r);
              break;
            case 4:
              Do();
              break;
            case 13:
            case 19:
              ua(Io);
              break;
            case 10:
              eo(r);
          }
          n = n.return;
        }
      (Sl = e),
        (kl = Tu(e.current, null)),
        (Tl = t),
        (Cl = wl),
        (Ol = null),
        (Nl = Pl = 1073741823),
        (jl = null),
        (Ml = 0),
        (Dl = !1);
    }
    function ru(e, t) {
      for (;;) {
        try {
          if ((Za(), (zo.current = yi), $o))
            for (var n = Ho.memoizedState; null !== n; ) {
              var r = n.queue;
              null !== r && (r.pending = null), (n = n.next);
            }
          if (
            ((Wo = 0),
            (Bo = Yo = Ho = null),
            ($o = !1),
            null === kl || null === kl.return)
          )
            return (Cl = 1), (Ol = t), (kl = null);
          e: {
            var a = e,
              o = kl.return,
              i = kl,
              l = t;
            if (
              ((t = Tl),
              (i.effectTag |= 2048),
              (i.firstEffect = i.lastEffect = null),
              null !== l && "object" == typeof l && "function" == typeof l.then)
            ) {
              var u = l;
              if (0 == (2 & i.mode)) {
                var c = i.alternate;
                c
                  ? ((i.updateQueue = c.updateQueue),
                    (i.memoizedState = c.memoizedState),
                    (i.expirationTime = c.expirationTime))
                  : ((i.updateQueue = null), (i.memoizedState = null));
              }
              var s = 0 != (1 & Io.current),
                f = o;
              do {
                var d;
                if ((d = 13 === f.tag)) {
                  var p = f.memoizedState;
                  if (null !== p) d = null !== p.dehydrated;
                  else {
                    var m = f.memoizedProps;
                    d =
                      void 0 !== m.fallback &&
                      (!0 !== m.unstable_avoidThisFallback || !s);
                  }
                }
                if (d) {
                  var h = f.updateQueue;
                  if (null === h) {
                    var y = new Set();
                    y.add(u), (f.updateQueue = y);
                  } else h.add(u);
                  if (0 == (2 & f.mode)) {
                    if (
                      ((f.effectTag |= 64), (i.effectTag &= -2981), 1 === i.tag)
                    )
                      if (null === i.alternate) i.tag = 17;
                      else {
                        var g = lo(1073741823, null);
                        (g.tag = 2), uo(i, g);
                      }
                    i.expirationTime = 1073741823;
                    break e;
                  }
                  (l = void 0), (i = t);
                  var v = a.pingCache;
                  if (
                    (null === v
                      ? ((v = a.pingCache = new pl()),
                        (l = new Set()),
                        v.set(u, l))
                      : void 0 === (l = v.get(u)) &&
                        ((l = new Set()), v.set(u, l)),
                    !l.has(i))
                  ) {
                    l.add(i);
                    var b = bu.bind(null, a, u, i);
                    u.then(b, b);
                  }
                  (f.effectTag |= 4096), (f.expirationTime = t);
                  break e;
                }
                f = f.return;
              } while (null !== f);
              l = Error(
                (ye(i.type) || "A React component") +
                  " suspended while rendering, but no fallback UI was specified.\n\nAdd a <Suspense fallback=...> component higher in the tree to provide a loading indicator or placeholder to display." +
                  ge(i)
              );
            }
            5 !== Cl && (Cl = 2), (l = Ji(l, i)), (f = o);
            do {
              switch (f.tag) {
                case 3:
                  (u = l),
                    (f.effectTag |= 4096),
                    (f.expirationTime = t),
                    co(f, ml(f, u, t));
                  break e;
                case 1:
                  u = l;
                  var w = f.type,
                    E = f.stateNode;
                  if (
                    0 == (64 & f.effectTag) &&
                    ("function" == typeof w.getDerivedStateFromError ||
                      (null !== E &&
                        "function" == typeof E.componentDidCatch &&
                        (null === Ll || !Ll.has(E))))
                  ) {
                    (f.effectTag |= 4096),
                      (f.expirationTime = t),
                      co(f, hl(f, u, t));
                    break e;
                  }
              }
              f = f.return;
            } while (null !== f);
          }
          kl = su(kl);
        } catch (e) {
          t = e;
          continue;
        }
        break;
      }
    }
    function au() {
      var e = vl.current;
      return (vl.current = yi), null === e ? yi : e;
    }
    function ou(e, t) {
      e < Pl && 2 < e && (Pl = e),
        null !== t && e < Nl && 2 < e && ((Nl = e), (jl = t));
    }
    function iu(e) {
      e > Ml && (Ml = e);
    }
    function lu() {
      for (; null !== kl; ) kl = cu(kl);
    }
    function uu() {
      for (; null !== kl && !Da(); ) kl = cu(kl);
    }
    function cu(e) {
      var t = yl(e.alternate, e, Tl);
      return (
        (e.memoizedProps = e.pendingProps),
        null === t && (t = su(e)),
        (bl.current = null),
        t
      );
    }
    function su(e) {
      kl = e;
      do {
        var t = kl.alternate;
        if (((e = kl.return), 0 == (2048 & kl.effectTag))) {
          if (((t = Xi(t, kl, Tl)), 1 === Tl || 1 !== kl.childExpirationTime)) {
            for (var n = 0, r = kl.child; null !== r; ) {
              var a = r.expirationTime,
                o = r.childExpirationTime;
              a > n && (n = a), o > n && (n = o), (r = r.sibling);
            }
            kl.childExpirationTime = n;
          }
          if (null !== t) return t;
          null !== e &&
            0 == (2048 & e.effectTag) &&
            (null === e.firstEffect && (e.firstEffect = kl.firstEffect),
            null !== kl.lastEffect &&
              (null !== e.lastEffect &&
                (e.lastEffect.nextEffect = kl.firstEffect),
              (e.lastEffect = kl.lastEffect)),
            1 < kl.effectTag &&
              (null !== e.lastEffect
                ? (e.lastEffect.nextEffect = kl)
                : (e.firstEffect = kl),
              (e.lastEffect = kl)));
        } else {
          if (null !== (t = Ki(kl))) return (t.effectTag &= 2047), t;
          null !== e &&
            ((e.firstEffect = e.lastEffect = null), (e.effectTag |= 2048));
        }
        if (null !== (t = kl.sibling)) return t;
        kl = e;
      } while (null !== kl);
      return Cl === wl && (Cl = 5), null;
    }
    function fu(e) {
      var t = e.expirationTime;
      return t > (e = e.childExpirationTime) ? t : e;
    }
    function du(e) {
      var t = Fa();
      return Ha(99, pu.bind(null, e, t)), null;
    }
    function pu(e, t) {
      do {
        hu();
      } while (null !== Fl);
      if (0 != (48 & _l)) throw Error(i(327));
      var n = e.finishedWork,
        r = e.finishedExpirationTime;
      if (null === n) return null;
      if (
        ((e.finishedWork = null),
        (e.finishedExpirationTime = 0),
        n === e.current)
      )
        throw Error(i(177));
      (e.callbackNode = null),
        (e.callbackExpirationTime = 0),
        (e.callbackPriority = 90),
        (e.nextKnownPendingLevel = 0);
      var a = fu(n);
      if (
        ((e.firstPendingTime = a),
        r <= e.lastSuspendedTime
          ? (e.firstSuspendedTime = e.lastSuspendedTime = e.nextKnownPendingLevel = 0)
          : r <= e.firstSuspendedTime && (e.firstSuspendedTime = r - 1),
        r <= e.lastPingedTime && (e.lastPingedTime = 0),
        r <= e.lastExpiredTime && (e.lastExpiredTime = 0),
        e === Sl && ((kl = Sl = null), (Tl = 0)),
        1 < n.effectTag
          ? null !== n.lastEffect
            ? ((n.lastEffect.nextEffect = n), (a = n.firstEffect))
            : (a = n)
          : (a = n.firstEffect),
        null !== a)
      ) {
        var o = _l;
        (_l |= 32), (bl.current = null), (hn = qt);
        var l = pn();
        if (mn(l)) {
          if ("selectionStart" in l)
            var u = { start: l.selectionStart, end: l.selectionEnd };
          else
            e: {
              var c =
                (u = ((u = l.ownerDocument) && u.defaultView) || window)
                  .getSelection && u.getSelection();
              if (c && 0 !== c.rangeCount) {
                u = c.anchorNode;
                var s = c.anchorOffset,
                  f = c.focusNode;
                c = c.focusOffset;
                try {
                  u.nodeType, f.nodeType;
                } catch (e) {
                  u = null;
                  break e;
                }
                var d = 0,
                  p = -1,
                  m = -1,
                  h = 0,
                  y = 0,
                  g = l,
                  v = null;
                t: for (;;) {
                  for (
                    var b;
                    g !== u || (0 !== s && 3 !== g.nodeType) || (p = d + s),
                      g !== f || (0 !== c && 3 !== g.nodeType) || (m = d + c),
                      3 === g.nodeType && (d += g.nodeValue.length),
                      null !== (b = g.firstChild);

                  )
                    (v = g), (g = b);
                  for (;;) {
                    if (g === l) break t;
                    if (
                      (v === u && ++h === s && (p = d),
                      v === f && ++y === c && (m = d),
                      null !== (b = g.nextSibling))
                    )
                      break;
                    v = (g = v).parentNode;
                  }
                  g = b;
                }
                u = -1 === p || -1 === m ? null : { start: p, end: m };
              } else u = null;
            }
          u = u || { start: 0, end: 0 };
        } else u = null;
        (yn = {
          activeElementDetached: null,
          focusedElem: l,
          selectionRange: u,
        }),
          (qt = !1),
          (Al = a);
        do {
          try {
            mu();
          } catch (e) {
            if (null === Al) throw Error(i(330));
            vu(Al, e), (Al = Al.nextEffect);
          }
        } while (null !== Al);
        Al = a;
        do {
          try {
            for (l = e, u = t; null !== Al; ) {
              var w = Al.effectTag;
              if ((16 & w && Fe(Al.stateNode, ""), 128 & w)) {
                var E = Al.alternate;
                if (null !== E) {
                  var x = E.ref;
                  null !== x &&
                    ("function" == typeof x ? x(null) : (x.current = null));
                }
              }
              switch (1038 & w) {
                case 2:
                  cl(Al), (Al.effectTag &= -3);
                  break;
                case 6:
                  cl(Al), (Al.effectTag &= -3), fl(Al.alternate, Al);
                  break;
                case 1024:
                  Al.effectTag &= -1025;
                  break;
                case 1028:
                  (Al.effectTag &= -1025), fl(Al.alternate, Al);
                  break;
                case 4:
                  fl(Al.alternate, Al);
                  break;
                case 8:
                  sl(l, (s = Al), u), ll(s);
              }
              Al = Al.nextEffect;
            }
          } catch (e) {
            if (null === Al) throw Error(i(330));
            vu(Al, e), (Al = Al.nextEffect);
          }
        } while (null !== Al);
        if (
          ((x = yn),
          (E = pn()),
          (w = x.focusedElem),
          (u = x.selectionRange),
          E !== w &&
            w &&
            w.ownerDocument &&
            (function e(t, n) {
              return (
                !(!t || !n) &&
                (t === n ||
                  ((!t || 3 !== t.nodeType) &&
                    (n && 3 === n.nodeType
                      ? e(t, n.parentNode)
                      : "contains" in t
                      ? t.contains(n)
                      : !!t.compareDocumentPosition &&
                        !!(16 & t.compareDocumentPosition(n)))))
              );
            })(w.ownerDocument.documentElement, w))
        ) {
          null !== u &&
            mn(w) &&
            ((E = u.start),
            void 0 === (x = u.end) && (x = E),
            "selectionStart" in w
              ? ((w.selectionStart = E),
                (w.selectionEnd = Math.min(x, w.value.length)))
              : (x =
                  ((E = w.ownerDocument || document) && E.defaultView) ||
                  window).getSelection &&
                ((x = x.getSelection()),
                (s = w.textContent.length),
                (l = Math.min(u.start, s)),
                (u = void 0 === u.end ? l : Math.min(u.end, s)),
                !x.extend && l > u && ((s = u), (u = l), (l = s)),
                (s = dn(w, l)),
                (f = dn(w, u)),
                s &&
                  f &&
                  (1 !== x.rangeCount ||
                    x.anchorNode !== s.node ||
                    x.anchorOffset !== s.offset ||
                    x.focusNode !== f.node ||
                    x.focusOffset !== f.offset) &&
                  ((E = E.createRange()).setStart(s.node, s.offset),
                  x.removeAllRanges(),
                  l > u
                    ? (x.addRange(E), x.extend(f.node, f.offset))
                    : (E.setEnd(f.node, f.offset), x.addRange(E))))),
            (E = []);
          for (x = w; (x = x.parentNode); )
            1 === x.nodeType &&
              E.push({ element: x, left: x.scrollLeft, top: x.scrollTop });
          for (
            "function" == typeof w.focus && w.focus(), w = 0;
            w < E.length;
            w++
          )
            ((x = E[w]).element.scrollLeft = x.left),
              (x.element.scrollTop = x.top);
        }
        (qt = !!hn), (yn = hn = null), (e.current = n), (Al = a);
        do {
          try {
            for (w = e; null !== Al; ) {
              var _ = Al.effectTag;
              if ((36 & _ && ol(w, Al.alternate, Al), 128 & _)) {
                E = void 0;
                var S = Al.ref;
                if (null !== S) {
                  var k = Al.stateNode;
                  switch (Al.tag) {
                    case 5:
                      E = k;
                      break;
                    default:
                      E = k;
                  }
                  "function" == typeof S ? S(E) : (S.current = E);
                }
              }
              Al = Al.nextEffect;
            }
          } catch (e) {
            if (null === Al) throw Error(i(330));
            vu(Al, e), (Al = Al.nextEffect);
          }
        } while (null !== Al);
        (Al = null), Ra(), (_l = o);
      } else e.current = n;
      if (zl) (zl = !1), (Fl = e), (Wl = t);
      else
        for (Al = a; null !== Al; )
          (t = Al.nextEffect), (Al.nextEffect = null), (Al = t);
      if (
        (0 === (t = e.firstPendingTime) && (Ll = null),
        1073741823 === t ? (e === Bl ? Yl++ : ((Yl = 0), (Bl = e))) : (Yl = 0),
        "function" == typeof Eu && Eu(n.stateNode, r),
        Kl(e),
        Il)
      )
        throw ((Il = !1), (e = Ul), (Ul = null), e);
      return 0 != (8 & _l) || $a(), null;
    }
    function mu() {
      for (; null !== Al; ) {
        var e = Al.effectTag;
        0 != (256 & e) && nl(Al.alternate, Al),
          0 == (512 & e) ||
            zl ||
            ((zl = !0),
            Ya(97, function () {
              return hu(), null;
            })),
          (Al = Al.nextEffect);
      }
    }
    function hu() {
      if (90 !== Wl) {
        var e = 97 < Wl ? 97 : Wl;
        return (Wl = 90), Ha(e, yu);
      }
    }
    function yu() {
      if (null === Fl) return !1;
      var e = Fl;
      if (((Fl = null), 0 != (48 & _l))) throw Error(i(331));
      var t = _l;
      for (_l |= 32, e = e.current.firstEffect; null !== e; ) {
        try {
          var n = e;
          if (0 != (512 & n.effectTag))
            switch (n.tag) {
              case 0:
              case 11:
              case 15:
              case 22:
                rl(5, n), al(5, n);
            }
        } catch (t) {
          if (null === e) throw Error(i(330));
          vu(e, t);
        }
        (n = e.nextEffect), (e.nextEffect = null), (e = n);
      }
      return (_l = t), $a(), !0;
    }
    function gu(e, t, n) {
      uo(e, (t = ml(e, (t = Ji(n, t)), 1073741823))),
        null !== (e = Gl(e, 1073741823)) && Kl(e);
    }
    function vu(e, t) {
      if (3 === e.tag) gu(e, e, t);
      else
        for (var n = e.return; null !== n; ) {
          if (3 === n.tag) {
            gu(n, e, t);
            break;
          }
          if (1 === n.tag) {
            var r = n.stateNode;
            if (
              "function" == typeof n.type.getDerivedStateFromError ||
              ("function" == typeof r.componentDidCatch &&
                (null === Ll || !Ll.has(r)))
            ) {
              uo(n, (e = hl(n, (e = Ji(t, e)), 1073741823))),
                null !== (n = Gl(n, 1073741823)) && Kl(n);
              break;
            }
          }
          n = n.return;
        }
    }
    function bu(e, t, n) {
      var r = e.pingCache;
      null !== r && r.delete(t),
        Sl === e && Tl === n
          ? Cl === xl || (Cl === El && 1073741823 === Pl && za() - Rl < 500)
            ? nu(e, Tl)
            : (Dl = !0)
          : Mu(e, n) &&
            ((0 !== (t = e.lastPingedTime) && t < n) ||
              ((e.lastPingedTime = n), Kl(e)));
    }
    function wu(e, t) {
      var n = e.stateNode;
      null !== n && n.delete(t),
        0 === (t = 0) && (t = Vl((t = ql()), e, null)),
        null !== (e = Gl(e, t)) && Kl(e);
    }
    yl = function (e, t, n) {
      var r = t.expirationTime;
      if (null !== e) {
        var a = t.pendingProps;
        if (e.memoizedProps !== a || da.current) Ni = !0;
        else {
          if (r < n) {
            switch (((Ni = !1), t.tag)) {
              case 3:
                zi(t), Oi();
                break;
              case 5:
                if ((Ro(t), 4 & t.mode && 1 !== n && a.hidden))
                  return (t.expirationTime = t.childExpirationTime = 1), null;
                break;
              case 1:
                ha(t.type) && ba(t);
                break;
              case 4:
                Mo(t, t.stateNode.containerInfo);
                break;
              case 10:
                (r = t.memoizedProps.value),
                  (a = t.type._context),
                  ca(Ga, a._currentValue),
                  (a._currentValue = r);
                break;
              case 13:
                if (null !== t.memoizedState)
                  return 0 !== (r = t.child.childExpirationTime) && r >= n
                    ? Bi(e, t, n)
                    : (ca(Io, 1 & Io.current),
                      null !== (t = Qi(e, t, n)) ? t.sibling : null);
                ca(Io, 1 & Io.current);
                break;
              case 19:
                if (
                  ((r = t.childExpirationTime >= n), 0 != (64 & e.effectTag))
                ) {
                  if (r) return Vi(e, t, n);
                  t.effectTag |= 64;
                }
                if (
                  (null !== (a = t.memoizedState) &&
                    ((a.rendering = null), (a.tail = null)),
                  ca(Io, Io.current),
                  !r)
                )
                  return null;
            }
            return Qi(e, t, n);
          }
          Ni = !1;
        }
      } else Ni = !1;
      switch (((t.expirationTime = 0), t.tag)) {
        case 2:
          if (
            ((r = t.type),
            null !== e &&
              ((e.alternate = null), (t.alternate = null), (t.effectTag |= 2)),
            (e = t.pendingProps),
            (a = ma(t, fa.current)),
            no(t, n),
            (a = Qo(null, t, r, e, a, n)),
            (t.effectTag |= 1),
            "object" == typeof a &&
              null !== a &&
              "function" == typeof a.render &&
              void 0 === a.$$typeof)
          ) {
            if (
              ((t.tag = 1),
              (t.memoizedState = null),
              (t.updateQueue = null),
              ha(r))
            ) {
              var o = !0;
              ba(t);
            } else o = !1;
            (t.memoizedState =
              null !== a.state && void 0 !== a.state ? a.state : null),
              oo(t);
            var l = r.getDerivedStateFromProps;
            "function" == typeof l && ho(t, r, l, e),
              (a.updater = yo),
              (t.stateNode = a),
              (a._reactInternalFiber = t),
              wo(t, r, e, n),
              (t = Li(null, t, r, !0, o, n));
          } else (t.tag = 0), ji(null, t, a, n), (t = t.child);
          return t;
        case 16:
          e: {
            if (
              ((a = t.elementType),
              null !== e &&
                ((e.alternate = null),
                (t.alternate = null),
                (t.effectTag |= 2)),
              (e = t.pendingProps),
              (function (e) {
                if (-1 === e._status) {
                  e._status = 0;
                  var t = e._ctor;
                  (t = t()),
                    (e._result = t),
                    t.then(
                      function (t) {
                        0 === e._status &&
                          ((t = t.default), (e._status = 1), (e._result = t));
                      },
                      function (t) {
                        0 === e._status && ((e._status = 2), (e._result = t));
                      }
                    );
                }
              })(a),
              1 !== a._status)
            )
              throw a._result;
            switch (
              ((a = a._result),
              (t.type = a),
              (o = t.tag = (function (e) {
                if ("function" == typeof e) return ku(e) ? 1 : 0;
                if (null != e) {
                  if ((e = e.$$typeof) === ue) return 11;
                  if (e === fe) return 14;
                }
                return 2;
              })(a)),
              (e = Qa(a, e)),
              o)
            ) {
              case 0:
                t = Ii(null, t, a, e, n);
                break e;
              case 1:
                t = Ui(null, t, a, e, n);
                break e;
              case 11:
                t = Mi(null, t, a, e, n);
                break e;
              case 14:
                t = Di(null, t, a, Qa(a.type, e), r, n);
                break e;
            }
            throw Error(i(306, a, ""));
          }
          return t;
        case 0:
          return (
            (r = t.type),
            (a = t.pendingProps),
            Ii(e, t, r, (a = t.elementType === r ? a : Qa(r, a)), n)
          );
        case 1:
          return (
            (r = t.type),
            (a = t.pendingProps),
            Ui(e, t, r, (a = t.elementType === r ? a : Qa(r, a)), n)
          );
        case 3:
          if ((zi(t), (r = t.updateQueue), null === e || null === r))
            throw Error(i(282));
          if (
            ((r = t.pendingProps),
            (a = null !== (a = t.memoizedState) ? a.element : null),
            io(e, t),
            so(t, r, null, n),
            (r = t.memoizedState.element) === a)
          )
            Oi(), (t = Qi(e, t, n));
          else {
            if (
              ((a = t.stateNode.hydrate) &&
                ((Ei = En(t.stateNode.containerInfo.firstChild)),
                (wi = t),
                (a = xi = !0)),
              a)
            )
              for (n = To(t, null, r, n), t.child = n; n; )
                (n.effectTag = (-3 & n.effectTag) | 1024), (n = n.sibling);
            else ji(e, t, r, n), Oi();
            t = t.child;
          }
          return t;
        case 5:
          return (
            Ro(t),
            null === e && ki(t),
            (r = t.type),
            (a = t.pendingProps),
            (o = null !== e ? e.memoizedProps : null),
            (l = a.children),
            vn(r, a)
              ? (l = null)
              : null !== o && vn(r, o) && (t.effectTag |= 16),
            Ai(e, t),
            4 & t.mode && 1 !== n && a.hidden
              ? ((t.expirationTime = t.childExpirationTime = 1), (t = null))
              : (ji(e, t, l, n), (t = t.child)),
            t
          );
        case 6:
          return null === e && ki(t), null;
        case 13:
          return Bi(e, t, n);
        case 4:
          return (
            Mo(t, t.stateNode.containerInfo),
            (r = t.pendingProps),
            null === e ? (t.child = ko(t, null, r, n)) : ji(e, t, r, n),
            t.child
          );
        case 11:
          return (
            (r = t.type),
            (a = t.pendingProps),
            Mi(e, t, r, (a = t.elementType === r ? a : Qa(r, a)), n)
          );
        case 7:
          return ji(e, t, t.pendingProps, n), t.child;
        case 8:
        case 12:
          return ji(e, t, t.pendingProps.children, n), t.child;
        case 10:
          e: {
            (r = t.type._context),
              (a = t.pendingProps),
              (l = t.memoizedProps),
              (o = a.value);
            var u = t.type._context;
            if ((ca(Ga, u._currentValue), (u._currentValue = o), null !== l))
              if (
                ((u = l.value),
                0 ===
                  (o = Ur(u, o)
                    ? 0
                    : 0 |
                      ("function" == typeof r._calculateChangedBits
                        ? r._calculateChangedBits(u, o)
                        : 1073741823)))
              ) {
                if (l.children === a.children && !da.current) {
                  t = Qi(e, t, n);
                  break e;
                }
              } else
                for (null !== (u = t.child) && (u.return = t); null !== u; ) {
                  var c = u.dependencies;
                  if (null !== c) {
                    l = u.child;
                    for (var s = c.firstContext; null !== s; ) {
                      if (s.context === r && 0 != (s.observedBits & o)) {
                        1 === u.tag && (((s = lo(n, null)).tag = 2), uo(u, s)),
                          u.expirationTime < n && (u.expirationTime = n),
                          null !== (s = u.alternate) &&
                            s.expirationTime < n &&
                            (s.expirationTime = n),
                          to(u.return, n),
                          c.expirationTime < n && (c.expirationTime = n);
                        break;
                      }
                      s = s.next;
                    }
                  } else l = 10 === u.tag && u.type === t.type ? null : u.child;
                  if (null !== l) l.return = u;
                  else
                    for (l = u; null !== l; ) {
                      if (l === t) {
                        l = null;
                        break;
                      }
                      if (null !== (u = l.sibling)) {
                        (u.return = l.return), (l = u);
                        break;
                      }
                      l = l.return;
                    }
                  u = l;
                }
            ji(e, t, a.children, n), (t = t.child);
          }
          return t;
        case 9:
          return (
            (a = t.type),
            (r = (o = t.pendingProps).children),
            no(t, n),
            (r = r((a = ro(a, o.unstable_observedBits)))),
            (t.effectTag |= 1),
            ji(e, t, r, n),
            t.child
          );
        case 14:
          return (
            (o = Qa((a = t.type), t.pendingProps)),
            Di(e, t, a, (o = Qa(a.type, o)), r, n)
          );
        case 15:
          return Ri(e, t, t.type, t.pendingProps, r, n);
        case 17:
          return (
            (r = t.type),
            (a = t.pendingProps),
            (a = t.elementType === r ? a : Qa(r, a)),
            null !== e &&
              ((e.alternate = null), (t.alternate = null), (t.effectTag |= 2)),
            (t.tag = 1),
            ha(r) ? ((e = !0), ba(t)) : (e = !1),
            no(t, n),
            vo(t, r, a),
            wo(t, r, a, n),
            Li(null, t, r, !0, e, n)
          );
        case 19:
          return Vi(e, t, n);
      }
      throw Error(i(156, t.tag));
    };
    var Eu = null,
      xu = null;
    function _u(e, t, n, r) {
      (this.tag = e),
        (this.key = n),
        (this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null),
        (this.index = 0),
        (this.ref = null),
        (this.pendingProps = t),
        (this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null),
        (this.mode = r),
        (this.effectTag = 0),
        (this.lastEffect = this.firstEffect = this.nextEffect = null),
        (this.childExpirationTime = this.expirationTime = 0),
        (this.alternate = null);
    }
    function Su(e, t, n, r) {
      return new _u(e, t, n, r);
    }
    function ku(e) {
      return !(!(e = e.prototype) || !e.isReactComponent);
    }
    function Tu(e, t) {
      var n = e.alternate;
      return (
        null === n
          ? (((n = Su(e.tag, t, e.key, e.mode)).elementType = e.elementType),
            (n.type = e.type),
            (n.stateNode = e.stateNode),
            (n.alternate = e),
            (e.alternate = n))
          : ((n.pendingProps = t),
            (n.effectTag = 0),
            (n.nextEffect = null),
            (n.firstEffect = null),
            (n.lastEffect = null)),
        (n.childExpirationTime = e.childExpirationTime),
        (n.expirationTime = e.expirationTime),
        (n.child = e.child),
        (n.memoizedProps = e.memoizedProps),
        (n.memoizedState = e.memoizedState),
        (n.updateQueue = e.updateQueue),
        (t = e.dependencies),
        (n.dependencies =
          null === t
            ? null
            : {
                expirationTime: t.expirationTime,
                firstContext: t.firstContext,
                responders: t.responders,
              }),
        (n.sibling = e.sibling),
        (n.index = e.index),
        (n.ref = e.ref),
        n
      );
    }
    function Cu(e, t, n, r, a, o) {
      var l = 2;
      if (((r = e), "function" == typeof e)) ku(e) && (l = 1);
      else if ("string" == typeof e) l = 5;
      else
        e: switch (e) {
          case ne:
            return Ou(n.children, a, o, t);
          case le:
            (l = 8), (a |= 7);
            break;
          case re:
            (l = 8), (a |= 1);
            break;
          case ae:
            return (
              ((e = Su(12, n, t, 8 | a)).elementType = ae),
              (e.type = ae),
              (e.expirationTime = o),
              e
            );
          case ce:
            return (
              ((e = Su(13, n, t, a)).type = ce),
              (e.elementType = ce),
              (e.expirationTime = o),
              e
            );
          case se:
            return (
              ((e = Su(19, n, t, a)).elementType = se),
              (e.expirationTime = o),
              e
            );
          default:
            if ("object" == typeof e && null !== e)
              switch (e.$$typeof) {
                case oe:
                  l = 10;
                  break e;
                case ie:
                  l = 9;
                  break e;
                case ue:
                  l = 11;
                  break e;
                case fe:
                  l = 14;
                  break e;
                case de:
                  (l = 16), (r = null);
                  break e;
                case pe:
                  l = 22;
                  break e;
              }
            throw Error(i(130, null == e ? e : typeof e, ""));
        }
      return (
        ((t = Su(l, n, t, a)).elementType = e),
        (t.type = r),
        (t.expirationTime = o),
        t
      );
    }
    function Ou(e, t, n, r) {
      return ((e = Su(7, e, r, t)).expirationTime = n), e;
    }
    function Pu(e, t, n) {
      return ((e = Su(6, e, null, t)).expirationTime = n), e;
    }
    function Nu(e, t, n) {
      return (
        ((t = Su(
          4,
          null !== e.children ? e.children : [],
          e.key,
          t
        )).expirationTime = n),
        (t.stateNode = {
          containerInfo: e.containerInfo,
          pendingChildren: null,
          implementation: e.implementation,
        }),
        t
      );
    }
    function ju(e, t, n) {
      (this.tag = t),
        (this.current = null),
        (this.containerInfo = e),
        (this.pingCache = this.pendingChildren = null),
        (this.finishedExpirationTime = 0),
        (this.finishedWork = null),
        (this.timeoutHandle = -1),
        (this.pendingContext = this.context = null),
        (this.hydrate = n),
        (this.callbackNode = null),
        (this.callbackPriority = 90),
        (this.lastExpiredTime = this.lastPingedTime = this.nextKnownPendingLevel = this.lastSuspendedTime = this.firstSuspendedTime = this.firstPendingTime = 0);
    }
    function Mu(e, t) {
      var n = e.firstSuspendedTime;
      return (e = e.lastSuspendedTime), 0 !== n && n >= t && e <= t;
    }
    function Du(e, t) {
      var n = e.firstSuspendedTime,
        r = e.lastSuspendedTime;
      n < t && (e.firstSuspendedTime = t),
        (r > t || 0 === n) && (e.lastSuspendedTime = t),
        t <= e.lastPingedTime && (e.lastPingedTime = 0),
        t <= e.lastExpiredTime && (e.lastExpiredTime = 0);
    }
    function Ru(e, t) {
      t > e.firstPendingTime && (e.firstPendingTime = t);
      var n = e.firstSuspendedTime;
      0 !== n &&
        (t >= n
          ? (e.firstSuspendedTime = e.lastSuspendedTime = e.nextKnownPendingLevel = 0)
          : t >= e.lastSuspendedTime && (e.lastSuspendedTime = t + 1),
        t > e.nextKnownPendingLevel && (e.nextKnownPendingLevel = t));
    }
    function Au(e, t) {
      var n = e.lastExpiredTime;
      (0 === n || n > t) && (e.lastExpiredTime = t);
    }
    function Iu(e, t, n, r) {
      var a = t.current,
        o = ql(),
        l = po.suspense;
      o = Vl(o, a, l);
      e: if (n) {
        t: {
          if (Ze((n = n._reactInternalFiber)) !== n || 1 !== n.tag)
            throw Error(i(170));
          var u = n;
          do {
            switch (u.tag) {
              case 3:
                u = u.stateNode.context;
                break t;
              case 1:
                if (ha(u.type)) {
                  u = u.stateNode.__reactInternalMemoizedMergedChildContext;
                  break t;
                }
            }
            u = u.return;
          } while (null !== u);
          throw Error(i(171));
        }
        if (1 === n.tag) {
          var c = n.type;
          if (ha(c)) {
            n = va(n, c, u);
            break e;
          }
        }
        n = u;
      } else n = sa;
      return (
        null === t.context ? (t.context = n) : (t.pendingContext = n),
        ((t = lo(o, l)).payload = { element: e }),
        null !== (r = void 0 === r ? null : r) && (t.callback = r),
        uo(a, t),
        Ql(a, o),
        o
      );
    }
    function Uu(e) {
      if (!(e = e.current).child) return null;
      switch (e.child.tag) {
        case 5:
        default:
          return e.child.stateNode;
      }
    }
    function Lu(e, t) {
      null !== (e = e.memoizedState) &&
        null !== e.dehydrated &&
        e.retryTime < t &&
        (e.retryTime = t);
    }
    function zu(e, t) {
      Lu(e, t), (e = e.alternate) && Lu(e, t);
    }
    function Fu(e, t, n) {
      var r = new ju(e, t, (n = null != n && !0 === n.hydrate)),
        a = Su(3, null, null, 2 === t ? 7 : 1 === t ? 3 : 0);
      (r.current = a),
        (a.stateNode = r),
        oo(a),
        (e[Tn] = r.current),
        n &&
          0 !== t &&
          (function (e, t) {
            var n = Je(t);
            Tt.forEach(function (e) {
              mt(e, t, n);
            }),
              Ct.forEach(function (e) {
                mt(e, t, n);
              });
          })(0, 9 === e.nodeType ? e : e.ownerDocument),
        (this._internalRoot = r);
    }
    function Wu(e) {
      return !(
        !e ||
        (1 !== e.nodeType &&
          9 !== e.nodeType &&
          11 !== e.nodeType &&
          (8 !== e.nodeType || " react-mount-point-unstable " !== e.nodeValue))
      );
    }
    function Hu(e, t, n, r, a) {
      var o = n._reactRootContainer;
      if (o) {
        var i = o._internalRoot;
        if ("function" == typeof a) {
          var l = a;
          a = function () {
            var e = Uu(i);
            l.call(e);
          };
        }
        Iu(t, i, e, a);
      } else {
        if (
          ((o = n._reactRootContainer = (function (e, t) {
            if (
              (t ||
                (t = !(
                  !(t = e
                    ? 9 === e.nodeType
                      ? e.documentElement
                      : e.firstChild
                    : null) ||
                  1 !== t.nodeType ||
                  !t.hasAttribute("data-reactroot")
                )),
              !t)
            )
              for (var n; (n = e.lastChild); ) e.removeChild(n);
            return new Fu(e, 0, t ? { hydrate: !0 } : void 0);
          })(n, r)),
          (i = o._internalRoot),
          "function" == typeof a)
        ) {
          var u = a;
          a = function () {
            var e = Uu(i);
            u.call(e);
          };
        }
        tu(function () {
          Iu(t, i, e, a);
        });
      }
      return Uu(i);
    }
    function Yu(e, t, n) {
      var r =
        3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : null;
      return {
        $$typeof: te,
        key: null == r ? null : "" + r,
        children: e,
        containerInfo: t,
        implementation: n,
      };
    }
    function Bu(e, t) {
      var n =
        2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : null;
      if (!Wu(t)) throw Error(i(200));
      return Yu(e, t, null, n);
    }
    (Fu.prototype.render = function (e) {
      Iu(e, this._internalRoot, null, null);
    }),
      (Fu.prototype.unmount = function () {
        var e = this._internalRoot,
          t = e.containerInfo;
        Iu(null, e, null, function () {
          t[Tn] = null;
        });
      }),
      (ht = function (e) {
        if (13 === e.tag) {
          var t = Va(ql(), 150, 100);
          Ql(e, t), zu(e, t);
        }
      }),
      (yt = function (e) {
        13 === e.tag && (Ql(e, 3), zu(e, 3));
      }),
      (gt = function (e) {
        if (13 === e.tag) {
          var t = ql();
          Ql(e, (t = Vl(t, e, null))), zu(e, t);
        }
      }),
      (O = function (e, t, n) {
        switch (t) {
          case "input":
            if ((ke(e, n), (t = n.name), "radio" === n.type && null != t)) {
              for (n = e; n.parentNode; ) n = n.parentNode;
              for (
                n = n.querySelectorAll(
                  "input[name=" + JSON.stringify("" + t) + '][type="radio"]'
                ),
                  t = 0;
                t < n.length;
                t++
              ) {
                var r = n[t];
                if (r !== e && r.form === e.form) {
                  var a = Nn(r);
                  if (!a) throw Error(i(90));
                  Ee(r), ke(r, a);
                }
              }
            }
            break;
          case "textarea":
            Me(e, n);
            break;
          case "select":
            null != (t = n.value) && Pe(e, !!n.multiple, t, !1);
        }
      }),
      (R = eu),
      (A = function (e, t, n, r, a) {
        var o = _l;
        _l |= 4;
        try {
          return Ha(98, e.bind(null, t, n, r, a));
        } finally {
          0 === (_l = o) && $a();
        }
      }),
      (I = function () {
        0 == (49 & _l) &&
          ((function () {
            if (null !== Hl) {
              var e = Hl;
              (Hl = null),
                e.forEach(function (e, t) {
                  Au(t, e), Kl(t);
                }),
                $a();
            }
          })(),
          hu());
      }),
      (U = function (e, t) {
        var n = _l;
        _l |= 2;
        try {
          return e(t);
        } finally {
          0 === (_l = n) && $a();
        }
      });
    var $u,
      qu,
      Vu = {
        Events: [
          On,
          Pn,
          Nn,
          T,
          _,
          Un,
          function (e) {
            at(e, In);
          },
          M,
          D,
          Kt,
          lt,
          hu,
          { current: !1 },
        ],
      };
    (qu = ($u = {
      findFiberByHostInstance: Cn,
      bundleType: 0,
      version: "16.13.1",
      rendererPackageName: "react-dom",
    }).findFiberByHostInstance),
      (function (e) {
        if ("undefined" == typeof __REACT_DEVTOOLS_GLOBAL_HOOK__) return !1;
        var t = __REACT_DEVTOOLS_GLOBAL_HOOK__;
        if (t.isDisabled || !t.supportsFiber) return !0;
        try {
          var n = t.inject(e);
          (Eu = function (e) {
            try {
              t.onCommitFiberRoot(
                n,
                e,
                void 0,
                64 == (64 & e.current.effectTag)
              );
            } catch (e) {}
          }),
            (xu = function (e) {
              try {
                t.onCommitFiberUnmount(n, e);
              } catch (e) {}
            });
        } catch (e) {}
      })(
        a({}, $u, {
          overrideHookState: null,
          overrideProps: null,
          setSuspenseHandler: null,
          scheduleUpdate: null,
          currentDispatcherRef: X.ReactCurrentDispatcher,
          findHostInstanceByFiber: function (e) {
            return null === (e = nt(e)) ? null : e.stateNode;
          },
          findFiberByHostInstance: function (e) {
            return qu ? qu(e) : null;
          },
          findHostInstancesForRefresh: null,
          scheduleRefresh: null,
          scheduleRoot: null,
          setRefreshHandler: null,
          getCurrentFiber: null,
        })
      ),
      (t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Vu),
      (t.createPortal = Bu),
      (t.findDOMNode = function (e) {
        if (null == e) return null;
        if (1 === e.nodeType) return e;
        var t = e._reactInternalFiber;
        if (void 0 === t) {
          if ("function" == typeof e.render) throw Error(i(188));
          throw Error(i(268, Object.keys(e)));
        }
        return (e = null === (e = nt(t)) ? null : e.stateNode);
      }),
      (t.flushSync = function (e, t) {
        if (0 != (48 & _l)) throw Error(i(187));
        var n = _l;
        _l |= 1;
        try {
          return Ha(99, e.bind(null, t));
        } finally {
          (_l = n), $a();
        }
      }),
      (t.hydrate = function (e, t, n) {
        if (!Wu(t)) throw Error(i(200));
        return Hu(null, e, t, !0, n);
      }),
      (t.render = function (e, t, n) {
        if (!Wu(t)) throw Error(i(200));
        return Hu(null, e, t, !1, n);
      }),
      (t.unmountComponentAtNode = function (e) {
        if (!Wu(e)) throw Error(i(40));
        return (
          !!e._reactRootContainer &&
          (tu(function () {
            Hu(null, null, e, !1, function () {
              (e._reactRootContainer = null), (e[Tn] = null);
            });
          }),
          !0)
        );
      }),
      (t.unstable_batchedUpdates = eu),
      (t.unstable_createPortal = function (e, t) {
        return Bu(
          e,
          t,
          2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : null
        );
      }),
      (t.unstable_renderSubtreeIntoContainer = function (e, t, n, r) {
        if (!Wu(n)) throw Error(i(200));
        if (null == e || void 0 === e._reactInternalFiber) throw Error(i(38));
        return Hu(e, t, n, !1, r);
      }),
      (t.version = "16.13.1");
  },
  function (e, t, n) {
    "use strict";
    e.exports = n(29);
  },
  function (e, t, n) {
    "use strict";
    /** @license React v0.19.1
     * scheduler.production.min.js
     *
     * Copyright (c) Facebook, Inc. and its affiliates.
     *
     * This source code is licensed under the MIT license found in the
     * LICENSE file in the root directory of this source tree.
     */ var r, a, o, i, l;
    if ("undefined" == typeof window || "function" != typeof MessageChannel) {
      var u = null,
        c = null,
        s = function () {
          if (null !== u)
            try {
              var e = t.unstable_now();
              u(!0, e), (u = null);
            } catch (e) {
              throw (setTimeout(s, 0), e);
            }
        },
        f = Date.now();
      (t.unstable_now = function () {
        return Date.now() - f;
      }),
        (r = function (e) {
          null !== u ? setTimeout(r, 0, e) : ((u = e), setTimeout(s, 0));
        }),
        (a = function (e, t) {
          c = setTimeout(e, t);
        }),
        (o = function () {
          clearTimeout(c);
        }),
        (i = function () {
          return !1;
        }),
        (l = t.unstable_forceFrameRate = function () {});
    } else {
      var d = window.performance,
        p = window.Date,
        m = window.setTimeout,
        h = window.clearTimeout;
      if ("undefined" != typeof console) {
        var y = window.cancelAnimationFrame;
        "function" != typeof window.requestAnimationFrame &&
          console.error(
            "This browser doesn't support requestAnimationFrame. Make sure that you load a polyfill in older browsers. https://fb.me/react-polyfills"
          ),
          "function" != typeof y &&
            console.error(
              "This browser doesn't support cancelAnimationFrame. Make sure that you load a polyfill in older browsers. https://fb.me/react-polyfills"
            );
      }
      if ("object" == typeof d && "function" == typeof d.now)
        t.unstable_now = function () {
          return d.now();
        };
      else {
        var g = p.now();
        t.unstable_now = function () {
          return p.now() - g;
        };
      }
      var v = !1,
        b = null,
        w = -1,
        E = 5,
        x = 0;
      (i = function () {
        return t.unstable_now() >= x;
      }),
        (l = function () {}),
        (t.unstable_forceFrameRate = function (e) {
          0 > e || 125 < e
            ? console.error(
                "forceFrameRate takes a positive int between 0 and 125, forcing framerates higher than 125 fps is not unsupported"
              )
            : (E = 0 < e ? Math.floor(1e3 / e) : 5);
        });
      var _ = new MessageChannel(),
        S = _.port2;
      (_.port1.onmessage = function () {
        if (null !== b) {
          var e = t.unstable_now();
          x = e + E;
          try {
            b(!0, e) ? S.postMessage(null) : ((v = !1), (b = null));
          } catch (e) {
            throw (S.postMessage(null), e);
          }
        } else v = !1;
      }),
        (r = function (e) {
          (b = e), v || ((v = !0), S.postMessage(null));
        }),
        (a = function (e, n) {
          w = m(function () {
            e(t.unstable_now());
          }, n);
        }),
        (o = function () {
          h(w), (w = -1);
        });
    }
    function k(e, t) {
      var n = e.length;
      e.push(t);
      e: for (;;) {
        var r = (n - 1) >>> 1,
          a = e[r];
        if (!(void 0 !== a && 0 < O(a, t))) break e;
        (e[r] = t), (e[n] = a), (n = r);
      }
    }
    function T(e) {
      return void 0 === (e = e[0]) ? null : e;
    }
    function C(e) {
      var t = e[0];
      if (void 0 !== t) {
        var n = e.pop();
        if (n !== t) {
          e[0] = n;
          e: for (var r = 0, a = e.length; r < a; ) {
            var o = 2 * (r + 1) - 1,
              i = e[o],
              l = o + 1,
              u = e[l];
            if (void 0 !== i && 0 > O(i, n))
              void 0 !== u && 0 > O(u, i)
                ? ((e[r] = u), (e[l] = n), (r = l))
                : ((e[r] = i), (e[o] = n), (r = o));
            else {
              if (!(void 0 !== u && 0 > O(u, n))) break e;
              (e[r] = u), (e[l] = n), (r = l);
            }
          }
        }
        return t;
      }
      return null;
    }
    function O(e, t) {
      var n = e.sortIndex - t.sortIndex;
      return 0 !== n ? n : e.id - t.id;
    }
    var P = [],
      N = [],
      j = 1,
      M = null,
      D = 3,
      R = !1,
      A = !1,
      I = !1;
    function U(e) {
      for (var t = T(N); null !== t; ) {
        if (null === t.callback) C(N);
        else {
          if (!(t.startTime <= e)) break;
          C(N), (t.sortIndex = t.expirationTime), k(P, t);
        }
        t = T(N);
      }
    }
    function L(e) {
      if (((I = !1), U(e), !A))
        if (null !== T(P)) (A = !0), r(z);
        else {
          var t = T(N);
          null !== t && a(L, t.startTime - e);
        }
    }
    function z(e, n) {
      (A = !1), I && ((I = !1), o()), (R = !0);
      var r = D;
      try {
        for (
          U(n), M = T(P);
          null !== M && (!(M.expirationTime > n) || (e && !i()));

        ) {
          var l = M.callback;
          if (null !== l) {
            (M.callback = null), (D = M.priorityLevel);
            var u = l(M.expirationTime <= n);
            (n = t.unstable_now()),
              "function" == typeof u ? (M.callback = u) : M === T(P) && C(P),
              U(n);
          } else C(P);
          M = T(P);
        }
        if (null !== M) var c = !0;
        else {
          var s = T(N);
          null !== s && a(L, s.startTime - n), (c = !1);
        }
        return c;
      } finally {
        (M = null), (D = r), (R = !1);
      }
    }
    function F(e) {
      switch (e) {
        case 1:
          return -1;
        case 2:
          return 250;
        case 5:
          return 1073741823;
        case 4:
          return 1e4;
        default:
          return 5e3;
      }
    }
    var W = l;
    (t.unstable_IdlePriority = 5),
      (t.unstable_ImmediatePriority = 1),
      (t.unstable_LowPriority = 4),
      (t.unstable_NormalPriority = 3),
      (t.unstable_Profiling = null),
      (t.unstable_UserBlockingPriority = 2),
      (t.unstable_cancelCallback = function (e) {
        e.callback = null;
      }),
      (t.unstable_continueExecution = function () {
        A || R || ((A = !0), r(z));
      }),
      (t.unstable_getCurrentPriorityLevel = function () {
        return D;
      }),
      (t.unstable_getFirstCallbackNode = function () {
        return T(P);
      }),
      (t.unstable_next = function (e) {
        switch (D) {
          case 1:
          case 2:
          case 3:
            var t = 3;
            break;
          default:
            t = D;
        }
        var n = D;
        D = t;
        try {
          return e();
        } finally {
          D = n;
        }
      }),
      (t.unstable_pauseExecution = function () {}),
      (t.unstable_requestPaint = W),
      (t.unstable_runWithPriority = function (e, t) {
        switch (e) {
          case 1:
          case 2:
          case 3:
          case 4:
          case 5:
            break;
          default:
            e = 3;
        }
        var n = D;
        D = e;
        try {
          return t();
        } finally {
          D = n;
        }
      }),
      (t.unstable_scheduleCallback = function (e, n, i) {
        var l = t.unstable_now();
        if ("object" == typeof i && null !== i) {
          var u = i.delay;
          (u = "number" == typeof u && 0 < u ? l + u : l),
            (i = "number" == typeof i.timeout ? i.timeout : F(e));
        } else (i = F(e)), (u = l);
        return (
          (e = {
            id: j++,
            callback: n,
            priorityLevel: e,
            startTime: u,
            expirationTime: (i = u + i),
            sortIndex: -1,
          }),
          u > l
            ? ((e.sortIndex = u),
              k(N, e),
              null === T(P) && e === T(N) && (I ? o() : (I = !0), a(L, u - l)))
            : ((e.sortIndex = i), k(P, e), A || R || ((A = !0), r(z))),
          e
        );
      }),
      (t.unstable_shouldYield = function () {
        var e = t.unstable_now();
        U(e);
        var n = T(P);
        return (
          (n !== M &&
            null !== M &&
            null !== n &&
            null !== n.callback &&
            n.startTime <= e &&
            n.expirationTime < M.expirationTime) ||
          i()
        );
      }),
      (t.unstable_wrapCallback = function (e) {
        var t = D;
        return function () {
          var n = D;
          D = t;
          try {
            return e.apply(this, arguments);
          } finally {
            D = n;
          }
        };
      });
  },
  function (e, t, n) {
    "use strict";
    var r = n(31);
    function a() {}
    function o() {}
    (o.resetWarningCache = a),
      (e.exports = function () {
        function e(e, t, n, a, o, i) {
          if (i !== r) {
            var l = new Error(
              "Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types"
            );
            throw ((l.name = "Invariant Violation"), l);
          }
        }
        function t() {
          return e;
        }
        e.isRequired = e;
        var n = {
          array: e,
          bool: e,
          func: e,
          number: e,
          object: e,
          string: e,
          symbol: e,
          any: e,
          arrayOf: t,
          element: e,
          elementType: e,
          instanceOf: t,
          node: e,
          objectOf: t,
          oneOf: t,
          oneOfType: t,
          shape: t,
          exact: t,
          checkPropTypes: o,
          resetWarningCache: a,
        };
        return (n.PropTypes = n), n;
      });
  },
  function (e, t, n) {
    "use strict";
    e.exports = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
  },
  function (e, t, n) {
    "use strict";
    /** @license React v16.13.1
     * react-is.production.min.js
     *
     * Copyright (c) Facebook, Inc. and its affiliates.
     *
     * This source code is licensed under the MIT license found in the
     * LICENSE file in the root directory of this source tree.
     */ var r = "function" == typeof Symbol && Symbol.for,
      a = r ? Symbol.for("react.element") : 60103,
      o = r ? Symbol.for("react.portal") : 60106,
      i = r ? Symbol.for("react.fragment") : 60107,
      l = r ? Symbol.for("react.strict_mode") : 60108,
      u = r ? Symbol.for("react.profiler") : 60114,
      c = r ? Symbol.for("react.provider") : 60109,
      s = r ? Symbol.for("react.context") : 60110,
      f = r ? Symbol.for("react.async_mode") : 60111,
      d = r ? Symbol.for("react.concurrent_mode") : 60111,
      p = r ? Symbol.for("react.forward_ref") : 60112,
      m = r ? Symbol.for("react.suspense") : 60113,
      h = r ? Symbol.for("react.suspense_list") : 60120,
      y = r ? Symbol.for("react.memo") : 60115,
      g = r ? Symbol.for("react.lazy") : 60116,
      v = r ? Symbol.for("react.block") : 60121,
      b = r ? Symbol.for("react.fundamental") : 60117,
      w = r ? Symbol.for("react.responder") : 60118,
      E = r ? Symbol.for("react.scope") : 60119;
    function x(e) {
      if ("object" == typeof e && null !== e) {
        var t = e.$$typeof;
        switch (t) {
          case a:
            switch ((e = e.type)) {
              case f:
              case d:
              case i:
              case u:
              case l:
              case m:
                return e;
              default:
                switch ((e = e && e.$$typeof)) {
                  case s:
                  case p:
                  case g:
                  case y:
                  case c:
                    return e;
                  default:
                    return t;
                }
            }
          case o:
            return t;
        }
      }
    }
    function _(e) {
      return x(e) === d;
    }
    (t.AsyncMode = f),
      (t.ConcurrentMode = d),
      (t.ContextConsumer = s),
      (t.ContextProvider = c),
      (t.Element = a),
      (t.ForwardRef = p),
      (t.Fragment = i),
      (t.Lazy = g),
      (t.Memo = y),
      (t.Portal = o),
      (t.Profiler = u),
      (t.StrictMode = l),
      (t.Suspense = m),
      (t.isAsyncMode = function (e) {
        return _(e) || x(e) === f;
      }),
      (t.isConcurrentMode = _),
      (t.isContextConsumer = function (e) {
        return x(e) === s;
      }),
      (t.isContextProvider = function (e) {
        return x(e) === c;
      }),
      (t.isElement = function (e) {
        return "object" == typeof e && null !== e && e.$$typeof === a;
      }),
      (t.isForwardRef = function (e) {
        return x(e) === p;
      }),
      (t.isFragment = function (e) {
        return x(e) === i;
      }),
      (t.isLazy = function (e) {
        return x(e) === g;
      }),
      (t.isMemo = function (e) {
        return x(e) === y;
      }),
      (t.isPortal = function (e) {
        return x(e) === o;
      }),
      (t.isProfiler = function (e) {
        return x(e) === u;
      }),
      (t.isStrictMode = function (e) {
        return x(e) === l;
      }),
      (t.isSuspense = function (e) {
        return x(e) === m;
      }),
      (t.isValidElementType = function (e) {
        return (
          "string" == typeof e ||
          "function" == typeof e ||
          e === i ||
          e === d ||
          e === u ||
          e === l ||
          e === m ||
          e === h ||
          ("object" == typeof e &&
            null !== e &&
            (e.$$typeof === g ||
              e.$$typeof === y ||
              e.$$typeof === c ||
              e.$$typeof === s ||
              e.$$typeof === p ||
              e.$$typeof === b ||
              e.$$typeof === w ||
              e.$$typeof === E ||
              e.$$typeof === v))
        );
      }),
      (t.typeOf = x);
  },
  function (e, t) {
    e.exports = function (e) {
      if (!e.webpackPolyfill) {
        var t = Object.create(e);
        t.children || (t.children = []),
          Object.defineProperty(t, "loaded", {
            enumerable: !0,
            get: function () {
              return t.l;
            },
          }),
          Object.defineProperty(t, "id", {
            enumerable: !0,
            get: function () {
              return t.i;
            },
          }),
          Object.defineProperty(t, "exports", { enumerable: !0 }),
          (t.webpackPolyfill = 1);
      }
      return t;
    };
  },
  function (e, t, n) {
    "use strict";
    var r = n(2),
      a = n(15),
      o = n(35),
      i = n(21);
    function l(e) {
      var t = new o(e),
        n = a(o.prototype.request, t);
      return r.extend(n, o.prototype, t), r.extend(n, t), n;
    }
    var u = l(n(18));
    (u.Axios = o),
      (u.create = function (e) {
        return l(i(u.defaults, e));
      }),
      (u.Cancel = n(22)),
      (u.CancelToken = n(49)),
      (u.isCancel = n(17)),
      (u.all = function (e) {
        return Promise.all(e);
      }),
      (u.spread = n(50)),
      (e.exports = u),
      (e.exports.default = u);
  },
  function (e, t, n) {
    "use strict";
    var r = n(2),
      a = n(16),
      o = n(36),
      i = n(37),
      l = n(21);
    function u(e) {
      (this.defaults = e),
        (this.interceptors = { request: new o(), response: new o() });
    }
    (u.prototype.request = function (e) {
      "string" == typeof e
        ? ((e = arguments[1] || {}).url = arguments[0])
        : (e = e || {}),
        (e = l(this.defaults, e)).method
          ? (e.method = e.method.toLowerCase())
          : this.defaults.method
          ? (e.method = this.defaults.method.toLowerCase())
          : (e.method = "get");
      var t = [i, void 0],
        n = Promise.resolve(e);
      for (
        this.interceptors.request.forEach(function (e) {
          t.unshift(e.fulfilled, e.rejected);
        }),
          this.interceptors.response.forEach(function (e) {
            t.push(e.fulfilled, e.rejected);
          });
        t.length;

      )
        n = n.then(t.shift(), t.shift());
      return n;
    }),
      (u.prototype.getUri = function (e) {
        return (
          (e = l(this.defaults, e)),
          a(e.url, e.params, e.paramsSerializer).replace(/^\?/, "")
        );
      }),
      r.forEach(["delete", "get", "head", "options"], function (e) {
        u.prototype[e] = function (t, n) {
          return this.request(r.merge(n || {}, { method: e, url: t }));
        };
      }),
      r.forEach(["post", "put", "patch"], function (e) {
        u.prototype[e] = function (t, n, a) {
          return this.request(r.merge(a || {}, { method: e, url: t, data: n }));
        };
      }),
      (e.exports = u);
  },
  function (e, t, n) {
    "use strict";
    var r = n(2);
    function a() {
      this.handlers = [];
    }
    (a.prototype.use = function (e, t) {
      return (
        this.handlers.push({ fulfilled: e, rejected: t }),
        this.handlers.length - 1
      );
    }),
      (a.prototype.eject = function (e) {
        this.handlers[e] && (this.handlers[e] = null);
      }),
      (a.prototype.forEach = function (e) {
        r.forEach(this.handlers, function (t) {
          null !== t && e(t);
        });
      }),
      (e.exports = a);
  },
  function (e, t, n) {
    "use strict";
    var r = n(2),
      a = n(38),
      o = n(17),
      i = n(18);
    function l(e) {
      e.cancelToken && e.cancelToken.throwIfRequested();
    }
    e.exports = function (e) {
      return (
        l(e),
        (e.headers = e.headers || {}),
        (e.data = a(e.data, e.headers, e.transformRequest)),
        (e.headers = r.merge(
          e.headers.common || {},
          e.headers[e.method] || {},
          e.headers
        )),
        r.forEach(
          ["delete", "get", "head", "post", "put", "patch", "common"],
          function (t) {
            delete e.headers[t];
          }
        ),
        (e.adapter || i.adapter)(e).then(
          function (t) {
            return (
              l(e), (t.data = a(t.data, t.headers, e.transformResponse)), t
            );
          },
          function (t) {
            return (
              o(t) ||
                (l(e),
                t &&
                  t.response &&
                  (t.response.data = a(
                    t.response.data,
                    t.response.headers,
                    e.transformResponse
                  ))),
              Promise.reject(t)
            );
          }
        )
      );
    };
  },
  function (e, t, n) {
    "use strict";
    var r = n(2);
    e.exports = function (e, t, n) {
      return (
        r.forEach(n, function (n) {
          e = n(e, t);
        }),
        e
      );
    };
  },
  function (e, t) {
    var n,
      r,
      a = (e.exports = {});
    function o() {
      throw new Error("setTimeout has not been defined");
    }
    function i() {
      throw new Error("clearTimeout has not been defined");
    }
    function l(e) {
      if (n === setTimeout) return setTimeout(e, 0);
      if ((n === o || !n) && setTimeout)
        return (n = setTimeout), setTimeout(e, 0);
      try {
        return n(e, 0);
      } catch (t) {
        try {
          return n.call(null, e, 0);
        } catch (t) {
          return n.call(this, e, 0);
        }
      }
    }
    !(function () {
      try {
        n = "function" == typeof setTimeout ? setTimeout : o;
      } catch (e) {
        n = o;
      }
      try {
        r = "function" == typeof clearTimeout ? clearTimeout : i;
      } catch (e) {
        r = i;
      }
    })();
    var u,
      c = [],
      s = !1,
      f = -1;
    function d() {
      s &&
        u &&
        ((s = !1), u.length ? (c = u.concat(c)) : (f = -1), c.length && p());
    }
    function p() {
      if (!s) {
        var e = l(d);
        s = !0;
        for (var t = c.length; t; ) {
          for (u = c, c = []; ++f < t; ) u && u[f].run();
          (f = -1), (t = c.length);
        }
        (u = null),
          (s = !1),
          (function (e) {
            if (r === clearTimeout) return clearTimeout(e);
            if ((r === i || !r) && clearTimeout)
              return (r = clearTimeout), clearTimeout(e);
            try {
              r(e);
            } catch (t) {
              try {
                return r.call(null, e);
              } catch (t) {
                return r.call(this, e);
              }
            }
          })(e);
      }
    }
    function m(e, t) {
      (this.fun = e), (this.array = t);
    }
    function h() {}
    (a.nextTick = function (e) {
      var t = new Array(arguments.length - 1);
      if (arguments.length > 1)
        for (var n = 1; n < arguments.length; n++) t[n - 1] = arguments[n];
      c.push(new m(e, t)), 1 !== c.length || s || l(p);
    }),
      (m.prototype.run = function () {
        this.fun.apply(null, this.array);
      }),
      (a.title = "browser"),
      (a.browser = !0),
      (a.env = {}),
      (a.argv = []),
      (a.version = ""),
      (a.versions = {}),
      (a.on = h),
      (a.addListener = h),
      (a.once = h),
      (a.off = h),
      (a.removeListener = h),
      (a.removeAllListeners = h),
      (a.emit = h),
      (a.prependListener = h),
      (a.prependOnceListener = h),
      (a.listeners = function (e) {
        return [];
      }),
      (a.binding = function (e) {
        throw new Error("process.binding is not supported");
      }),
      (a.cwd = function () {
        return "/";
      }),
      (a.chdir = function (e) {
        throw new Error("process.chdir is not supported");
      }),
      (a.umask = function () {
        return 0;
      });
  },
  function (e, t, n) {
    "use strict";
    var r = n(2);
    e.exports = function (e, t) {
      r.forEach(e, function (n, r) {
        r !== t &&
          r.toUpperCase() === t.toUpperCase() &&
          ((e[t] = n), delete e[r]);
      });
    };
  },
  function (e, t, n) {
    "use strict";
    var r = n(20);
    e.exports = function (e, t, n) {
      var a = n.config.validateStatus;
      !a || a(n.status)
        ? e(n)
        : t(
            r(
              "Request failed with status code " + n.status,
              n.config,
              null,
              n.request,
              n
            )
          );
    };
  },
  function (e, t, n) {
    "use strict";
    e.exports = function (e, t, n, r, a) {
      return (
        (e.config = t),
        n && (e.code = n),
        (e.request = r),
        (e.response = a),
        (e.isAxiosError = !0),
        (e.toJSON = function () {
          return {
            message: this.message,
            name: this.name,
            description: this.description,
            number: this.number,
            fileName: this.fileName,
            lineNumber: this.lineNumber,
            columnNumber: this.columnNumber,
            stack: this.stack,
            config: this.config,
            code: this.code,
          };
        }),
        e
      );
    };
  },
  function (e, t, n) {
    "use strict";
    var r = n(44),
      a = n(45);
    e.exports = function (e, t) {
      return e && !r(t) ? a(e, t) : t;
    };
  },
  function (e, t, n) {
    "use strict";
    e.exports = function (e) {
      return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(e);
    };
  },
  function (e, t, n) {
    "use strict";
    e.exports = function (e, t) {
      return t ? e.replace(/\/+$/, "") + "/" + t.replace(/^\/+/, "") : e;
    };
  },
  function (e, t, n) {
    "use strict";
    var r = n(2),
      a = [
        "age",
        "authorization",
        "content-length",
        "content-type",
        "etag",
        "expires",
        "from",
        "host",
        "if-modified-since",
        "if-unmodified-since",
        "last-modified",
        "location",
        "max-forwards",
        "proxy-authorization",
        "referer",
        "retry-after",
        "user-agent",
      ];
    e.exports = function (e) {
      var t,
        n,
        o,
        i = {};
      return e
        ? (r.forEach(e.split("\n"), function (e) {
            if (
              ((o = e.indexOf(":")),
              (t = r.trim(e.substr(0, o)).toLowerCase()),
              (n = r.trim(e.substr(o + 1))),
              t)
            ) {
              if (i[t] && a.indexOf(t) >= 0) return;
              i[t] =
                "set-cookie" === t
                  ? (i[t] ? i[t] : []).concat([n])
                  : i[t]
                  ? i[t] + ", " + n
                  : n;
            }
          }),
          i)
        : i;
    };
  },
  function (e, t, n) {
    "use strict";
    var r = n(2);
    e.exports = r.isStandardBrowserEnv()
      ? (function () {
          var e,
            t = /(msie|trident)/i.test(navigator.userAgent),
            n = document.createElement("a");
          function a(e) {
            var r = e;
            return (
              t && (n.setAttribute("href", r), (r = n.href)),
              n.setAttribute("href", r),
              {
                href: n.href,
                protocol: n.protocol ? n.protocol.replace(/:$/, "") : "",
                host: n.host,
                search: n.search ? n.search.replace(/^\?/, "") : "",
                hash: n.hash ? n.hash.replace(/^#/, "") : "",
                hostname: n.hostname,
                port: n.port,
                pathname:
                  "/" === n.pathname.charAt(0) ? n.pathname : "/" + n.pathname,
              }
            );
          }
          return (
            (e = a(window.location.href)),
            function (t) {
              var n = r.isString(t) ? a(t) : t;
              return n.protocol === e.protocol && n.host === e.host;
            }
          );
        })()
      : function () {
          return !0;
        };
  },
  function (e, t, n) {
    "use strict";
    var r = n(2);
    e.exports = r.isStandardBrowserEnv()
      ? {
          write: function (e, t, n, a, o, i) {
            var l = [];
            l.push(e + "=" + encodeURIComponent(t)),
              r.isNumber(n) && l.push("expires=" + new Date(n).toGMTString()),
              r.isString(a) && l.push("path=" + a),
              r.isString(o) && l.push("domain=" + o),
              !0 === i && l.push("secure"),
              (document.cookie = l.join("; "));
          },
          read: function (e) {
            var t = document.cookie.match(
              new RegExp("(^|;\\s*)(" + e + ")=([^;]*)")
            );
            return t ? decodeURIComponent(t[3]) : null;
          },
          remove: function (e) {
            this.write(e, "", Date.now() - 864e5);
          },
        }
      : {
          write: function () {},
          read: function () {
            return null;
          },
          remove: function () {},
        };
  },
  function (e, t, n) {
    "use strict";
    var r = n(22);
    function a(e) {
      if ("function" != typeof e)
        throw new TypeError("executor must be a function.");
      var t;
      this.promise = new Promise(function (e) {
        t = e;
      });
      var n = this;
      e(function (e) {
        n.reason || ((n.reason = new r(e)), t(n.reason));
      });
    }
    (a.prototype.throwIfRequested = function () {
      if (this.reason) throw this.reason;
    }),
      (a.source = function () {
        var e;
        return {
          token: new a(function (t) {
            e = t;
          }),
          cancel: e,
        };
      }),
      (e.exports = a);
  },
  function (e, t, n) {
    "use strict";
    e.exports = function (e) {
      return function (t) {
        return e.apply(null, t);
      };
    };
  },
  function (e, t) {
    e.exports =
      Array.isArray ||
      function (e) {
        return "[object Array]" == Object.prototype.toString.call(e);
      };
  },
  function (e, t, n) {
    var r = n(53),
      a = n(54);
    "string" == typeof (a = a.__esModule ? a.default : a) &&
      (a = [[e.i, a, ""]]);
    var o = { insert: "head", singleton: !1 },
      i = (r(a, o), a.locals ? a.locals : {});
    e.exports = i;
  },
  function (e, t, n) {
    "use strict";
    var r,
      a = function () {
        return (
          void 0 === r &&
            (r = Boolean(window && document && document.all && !window.atob)),
          r
        );
      },
      o = (function () {
        var e = {};
        return function (t) {
          if (void 0 === e[t]) {
            var n = document.querySelector(t);
            if (
              window.HTMLIFrameElement &&
              n instanceof window.HTMLIFrameElement
            )
              try {
                n = n.contentDocument.head;
              } catch (e) {
                n = null;
              }
            e[t] = n;
          }
          return e[t];
        };
      })(),
      i = [];
    function l(e) {
      for (var t = -1, n = 0; n < i.length; n++)
        if (i[n].identifier === e) {
          t = n;
          break;
        }
      return t;
    }
    function u(e, t) {
      for (var n = {}, r = [], a = 0; a < e.length; a++) {
        var o = e[a],
          u = t.base ? o[0] + t.base : o[0],
          c = n[u] || 0,
          s = "".concat(u, " ").concat(c);
        n[u] = c + 1;
        var f = l(s),
          d = { css: o[1], media: o[2], sourceMap: o[3] };
        -1 !== f
          ? (i[f].references++, i[f].updater(d))
          : i.push({ identifier: s, updater: y(d, t), references: 1 }),
          r.push(s);
      }
      return r;
    }
    function c(e) {
      var t = document.createElement("style"),
        r = e.attributes || {};
      if (void 0 === r.nonce) {
        var a = n.nc;
        a && (r.nonce = a);
      }
      if (
        (Object.keys(r).forEach(function (e) {
          t.setAttribute(e, r[e]);
        }),
        "function" == typeof e.insert)
      )
        e.insert(t);
      else {
        var i = o(e.insert || "head");
        if (!i)
          throw new Error(
            "Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid."
          );
        i.appendChild(t);
      }
      return t;
    }
    var s,
      f =
        ((s = []),
        function (e, t) {
          return (s[e] = t), s.filter(Boolean).join("\n");
        });
    function d(e, t, n, r) {
      var a = n
        ? ""
        : r.media
        ? "@media ".concat(r.media, " {").concat(r.css, "}")
        : r.css;
      if (e.styleSheet) e.styleSheet.cssText = f(t, a);
      else {
        var o = document.createTextNode(a),
          i = e.childNodes;
        i[t] && e.removeChild(i[t]),
          i.length ? e.insertBefore(o, i[t]) : e.appendChild(o);
      }
    }
    function p(e, t, n) {
      var r = n.css,
        a = n.media,
        o = n.sourceMap;
      if (
        (a ? e.setAttribute("media", a) : e.removeAttribute("media"),
        o &&
          btoa &&
          (r += "\n/*# sourceMappingURL=data:application/json;base64,".concat(
            btoa(unescape(encodeURIComponent(JSON.stringify(o)))),
            " */"
          )),
        e.styleSheet)
      )
        e.styleSheet.cssText = r;
      else {
        for (; e.firstChild; ) e.removeChild(e.firstChild);
        e.appendChild(document.createTextNode(r));
      }
    }
    var m = null,
      h = 0;
    function y(e, t) {
      var n, r, a;
      if (t.singleton) {
        var o = h++;
        (n = m || (m = c(t))),
          (r = d.bind(null, n, o, !1)),
          (a = d.bind(null, n, o, !0));
      } else
        (n = c(t)),
          (r = p.bind(null, n, t)),
          (a = function () {
            !(function (e) {
              if (null === e.parentNode) return !1;
              e.parentNode.removeChild(e);
            })(n);
          });
      return (
        r(e),
        function (t) {
          if (t) {
            if (
              t.css === e.css &&
              t.media === e.media &&
              t.sourceMap === e.sourceMap
            )
              return;
            r((e = t));
          } else a();
        }
      );
    }
    e.exports = function (e, t) {
      (t = t || {}).singleton ||
        "boolean" == typeof t.singleton ||
        (t.singleton = a());
      var n = u((e = e || []), t);
      return function (e) {
        if (
          ((e = e || []),
          "[object Array]" === Object.prototype.toString.call(e))
        ) {
          for (var r = 0; r < n.length; r++) {
            var a = l(n[r]);
            i[a].references--;
          }
          for (var o = u(e, t), c = 0; c < n.length; c++) {
            var s = l(n[c]);
            0 === i[s].references && (i[s].updater(), i.splice(s, 1));
          }
          n = o;
        }
      };
    };
  },
  function (e, t, n) {
    (t = n(55)(!1)).push([
      e.i,
      "@import url(https://fonts.googleapis.com/css?family=Poppins:100,300,400,700&display=swap);",
    ]),
      t.push([
        e.i,
        '.login {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  position: absolute;\n  z-index: -1;\n  background-color: #f9f9f9;\n  top: 80px;\n  left: 0;\n  right: 0;\n  bottom: 0; }\n  .login::after {\n    content: "";\n    width: 100px;\n    height: 100px;\n    display: block;\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 90%;\n    background-image: linear-gradient(-90deg, #ec70c9, #f3a5a5);\n    transform: skewY(-20deg);\n    transform-origin: top left;\n    z-index: -1; }\n\n.login__box {\n  width: 60%;\n  height: 80%;\n  background-color: white;\n  box-shadow: 0px 8px 6px 0px rgba(0, 0, 0, 0.25);\n  display: flex; }\n\n.login__right {\n  width: 50%;\n  background-image: linear-gradient(to left, rgba(0, 0, 0, 0.52), rgba(255, 255, 255, 0.73)), url("/static/media/typing.jpeg");\n  background-size: cover;\n  background-position: center center;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  font-size: 84px;\n  color: white; }\n\n.login__left {\n  width: 50%;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  flex-direction: column; }\n  .login__left form {\n    width: 60%; }\n  .login__left .form-group {\n    margin-bottom: 30px; }\n  .login__left span {\n    display: block;\n    background-color: #f4f4f4;\n    padding: 10px 20px;\n    border-radius: 15px;\n    margin-right: 20px;\n    margin-top: 10px;\n    transition: 0.3s ease all;\n    cursor: pointer; }\n    .login__left span.active {\n      background-color: #ec70c9;\n      color: white; }\n  .login__left .form-selector {\n    display: flex; }\n\n.login__leftExtra {\n  text-align: center; }\n  .login__leftExtra a {\n    margin-left: 10px;\n    text-decoration: underline; }\n\n.enterid {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  position: absolute;\n  z-index: -1;\n  background-color: #f9f9f9;\n  top: 80px;\n  left: 0;\n  right: 0;\n  bottom: 0; }\n  .enterid::after {\n    content: "";\n    width: 100px;\n    height: 100px;\n    display: block;\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 90%;\n    background-image: linear-gradient(-90deg, #ec70c9, #f3a5a5);\n    transform: skewY(20deg);\n    transform-origin: top right;\n    z-index: -1; }\n  .enterid__box {\n    width: 50%;\n    height: 60%;\n    background-color: white;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    flex-direction: column; }\n  .enterid form {\n    width: 60%; }\n  .enterid .btn-2 {\n    margin: 0;\n    margin-top: 30px; }\n  .enterid h1 {\n    width: 60%;\n    margin-bottom: 30px; }\n\n.input-1 {\n  display: block;\n  width: 100%;\n  border: none;\n  background-color: #f9f9f9;\n  height: 50px;\n  margin-top: 10px;\n  padding: 0 20px; }\n\n.btn-2 {\n  display: block;\n  border: none;\n  background: linear-gradient(90deg, #f3a5a5, #ec70c9);\n  color: white;\n  width: 150px;\n  border-radius: 25px;\n  height: 50px;\n  font-size: 20px;\n  margin: 0 auto;\n  box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.25);\n  cursor: pointer;\n  transition: 0.3s ease all; }\n  .btn-2:hover {\n    transform: scale(1.05); }\n* {\n  box-sizing: border-box;\n  padding: 0;\n  margin: 0; }\n\nbody {\n  font-family: "Poppins", sans-serif;\n  background-color: #f4f4f4; }\n\n.btn-1 {\n  border: none;\n  background-color: #3e3e3e;\n  color: white;\n  padding: 5px;\n  border-radius: 5px;\n  cursor: pointer;\n  transition: 0.2s ease all; }\n  .btn-1:focus {\n    outline: none; }\n  .btn-1:hover {\n    background-color: #5a5a5a; }\n\n.title {\n  font-size: 36px;\n  line-height: 30px; }\n\n.subtitle {\n  font-size: 24px; }\n\n.modal {\n  position: fixed;\n  background-color: rgba(0, 0, 0, 0.6);\n  left: 0;\n  top: 0;\n  width: 100%;\n  height: 100%;\n  z-index: 100; }\n  .modal__container {\n    position: fixed;\n    left: 50%;\n    top: 50%;\n    width: 600px;\n    transform: translate(-50%, -50%);\n    background-color: white;\n    z-index: 9999;\n    -webkit-box-shadow: 0px 7px 12px -1px rgba(0, 0, 0, 0.75);\n    -moz-box-shadow: 0px 7px 12px -1px rgba(0, 0, 0, 0.75);\n    box-shadow: 0px 7px 12px -1px rgba(0, 0, 0, 0.75); }\n  .modal__message {\n    padding: 20px 40px; }\n  .modal__buttonsContainer {\n    padding: 20px 40px;\n    background-color: #f3f3f3;\n    border-top: #a1a1a1 solid 1px; }\n  .modal__buttons {\n    width: 100%;\n    display: flex;\n    justify-content: flex-end; }\n    .modal__buttons button {\n      border: none;\n      cursor: pointer;\n      color: white;\n      padding: 10px 15px; }\n  .modal__buttonCancel {\n    background-color: #c26666; }\n  .modal__buttonConfirm {\n    background-color: #66b866; }\n  .modal__button {\n    cursor: pointer;\n    color: white;\n    border: none;\n    margin-left: 20px; }\n\n.error {\n  font-size: 12px;\n  color: red; }\n\n.delete_icon i {\n  color: black;\n  font-size: 20px;\n  transition: 0.2s ease all;\n  cursor: pointer; }\n  .delete_icon i:hover {\n    color: #e63434; }\n\nnav {\n  background-color: #222735;\n  color: white;\n  height: 80px;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  position: relative;\n  text-transform: uppercase; }\n\nnav h1 {\n  font-size: 28px;\n  font-weight: 700;\n  margin: 0; }\n\nnav ul {\n  list-style: none;\n  display: flex;\n  justify-content: space-between;\n  position: absolute;\n  left: 5%;\n  top: 50%;\n  transform: translateY(-50%);\n  text-decoration: none;\n  align-items: center;\n  width: 90%; }\n\nnav li {\n  margin: 0 40px;\n  font-size: 18px;\n  transition: 0.2s ease all;\n  cursor: pointer; }\n  nav li:hover {\n    color: #f39bda; }\n  nav li.nav__logout {\n    margin: 0; }\n\n.nav__welcome {\n  display: flex;\n  flex-direction: column;\n  margin: 0 40px;\n  align-items: flex-end; }\n  .nav__welcome span {\n    font-size: 12px; }\n\n.nav__lisection {\n  display: flex; }\n\na {\n  text-decoration: none;\n  color: inherit; }\n\n@media only screen and (max-width: 1000px) {\n  nav ul {\n    display: none; } }\n\n.shiftDetail {\n  width: 85%;\n  margin: 0 auto;\n  margin-top: 30px; }\n  .shiftDetail .subtitle {\n    margin-bottom: 10px; }\n  .shiftDetail__time {\n    font-size: 24px; }\n  .shiftDetail__timeContainer {\n    margin: 40px 0; }\n  .shiftDetail__shift {\n    height: 150px;\n    display: flex;\n    flex-direction: column;\n    background-color: #dedede;\n    width: 20%;\n    justify-content: center;\n    margin-right: 20px;\n    margin-top: 20px; }\n  .shiftDetail__employee {\n    font-size: 20px; }\n  .shiftDetail__shiftTime {\n    flex: 1;\n    display: flex;\n    justify-content: center;\n    background-color: #8ee997;\n    flex-direction: column; }\n    .shiftDetail__shiftTime h2 {\n      margin-left: 20px;\n      font-size: 20px; }\n    .shiftDetail__shiftTime p {\n      font-size: 16px;\n      margin-left: 20px; }\n  .shiftDetail__container {\n    display: flex; }\n  .shiftDetail__topContainer {\n    display: flex;\n    justify-content: space-between;\n    margin: 0 20px;\n    padding: 10px 0; }\n  .shiftDetail .btn-1 {\n    padding: 7px 15px;\n    margin-right: 10px;\n    transition: 0.2s ease all; }\n    .shiftDetail .btn-1.active {\n      background-color: #dfa75e; }\n\n* {\n  margin: 0; }\n\n.dates {\n  background-color: #202020;\n  color: white;\n  padding: 30px 0;\n  position: relative; }\n  .dates__picker {\n    display: flex;\n    justify-content: center; }\n  .dates__pickerWrapper {\n    display: flex;\n    width: auto;\n    text-align: center;\n    justify-content: space-between;\n    width: 40%; }\n    .dates__pickerWrapper i {\n      cursor: pointer;\n      transition: 0.2s all ease;\n      font-size: 40px;\n      align-self: center; }\n      .dates__pickerWrapper i:hover {\n        color: #ffb85c; }\n  .dates__pickerDate {\n    width: 40%;\n    background-color: #444444;\n    padding: 5px 0;\n    border-radius: 10px;\n    align-self: center;\n    font-size: 20px; }\n  .dates__container {\n    display: flex; }\n  .dates__namesection {\n    width: 20%; }\n  .dates__wrapper {\n    display: flex;\n    justify-content: space-around;\n    width: 75%;\n    padding-top: 20px; }\n  .dates__date {\n    text-align: center;\n    width: 100px; }\n    .dates__date h1 {\n      font-size: 14px; }\n    .dates__date .btn-1 {\n      display: block;\n      margin-top: 10px; }\n\n.employee__container {\n  width: 20%; }\n\n.employee__wrapper {\n  background-color: #dedede;\n  width: 80%;\n  display: flex;\n  flex-direction: column;\n  margin: 0 auto;\n  margin-top: 5px;\n  padding: 0 20px;\n  height: 120px;\n  justify-content: center; }\n  .employee__wrapper.active {\n    background-color: #ffd0f2; }\n\n.employee__name {\n  font-size: 16px;\n  margin: 0; }\n\n.employee__position {\n  margin: 0;\n  font-size: 12px;\n  color: #818181; }\n\n.employee__hours {\n  margin: 0;\n  font-size: 12px; }\n\n.employee__surname {\n  font-weight: bold; }\n\n.create__employee__button {\n  border: none;\n  display: block;\n  margin: 0 auto;\n  background-color: #3e3e3e;\n  color: white;\n  margin-top: 5px;\n  width: 60%;\n  padding: 5px 10px;\n  border-radius: 5px; }\n\n.rota__container {\n  display: flex;\n  margin-top: 10px; }\n\n.shift__container {\n  display: flex;\n  width: 75%; }\n\n.shift__wrapper {\n  display: flex;\n  justify-content: space-around;\n  width: 100%; }\n\n.shift__shift {\n  background-color: #ffd0f2;\n  border-radius: 10px;\n  margin: 3px;\n  flex: 1;\n  display: flex;\n  font-weight: bold;\n  flex-direction: column;\n  height: 120px;\n  padding: 5px 0;\n  overflow: auto; }\n\n.shift__shift p {\n  margin: 0;\n  align-self: flex-start;\n  margin-left: 15px;\n  font-size: 18px; }\n\n.shift__shift p:nth-of-type(even) {\n  font-weight: normal;\n  font-size: 14px; }\n\n.shift__shift-noshift {\n  background: #e0e0e0; }\n\n.shiftsloading {\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  display: flex;\n  justify-content: center;\n  align-items: center; }\n\n.loader {\n  border: 16px solid #2a2a2a;\n  border-radius: 50%;\n  border-top: 16px solid #ec70c9;\n  width: 120px;\n  height: 120px;\n  -webkit-animation: spin 0.3s linear infinite;\n  /* Safari */\n  animation: spin 0.3s linear infinite; }\n\n@-webkit-keyframes spin {\n  0% {\n    -webkit-transform: rotate(0deg); }\n  100% {\n    -webkit-transform: rotate(360deg); } }\n\n@keyframes spin {\n  0% {\n    transform: rotate(0deg); }\n  100% {\n    transform: rotate(360deg); } }\n\n@media only screen and (max-width: 1000px) {\n  .employee__container {\n    width: 35%; }\n  .shift__container {\n    width: 60%; }\n  .dates__wrapper {\n    width: 60%; }\n  .dates__namesection {\n    width: 35%; }\n  .dates__pickerWrapper {\n    width: 80%; }\n  .shift__shift:not(:first-child):not(:nth-child(2)):not(:nth-child(3)) {\n    display: none; }\n  .dates__wrapper .dates__date:not(:first-child):not(:nth-child(2)):not(:nth-child(3)) {\n    display: none; } }\n\n.userShift__container {\n  margin-top: 30px;\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(320px, max-content));\n  grid-gap: 10px;\n  justify-content: center; }\n\n.userShift__wrapper {\n  background-color: #ececec;\n  padding: 30px 0;\n  width: 320px;\n  text-align: center; }\n\n.userShift__noshift {\n  background-color: #f2f2f2;\n  color: #cbcbcb; }\n\n.userShift__time {\n  font-weight: bold; }\n\n.yourRota {\n  width: 85%;\n  margin: 0 auto;\n  margin-top: 30px; }\n  .yourRota__select {\n    border: none;\n    background-color: #e9e9e9;\n    margin-top: 30px;\n    width: 200px;\n    padding: 10px 10px; }\n\n@media only screen and (max-width: 600px) {\n  .shift__container {\n    width: 45%; }\n  .dates {\n    position: fixed;\n    right: 0;\n    width: 100%;\n    bottom: 0;\n    background-color: rgba(32, 32, 32, 0.7); }\n    .dates__wrapper {\n      width: 45%; }\n    .dates__namesection {\n      width: 50%; }\n    .dates__pickerWrapper {\n      width: 90%; }\n    .dates__pickerDate {\n      font-size: 16px; }\n    .dates__container {\n      display: none; }\n  .employee__container {\n    width: 50%; }\n  .employee__name {\n    font-size: 14px; }\n  .employee__wrapper {\n    height: 80px; }\n  .shift__shift p {\n    font-size: 16px; }\n  .shift__shift {\n    height: 80px; }\n  .shift__shift:not(:first-child) {\n    display: none; }\n  .dates__wrapper .dates__date:not(:first-child) {\n    display: none; }\n  .userShift__container {\n    display: flex;\n    flex-direction: column; }\n  .userShift__wrapper {\n    width: 100%;\n    border-top: 2px #e4e4e4 solid;\n    padding: 15px 0; }\n  .yourRota {\n    width: 100%;\n    text-align: center; } }\n\n.staff {\n  width: 85%;\n  margin: 0 auto;\n  margin-top: 30px; }\n  .staff__title {\n    font-size: 36px; }\n  .staff__buttons {\n    display: flex;\n    margin-top: 20px; }\n  .staff .btn-1 {\n    padding: 7px 15px;\n    margin-right: 10px;\n    transition: 0.2s ease all; }\n    .staff .btn-1.active {\n      background-color: #dfa75e; }\n  .staff__employees {\n    display: flex;\n    flex-wrap: wrap; }\n  .staff__employeeContainer {\n    background-color: #dedede;\n    width: 250px;\n    margin-right: 50px;\n    margin-top: 10px;\n    padding: 10px 20px; }\n  .staff__employee {\n    transition: 0.2s ease all;\n    display: flex;\n    justify-content: space-between;\n    align-items: center; }\n  .staff__position {\n    margin-top: 20px; }\n\n.staffForm {\n  margin-top: 20px; }\n  .staffForm__form {\n    display: flex;\n    position: relative; }\n  .staffForm__input {\n    display: block;\n    width: 200px;\n    border: none;\n    background-color: #e9e9e9;\n    padding: 15px 20px;\n    margin-right: 20px; }\n  .staffForm__label {\n    display: block; }\n  .staffForm .btn-1 {\n    padding: 15px 30px;\n    align-self: flex-end;\n    border-radius: 10px;\n    background-color: #76c26a;\n    font-size: 16px;\n    transition: 0.2s ease all; }\n    .staffForm .btn-1:hover {\n      background-color: #67ad5d; }\n',
        "",
      ]),
      (e.exports = t);
  },
  function (e, t, n) {
    "use strict";
    e.exports = function (e) {
      var t = [];
      return (
        (t.toString = function () {
          return this.map(function (t) {
            var n = (function (e, t) {
              var n = e[1] || "",
                r = e[3];
              if (!r) return n;
              if (t && "function" == typeof btoa) {
                var a =
                    ((i = r),
                    (l = btoa(unescape(encodeURIComponent(JSON.stringify(i))))),
                    (u = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(
                      l
                    )),
                    "/*# ".concat(u, " */")),
                  o = r.sources.map(function (e) {
                    return "/*# sourceURL="
                      .concat(r.sourceRoot || "")
                      .concat(e, " */");
                  });
                return [n].concat(o).concat([a]).join("\n");
              }
              var i, l, u;
              return [n].join("\n");
            })(t, e);
            return t[2] ? "@media ".concat(t[2], " {").concat(n, "}") : n;
          }).join("");
        }),
        (t.i = function (e, n, r) {
          "string" == typeof e && (e = [[null, e, ""]]);
          var a = {};
          if (r)
            for (var o = 0; o < this.length; o++) {
              var i = this[o][0];
              null != i && (a[i] = !0);
            }
          for (var l = 0; l < e.length; l++) {
            var u = [].concat(e[l]);
            (r && a[u[0]]) ||
              (n &&
                (u[2]
                  ? (u[2] = "".concat(n, " and ").concat(u[2]))
                  : (u[2] = n)),
              t.push(u));
          }
        }),
        t
      );
    };
  },
  function (e, t, n) {
    "use strict";
    n.r(t);
    var r = n(0),
      a = n.n(r),
      o = n(7),
      i = n.n(o);
    function l(e, t) {
      (e.prototype = Object.create(t.prototype)),
        (e.prototype.constructor = e),
        (e.__proto__ = t);
    }
    var u = n(4),
      c = n.n(u);
    function s() {
      return (s =
        Object.assign ||
        function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n)
              Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
          }
          return e;
        }).apply(this, arguments);
    }
    function f(e) {
      return "/" === e.charAt(0);
    }
    function d(e, t) {
      for (var n = t, r = n + 1, a = e.length; r < a; n += 1, r += 1)
        e[n] = e[r];
      e.pop();
    }
    var p = function (e, t) {
      void 0 === t && (t = "");
      var n,
        r = (e && e.split("/")) || [],
        a = (t && t.split("/")) || [],
        o = e && f(e),
        i = t && f(t),
        l = o || i;
      if (
        (e && f(e) ? (a = r) : r.length && (a.pop(), (a = a.concat(r))),
        !a.length)
      )
        return "/";
      if (a.length) {
        var u = a[a.length - 1];
        n = "." === u || ".." === u || "" === u;
      } else n = !1;
      for (var c = 0, s = a.length; s >= 0; s--) {
        var p = a[s];
        "." === p ? d(a, s) : ".." === p ? (d(a, s), c++) : c && (d(a, s), c--);
      }
      if (!l) for (; c--; c) a.unshift("..");
      !l || "" === a[0] || (a[0] && f(a[0])) || a.unshift("");
      var m = a.join("/");
      return n && "/" !== m.substr(-1) && (m += "/"), m;
    };
    function m(e) {
      return e.valueOf ? e.valueOf() : Object.prototype.valueOf.call(e);
    }
    var h = function e(t, n) {
      if (t === n) return !0;
      if (null == t || null == n) return !1;
      if (Array.isArray(t))
        return (
          Array.isArray(n) &&
          t.length === n.length &&
          t.every(function (t, r) {
            return e(t, n[r]);
          })
        );
      if ("object" == typeof t || "object" == typeof n) {
        var r = m(t),
          a = m(n);
        return r !== t || a !== n
          ? e(r, a)
          : Object.keys(Object.assign({}, t, n)).every(function (r) {
              return e(t[r], n[r]);
            });
      }
      return !1;
    };
    var y = function (e, t) {
      if (!e) throw new Error("Invariant failed");
    };
    function g(e) {
      return "/" === e.charAt(0) ? e : "/" + e;
    }
    function v(e) {
      return "/" === e.charAt(0) ? e.substr(1) : e;
    }
    function b(e, t) {
      return (function (e, t) {
        return (
          0 === e.toLowerCase().indexOf(t.toLowerCase()) &&
          -1 !== "/?#".indexOf(e.charAt(t.length))
        );
      })(e, t)
        ? e.substr(t.length)
        : e;
    }
    function w(e) {
      return "/" === e.charAt(e.length - 1) ? e.slice(0, -1) : e;
    }
    function E(e) {
      var t = e.pathname,
        n = e.search,
        r = e.hash,
        a = t || "/";
      return (
        n && "?" !== n && (a += "?" === n.charAt(0) ? n : "?" + n),
        r && "#" !== r && (a += "#" === r.charAt(0) ? r : "#" + r),
        a
      );
    }
    function x(e, t, n, r) {
      var a;
      "string" == typeof e
        ? ((a = (function (e) {
            var t = e || "/",
              n = "",
              r = "",
              a = t.indexOf("#");
            -1 !== a && ((r = t.substr(a)), (t = t.substr(0, a)));
            var o = t.indexOf("?");
            return (
              -1 !== o && ((n = t.substr(o)), (t = t.substr(0, o))),
              {
                pathname: t,
                search: "?" === n ? "" : n,
                hash: "#" === r ? "" : r,
              }
            );
          })(e)).state = t)
        : (void 0 === (a = s({}, e)).pathname && (a.pathname = ""),
          a.search
            ? "?" !== a.search.charAt(0) && (a.search = "?" + a.search)
            : (a.search = ""),
          a.hash
            ? "#" !== a.hash.charAt(0) && (a.hash = "#" + a.hash)
            : (a.hash = ""),
          void 0 !== t && void 0 === a.state && (a.state = t));
      try {
        a.pathname = decodeURI(a.pathname);
      } catch (e) {
        throw e instanceof URIError
          ? new URIError(
              'Pathname "' +
                a.pathname +
                '" could not be decoded. This is likely caused by an invalid percent-encoding.'
            )
          : e;
      }
      return (
        n && (a.key = n),
        r
          ? a.pathname
            ? "/" !== a.pathname.charAt(0) &&
              (a.pathname = p(a.pathname, r.pathname))
            : (a.pathname = r.pathname)
          : a.pathname || (a.pathname = "/"),
        a
      );
    }
    function _() {
      var e = null;
      var t = [];
      return {
        setPrompt: function (t) {
          return (
            (e = t),
            function () {
              e === t && (e = null);
            }
          );
        },
        confirmTransitionTo: function (t, n, r, a) {
          if (null != e) {
            var o = "function" == typeof e ? e(t, n) : e;
            "string" == typeof o
              ? "function" == typeof r
                ? r(o, a)
                : a(!0)
              : a(!1 !== o);
          } else a(!0);
        },
        appendListener: function (e) {
          var n = !0;
          function r() {
            n && e.apply(void 0, arguments);
          }
          return (
            t.push(r),
            function () {
              (n = !1),
                (t = t.filter(function (e) {
                  return e !== r;
                }));
            }
          );
        },
        notifyListeners: function () {
          for (var e = arguments.length, n = new Array(e), r = 0; r < e; r++)
            n[r] = arguments[r];
          t.forEach(function (e) {
            return e.apply(void 0, n);
          });
        },
      };
    }
    var S = !(
      "undefined" == typeof window ||
      !window.document ||
      !window.document.createElement
    );
    function k(e, t) {
      t(window.confirm(e));
    }
    function T() {
      try {
        return window.history.state || {};
      } catch (e) {
        return {};
      }
    }
    function C(e) {
      void 0 === e && (e = {}), S || y(!1);
      var t,
        n = window.history,
        r =
          ((-1 === (t = window.navigator.userAgent).indexOf("Android 2.") &&
            -1 === t.indexOf("Android 4.0")) ||
            -1 === t.indexOf("Mobile Safari") ||
            -1 !== t.indexOf("Chrome") ||
            -1 !== t.indexOf("Windows Phone")) &&
          window.history &&
          "pushState" in window.history,
        a = !(-1 === window.navigator.userAgent.indexOf("Trident")),
        o = e,
        i = o.forceRefresh,
        l = void 0 !== i && i,
        u = o.getUserConfirmation,
        c = void 0 === u ? k : u,
        f = o.keyLength,
        d = void 0 === f ? 6 : f,
        p = e.basename ? w(g(e.basename)) : "";
      function m(e) {
        var t = e || {},
          n = t.key,
          r = t.state,
          a = window.location,
          o = a.pathname + a.search + a.hash;
        return p && (o = b(o, p)), x(o, r, n);
      }
      function h() {
        return Math.random().toString(36).substr(2, d);
      }
      var v = _();
      function C(e) {
        s(z, e), (z.length = n.length), v.notifyListeners(z.location, z.action);
      }
      function O(e) {
        (function (e) {
          return (
            void 0 === e.state && -1 === navigator.userAgent.indexOf("CriOS")
          );
        })(e) || j(m(e.state));
      }
      function P() {
        j(m(T()));
      }
      var N = !1;
      function j(e) {
        if (N) (N = !1), C();
        else {
          v.confirmTransitionTo(e, "POP", c, function (t) {
            t
              ? C({ action: "POP", location: e })
              : (function (e) {
                  var t = z.location,
                    n = D.indexOf(t.key);
                  -1 === n && (n = 0);
                  var r = D.indexOf(e.key);
                  -1 === r && (r = 0);
                  var a = n - r;
                  a && ((N = !0), A(a));
                })(e);
          });
        }
      }
      var M = m(T()),
        D = [M.key];
      function R(e) {
        return p + E(e);
      }
      function A(e) {
        n.go(e);
      }
      var I = 0;
      function U(e) {
        1 === (I += e) && 1 === e
          ? (window.addEventListener("popstate", O),
            a && window.addEventListener("hashchange", P))
          : 0 === I &&
            (window.removeEventListener("popstate", O),
            a && window.removeEventListener("hashchange", P));
      }
      var L = !1;
      var z = {
        length: n.length,
        action: "POP",
        location: M,
        createHref: R,
        push: function (e, t) {
          var a = x(e, t, h(), z.location);
          v.confirmTransitionTo(a, "PUSH", c, function (e) {
            if (e) {
              var t = R(a),
                o = a.key,
                i = a.state;
              if (r)
                if ((n.pushState({ key: o, state: i }, null, t), l))
                  window.location.href = t;
                else {
                  var u = D.indexOf(z.location.key),
                    c = D.slice(0, u + 1);
                  c.push(a.key), (D = c), C({ action: "PUSH", location: a });
                }
              else window.location.href = t;
            }
          });
        },
        replace: function (e, t) {
          var a = x(e, t, h(), z.location);
          v.confirmTransitionTo(a, "REPLACE", c, function (e) {
            if (e) {
              var t = R(a),
                o = a.key,
                i = a.state;
              if (r)
                if ((n.replaceState({ key: o, state: i }, null, t), l))
                  window.location.replace(t);
                else {
                  var u = D.indexOf(z.location.key);
                  -1 !== u && (D[u] = a.key),
                    C({ action: "REPLACE", location: a });
                }
              else window.location.replace(t);
            }
          });
        },
        go: A,
        goBack: function () {
          A(-1);
        },
        goForward: function () {
          A(1);
        },
        block: function (e) {
          void 0 === e && (e = !1);
          var t = v.setPrompt(e);
          return (
            L || (U(1), (L = !0)),
            function () {
              return L && ((L = !1), U(-1)), t();
            }
          );
        },
        listen: function (e) {
          var t = v.appendListener(e);
          return (
            U(1),
            function () {
              U(-1), t();
            }
          );
        },
      };
      return z;
    }
    var O = {
      hashbang: {
        encodePath: function (e) {
          return "!" === e.charAt(0) ? e : "!/" + v(e);
        },
        decodePath: function (e) {
          return "!" === e.charAt(0) ? e.substr(1) : e;
        },
      },
      noslash: { encodePath: v, decodePath: g },
      slash: { encodePath: g, decodePath: g },
    };
    function P(e) {
      var t = e.indexOf("#");
      return -1 === t ? e : e.slice(0, t);
    }
    function N() {
      var e = window.location.href,
        t = e.indexOf("#");
      return -1 === t ? "" : e.substring(t + 1);
    }
    function j(e) {
      window.location.replace(P(window.location.href) + "#" + e);
    }
    function M(e) {
      void 0 === e && (e = {}), S || y(!1);
      var t = window.history,
        n = (window.navigator.userAgent.indexOf("Firefox"), e),
        r = n.getUserConfirmation,
        a = void 0 === r ? k : r,
        o = n.hashType,
        i = void 0 === o ? "slash" : o,
        l = e.basename ? w(g(e.basename)) : "",
        u = O[i],
        c = u.encodePath,
        f = u.decodePath;
      function d() {
        var e = f(N());
        return l && (e = b(e, l)), x(e);
      }
      var p = _();
      function m(e) {
        s(z, e), (z.length = t.length), p.notifyListeners(z.location, z.action);
      }
      var h = !1,
        v = null;
      function T() {
        var e,
          t,
          n = N(),
          r = c(n);
        if (n !== r) j(r);
        else {
          var o = d(),
            i = z.location;
          if (
            !h &&
            ((t = o),
            (e = i).pathname === t.pathname &&
              e.search === t.search &&
              e.hash === t.hash)
          )
            return;
          if (v === E(o)) return;
          (v = null),
            (function (e) {
              if (h) (h = !1), m();
              else {
                p.confirmTransitionTo(e, "POP", a, function (t) {
                  t
                    ? m({ action: "POP", location: e })
                    : (function (e) {
                        var t = z.location,
                          n = R.lastIndexOf(E(t));
                        -1 === n && (n = 0);
                        var r = R.lastIndexOf(E(e));
                        -1 === r && (r = 0);
                        var a = n - r;
                        a && ((h = !0), A(a));
                      })(e);
                });
              }
            })(o);
        }
      }
      var C = N(),
        M = c(C);
      C !== M && j(M);
      var D = d(),
        R = [E(D)];
      function A(e) {
        t.go(e);
      }
      var I = 0;
      function U(e) {
        1 === (I += e) && 1 === e
          ? window.addEventListener("hashchange", T)
          : 0 === I && window.removeEventListener("hashchange", T);
      }
      var L = !1;
      var z = {
        length: t.length,
        action: "POP",
        location: D,
        createHref: function (e) {
          var t = document.querySelector("base"),
            n = "";
          return (
            t && t.getAttribute("href") && (n = P(window.location.href)),
            n + "#" + c(l + E(e))
          );
        },
        push: function (e, t) {
          var n = x(e, void 0, void 0, z.location);
          p.confirmTransitionTo(n, "PUSH", a, function (e) {
            if (e) {
              var t = E(n),
                r = c(l + t);
              if (N() !== r) {
                (v = t),
                  (function (e) {
                    window.location.hash = e;
                  })(r);
                var a = R.lastIndexOf(E(z.location)),
                  o = R.slice(0, a + 1);
                o.push(t), (R = o), m({ action: "PUSH", location: n });
              } else m();
            }
          });
        },
        replace: function (e, t) {
          var n = x(e, void 0, void 0, z.location);
          p.confirmTransitionTo(n, "REPLACE", a, function (e) {
            if (e) {
              var t = E(n),
                r = c(l + t);
              N() !== r && ((v = t), j(r));
              var a = R.indexOf(E(z.location));
              -1 !== a && (R[a] = t), m({ action: "REPLACE", location: n });
            }
          });
        },
        go: A,
        goBack: function () {
          A(-1);
        },
        goForward: function () {
          A(1);
        },
        block: function (e) {
          void 0 === e && (e = !1);
          var t = p.setPrompt(e);
          return (
            L || (U(1), (L = !0)),
            function () {
              return L && ((L = !1), U(-1)), t();
            }
          );
        },
        listen: function (e) {
          var t = p.appendListener(e);
          return (
            U(1),
            function () {
              U(-1), t();
            }
          );
        },
      };
      return z;
    }
    function D(e, t, n) {
      return Math.min(Math.max(e, t), n);
    }
    function R(e) {
      void 0 === e && (e = {});
      var t = e,
        n = t.getUserConfirmation,
        r = t.initialEntries,
        a = void 0 === r ? ["/"] : r,
        o = t.initialIndex,
        i = void 0 === o ? 0 : o,
        l = t.keyLength,
        u = void 0 === l ? 6 : l,
        c = _();
      function f(e) {
        s(g, e),
          (g.length = g.entries.length),
          c.notifyListeners(g.location, g.action);
      }
      function d() {
        return Math.random().toString(36).substr(2, u);
      }
      var p = D(i, 0, a.length - 1),
        m = a.map(function (e) {
          return x(e, void 0, "string" == typeof e ? d() : e.key || d());
        }),
        h = E;
      function y(e) {
        var t = D(g.index + e, 0, g.entries.length - 1),
          r = g.entries[t];
        c.confirmTransitionTo(r, "POP", n, function (e) {
          e ? f({ action: "POP", location: r, index: t }) : f();
        });
      }
      var g = {
        length: m.length,
        action: "POP",
        location: m[p],
        index: p,
        entries: m,
        createHref: h,
        push: function (e, t) {
          var r = x(e, t, d(), g.location);
          c.confirmTransitionTo(r, "PUSH", n, function (e) {
            if (e) {
              var t = g.index + 1,
                n = g.entries.slice(0);
              n.length > t ? n.splice(t, n.length - t, r) : n.push(r),
                f({ action: "PUSH", location: r, index: t, entries: n });
            }
          });
        },
        replace: function (e, t) {
          var r = x(e, t, d(), g.location);
          c.confirmTransitionTo(r, "REPLACE", n, function (e) {
            e &&
              ((g.entries[g.index] = r), f({ action: "REPLACE", location: r }));
          });
        },
        go: y,
        goBack: function () {
          y(-1);
        },
        goForward: function () {
          y(1);
        },
        canGo: function (e) {
          var t = g.index + e;
          return t >= 0 && t < g.entries.length;
        },
        block: function (e) {
          return void 0 === e && (e = !1), c.setPrompt(e);
        },
        listen: function (e) {
          return c.appendListener(e);
        },
      };
      return g;
    }
    var A = n(11),
      I = n.n(A),
      U = n(24),
      L = n.n(U);
    function z(e) {
      var t = [];
      return {
        on: function (e) {
          t.push(e);
        },
        off: function (e) {
          t = t.filter(function (t) {
            return t !== e;
          });
        },
        get: function () {
          return e;
        },
        set: function (n, r) {
          (e = n),
            t.forEach(function (t) {
              return t(e, r);
            });
        },
      };
    }
    var F =
        a.a.createContext ||
        function (e, t) {
          var n,
            a,
            o = "__create-react-context-" + L()() + "__",
            i = (function (e) {
              function n() {
                var t;
                return (
                  ((t = e.apply(this, arguments) || this).emitter = z(
                    t.props.value
                  )),
                  t
                );
              }
              I()(n, e);
              var r = n.prototype;
              return (
                (r.getChildContext = function () {
                  var e;
                  return ((e = {})[o] = this.emitter), e;
                }),
                (r.componentWillReceiveProps = function (e) {
                  if (this.props.value !== e.value) {
                    var n,
                      r = this.props.value,
                      a = e.value;
                    (
                      (o = r) === (i = a)
                        ? 0 !== o || 1 / o == 1 / i
                        : o != o && i != i
                    )
                      ? (n = 0)
                      : ((n = "function" == typeof t ? t(r, a) : 1073741823),
                        0 !== (n |= 0) && this.emitter.set(e.value, n));
                  }
                  var o, i;
                }),
                (r.render = function () {
                  return this.props.children;
                }),
                n
              );
            })(r.Component);
          i.childContextTypes = (((n = {})[o] = c.a.object.isRequired), n);
          var l = (function (t) {
            function n() {
              var e;
              return (
                ((e = t.apply(this, arguments) || this).state = {
                  value: e.getValue(),
                }),
                (e.onUpdate = function (t, n) {
                  0 != ((0 | e.observedBits) & n) &&
                    e.setState({ value: e.getValue() });
                }),
                e
              );
            }
            I()(n, t);
            var r = n.prototype;
            return (
              (r.componentWillReceiveProps = function (e) {
                var t = e.observedBits;
                this.observedBits = null == t ? 1073741823 : t;
              }),
              (r.componentDidMount = function () {
                this.context[o] && this.context[o].on(this.onUpdate);
                var e = this.props.observedBits;
                this.observedBits = null == e ? 1073741823 : e;
              }),
              (r.componentWillUnmount = function () {
                this.context[o] && this.context[o].off(this.onUpdate);
              }),
              (r.getValue = function () {
                return this.context[o] ? this.context[o].get() : e;
              }),
              (r.render = function () {
                return ((e = this.props.children), Array.isArray(e) ? e[0] : e)(
                  this.state.value
                );
                var e;
              }),
              n
            );
          })(r.Component);
          return (
            (l.contextTypes = (((a = {})[o] = c.a.object), a)),
            { Provider: i, Consumer: l }
          );
        },
      W = n(12),
      H = n.n(W);
    n(8);
    function Y(e, t) {
      if (null == e) return {};
      var n,
        r,
        a = {},
        o = Object.keys(e);
      for (r = 0; r < o.length; r++)
        (n = o[r]), t.indexOf(n) >= 0 || (a[n] = e[n]);
      return a;
    }
    n(6);
    var B = (function (e) {
        var t = F();
        return (t.displayName = e), t;
      })("Router"),
      $ = (function (e) {
        function t(t) {
          var n;
          return (
            ((n = e.call(this, t) || this).state = {
              location: t.history.location,
            }),
            (n._isMounted = !1),
            (n._pendingLocation = null),
            t.staticContext ||
              (n.unlisten = t.history.listen(function (e) {
                n._isMounted
                  ? n.setState({ location: e })
                  : (n._pendingLocation = e);
              })),
            n
          );
        }
        l(t, e),
          (t.computeRootMatch = function (e) {
            return { path: "/", url: "/", params: {}, isExact: "/" === e };
          });
        var n = t.prototype;
        return (
          (n.componentDidMount = function () {
            (this._isMounted = !0),
              this._pendingLocation &&
                this.setState({ location: this._pendingLocation });
          }),
          (n.componentWillUnmount = function () {
            this.unlisten && this.unlisten();
          }),
          (n.render = function () {
            return a.a.createElement(B.Provider, {
              children: this.props.children || null,
              value: {
                history: this.props.history,
                location: this.state.location,
                match: t.computeRootMatch(this.state.location.pathname),
                staticContext: this.props.staticContext,
              },
            });
          }),
          t
        );
      })(a.a.Component);
    a.a.Component;
    var q = (function (e) {
      function t() {
        return e.apply(this, arguments) || this;
      }
      l(t, e);
      var n = t.prototype;
      return (
        (n.componentDidMount = function () {
          this.props.onMount && this.props.onMount.call(this, this);
        }),
        (n.componentDidUpdate = function (e) {
          this.props.onUpdate && this.props.onUpdate.call(this, this, e);
        }),
        (n.componentWillUnmount = function () {
          this.props.onUnmount && this.props.onUnmount.call(this, this);
        }),
        (n.render = function () {
          return null;
        }),
        t
      );
    })(a.a.Component);
    var V = {},
      Q = 0;
    function G(e, t) {
      return (
        void 0 === e && (e = "/"),
        void 0 === t && (t = {}),
        "/" === e
          ? e
          : (function (e) {
              if (V[e]) return V[e];
              var t = H.a.compile(e);
              return Q < 1e4 && ((V[e] = t), Q++), t;
            })(e)(t, { pretty: !0 })
      );
    }
    function X(e) {
      var t = e.computedMatch,
        n = e.to,
        r = e.push,
        o = void 0 !== r && r;
      return a.a.createElement(B.Consumer, null, function (e) {
        e || y(!1);
        var r = e.history,
          i = e.staticContext,
          l = o ? r.push : r.replace,
          u = x(
            t
              ? "string" == typeof n
                ? G(n, t.params)
                : s({}, n, { pathname: G(n.pathname, t.params) })
              : n
          );
        return i
          ? (l(u), null)
          : a.a.createElement(q, {
              onMount: function () {
                l(u);
              },
              onUpdate: function (e, t) {
                var n,
                  r,
                  a = x(t.to);
                (n = a),
                  (r = s({}, u, { key: a.key })),
                  (n.pathname === r.pathname &&
                    n.search === r.search &&
                    n.hash === r.hash &&
                    n.key === r.key &&
                    h(n.state, r.state)) ||
                    l(u);
              },
              to: n,
            });
      });
    }
    var K = {},
      J = 0;
    function Z(e, t) {
      void 0 === t && (t = {}),
        ("string" == typeof t || Array.isArray(t)) && (t = { path: t });
      var n = t,
        r = n.path,
        a = n.exact,
        o = void 0 !== a && a,
        i = n.strict,
        l = void 0 !== i && i,
        u = n.sensitive,
        c = void 0 !== u && u;
      return [].concat(r).reduce(function (t, n) {
        if (!n && "" !== n) return null;
        if (t) return t;
        var r = (function (e, t) {
            var n = "" + t.end + t.strict + t.sensitive,
              r = K[n] || (K[n] = {});
            if (r[e]) return r[e];
            var a = [],
              o = { regexp: H()(e, a, t), keys: a };
            return J < 1e4 && ((r[e] = o), J++), o;
          })(n, { end: o, strict: l, sensitive: c }),
          a = r.regexp,
          i = r.keys,
          u = a.exec(e);
        if (!u) return null;
        var s = u[0],
          f = u.slice(1),
          d = e === s;
        return o && !d
          ? null
          : {
              path: n,
              url: "/" === n && "" === s ? "/" : s,
              isExact: d,
              params: i.reduce(function (e, t, n) {
                return (e[t.name] = f[n]), e;
              }, {}),
            };
      }, null);
    }
    var ee = (function (e) {
      function t() {
        return e.apply(this, arguments) || this;
      }
      return (
        l(t, e),
        (t.prototype.render = function () {
          var e = this;
          return a.a.createElement(B.Consumer, null, function (t) {
            t || y(!1);
            var n = e.props.location || t.location,
              r = s({}, t, {
                location: n,
                match: e.props.computedMatch
                  ? e.props.computedMatch
                  : e.props.path
                  ? Z(n.pathname, e.props)
                  : t.match,
              }),
              o = e.props,
              i = o.children,
              l = o.component,
              u = o.render;
            return (
              Array.isArray(i) && 0 === i.length && (i = null),
              a.a.createElement(
                B.Provider,
                { value: r },
                r.match
                  ? i
                    ? "function" == typeof i
                      ? i(r)
                      : i
                    : l
                    ? a.a.createElement(l, r)
                    : u
                    ? u(r)
                    : null
                  : "function" == typeof i
                  ? i(r)
                  : null
              )
            );
          });
        }),
        t
      );
    })(a.a.Component);
    function te(e) {
      return "/" === e.charAt(0) ? e : "/" + e;
    }
    function ne(e, t) {
      if (!e) return t;
      var n = te(e);
      return 0 !== t.pathname.indexOf(n)
        ? t
        : s({}, t, { pathname: t.pathname.substr(n.length) });
    }
    function re(e) {
      return "string" == typeof e ? e : E(e);
    }
    function ae(e) {
      return function () {
        y(!1);
      };
    }
    function oe() {}
    a.a.Component;
    var ie = (function (e) {
      function t() {
        return e.apply(this, arguments) || this;
      }
      return (
        l(t, e),
        (t.prototype.render = function () {
          var e = this;
          return a.a.createElement(B.Consumer, null, function (t) {
            t || y(!1);
            var n,
              r,
              o = e.props.location || t.location;
            return (
              a.a.Children.forEach(e.props.children, function (e) {
                if (null == r && a.a.isValidElement(e)) {
                  n = e;
                  var i = e.props.path || e.props.from;
                  r = i ? Z(o.pathname, s({}, e.props, { path: i })) : t.match;
                }
              }),
              r ? a.a.cloneElement(n, { location: o, computedMatch: r }) : null
            );
          });
        }),
        t
      );
    })(a.a.Component);
    var le = a.a.useContext;
    var ue = (function (e) {
      function t() {
        for (var t, n = arguments.length, r = new Array(n), a = 0; a < n; a++)
          r[a] = arguments[a];
        return (
          ((t = e.call.apply(e, [this].concat(r)) || this).history = C(
            t.props
          )),
          t
        );
      }
      return (
        l(t, e),
        (t.prototype.render = function () {
          return a.a.createElement($, {
            history: this.history,
            children: this.props.children,
          });
        }),
        t
      );
    })(a.a.Component);
    a.a.Component;
    var ce = function (e, t) {
        return "function" == typeof e ? e(t) : e;
      },
      se = function (e, t) {
        return "string" == typeof e ? x(e, null, null, t) : e;
      },
      fe = function (e) {
        return e;
      },
      de = a.a.forwardRef;
    void 0 === de && (de = fe);
    var pe = de(function (e, t) {
      var n = e.innerRef,
        r = e.navigate,
        o = e.onClick,
        i = Y(e, ["innerRef", "navigate", "onClick"]),
        l = i.target,
        u = s({}, i, {
          onClick: function (e) {
            try {
              o && o(e);
            } catch (t) {
              throw (e.preventDefault(), t);
            }
            e.defaultPrevented ||
              0 !== e.button ||
              (l && "_self" !== l) ||
              (function (e) {
                return !!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey);
              })(e) ||
              (e.preventDefault(), r());
          },
        });
      return (u.ref = (fe !== de && t) || n), a.a.createElement("a", u);
    });
    var me = de(function (e, t) {
        var n = e.component,
          r = void 0 === n ? pe : n,
          o = e.replace,
          i = e.to,
          l = e.innerRef,
          u = Y(e, ["component", "replace", "to", "innerRef"]);
        return a.a.createElement(B.Consumer, null, function (e) {
          e || y(!1);
          var n = e.history,
            c = se(ce(i, e.location), e.location),
            f = c ? n.createHref(c) : "",
            d = s({}, u, {
              href: f,
              navigate: function () {
                var t = ce(i, e.location);
                (o ? n.replace : n.push)(t);
              },
            });
          return (
            fe !== de ? (d.ref = t || l) : (d.innerRef = l),
            a.a.createElement(r, d)
          );
        });
      }),
      he = function (e) {
        return e;
      },
      ye = a.a.forwardRef;
    void 0 === ye && (ye = he);
    ye(function (e, t) {
      var n = e["aria-current"],
        r = void 0 === n ? "page" : n,
        o = e.activeClassName,
        i = void 0 === o ? "active" : o,
        l = e.activeStyle,
        u = e.className,
        c = e.exact,
        f = e.isActive,
        d = e.location,
        p = e.strict,
        m = e.style,
        h = e.to,
        g = e.innerRef,
        v = Y(e, [
          "aria-current",
          "activeClassName",
          "activeStyle",
          "className",
          "exact",
          "isActive",
          "location",
          "strict",
          "style",
          "to",
          "innerRef",
        ]);
      return a.a.createElement(B.Consumer, null, function (e) {
        e || y(!1);
        var n = d || e.location,
          o = se(ce(h, n), n),
          b = o.pathname,
          w = b && b.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1"),
          E = w ? Z(n.pathname, { path: w, exact: c, strict: p }) : null,
          x = !!(f ? f(E, n) : E),
          _ = x
            ? (function () {
                for (
                  var e = arguments.length, t = new Array(e), n = 0;
                  n < e;
                  n++
                )
                  t[n] = arguments[n];
                return t
                  .filter(function (e) {
                    return e;
                  })
                  .join(" ");
              })(u, i)
            : u,
          S = x ? s({}, m, {}, l) : m,
          k = s(
            { "aria-current": (x && r) || null, className: _, style: S, to: o },
            v
          );
        return (
          he !== ye ? (k.ref = t || g) : (k.innerRef = g),
          a.a.createElement(me, k)
        );
      });
    });
    var ge = a.a.createContext(null);
    var ve = function (e) {
        e();
      },
      be = { notify: function () {} };
    function we() {
      var e = ve,
        t = null,
        n = null;
      return {
        clear: function () {
          (t = null), (n = null);
        },
        notify: function () {
          e(function () {
            for (var e = t; e; ) e.callback(), (e = e.next);
          });
        },
        get: function () {
          for (var e = [], n = t; n; ) e.push(n), (n = n.next);
          return e;
        },
        subscribe: function (e) {
          var r = !0,
            a = (n = { callback: e, next: null, prev: n });
          return (
            a.prev ? (a.prev.next = a) : (t = a),
            function () {
              r &&
                null !== t &&
                ((r = !1),
                a.next ? (a.next.prev = a.prev) : (n = a.prev),
                a.prev ? (a.prev.next = a.next) : (t = a.next));
            }
          );
        },
      };
    }
    var Ee = (function () {
      function e(e, t) {
        (this.store = e),
          (this.parentSub = t),
          (this.unsubscribe = null),
          (this.listeners = be),
          (this.handleChangeWrapper = this.handleChangeWrapper.bind(this));
      }
      var t = e.prototype;
      return (
        (t.addNestedSub = function (e) {
          return this.trySubscribe(), this.listeners.subscribe(e);
        }),
        (t.notifyNestedSubs = function () {
          this.listeners.notify();
        }),
        (t.handleChangeWrapper = function () {
          this.onStateChange && this.onStateChange();
        }),
        (t.isSubscribed = function () {
          return Boolean(this.unsubscribe);
        }),
        (t.trySubscribe = function () {
          this.unsubscribe ||
            ((this.unsubscribe = this.parentSub
              ? this.parentSub.addNestedSub(this.handleChangeWrapper)
              : this.store.subscribe(this.handleChangeWrapper)),
            (this.listeners = we()));
        }),
        (t.tryUnsubscribe = function () {
          this.unsubscribe &&
            (this.unsubscribe(),
            (this.unsubscribe = null),
            this.listeners.clear(),
            (this.listeners = be));
        }),
        e
      );
    })();
    var xe = function (e) {
        var t = e.store,
          n = e.context,
          o = e.children,
          i = Object(r.useMemo)(
            function () {
              var e = new Ee(t);
              return (
                (e.onStateChange = e.notifyNestedSubs),
                { store: t, subscription: e }
              );
            },
            [t]
          ),
          l = Object(r.useMemo)(
            function () {
              return t.getState();
            },
            [t]
          );
        Object(r.useEffect)(
          function () {
            var e = i.subscription;
            return (
              e.trySubscribe(),
              l !== t.getState() && e.notifyNestedSubs(),
              function () {
                e.tryUnsubscribe(), (e.onStateChange = null);
              }
            );
          },
          [i, l]
        );
        var u = n || ge;
        return a.a.createElement(u.Provider, { value: i }, o);
      },
      _e =
        "undefined" != typeof window &&
        void 0 !== window.document &&
        void 0 !== window.document.createElement
          ? r.useLayoutEffect
          : r.useEffect;
    var Se = n(5);
    function ke() {
      return Object(r.useContext)(ge);
    }
    function Te(e) {
      void 0 === e && (e = ge);
      var t =
        e === ge
          ? ke
          : function () {
              return Object(r.useContext)(e);
            };
      return function () {
        return t().store;
      };
    }
    var Ce = Te();
    function Oe(e) {
      void 0 === e && (e = ge);
      var t = e === ge ? Ce : Te(e);
      return function () {
        return t().dispatch;
      };
    }
    var Pe = Oe(),
      Ne = function (e, t) {
        return e === t;
      };
    function je(e) {
      void 0 === e && (e = ge);
      var t =
        e === ge
          ? ke
          : function () {
              return Object(r.useContext)(e);
            };
      return function (e, n) {
        void 0 === n && (n = Ne);
        var a = t();
        return (function (e, t, n, a) {
          var o,
            i = Object(r.useReducer)(function (e) {
              return e + 1;
            }, 0)[1],
            l = Object(r.useMemo)(
              function () {
                return new Ee(n, a);
              },
              [n, a]
            ),
            u = Object(r.useRef)(),
            c = Object(r.useRef)(),
            s = Object(r.useRef)();
          try {
            o = e !== c.current || u.current ? e(n.getState()) : s.current;
          } catch (e) {
            throw (
              (u.current &&
                (e.message +=
                  "\nThe error may be correlated with this previous error:\n" +
                  u.current.stack +
                  "\n\n"),
              e)
            );
          }
          return (
            _e(function () {
              (c.current = e), (s.current = o), (u.current = void 0);
            }),
            _e(
              function () {
                function e() {
                  try {
                    var e = c.current(n.getState());
                    if (t(e, s.current)) return;
                    s.current = e;
                  } catch (e) {
                    u.current = e;
                  }
                  i({});
                }
                return (
                  (l.onStateChange = e),
                  l.trySubscribe(),
                  e(),
                  function () {
                    return l.tryUnsubscribe();
                  }
                );
              },
              [n, l]
            ),
            o
          );
        })(e, n, a.store, a.subscription);
      };
    }
    var Me,
      De = je();
    (Me = o.unstable_batchedUpdates), (ve = Me);
    var Re = n(1),
      Ae = n.n(Re),
      Ie = function (e, t) {
        return { type: "GET_ERRORS", payload: { msg: e, status: t } };
      },
      Ue = function (e) {
        var t = e().auth.token,
          n = { headers: { "Content-Type": "application/json" } };
        return t && (n.headers.Authorization = "Token ".concat(t)), n;
      },
      Le = function () {
        var e = De(function (e) {
            return e.auth.isAuthenticated;
          }),
          t = De(function (e) {
            return e.auth.user;
          }),
          n = Pe(),
          r = a.a.createElement(
            "div",
            { className: "nav__lisection" },
            t &&
              a.a.createElement(
                "div",
                { className: "nav__welcome" },
                a.a.createElement("span", null, "Welcome ", t.username, " "),
                a.a.createElement(
                  "li",
                  { className: "nav__logout" },
                  a.a.createElement(
                    "a",
                    {
                      onClick: function () {
                        n(function (e, t) {
                          Ae.a
                            .post("/api/auth/logout/", null, Ue(t))
                            .then(function (t) {
                              e({ type: "LOGOUT_SUCCESS", payload: t.data });
                            })
                            .catch(function (e) {
                              console.log(e.response);
                            });
                        });
                      },
                    },
                    "Logout"
                  )
                )
              )
          ),
          o = a.a.createElement(
            "div",
            { className: "nav__lisection" },
            a.a.createElement(
              "li",
              null,
              a.a.createElement(me, { to: "/register" }, "Register")
            ),
            a.a.createElement(
              "li",
              null,
              a.a.createElement(me, { to: "/login" }, "Login")
            )
          );
        return a.a.createElement(
          "nav",
          null,
          a.a.createElement(
            "div",
            null,
            a.a.createElement(
              "h1",
              null,
              a.a.createElement(
                "span",
                { style: { color: "#EC70C9" } },
                "Rota"
              ),
              "Ready"
            ),
            a.a.createElement(
              "ul",
              null,
              a.a.createElement(
                "div",
                { className: "nav__lisection" },
                a.a.createElement(
                  me,
                  { to: "/" },
                  a.a.createElement("li", null, "Home")
                ),
                a.a.createElement(
                  me,
                  { to: "/rota" },
                  a.a.createElement("li", null, "Rota")
                ),
                t &&
                  "Business" == t.profile.role &&
                  a.a.createElement(
                    me,
                    { to: "/staff" },
                    a.a.createElement("li", null, "Staff")
                  )
              ),
              e ? r : o
            )
          )
        );
      },
      ze = n(25);
    function Fe(e) {
      return function (t) {
        var n = t.dispatch,
          r = t.getState;
        return function (t) {
          return function (a) {
            return "function" == typeof a ? a(n, r, e) : t(a);
          };
        };
      };
    }
    var We = Fe();
    We.withExtraArgument = Fe;
    var He = We;
    function Ye(e, t) {
      if (t.length < e)
        throw new TypeError(
          e + " argument" + e > 1
            ? "s"
            : " required, but only " + t.length + " present"
        );
    }
    function Be(e) {
      Ye(1, arguments);
      var t = Object.prototype.toString.call(e);
      return e instanceof Date ||
        ("object" == typeof e && "[object Date]" === t)
        ? new Date(e.getTime())
        : "number" == typeof e || "[object Number]" === t
        ? new Date(e)
        : (("string" != typeof e && "[object String]" !== t) ||
            "undefined" == typeof console ||
            (console.warn(
              "Starting with v2.0.0-beta.1 date-fns doesn't accept strings as arguments. Please use `parseISO` to parse strings. See: https://git.io/fjule"
            ),
            console.warn(new Error().stack)),
          new Date(NaN));
    }
    function $e(e) {
      Ye(1, arguments);
      var t = Be(e);
      return !isNaN(t);
    }
    var qe = {
      lessThanXSeconds: {
        one: "less than a second",
        other: "less than {{count}} seconds",
      },
      xSeconds: { one: "1 second", other: "{{count}} seconds" },
      halfAMinute: "half a minute",
      lessThanXMinutes: {
        one: "less than a minute",
        other: "less than {{count}} minutes",
      },
      xMinutes: { one: "1 minute", other: "{{count}} minutes" },
      aboutXHours: { one: "about 1 hour", other: "about {{count}} hours" },
      xHours: { one: "1 hour", other: "{{count}} hours" },
      xDays: { one: "1 day", other: "{{count}} days" },
      aboutXMonths: { one: "about 1 month", other: "about {{count}} months" },
      xMonths: { one: "1 month", other: "{{count}} months" },
      aboutXYears: { one: "about 1 year", other: "about {{count}} years" },
      xYears: { one: "1 year", other: "{{count}} years" },
      overXYears: { one: "over 1 year", other: "over {{count}} years" },
      almostXYears: { one: "almost 1 year", other: "almost {{count}} years" },
    };
    function Ve(e) {
      return function (t) {
        var n = t || {},
          r = n.width ? String(n.width) : e.defaultWidth;
        return e.formats[r] || e.formats[e.defaultWidth];
      };
    }
    var Qe = {
        date: Ve({
          formats: {
            full: "EEEE, MMMM do, y",
            long: "MMMM do, y",
            medium: "MMM d, y",
            short: "MM/dd/yyyy",
          },
          defaultWidth: "full",
        }),
        time: Ve({
          formats: {
            full: "h:mm:ss a zzzz",
            long: "h:mm:ss a z",
            medium: "h:mm:ss a",
            short: "h:mm a",
          },
          defaultWidth: "full",
        }),
        dateTime: Ve({
          formats: {
            full: "{{date}} 'at' {{time}}",
            long: "{{date}} 'at' {{time}}",
            medium: "{{date}}, {{time}}",
            short: "{{date}}, {{time}}",
          },
          defaultWidth: "full",
        }),
      },
      Ge = {
        lastWeek: "'last' eeee 'at' p",
        yesterday: "'yesterday at' p",
        today: "'today at' p",
        tomorrow: "'tomorrow at' p",
        nextWeek: "eeee 'at' p",
        other: "P",
      };
    function Xe(e) {
      return function (t, n) {
        var r,
          a = n || {};
        if (
          "formatting" === (a.context ? String(a.context) : "standalone") &&
          e.formattingValues
        ) {
          var o = e.defaultFormattingWidth || e.defaultWidth,
            i = a.width ? String(a.width) : o;
          r = e.formattingValues[i] || e.formattingValues[o];
        } else {
          var l = e.defaultWidth,
            u = a.width ? String(a.width) : e.defaultWidth;
          r = e.values[u] || e.values[l];
        }
        return r[e.argumentCallback ? e.argumentCallback(t) : t];
      };
    }
    function Ke(e) {
      return function (t, n) {
        var r = String(t),
          a = n || {},
          o = a.width,
          i = (o && e.matchPatterns[o]) || e.matchPatterns[e.defaultMatchWidth],
          l = r.match(i);
        if (!l) return null;
        var u,
          c = l[0],
          s = (o && e.parsePatterns[o]) || e.parsePatterns[e.defaultParseWidth];
        return (
          (u =
            "[object Array]" === Object.prototype.toString.call(s)
              ? (function (e, t) {
                  for (var n = 0; n < e.length; n++) if (t(e[n])) return n;
                })(s, function (e) {
                  return e.test(r);
                })
              : (function (e, t) {
                  for (var n in e) if (e.hasOwnProperty(n) && t(e[n])) return n;
                })(s, function (e) {
                  return e.test(r);
                })),
          (u = e.valueCallback ? e.valueCallback(u) : u),
          {
            value: (u = a.valueCallback ? a.valueCallback(u) : u),
            rest: r.slice(c.length),
          }
        );
      };
    }
    var Je,
      Ze = {
        code: "en-US",
        formatDistance: function (e, t, n) {
          var r;
          return (
            (n = n || {}),
            (r =
              "string" == typeof qe[e]
                ? qe[e]
                : 1 === t
                ? qe[e].one
                : qe[e].other.replace("{{count}}", t)),
            n.addSuffix ? (n.comparison > 0 ? "in " + r : r + " ago") : r
          );
        },
        formatLong: Qe,
        formatRelative: function (e, t, n, r) {
          return Ge[e];
        },
        localize: {
          ordinalNumber: function (e, t) {
            var n = Number(e),
              r = n % 100;
            if (r > 20 || r < 10)
              switch (r % 10) {
                case 1:
                  return n + "st";
                case 2:
                  return n + "nd";
                case 3:
                  return n + "rd";
              }
            return n + "th";
          },
          era: Xe({
            values: {
              narrow: ["B", "A"],
              abbreviated: ["BC", "AD"],
              wide: ["Before Christ", "Anno Domini"],
            },
            defaultWidth: "wide",
          }),
          quarter: Xe({
            values: {
              narrow: ["1", "2", "3", "4"],
              abbreviated: ["Q1", "Q2", "Q3", "Q4"],
              wide: [
                "1st quarter",
                "2nd quarter",
                "3rd quarter",
                "4th quarter",
              ],
            },
            defaultWidth: "wide",
            argumentCallback: function (e) {
              return Number(e) - 1;
            },
          }),
          month: Xe({
            values: {
              narrow: [
                "J",
                "F",
                "M",
                "A",
                "M",
                "J",
                "J",
                "A",
                "S",
                "O",
                "N",
                "D",
              ],
              abbreviated: [
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sep",
                "Oct",
                "Nov",
                "Dec",
              ],
              wide: [
                "January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
                "August",
                "September",
                "October",
                "November",
                "December",
              ],
            },
            defaultWidth: "wide",
          }),
          day: Xe({
            values: {
              narrow: ["S", "M", "T", "W", "T", "F", "S"],
              short: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
              abbreviated: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
              wide: [
                "Sunday",
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
              ],
            },
            defaultWidth: "wide",
          }),
          dayPeriod: Xe({
            values: {
              narrow: {
                am: "a",
                pm: "p",
                midnight: "mi",
                noon: "n",
                morning: "morning",
                afternoon: "afternoon",
                evening: "evening",
                night: "night",
              },
              abbreviated: {
                am: "AM",
                pm: "PM",
                midnight: "midnight",
                noon: "noon",
                morning: "morning",
                afternoon: "afternoon",
                evening: "evening",
                night: "night",
              },
              wide: {
                am: "a.m.",
                pm: "p.m.",
                midnight: "midnight",
                noon: "noon",
                morning: "morning",
                afternoon: "afternoon",
                evening: "evening",
                night: "night",
              },
            },
            defaultWidth: "wide",
            formattingValues: {
              narrow: {
                am: "a",
                pm: "p",
                midnight: "mi",
                noon: "n",
                morning: "in the morning",
                afternoon: "in the afternoon",
                evening: "in the evening",
                night: "at night",
              },
              abbreviated: {
                am: "AM",
                pm: "PM",
                midnight: "midnight",
                noon: "noon",
                morning: "in the morning",
                afternoon: "in the afternoon",
                evening: "in the evening",
                night: "at night",
              },
              wide: {
                am: "a.m.",
                pm: "p.m.",
                midnight: "midnight",
                noon: "noon",
                morning: "in the morning",
                afternoon: "in the afternoon",
                evening: "in the evening",
                night: "at night",
              },
            },
            defaultFormattingWidth: "wide",
          }),
        },
        match: {
          ordinalNumber:
            ((Je = {
              matchPattern: /^(\d+)(th|st|nd|rd)?/i,
              parsePattern: /\d+/i,
              valueCallback: function (e) {
                return parseInt(e, 10);
              },
            }),
            function (e, t) {
              var n = String(e),
                r = t || {},
                a = n.match(Je.matchPattern);
              if (!a) return null;
              var o = a[0],
                i = n.match(Je.parsePattern);
              if (!i) return null;
              var l = Je.valueCallback ? Je.valueCallback(i[0]) : i[0];
              return {
                value: (l = r.valueCallback ? r.valueCallback(l) : l),
                rest: n.slice(o.length),
              };
            }),
          era: Ke({
            matchPatterns: {
              narrow: /^(b|a)/i,
              abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
              wide: /^(before christ|before common era|anno domini|common era)/i,
            },
            defaultMatchWidth: "wide",
            parsePatterns: { any: [/^b/i, /^(a|c)/i] },
            defaultParseWidth: "any",
          }),
          quarter: Ke({
            matchPatterns: {
              narrow: /^[1234]/i,
              abbreviated: /^q[1234]/i,
              wide: /^[1234](th|st|nd|rd)? quarter/i,
            },
            defaultMatchWidth: "wide",
            parsePatterns: { any: [/1/i, /2/i, /3/i, /4/i] },
            defaultParseWidth: "any",
            valueCallback: function (e) {
              return e + 1;
            },
          }),
          month: Ke({
            matchPatterns: {
              narrow: /^[jfmasond]/i,
              abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
              wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i,
            },
            defaultMatchWidth: "wide",
            parsePatterns: {
              narrow: [
                /^j/i,
                /^f/i,
                /^m/i,
                /^a/i,
                /^m/i,
                /^j/i,
                /^j/i,
                /^a/i,
                /^s/i,
                /^o/i,
                /^n/i,
                /^d/i,
              ],
              any: [
                /^ja/i,
                /^f/i,
                /^mar/i,
                /^ap/i,
                /^may/i,
                /^jun/i,
                /^jul/i,
                /^au/i,
                /^s/i,
                /^o/i,
                /^n/i,
                /^d/i,
              ],
            },
            defaultParseWidth: "any",
          }),
          day: Ke({
            matchPatterns: {
              narrow: /^[smtwf]/i,
              short: /^(su|mo|tu|we|th|fr|sa)/i,
              abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
              wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i,
            },
            defaultMatchWidth: "wide",
            parsePatterns: {
              narrow: [/^s/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i],
              any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i],
            },
            defaultParseWidth: "any",
          }),
          dayPeriod: Ke({
            matchPatterns: {
              narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
              any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i,
            },
            defaultMatchWidth: "any",
            parsePatterns: {
              any: {
                am: /^a/i,
                pm: /^p/i,
                midnight: /^mi/i,
                noon: /^no/i,
                morning: /morning/i,
                afternoon: /afternoon/i,
                evening: /evening/i,
                night: /night/i,
              },
            },
            defaultParseWidth: "any",
          }),
        },
        options: { weekStartsOn: 0, firstWeekContainsDate: 1 },
      };
    function et(e) {
      if (null === e || !0 === e || !1 === e) return NaN;
      var t = Number(e);
      return isNaN(t) ? t : t < 0 ? Math.ceil(t) : Math.floor(t);
    }
    function tt(e, t) {
      Ye(2, arguments);
      var n = Be(e).getTime(),
        r = et(t);
      return new Date(n + r);
    }
    function nt(e, t) {
      Ye(2, arguments);
      var n = et(t);
      return tt(e, -n);
    }
    function rt(e, t) {
      for (var n = e < 0 ? "-" : "", r = Math.abs(e).toString(); r.length < t; )
        r = "0" + r;
      return n + r;
    }
    var at = {
      y: function (e, t) {
        var n = e.getUTCFullYear(),
          r = n > 0 ? n : 1 - n;
        return rt("yy" === t ? r % 100 : r, t.length);
      },
      M: function (e, t) {
        var n = e.getUTCMonth();
        return "M" === t ? String(n + 1) : rt(n + 1, 2);
      },
      d: function (e, t) {
        return rt(e.getUTCDate(), t.length);
      },
      a: function (e, t) {
        var n = e.getUTCHours() / 12 >= 1 ? "pm" : "am";
        switch (t) {
          case "a":
          case "aa":
          case "aaa":
            return n.toUpperCase();
          case "aaaaa":
            return n[0];
          case "aaaa":
          default:
            return "am" === n ? "a.m." : "p.m.";
        }
      },
      h: function (e, t) {
        return rt(e.getUTCHours() % 12 || 12, t.length);
      },
      H: function (e, t) {
        return rt(e.getUTCHours(), t.length);
      },
      m: function (e, t) {
        return rt(e.getUTCMinutes(), t.length);
      },
      s: function (e, t) {
        return rt(e.getUTCSeconds(), t.length);
      },
      S: function (e, t) {
        var n = t.length,
          r = e.getUTCMilliseconds();
        return rt(Math.floor(r * Math.pow(10, n - 3)), t.length);
      },
    };
    function ot(e) {
      Ye(1, arguments);
      var t = 1,
        n = Be(e),
        r = n.getUTCDay(),
        a = (r < t ? 7 : 0) + r - t;
      return n.setUTCDate(n.getUTCDate() - a), n.setUTCHours(0, 0, 0, 0), n;
    }
    function it(e) {
      Ye(1, arguments);
      var t = Be(e),
        n = t.getUTCFullYear(),
        r = new Date(0);
      r.setUTCFullYear(n + 1, 0, 4), r.setUTCHours(0, 0, 0, 0);
      var a = ot(r),
        o = new Date(0);
      o.setUTCFullYear(n, 0, 4), o.setUTCHours(0, 0, 0, 0);
      var i = ot(o);
      return t.getTime() >= a.getTime()
        ? n + 1
        : t.getTime() >= i.getTime()
        ? n
        : n - 1;
    }
    function lt(e) {
      Ye(1, arguments);
      var t = it(e),
        n = new Date(0);
      n.setUTCFullYear(t, 0, 4), n.setUTCHours(0, 0, 0, 0);
      var r = ot(n);
      return r;
    }
    function ut(e, t) {
      Ye(1, arguments);
      var n = t || {},
        r = n.locale,
        a = r && r.options && r.options.weekStartsOn,
        o = null == a ? 0 : et(a),
        i = null == n.weekStartsOn ? o : et(n.weekStartsOn);
      if (!(i >= 0 && i <= 6))
        throw new RangeError(
          "weekStartsOn must be between 0 and 6 inclusively"
        );
      var l = Be(e),
        u = l.getUTCDay(),
        c = (u < i ? 7 : 0) + u - i;
      return l.setUTCDate(l.getUTCDate() - c), l.setUTCHours(0, 0, 0, 0), l;
    }
    function ct(e, t) {
      Ye(1, arguments);
      var n = Be(e, t),
        r = n.getUTCFullYear(),
        a = t || {},
        o = a.locale,
        i = o && o.options && o.options.firstWeekContainsDate,
        l = null == i ? 1 : et(i),
        u = null == a.firstWeekContainsDate ? l : et(a.firstWeekContainsDate);
      if (!(u >= 1 && u <= 7))
        throw new RangeError(
          "firstWeekContainsDate must be between 1 and 7 inclusively"
        );
      var c = new Date(0);
      c.setUTCFullYear(r + 1, 0, u), c.setUTCHours(0, 0, 0, 0);
      var s = ut(c, t),
        f = new Date(0);
      f.setUTCFullYear(r, 0, u), f.setUTCHours(0, 0, 0, 0);
      var d = ut(f, t);
      return n.getTime() >= s.getTime()
        ? r + 1
        : n.getTime() >= d.getTime()
        ? r
        : r - 1;
    }
    function st(e, t) {
      Ye(1, arguments);
      var n = t || {},
        r = n.locale,
        a = r && r.options && r.options.firstWeekContainsDate,
        o = null == a ? 1 : et(a),
        i = null == n.firstWeekContainsDate ? o : et(n.firstWeekContainsDate),
        l = ct(e, t),
        u = new Date(0);
      u.setUTCFullYear(l, 0, i), u.setUTCHours(0, 0, 0, 0);
      var c = ut(u, t);
      return c;
    }
    var ft = "midnight",
      dt = "noon",
      pt = "morning",
      mt = "afternoon",
      ht = "evening",
      yt = "night";
    function gt(e, t) {
      var n = e > 0 ? "-" : "+",
        r = Math.abs(e),
        a = Math.floor(r / 60),
        o = r % 60;
      if (0 === o) return n + String(a);
      var i = t || "";
      return n + String(a) + i + rt(o, 2);
    }
    function vt(e, t) {
      return e % 60 == 0
        ? (e > 0 ? "-" : "+") + rt(Math.abs(e) / 60, 2)
        : bt(e, t);
    }
    function bt(e, t) {
      var n = t || "",
        r = e > 0 ? "-" : "+",
        a = Math.abs(e);
      return r + rt(Math.floor(a / 60), 2) + n + rt(a % 60, 2);
    }
    var wt = {
      G: function (e, t, n) {
        var r = e.getUTCFullYear() > 0 ? 1 : 0;
        switch (t) {
          case "G":
          case "GG":
          case "GGG":
            return n.era(r, { width: "abbreviated" });
          case "GGGGG":
            return n.era(r, { width: "narrow" });
          case "GGGG":
          default:
            return n.era(r, { width: "wide" });
        }
      },
      y: function (e, t, n) {
        if ("yo" === t) {
          var r = e.getUTCFullYear(),
            a = r > 0 ? r : 1 - r;
          return n.ordinalNumber(a, { unit: "year" });
        }
        return at.y(e, t);
      },
      Y: function (e, t, n, r) {
        var a = ct(e, r),
          o = a > 0 ? a : 1 - a;
        return "YY" === t
          ? rt(o % 100, 2)
          : "Yo" === t
          ? n.ordinalNumber(o, { unit: "year" })
          : rt(o, t.length);
      },
      R: function (e, t) {
        return rt(it(e), t.length);
      },
      u: function (e, t) {
        return rt(e.getUTCFullYear(), t.length);
      },
      Q: function (e, t, n) {
        var r = Math.ceil((e.getUTCMonth() + 1) / 3);
        switch (t) {
          case "Q":
            return String(r);
          case "QQ":
            return rt(r, 2);
          case "Qo":
            return n.ordinalNumber(r, { unit: "quarter" });
          case "QQQ":
            return n.quarter(r, {
              width: "abbreviated",
              context: "formatting",
            });
          case "QQQQQ":
            return n.quarter(r, { width: "narrow", context: "formatting" });
          case "QQQQ":
          default:
            return n.quarter(r, { width: "wide", context: "formatting" });
        }
      },
      q: function (e, t, n) {
        var r = Math.ceil((e.getUTCMonth() + 1) / 3);
        switch (t) {
          case "q":
            return String(r);
          case "qq":
            return rt(r, 2);
          case "qo":
            return n.ordinalNumber(r, { unit: "quarter" });
          case "qqq":
            return n.quarter(r, {
              width: "abbreviated",
              context: "standalone",
            });
          case "qqqqq":
            return n.quarter(r, { width: "narrow", context: "standalone" });
          case "qqqq":
          default:
            return n.quarter(r, { width: "wide", context: "standalone" });
        }
      },
      M: function (e, t, n) {
        var r = e.getUTCMonth();
        switch (t) {
          case "M":
          case "MM":
            return at.M(e, t);
          case "Mo":
            return n.ordinalNumber(r + 1, { unit: "month" });
          case "MMM":
            return n.month(r, { width: "abbreviated", context: "formatting" });
          case "MMMMM":
            return n.month(r, { width: "narrow", context: "formatting" });
          case "MMMM":
          default:
            return n.month(r, { width: "wide", context: "formatting" });
        }
      },
      L: function (e, t, n) {
        var r = e.getUTCMonth();
        switch (t) {
          case "L":
            return String(r + 1);
          case "LL":
            return rt(r + 1, 2);
          case "Lo":
            return n.ordinalNumber(r + 1, { unit: "month" });
          case "LLL":
            return n.month(r, { width: "abbreviated", context: "standalone" });
          case "LLLLL":
            return n.month(r, { width: "narrow", context: "standalone" });
          case "LLLL":
          default:
            return n.month(r, { width: "wide", context: "standalone" });
        }
      },
      w: function (e, t, n, r) {
        var a = (function (e, t) {
          Ye(1, arguments);
          var n = Be(e),
            r = ut(n, t).getTime() - st(n, t).getTime();
          return Math.round(r / 6048e5) + 1;
        })(e, r);
        return "wo" === t
          ? n.ordinalNumber(a, { unit: "week" })
          : rt(a, t.length);
      },
      I: function (e, t, n) {
        var r = (function (e) {
          Ye(1, arguments);
          var t = Be(e),
            n = ot(t).getTime() - lt(t).getTime();
          return Math.round(n / 6048e5) + 1;
        })(e);
        return "Io" === t
          ? n.ordinalNumber(r, { unit: "week" })
          : rt(r, t.length);
      },
      d: function (e, t, n) {
        return "do" === t
          ? n.ordinalNumber(e.getUTCDate(), { unit: "date" })
          : at.d(e, t);
      },
      D: function (e, t, n) {
        var r = (function (e) {
          Ye(1, arguments);
          var t = Be(e),
            n = t.getTime();
          t.setUTCMonth(0, 1), t.setUTCHours(0, 0, 0, 0);
          var r = t.getTime(),
            a = n - r;
          return Math.floor(a / 864e5) + 1;
        })(e);
        return "Do" === t
          ? n.ordinalNumber(r, { unit: "dayOfYear" })
          : rt(r, t.length);
      },
      E: function (e, t, n) {
        var r = e.getUTCDay();
        switch (t) {
          case "E":
          case "EE":
          case "EEE":
            return n.day(r, { width: "abbreviated", context: "formatting" });
          case "EEEEE":
            return n.day(r, { width: "narrow", context: "formatting" });
          case "EEEEEE":
            return n.day(r, { width: "short", context: "formatting" });
          case "EEEE":
          default:
            return n.day(r, { width: "wide", context: "formatting" });
        }
      },
      e: function (e, t, n, r) {
        var a = e.getUTCDay(),
          o = (a - r.weekStartsOn + 8) % 7 || 7;
        switch (t) {
          case "e":
            return String(o);
          case "ee":
            return rt(o, 2);
          case "eo":
            return n.ordinalNumber(o, { unit: "day" });
          case "eee":
            return n.day(a, { width: "abbreviated", context: "formatting" });
          case "eeeee":
            return n.day(a, { width: "narrow", context: "formatting" });
          case "eeeeee":
            return n.day(a, { width: "short", context: "formatting" });
          case "eeee":
          default:
            return n.day(a, { width: "wide", context: "formatting" });
        }
      },
      c: function (e, t, n, r) {
        var a = e.getUTCDay(),
          o = (a - r.weekStartsOn + 8) % 7 || 7;
        switch (t) {
          case "c":
            return String(o);
          case "cc":
            return rt(o, t.length);
          case "co":
            return n.ordinalNumber(o, { unit: "day" });
          case "ccc":
            return n.day(a, { width: "abbreviated", context: "standalone" });
          case "ccccc":
            return n.day(a, { width: "narrow", context: "standalone" });
          case "cccccc":
            return n.day(a, { width: "short", context: "standalone" });
          case "cccc":
          default:
            return n.day(a, { width: "wide", context: "standalone" });
        }
      },
      i: function (e, t, n) {
        var r = e.getUTCDay(),
          a = 0 === r ? 7 : r;
        switch (t) {
          case "i":
            return String(a);
          case "ii":
            return rt(a, t.length);
          case "io":
            return n.ordinalNumber(a, { unit: "day" });
          case "iii":
            return n.day(r, { width: "abbreviated", context: "formatting" });
          case "iiiii":
            return n.day(r, { width: "narrow", context: "formatting" });
          case "iiiiii":
            return n.day(r, { width: "short", context: "formatting" });
          case "iiii":
          default:
            return n.day(r, { width: "wide", context: "formatting" });
        }
      },
      a: function (e, t, n) {
        var r = e.getUTCHours() / 12 >= 1 ? "pm" : "am";
        switch (t) {
          case "a":
          case "aa":
          case "aaa":
            return n.dayPeriod(r, {
              width: "abbreviated",
              context: "formatting",
            });
          case "aaaaa":
            return n.dayPeriod(r, { width: "narrow", context: "formatting" });
          case "aaaa":
          default:
            return n.dayPeriod(r, { width: "wide", context: "formatting" });
        }
      },
      b: function (e, t, n) {
        var r,
          a = e.getUTCHours();
        switch (
          ((r = 12 === a ? dt : 0 === a ? ft : a / 12 >= 1 ? "pm" : "am"), t)
        ) {
          case "b":
          case "bb":
          case "bbb":
            return n.dayPeriod(r, {
              width: "abbreviated",
              context: "formatting",
            });
          case "bbbbb":
            return n.dayPeriod(r, { width: "narrow", context: "formatting" });
          case "bbbb":
          default:
            return n.dayPeriod(r, { width: "wide", context: "formatting" });
        }
      },
      B: function (e, t, n) {
        var r,
          a = e.getUTCHours();
        switch (((r = a >= 17 ? ht : a >= 12 ? mt : a >= 4 ? pt : yt), t)) {
          case "B":
          case "BB":
          case "BBB":
            return n.dayPeriod(r, {
              width: "abbreviated",
              context: "formatting",
            });
          case "BBBBB":
            return n.dayPeriod(r, { width: "narrow", context: "formatting" });
          case "BBBB":
          default:
            return n.dayPeriod(r, { width: "wide", context: "formatting" });
        }
      },
      h: function (e, t, n) {
        if ("ho" === t) {
          var r = e.getUTCHours() % 12;
          return 0 === r && (r = 12), n.ordinalNumber(r, { unit: "hour" });
        }
        return at.h(e, t);
      },
      H: function (e, t, n) {
        return "Ho" === t
          ? n.ordinalNumber(e.getUTCHours(), { unit: "hour" })
          : at.H(e, t);
      },
      K: function (e, t, n) {
        var r = e.getUTCHours() % 12;
        return "Ko" === t
          ? n.ordinalNumber(r, { unit: "hour" })
          : rt(r, t.length);
      },
      k: function (e, t, n) {
        var r = e.getUTCHours();
        return (
          0 === r && (r = 24),
          "ko" === t ? n.ordinalNumber(r, { unit: "hour" }) : rt(r, t.length)
        );
      },
      m: function (e, t, n) {
        return "mo" === t
          ? n.ordinalNumber(e.getUTCMinutes(), { unit: "minute" })
          : at.m(e, t);
      },
      s: function (e, t, n) {
        return "so" === t
          ? n.ordinalNumber(e.getUTCSeconds(), { unit: "second" })
          : at.s(e, t);
      },
      S: function (e, t) {
        return at.S(e, t);
      },
      X: function (e, t, n, r) {
        var a = (r._originalDate || e).getTimezoneOffset();
        if (0 === a) return "Z";
        switch (t) {
          case "X":
            return vt(a);
          case "XXXX":
          case "XX":
            return bt(a);
          case "XXXXX":
          case "XXX":
          default:
            return bt(a, ":");
        }
      },
      x: function (e, t, n, r) {
        var a = (r._originalDate || e).getTimezoneOffset();
        switch (t) {
          case "x":
            return vt(a);
          case "xxxx":
          case "xx":
            return bt(a);
          case "xxxxx":
          case "xxx":
          default:
            return bt(a, ":");
        }
      },
      O: function (e, t, n, r) {
        var a = (r._originalDate || e).getTimezoneOffset();
        switch (t) {
          case "O":
          case "OO":
          case "OOO":
            return "GMT" + gt(a, ":");
          case "OOOO":
          default:
            return "GMT" + bt(a, ":");
        }
      },
      z: function (e, t, n, r) {
        var a = (r._originalDate || e).getTimezoneOffset();
        switch (t) {
          case "z":
          case "zz":
          case "zzz":
            return "GMT" + gt(a, ":");
          case "zzzz":
          default:
            return "GMT" + bt(a, ":");
        }
      },
      t: function (e, t, n, r) {
        var a = r._originalDate || e;
        return rt(Math.floor(a.getTime() / 1e3), t.length);
      },
      T: function (e, t, n, r) {
        return rt((r._originalDate || e).getTime(), t.length);
      },
    };
    function Et(e, t) {
      switch (e) {
        case "P":
          return t.date({ width: "short" });
        case "PP":
          return t.date({ width: "medium" });
        case "PPP":
          return t.date({ width: "long" });
        case "PPPP":
        default:
          return t.date({ width: "full" });
      }
    }
    function xt(e, t) {
      switch (e) {
        case "p":
          return t.time({ width: "short" });
        case "pp":
          return t.time({ width: "medium" });
        case "ppp":
          return t.time({ width: "long" });
        case "pppp":
        default:
          return t.time({ width: "full" });
      }
    }
    var _t = {
      p: xt,
      P: function (e, t) {
        var n,
          r = e.match(/(P+)(p+)?/),
          a = r[1],
          o = r[2];
        if (!o) return Et(e, t);
        switch (a) {
          case "P":
            n = t.dateTime({ width: "short" });
            break;
          case "PP":
            n = t.dateTime({ width: "medium" });
            break;
          case "PPP":
            n = t.dateTime({ width: "long" });
            break;
          case "PPPP":
          default:
            n = t.dateTime({ width: "full" });
        }
        return n.replace("{{date}}", Et(a, t)).replace("{{time}}", xt(o, t));
      },
    };
    function St(e) {
      return e.getTime() % 6e4;
    }
    function kt(e) {
      var t = new Date(e.getTime()),
        n = Math.ceil(t.getTimezoneOffset());
      return (
        t.setSeconds(0, 0), 6e4 * n + (n > 0 ? (6e4 + St(t)) % 6e4 : St(t))
      );
    }
    var Tt = ["D", "DD"],
      Ct = ["YY", "YYYY"];
    function Ot(e) {
      return -1 !== Tt.indexOf(e);
    }
    function Pt(e) {
      return -1 !== Ct.indexOf(e);
    }
    function Nt(e) {
      if ("YYYY" === e)
        throw new RangeError(
          "Use `yyyy` instead of `YYYY` for formatting years; see: https://git.io/fxCyr"
        );
      if ("YY" === e)
        throw new RangeError(
          "Use `yy` instead of `YY` for formatting years; see: https://git.io/fxCyr"
        );
      if ("D" === e)
        throw new RangeError(
          "Use `d` instead of `D` for formatting days of the month; see: https://git.io/fxCyr"
        );
      if ("DD" === e)
        throw new RangeError(
          "Use `dd` instead of `DD` for formatting days of the month; see: https://git.io/fxCyr"
        );
    }
    var jt = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g,
      Mt = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g,
      Dt = /^'([^]*?)'?$/,
      Rt = /''/g,
      At = /[a-zA-Z]/;
    function It(e, t, n) {
      Ye(2, arguments);
      var r = String(t),
        a = n || {},
        o = a.locale || Ze,
        i = o.options && o.options.firstWeekContainsDate,
        l = null == i ? 1 : et(i),
        u = null == a.firstWeekContainsDate ? l : et(a.firstWeekContainsDate);
      if (!(u >= 1 && u <= 7))
        throw new RangeError(
          "firstWeekContainsDate must be between 1 and 7 inclusively"
        );
      var c = o.options && o.options.weekStartsOn,
        s = null == c ? 0 : et(c),
        f = null == a.weekStartsOn ? s : et(a.weekStartsOn);
      if (!(f >= 0 && f <= 6))
        throw new RangeError(
          "weekStartsOn must be between 0 and 6 inclusively"
        );
      if (!o.localize)
        throw new RangeError("locale must contain localize property");
      if (!o.formatLong)
        throw new RangeError("locale must contain formatLong property");
      var d = Be(e);
      if (!$e(d)) throw new RangeError("Invalid time value");
      var p = kt(d),
        m = nt(d, p),
        h = {
          firstWeekContainsDate: u,
          weekStartsOn: f,
          locale: o,
          _originalDate: d,
        },
        y = r
          .match(Mt)
          .map(function (e) {
            var t = e[0];
            return "p" === t || "P" === t ? (0, _t[t])(e, o.formatLong, h) : e;
          })
          .join("")
          .match(jt)
          .map(function (e) {
            if ("''" === e) return "'";
            var t = e[0];
            if ("'" === t) return Ut(e);
            var n = wt[t];
            if (n)
              return (
                !a.useAdditionalWeekYearTokens && Pt(e) && Nt(e),
                !a.useAdditionalDayOfYearTokens && Ot(e) && Nt(e),
                n(m, e, o.localize, h)
              );
            if (t.match(At))
              throw new RangeError(
                "Format string contains an unescaped latin alphabet character `" +
                  t +
                  "`"
              );
            return e;
          })
          .join("");
      return y;
    }
    function Ut(e) {
      return e.match(Dt)[1].replace(Rt, "'");
    }
    function Lt(e, t) {
      Ye(2, arguments);
      var n = Be(e),
        r = et(t);
      return n.setDate(n.getDate() + r), n;
    }
    function zt(e) {
      return (
        (function (e) {
          if (Array.isArray(e)) return Ft(e);
        })(e) ||
        (function (e) {
          if ("undefined" != typeof Symbol && Symbol.iterator in Object(e))
            return Array.from(e);
        })(e) ||
        (function (e, t) {
          if (!e) return;
          if ("string" == typeof e) return Ft(e, t);
          var n = Object.prototype.toString.call(e).slice(8, -1);
          "Object" === n && e.constructor && (n = e.constructor.name);
          if ("Map" === n || "Set" === n) return Array.from(n);
          if (
            "Arguments" === n ||
            /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
          )
            return Ft(e, t);
        })(e) ||
        (function () {
          throw new TypeError(
            "Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
          );
        })()
      );
    }
    function Ft(e, t) {
      (null == t || t > e.length) && (t = e.length);
      for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
      return r;
    }
    function Wt(e, t) {
      var n = Object.keys(e);
      if (Object.getOwnPropertySymbols) {
        var r = Object.getOwnPropertySymbols(e);
        t &&
          (r = r.filter(function (t) {
            return Object.getOwnPropertyDescriptor(e, t).enumerable;
          })),
          n.push.apply(n, r);
      }
      return n;
    }
    function Ht(e) {
      for (var t = 1; t < arguments.length; t++) {
        var n = null != arguments[t] ? arguments[t] : {};
        t % 2
          ? Wt(Object(n), !0).forEach(function (t) {
              Yt(e, t, n[t]);
            })
          : Object.getOwnPropertyDescriptors
          ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
          : Wt(Object(n)).forEach(function (t) {
              Object.defineProperty(
                e,
                t,
                Object.getOwnPropertyDescriptor(n, t)
              );
            });
      }
      return e;
    }
    function Yt(e, t, n) {
      return (
        t in e
          ? Object.defineProperty(e, t, {
              value: n,
              enumerable: !0,
              configurable: !0,
              writable: !0,
            })
          : (e[t] = n),
        e
      );
    }
    var Bt = It(new Date(), "YYY-MM-dd"),
      $t = Lt(new Date(), 6),
      qt = {
        shifts: [],
        date: Bt,
        end_date: ($t = It($t, "YYY-MM-dd")),
        daily_shifts: [],
        user_shifts: [],
        isLoading: !1,
      };
    function Vt(e) {
      return (
        (function (e) {
          if (Array.isArray(e)) return Qt(e);
        })(e) ||
        (function (e) {
          if ("undefined" != typeof Symbol && Symbol.iterator in Object(e))
            return Array.from(e);
        })(e) ||
        (function (e, t) {
          if (!e) return;
          if ("string" == typeof e) return Qt(e, t);
          var n = Object.prototype.toString.call(e).slice(8, -1);
          "Object" === n && e.constructor && (n = e.constructor.name);
          if ("Map" === n || "Set" === n) return Array.from(n);
          if (
            "Arguments" === n ||
            /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
          )
            return Qt(e, t);
        })(e) ||
        (function () {
          throw new TypeError(
            "Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
          );
        })()
      );
    }
    function Qt(e, t) {
      (null == t || t > e.length) && (t = e.length);
      for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
      return r;
    }
    function Gt(e, t) {
      var n = Object.keys(e);
      if (Object.getOwnPropertySymbols) {
        var r = Object.getOwnPropertySymbols(e);
        t &&
          (r = r.filter(function (t) {
            return Object.getOwnPropertyDescriptor(e, t).enumerable;
          })),
          n.push.apply(n, r);
      }
      return n;
    }
    function Xt(e) {
      for (var t = 1; t < arguments.length; t++) {
        var n = null != arguments[t] ? arguments[t] : {};
        t % 2
          ? Gt(Object(n), !0).forEach(function (t) {
              Kt(e, t, n[t]);
            })
          : Object.getOwnPropertyDescriptors
          ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
          : Gt(Object(n)).forEach(function (t) {
              Object.defineProperty(
                e,
                t,
                Object.getOwnPropertyDescriptor(n, t)
              );
            });
      }
      return e;
    }
    function Kt(e, t, n) {
      return (
        t in e
          ? Object.defineProperty(e, t, {
              value: n,
              enumerable: !0,
              configurable: !0,
              writable: !0,
            })
          : (e[t] = n),
        e
      );
    }
    It(new Date(), "YYY-MM-dd");
    var Jt = Lt(new Date(), 7);
    Jt = It(Jt, "YYY-MM-dd");
    var Zt = { employees: [], positions: [], departments: [] };
    function en(e, t) {
      var n = Object.keys(e);
      if (Object.getOwnPropertySymbols) {
        var r = Object.getOwnPropertySymbols(e);
        t &&
          (r = r.filter(function (t) {
            return Object.getOwnPropertyDescriptor(e, t).enumerable;
          })),
          n.push.apply(n, r);
      }
      return n;
    }
    function tn(e) {
      for (var t = 1; t < arguments.length; t++) {
        var n = null != arguments[t] ? arguments[t] : {};
        t % 2
          ? en(Object(n), !0).forEach(function (t) {
              nn(e, t, n[t]);
            })
          : Object.getOwnPropertyDescriptors
          ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
          : en(Object(n)).forEach(function (t) {
              Object.defineProperty(
                e,
                t,
                Object.getOwnPropertyDescriptor(n, t)
              );
            });
      }
      return e;
    }
    function nn(e, t, n) {
      return (
        t in e
          ? Object.defineProperty(e, t, {
              value: n,
              enumerable: !0,
              configurable: !0,
              writable: !0,
            })
          : (e[t] = n),
        e
      );
    }
    var rn = {
      token: localStorage.getItem("token"),
      isAuthenticated: null,
      isLoading: !1,
      user: null,
    };
    function an(e, t) {
      var n = Object.keys(e);
      if (Object.getOwnPropertySymbols) {
        var r = Object.getOwnPropertySymbols(e);
        t &&
          (r = r.filter(function (t) {
            return Object.getOwnPropertyDescriptor(e, t).enumerable;
          })),
          n.push.apply(n, r);
      }
      return n;
    }
    function on(e) {
      for (var t = 1; t < arguments.length; t++) {
        var n = null != arguments[t] ? arguments[t] : {};
        t % 2
          ? an(Object(n), !0).forEach(function (t) {
              ln(e, t, n[t]);
            })
          : Object.getOwnPropertyDescriptors
          ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
          : an(Object(n)).forEach(function (t) {
              Object.defineProperty(
                e,
                t,
                Object.getOwnPropertyDescriptor(n, t)
              );
            });
      }
      return e;
    }
    function ln(e, t, n) {
      return (
        t in e
          ? Object.defineProperty(e, t, {
              value: n,
              enumerable: !0,
              configurable: !0,
              writable: !0,
            })
          : (e[t] = n),
        e
      );
    }
    var un = { width: window.innerWidth };
    function cn(e, t) {
      var n = Object.keys(e);
      if (Object.getOwnPropertySymbols) {
        var r = Object.getOwnPropertySymbols(e);
        t &&
          (r = r.filter(function (t) {
            return Object.getOwnPropertyDescriptor(e, t).enumerable;
          })),
          n.push.apply(n, r);
      }
      return n;
    }
    function sn(e) {
      for (var t = 1; t < arguments.length; t++) {
        var n = null != arguments[t] ? arguments[t] : {};
        t % 2
          ? cn(Object(n), !0).forEach(function (t) {
              fn(e, t, n[t]);
            })
          : Object.getOwnPropertyDescriptors
          ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
          : cn(Object(n)).forEach(function (t) {
              Object.defineProperty(
                e,
                t,
                Object.getOwnPropertyDescriptor(n, t)
              );
            });
      }
      return e;
    }
    function fn(e, t, n) {
      return (
        t in e
          ? Object.defineProperty(e, t, {
              value: n,
              enumerable: !0,
              configurable: !0,
              writable: !0,
            })
          : (e[t] = n),
        e
      );
    }
    var dn = { msg: {}, status: null },
      pn = Object(Se.combineReducers)({
        shifts: function () {
          var e =
              arguments.length > 0 && void 0 !== arguments[0]
                ? arguments[0]
                : qt,
            t = arguments.length > 1 ? arguments[1] : void 0;
          switch (t.type) {
            case "SHIFTS_LOADING":
              return Ht({}, e, { isLoading: !0 });
            case "GET_ALL_SHIFTS":
              return Ht({}, e, {
                shifts: t.payload,
                date: t.date,
                end_date: t.enddate,
                isLoading: !1,
              });
            case "GET_DAILY_SHIFTS":
              return Ht({}, e, { daily_shifts: t.payload });
            case "GET_SHIFTS_BY_ID":
              return Ht({}, e, { user_shifts: t.payload });
            case "ADD_SHIFT":
              return Ht({}, e, {
                shifts: [].concat(zt(e.shifts), [t.payload]),
                daily_shifts: [].concat(zt(e.daily_shifts), [t.payload]),
              });
            case "DELETE_SHIFT":
              return Ht({}, e, {
                shifts: e.shifts.filter(function (e) {
                  return e.id !== t.payload;
                }),
                daily_shifts: e.daily_shifts.filter(function (e) {
                  return e.id !== t.payload;
                }),
              });
            case "LOGOUT_SUCCESS":
              return Ht({}, e, { shifts: [], daily_shifts: [] });
            default:
              return e;
          }
        },
        employees: function () {
          var e =
              arguments.length > 0 && void 0 !== arguments[0]
                ? arguments[0]
                : Zt,
            t = arguments.length > 1 ? arguments[1] : void 0;
          switch (t.type) {
            case "GET_EMPLOYEES":
              return Xt({}, e, { employees: t.payload });
            case "GET_POSITIONS":
              return Xt({}, e, { positions: t.payload });
            case "GET_DEPARTMENTS":
              return Xt({}, e, { departments: t.payload });
            case "ADD_EMPLOYEE":
              return Xt({}, e, {
                employees: [].concat(Vt(e.employees), [t.payload]),
              });
            case "DELETE_EMPLOYEE":
              return Xt({}, e, {
                employees: e.employees.filter(function (e) {
                  return e.id !== t.payload;
                }),
              });
            case "ADD_POSITION":
              return Xt({}, e, {
                positions: [].concat(Vt(e.positions), [t.payload]),
              });
            case "ADD_DEPARTMENT":
              return Xt({}, e, {
                departments: [].concat(Vt(e.departments), [t.payload]),
              });
            default:
              return e;
          }
        },
        auth: function () {
          var e =
              arguments.length > 0 && void 0 !== arguments[0]
                ? arguments[0]
                : rn,
            t = arguments.length > 1 ? arguments[1] : void 0;
          switch (t.type) {
            case "USER_LOADING":
              return tn({}, e, { isLoading: !0 });
            case "USER_LOADED":
              return tn({}, e, {
                isAuthenticated: !0,
                isLoading: !1,
                user: t.payload,
              });
            case "LOGIN_SUCCESS":
            case "REGISTER_SUCCESS":
              return (
                localStorage.setItem("token", t.payload.token),
                tn({}, e, {}, t.payload, { isAuthenticated: !0, isLoading: !1 })
              );
            case "LOGOUT_SUCCESS":
            case "AUTH_ERROR":
            case "LOGIN_FAIL":
            case "REGISTER_FAIL":
              return (
                localStorage.removeItem("token"),
                tn({}, e, {
                  token: null,
                  user: null,
                  isAuthenticated: !1,
                  isLoading: !1,
                })
              );
            default:
              return e;
          }
        },
        responsive: function () {
          var e =
              arguments.length > 0 && void 0 !== arguments[0]
                ? arguments[0]
                : un,
            t = arguments.length > 1 ? arguments[1] : void 0;
          switch (t.type) {
            case "SET_WIDTH":
              return on({}, e, { width: t.width });
            default:
              return e;
          }
        },
        errors: function () {
          var e =
              arguments.length > 0 && void 0 !== arguments[0]
                ? arguments[0]
                : dn,
            t = arguments.length > 1 ? arguments[1] : void 0;
          switch (t.type) {
            case "GET_ERRORS":
              return sn({}, e, {
                msg: t.payload.msg,
                status: t.payload.status,
              });
            case "RESET_ERRORS":
              return sn({}, e, { msg: {}, status: null });
            default:
              return e;
          }
        },
      }),
      mn = [He],
      hn = Object(Se.createStore)(
        pn,
        {},
        Object(ze.composeWithDevTools)(Se.applyMiddleware.apply(void 0, mn))
      );
    (Ae.a.defaults.xsrfHeaderName = "X-CSRFTOKEN"),
      (Ae.a.defaults.xsrfCookieName = "csrftoken");
    var yn = function (e, t) {
        return function (n, r) {
          n({ type: "SHIFTS_LOADING" }),
            Ae.a
              .get(
                "/api/shifts/?date_after="
                  .concat(e, "&date_before=")
                  .concat(t, "&ordering=date,start_time"),
                Ue(r)
              )
              .then(function (r) {
                n({
                  type: "GET_ALL_SHIFTS",
                  payload: r.data,
                  date: e,
                  enddate: t,
                });
              });
        };
      },
      gn = function (e, t, n) {
        return function (r, a) {
          Ae.a
            .get(
              "/api/shifts/?date_after="
                .concat(e, "&date_before=")
                .concat(t, "&employee=")
                .concat(n, "&ordering=date,start_time"),
              Ue(a)
            )
            .then(function (e) {
              r({ type: "GET_SHIFTS_BY_ID", payload: e.data });
            });
        };
      },
      vn = function () {
        return function (e, t) {
          Ae.a.get("/api/employees/", Ue(t)).then(function (t) {
            e({ type: "GET_EMPLOYEES", payload: t.data });
          });
        };
      },
      bn = function () {
        return function (e, t) {
          Ae.a.get("/api/positions/", Ue(t)).then(function (t) {
            e({ type: "GET_POSITIONS", payload: t.data });
          });
        };
      };
    function wn(e, t) {
      Ye(1, arguments);
      var n = e || {},
        r = Be(n.start),
        a = Be(n.end),
        o = a.getTime();
      if (!(r.getTime() <= o)) throw new RangeError("Invalid interval");
      var i = [],
        l = r;
      l.setHours(0, 0, 0, 0);
      var u = t && "step" in t ? Number(t.step) : 1;
      if (u < 1 || isNaN(u))
        throw new RangeError("`options.step` must be a number greater than 1");
      for (; l.getTime() <= o; )
        i.push(Be(l)), l.setDate(l.getDate() + u), l.setHours(0, 0, 0, 0);
      return i;
    }
    var En = {
        dateTimeDelimiter: /[T ]/,
        timeZoneDelimiter: /[Z ]/i,
        timezone: /([Z+-].*)$/,
      },
      xn = /^-?(?:(\d{3})|(\d{2})(?:-?(\d{2}))?|W(\d{2})(?:-?(\d{1}))?|)$/,
      _n = /^(\d{2}(?:[.,]\d*)?)(?::?(\d{2}(?:[.,]\d*)?))?(?::?(\d{2}(?:[.,]\d*)?))?$/,
      Sn = /^([+-])(\d{2})(?::?(\d{2}))?$/;
    function kn(e, t) {
      Ye(1, arguments);
      var n = t || {},
        r = null == n.additionalDigits ? 2 : et(n.additionalDigits);
      if (2 !== r && 1 !== r && 0 !== r)
        throw new RangeError("additionalDigits must be 0, 1 or 2");
      if (
        "string" != typeof e &&
        "[object String]" !== Object.prototype.toString.call(e)
      )
        return new Date(NaN);
      var a,
        o = Tn(e);
      if (o.date) {
        var i = Cn(o.date, r);
        a = On(i.restDateString, i.year);
      }
      if (isNaN(a) || !a) return new Date(NaN);
      var l,
        u = a.getTime(),
        c = 0;
      if (o.time && ((c = Nn(o.time)), isNaN(c) || null === c))
        return new Date(NaN);
      if (!o.timezone) {
        var s = new Date(u + c),
          f = new Date(
            s.getUTCFullYear(),
            s.getUTCMonth(),
            s.getUTCDate(),
            s.getUTCHours(),
            s.getUTCMinutes(),
            s.getUTCSeconds(),
            s.getUTCMilliseconds()
          );
        return f.setFullYear(s.getUTCFullYear()), f;
      }
      return (
        (l = Mn(o.timezone)), isNaN(l) ? new Date(NaN) : new Date(u + c + l)
      );
    }
    function Tn(e) {
      var t,
        n = {},
        r = e.split(En.dateTimeDelimiter);
      if (
        (/:/.test(r[0])
          ? ((n.date = null), (t = r[0]))
          : ((n.date = r[0]),
            (t = r[1]),
            En.timeZoneDelimiter.test(n.date) &&
              ((n.date = e.split(En.timeZoneDelimiter)[0]),
              (t = e.substr(n.date.length, e.length)))),
        t)
      ) {
        var a = En.timezone.exec(t);
        a
          ? ((n.time = t.replace(a[1], "")), (n.timezone = a[1]))
          : (n.time = t);
      }
      return n;
    }
    function Cn(e, t) {
      var n = new RegExp(
          "^(?:(\\d{4}|[+-]\\d{" +
            (4 + t) +
            "})|(\\d{2}|[+-]\\d{" +
            (2 + t) +
            "})$)"
        ),
        r = e.match(n);
      if (!r) return { year: null };
      var a = r[1] && parseInt(r[1]),
        o = r[2] && parseInt(r[2]);
      return {
        year: null == o ? a : 100 * o,
        restDateString: e.slice((r[1] || r[2]).length),
      };
    }
    function On(e, t) {
      if (null === t) return null;
      var n = e.match(xn);
      if (!n) return null;
      var r = !!n[4],
        a = Pn(n[1]),
        o = Pn(n[2]) - 1,
        i = Pn(n[3]),
        l = Pn(n[4]),
        u = Pn(n[5]) - 1;
      if (r)
        return (function (e, t, n) {
          return t >= 1 && t <= 53 && n >= 0 && n <= 6;
        })(0, l, u)
          ? (function (e, t, n) {
              var r = new Date(0);
              r.setUTCFullYear(e, 0, 4);
              var a = r.getUTCDay() || 7,
                o = 7 * (t - 1) + n + 1 - a;
              return r.setUTCDate(r.getUTCDate() + o), r;
            })(t, l, u)
          : new Date(NaN);
      var c = new Date(0);
      return (function (e, t, n) {
        return t >= 0 && t <= 11 && n >= 1 && n <= (Dn[t] || (Rn(e) ? 29 : 28));
      })(t, o, i) &&
        (function (e, t) {
          return t >= 1 && t <= (Rn(e) ? 366 : 365);
        })(t, a)
        ? (c.setUTCFullYear(t, o, Math.max(a, i)), c)
        : new Date(NaN);
    }
    function Pn(e) {
      return e ? parseInt(e) : 1;
    }
    function Nn(e) {
      var t = e.match(_n);
      if (!t) return null;
      var n = jn(t[1]),
        r = jn(t[2]),
        a = jn(t[3]);
      return (function (e, t, n) {
        if (24 === e) return 0 === t && 0 === n;
        return n >= 0 && n < 60 && t >= 0 && t < 60 && e >= 0 && e < 25;
      })(n, r, a)
        ? 36e5 * n + 6e4 * r + 1e3 * a
        : NaN;
    }
    function jn(e) {
      return (e && parseFloat(e.replace(",", "."))) || 0;
    }
    function Mn(e) {
      if ("Z" === e) return 0;
      var t = e.match(Sn);
      if (!t) return 0;
      var n = "+" === t[1] ? -1 : 1,
        r = parseInt(t[2]),
        a = (t[3] && parseInt(t[3])) || 0;
      return (function (e, t) {
        return t >= 0 && t <= 59;
      })(0, a)
        ? n * (36e5 * r + 6e4 * a)
        : NaN;
    }
    var Dn = [31, null, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    function Rn(e) {
      return e % 400 == 0 || (e % 4 == 0 && e % 100);
    }
    var An = function (e) {
        var t = Pe(),
          n =
            (e.daterange,
            De(function (e) {
              return e.shifts.date;
            })),
          r = function (e, t) {
            return It(Lt(kn(e), t), "YYY-MM-dd");
          };
        return a.a.createElement(
          "div",
          { className: "dates__picker" },
          a.a.createElement(
            "div",
            { className: "dates__pickerWrapper" },
            a.a.createElement(
              "h2",
              {
                onClick: function () {
                  t(yn(r(n, -7), r(n, -1)));
                },
              },
              a.a.createElement("i", { className: "fas fa-angle-double-left" })
            ),
            a.a.createElement(
              "h2",
              {
                onClick: function () {
                  t(yn(r(n, -1), r(n, 5)));
                },
              },
              a.a.createElement("i", { className: "fas fa-angle-left" })
            ),
            a.a.createElement(
              "h2",
              { className: "dates__pickerDate" },
              It(kn(n), "dd MMM"),
              " -",
              " ",
              It(Lt(kn(n), 6), "dd MMM")
            ),
            a.a.createElement(
              "h2",
              {
                onClick: function () {
                  t(yn(r(n, 1), r(n, 7)));
                },
              },
              a.a.createElement("i", { className: "fas fa-angle-right" })
            ),
            a.a.createElement(
              "h2",
              {
                onClick: function () {
                  t(yn(r(n, 7), r(n, 13)));
                },
              },
              a.a.createElement("i", { className: "fas fa-angle-double-right" })
            )
          )
        );
      },
      In = function (e) {
        var t = De(function (e) {
          return e.auth.user;
        });
        De(function (e) {
          return e.responsive.width;
        });
        return a.a.createElement(
          r.Fragment,
          null,
          a.a.createElement(
            "section",
            { className: "dates" },
            a.a.createElement(An, { daterange: "7" }),
            a.a.createElement(
              "div",
              { className: "dates__container" },
              a.a.createElement("div", { className: "dates__namesection" }),
              a.a.createElement(
                "div",
                { className: "dates__wrapper" },
                e.dates.map(function (e) {
                  return a.a.createElement(
                    "div",
                    { key: e, className: "dates__date" },
                    a.a.createElement(
                      "p",
                      null,
                      It(e, "ccc do MMM").split(" ")[0],
                      a.a.createElement("br", null),
                      It(e, "ccc do MMM").split(" ")[1],
                      " ",
                      It(e, "ccc do MMM").split(" ")[2]
                    ),
                    "Business" == t.profile.role &&
                      a.a.createElement(
                        me,
                        {
                          className: "btn-1",
                          to: "/shift/".concat(It(e, "YYY-MM-dd")),
                        },
                        "Edit"
                      )
                  );
                })
              )
            )
          )
        );
      },
      Un = function (e) {
        var t = e.shift;
        return a.a.createElement(
          "div",
          { className: "shift__shift" },
          t.map(function (e) {
            return a.a.createElement(
              r.Fragment,
              null,
              a.a.createElement(
                "p",
                null,
                e.start_time.substr(0, 5),
                " - ",
                e.end_time
              ),
              a.a.createElement("p", null, e.info)
            );
          })
        );
      },
      Ln = function () {
        var e = Pe(),
          t = De(function (e) {
            return e.auth.user;
          }),
          n = De(function (e) {
            return e.employees.employees;
          }),
          o = De(function (e) {
            return e.shifts.date;
          }),
          i = De(function (e) {
            return e.shifts.end_date;
          }),
          l = De(function (e) {
            return e.shifts.shifts;
          }),
          u = De(function (e) {
            return e.shifts.isLoading;
          });
        Object(r.useEffect)(function () {
          (n = e(vn())), (l = e(yn(o, i)));
        }, []),
          (n = De(function (e) {
            return e.employees.employees;
          })),
          t &&
            "User" == t.profile.role &&
            ((n = n.filter(function (e) {
              return e.id !== t.employee[0].id;
            })),
            t.employee.push,
            n.unshift(t.employee[0]));
        var c = wn({ start: kn(o), end: kn(i) }),
          s = function (e, t) {
            return l.filter(function (n) {
              return n.employee.name === e && n.date === t;
            });
          };
        return a.a.createElement(
          r.Fragment,
          null,
          a.a.createElement(In, { dates: c }),
          u &&
            a.a.createElement(
              "div",
              { className: "shiftsloading" },
              a.a.createElement("span", { className: "loader" })
            ),
          n.map(function (e) {
            return a.a.createElement(
              "div",
              { key: e.id, className: "rota__container" },
              a.a.createElement(
                "div",
                { className: "employee__container" },
                a.a.createElement(
                  "div",
                  {
                    className: "employee__wrapper ".concat(
                      "User" == t.profile.role && t.employee[0].id == e.id
                        ? " active"
                        : ""
                    ),
                  },
                  a.a.createElement(
                    "p",
                    { className: "employee__position" },
                    e.position.name
                  ),
                  a.a.createElement(
                    "p",
                    { className: "employee__name" },
                    e.name.split(" ")[0],
                    a.a.createElement(
                      "span",
                      { className: "employee__surname" },
                      " ",
                      e.name.split(" ")[1]
                    )
                  ),
                  a.a.createElement(
                    "p",
                    { className: "employee__hours" },
                    "30 Hours"
                  )
                )
              ),
              a.a.createElement(
                "div",
                { className: "shift__container" },
                c.map(function (t) {
                  return s(e.name, It(t, "YYY-MM-dd")).length > 0
                    ? a.a.createElement(Un, {
                        employee: e.name,
                        shift: s(e.name, It(t, "YYY-MM-dd")),
                      })
                    : a.a.createElement("div", {
                        key: t,
                        className: "shift__shift shift__shift-noshift",
                      });
                })
              )
            );
          })
        );
      };
    n(52);
    function zn(e, t) {
      return (
        (function (e) {
          if (Array.isArray(e)) return e;
        })(e) ||
        (function (e, t) {
          if ("undefined" == typeof Symbol || !(Symbol.iterator in Object(e)))
            return;
          var n = [],
            r = !0,
            a = !1,
            o = void 0;
          try {
            for (
              var i, l = e[Symbol.iterator]();
              !(r = (i = l.next()).done) &&
              (n.push(i.value), !t || n.length !== t);
              r = !0
            );
          } catch (e) {
            (a = !0), (o = e);
          } finally {
            try {
              r || null == l.return || l.return();
            } finally {
              if (a) throw o;
            }
          }
          return n;
        })(e, t) ||
        (function (e, t) {
          if (!e) return;
          if ("string" == typeof e) return Fn(e, t);
          var n = Object.prototype.toString.call(e).slice(8, -1);
          "Object" === n && e.constructor && (n = e.constructor.name);
          if ("Map" === n || "Set" === n) return Array.from(n);
          if (
            "Arguments" === n ||
            /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
          )
            return Fn(e, t);
        })(e, t) ||
        (function () {
          throw new TypeError(
            "Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
          );
        })()
      );
    }
    function Fn(e, t) {
      (null == t || t > e.length) && (t = e.length);
      for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
      return r;
    }
    var Wn = function (e) {
        var t = e.form,
          n = De(function (e) {
            return e.employees.positions;
          }),
          o = De(function (e) {
            return e.employees.departments;
          }),
          i = De(function (e) {
            return e.errors.msg;
          }),
          l = Pe();
        Object(r.useEffect)(function () {
          (n = l(bn())),
            (o = l(function (e, t) {
              Ae.a.get("/api/departments/", Ue(t)).then(function (t) {
                e({ type: "GET_DEPARTMENTS", payload: t.data });
              });
            }));
        }, []);
        var u = zn(Object(r.useState)(""), 2),
          c = u[0],
          s = u[1],
          f = zn(Object(r.useState)(""), 2),
          d = f[0],
          p = f[1],
          m = zn(Object(r.useState)(""), 2),
          h = m[0],
          y = m[1];
        return a.a.createElement(
          r.Fragment,
          null,
          a.a.createElement(
            "div",
            { className: "staffForm" },
            a.a.createElement("h1", { style: { fontSize: "20px" } }, "Add ", t),
            a.a.createElement(
              "form",
              {
                onSubmit: function (e) {
                  if ((e.preventDefault(), "Staff" == t))
                    l(
                      (function (e) {
                        return function (t, n) {
                          Ae.a
                            .post("/api/employees/", e, Ue(n))
                            .then(function (e) {
                              t({ type: "ADD_EMPLOYEE", payload: e.data }),
                                t({ type: "RESET_ERRORS" });
                            })
                            .catch(function (e) {
                              t(Ie(e.response.data, e.response.status));
                            });
                        };
                      })({ name: c, position_id: d, department_id: h })
                    ),
                      c.length > 0 &&
                        d.length > 0 &&
                        h.length > 0 &&
                        (s(""), p(""), y(""));
                  else if ("Department" == t)
                    l(
                      (function (e) {
                        return function (t, n) {
                          Ae.a
                            .post("/api/departments/", e, Ue(n))
                            .then(function (e) {
                              t({ type: "ADD_DEPARTMENT", payload: e.data }),
                                t({ type: "RESET_ERRORS" });
                            })
                            .catch(function (e) {
                              t(Ie(e.response.data, e.response.status));
                            });
                        };
                      })({ name: c })
                    ),
                      s("");
                  else if ("Position" == t) {
                    l(
                      (function (e) {
                        return function (t, n) {
                          Ae.a
                            .post("/api/positions/", e, Ue(n))
                            .then(function (e) {
                              t({ type: "ADD_POSITION", payload: e.data }),
                                t({ type: "RESET_ERRORS" });
                            })
                            .catch(function (e) {
                              t(Ie(e.response.data, e.response.status));
                            });
                        };
                      })({ name: c })
                    ),
                      s("");
                  }
                },
                className: "staffForm__form",
              },
              a.a.createElement(
                "div",
                { className: "staffForm__control" },
                a.a.createElement(
                  "label",
                  { className: "staffForm__label" },
                  "Name:"
                ),
                a.a.createElement("input", {
                  className: "staffForm__input",
                  type: "text",
                  name: "name ",
                  onChange: function (e) {
                    return s(e.target.value);
                  },
                  value: c,
                }),
                a.a.createElement("p", { className: "error" }, i.name)
              ),
              "Staff" === t &&
                a.a.createElement(
                  r.Fragment,
                  null,
                  a.a.createElement(
                    "div",
                    { className: "staffForm__control" },
                    a.a.createElement(
                      "label",
                      { className: "staffForm__label" },
                      "Position:"
                    ),
                    a.a.createElement(
                      "select",
                      {
                        className: "staffForm__input",
                        onChange: function (e) {
                          return p(e.target.value);
                        },
                        name: "position",
                        value: d,
                      },
                      a.a.createElement(
                        "option",
                        { value: "", disabled: !0, selected: !0 },
                        "Select a position"
                      ),
                      n.map(function (e) {
                        return a.a.createElement(
                          "option",
                          { key: e.id, value: e.id },
                          e.name
                        );
                      })
                    ),
                    a.a.createElement(
                      "p",
                      { className: "error" },
                      i.position_id
                    )
                  ),
                  a.a.createElement(
                    "div",
                    { className: "staffForm__control" },
                    a.a.createElement(
                      "label",
                      { className: "staffForm__label" },
                      "Department:"
                    ),
                    a.a.createElement(
                      "select",
                      {
                        className: "staffForm__input",
                        onChange: function (e) {
                          return y(e.target.value);
                        },
                        name: "department",
                        value: h,
                      },
                      a.a.createElement(
                        "option",
                        { value: "", disabled: !0, selected: !0 },
                        "Select a department"
                      ),
                      o.map(function (e) {
                        return a.a.createElement(
                          "option",
                          { key: e.id, value: e.id },
                          e.name
                        );
                      })
                    ),
                    a.a.createElement(
                      "p",
                      { className: "error" },
                      i.department_id
                    )
                  )
                ),
              a.a.createElement("button", { className: "btn-1" }, "Create")
            )
          )
        );
      },
      Hn = function (e) {
        var t = e.open,
          n = e.onConfirm,
          r = e.onClose,
          o = e.message;
        return (
          t &&
          a.a.createElement(
            "div",
            {
              onClick: function (e) {
                return console.log(e);
              },
              className: "modal",
            },
            a.a.createElement(
              "div",
              { className: "modal__container" },
              a.a.createElement(
                "div",
                { className: "modal__message" },
                a.a.createElement("p", null, o)
              ),
              a.a.createElement(
                "div",
                { class: "modal__buttonsContainer" },
                a.a.createElement(
                  "div",
                  { className: "modal__buttons" },
                  a.a.createElement(
                    "button",
                    {
                      className: "modal__buttonCancel modal__button",
                      onClick: r,
                    },
                    "Cancel"
                  ),
                  a.a.createElement(
                    "button",
                    {
                      className: "modal__buttonConfirm modal__button",
                      onClick: n,
                    },
                    "Confirm"
                  )
                )
              )
            )
          )
        );
      };
    function Yn(e, t) {
      return (
        (function (e) {
          if (Array.isArray(e)) return e;
        })(e) ||
        (function (e, t) {
          if ("undefined" == typeof Symbol || !(Symbol.iterator in Object(e)))
            return;
          var n = [],
            r = !0,
            a = !1,
            o = void 0;
          try {
            for (
              var i, l = e[Symbol.iterator]();
              !(r = (i = l.next()).done) &&
              (n.push(i.value), !t || n.length !== t);
              r = !0
            );
          } catch (e) {
            (a = !0), (o = e);
          } finally {
            try {
              r || null == l.return || l.return();
            } finally {
              if (a) throw o;
            }
          }
          return n;
        })(e, t) ||
        (function (e, t) {
          if (!e) return;
          if ("string" == typeof e) return Bn(e, t);
          var n = Object.prototype.toString.call(e).slice(8, -1);
          "Object" === n && e.constructor && (n = e.constructor.name);
          if ("Map" === n || "Set" === n) return Array.from(n);
          if (
            "Arguments" === n ||
            /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
          )
            return Bn(e, t);
        })(e, t) ||
        (function () {
          throw new TypeError(
            "Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
          );
        })()
      );
    }
    function Bn(e, t) {
      (null == t || t > e.length) && (t = e.length);
      for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
      return r;
    }
    var $n = function () {
      var e = Yn(Object(r.useState)(!1), 2),
        t = e[0],
        n = e[1],
        o = Yn(Object(r.useState)(""), 2),
        i = o[0],
        l = o[1],
        u = Yn(Object(r.useState)(""), 2),
        c = u[0],
        s = u[1],
        f = Yn(Object(r.useState)(!1), 2),
        d = f[0],
        p = f[1],
        m = De(function (e) {
          return e.employees.employees;
        }),
        h = De(function (e) {
          return e.employees.positions;
        }),
        y = Pe();
      Object(r.useEffect)(function () {
        (m = y(vn())), (h = y(bn()));
      }, []);
      var g = function (e) {
          return m.filter(function (t) {
            return t.position.name === e;
          });
        },
        v = function (e) {
          p(d != e && e);
        };
      return a.a.createElement(
        "section",
        { className: "staff" },
        a.a.createElement(Hn, {
          open: t,
          onConfirm: function () {
            var e;
            n(!1),
              y(
                ((e = i),
                function (t, n) {
                  Ae.a
                    .delete("/api/employees/".concat(e, "/"), Ue(n))
                    .then(function (n) {
                      t({ type: "DELETE_EMPLOYEE", payload: e });
                    })
                    .catch(function (e) {
                      console.log(e.response);
                    });
                })
              );
          },
          message: "Are you sure you want to delete ".concat(c, "?"),
          onClose: function () {
            n(!1);
          },
        }),
        a.a.createElement("h1", { className: "title" }, "Staff Members"),
        a.a.createElement(
          "div",
          { className: "staff__buttons" },
          a.a.createElement(
            "button",
            {
              onClick: function () {
                v("Staff");
              },
              className: "btn-1 ".concat("Staff" == d ? " active" : ""),
            },
            "Add Staff"
          ),
          a.a.createElement(
            "button",
            {
              onClick: function () {
                v("Department");
              },
              className: "btn-1 ".concat("Department" == d ? " active" : ""),
            },
            "Update Departments"
          ),
          a.a.createElement(
            "button",
            {
              onClick: function () {
                v("Position");
              },
              className: "btn-1 ".concat("Position" == d ? " active" : ""),
            },
            "Add Positions"
          )
        ),
        0 != d && a.a.createElement(Wn, { form: d }),
        h.map(function (e) {
          return a.a.createElement(
            "div",
            { key: e.id },
            a.a.createElement("h1", { className: "staff__position" }, e.name),
            a.a.createElement(
              "div",
              { className: "staff__employees" },
              g(e.name).length > 0
                ? g(e.name).map(function (e) {
                    return a.a.createElement(
                      r.Fragment,
                      null,
                      a.a.createElement(
                        "div",
                        { key: e.id, className: "staff__employeeContainer" },
                        a.a.createElement(
                          "div",
                          { className: "staff__employee" },
                          a.a.createElement("p", null, e.name),
                          a.a.createElement(
                            "div",
                            { className: "delete_icon" },
                            a.a.createElement("i", {
                              onClick: function () {
                                n(!0), l(e.id), s(e.name);
                              },
                              className: "fas fa-trash",
                            })
                          )
                        ),
                        a.a.createElement(
                          "div",
                          null,
                          a.a.createElement(
                            "button",
                            {
                              onClick: function (e) {
                                var t, n;
                                (t = e.target.value),
                                  (n = document.createElement("textarea")),
                                  document.body.appendChild(n),
                                  (n.value = t),
                                  n.select(),
                                  document.execCommand("copy"),
                                  document.body.removeChild(n);
                              },
                              className: "btn-1",
                              value: e.uuid,
                            },
                            a.a.createElement("i", {
                              class: "fas fa-clipboard",
                            }),
                            " Copy UUID"
                          )
                        )
                      )
                    );
                  })
                : a.a.createElement("div", null, "No Employees Found")
            )
          );
        })
      );
    };
    function qn(e, t) {
      return (
        (function (e) {
          if (Array.isArray(e)) return e;
        })(e) ||
        (function (e, t) {
          if ("undefined" == typeof Symbol || !(Symbol.iterator in Object(e)))
            return;
          var n = [],
            r = !0,
            a = !1,
            o = void 0;
          try {
            for (
              var i, l = e[Symbol.iterator]();
              !(r = (i = l.next()).done) &&
              (n.push(i.value), !t || n.length !== t);
              r = !0
            );
          } catch (e) {
            (a = !0), (o = e);
          } finally {
            try {
              r || null == l.return || l.return();
            } finally {
              if (a) throw o;
            }
          }
          return n;
        })(e, t) ||
        (function (e, t) {
          if (!e) return;
          if ("string" == typeof e) return Vn(e, t);
          var n = Object.prototype.toString.call(e).slice(8, -1);
          "Object" === n && e.constructor && (n = e.constructor.name);
          if ("Map" === n || "Set" === n) return Array.from(n);
          if (
            "Arguments" === n ||
            /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
          )
            return Vn(e, t);
        })(e, t) ||
        (function () {
          throw new TypeError(
            "Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
          );
        })()
      );
    }
    function Vn(e, t) {
      (null == t || t > e.length) && (t = e.length);
      for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
      return r;
    }
    var Qn = function (e) {
      var t = e.date,
        n = De(function (e) {
          return e.employees.employees;
        }),
        o = De(function (e) {
          return e.errors.msg;
        }),
        i = Pe();
      Object(r.useEffect)(function () {
        n = i(vn());
      }, []);
      for (
        var l = qn(Object(r.useState)(""), 2),
          u = l[0],
          c = l[1],
          s = qn(Object(r.useState)(""), 2),
          f = s[0],
          d = s[1],
          p = qn(Object(r.useState)(""), 2),
          m = p[0],
          h = p[1],
          y = qn(Object(r.useState)(""), 2),
          g = y[0],
          v = y[1],
          b = ["00", "15", "30", "45"],
          w = [],
          E = function (e) {
            1 == e.toString().length
              ? b.map(function (t) {
                  return w.push("0" + e.toString() + ":" + t);
                })
              : b.map(function (t) {
                  return w.push(e.toString() + ":" + t);
                });
          },
          x = 0;
        x < 24;
        x++
      )
        E(x);
      return a.a.createElement(
        r.Fragment,
        null,
        a.a.createElement(
          "div",
          { className: "staffForm" },
          a.a.createElement(
            "h1",
            { style: { fontSize: "20px" } },
            "Create Shift"
          ),
          a.a.createElement(
            "form",
            {
              onSubmit: function (e) {
                e.preventDefault(),
                  i(
                    (function (e) {
                      return function (t, n) {
                        Ae.a
                          .post("/api/shifts/", e, Ue(n))
                          .then(function (e) {
                            t({ type: "ADD_SHIFT", payload: e.data }),
                              t({ type: "RESET_ERRORS" });
                          })
                          .catch(function (e) {
                            t(Ie(e.response.data, e.response.status));
                          });
                      };
                    })({
                      employee_id: u,
                      start_time: f,
                      end_time: m,
                      info: g,
                      date: t,
                    })
                  ),
                  console.log(u),
                  console.log(f),
                  console.log(m),
                  u && f && m && (c(""), d(""), h(""), v(""));
              },
              className: "staffForm__form",
            },
            a.a.createElement(
              "div",
              { className: "staffForm__control" },
              a.a.createElement(
                "label",
                { className: "staffForm__label" },
                "Employee:"
              ),
              a.a.createElement(
                "select",
                {
                  className: "staffForm__input",
                  onChange: function (e) {
                    return c(e.target.value);
                  },
                  name: "employee",
                  value: u,
                },
                a.a.createElement(
                  "option",
                  { value: "", disabled: !0, selected: !0 },
                  "Select an employee"
                ),
                n.map(function (e) {
                  return a.a.createElement(
                    "option",
                    { key: e.id, value: e.id },
                    e.name
                  );
                })
              ),
              a.a.createElement("p", { className: "error" }, o.employee_id)
            ),
            a.a.createElement(
              "div",
              { className: "staffForm__control" },
              a.a.createElement(
                "label",
                { className: "staffForm__label" },
                "Start Time:"
              ),
              a.a.createElement(
                "select",
                {
                  className: "staffForm__input",
                  onChange: function (e) {
                    return d(e.target.value);
                  },
                  name: "starttime",
                  value: f,
                },
                a.a.createElement(
                  "option",
                  { value: "", selected: !0, disabled: !0 },
                  "Select a start time"
                ),
                w.map(function (e) {
                  return a.a.createElement(
                    "option",
                    { key: e, value: "".concat(e, ":00") },
                    e
                  );
                })
              ),
              o.start_time && o.start_time[0].includes("Time has wrong format")
                ? a.a.createElement(
                    "p",
                    { className: "error" },
                    "This field may not be blank."
                  )
                : a.a.createElement("p", { className: "error" }, o.start_time)
            ),
            a.a.createElement(
              "div",
              { className: "staffForm__control" },
              a.a.createElement(
                "label",
                { className: "staffForm__label" },
                "End Time:"
              ),
              a.a.createElement(
                "select",
                {
                  className: "staffForm__input",
                  onChange: function (e) {
                    return h(e.target.value);
                  },
                  name: "endtime",
                  value: m,
                },
                a.a.createElement(
                  "option",
                  { value: "", disabled: !0, selected: !0 },
                  "Select an end time"
                ),
                a.a.createElement("option", { value: "Finish" }, "Finish"),
                w.map(function (e) {
                  return a.a.createElement("option", { key: e, value: e }, e);
                })
              ),
              a.a.createElement("p", { className: "error" }, o.end_time)
            ),
            a.a.createElement(
              "div",
              { className: "staffForm__control" },
              a.a.createElement(
                "label",
                { className: "staffForm__label" },
                "Info:"
              ),
              a.a.createElement("input", {
                className: "staffForm__input",
                type: "text",
                name: "info",
                onChange: function (e) {
                  return v(e.target.value);
                },
                value: g,
              })
            ),
            a.a.createElement("button", { className: "btn-1" }, "Create")
          )
        )
      );
    };
    function Gn(e, t) {
      return (
        (function (e) {
          if (Array.isArray(e)) return e;
        })(e) ||
        (function (e, t) {
          if ("undefined" == typeof Symbol || !(Symbol.iterator in Object(e)))
            return;
          var n = [],
            r = !0,
            a = !1,
            o = void 0;
          try {
            for (
              var i, l = e[Symbol.iterator]();
              !(r = (i = l.next()).done) &&
              (n.push(i.value), !t || n.length !== t);
              r = !0
            );
          } catch (e) {
            (a = !0), (o = e);
          } finally {
            try {
              r || null == l.return || l.return();
            } finally {
              if (a) throw o;
            }
          }
          return n;
        })(e, t) ||
        (function (e, t) {
          if (!e) return;
          if ("string" == typeof e) return Xn(e, t);
          var n = Object.prototype.toString.call(e).slice(8, -1);
          "Object" === n && e.constructor && (n = e.constructor.name);
          if ("Map" === n || "Set" === n) return Array.from(n);
          if (
            "Arguments" === n ||
            /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
          )
            return Xn(e, t);
        })(e, t) ||
        (function () {
          throw new TypeError(
            "Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
          );
        })()
      );
    }
    function Xn(e, t) {
      (null == t || t > e.length) && (t = e.length);
      for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
      return r;
    }
    var Kn = function () {
      var e,
        t = ((e = le(B).match) ? e.params : {}).date,
        n = Pe();
      Object(r.useEffect)(function () {
        n(
          (function (e) {
            return function (t, n) {
              Ae.a
                .get(
                  "/api/shifts/?date_after="
                    .concat(e, "&date_before=")
                    .concat(e, "&ordering=date,start_time"),
                  Ue(n)
                )
                .then(function (e) {
                  t({ type: "GET_DAILY_SHIFTS", payload: e.data });
                });
            };
          })(t)
        );
      }, []);
      for (
        var o = Gn(Object(r.useState)(!1), 2),
          i = o[0],
          l = o[1],
          u = Gn(Object(r.useState)(""), 2),
          c = u[0],
          s = u[1],
          f = Gn(Object(r.useState)(""), 2),
          d = f[0],
          p = f[1],
          m = Gn(Object(r.useState)(""), 2),
          h = m[0],
          y = m[1],
          g = Gn(Object(r.useState)(!1), 2),
          v = g[0],
          b = g[1],
          w = De(function (e) {
            return e.shifts.daily_shifts;
          }),
          E = [],
          x = 0;
        x <= 24;
        x++
      )
        1 == x.toString().length
          ? E.push("0" + x.toString())
          : E.push(x.toString());
      var _ = function (e) {
        return w.filter(function (t) {
          return t.start_time.substr(0, 2) === e;
        });
      };
      return a.a.createElement(
        "div",
        { class: "shiftDetail" },
        a.a.createElement(Hn, {
          open: i,
          onConfirm: function () {
            var e;
            l(!1),
              n(
                ((e = c),
                function (t, n) {
                  Ae.a
                    .delete("/api/shifts/".concat(e, "/"), Ue(n))
                    .then(function (n) {
                      t({ type: "DELETE_SHIFT", payload: e });
                    })
                    .catch(function (e) {
                      console.log(e.response);
                    });
                })
              );
          },
          message: "Are you sure you want to delete "
            .concat(d, "'s Shift (")
            .concat(h, ")?"),
          onClose: function () {
            l(!1);
          },
        }),
        a.a.createElement("h1", { className: "title" }, "Edit Rota"),
        a.a.createElement(
          "p",
          { className: "subtitle" },
          It(kn(t), "cccc do MMMM YYY")
        ),
        a.a.createElement(
          "div",
          { className: "shiftDetail__buttons" },
          a.a.createElement(
            "button",
            {
              onClick: function () {
                b(!v);
              },
              className: "btn-1 ".concat(1 == v ? " active" : ""),
            },
            "Create Shift"
          )
        ),
        1 == v && a.a.createElement(Qn, { date: t }),
        E.map(function (e) {
          return a.a.createElement(
            "div",
            null,
            _(e).length > 0 &&
              a.a.createElement(
                "div",
                { className: "shiftDetail__timeContainer" },
                a.a.createElement(
                  "h1",
                  { className: "shiftDetail__time" },
                  It(new Date().setHours(e), "haaaaa'm'"),
                  " -",
                  " ",
                  It(
                    (function (e, t) {
                      Ye(2, arguments);
                      var n = et(t);
                      return tt(e, 36e5 * n);
                    })(new Date().setHours(e), 1),
                    "haaaaa'm'"
                  )
                ),
                a.a.createElement(
                  "div",
                  { className: "shiftDetail__container" },
                  _(e).map(function (e) {
                    return a.a.createElement(
                      "div",
                      { className: "shiftDetail__shift" },
                      a.a.createElement(
                        "div",
                        { className: "shiftDetail__topContainer" },
                        a.a.createElement(
                          "p",
                          { className: "shiftDetail__employee" },
                          e.employee.name.split(" ")[0],
                          a.a.createElement(
                            "span",
                            { style: { fontWeight: "bold" } },
                            " ",
                            e.employee.name.split(" ")[1]
                          )
                        ),
                        a.a.createElement(
                          "div",
                          { className: "delete_icon" },
                          a.a.createElement("i", {
                            onClick: function () {
                              l(!0),
                                s(e.id),
                                p(e.employee.name),
                                y(
                                  ""
                                    .concat(e.start_time.substr(0, 5), " - ")
                                    .concat(e.end_time)
                                );
                            },
                            className: "fas fa-trash",
                          })
                        )
                      ),
                      a.a.createElement(
                        "div",
                        { className: "shiftDetail__shiftTime" },
                        a.a.createElement(
                          "h2",
                          null,
                          e.start_time.substr(0, 5),
                          " - ",
                          e.end_time
                        ),
                        a.a.createElement("p", null, e.info)
                      )
                    );
                  })
                )
              )
          );
        })
      );
    };
    function Jn(e, t) {
      return (
        (function (e) {
          if (Array.isArray(e)) return e;
        })(e) ||
        (function (e, t) {
          if ("undefined" == typeof Symbol || !(Symbol.iterator in Object(e)))
            return;
          var n = [],
            r = !0,
            a = !1,
            o = void 0;
          try {
            for (
              var i, l = e[Symbol.iterator]();
              !(r = (i = l.next()).done) &&
              (n.push(i.value), !t || n.length !== t);
              r = !0
            );
          } catch (e) {
            (a = !0), (o = e);
          } finally {
            try {
              r || null == l.return || l.return();
            } finally {
              if (a) throw o;
            }
          }
          return n;
        })(e, t) ||
        (function (e, t) {
          if (!e) return;
          if ("string" == typeof e) return Zn(e, t);
          var n = Object.prototype.toString.call(e).slice(8, -1);
          "Object" === n && e.constructor && (n = e.constructor.name);
          if ("Map" === n || "Set" === n) return Array.from(n);
          if (
            "Arguments" === n ||
            /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
          )
            return Zn(e, t);
        })(e, t) ||
        (function () {
          throw new TypeError(
            "Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
          );
        })()
      );
    }
    function Zn(e, t) {
      (null == t || t > e.length) && (t = e.length);
      for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
      return r;
    }
    var er = function () {
      var e = Jn(Object(r.useState)(""), 2),
        t = (e[0], e[1], Jn(Object(r.useState)(""), 2)),
        n = t[0],
        o = t[1],
        i = Jn(Object(r.useState)(""), 2),
        l = i[0],
        u = i[1],
        c = Jn(Object(r.useState)(""), 2),
        s = c[0],
        f = c[1],
        d = Jn(Object(r.useState)(""), 2),
        p = d[0],
        m = d[1],
        h = De(function (e) {
          return e.errors.msg;
        }),
        y = Pe();
      return De(function (e) {
        return e.auth.isAuthenticated;
      })
        ? a.a.createElement(X, { to: "/" })
        : a.a.createElement(
            "div",
            { className: "login" },
            a.a.createElement(
              "div",
              { className: "login__box" },
              a.a.createElement(
                "div",
                { className: "login__left" },
                a.a.createElement(
                  "form",
                  {
                    onSubmit: function (e) {
                      e.preventDefault(),
                        y(
                          (function (e) {
                            var t = e.username,
                              n = e.password,
                              r = e.password2,
                              a = e.email,
                              o = e.role;
                            return function (e) {
                              var i = JSON.stringify({
                                username: t,
                                password: n,
                                password2: r,
                                email: a,
                                role: o,
                              });
                              Ae.a
                                .post("/api/auth/register", i, {
                                  headers: {
                                    "Content-Type": "application/json",
                                  },
                                })
                                .then(function (t) {
                                  e({
                                    type: "REGISTER_SUCCESS",
                                    payload: t.data,
                                  });
                                })
                                .catch(function (t) {
                                  e(Ie(t.response.data, t.response.status)),
                                    e({ type: "REGISTER_FAIL" });
                                });
                            };
                          })({
                            username: n,
                            password: l,
                            password2: s,
                            email: n,
                            role: p,
                          })
                        );
                    },
                  },
                  a.a.createElement(
                    "div",
                    { className: "form-group" },
                    a.a.createElement("label", null, "What role are you?"),
                    a.a.createElement(
                      "div",
                      { className: "form-selector" },
                      a.a.createElement(
                        "span",
                        {
                          className: "form-control ".concat(
                            "User" == p ? " active" : ""
                          ),
                          onClick: function () {
                            m("User");
                          },
                        },
                        "Employee"
                      ),
                      a.a.createElement(
                        "span",
                        {
                          className: "form-control ".concat(
                            "Business" == p ? " active" : ""
                          ),
                          onClick: function () {
                            m("Business");
                          },
                        },
                        "Business"
                      )
                    ),
                    a.a.createElement("p", { className: "error" }, h.role)
                  ),
                  a.a.createElement(
                    "div",
                    { className: "form-group" },
                    a.a.createElement("label", null, "Email"),
                    a.a.createElement("input", {
                      type: "text",
                      className: "form-control input-1",
                      name: "email",
                      onChange: function (e) {
                        o(e.target.value);
                      },
                      value: n,
                    }),
                    a.a.createElement("p", { className: "error" }, h.username)
                  ),
                  a.a.createElement(
                    "div",
                    { className: "form-group" },
                    a.a.createElement("label", null, "Password"),
                    a.a.createElement("input", {
                      type: "password",
                      className: "form-control input-1",
                      name: "password",
                      onChange: function (e) {
                        u(e.target.value);
                      },
                      value: l,
                    }),
                    a.a.createElement("p", { className: "error" }, h.password)
                  ),
                  a.a.createElement(
                    "div",
                    { className: "form-group" },
                    a.a.createElement("label", null, "Confirm Password"),
                    a.a.createElement("input", {
                      type: "password",
                      className: "form-control input-1",
                      name: "password",
                      onChange: function (e) {
                        f(e.target.value);
                      },
                      value: s,
                    }),
                    a.a.createElement("p", { className: "error" }, h.password2)
                  ),
                  a.a.createElement(
                    "div",
                    { className: "form-group" },
                    a.a.createElement(
                      "button",
                      { type: "submit", className: "btn-2" },
                      "Register"
                    )
                  ),
                  a.a.createElement(
                    "p",
                    { className: "login__leftExtra" },
                    "Already have an account? ",
                    a.a.createElement(me, { to: "/login" }, "Login")
                  )
                )
              ),
              a.a.createElement(
                "div",
                { className: "login__right" },
                "Register"
              )
            )
          );
    };
    function tr(e, t) {
      return (
        (function (e) {
          if (Array.isArray(e)) return e;
        })(e) ||
        (function (e, t) {
          if ("undefined" == typeof Symbol || !(Symbol.iterator in Object(e)))
            return;
          var n = [],
            r = !0,
            a = !1,
            o = void 0;
          try {
            for (
              var i, l = e[Symbol.iterator]();
              !(r = (i = l.next()).done) &&
              (n.push(i.value), !t || n.length !== t);
              r = !0
            );
          } catch (e) {
            (a = !0), (o = e);
          } finally {
            try {
              r || null == l.return || l.return();
            } finally {
              if (a) throw o;
            }
          }
          return n;
        })(e, t) ||
        (function (e, t) {
          if (!e) return;
          if ("string" == typeof e) return nr(e, t);
          var n = Object.prototype.toString.call(e).slice(8, -1);
          "Object" === n && e.constructor && (n = e.constructor.name);
          if ("Map" === n || "Set" === n) return Array.from(n);
          if (
            "Arguments" === n ||
            /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
          )
            return nr(e, t);
        })(e, t) ||
        (function () {
          throw new TypeError(
            "Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
          );
        })()
      );
    }
    function nr(e, t) {
      (null == t || t > e.length) && (t = e.length);
      for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
      return r;
    }
    var rr = function () {
      var e = tr(Object(r.useState)(""), 2),
        t = e[0],
        n = e[1],
        o = tr(Object(r.useState)(""), 2),
        i = o[0],
        l = o[1],
        u = De(function (e) {
          return e.errors.msg;
        }),
        c = Pe();
      return De(function (e) {
        return e.auth.isAuthenticated;
      })
        ? a.a.createElement(X, { to: "/" })
        : a.a.createElement(
            "div",
            { className: "login" },
            a.a.createElement(
              "div",
              { className: "login__box" },
              a.a.createElement(
                "div",
                { className: "login__left" },
                a.a.createElement(
                  "form",
                  {
                    onSubmit: function (e) {
                      e.preventDefault(),
                        c(
                          (function (e, t) {
                            return function (n) {
                              var r = JSON.stringify({
                                username: e,
                                password: t,
                              });
                              Ae.a
                                .post("/api/auth/login", r, {
                                  headers: {
                                    "Content-Type": "application/json",
                                  },
                                })
                                .then(function (e) {
                                  n({ type: "LOGIN_SUCCESS", payload: e.data });
                                })
                                .catch(function (e) {
                                  n(Ie(e.response.data, e.response.status)),
                                    n({ type: "LOGIN_FAIL" });
                                });
                            };
                          })(t, i)
                        );
                    },
                  },
                  a.a.createElement(
                    "div",
                    { className: "form-group" },
                    a.a.createElement("label", null, "Email"),
                    a.a.createElement("input", {
                      type: "email",
                      className: "form-control input-1",
                      name: "username",
                      onChange: function (e) {
                        n(e.target.value);
                      },
                      value: t,
                    }),
                    a.a.createElement("p", { className: "error" }, u.username)
                  ),
                  a.a.createElement(
                    "div",
                    { className: "form-group" },
                    a.a.createElement("label", null, "Password"),
                    a.a.createElement("input", {
                      type: "password",
                      className: "form-control input-1",
                      name: "password",
                      onChange: function (e) {
                        l(e.target.value);
                      },
                      value: i,
                    }),
                    a.a.createElement("p", { className: "error" }, u.password),
                    a.a.createElement(
                      "p",
                      { className: "error" },
                      u.non_field_errors
                    )
                  ),
                  a.a.createElement(
                    "div",
                    { className: "form-group" },
                    a.a.createElement(
                      "button",
                      { type: "submit", className: "btn-2" },
                      "Login"
                    )
                  ),
                  a.a.createElement(
                    "p",
                    { className: "login__leftExtra" },
                    "Don't have an account? ",
                    a.a.createElement(me, { to: "/register" }, "Register")
                  )
                )
              ),
              a.a.createElement("div", { className: "login__right" }, "Login")
            )
          );
    };
    function ar() {
      return (ar =
        Object.assign ||
        function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n)
              Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
          }
          return e;
        }).apply(this, arguments);
    }
    function or(e, t) {
      if (null == e) return {};
      var n,
        r,
        a = (function (e, t) {
          if (null == e) return {};
          var n,
            r,
            a = {},
            o = Object.keys(e);
          for (r = 0; r < o.length; r++)
            (n = o[r]), t.indexOf(n) >= 0 || (a[n] = e[n]);
          return a;
        })(e, t);
      if (Object.getOwnPropertySymbols) {
        var o = Object.getOwnPropertySymbols(e);
        for (r = 0; r < o.length; r++)
          (n = o[r]),
            t.indexOf(n) >= 0 ||
              (Object.prototype.propertyIsEnumerable.call(e, n) &&
                (a[n] = e[n]));
      }
      return a;
    }
    var ir = function (e) {
      var t = e.component,
        n = or(e, ["component"]),
        r = De(function (e) {
          return e.auth;
        });
      return a.a.createElement(
        ee,
        ar({}, n, {
          render: function (e) {
            return r.isLoading
              ? a.a.createElement("h2", null, "Loading...")
              : r.isAuthenticated
              ? a.a.createElement(t, e)
              : a.a.createElement(X, { to: "/login" });
          },
        })
      );
    };
    function lr(e, t) {
      return (
        (function (e) {
          if (Array.isArray(e)) return e;
        })(e) ||
        (function (e, t) {
          if ("undefined" == typeof Symbol || !(Symbol.iterator in Object(e)))
            return;
          var n = [],
            r = !0,
            a = !1,
            o = void 0;
          try {
            for (
              var i, l = e[Symbol.iterator]();
              !(r = (i = l.next()).done) &&
              (n.push(i.value), !t || n.length !== t);
              r = !0
            );
          } catch (e) {
            (a = !0), (o = e);
          } finally {
            try {
              r || null == l.return || l.return();
            } finally {
              if (a) throw o;
            }
          }
          return n;
        })(e, t) ||
        (function (e, t) {
          if (!e) return;
          if ("string" == typeof e) return ur(e, t);
          var n = Object.prototype.toString.call(e).slice(8, -1);
          "Object" === n && e.constructor && (n = e.constructor.name);
          if ("Map" === n || "Set" === n) return Array.from(n);
          if (
            "Arguments" === n ||
            /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
          )
            return ur(e, t);
        })(e, t) ||
        (function () {
          throw new TypeError(
            "Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
          );
        })()
      );
    }
    function ur(e, t) {
      (null == t || t > e.length) && (t = e.length);
      for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
      return r;
    }
    var cr = function () {
      var e = Pe(),
        t = lr(
          Object(r.useState)(
            (function (e, t) {
              Ye(1, arguments);
              var n = t || {},
                r = n.locale,
                a = r && r.options && r.options.weekStartsOn,
                o = null == a ? 0 : et(a),
                i = null == n.weekStartsOn ? o : et(n.weekStartsOn);
              if (!(i >= 0 && i <= 6))
                throw new RangeError(
                  "weekStartsOn must be between 0 and 6 inclusively"
                );
              var l = Be(e),
                u = l.getDay(),
                c = (u < i ? 7 : 0) + u - i;
              return l.setDate(l.getDate() - c), l.setHours(0, 0, 0, 0), l;
            })(new Date(), { weekStartsOn: 1 })
          ),
          2
        ),
        n = t[0],
        o = (t[1], lr(Object(r.useState)(Lt(n, 6)), 2)),
        i = o[0],
        l = o[1],
        u = De(function (e) {
          return e.auth.user;
        }),
        c = De(function (e) {
          return e.shifts.user_shifts;
        }),
        s = It(i, "YYY-MM-dd"),
        f = It(n, "YYY-MM-dd");
      Object(r.useEffect)(function () {
        c = e(gn(f, s, u.employee[0].id));
      }, []);
      var d = wn({ start: n, end: i }),
        p = function (e) {
          return c.filter(function (t) {
            return t.employee.id === u.employee[0].id && t.date === e;
          });
        };
      return a.a.createElement(
        r.Fragment,
        null,
        a.a.createElement(
          "div",
          { className: "yourRota" },
          a.a.createElement("h1", { className: "title" }, "Your Rota"),
          a.a.createElement(
            "select",
            {
              onChange: function (t) {
                e(
                  gn(
                    f,
                    It(Lt(n, t.target.value), "YYY-MM-dd"),
                    u.employee[0].id
                  )
                ),
                  l(Lt(n, t.target.value));
              },
              className: "yourRota__select",
            },
            a.a.createElement("option", { value: "6" }, "Week View"),
            a.a.createElement("option", { value: "31" }, "Month View")
          )
        ),
        a.a.createElement(
          "div",
          { className: "userShift" },
          a.a.createElement(
            "div",
            { className: "userShift__container" },
            d.map(function (e) {
              return a.a.createElement(
                r.Fragment,
                null,
                p(It(e, "YYY-MM-dd")).length > 0
                  ? a.a.createElement(
                      "div",
                      { className: "userShift__wrapper" },
                      a.a.createElement("p", null, It(e, "cccc do MMMM")),
                      p(It(e, "YYY-MM-dd")).map(function (e) {
                        return a.a.createElement(
                          "p",
                          { className: "userShift__time" },
                          e.start_time.substr(0, 5),
                          " - ",
                          e.end_time
                        );
                      })
                    )
                  : a.a.createElement(
                      "div",
                      { className: "userShift__wrapper userShift__noshift" },
                      a.a.createElement("p", null, It(e, "cccc do MMMM")),
                      a.a.createElement(
                        "p",
                        { className: "userShift__time" },
                        "No Shift"
                      )
                    )
              );
            })
          )
        )
      );
    };
    function sr(e, t) {
      return (
        (function (e) {
          if (Array.isArray(e)) return e;
        })(e) ||
        (function (e, t) {
          if ("undefined" == typeof Symbol || !(Symbol.iterator in Object(e)))
            return;
          var n = [],
            r = !0,
            a = !1,
            o = void 0;
          try {
            for (
              var i, l = e[Symbol.iterator]();
              !(r = (i = l.next()).done) &&
              (n.push(i.value), !t || n.length !== t);
              r = !0
            );
          } catch (e) {
            (a = !0), (o = e);
          } finally {
            try {
              r || null == l.return || l.return();
            } finally {
              if (a) throw o;
            }
          }
          return n;
        })(e, t) ||
        (function (e, t) {
          if (!e) return;
          if ("string" == typeof e) return fr(e, t);
          var n = Object.prototype.toString.call(e).slice(8, -1);
          "Object" === n && e.constructor && (n = e.constructor.name);
          if ("Map" === n || "Set" === n) return Array.from(n);
          if (
            "Arguments" === n ||
            /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
          )
            return fr(e, t);
        })(e, t) ||
        (function () {
          throw new TypeError(
            "Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
          );
        })()
      );
    }
    function fr(e, t) {
      (null == t || t > e.length) && (t = e.length);
      for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
      return r;
    }
    var dr = function () {
      var e = sr(Object(r.useState)(""), 2),
        t = e[0],
        n = e[1],
        o = De(function (e) {
          return e.auth.user;
        }),
        i = Pe();
      return a.a.createElement(
        "div",
        { className: "enterid" },
        a.a.createElement(
          "div",
          { className: "enterid__box" },
          a.a.createElement(
            "h1",
            null,
            "You are not currently associated with a business."
          ),
          a.a.createElement(
            "form",
            null,
            a.a.createElement("label", null, "Enter your unique ID"),
            a.a.createElement("input", {
              type: "text",
              className: "input-1",
              value: t,
              onChange: function (e) {
                n(e.target.value);
              },
            }),
            a.a.createElement(
              "button",
              {
                className: "btn-2",
                onClick: function () {
                  i(
                    (function (e, t) {
                      return function (n, r) {
                        Ae.a
                          .get("/api-view/checkuuid", {
                            params: { uuid: e, userid: t },
                          })
                          .then(function (e) {
                            console.log(e.data);
                          })
                          .catch(function (e) {
                            return console.log(e.response);
                          });
                      };
                    })(t, o.id)
                  );
                },
              },
              "Connect"
            )
          )
        )
      );
    };
    function pr(e, t) {
      return (
        (function (e) {
          if (Array.isArray(e)) return e;
        })(e) ||
        (function (e, t) {
          if ("undefined" == typeof Symbol || !(Symbol.iterator in Object(e)))
            return;
          var n = [],
            r = !0,
            a = !1,
            o = void 0;
          try {
            for (
              var i, l = e[Symbol.iterator]();
              !(r = (i = l.next()).done) &&
              (n.push(i.value), !t || n.length !== t);
              r = !0
            );
          } catch (e) {
            (a = !0), (o = e);
          } finally {
            try {
              r || null == l.return || l.return();
            } finally {
              if (a) throw o;
            }
          }
          return n;
        })(e, t) ||
        (function (e, t) {
          if (!e) return;
          if ("string" == typeof e) return mr(e, t);
          var n = Object.prototype.toString.call(e).slice(8, -1);
          "Object" === n && e.constructor && (n = e.constructor.name);
          if ("Map" === n || "Set" === n) return Array.from(n);
          if (
            "Arguments" === n ||
            /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
          )
            return mr(e, t);
        })(e, t) ||
        (function () {
          throw new TypeError(
            "Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
          );
        })()
      );
    }
    function mr(e, t) {
      (null == t || t > e.length) && (t = e.length);
      for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
      return r;
    }
    var hr = function () {
        var e = pr(Object(r.useState)(!1), 2),
          t =
            (e[0],
            e[1],
            De(function (e) {
              return e.auth.user;
            }));
        return a.a.createElement(
          r.Fragment,
          null,
          "Business" == t.profile.role
            ? a.a.createElement(Ln, null)
            : t.employee.length > 0
            ? a.a.createElement(cr, null)
            : a.a.createElement(dr, null)
        );
      },
      yr = function () {
        return (
          Object(r.useEffect)(function () {
            hn.dispatch(function (e, t) {
              e({ type: "USER_LOADING" });
              var n = t().auth.token,
                r = { headers: { "Content-Type": "application/json" } };
              n && (r.headers.Authorization = "Token ".concat(n)),
                Ae.a
                  .get("/api/auth/user", r)
                  .then(function (t) {
                    e({ type: "USER_LOADED", payload: t.data });
                  })
                  .catch(function (t) {
                    e(Ie(t.response.data, t.response.status)),
                      e({ type: "AUTH_ERROR" });
                  });
            }),
              window.addEventListener("resize", function () {
                var e;
                hn.dispatch(
                  ((e = window.innerWidth),
                  function (t) {
                    t({ type: "SET_WIDTH", width: e });
                  })
                );
              });
          }, []),
          a.a.createElement(
            xe,
            { store: hn },
            a.a.createElement(
              ue,
              null,
              a.a.createElement(
                "div",
                { className: "App" },
                a.a.createElement(Le, null),
                a.a.createElement(
                  ie,
                  null,
                  a.a.createElement(ir, {
                    path: "/",
                    exact: !0,
                    component: hr,
                  }),
                  a.a.createElement(ir, {
                    path: "/rota",
                    exact: !0,
                    component: Ln,
                  }),
                  a.a.createElement(ee, { path: "/register", component: er }),
                  a.a.createElement(ee, { path: "/login", component: rr }),
                  a.a.createElement(ir, { path: "/staff", component: $n }),
                  a.a.createElement(ir, { path: "/shift/:date", component: Kn })
                )
              )
            )
          )
        );
      };
    i.a.render(a.a.createElement(yr, null), document.getElementById("app"));
  },
]);
