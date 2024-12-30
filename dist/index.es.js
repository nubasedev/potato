import He, { forwardRef as Q, createElement as F, useState as le, useCallback as de, useEffect as Ve, useRef as Ge } from "react";
const Ue = { zh: "预览", "zh-CN": "预览" }, Je = { zh: "编辑", "zh-CN": "编辑" }, Xe = {
  "Add a link": { zh: "附加链接", "zh-CN": "附加链接" },
  "Add bold text": { zh: "附加粗体", "zh-CN": "附加粗体" },
  "Add checked list": { zh: "附加任务列表", "zh-CN": "附加任务列表" },
  "Add header": { zh: "附加标题", "zh-CN": "附加标题" },
  "Add image": { zh: "附加图像", "zh-CN": "附加图像" },
  "Add italic text": { zh: "附加斜体", "zh-CN": "附加斜体" },
  "Add ordered list": { zh: "附加有序列表", "zh-CN": "附加有序列表" },
  "Add strikethrough text": { zh: "附加删除线", "zh-CN": "附加删除线" },
  "Add unordered list": { zh: "附加无序列表", "zh-CN": "附加无序列表" },
  "Insert a quote": { zh: "附加引用", "zh-CN": "附加引用" },
  "Insert code": { zh: "附加代码", "zh-CN": "附加代码" },
  Preview: Ue,
  Write: Je
};
class Fe {
  langId = "";
  setLangId = (t) => {
    this.langId = t;
  };
  gettext = (t, r = "") => {
    if (!this.langId)
      return t;
    const s = `${r || ""}${t}`;
    return Xe?.[s]?.[this.langId] ?? t;
  };
}
const h = new Fe();
function Qe(n, t) {
  if (!n)
    throw Error("Argument 'text' should be truthy");
  const r = (a) => a === " " || a.charCodeAt(0) === 10;
  let s = 0, o = n.length;
  for (let a = t; a - 1 > -1; a--)
    if (r(n[a - 1])) {
      s = a;
      break;
    }
  for (let a = t; a < n.length; a++)
    if (r(n[a])) {
      o = a;
      break;
    }
  return { start: s, end: o };
}
function j({ text: n, selection: t }) {
  return n && n.length && t.start === t.end ? Qe(n, t.start) : t;
}
function ue(n = "", t) {
  if (t === 0)
    return 0;
  let r = 2, s = !0;
  for (let o = t - 1; o >= 0 && r >= 0; o--)
    switch (n.charCodeAt(o)) {
      case 32:
        continue;
      case 10:
        r--, s = !1;
        break;
      default:
        return r;
    }
  return s ? 0 : r;
}
function fe(n = "", t) {
  if (t === n.length - 1)
    return 0;
  let r = 2, s = !0;
  for (let o = t; o < n.length && r >= 0; o++)
    switch (n.charCodeAt(o)) {
      case 32:
        continue;
      case 10: {
        r--, s = !1;
        break;
      }
      default:
        return r;
    }
  return s ? 0 : r;
}
const Ze = () => ({
  buttonProps: {
    "aria-label": h.gettext("Add bold text"),
    title: h.gettext("Add bold text")
  },
  execute: ({ initialState: n, textApi: t, setText: r }) => {
    const s = j({
      text: n.text,
      selection: n.selection
    }), o = t.setSelectionRange(s), a = t.replaceSelection(`**${o.selectedText}**`);
    r(
      t.setSelectionRange({
        start: a.selection.end - 2 - o.selectedText.length,
        end: a.selection.end - 2
      }).text
    );
  },
  handleKeyCommand: (n) => (n.ctrlKey || n.metaKey) && n.key === "b"
}), De = () => ({
  buttonProps: {
    "aria-label": h.gettext("Insert code"),
    title: h.gettext("Insert code")
  },
  execute: ({ initialState: n, textApi: t, setText: r }) => {
    const s = j({
      text: n.text,
      selection: n.selection
    }), o = t.setSelectionRange(s);
    if (o.selectedText.indexOf(`
`) === -1) {
      t.replaceSelection(`\`${o.selectedText}\``);
      const b = o.selection.start + 1, C = b + o.selectedText.length;
      t.setSelectionRange({
        start: b,
        end: C
      });
      return;
    }
    const a = ue(
      o.text,
      o.selection.start
    ), d = Array(a + 1).join(`
`), f = fe(
      o.text,
      o.selection.end
    ), v = Array(f + 1).join(`
`);
    t.replaceSelection(
      `${d}\`\`\`
${o.selectedText}
\`\`\`${v}`
    );
    const m = o.selection.start + a + 4, p = m + o.selectedText.length;
    r(
      t.setSelectionRange({
        start: m,
        end: p
      }).text
    );
  }
}), et = (n, t, r) => {
  const s = j({
    text: n.text,
    selection: n.selection
  }), o = t.setSelectionRange(s), a = t.replaceSelection(`${r}${o.selectedText}`);
  return t.setSelectionRange({
    start: a.selection.end - o.selectedText.length,
    end: a.selection.end
  });
}, tt = () => ({
  buttonProps: {
    "aria-label": h.gettext("Add header"),
    title: h.gettext("Add header")
  },
  execute: ({ initialState: n, textApi: t, setText: r }) => {
    r(et(n, t, "### ").text);
  }
}), nt = () => ({
  buttonProps: {
    "aria-label": h.gettext("Add image"),
    title: h.gettext("Add image")
  },
  execute: ({ initialState: n, textApi: t, setText: r }) => {
    const s = t.setSelectionRange(
      j({
        text: n.text,
        selection: n.selection
      })
    ), o = s.selectedText || "https://example.com/your-image.png";
    t.replaceSelection(`![](${o})`), r(
      t.setSelectionRange({
        start: s.selection.start + 4,
        end: s.selection.start + 4 + o.length
      }).text
    );
  }
}), ot = () => ({
  buttonProps: {
    "aria-label": h.gettext("Add italic text"),
    title: h.gettext("Add italic text")
  },
  execute: ({ initialState: n, textApi: t, setText: r }) => {
    const s = j({
      text: n.text,
      selection: n.selection
    }), o = t.setSelectionRange(s), a = t.replaceSelection(`*${o.selectedText}*`);
    r(
      t.setSelectionRange({
        start: a.selection.end - 1 - o.selectedText.length,
        end: a.selection.end - 1
      }).text
    );
  },
  handleKeyCommand: (n) => (n.ctrlKey || n.metaKey) && n.key === "i"
}), rt = () => ({
  buttonProps: {
    "aria-label": h.gettext("Add a link"),
    title: h.gettext("Add a link")
  },
  execute: ({ initialState: n, textApi: t, setText: r }) => {
    const s = j({
      text: n.text,
      selection: n.selection
    }), o = t.setSelectionRange(s), a = t.replaceSelection(`[${o.selectedText}](url)`);
    r(
      t.setSelectionRange({
        start: a.selection.end - 6 - o.selectedText.length,
        end: a.selection.end - 6
      }).text
    );
  },
  handleKeyCommand: (n) => (n.ctrlKey || n.metaKey) && n.key === "k"
});
function at(n, t) {
  const r = n.split(/\n/);
  let s = 0;
  return { modifiedText: r.map((a, d) => {
    if (typeof t == "string")
      return s += t.length, t + a;
    if (typeof t == "function") {
      const f = t(a, d);
      return s += f.length, t(a, d) + a;
    }
    throw Error("insertion is expected to be either a string or a function");
  }).join(`
`), insertionLength: s };
}
const me = (n, t, r) => {
  const s = j({
    text: n.text,
    selection: n.selection
  }), o = t.setSelectionRange(s), a = ue(
    o.text,
    o.selection.start
  ), d = Array(a + 1).join(`
`), f = fe(
    o.text,
    o.selection.end
  ), v = Array(f + 1).join(`
`), m = at(o.selectedText, r);
  t.replaceSelection(
    `${d}${m.modifiedText}${v}`
  );
  const p = o.selectedText.indexOf(`
`) === -1 ? m.insertionLength : 0, b = o.selection.start + a + p, C = b + m.modifiedText.length - p;
  return t.setSelectionRange({
    start: b,
    end: C
  });
}, st = () => ({
  buttonProps: {
    "aria-label": h.gettext("Add unordered list"),
    title: h.gettext("Add unordered list")
  },
  execute: ({ initialState: n, textApi: t, setText: r }) => {
    r(me(n, t, "- ").text);
  }
}), ct = () => ({
  buttonProps: {
    "aria-label": h.gettext("Add ordered list"),
    title: h.gettext("Add ordered list")
  },
  execute: ({ initialState: n, textApi: t, setText: r }) => {
    r(
      me(n, t, (s, o) => `${o + 1}. `).text
    );
  }
}), it = () => ({
  buttonProps: {
    "aria-label": h.gettext("Add checked list"),
    title: h.gettext("Add checked list")
  },
  execute: ({ initialState: n, textApi: t, setText: r }) => {
    r(me(n, t, () => "- [ ] ").text);
  }
}), lt = () => ({
  buttonProps: {
    "aria-label": h.gettext("Insert a quote"),
    title: h.gettext("Insert a quote")
  },
  execute: ({ initialState: n, textApi: t, setText: r }) => {
    const s = j({
      text: n.text,
      selection: n.selection
    }), o = t.setSelectionRange(s), a = ue(
      o.text,
      o.selection.start
    ), d = Array(a + 1).join(`
`), f = fe(
      o.text,
      o.selection.end
    ), v = Array(f + 1).join(`
`);
    t.replaceSelection(
      `${d}> ${o.selectedText}${v}`
    );
    const m = o.selection.start + a + 2, p = m + o.selectedText.length;
    r(
      t.setSelectionRange({
        start: m,
        end: p
      }).text
    );
  }
}), dt = () => ({
  buttonProps: {
    "aria-label": h.gettext("Add strikethrough text"),
    title: h.gettext("Add strikethrough text")
  },
  execute: ({ initialState: n, textApi: t, setText: r }) => {
    const s = j({
      text: n.text,
      selection: n.selection
    }), o = t.setSelectionRange(s), a = t.replaceSelection(`~~${o.selectedText}~~`);
    r(
      t.setSelectionRange({
        start: a.selection.end - 2 - o.selectedText.length,
        end: a.selection.end - 2
      }).text
    );
  }
}), ut = () => [
  ["header", "bold", "italic", "strikethrough"],
  ["link", "quote", "code", "image"],
  ["unorderedList", "orderedList", "checkedList"]
], ze = () => ({
  header: tt,
  bold: Ze,
  italic: ot,
  strikethrough: dt,
  link: rt,
  quote: lt,
  code: De,
  image: nt,
  unorderedList: st,
  orderedList: ct,
  checkedList: it
});
function ft() {
  return "save-image";
}
var J = { exports: {} }, H = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Re;
function mt() {
  if (Re) return H;
  Re = 1;
  var n = Symbol.for("react.transitional.element"), t = Symbol.for("react.fragment");
  function r(s, o, a) {
    var d = null;
    if (a !== void 0 && (d = "" + a), o.key !== void 0 && (d = "" + o.key), "key" in o) {
      a = {};
      for (var f in o)
        f !== "key" && (a[f] = o[f]);
    } else a = o;
    return o = a.ref, {
      $$typeof: n,
      type: s,
      key: d,
      ref: o !== void 0 ? o : null,
      props: a
    };
  }
  return H.Fragment = t, H.jsx = r, H.jsxs = r, H;
}
var V = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Ne;
function ht() {
  return Ne || (Ne = 1, process.env.NODE_ENV !== "production" && function() {
    function n(e) {
      if (e == null) return null;
      if (typeof e == "function")
        return e.$$typeof === Ye ? null : e.displayName || e.name || null;
      if (typeof e == "string") return e;
      switch (e) {
        case E:
          return "Fragment";
        case D:
          return "Portal";
        case R:
          return "Profiler";
        case z:
          return "StrictMode";
        case te:
          return "Suspense";
        case ne:
          return "SuspenseList";
      }
      if (typeof e == "object")
        switch (typeof e.tag == "number" && console.error(
          "Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."
        ), e.$$typeof) {
          case ge:
            return (e.displayName || "Context") + ".Provider";
          case he:
            return (e._context.displayName || "Context") + ".Consumer";
          case ee:
            var c = e.render;
            return e = e.displayName, e || (e = c.displayName || c.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
          case oe:
            return c = e.displayName || null, c !== null ? c : n(e.type) || "Memo";
          case re:
            c = e._payload, e = e._init;
            try {
              return n(e(c));
            } catch {
            }
        }
      return null;
    }
    function t(e) {
      return "" + e;
    }
    function r(e) {
      try {
        t(e);
        var c = !1;
      } catch {
        c = !0;
      }
      if (c) {
        c = console;
        var i = c.error, u = typeof Symbol == "function" && Symbol.toStringTag && e[Symbol.toStringTag] || e.constructor.name || "Object";
        return i.call(
          c,
          "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.",
          u
        ), t(e);
      }
    }
    function s() {
    }
    function o() {
      if (W === 0) {
        ve = console.log, pe = console.info, ye = console.warn, ke = console.error, Ce = console.group, Ee = console.groupCollapsed, Te = console.groupEnd;
        var e = {
          configurable: !0,
          enumerable: !0,
          value: s,
          writable: !0
        };
        Object.defineProperties(console, {
          info: e,
          log: e,
          warn: e,
          error: e,
          group: e,
          groupCollapsed: e,
          groupEnd: e
        });
      }
      W++;
    }
    function a() {
      if (W--, W === 0) {
        var e = { configurable: !0, enumerable: !0, writable: !0 };
        Object.defineProperties(console, {
          log: M({}, e, { value: ve }),
          info: M({}, e, { value: pe }),
          warn: M({}, e, { value: ye }),
          error: M({}, e, { value: ke }),
          group: M({}, e, { value: Ce }),
          groupCollapsed: M({}, e, { value: Ee }),
          groupEnd: M({}, e, { value: Te })
        });
      }
      0 > W && console.error(
        "disabledDepth fell below zero. This is a bug in React. Please file an issue."
      );
    }
    function d(e) {
      if (se === void 0)
        try {
          throw Error();
        } catch (i) {
          var c = i.stack.trim().match(/\n( *(at )?)/);
          se = c && c[1] || "", we = -1 < i.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < i.stack.indexOf("@") ? "@unknown:0:0" : "";
        }
      return `
` + se + e + we;
    }
    function f(e, c) {
      if (!e || ce) return "";
      var i = ie.get(e);
      if (i !== void 0) return i;
      ce = !0, i = Error.prepareStackTrace, Error.prepareStackTrace = void 0;
      var u = null;
      u = N.H, N.H = null, o();
      try {
        var y = {
          DetermineComponentFrameRoot: function() {
            try {
              if (c) {
                var A = function() {
                  throw Error();
                };
                if (Object.defineProperty(A.prototype, "props", {
                  set: function() {
                    throw Error();
                  }
                }), typeof Reflect == "object" && Reflect.construct) {
                  try {
                    Reflect.construct(A, []);
                  } catch (_) {
                    var U = _;
                  }
                  Reflect.construct(e, [], A);
                } else {
                  try {
                    A.call();
                  } catch (_) {
                    U = _;
                  }
                  e.call(A.prototype);
                }
              } else {
                try {
                  throw Error();
                } catch (_) {
                  U = _;
                }
                (A = e()) && typeof A.catch == "function" && A.catch(function() {
                });
              }
            } catch (_) {
              if (_ && U && typeof _.stack == "string")
                return [_.stack, U.stack];
            }
            return [null, null];
          }
        };
        y.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
        var g = Object.getOwnPropertyDescriptor(
          y.DetermineComponentFrameRoot,
          "name"
        );
        g && g.configurable && Object.defineProperty(
          y.DetermineComponentFrameRoot,
          "name",
          { value: "DetermineComponentFrameRoot" }
        );
        var l = y.DetermineComponentFrameRoot(), S = l[0], L = l[1];
        if (S && L) {
          var k = S.split(`
`), O = L.split(`
`);
          for (l = g = 0; g < k.length && !k[g].includes(
            "DetermineComponentFrameRoot"
          ); )
            g++;
          for (; l < O.length && !O[l].includes(
            "DetermineComponentFrameRoot"
          ); )
            l++;
          if (g === k.length || l === O.length)
            for (g = k.length - 1, l = O.length - 1; 1 <= g && 0 <= l && k[g] !== O[l]; )
              l--;
          for (; 1 <= g && 0 <= l; g--, l--)
            if (k[g] !== O[l]) {
              if (g !== 1 || l !== 1)
                do
                  if (g--, l--, 0 > l || k[g] !== O[l]) {
                    var K = `
` + k[g].replace(
                      " at new ",
                      " at "
                    );
                    return e.displayName && K.includes("<anonymous>") && (K = K.replace("<anonymous>", e.displayName)), typeof e == "function" && ie.set(e, K), K;
                  }
                while (1 <= g && 0 <= l);
              break;
            }
        }
      } finally {
        ce = !1, N.H = u, a(), Error.prepareStackTrace = i;
      }
      return k = (k = e ? e.displayName || e.name : "") ? d(k) : "", typeof e == "function" && ie.set(e, k), k;
    }
    function v(e) {
      if (e == null) return "";
      if (typeof e == "function") {
        var c = e.prototype;
        return f(
          e,
          !(!c || !c.isReactComponent)
        );
      }
      if (typeof e == "string") return d(e);
      switch (e) {
        case te:
          return d("Suspense");
        case ne:
          return d("SuspenseList");
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case ee:
            return e = f(e.render, !1), e;
          case oe:
            return v(e.type);
          case re:
            c = e._payload, e = e._init;
            try {
              return v(e(c));
            } catch {
            }
        }
      return "";
    }
    function m() {
      var e = N.A;
      return e === null ? null : e.getOwner();
    }
    function p(e) {
      if (be.call(e, "key")) {
        var c = Object.getOwnPropertyDescriptor(e, "key").get;
        if (c && c.isReactWarning) return !1;
      }
      return e.key !== void 0;
    }
    function b(e, c) {
      function i() {
        Se || (Se = !0, console.error(
          "%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)",
          c
        ));
      }
      i.isReactWarning = !0, Object.defineProperty(e, "key", {
        get: i,
        configurable: !0
      });
    }
    function C() {
      var e = n(this.type);
      return _e[e] || (_e[e] = !0, console.error(
        "Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."
      )), e = this.props.ref, e !== void 0 ? e : null;
    }
    function w(e, c, i, u, y, g) {
      return i = g.ref, e = {
        $$typeof: Y,
        type: e,
        key: c,
        props: g,
        _owner: y
      }, (i !== void 0 ? i : null) !== null ? Object.defineProperty(e, "ref", {
        enumerable: !1,
        get: C
      }) : Object.defineProperty(e, "ref", { enumerable: !1, value: null }), e._store = {}, Object.defineProperty(e._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: 0
      }), Object.defineProperty(e, "_debugInfo", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: null
      }), Object.freeze && (Object.freeze(e.props), Object.freeze(e)), e;
    }
    function P(e, c, i, u, y, g) {
      if (typeof e == "string" || typeof e == "function" || e === E || e === R || e === z || e === te || e === ne || e === qe || typeof e == "object" && e !== null && (e.$$typeof === re || e.$$typeof === oe || e.$$typeof === ge || e.$$typeof === he || e.$$typeof === ee || e.$$typeof === We || e.getModuleId !== void 0)) {
        var l = c.children;
        if (l !== void 0)
          if (u)
            if (ae(l)) {
              for (u = 0; u < l.length; u++)
                G(l[u], e);
              Object.freeze && Object.freeze(l);
            } else
              console.error(
                "React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead."
              );
          else G(l, e);
      } else
        l = "", (e === void 0 || typeof e == "object" && e !== null && Object.keys(e).length === 0) && (l += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports."), e === null ? u = "null" : ae(e) ? u = "array" : e !== void 0 && e.$$typeof === Y ? (u = "<" + (n(e.type) || "Unknown") + " />", l = " Did you accidentally export a JSX literal instead of a component?") : u = typeof e, console.error(
          "React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s",
          u,
          l
        );
      if (be.call(c, "key")) {
        l = n(e);
        var S = Object.keys(c).filter(function(k) {
          return k !== "key";
        });
        u = 0 < S.length ? "{key: someKey, " + S.join(": ..., ") + ": ...}" : "{key: someKey}", je[l + u] || (S = 0 < S.length ? "{" + S.join(": ..., ") + ": ...}" : "{}", console.error(
          `A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`,
          u,
          l,
          S,
          l
        ), je[l + u] = !0);
      }
      if (l = null, i !== void 0 && (r(i), l = "" + i), p(c) && (r(c.key), l = "" + c.key), "key" in c) {
        i = {};
        for (var L in c)
          L !== "key" && (i[L] = c[L]);
      } else i = c;
      return l && b(
        i,
        typeof e == "function" ? e.displayName || e.name || "Unknown" : e
      ), w(e, l, g, y, m(), i);
    }
    function G(e, c) {
      if (typeof e == "object" && e && e.$$typeof !== Ke) {
        if (ae(e))
          for (var i = 0; i < e.length; i++) {
            var u = e[i];
            I(u) && $(u, c);
          }
        else if (I(e))
          e._store && (e._store.validated = 1);
        else if (e === null || typeof e != "object" ? i = null : (i = xe && e[xe] || e["@@iterator"], i = typeof i == "function" ? i : null), typeof i == "function" && i !== e.entries && (i = i.call(e), i !== e))
          for (; !(e = i.next()).done; )
            I(e.value) && $(e.value, c);
      }
    }
    function I(e) {
      return typeof e == "object" && e !== null && e.$$typeof === Y;
    }
    function $(e, c) {
      if (e._store && !e._store.validated && e.key == null && (e._store.validated = 1, c = q(c), !Ae[c])) {
        Ae[c] = !0;
        var i = "";
        e && e._owner != null && e._owner !== m() && (i = null, typeof e._owner.tag == "number" ? i = n(e._owner.type) : typeof e._owner.name == "string" && (i = e._owner.name), i = " It was passed a child from " + i + ".");
        var u = N.getCurrentStack;
        N.getCurrentStack = function() {
          var y = v(e.type);
          return u && (y += u() || ""), y;
        }, console.error(
          'Each child in a list should have a unique "key" prop.%s%s See https://react.dev/link/warning-keys for more information.',
          c,
          i
        ), N.getCurrentStack = u;
      }
    }
    function q(e) {
      var c = "", i = m();
      return i && (i = n(i.type)) && (c = `

Check the render method of \`` + i + "`."), c || (e = n(e)) && (c = `

Check the top-level render call using <` + e + ">."), c;
    }
    var Z = He, Y = Symbol.for("react.transitional.element"), D = Symbol.for("react.portal"), E = Symbol.for("react.fragment"), z = Symbol.for("react.strict_mode"), R = Symbol.for("react.profiler"), he = Symbol.for("react.consumer"), ge = Symbol.for("react.context"), ee = Symbol.for("react.forward_ref"), te = Symbol.for("react.suspense"), ne = Symbol.for("react.suspense_list"), oe = Symbol.for("react.memo"), re = Symbol.for("react.lazy"), qe = Symbol.for("react.offscreen"), xe = Symbol.iterator, Ye = Symbol.for("react.client.reference"), N = Z.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, be = Object.prototype.hasOwnProperty, M = Object.assign, We = Symbol.for("react.client.reference"), ae = Array.isArray, W = 0, ve, pe, ye, ke, Ce, Ee, Te;
    s.__reactDisabledLog = !0;
    var se, we, ce = !1, ie = new (typeof WeakMap == "function" ? WeakMap : Map)(), Ke = Symbol.for("react.client.reference"), Se, _e = {}, je = {}, Ae = {};
    V.Fragment = E, V.jsx = function(e, c, i, u, y) {
      return P(e, c, i, !1, u, y);
    }, V.jsxs = function(e, c, i, u, y) {
      return P(e, c, i, !0, u, y);
    };
  }()), V;
}
var Me;
function gt() {
  return Me || (Me = 1, process.env.NODE_ENV === "production" ? J.exports = mt() : J.exports = ht()), J.exports;
}
var x = gt();
const xt = (n, t) => {
  n.setRangeText(
    t,
    n.selectionStart || 0,
    n.selectionEnd || 0,
    "select"
  );
};
function bt(n) {
  const t = [];
  for (const r in n)
    n.hasOwnProperty.call(n, r) && n[r]().handleKeyCommand && t.push(r);
  return t;
}
class vt {
  refTextarea;
  constructor(t) {
    this.refTextarea = t;
  }
  replaceSelection = (t) => {
    const r = this.refTextarea.current;
    return xt(r, t), X(r);
  };
  setSelectionRange = (t) => {
    const r = this.refTextarea.current;
    return r.focus(), r.selectionStart = t.start, r.selectionEnd = t.end, X(r);
  };
  getState = () => {
    const t = this.refTextarea.current;
    return X(t);
  };
}
const X = (n) => ({
  selection: {
    start: n.selectionStart,
    end: n.selectionEnd
  },
  text: n.value,
  selectedText: n.value.slice(
    n.selectionStart,
    n.selectionEnd
  )
});
class pt {
  setText;
  refTextarea;
  textApi;
  commandMap;
  /**
   * Names of commands that can be activated by the keyboard
   */
  keyActivatedCommands;
  /**
   * Indicates whether there is a command currently executing
   */
  isExecuting = !1;
  pasteOptions;
  constructor({
    setText: t,
    customCommands: r,
    refTextarea: s,
    pasteOptions: o
  }) {
    if (o && !o.saveImage)
      throw new Error("paste options are incomplete. saveImage are required ");
    this.commandMap = { ...ze(), ...r || {} }, this.pasteOptions = o, this.keyActivatedCommands = bt(r), this.refTextarea = s, this.textApi = new vt(s), this.setText = t;
  }
  getCommand = (t) => {
    const r = this.commandMap[t];
    if (!r)
      throw new Error(`Cannot execute command. Command not found: ${t}`);
    return r();
  };
  /**
   * Tries to find a command the wants to handle the keyboard event.
   * If a command is found, it is executed and the function returns
   */
  handleKeyCommand = async (t) => {
    for (const r of this.keyActivatedCommands)
      if (this.getCommand(r)?.handleKeyCommand?.(t))
        return await this.executeCommand(r), !0;
    return !1;
  };
  executeCommand = async (t, r) => {
    if (this.isExecuting)
      return;
    this.isExecuting = !0;
    const s = this.refTextarea.current, o = X(s);
    await this.getCommand(t).execute({
      setText: this.setText,
      initialState: o,
      textApi: this.textApi,
      context: r
    }), this.isExecuting = !1;
  };
  /**
   * Executes the paste command
   */
  // public executePasteCommand = async (event: ClipboardEvent): Promise<void> => {
  //   if (this.pasteOptions) {
  //     return this.executeCommand(
  //       this.pasteOptions.command || getDefaultSaveImageCommandName(),
  //       {
  //         pasteOptions: this.pasteOptions,
  //         event: event,
  //       } as MdePasteCommandContext,
  //     )
  //   }
  // }
  /**
   * Executes the drop command
   */
  // public executeDropCommand = async (event: DragEvent): Promise<void> => {
  //   if (this.pasteOptions) {
  //     return this.executeCommand(
  //       this.pasteOptions.command || getDefaultSaveImageCommandName(),
  //       {
  //         pasteOptions: this.pasteOptions,
  //         event: event,
  //       } as MdePasteCommandContext,
  //     )
  //   }
  // }
  /**
   * Executes the "select image" command
   */
  executeSelectImageCommand = async (t) => {
    if (this.pasteOptions)
      return this.executeCommand(
        this.pasteOptions.command || ft(),
        {
          pasteOptions: this.pasteOptions,
          event: t
        }
      );
  };
  /**
   * Returns a command by name
   * @param name
   */
  getCommandByName = (t) => this.commandMap[t];
}
/**
 * @license lucide-react v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const yt = (n) => n.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(), Le = (...n) => n.filter((t, r, s) => !!t && t.trim() !== "" && s.indexOf(t) === r).join(" ").trim();
/**
 * @license lucide-react v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
var kt = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round"
};
/**
 * @license lucide-react v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ct = Q(
  ({
    color: n = "currentColor",
    size: t = 24,
    strokeWidth: r = 2,
    absoluteStrokeWidth: s,
    className: o = "",
    children: a,
    iconNode: d,
    ...f
  }, v) => F(
    "svg",
    {
      ref: v,
      ...kt,
      width: t,
      height: t,
      stroke: n,
      strokeWidth: s ? Number(r) * 24 / Number(t) : r,
      className: Le("lucide", o),
      ...f
    },
    [
      ...d.map(([m, p]) => F(m, p)),
      ...Array.isArray(a) ? a : [a]
    ]
  )
);
/**
 * @license lucide-react v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const T = (n, t) => {
  const r = Q(
    ({ className: s, ...o }, a) => F(Ct, {
      ref: a,
      iconNode: t,
      className: Le(`lucide-${yt(n)}`, s),
      ...o
    })
  );
  return r.displayName = `${n}`, r;
};
/**
 * @license lucide-react v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Et = T("Bold", [
  [
    "path",
    { d: "M6 12h9a4 4 0 0 1 0 8H7a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h7a4 4 0 0 1 0 8", key: "mg9rjx" }
  ]
]);
/**
 * @license lucide-react v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Tt = T("CodeXml", [
  ["path", { d: "m18 16 4-4-4-4", key: "1inbqp" }],
  ["path", { d: "m6 8-4 4 4 4", key: "15zrgr" }],
  ["path", { d: "m14.5 4-5 16", key: "e7oirm" }]
]);
/**
 * @license lucide-react v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const wt = T("Heading", [
  ["path", { d: "M6 12h12", key: "8npq4p" }],
  ["path", { d: "M6 20V4", key: "1w1bmo" }],
  ["path", { d: "M18 20V4", key: "o2hl4u" }]
]);
/**
 * @license lucide-react v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const St = T("Image", [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", ry: "2", key: "1m3agn" }],
  ["circle", { cx: "9", cy: "9", r: "2", key: "af1f0g" }],
  ["path", { d: "m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21", key: "1xmnt7" }]
]);
/**
 * @license lucide-react v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const _t = T("Italic", [
  ["line", { x1: "19", x2: "10", y1: "4", y2: "4", key: "15jd3p" }],
  ["line", { x1: "14", x2: "5", y1: "20", y2: "20", key: "bu0au3" }],
  ["line", { x1: "15", x2: "9", y1: "4", y2: "20", key: "uljnxc" }]
]);
/**
 * @license lucide-react v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const jt = T("Link", [
  ["path", { d: "M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71", key: "1cjeqo" }],
  ["path", { d: "M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71", key: "19qd67" }]
]);
/**
 * @license lucide-react v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const At = T("ListChecks", [
  ["path", { d: "m3 17 2 2 4-4", key: "1jhpwq" }],
  ["path", { d: "m3 7 2 2 4-4", key: "1obspn" }],
  ["path", { d: "M13 6h8", key: "15sg57" }],
  ["path", { d: "M13 12h8", key: "h98zly" }],
  ["path", { d: "M13 18h8", key: "oe0vm4" }]
]);
/**
 * @license lucide-react v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Rt = T("ListOrdered", [
  ["path", { d: "M10 12h11", key: "6m4ad9" }],
  ["path", { d: "M10 18h11", key: "11hvi2" }],
  ["path", { d: "M10 6h11", key: "c7qv1k" }],
  ["path", { d: "M4 10h2", key: "16xx2s" }],
  ["path", { d: "M4 6h1v4", key: "cnovpq" }],
  ["path", { d: "M6 18H4c0-1 2-2 2-3s-1-1.5-2-1", key: "m9a95d" }]
]);
/**
 * @license lucide-react v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Nt = T("List", [
  ["path", { d: "M3 12h.01", key: "nlz23k" }],
  ["path", { d: "M3 18h.01", key: "1tta3j" }],
  ["path", { d: "M3 6h.01", key: "1rqtza" }],
  ["path", { d: "M8 12h13", key: "1za7za" }],
  ["path", { d: "M8 18h13", key: "1lx6n3" }],
  ["path", { d: "M8 6h13", key: "ik3vkj" }]
]);
/**
 * @license lucide-react v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Mt = T("Quote", [
  [
    "path",
    {
      d: "M16 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z",
      key: "rib7q0"
    }
  ],
  [
    "path",
    {
      d: "M5 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z",
      key: "1ymkrd"
    }
  ]
]);
/**
 * @license lucide-react v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ot = T("Strikethrough", [
  ["path", { d: "M16 4H9a3 3 0 0 0-2.83 4", key: "43sutm" }],
  ["path", { d: "M14 12a4 4 0 0 1 0 8H6", key: "nlfj13" }],
  ["line", { x1: "4", x2: "20", y1: "12", y2: "12", key: "1e0a9i" }]
]), Pt = "fc-mde__main_e76010f9ac3f69e6", $t = {
  main: Pt
}, zt = (n) => /* @__PURE__ */ x.jsx("div", { "data-fc-mde-svg-icon-container": !0, ...n }), Lt = ({ icon: n }) => {
  const t = {
    header: wt,
    bold: Et,
    italic: _t,
    strikethrough: Ot,
    code: Tt,
    quote: Mt,
    unorderedList: Rt,
    orderedList: Nt,
    checkedList: At,
    link: jt,
    image: St
  }[n] ?? null;
  return t ? /* @__PURE__ */ x.jsx(zt, { children: /* @__PURE__ */ x.jsx(t, { className: $t.main, "data-fc-mde-svg-icon": !0 }) }) : null;
}, Bt = "fc-mde__content_59ee8347a45e0596", Oe = {
  content: Bt
}, Be = Q(
  ({ markdown: n, generateMarkdownPreview: t, loadingPreview: r }, s) => {
    const [o, a] = le(!0), [d, f] = le(""), [v, m] = le(""), p = de(async () => {
      f(await t(n)), a(!1);
    }, [t, n]);
    Ve(() => {
      n !== v && (p(), m(n));
    }, [v, n, p]);
    let b = null;
    return o ? b = /* @__PURE__ */ x.jsx("div", { className: Oe.content, "data-fc-mde-preview-content": !0, children: r }) : b = /* @__PURE__ */ x.jsx(
      "div",
      {
        className: Oe.content,
        ref: s,
        "data-fc-mde-preview-content": !0,
        dangerouslySetInnerHTML: { __html: d }
      }
    ), /* @__PURE__ */ x.jsx("div", { "data-mde-preview": !0, "data-loading": o || void 0, children: b });
  }
);
Be.displayName = "MdePreview";
const It = "fc-mde__container_5d480c472a769b14", qt = "fc-mde__main_bbe7a060507c7387", Pe = {
  container: It,
  main: qt
}, Ie = Q(
  ({ value: n, setValue: t, textareaComponent: r, onKeyCommand: s, ...o }, a) => {
    const d = r || "textarea", f = de((m) => {
      m.preventDefault(), (m.clipboardData.files ?? []).length;
    }, []), v = de(
      (m) => {
        t(m.target.value);
      },
      [t]
    );
    return /* @__PURE__ */ x.jsx("div", { className: Pe.container, "data-fc-mde-textarea-container": !0, children: /* @__PURE__ */ x.jsx(
      d,
      {
        ref: a,
        className: Pe.main,
        value: n,
        onChange: v,
        onKeyDown: s,
        onPaste: f,
        "data-fc-mde-textarea": !0,
        ...o
      }
    ) });
  }
);
Ie.displayName = "MdeTextarea";
const Yt = "fc-mde__tab_707475e156219802", Wt = "fc-mde__tabButton_5a17ac662ec07934", Kt = "fc-mde__header_1d136c3d982ffdcc", Ht = "fc-mde__btnGroup_b384efee5a15e109", Vt = "fc-mde__btn_a61d3b8445301110", B = {
  tab: Yt,
  tabButton: Wt,
  header: Kt,
  btnGroup: Ht,
  btn: Vt
}, Gt = {
  tabIndex: -1
}, Ut = ({
  buttonComponentClass: n,
  buttonContent: t,
  buttonProps: r,
  onClick: s,
  readOnly: o,
  name: a
}) => {
  const d = { ...Gt, ...r || {} }, f = n || "button";
  return /* @__PURE__ */ x.jsx("div", { className: B.btn, "data-fc-mde-toolbar-button": !0, children: F(
    f,
    {
      "data-fc-mde-toolbar-button-item": !0,
      "data-name": a,
      ...d,
      onClick: s,
      disabled: o,
      type: "button"
    },
    t
  ) });
}, Jt = ({
  hidden: n,
  children: t
}) => /* @__PURE__ */ x.jsx(
  "div",
  {
    className: B.btnGroup,
    "data-fc-mde-toolbar-button-group": !0,
    "data-hidden": n || void 0,
    children: t
  }
), Xt = ({
  onTabChange: n,
  buttons: t,
  onCommand: r,
  readOnly: s,
  disablePreview: o,
  writeButtonProps: a,
  previewButtonProps: d,
  tab: f,
  buttonProps: v
}) => {
  const m = (b, C) => {
    b.preventDefault(), n(C);
  };
  if (!t?.length)
    return null;
  const p = /* @__PURE__ */ x.jsxs("div", { className: B.tab, "data-fc-mde-tab": !0, children: [
    /* @__PURE__ */ x.jsx(
      "button",
      {
        type: "button",
        className: B.tabButton,
        "data-fc-mde-tab-button": !0,
        onClick: (b) => m(b, "write"),
        "data-active": f === "write" || void 0,
        ...a,
        children: h.gettext("Write")
      }
    ),
    /* @__PURE__ */ x.jsx(
      "button",
      {
        type: "button",
        className: B.tabButton,
        "data-fc-mde-tab-button": !0,
        onClick: (b) => m(b, "preview"),
        "data-active": f === "preview" || void 0,
        ...d,
        children: h.gettext("Preview")
      }
    )
  ] });
  return /* @__PURE__ */ x.jsxs("div", { className: B.header, "data-fc-mde-header": !0, children: [
    o || p,
    t.map((b, C) => /* @__PURE__ */ x.jsx(Jt, { hidden: f === "preview", children: b.map((w, P) => /* @__PURE__ */ x.jsx(
      Ut,
      {
        name: w.commandName,
        buttonContent: w.buttonContent,
        buttonProps: { ...v || {}, ...w.buttonProps },
        onClick: () => r(w.commandName),
        readOnly: s,
        buttonComponentClass: w.buttonComponentClass
      },
      P
    )) }, C))
  ] });
}, Ft = "fc-mde__main_c29a242caf055ec0", Qt = "fc-mde__container_8e4c12095dec4180", $e = {
  main: Ft,
  container: Qt
}, Dt = ({
  setText: n,
  refTextarea: t,
  commands: r = ze(),
  toolbarCommands: s = ut(),
  getIcon: o = ($) => /* @__PURE__ */ x.jsx(Lt, { icon: $ }),
  readOnly: a = !1,
  selectedTab: d = "write",
  disablePreview: f = !1,
  // paste,
  onTabChange: v,
  loadingPreview: m,
  text: p,
  generateMarkdownPreview: b,
  textareaComponent: C,
  commandButtons: w,
  writeButton: P,
  previewButton: G,
  textareaProps: I
}) => {
  const $ = Ge(null), q = new pt({
    setText: n,
    customCommands: r,
    refTextarea: t
    // paste: paste? { ...pasteOptionDefaults, ...paste } : undefined,
  }), Z = (E) => {
    v(E);
  }, Y = async (E) => {
    await q.executeCommand(E);
  }, D = s.map((E) => E.map((z) => {
    const R = q.getCommand(z);
    return {
      commandName: z,
      buttonContent: R.icon ? R.icon(o) : o(z),
      buttonProps: R.buttonProps,
      buttonComponentClass: R.buttonComponentClass
    };
  })).filter((E) => E);
  return /* @__PURE__ */ x.jsxs("div", { className: $e.main, "data-fc-mde": !0, children: [
    /* @__PURE__ */ x.jsx(
      Xt,
      {
        buttons: D,
        onCommand: Y,
        onTabChange: Z,
        tab: d,
        readOnly: a,
        disablePreview: f,
        buttonProps: w,
        writeButtonProps: P,
        previewButtonProps: G
      }
    ),
    /* @__PURE__ */ x.jsx(
      "div",
      {
        className: $e.container,
        "data-fc-mde-container": !0,
        "data-hidden": d === "preview" || void 0,
        children: /* @__PURE__ */ x.jsx(
          Ie,
          {
            ref: t,
            value: p,
            setValue: n,
            textareaComponent: C,
            onKeyCommand: q.handleKeyCommand,
            ...I
          }
        )
      }
    ),
    d !== "write" && /* @__PURE__ */ x.jsx(
      Be,
      {
        ref: $,
        loadingPreview: m,
        generateMarkdownPreview: b,
        markdown: p
      }
    )
  ] });
};
export {
  Dt as Mde,
  ze as getDefaultCommandMap,
  ut as getDefaultToolbarCommands,
  j as selectWord
};
