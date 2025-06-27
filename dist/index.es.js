import Ce, { forwardRef as q, createElement as I, useState as X, useCallback as Q, useEffect as _e, useRef as Te } from "react";
const Re = { zh: "预览", "zh-CN": "预览" }, we = { zh: "编辑", "zh-CN": "编辑" }, Ee = {
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
  Preview: Re,
  Write: we
};
class Se {
  langId = "";
  setLangId = (e) => {
    this.langId = e;
  };
  gettext = (e, r = "") => {
    if (!this.langId)
      return e;
    const s = `${r || ""}${e}`;
    return Ee?.[s]?.[this.langId] ?? e;
  };
}
const u = new Se();
function Ae(t, e) {
  if (!t)
    throw Error("Argument 'text' should be truthy");
  const r = (a) => a === " " || a.charCodeAt(0) === 10;
  let s = 0, n = t.length;
  for (let a = e; a - 1 > -1; a--)
    if (r(t[a - 1])) {
      s = a;
      break;
    }
  for (let a = e; a < t.length; a++)
    if (r(t[a])) {
      n = a;
      break;
    }
  return { start: s, end: n };
}
function T({ text: t, selection: e }) {
  return t && t.length && e.start === e.end ? Ae(t, e.start) : e;
}
function ee(t = "", e) {
  if (e === 0)
    return 0;
  let r = 2, s = !0;
  for (let n = e - 1; n >= 0 && r >= 0; n--)
    switch (t.charCodeAt(n)) {
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
function te(t = "", e) {
  if (e === t.length - 1)
    return 0;
  let r = 2, s = !0;
  for (let n = e; n < t.length && r >= 0; n++)
    switch (t.charCodeAt(n)) {
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
const je = () => ({
  buttonProps: {
    "aria-label": u.gettext("Add bold text"),
    title: u.gettext("Add bold text")
  },
  execute: ({ initialState: t, textApi: e, setText: r }) => {
    const s = T({
      text: t.text,
      selection: t.selection
    }), n = e.setSelectionRange(s), a = e.replaceSelection(`**${n.selectedText}**`);
    r(
      e.setSelectionRange({
        start: a.selection.end - 2 - n.selectedText.length,
        end: a.selection.end - 2
      }).text
    );
  },
  handleKeyCommand: (t) => (t.ctrlKey || t.metaKey) && t.key === "b"
}), Ne = () => ({
  buttonProps: {
    "aria-label": u.gettext("Insert code"),
    title: u.gettext("Insert code")
  },
  execute: ({ initialState: t, textApi: e, setText: r }) => {
    const s = T({
      text: t.text,
      selection: t.selection
    }), n = e.setSelectionRange(s);
    if (n.selectedText.indexOf(`
`) === -1) {
      e.replaceSelection(`\`${n.selectedText}\``);
      const f = n.selection.start + 1, k = f + n.selectedText.length;
      e.setSelectionRange({
        start: f,
        end: k
      });
      return;
    }
    const a = ee(
      n.text,
      n.selection.start
    ), i = Array(a + 1).join(`
`), l = te(
      n.text,
      n.selection.end
    ), x = Array(l + 1).join(`
`);
    e.replaceSelection(
      `${i}\`\`\`
${n.selectedText}
\`\`\`${x}`
    );
    const d = n.selection.start + a + 4, p = d + n.selectedText.length;
    r(
      e.setSelectionRange({
        start: d,
        end: p
      }).text
    );
  }
}), Pe = (t, e, r) => {
  const s = T({
    text: t.text,
    selection: t.selection
  }), n = e.setSelectionRange(s), a = e.replaceSelection(`${r}${n.selectedText}`);
  return e.setSelectionRange({
    start: a.selection.end - n.selectedText.length,
    end: a.selection.end
  });
}, Oe = () => ({
  buttonProps: {
    "aria-label": u.gettext("Add header"),
    title: u.gettext("Add header")
  },
  execute: ({ initialState: t, textApi: e, setText: r }) => {
    r(Pe(t, e, "### ").text);
  }
}), $e = () => ({
  buttonProps: {
    "aria-label": u.gettext("Add image"),
    title: u.gettext("Add image")
  },
  execute: ({ initialState: t, textApi: e, setText: r }) => {
    const s = e.setSelectionRange(
      T({
        text: t.text,
        selection: t.selection
      })
    ), n = s.selectedText || "https://example.com/your-image.png";
    e.replaceSelection(`![](${n})`), r(
      e.setSelectionRange({
        start: s.selection.start + 4,
        end: s.selection.start + 4 + n.length
      }).text
    );
  }
}), Me = () => ({
  buttonProps: {
    "aria-label": u.gettext("Add italic text"),
    title: u.gettext("Add italic text")
  },
  execute: ({ initialState: t, textApi: e, setText: r }) => {
    const s = T({
      text: t.text,
      selection: t.selection
    }), n = e.setSelectionRange(s), a = e.replaceSelection(`*${n.selectedText}*`);
    r(
      e.setSelectionRange({
        start: a.selection.end - 1 - n.selectedText.length,
        end: a.selection.end - 1
      }).text
    );
  },
  handleKeyCommand: (t) => (t.ctrlKey || t.metaKey) && t.key === "i"
}), Le = () => ({
  buttonProps: {
    "aria-label": u.gettext("Add a link"),
    title: u.gettext("Add a link")
  },
  execute: ({ initialState: t, textApi: e, setText: r }) => {
    const s = T({
      text: t.text,
      selection: t.selection
    }), n = e.setSelectionRange(s), a = e.replaceSelection(`[${n.selectedText}](url)`);
    r(
      e.setSelectionRange({
        start: a.selection.end - 6 - n.selectedText.length,
        end: a.selection.end - 6
      }).text
    );
  },
  handleKeyCommand: (t) => (t.ctrlKey || t.metaKey) && t.key === "k"
});
function ze(t, e) {
  const r = t.split(/\n/);
  let s = 0;
  return { modifiedText: r.map((a, i) => {
    if (typeof e == "string")
      return s += e.length, e + a;
    if (typeof e == "function") {
      const l = e(a, i);
      return s += l.length, e(a, i) + a;
    }
    throw Error("insertion is expected to be either a string or a function");
  }).join(`
`), insertionLength: s };
}
const ne = (t, e, r) => {
  const s = T({
    text: t.text,
    selection: t.selection
  }), n = e.setSelectionRange(s), a = ee(
    n.text,
    n.selection.start
  ), i = Array(a + 1).join(`
`), l = te(
    n.text,
    n.selection.end
  ), x = Array(l + 1).join(`
`), d = ze(n.selectedText, r);
  e.replaceSelection(
    `${i}${d.modifiedText}${x}`
  );
  const p = n.selectedText.indexOf(`
`) === -1 ? d.insertionLength : 0, f = n.selection.start + a + p, k = f + d.modifiedText.length - p;
  return e.setSelectionRange({
    start: f,
    end: k
  });
}, Ie = () => ({
  buttonProps: {
    "aria-label": u.gettext("Add unordered list"),
    title: u.gettext("Add unordered list")
  },
  execute: ({ initialState: t, textApi: e, setText: r }) => {
    r(ne(t, e, "- ").text);
  }
}), qe = () => ({
  buttonProps: {
    "aria-label": u.gettext("Add ordered list"),
    title: u.gettext("Add ordered list")
  },
  execute: ({ initialState: t, textApi: e, setText: r }) => {
    r(
      ne(t, e, (s, n) => `${n + 1}. `).text
    );
  }
}), Be = () => ({
  buttonProps: {
    "aria-label": u.gettext("Add checked list"),
    title: u.gettext("Add checked list")
  },
  execute: ({ initialState: t, textApi: e, setText: r }) => {
    r(ne(t, e, () => "- [ ] ").text);
  }
}), De = () => ({
  buttonProps: {
    "aria-label": u.gettext("Insert a quote"),
    title: u.gettext("Insert a quote")
  },
  execute: ({ initialState: t, textApi: e, setText: r }) => {
    const s = T({
      text: t.text,
      selection: t.selection
    }), n = e.setSelectionRange(s), a = ee(
      n.text,
      n.selection.start
    ), i = Array(a + 1).join(`
`), l = te(
      n.text,
      n.selection.end
    ), x = Array(l + 1).join(`
`);
    e.replaceSelection(
      `${i}> ${n.selectedText}${x}`
    );
    const d = n.selection.start + a + 2, p = d + n.selectedText.length;
    r(
      e.setSelectionRange({
        start: d,
        end: p
      }).text
    );
  }
}), Ye = () => ({
  buttonProps: {
    "aria-label": u.gettext("Add strikethrough text"),
    title: u.gettext("Add strikethrough text")
  },
  execute: ({ initialState: t, textApi: e, setText: r }) => {
    const s = T({
      text: t.text,
      selection: t.selection
    }), n = e.setSelectionRange(s), a = e.replaceSelection(`~~${n.selectedText}~~`);
    r(
      e.setSelectionRange({
        start: a.selection.end - 2 - n.selectedText.length,
        end: a.selection.end - 2
      }).text
    );
  }
}), Fe = () => [
  ["header", "bold", "italic", "strikethrough"],
  ["link", "quote", "code", "image"],
  ["unorderedList", "orderedList", "checkedList"]
], pe = () => ({
  header: Oe,
  bold: je,
  italic: Me,
  strikethrough: Ye,
  link: Le,
  quote: De,
  code: Ne,
  image: $e,
  unorderedList: Ie,
  orderedList: qe,
  checkedList: Be
});
function Z() {
  return "save-image";
}
var L = { exports: {} }, $ = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var le;
function We() {
  if (le) return $;
  le = 1;
  var t = Symbol.for("react.transitional.element"), e = Symbol.for("react.fragment");
  function r(s, n, a) {
    var i = null;
    if (a !== void 0 && (i = "" + a), n.key !== void 0 && (i = "" + n.key), "key" in n) {
      a = {};
      for (var l in n)
        l !== "key" && (a[l] = n[l]);
    } else a = n;
    return n = a.ref, {
      $$typeof: t,
      type: s,
      key: i,
      ref: n !== void 0 ? n : null,
      props: a
    };
  }
  return $.Fragment = e, $.jsx = r, $.jsxs = r, $;
}
var M = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var de;
function Ke() {
  return de || (de = 1, process.env.NODE_ENV !== "production" && function() {
    function t(o) {
      if (o == null) return null;
      if (typeof o == "function")
        return o.$$typeof === E ? null : o.displayName || o.name || null;
      if (typeof o == "string") return o;
      switch (o) {
        case N:
          return "Fragment";
        case D:
          return "Profiler";
        case B:
          return "StrictMode";
        case F:
          return "Suspense";
        case W:
          return "SuspenseList";
        case O:
          return "Activity";
      }
      if (typeof o == "object")
        switch (typeof o.tag == "number" && console.error(
          "Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."
        ), o.$$typeof) {
          case j:
            return "Portal";
          case w:
            return (o.displayName || "Context") + ".Provider";
          case P:
            return (o._context.displayName || "Context") + ".Consumer";
          case Y:
            var c = o.render;
            return o = o.displayName, o || (o = c.displayName || c.name || "", o = o !== "" ? "ForwardRef(" + o + ")" : "ForwardRef"), o;
          case K:
            return c = o.displayName || null, c !== null ? c : t(o.type) || "Memo";
          case y:
            c = o._payload, o = o._init;
            try {
              return t(o(c));
            } catch {
            }
        }
      return null;
    }
    function e(o) {
      return "" + o;
    }
    function r(o) {
      try {
        e(o);
        var c = !1;
      } catch {
        c = !0;
      }
      if (c) {
        c = console;
        var m = c.error, g = typeof Symbol == "function" && Symbol.toStringTag && o[Symbol.toStringTag] || o.constructor.name || "Object";
        return m.call(
          c,
          "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.",
          g
        ), e(o);
      }
    }
    function s(o) {
      if (o === N) return "<>";
      if (typeof o == "object" && o !== null && o.$$typeof === y)
        return "<...>";
      try {
        var c = t(o);
        return c ? "<" + c + ">" : "<...>";
      } catch {
        return "<...>";
      }
    }
    function n() {
      var o = U.A;
      return o === null ? null : o.getOwner();
    }
    function a() {
      return Error("react-stack-top-frame");
    }
    function i(o) {
      if (re.call(o, "key")) {
        var c = Object.getOwnPropertyDescriptor(o, "key").get;
        if (c && c.isReactWarning) return !1;
      }
      return o.key !== void 0;
    }
    function l(o, c) {
      function m() {
        oe || (oe = !0, console.error(
          "%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)",
          c
        ));
      }
      m.isReactWarning = !0, Object.defineProperty(o, "key", {
        get: m,
        configurable: !0
      });
    }
    function x() {
      var o = t(this.type);
      return ae[o] || (ae[o] = !0, console.error(
        "Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."
      )), o = this.props.ref, o !== void 0 ? o : null;
    }
    function d(o, c, m, g, R, _, G, H) {
      return m = _.ref, o = {
        $$typeof: C,
        type: o,
        key: c,
        props: _,
        _owner: R
      }, (m !== void 0 ? m : null) !== null ? Object.defineProperty(o, "ref", {
        enumerable: !1,
        get: x
      }) : Object.defineProperty(o, "ref", { enumerable: !1, value: null }), o._store = {}, Object.defineProperty(o._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: 0
      }), Object.defineProperty(o, "_debugInfo", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: null
      }), Object.defineProperty(o, "_debugStack", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: G
      }), Object.defineProperty(o, "_debugTask", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: H
      }), Object.freeze && (Object.freeze(o.props), Object.freeze(o)), o;
    }
    function p(o, c, m, g, R, _, G, H) {
      var b = c.children;
      if (b !== void 0)
        if (g)
          if (ye(b)) {
            for (g = 0; g < b.length; g++)
              f(b[g]);
            Object.freeze && Object.freeze(b);
          } else
            console.error(
              "React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead."
            );
        else f(b);
      if (re.call(c, "key")) {
        b = t(o);
        var S = Object.keys(c).filter(function(ve) {
          return ve !== "key";
        });
        g = 0 < S.length ? "{key: someKey, " + S.join(": ..., ") + ": ...}" : "{key: someKey}", ie[b + g] || (S = 0 < S.length ? "{" + S.join(": ..., ") + ": ...}" : "{}", console.error(
          `A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`,
          g,
          b,
          S,
          b
        ), ie[b + g] = !0);
      }
      if (b = null, m !== void 0 && (r(m), b = "" + m), i(c) && (r(c.key), b = "" + c.key), "key" in c) {
        m = {};
        for (var J in c)
          J !== "key" && (m[J] = c[J]);
      } else m = c;
      return b && l(
        m,
        typeof o == "function" ? o.displayName || o.name || "Unknown" : o
      ), d(
        o,
        b,
        _,
        R,
        n(),
        m,
        G,
        H
      );
    }
    function f(o) {
      typeof o == "object" && o !== null && o.$$typeof === C && o._store && (o._store.validated = 1);
    }
    var k = Ce, C = Symbol.for("react.transitional.element"), j = Symbol.for("react.portal"), N = Symbol.for("react.fragment"), B = Symbol.for("react.strict_mode"), D = Symbol.for("react.profiler"), P = Symbol.for("react.consumer"), w = Symbol.for("react.context"), Y = Symbol.for("react.forward_ref"), F = Symbol.for("react.suspense"), W = Symbol.for("react.suspense_list"), K = Symbol.for("react.memo"), y = Symbol.for("react.lazy"), O = Symbol.for("react.activity"), E = Symbol.for("react.client.reference"), U = k.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, re = Object.prototype.hasOwnProperty, ye = Array.isArray, V = console.createTask ? console.createTask : function() {
      return null;
    };
    k = {
      "react-stack-bottom-frame": function(o) {
        return o();
      }
    };
    var oe, ae = {}, se = k["react-stack-bottom-frame"].bind(
      k,
      a
    )(), ce = V(s(a)), ie = {};
    M.Fragment = N, M.jsx = function(o, c, m, g, R) {
      var _ = 1e4 > U.recentlyCreatedOwnerStacks++;
      return p(
        o,
        c,
        m,
        !1,
        g,
        R,
        _ ? Error("react-stack-top-frame") : se,
        _ ? V(s(o)) : ce
      );
    }, M.jsxs = function(o, c, m, g, R) {
      var _ = 1e4 > U.recentlyCreatedOwnerStacks++;
      return p(
        o,
        c,
        m,
        !0,
        g,
        R,
        _ ? Error("react-stack-top-frame") : se,
        _ ? V(s(o)) : ce
      );
    };
  }()), M;
}
var ue;
function Ue() {
  return ue || (ue = 1, process.env.NODE_ENV === "production" ? L.exports = We() : L.exports = Ke()), L.exports;
}
var h = Ue();
const Ve = (t, e) => {
  t.setRangeText(
    e,
    t.selectionStart || 0,
    t.selectionEnd || 0,
    "select"
  );
};
function Ge(t) {
  const e = [];
  for (const r in t)
    t.hasOwnProperty.call(t, r) && t[r]().handleKeyCommand && e.push(r);
  return e;
}
class He {
  refTextarea;
  constructor(e) {
    this.refTextarea = e;
  }
  replaceSelection = (e) => {
    const r = this.refTextarea.current;
    return Ve(r, e), z(r);
  };
  setSelectionRange = (e) => {
    const r = this.refTextarea.current;
    return r.focus(), r.selectionStart = e.start, r.selectionEnd = e.end, z(r);
  };
  getState = () => {
    const e = this.refTextarea.current;
    return z(e);
  };
}
const z = (t) => ({
  selection: {
    start: t.selectionStart,
    end: t.selectionEnd
  },
  text: t.value,
  selectedText: t.value.slice(
    t.selectionStart,
    t.selectionEnd
  )
});
class Je {
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
    setText: e,
    customCommands: r,
    refTextarea: s,
    pasteOptions: n
  }) {
    if (n && !n.saveImage)
      throw new Error("paste options are incomplete. saveImage are required ");
    this.commandMap = { ...pe(), ...r || {} }, this.pasteOptions = n, this.keyActivatedCommands = Ge(r), this.refTextarea = s, this.textApi = new He(s), this.setText = e;
  }
  getCommand = (e) => {
    const r = this.commandMap[e];
    if (!r)
      throw new Error(`Cannot execute command. Command not found: ${e}`);
    return r();
  };
  /**
   * Tries to find a command the wants to handle the keyboard event.
   * If a command is found, it is executed and the function returns
   */
  handleKeyCommand = async (e) => {
    for (const r of this.keyActivatedCommands)
      if (this.getCommand(r)?.handleKeyCommand?.(e))
        return await this.executeCommand(r), !0;
    return !1;
  };
  executeCommand = async (e, r) => {
    if (this.isExecuting)
      return;
    this.isExecuting = !0;
    const s = this.refTextarea.current, n = z(s);
    await this.getCommand(e).execute({
      setText: this.setText,
      initialState: n,
      textApi: this.textApi,
      context: r
    }), this.isExecuting = !1;
  };
  /**
   * Executes the paste command
   */
  executePasteCommand = async (e) => {
    if (this.pasteOptions)
      return this.executeCommand(
        this.pasteOptions.command || Z(),
        {
          pasteOptions: this.pasteOptions,
          event: e
        }
      );
  };
  /**
   * Executes the drop command
   */
  executeDropCommand = async (e) => {
    if (this.pasteOptions)
      return this.executeCommand(
        this.pasteOptions.command || Z(),
        {
          pasteOptions: this.pasteOptions,
          event: e
        }
      );
  };
  /**
   * Executes the "select image" command
   */
  executeSelectImageCommand = async (e) => {
    if (this.pasteOptions)
      return this.executeCommand(
        this.pasteOptions.command || Z(),
        {
          pasteOptions: this.pasteOptions,
          event: e
        }
      );
  };
  /**
   * Returns a command by name
   * @param name
   */
  getCommandByName = (e) => this.commandMap[e];
}
/**
 * @license lucide-react v0.524.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Xe = (t) => t.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(), Ze = (t) => t.replace(
  /^([A-Z])|[\s-_]+(\w)/g,
  (e, r, s) => s ? s.toUpperCase() : r.toLowerCase()
), me = (t) => {
  const e = Ze(t);
  return e.charAt(0).toUpperCase() + e.slice(1);
}, ge = (...t) => t.filter((e, r, s) => !!e && e.trim() !== "" && s.indexOf(e) === r).join(" ").trim(), Qe = (t) => {
  for (const e in t)
    if (e.startsWith("aria-") || e === "role" || e === "title")
      return !0;
};
/**
 * @license lucide-react v0.524.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
var et = {
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
 * @license lucide-react v0.524.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const tt = q(
  ({
    color: t = "currentColor",
    size: e = 24,
    strokeWidth: r = 2,
    absoluteStrokeWidth: s,
    className: n = "",
    children: a,
    iconNode: i,
    ...l
  }, x) => I(
    "svg",
    {
      ref: x,
      ...et,
      width: e,
      height: e,
      stroke: t,
      strokeWidth: s ? Number(r) * 24 / Number(e) : r,
      className: ge("lucide", n),
      ...!a && !Qe(l) && { "aria-hidden": "true" },
      ...l
    },
    [
      ...i.map(([d, p]) => I(d, p)),
      ...Array.isArray(a) ? a : [a]
    ]
  )
);
/**
 * @license lucide-react v0.524.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const v = (t, e) => {
  const r = q(
    ({ className: s, ...n }, a) => I(tt, {
      ref: a,
      iconNode: e,
      className: ge(
        `lucide-${Xe(me(t))}`,
        `lucide-${t}`,
        s
      ),
      ...n
    })
  );
  return r.displayName = me(t), r;
};
/**
 * @license lucide-react v0.524.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const nt = [
  [
    "path",
    { d: "M6 12h9a4 4 0 0 1 0 8H7a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h7a4 4 0 0 1 0 8", key: "mg9rjx" }
  ]
], rt = v("bold", nt);
/**
 * @license lucide-react v0.524.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ot = [
  ["path", { d: "m18 16 4-4-4-4", key: "1inbqp" }],
  ["path", { d: "m6 8-4 4 4 4", key: "15zrgr" }],
  ["path", { d: "m14.5 4-5 16", key: "e7oirm" }]
], at = v("code-xml", ot);
/**
 * @license lucide-react v0.524.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const st = [
  ["path", { d: "M6 12h12", key: "8npq4p" }],
  ["path", { d: "M6 20V4", key: "1w1bmo" }],
  ["path", { d: "M18 20V4", key: "o2hl4u" }]
], ct = v("heading", st);
/**
 * @license lucide-react v0.524.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const it = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", ry: "2", key: "1m3agn" }],
  ["circle", { cx: "9", cy: "9", r: "2", key: "af1f0g" }],
  ["path", { d: "m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21", key: "1xmnt7" }]
], lt = v("image", it);
/**
 * @license lucide-react v0.524.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const dt = [
  ["line", { x1: "19", x2: "10", y1: "4", y2: "4", key: "15jd3p" }],
  ["line", { x1: "14", x2: "5", y1: "20", y2: "20", key: "bu0au3" }],
  ["line", { x1: "15", x2: "9", y1: "4", y2: "20", key: "uljnxc" }]
], ut = v("italic", dt);
/**
 * @license lucide-react v0.524.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const mt = [
  ["path", { d: "M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71", key: "1cjeqo" }],
  ["path", { d: "M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71", key: "19qd67" }]
], ht = v("link", mt);
/**
 * @license lucide-react v0.524.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ft = [
  ["path", { d: "m3 17 2 2 4-4", key: "1jhpwq" }],
  ["path", { d: "m3 7 2 2 4-4", key: "1obspn" }],
  ["path", { d: "M13 6h8", key: "15sg57" }],
  ["path", { d: "M13 12h8", key: "h98zly" }],
  ["path", { d: "M13 18h8", key: "oe0vm4" }]
], xt = v("list-checks", ft);
/**
 * @license lucide-react v0.524.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const pt = [
  ["path", { d: "M10 12h11", key: "6m4ad9" }],
  ["path", { d: "M10 18h11", key: "11hvi2" }],
  ["path", { d: "M10 6h11", key: "c7qv1k" }],
  ["path", { d: "M4 10h2", key: "16xx2s" }],
  ["path", { d: "M4 6h1v4", key: "cnovpq" }],
  ["path", { d: "M6 18H4c0-1 2-2 2-3s-1-1.5-2-1", key: "m9a95d" }]
], gt = v("list-ordered", pt);
/**
 * @license lucide-react v0.524.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const bt = [
  ["path", { d: "M3 12h.01", key: "nlz23k" }],
  ["path", { d: "M3 18h.01", key: "1tta3j" }],
  ["path", { d: "M3 6h.01", key: "1rqtza" }],
  ["path", { d: "M8 12h13", key: "1za7za" }],
  ["path", { d: "M8 18h13", key: "1lx6n3" }],
  ["path", { d: "M8 6h13", key: "ik3vkj" }]
], kt = v("list", bt);
/**
 * @license lucide-react v0.524.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const yt = [
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
], vt = v("quote", yt);
/**
 * @license lucide-react v0.524.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ct = [
  ["path", { d: "M16 4H9a3 3 0 0 0-2.83 4", key: "43sutm" }],
  ["path", { d: "M14 12a4 4 0 0 1 0 8H6", key: "nlfj13" }],
  ["line", { x1: "4", x2: "20", y1: "12", y2: "12", key: "1e0a9i" }]
], _t = v("strikethrough", Ct), Tt = "fc-mde__main_e76010f9ac3f69e6", Rt = {
  main: Tt
}, wt = (t) => /* @__PURE__ */ h.jsx("div", { "data-fc-mde-svg-icon-container": !0, ...t }), Et = ({ icon: t }) => {
  const e = {
    header: ct,
    bold: rt,
    italic: ut,
    strikethrough: _t,
    code: at,
    quote: vt,
    unorderedList: gt,
    orderedList: kt,
    checkedList: xt,
    link: ht,
    image: lt
  }[t] ?? null;
  return e ? /* @__PURE__ */ h.jsx(wt, { children: /* @__PURE__ */ h.jsx(e, { className: Rt.main, "data-fc-mde-svg-icon": !0 }) }) : null;
}, St = "fc-mde__content_59ee8347a45e0596", he = {
  content: St
}, be = q(
  ({ markdown: t, generateMarkdownPreview: e, loadingPreview: r }, s) => {
    const [n, a] = X(!0), [i, l] = X(""), [x, d] = X(""), p = Q(async () => {
      l(await e(t)), a(!1);
    }, [e, t]);
    _e(() => {
      t !== x && (p(), d(t));
    }, [x, t, p]);
    const f = n ? /* @__PURE__ */ h.jsx("div", { className: he.content, "data-fc-mde-preview-content": !0, children: r }) : /* @__PURE__ */ h.jsx(
      "div",
      {
        className: he.content,
        ref: s,
        "data-fc-mde-preview-content": !0,
        dangerouslySetInnerHTML: { __html: i }
      }
    );
    return /* @__PURE__ */ h.jsx("div", { "data-fc-mde-preview": !0, "data-loading": n || void 0, children: f });
  }
);
be.displayName = "MdePreview";
const At = "fc-mde__container_5d480c472a769b14", jt = "fc-mde__main_bbe7a060507c7387", fe = {
  container: At,
  main: jt
}, ke = q(
  ({ value: t, setValue: e, textareaComponent: r, onKeyCommand: s, ...n }, a) => {
    const i = r || "textarea", l = Q((d) => {
      d.preventDefault(), (d.clipboardData.files ?? []).length;
    }, []), x = Q(
      (d) => {
        e(d.target.value);
      },
      [e]
    );
    return /* @__PURE__ */ h.jsx("div", { className: fe.container, "data-fc-mde-textarea-container": !0, children: /* @__PURE__ */ h.jsx(
      i,
      {
        ref: a,
        className: fe.main,
        value: t,
        onChange: x,
        onKeyDown: s,
        onPaste: l,
        "data-fc-mde-textarea": !0,
        ...n
      }
    ) });
  }
);
ke.displayName = "MdeTextarea";
const Nt = "fc-mde__tab_707475e156219802", Pt = "fc-mde__tabButton_5a17ac662ec07934", Ot = "fc-mde__header_1d136c3d982ffdcc", $t = "fc-mde__btnGroup_b384efee5a15e109", Mt = "fc-mde__btn_a61d3b8445301110", A = {
  tab: Nt,
  tabButton: Pt,
  header: Ot,
  btnGroup: $t,
  btn: Mt
}, Lt = {
  tabIndex: -1
}, zt = ({
  buttonComponentClass: t,
  buttonContent: e,
  buttonProps: r,
  onClick: s,
  readOnly: n,
  name: a
}) => {
  const i = { ...Lt, ...r || {} }, l = t || "button";
  return /* @__PURE__ */ h.jsx("div", { className: A.btn, "data-fc-mde-toolbar-button": !0, children: I(
    l,
    {
      "data-fc-mde-toolbar-button-item": !0,
      "data-name": a,
      ...i,
      onClick: s,
      disabled: n,
      type: "button"
    },
    e
  ) });
}, It = ({
  hidden: t,
  children: e
}) => /* @__PURE__ */ h.jsx(
  "div",
  {
    className: A.btnGroup,
    "data-fc-mde-toolbar-button-group": !0,
    "data-hidden": t || void 0,
    children: e
  }
), qt = ({
  onTabChange: t,
  buttons: e,
  onCommand: r,
  readOnly: s,
  disablePreview: n,
  writeButtonProps: a,
  previewButtonProps: i,
  tab: l,
  buttonProps: x
}) => {
  const d = (f, k) => {
    f.preventDefault(), t(k);
  };
  if (!e?.length)
    return null;
  const p = /* @__PURE__ */ h.jsxs("div", { className: A.tab, "data-fc-mde-tab": !0, children: [
    /* @__PURE__ */ h.jsx(
      "button",
      {
        type: "button",
        className: A.tabButton,
        "data-fc-mde-tab-button": !0,
        onClick: (f) => d(f, "write"),
        "data-active": l === "write" || void 0,
        ...a,
        children: u.gettext("Write")
      }
    ),
    /* @__PURE__ */ h.jsx(
      "button",
      {
        type: "button",
        className: A.tabButton,
        "data-fc-mde-tab-button": !0,
        onClick: (f) => d(f, "preview"),
        "data-active": l === "preview" || void 0,
        ...i,
        children: u.gettext("Preview")
      }
    )
  ] });
  return /* @__PURE__ */ h.jsxs("div", { className: A.header, "data-fc-mde-header": !0, children: [
    n || p,
    e.map((f, k) => /* @__PURE__ */ h.jsx(It, { hidden: l === "preview", children: f.map((C, j) => /* @__PURE__ */ h.jsx(
      zt,
      {
        name: C.commandName,
        buttonContent: C.buttonContent,
        buttonProps: { ...x || {}, ...C.buttonProps },
        onClick: () => r(C.commandName),
        readOnly: s,
        buttonComponentClass: C.buttonComponentClass
      },
      j
    )) }, k))
  ] });
}, Bt = "fc-mde__main_c29a242caf055ec0", Dt = "fc-mde__container_8e4c12095dec4180", xe = {
  main: Bt,
  container: Dt
}, Ft = ({
  setText: t,
  refTextarea: e,
  commands: r = pe(),
  toolbarCommands: s = Fe(),
  getIcon: n = (P) => /* @__PURE__ */ h.jsx(Et, { icon: P }),
  readOnly: a = !1,
  selectedTab: i = "write",
  disablePreview: l = !1,
  paste: x,
  onTabChange: d,
  loadingPreview: p,
  text: f,
  generateMarkdownPreview: k,
  textareaComponent: C,
  commandButtons: j,
  writeButton: N,
  previewButton: B,
  textareaProps: D
}) => {
  const P = Te(null), w = new Je({
    setText: t,
    customCommands: r,
    refTextarea: e,
    pasteOptions: x
  }), Y = async (y) => {
    x?.saveImage && await w.executePasteCommand(y);
  }, F = (y) => {
    d(y);
  }, W = async (y) => {
    await w.executeCommand(y);
  }, K = s.map((y) => y.map((O) => {
    const E = w.getCommand(O);
    return {
      commandName: O,
      buttonContent: E.icon ? E.icon(n) : n(O),
      buttonProps: E.buttonProps,
      buttonComponentClass: E.buttonComponentClass
    };
  })).filter((y) => y);
  return /* @__PURE__ */ h.jsxs("div", { className: xe.main, "data-fc-mde": !0, children: [
    /* @__PURE__ */ h.jsx(
      qt,
      {
        buttons: K,
        onCommand: W,
        onTabChange: F,
        tab: i,
        readOnly: a,
        disablePreview: l,
        buttonProps: j,
        writeButtonProps: N,
        previewButtonProps: B
      }
    ),
    /* @__PURE__ */ h.jsx(
      "div",
      {
        className: xe.container,
        "data-fc-mde-container": !0,
        "data-hidden": i === "preview" || void 0,
        children: /* @__PURE__ */ h.jsx(
          ke,
          {
            ref: e,
            value: f,
            setValue: t,
            textareaComponent: C,
            onKeyCommand: w.handleKeyCommand,
            onPaste: Y,
            ...D
          }
        )
      }
    ),
    i !== "write" && /* @__PURE__ */ h.jsx(
      be,
      {
        ref: P,
        loadingPreview: p,
        generateMarkdownPreview: k,
        markdown: f
      }
    )
  ] });
};
export {
  Ft as Mde,
  pe as getDefaultCommandMap,
  Fe as getDefaultToolbarCommands,
  T as selectWord
};
