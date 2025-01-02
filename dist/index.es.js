import Ve, { forwardRef as ee, createElement as D, useState as ue, useCallback as me, useEffect as Ge, useRef as Ue } from "react";
const Je = { zh: "预览", "zh-CN": "预览" }, Xe = { zh: "编辑", "zh-CN": "编辑" }, Fe = {
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
  Preview: Je,
  Write: Xe
};
class Qe {
  langId = "";
  setLangId = (t) => {
    this.langId = t;
  };
  gettext = (t, r = "") => {
    if (!this.langId)
      return t;
    const s = `${r || ""}${t}`;
    return Fe?.[s]?.[this.langId] ?? t;
  };
}
const h = new Qe();
function Ze(n, t) {
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
  return n && n.length && t.start === t.end ? Ze(n, t.start) : t;
}
function he(n = "", t) {
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
function ge(n = "", t) {
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
const De = () => ({
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
}), et = () => ({
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
      const x = o.selection.start + 1, E = x + o.selectedText.length;
      t.setSelectionRange({
        start: x,
        end: E
      });
      return;
    }
    const a = he(
      o.text,
      o.selection.start
    ), d = Array(a + 1).join(`
`), f = ge(
      o.text,
      o.selection.end
    ), p = Array(f + 1).join(`
`);
    t.replaceSelection(
      `${d}\`\`\`
${o.selectedText}
\`\`\`${p}`
    );
    const m = o.selection.start + a + 4, v = m + o.selectedText.length;
    r(
      t.setSelectionRange({
        start: m,
        end: v
      }).text
    );
  }
}), tt = (n, t, r) => {
  const s = j({
    text: n.text,
    selection: n.selection
  }), o = t.setSelectionRange(s), a = t.replaceSelection(`${r}${o.selectedText}`);
  return t.setSelectionRange({
    start: a.selection.end - o.selectedText.length,
    end: a.selection.end
  });
}, nt = () => ({
  buttonProps: {
    "aria-label": h.gettext("Add header"),
    title: h.gettext("Add header")
  },
  execute: ({ initialState: n, textApi: t, setText: r }) => {
    r(tt(n, t, "### ").text);
  }
}), ot = () => ({
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
}), rt = () => ({
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
}), at = () => ({
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
function st(n, t) {
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
const xe = (n, t, r) => {
  const s = j({
    text: n.text,
    selection: n.selection
  }), o = t.setSelectionRange(s), a = he(
    o.text,
    o.selection.start
  ), d = Array(a + 1).join(`
`), f = ge(
    o.text,
    o.selection.end
  ), p = Array(f + 1).join(`
`), m = st(o.selectedText, r);
  t.replaceSelection(
    `${d}${m.modifiedText}${p}`
  );
  const v = o.selectedText.indexOf(`
`) === -1 ? m.insertionLength : 0, x = o.selection.start + a + v, E = x + m.modifiedText.length - v;
  return t.setSelectionRange({
    start: x,
    end: E
  });
}, ct = () => ({
  buttonProps: {
    "aria-label": h.gettext("Add unordered list"),
    title: h.gettext("Add unordered list")
  },
  execute: ({ initialState: n, textApi: t, setText: r }) => {
    r(xe(n, t, "- ").text);
  }
}), it = () => ({
  buttonProps: {
    "aria-label": h.gettext("Add ordered list"),
    title: h.gettext("Add ordered list")
  },
  execute: ({ initialState: n, textApi: t, setText: r }) => {
    r(
      xe(n, t, (s, o) => `${o + 1}. `).text
    );
  }
}), lt = () => ({
  buttonProps: {
    "aria-label": h.gettext("Add checked list"),
    title: h.gettext("Add checked list")
  },
  execute: ({ initialState: n, textApi: t, setText: r }) => {
    r(xe(n, t, () => "- [ ] ").text);
  }
}), dt = () => ({
  buttonProps: {
    "aria-label": h.gettext("Insert a quote"),
    title: h.gettext("Insert a quote")
  },
  execute: ({ initialState: n, textApi: t, setText: r }) => {
    const s = j({
      text: n.text,
      selection: n.selection
    }), o = t.setSelectionRange(s), a = he(
      o.text,
      o.selection.start
    ), d = Array(a + 1).join(`
`), f = ge(
      o.text,
      o.selection.end
    ), p = Array(f + 1).join(`
`);
    t.replaceSelection(
      `${d}> ${o.selectedText}${p}`
    );
    const m = o.selection.start + a + 2, v = m + o.selectedText.length;
    r(
      t.setSelectionRange({
        start: m,
        end: v
      }).text
    );
  }
}), ut = () => ({
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
}), ft = () => [
  ["header", "bold", "italic", "strikethrough"],
  ["link", "quote", "code", "image"],
  ["unorderedList", "orderedList", "checkedList"]
], Le = () => ({
  header: nt,
  bold: De,
  italic: rt,
  strikethrough: ut,
  link: at,
  quote: dt,
  code: et,
  image: ot,
  unorderedList: ct,
  orderedList: it,
  checkedList: lt
});
function fe() {
  return "save-image";
}
var Q = { exports: {} }, V = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Ne;
function mt() {
  if (Ne) return V;
  Ne = 1;
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
  return V.Fragment = t, V.jsx = r, V.jsxs = r, V;
}
var G = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Oe;
function ht() {
  return Oe || (Oe = 1, process.env.NODE_ENV !== "production" && function() {
    function n(e) {
      if (e == null) return null;
      if (typeof e == "function")
        return e.$$typeof === We ? null : e.displayName || e.name || null;
      if (typeof e == "string") return e;
      switch (e) {
        case W:
          return "Fragment";
        case te:
          return "Portal";
        case C:
          return "Profiler";
        case X:
          return "StrictMode";
        case oe:
          return "Suspense";
        case re:
          return "SuspenseList";
      }
      if (typeof e == "object")
        switch (typeof e.tag == "number" && console.error(
          "Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."
        ), e.$$typeof) {
          case R:
            return (e.displayName || "Context") + ".Provider";
          case z:
            return (e._context.displayName || "Context") + ".Consumer";
          case ne:
            var c = e.render;
            return e = e.displayName, e || (e = c.displayName || c.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
          case ae:
            return c = e.displayName || null, c !== null ? c : n(e.type) || "Memo";
          case se:
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
      if (K === 0) {
        ve = console.log, ye = console.info, ke = console.warn, Ce = console.error, Ee = console.group, we = console.groupCollapsed, Te = console.groupEnd;
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
      K++;
    }
    function a() {
      if (K--, K === 0) {
        var e = { configurable: !0, enumerable: !0, writable: !0 };
        Object.defineProperties(console, {
          log: O({}, e, { value: ve }),
          info: O({}, e, { value: ye }),
          warn: O({}, e, { value: ke }),
          error: O({}, e, { value: Ce }),
          group: O({}, e, { value: Ee }),
          groupCollapsed: O({}, e, { value: we }),
          groupEnd: O({}, e, { value: Te })
        });
      }
      0 > K && console.error(
        "disabledDepth fell below zero. This is a bug in React. Please file an issue."
      );
    }
    function d(e) {
      if (ie === void 0)
        try {
          throw Error();
        } catch (i) {
          var c = i.stack.trim().match(/\n( *(at )?)/);
          ie = c && c[1] || "", Se = -1 < i.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < i.stack.indexOf("@") ? "@unknown:0:0" : "";
        }
      return `
` + ie + e + Se;
    }
    function f(e, c) {
      if (!e || le) return "";
      var i = de.get(e);
      if (i !== void 0) return i;
      le = !0, i = Error.prepareStackTrace, Error.prepareStackTrace = void 0;
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
                    var F = _;
                  }
                  Reflect.construct(e, [], A);
                } else {
                  try {
                    A.call();
                  } catch (_) {
                    F = _;
                  }
                  e.call(A.prototype);
                }
              } else {
                try {
                  throw Error();
                } catch (_) {
                  F = _;
                }
                (A = e()) && typeof A.catch == "function" && A.catch(function() {
                });
              }
            } catch (_) {
              if (_ && F && typeof _.stack == "string")
                return [_.stack, F.stack];
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
`), M = L.split(`
`);
          for (l = g = 0; g < k.length && !k[g].includes(
            "DetermineComponentFrameRoot"
          ); )
            g++;
          for (; l < M.length && !M[l].includes(
            "DetermineComponentFrameRoot"
          ); )
            l++;
          if (g === k.length || l === M.length)
            for (g = k.length - 1, l = M.length - 1; 1 <= g && 0 <= l && k[g] !== M[l]; )
              l--;
          for (; 1 <= g && 0 <= l; g--, l--)
            if (k[g] !== M[l]) {
              if (g !== 1 || l !== 1)
                do
                  if (g--, l--, 0 > l || k[g] !== M[l]) {
                    var H = `
` + k[g].replace(
                      " at new ",
                      " at "
                    );
                    return e.displayName && H.includes("<anonymous>") && (H = H.replace("<anonymous>", e.displayName)), typeof e == "function" && de.set(e, H), H;
                  }
                while (1 <= g && 0 <= l);
              break;
            }
        }
      } finally {
        le = !1, N.H = u, a(), Error.prepareStackTrace = i;
      }
      return k = (k = e ? e.displayName || e.name : "") ? d(k) : "", typeof e == "function" && de.set(e, k), k;
    }
    function p(e) {
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
        case oe:
          return d("Suspense");
        case re:
          return d("SuspenseList");
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case ne:
            return e = f(e.render, !1), e;
          case ae:
            return p(e.type);
          case se:
            c = e._payload, e = e._init;
            try {
              return p(e(c));
            } catch {
            }
        }
      return "";
    }
    function m() {
      var e = N.A;
      return e === null ? null : e.getOwner();
    }
    function v(e) {
      if (pe.call(e, "key")) {
        var c = Object.getOwnPropertyDescriptor(e, "key").get;
        if (c && c.isReactWarning) return !1;
      }
      return e.key !== void 0;
    }
    function x(e, c) {
      function i() {
        _e || (_e = !0, console.error(
          "%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)",
          c
        ));
      }
      i.isReactWarning = !0, Object.defineProperty(e, "key", {
        get: i,
        configurable: !0
      });
    }
    function E() {
      var e = n(this.type);
      return je[e] || (je[e] = !0, console.error(
        "Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."
      )), e = this.props.ref, e !== void 0 ? e : null;
    }
    function T(e, c, i, u, y, g) {
      return i = g.ref, e = {
        $$typeof: Y,
        type: e,
        key: c,
        props: g,
        _owner: y
      }, (i !== void 0 ? i : null) !== null ? Object.defineProperty(e, "ref", {
        enumerable: !1,
        get: E
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
      if (typeof e == "string" || typeof e == "function" || e === W || e === C || e === X || e === oe || e === re || e === Ye || typeof e == "object" && e !== null && (e.$$typeof === se || e.$$typeof === ae || e.$$typeof === R || e.$$typeof === z || e.$$typeof === ne || e.$$typeof === Ke || e.getModuleId !== void 0)) {
        var l = c.children;
        if (l !== void 0)
          if (u)
            if (ce(l)) {
              for (u = 0; u < l.length; u++)
                U(l[u], e);
              Object.freeze && Object.freeze(l);
            } else
              console.error(
                "React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead."
              );
          else U(l, e);
      } else
        l = "", (e === void 0 || typeof e == "object" && e !== null && Object.keys(e).length === 0) && (l += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports."), e === null ? u = "null" : ce(e) ? u = "array" : e !== void 0 && e.$$typeof === Y ? (u = "<" + (n(e.type) || "Unknown") + " />", l = " Did you accidentally export a JSX literal instead of a component?") : u = typeof e, console.error(
          "React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s",
          u,
          l
        );
      if (pe.call(c, "key")) {
        l = n(e);
        var S = Object.keys(c).filter(function(k) {
          return k !== "key";
        });
        u = 0 < S.length ? "{key: someKey, " + S.join(": ..., ") + ": ...}" : "{key: someKey}", Ae[l + u] || (S = 0 < S.length ? "{" + S.join(": ..., ") + ": ...}" : "{}", console.error(
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
        ), Ae[l + u] = !0);
      }
      if (l = null, i !== void 0 && (r(i), l = "" + i), v(c) && (r(c.key), l = "" + c.key), "key" in c) {
        i = {};
        for (var L in c)
          L !== "key" && (i[L] = c[L]);
      } else i = c;
      return l && x(
        i,
        typeof e == "function" ? e.displayName || e.name || "Unknown" : e
      ), T(e, l, g, y, m(), i);
    }
    function U(e, c) {
      if (typeof e == "object" && e && e.$$typeof !== He) {
        if (ce(e))
          for (var i = 0; i < e.length; i++) {
            var u = e[i];
            I(u) && J(u, c);
          }
        else if (I(e))
          e._store && (e._store.validated = 1);
        else if (e === null || typeof e != "object" ? i = null : (i = be && e[be] || e["@@iterator"], i = typeof i == "function" ? i : null), typeof i == "function" && i !== e.entries && (i = i.call(e), i !== e))
          for (; !(e = i.next()).done; )
            I(e.value) && J(e.value, c);
      }
    }
    function I(e) {
      return typeof e == "object" && e !== null && e.$$typeof === Y;
    }
    function J(e, c) {
      if (e._store && !e._store.validated && e.key == null && (e._store.validated = 1, c = q(c), !Re[c])) {
        Re[c] = !0;
        var i = "";
        e && e._owner != null && e._owner !== m() && (i = null, typeof e._owner.tag == "number" ? i = n(e._owner.type) : typeof e._owner.name == "string" && (i = e._owner.name), i = " It was passed a child from " + i + ".");
        var u = N.getCurrentStack;
        N.getCurrentStack = function() {
          var y = p(e.type);
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
    var $ = Ve, Y = Symbol.for("react.transitional.element"), te = Symbol.for("react.portal"), W = Symbol.for("react.fragment"), X = Symbol.for("react.strict_mode"), C = Symbol.for("react.profiler"), z = Symbol.for("react.consumer"), R = Symbol.for("react.context"), ne = Symbol.for("react.forward_ref"), oe = Symbol.for("react.suspense"), re = Symbol.for("react.suspense_list"), ae = Symbol.for("react.memo"), se = Symbol.for("react.lazy"), Ye = Symbol.for("react.offscreen"), be = Symbol.iterator, We = Symbol.for("react.client.reference"), N = $.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, pe = Object.prototype.hasOwnProperty, O = Object.assign, Ke = Symbol.for("react.client.reference"), ce = Array.isArray, K = 0, ve, ye, ke, Ce, Ee, we, Te;
    s.__reactDisabledLog = !0;
    var ie, Se, le = !1, de = new (typeof WeakMap == "function" ? WeakMap : Map)(), He = Symbol.for("react.client.reference"), _e, je = {}, Ae = {}, Re = {};
    G.Fragment = W, G.jsx = function(e, c, i, u, y) {
      return P(e, c, i, !1, u, y);
    }, G.jsxs = function(e, c, i, u, y) {
      return P(e, c, i, !0, u, y);
    };
  }()), G;
}
var Me;
function gt() {
  return Me || (Me = 1, process.env.NODE_ENV === "production" ? Q.exports = mt() : Q.exports = ht()), Q.exports;
}
var b = gt();
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
class pt {
  refTextarea;
  constructor(t) {
    this.refTextarea = t;
  }
  replaceSelection = (t) => {
    const r = this.refTextarea.current;
    return xt(r, t), Z(r);
  };
  setSelectionRange = (t) => {
    const r = this.refTextarea.current;
    return r.focus(), r.selectionStart = t.start, r.selectionEnd = t.end, Z(r);
  };
  getState = () => {
    const t = this.refTextarea.current;
    return Z(t);
  };
}
const Z = (n) => ({
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
class vt {
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
    this.commandMap = { ...Le(), ...r || {} }, this.pasteOptions = o, this.keyActivatedCommands = bt(r), this.refTextarea = s, this.textApi = new pt(s), this.setText = t;
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
    const s = this.refTextarea.current, o = Z(s);
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
  executePasteCommand = async (t) => {
    if (this.pasteOptions)
      return this.executeCommand(
        this.pasteOptions.command || fe(),
        {
          pasteOptions: this.pasteOptions,
          event: t
        }
      );
  };
  /**
   * Executes the drop command
   */
  executeDropCommand = async (t) => {
    if (this.pasteOptions)
      return this.executeCommand(
        this.pasteOptions.command || fe(),
        {
          pasteOptions: this.pasteOptions,
          event: t
        }
      );
  };
  /**
   * Executes the "select image" command
   */
  executeSelectImageCommand = async (t) => {
    if (this.pasteOptions)
      return this.executeCommand(
        this.pasteOptions.command || fe(),
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
const yt = (n) => n.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(), Be = (...n) => n.filter((t, r, s) => !!t && t.trim() !== "" && s.indexOf(t) === r).join(" ").trim();
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
const Ct = ee(
  ({
    color: n = "currentColor",
    size: t = 24,
    strokeWidth: r = 2,
    absoluteStrokeWidth: s,
    className: o = "",
    children: a,
    iconNode: d,
    ...f
  }, p) => D(
    "svg",
    {
      ref: p,
      ...kt,
      width: t,
      height: t,
      stroke: n,
      strokeWidth: s ? Number(r) * 24 / Number(t) : r,
      className: Be("lucide", o),
      ...f
    },
    [
      ...d.map(([m, v]) => D(m, v)),
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
const w = (n, t) => {
  const r = ee(
    ({ className: s, ...o }, a) => D(Ct, {
      ref: a,
      iconNode: t,
      className: Be(`lucide-${yt(n)}`, s),
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
const Et = w("Bold", [
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
const wt = w("CodeXml", [
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
const Tt = w("Heading", [
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
const St = w("Image", [
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
const _t = w("Italic", [
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
const jt = w("Link", [
  ["path", { d: "M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71", key: "1cjeqo" }],
  ["path", { d: "M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71", key: "19qd67" }]
]);
/**
 * @license lucide-react v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const At = w("ListChecks", [
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
const Rt = w("ListOrdered", [
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
const Nt = w("List", [
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
const Ot = w("Quote", [
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
const Mt = w("Strikethrough", [
  ["path", { d: "M16 4H9a3 3 0 0 0-2.83 4", key: "43sutm" }],
  ["path", { d: "M14 12a4 4 0 0 1 0 8H6", key: "nlfj13" }],
  ["line", { x1: "4", x2: "20", y1: "12", y2: "12", key: "1e0a9i" }]
]), Pt = "fc-mde__main_e76010f9ac3f69e6", $t = {
  main: Pt
}, zt = (n) => /* @__PURE__ */ b.jsx("div", { "data-fc-mde-svg-icon-container": !0, ...n }), Lt = ({ icon: n }) => {
  const t = {
    header: Tt,
    bold: Et,
    italic: _t,
    strikethrough: Mt,
    code: wt,
    quote: Ot,
    unorderedList: Rt,
    orderedList: Nt,
    checkedList: At,
    link: jt,
    image: St
  }[n] ?? null;
  return t ? /* @__PURE__ */ b.jsx(zt, { children: /* @__PURE__ */ b.jsx(t, { className: $t.main, "data-fc-mde-svg-icon": !0 }) }) : null;
}, Bt = "fc-mde__content_59ee8347a45e0596", Pe = {
  content: Bt
}, Ie = ee(
  ({ markdown: n, generateMarkdownPreview: t, loadingPreview: r }, s) => {
    const [o, a] = ue(!0), [d, f] = ue(""), [p, m] = ue(""), v = me(async () => {
      f(await t(n)), a(!1);
    }, [t, n]);
    Ge(() => {
      n !== p && (v(), m(n));
    }, [p, n, v]);
    let x = null;
    return o ? x = /* @__PURE__ */ b.jsx("div", { className: Pe.content, "data-fc-mde-preview-content": !0, children: r }) : x = /* @__PURE__ */ b.jsx(
      "div",
      {
        className: Pe.content,
        ref: s,
        "data-fc-mde-preview-content": !0,
        dangerouslySetInnerHTML: { __html: d }
      }
    ), /* @__PURE__ */ b.jsx("div", { "data-mde-preview": !0, "data-loading": o || void 0, children: x });
  }
);
Ie.displayName = "MdePreview";
const It = "fc-mde__container_5d480c472a769b14", qt = "fc-mde__main_bbe7a060507c7387", $e = {
  container: It,
  main: qt
}, qe = ee(
  ({ value: n, setValue: t, textareaComponent: r, onKeyCommand: s, ...o }, a) => {
    const d = r || "textarea", f = me((m) => {
      m.preventDefault(), (m.clipboardData.files ?? []).length;
    }, []), p = me(
      (m) => {
        t(m.target.value);
      },
      [t]
    );
    return /* @__PURE__ */ b.jsx("div", { className: $e.container, "data-fc-mde-textarea-container": !0, children: /* @__PURE__ */ b.jsx(
      d,
      {
        ref: a,
        className: $e.main,
        value: n,
        onChange: p,
        onKeyDown: s,
        onPaste: f,
        "data-fc-mde-textarea": !0,
        ...o
      }
    ) });
  }
);
qe.displayName = "MdeTextarea";
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
  return /* @__PURE__ */ b.jsx("div", { className: B.btn, "data-fc-mde-toolbar-button": !0, children: D(
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
}) => /* @__PURE__ */ b.jsx(
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
  buttonProps: p
}) => {
  const m = (x, E) => {
    x.preventDefault(), n(E);
  };
  if (!t?.length)
    return null;
  const v = /* @__PURE__ */ b.jsxs("div", { className: B.tab, "data-fc-mde-tab": !0, children: [
    /* @__PURE__ */ b.jsx(
      "button",
      {
        type: "button",
        className: B.tabButton,
        "data-fc-mde-tab-button": !0,
        onClick: (x) => m(x, "write"),
        "data-active": f === "write" || void 0,
        ...a,
        children: h.gettext("Write")
      }
    ),
    /* @__PURE__ */ b.jsx(
      "button",
      {
        type: "button",
        className: B.tabButton,
        "data-fc-mde-tab-button": !0,
        onClick: (x) => m(x, "preview"),
        "data-active": f === "preview" || void 0,
        ...d,
        children: h.gettext("Preview")
      }
    )
  ] });
  return /* @__PURE__ */ b.jsxs("div", { className: B.header, "data-fc-mde-header": !0, children: [
    o || v,
    t.map((x, E) => /* @__PURE__ */ b.jsx(Jt, { hidden: f === "preview", children: x.map((T, P) => /* @__PURE__ */ b.jsx(
      Ut,
      {
        name: T.commandName,
        buttonContent: T.buttonContent,
        buttonProps: { ...p || {}, ...T.buttonProps },
        onClick: () => r(T.commandName),
        readOnly: s,
        buttonComponentClass: T.buttonComponentClass
      },
      P
    )) }, E))
  ] });
}, Ft = "fc-mde__main_c29a242caf055ec0", Qt = "fc-mde__container_8e4c12095dec4180", ze = {
  main: Ft,
  container: Qt
}, Dt = ({
  setText: n,
  refTextarea: t,
  commands: r = Le(),
  toolbarCommands: s = ft(),
  getIcon: o = (q) => /* @__PURE__ */ b.jsx(Lt, { icon: q }),
  readOnly: a = !1,
  selectedTab: d = "write",
  disablePreview: f = !1,
  paste: p,
  onTabChange: m,
  loadingPreview: v,
  text: x,
  generateMarkdownPreview: E,
  textareaComponent: T,
  commandButtons: P,
  writeButton: U,
  previewButton: I,
  textareaProps: J
}) => {
  const q = Ue(null), $ = new vt({
    setText: n,
    customCommands: r,
    refTextarea: t,
    pasteOptions: p
  }), Y = async (C) => {
    p?.saveImage && await $.executePasteCommand(C);
  }, te = (C) => {
    m(C);
  }, W = async (C) => {
    await $.executeCommand(C);
  }, X = s.map((C) => C.map((z) => {
    const R = $.getCommand(z);
    return {
      commandName: z,
      buttonContent: R.icon ? R.icon(o) : o(z),
      buttonProps: R.buttonProps,
      buttonComponentClass: R.buttonComponentClass
    };
  })).filter((C) => C);
  return /* @__PURE__ */ b.jsxs("div", { className: ze.main, "data-fc-mde": !0, children: [
    /* @__PURE__ */ b.jsx(
      Xt,
      {
        buttons: X,
        onCommand: W,
        onTabChange: te,
        tab: d,
        readOnly: a,
        disablePreview: f,
        buttonProps: P,
        writeButtonProps: U,
        previewButtonProps: I
      }
    ),
    /* @__PURE__ */ b.jsx(
      "div",
      {
        className: ze.container,
        "data-fc-mde-container": !0,
        "data-hidden": d === "preview" || void 0,
        children: /* @__PURE__ */ b.jsx(
          qe,
          {
            ref: t,
            value: x,
            setValue: n,
            textareaComponent: T,
            onKeyCommand: $.handleKeyCommand,
            onPaste: Y,
            ...J
          }
        )
      }
    ),
    d !== "write" && /* @__PURE__ */ b.jsx(
      Ie,
      {
        ref: q,
        loadingPreview: v,
        generateMarkdownPreview: E,
        markdown: x
      }
    )
  ] });
};
export {
  Dt as Mde,
  Le as getDefaultCommandMap,
  ft as getDefaultToolbarCommands,
  j as selectWord
};
