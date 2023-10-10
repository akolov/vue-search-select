import { cloneVNode as Ge, h as D, Fragment as ve, inject as le, provide as G, defineComponent as xe, ref as E, computed as V, watchEffect as ge, onMounted as ne, onUnmounted as Ae, Teleport as tn, reactive as nn, watch as W, normalizeClass as Y, unref as de, shallowRef as xt, getCurrentScope as rn, onScopeDispose as on, shallowReadonly as ce, mergeProps as Ee, toRef as st, nextTick as sn, onBeforeUnmount as ln, createCommentVNode as $e, Transition as an, resolveComponent as Ot, openBlock as _, createElementBlock as ee, createElementVNode as K, withModifiers as z, withKeys as N, createVNode as Tt, withCtx as St, toDisplayString as he, normalizeStyle as He, renderList as We, renderSlot as ze, createTextVNode as Ue, withDirectives as un, vModelText as cn } from "vue";
const B = {
  // cursor on input
  openOptions(e) {
    e.$refs.input.focus(), e.showMenu = !0, e.mousedownState = !1;
  },
  blurInput(e) {
    e.mousedownState || (e.searchText = "", e.closeOptions()), e.$emit("blur");
  },
  closeOptions(e) {
    e.$refs.input.blur(), e.showMenu = !1;
  },
  /**
   * up arrow key
   * 上の移動するときには新しいscroll位置を毎回セットする
   * Always scroll move, when "up arrow key" entered
   */
  prevItem(e) {
    const t = e.pointer - 1, n = e.$el.offsetHeight * t;
    t >= 0 && (e.pointer = t), e.$refs.menu.scrollTop = n;
  },
  /**
   *
   * down arrow key
   * ページsizeを計算してずれたらmove
   * calculate page size. If different between itemPage and currentPage move scroll
   */
  nextItem(e) {
    const t = e.pointer + 1, n = e.$el.offsetHeight * t;
    t <= e.filteredOptions.length - 1 && (e.pointer = t);
    const i = e.$refs.menu.offsetHeight, r = Math.ceil((e.$refs.menu.scrollTop + e.$el.offsetHeight) / i), o = Math.ceil(n / i);
    r !== o && (e.$refs.menu.scrollTop = (o - 1) * e.$refs.menu.offsetHeight);
  },
  // down enter key
  enterItem(e) {
    const t = e.filteredOptions[e.pointer], n = t.disabled;
    t && !n && e.selectItem(t);
  },
  // mouse enter event on item
  pointerSet(e, t) {
    e.pointer = t;
  },
  pointerAdjust(e) {
    e.pointer >= e.filteredOptions.length - 1 && (e.pointer = e.filteredOptions.length ? e.filteredOptions.length - 1 : 0);
  },
  mousedownItem(e) {
    e.mousedownState = !0;
  }
};
function dn(e) {
  return new RegExp(e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i");
}
const je = {
  props: {
    id: {
      default: null
    },
    name: {
      type: String,
      default: ""
    },
    isError: {
      type: Boolean,
      default: !1
    },
    customAttr: {
      type: Function,
      default: () => ""
    },
    isDisabled: {
      type: Boolean,
      default: !1
    },
    placeholder: {
      type: String,
      default: ""
    },
    filterPredicate: {
      type: Function,
      default: (e, t) => e.match(dn(t))
    }
  }
};
function ye(e, t, ...n) {
  if (e in t) {
    let r = t[e];
    return typeof r == "function" ? r(...n) : r;
  }
  let i = new Error(`Tried to handle "${e}" but there is no handler defined. Only defined handlers are: ${Object.keys(t).map((r) => `"${r}"`).join(", ")}.`);
  throw Error.captureStackTrace && Error.captureStackTrace(i, ye), i;
}
var Ct = ((e) => (e[e.None = 0] = "None", e[e.RenderStrategy = 1] = "RenderStrategy", e[e.Static = 2] = "Static", e))(Ct || {}), te = ((e) => (e[e.Unmount = 0] = "Unmount", e[e.Hidden = 1] = "Hidden", e))(te || {});
function Oe({ visible: e = !0, features: t = 0, ourProps: n, theirProps: i, ...r }) {
  var o;
  let l = At(i, n), s = Object.assign(r, { props: l });
  if (e || t & 2 && l.static)
    return ke(s);
  if (t & 1) {
    let a = (o = l.unmount) == null || o ? 0 : 1;
    return ye(a, { [0]() {
      return null;
    }, [1]() {
      return ke({ ...r, props: { ...l, hidden: !0, style: { display: "none" } } });
    } });
  }
  return ke(s);
}
function ke({ props: e, attrs: t, slots: n, slot: i, name: r }) {
  var o, l;
  let { as: s, ...a } = It(e, ["unmount", "static"]), u = (o = n.default) == null ? void 0 : o.call(n, i), v = {};
  if (i) {
    let m = !1, p = [];
    for (let [f, c] of Object.entries(i))
      typeof c == "boolean" && (m = !0), c === !0 && p.push(f);
    m && (v["data-headlessui-state"] = p.join(" "));
  }
  if (s === "template") {
    if (u = Et(u ?? []), Object.keys(a).length > 0 || Object.keys(t).length > 0) {
      let [m, ...p] = u ?? [];
      if (!fn(m) || p.length > 0)
        throw new Error(['Passing props on "template"!', "", `The current component <${r} /> is rendering a "template".`, "However we need to passthrough the following props:", Object.keys(a).concat(Object.keys(t)).map((h) => h.trim()).filter((h, y, g) => g.indexOf(h) === y).sort((h, y) => h.localeCompare(y)).map((h) => `  - ${h}`).join(`
`), "", "You can apply a few solutions:", ['Add an `as="..."` prop, to ensure that we render an actual element instead of a "template".', "Render a single element as the child so that we can forward the props onto that element."].map((h) => `  - ${h}`).join(`
`)].join(`
`));
      let f = At((l = m.props) != null ? l : {}, a), c = Ge(m, f);
      for (let h in f)
        h.startsWith("on") && (c.props || (c.props = {}), c.props[h] = f[h]);
      return c;
    }
    return Array.isArray(u) && u.length === 1 ? u[0] : u;
  }
  return D(s, Object.assign({}, a, v), { default: () => u });
}
function Et(e) {
  return e.flatMap((t) => t.type === ve ? Et(t.children) : [t]);
}
function At(...e) {
  if (e.length === 0)
    return {};
  if (e.length === 1)
    return e[0];
  let t = {}, n = {};
  for (let i of e)
    for (let r in i)
      r.startsWith("on") && typeof i[r] == "function" ? (n[r] != null || (n[r] = []), n[r].push(i[r])) : t[r] = i[r];
  if (t.disabled || t["aria-disabled"])
    return Object.assign(t, Object.fromEntries(Object.keys(n).map((i) => [i, void 0])));
  for (let i in n)
    Object.assign(t, { [i](r, ...o) {
      let l = n[i];
      for (let s of l) {
        if (r instanceof Event && r.defaultPrevented)
          return;
        s(r, ...o);
      }
    } });
  return t;
}
function It(e, t = []) {
  let n = Object.assign({}, e);
  for (let i of t)
    i in n && delete n[i];
  return n;
}
function fn(e) {
  return e == null ? !1 : typeof e.type == "string" || typeof e.type == "object" || typeof e.type == "function";
}
let pn = 0;
function mn() {
  return ++pn;
}
function hn() {
  return mn();
}
function Ie(e) {
  var t;
  return e == null || e.value == null ? null : (t = e.value.$el) != null ? t : e.value;
}
let Ft = Symbol("Context");
var X = ((e) => (e[e.Open = 1] = "Open", e[e.Closed = 2] = "Closed", e[e.Closing = 4] = "Closing", e[e.Opening = 8] = "Opening", e))(X || {});
function vn() {
  return Pt() !== null;
}
function Pt() {
  return le(Ft, null);
}
function gn(e) {
  G(Ft, e);
}
var yn = Object.defineProperty, wn = (e, t, n) => t in e ? yn(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n, lt = (e, t, n) => (wn(e, typeof t != "symbol" ? t + "" : t, n), n);
class bn {
  constructor() {
    lt(this, "current", this.detect()), lt(this, "currentId", 0);
  }
  set(t) {
    this.current !== t && (this.currentId = 0, this.current = t);
  }
  reset() {
    this.set(this.detect());
  }
  nextId() {
    return ++this.currentId;
  }
  get isServer() {
    return this.current === "server";
  }
  get isClient() {
    return this.current === "client";
  }
  detect() {
    return typeof window > "u" || typeof document > "u" ? "server" : "client";
  }
}
let Rt = new bn();
function Lt(e) {
  if (Rt.isServer)
    return null;
  if (e instanceof Node)
    return e.ownerDocument;
  if (e != null && e.hasOwnProperty("value")) {
    let t = Ie(e);
    if (t)
      return t.ownerDocument;
  }
  return document;
}
function xn(e) {
  typeof queueMicrotask == "function" ? queueMicrotask(e) : Promise.resolve().then(e).catch((t) => setTimeout(() => {
    throw t;
  }));
}
function Qe() {
  let e = [], t = { addEventListener(n, i, r, o) {
    return n.addEventListener(i, r, o), t.add(() => n.removeEventListener(i, r, o));
  }, requestAnimationFrame(...n) {
    let i = requestAnimationFrame(...n);
    t.add(() => cancelAnimationFrame(i));
  }, nextFrame(...n) {
    t.requestAnimationFrame(() => {
      t.requestAnimationFrame(...n);
    });
  }, setTimeout(...n) {
    let i = setTimeout(...n);
    t.add(() => clearTimeout(i));
  }, microTask(...n) {
    let i = { current: !0 };
    return xn(() => {
      i.current && n[0]();
    }), t.add(() => {
      i.current = !1;
    });
  }, style(n, i, r) {
    let o = n.style.getPropertyValue(i);
    return Object.assign(n.style, { [i]: r }), this.add(() => {
      Object.assign(n.style, { [i]: o });
    });
  }, group(n) {
    let i = Qe();
    return n(i), this.add(() => i.dispose());
  }, add(n) {
    return e.push(n), () => {
      let i = e.indexOf(n);
      if (i >= 0)
        for (let r of e.splice(i, 1))
          r();
    };
  }, dispose() {
    for (let n of e.splice(0))
      n();
  } };
  return t;
}
let jt = Symbol("ForcePortalRootContext");
function On() {
  return le(jt, !1);
}
xe({ name: "ForcePortalRoot", props: { as: { type: [Object, String], default: "template" }, force: { type: Boolean, default: !1 } }, setup(e, { slots: t, attrs: n }) {
  return G(jt, e.force), () => {
    let { force: i, ...r } = e;
    return Oe({ theirProps: r, ourProps: {}, slot: {}, slots: t, attrs: n, name: "ForcePortalRoot" });
  };
} });
function Tn(e) {
  let t = Lt(e);
  if (!t) {
    if (e === null)
      return null;
    throw new Error(`[Headless UI]: Cannot find ownerDocument for contextElement: ${e}`);
  }
  let n = t.getElementById("headlessui-portal-root");
  if (n)
    return n;
  let i = t.createElement("div");
  return i.setAttribute("id", "headlessui-portal-root"), t.body.appendChild(i);
}
let Sn = xe({ name: "Portal", props: { as: { type: [Object, String], default: "div" } }, setup(e, { slots: t, attrs: n }) {
  let i = E(null), r = V(() => Lt(i)), o = On(), l = le(Bt, null), s = E(o === !0 || l == null ? Tn(i.value) : l.resolveTarget());
  ge(() => {
    o || l != null && (s.value = l.resolveTarget());
  });
  let a = le(Cn, null);
  return ne(() => {
    let u = Ie(i);
    u && a && Ae(a.register(u));
  }), Ae(() => {
    var u, v;
    let m = (u = r.value) == null ? void 0 : u.getElementById("headlessui-portal-root");
    m && s.value === m && s.value.children.length <= 0 && ((v = s.value.parentElement) == null || v.removeChild(s.value));
  }), () => {
    if (s.value === null)
      return null;
    let u = { ref: i, "data-headlessui-portal": "" };
    return D(tn, { to: s.value }, Oe({ ourProps: u, theirProps: e, slot: {}, attrs: n, slots: t, name: "Portal" }));
  };
} }), Cn = Symbol("PortalParentContext"), Bt = Symbol("PortalGroupContext");
xe({ name: "PortalGroup", props: { as: { type: [Object, String], default: "template" }, target: { type: Object, default: null } }, setup(e, { attrs: t, slots: n }) {
  let i = nn({ resolveTarget() {
    return e.target;
  } });
  return G(Bt, i), () => {
    let { target: r, ...o } = e;
    return Oe({ theirProps: o, ourProps: {}, slot: {}, attrs: t, slots: n, name: "PortalGroup" });
  };
} });
function En(e) {
  let t = { called: !1 };
  return (...n) => {
    if (!t.called)
      return t.called = !0, e(...n);
  };
}
function Ne(e, ...t) {
  e && t.length > 0 && e.classList.add(...t);
}
function Se(e, ...t) {
  e && t.length > 0 && e.classList.remove(...t);
}
var qe = ((e) => (e.Finished = "finished", e.Cancelled = "cancelled", e))(qe || {});
function An(e, t) {
  let n = Qe();
  if (!e)
    return n.dispose;
  let { transitionDuration: i, transitionDelay: r } = getComputedStyle(e), [o, l] = [i, r].map((s) => {
    let [a = 0] = s.split(",").filter(Boolean).map((u) => u.includes("ms") ? parseFloat(u) : parseFloat(u) * 1e3).sort((u, v) => v - u);
    return a;
  });
  return o !== 0 ? n.setTimeout(() => t("finished"), o + l) : t("finished"), n.add(() => t("cancelled")), n.dispose;
}
function at(e, t, n, i, r, o) {
  let l = Qe(), s = o !== void 0 ? En(o) : () => {
  };
  return Se(e, ...r), Ne(e, ...t, ...n), l.nextFrame(() => {
    Se(e, ...n), Ne(e, ...i), l.add(An(e, (a) => (Se(e, ...i, ...t), Ne(e, ...r), s(a))));
  }), l.add(() => Se(e, ...t, ...n, ...i, ...r)), l.add(() => s("cancelled")), l.dispose;
}
function oe(e = "") {
  return e.split(" ").filter((t) => t.trim().length > 1);
}
let Ze = Symbol("TransitionContext");
var In = ((e) => (e.Visible = "visible", e.Hidden = "hidden", e))(In || {});
function Fn() {
  return le(Ze, null) !== null;
}
function Pn() {
  let e = le(Ze, null);
  if (e === null)
    throw new Error("A <TransitionChild /> is used but it is missing a parent <TransitionRoot />.");
  return e;
}
function Rn() {
  let e = le(Je, null);
  if (e === null)
    throw new Error("A <TransitionChild /> is used but it is missing a parent <TransitionRoot />.");
  return e;
}
let Je = Symbol("NestingContext");
function Be(e) {
  return "children" in e ? Be(e.children) : e.value.filter(({ state: t }) => t === "visible").length > 0;
}
function Vt(e) {
  let t = E([]), n = E(!1);
  ne(() => n.value = !0), Ae(() => n.value = !1);
  function i(o, l = te.Hidden) {
    let s = t.value.findIndex(({ id: a }) => a === o);
    s !== -1 && (ye(l, { [te.Unmount]() {
      t.value.splice(s, 1);
    }, [te.Hidden]() {
      t.value[s].state = "hidden";
    } }), !Be(t) && n.value && (e == null || e()));
  }
  function r(o) {
    let l = t.value.find(({ id: s }) => s === o);
    return l ? l.state !== "visible" && (l.state = "visible") : t.value.push({ id: o, state: "visible" }), () => i(o, te.Unmount);
  }
  return { children: t, register: r, unregister: i };
}
let Mt = Ct.RenderStrategy, Dt = xe({ props: { as: { type: [Object, String], default: "div" }, show: { type: [Boolean], default: null }, unmount: { type: [Boolean], default: !0 }, appear: { type: [Boolean], default: !1 }, enter: { type: [String], default: "" }, enterFrom: { type: [String], default: "" }, enterTo: { type: [String], default: "" }, entered: { type: [String], default: "" }, leave: { type: [String], default: "" }, leaveFrom: { type: [String], default: "" }, leaveTo: { type: [String], default: "" } }, emits: { beforeEnter: () => !0, afterEnter: () => !0, beforeLeave: () => !0, afterLeave: () => !0 }, setup(e, { emit: t, attrs: n, slots: i, expose: r }) {
  let o = E(0);
  function l() {
    o.value |= X.Opening, t("beforeEnter");
  }
  function s() {
    o.value &= ~X.Opening, t("afterEnter");
  }
  function a() {
    o.value |= X.Closing, t("beforeLeave");
  }
  function u() {
    o.value &= ~X.Closing, t("afterLeave");
  }
  if (!Fn() && vn())
    return () => D(jn, { ...e, onBeforeEnter: l, onAfterEnter: s, onBeforeLeave: a, onAfterLeave: u }, i);
  let v = E(null), m = V(() => e.unmount ? te.Unmount : te.Hidden);
  r({ el: v, $el: v });
  let { show: p, appear: f } = Pn(), { register: c, unregister: h } = Rn(), y = E(p.value ? "visible" : "hidden"), g = { value: !0 }, w = hn(), x = { value: !1 }, O = Vt(() => {
    !x.value && y.value !== "hidden" && (y.value = "hidden", h(w), u());
  });
  ne(() => {
    let L = c(w);
    Ae(L);
  }), ge(() => {
    if (m.value === te.Hidden && w) {
      if (p.value && y.value !== "visible") {
        y.value = "visible";
        return;
      }
      ye(y.value, { hidden: () => h(w), visible: () => c(w) });
    }
  });
  let b = oe(e.enter), S = oe(e.enterFrom), I = oe(e.enterTo), C = oe(e.entered), R = oe(e.leave), A = oe(e.leaveFrom), T = oe(e.leaveTo);
  ne(() => {
    ge(() => {
      if (y.value === "visible") {
        let L = Ie(v);
        if (L instanceof Comment && L.data === "")
          throw new Error("Did you forget to passthrough the `ref` to the actual DOM node?");
      }
    });
  });
  function F(L) {
    let P = g.value && !f.value, j = Ie(v);
    !j || !(j instanceof HTMLElement) || P || (x.value = !0, p.value && l(), p.value || a(), L(p.value ? at(j, b, S, I, C, (M) => {
      x.value = !1, M === qe.Finished && s();
    }) : at(j, R, A, T, C, (M) => {
      x.value = !1, M === qe.Finished && (Be(O) || (y.value = "hidden", h(w), u()));
    })));
  }
  return ne(() => {
    W([p], (L, P, j) => {
      F(j), g.value = !1;
    }, { immediate: !0 });
  }), G(Je, O), gn(V(() => ye(y.value, { visible: X.Open, hidden: X.Closed }) | o.value)), () => {
    let { appear: L, show: P, enter: j, enterFrom: M, enterTo: H, entered: it, leave: zr, leaveFrom: Ur, leaveTo: qr, ...ot } = e, _t = { ref: v }, en = { ...ot, ...f.value && p.value && Rt.isServer ? { class: Y([n.class, ot.class, ...b, ...S]) } : {} };
    return Oe({ theirProps: en, ourProps: _t, slot: {}, slots: i, attrs: n, features: Mt, visible: y.value === "visible", name: "TransitionChild" });
  };
} }), Ln = Dt, jn = xe({ inheritAttrs: !1, props: { as: { type: [Object, String], default: "div" }, show: { type: [Boolean], default: null }, unmount: { type: [Boolean], default: !0 }, appear: { type: [Boolean], default: !1 }, enter: { type: [String], default: "" }, enterFrom: { type: [String], default: "" }, enterTo: { type: [String], default: "" }, entered: { type: [String], default: "" }, leave: { type: [String], default: "" }, leaveFrom: { type: [String], default: "" }, leaveTo: { type: [String], default: "" } }, emits: { beforeEnter: () => !0, afterEnter: () => !0, beforeLeave: () => !0, afterLeave: () => !0 }, setup(e, { emit: t, attrs: n, slots: i }) {
  let r = Pt(), o = V(() => e.show === null && r !== null ? (r.value & X.Open) === X.Open : e.show);
  ge(() => {
    if (![!0, !1].includes(o.value))
      throw new Error('A <Transition /> is used but it is missing a `:show="true | false"` prop.');
  });
  let l = E(o.value ? "visible" : "hidden"), s = Vt(() => {
    l.value = "hidden";
  }), a = E(!0), u = { show: o, appear: V(() => e.appear || !a.value) };
  return ne(() => {
    ge(() => {
      a.value = !1, o.value ? l.value = "visible" : Be(s) || (l.value = "hidden");
    });
  }), G(Je, s), G(Ze, u), () => {
    let v = It(e, ["show", "appear", "unmount", "onBeforeEnter", "onBeforeLeave", "onAfterEnter", "onAfterLeave"]), m = { unmount: e.unmount };
    return Oe({ ourProps: { ...m, as: "template" }, theirProps: {}, slot: {}, slots: { ...i, default: () => [D(Ln, { onBeforeEnter: () => t("beforeEnter"), onAfterEnter: () => t("afterEnter"), onBeforeLeave: () => t("beforeLeave"), onAfterLeave: () => t("afterLeave"), ...n, ...m, ...v }, i.default)] }, attrs: {}, features: Mt, visible: l.value === "visible", name: "Transition" });
  };
} });
const kt = ["top", "right", "bottom", "left"], ut = ["start", "end"], ct = /* @__PURE__ */ kt.reduce((e, t) => e.concat(t, t + "-" + ut[0], t + "-" + ut[1]), []), pe = Math.min, se = Math.max, Fe = Math.round, Ce = Math.floor, re = (e) => ({
  x: e,
  y: e
}), Bn = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
}, Vn = {
  start: "end",
  end: "start"
};
function Xe(e, t, n) {
  return se(e, pe(t, n));
}
function ue(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function Q(e) {
  return e.split("-")[0];
}
function U(e) {
  return e.split("-")[1];
}
function Nt(e) {
  return e === "x" ? "y" : "x";
}
function _e(e) {
  return e === "y" ? "height" : "width";
}
function Ve(e) {
  return ["top", "bottom"].includes(Q(e)) ? "y" : "x";
}
function et(e) {
  return Nt(Ve(e));
}
function $t(e, t, n) {
  n === void 0 && (n = !1);
  const i = U(e), r = et(e), o = _e(r);
  let l = r === "x" ? i === (n ? "end" : "start") ? "right" : "left" : i === "start" ? "bottom" : "top";
  return t.reference[o] > t.floating[o] && (l = Re(l)), [l, Re(l)];
}
function Mn(e) {
  const t = Re(e);
  return [Pe(e), t, Pe(t)];
}
function Pe(e) {
  return e.replace(/start|end/g, (t) => Vn[t]);
}
function Dn(e, t, n) {
  const i = ["left", "right"], r = ["right", "left"], o = ["top", "bottom"], l = ["bottom", "top"];
  switch (e) {
    case "top":
    case "bottom":
      return n ? t ? r : i : t ? i : r;
    case "left":
    case "right":
      return t ? o : l;
    default:
      return [];
  }
}
function kn(e, t, n, i) {
  const r = U(e);
  let o = Dn(Q(e), n === "start", i);
  return r && (o = o.map((l) => l + "-" + r), t && (o = o.concat(o.map(Pe)))), o;
}
function Re(e) {
  return e.replace(/left|right|bottom|top/g, (t) => Bn[t]);
}
function Nn(e) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...e
  };
}
function Ht(e) {
  return typeof e != "number" ? Nn(e) : {
    top: e,
    right: e,
    bottom: e,
    left: e
  };
}
function Le(e) {
  return {
    ...e,
    top: e.y,
    left: e.x,
    right: e.x + e.width,
    bottom: e.y + e.height
  };
}
function dt(e, t, n) {
  let {
    reference: i,
    floating: r
  } = e;
  const o = Ve(t), l = et(t), s = _e(l), a = Q(t), u = o === "y", v = i.x + i.width / 2 - r.width / 2, m = i.y + i.height / 2 - r.height / 2, p = i[s] / 2 - r[s] / 2;
  let f;
  switch (a) {
    case "top":
      f = {
        x: v,
        y: i.y - r.height
      };
      break;
    case "bottom":
      f = {
        x: v,
        y: i.y + i.height
      };
      break;
    case "right":
      f = {
        x: i.x + i.width,
        y: m
      };
      break;
    case "left":
      f = {
        x: i.x - r.width,
        y: m
      };
      break;
    default:
      f = {
        x: i.x,
        y: i.y
      };
  }
  switch (U(t)) {
    case "start":
      f[l] -= p * (n && u ? -1 : 1);
      break;
    case "end":
      f[l] += p * (n && u ? -1 : 1);
      break;
  }
  return f;
}
const $n = async (e, t, n) => {
  const {
    placement: i = "bottom",
    strategy: r = "absolute",
    middleware: o = [],
    platform: l
  } = n, s = o.filter(Boolean), a = await (l.isRTL == null ? void 0 : l.isRTL(t));
  let u = await l.getElementRects({
    reference: e,
    floating: t,
    strategy: r
  }), {
    x: v,
    y: m
  } = dt(u, i, a), p = i, f = {}, c = 0;
  for (let h = 0; h < s.length; h++) {
    const {
      name: y,
      fn: g
    } = s[h], {
      x: w,
      y: x,
      data: O,
      reset: b
    } = await g({
      x: v,
      y: m,
      initialPlacement: i,
      placement: p,
      strategy: r,
      middlewareData: f,
      rects: u,
      platform: l,
      elements: {
        reference: e,
        floating: t
      }
    });
    if (v = w ?? v, m = x ?? m, f = {
      ...f,
      [y]: {
        ...f[y],
        ...O
      }
    }, b && c <= 50) {
      c++, typeof b == "object" && (b.placement && (p = b.placement), b.rects && (u = b.rects === !0 ? await l.getElementRects({
        reference: e,
        floating: t,
        strategy: r
      }) : b.rects), {
        x: v,
        y: m
      } = dt(u, p, a)), h = -1;
      continue;
    }
  }
  return {
    x: v,
    y: m,
    placement: p,
    strategy: r,
    middlewareData: f
  };
};
async function we(e, t) {
  var n;
  t === void 0 && (t = {});
  const {
    x: i,
    y: r,
    platform: o,
    rects: l,
    elements: s,
    strategy: a
  } = e, {
    boundary: u = "clippingAncestors",
    rootBoundary: v = "viewport",
    elementContext: m = "floating",
    altBoundary: p = !1,
    padding: f = 0
  } = ue(t, e), c = Ht(f), y = s[p ? m === "floating" ? "reference" : "floating" : m], g = Le(await o.getClippingRect({
    element: (n = await (o.isElement == null ? void 0 : o.isElement(y))) == null || n ? y : y.contextElement || await (o.getDocumentElement == null ? void 0 : o.getDocumentElement(s.floating)),
    boundary: u,
    rootBoundary: v,
    strategy: a
  })), w = m === "floating" ? {
    ...l.floating,
    x: i,
    y: r
  } : l.reference, x = await (o.getOffsetParent == null ? void 0 : o.getOffsetParent(s.floating)), O = await (o.isElement == null ? void 0 : o.isElement(x)) ? await (o.getScale == null ? void 0 : o.getScale(x)) || {
    x: 1,
    y: 1
  } : {
    x: 1,
    y: 1
  }, b = Le(o.convertOffsetParentRelativeRectToViewportRelativeRect ? await o.convertOffsetParentRelativeRectToViewportRelativeRect({
    rect: w,
    offsetParent: x,
    strategy: a
  }) : w);
  return {
    top: (g.top - b.top + c.top) / O.y,
    bottom: (b.bottom - g.bottom + c.bottom) / O.y,
    left: (g.left - b.left + c.left) / O.x,
    right: (b.right - g.right + c.right) / O.x
  };
}
const Hn = (e) => ({
  name: "arrow",
  options: e,
  async fn(t) {
    const {
      x: n,
      y: i,
      placement: r,
      rects: o,
      platform: l,
      elements: s,
      middlewareData: a
    } = t, {
      element: u,
      padding: v = 0
    } = ue(e, t) || {};
    if (u == null)
      return {};
    const m = Ht(v), p = {
      x: n,
      y: i
    }, f = et(r), c = _e(f), h = await l.getDimensions(u), y = f === "y", g = y ? "top" : "left", w = y ? "bottom" : "right", x = y ? "clientHeight" : "clientWidth", O = o.reference[c] + o.reference[f] - p[f] - o.floating[c], b = p[f] - o.reference[f], S = await (l.getOffsetParent == null ? void 0 : l.getOffsetParent(u));
    let I = S ? S[x] : 0;
    (!I || !await (l.isElement == null ? void 0 : l.isElement(S))) && (I = s.floating[x] || o.floating[c]);
    const C = O / 2 - b / 2, R = I / 2 - h[c] / 2 - 1, A = pe(m[g], R), T = pe(m[w], R), F = A, L = I - h[c] - T, P = I / 2 - h[c] / 2 + C, j = Xe(F, P, L), M = !a.arrow && U(r) != null && P != j && o.reference[c] / 2 - (P < F ? A : T) - h[c] / 2 < 0, H = M ? P < F ? P - F : P - L : 0;
    return {
      [f]: p[f] + H,
      data: {
        [f]: j,
        centerOffset: P - j - H,
        ...M && {
          alignmentOffset: H
        }
      },
      reset: M
    };
  }
});
function Wn(e, t, n) {
  return (e ? [...n.filter((r) => U(r) === e), ...n.filter((r) => U(r) !== e)] : n.filter((r) => Q(r) === r)).filter((r) => e ? U(r) === e || (t ? Pe(r) !== r : !1) : !0);
}
const zn = function(e) {
  return e === void 0 && (e = {}), {
    name: "autoPlacement",
    options: e,
    async fn(t) {
      var n, i, r;
      const {
        rects: o,
        middlewareData: l,
        placement: s,
        platform: a,
        elements: u
      } = t, {
        crossAxis: v = !1,
        alignment: m,
        allowedPlacements: p = ct,
        autoAlignment: f = !0,
        ...c
      } = ue(e, t), h = m !== void 0 || p === ct ? Wn(m || null, f, p) : p, y = await we(t, c), g = ((n = l.autoPlacement) == null ? void 0 : n.index) || 0, w = h[g];
      if (w == null)
        return {};
      const x = $t(w, o, await (a.isRTL == null ? void 0 : a.isRTL(u.floating)));
      if (s !== w)
        return {
          reset: {
            placement: h[0]
          }
        };
      const O = [y[Q(w)], y[x[0]], y[x[1]]], b = [...((i = l.autoPlacement) == null ? void 0 : i.overflows) || [], {
        placement: w,
        overflows: O
      }], S = h[g + 1];
      if (S)
        return {
          data: {
            index: g + 1,
            overflows: b
          },
          reset: {
            placement: S
          }
        };
      const I = b.map((A) => {
        const T = U(A.placement);
        return [A.placement, T && v ? (
          // Check along the mainAxis and main crossAxis side.
          A.overflows.slice(0, 2).reduce((F, L) => F + L, 0)
        ) : (
          // Check only the mainAxis.
          A.overflows[0]
        ), A.overflows];
      }).sort((A, T) => A[1] - T[1]), R = ((r = I.filter((A) => A[2].slice(
        0,
        // Aligned placements should not check their opposite crossAxis
        // side.
        U(A[0]) ? 2 : 3
      ).every((T) => T <= 0))[0]) == null ? void 0 : r[0]) || I[0][0];
      return R !== s ? {
        data: {
          index: g + 1,
          overflows: b
        },
        reset: {
          placement: R
        }
      } : {};
    }
  };
}, Un = function(e) {
  return e === void 0 && (e = {}), {
    name: "flip",
    options: e,
    async fn(t) {
      var n, i;
      const {
        placement: r,
        middlewareData: o,
        rects: l,
        initialPlacement: s,
        platform: a,
        elements: u
      } = t, {
        mainAxis: v = !0,
        crossAxis: m = !0,
        fallbackPlacements: p,
        fallbackStrategy: f = "bestFit",
        fallbackAxisSideDirection: c = "none",
        flipAlignment: h = !0,
        ...y
      } = ue(e, t);
      if ((n = o.arrow) != null && n.alignmentOffset)
        return {};
      const g = Q(r), w = Q(s) === s, x = await (a.isRTL == null ? void 0 : a.isRTL(u.floating)), O = p || (w || !h ? [Re(s)] : Mn(s));
      !p && c !== "none" && O.push(...kn(s, h, c, x));
      const b = [s, ...O], S = await we(t, y), I = [];
      let C = ((i = o.flip) == null ? void 0 : i.overflows) || [];
      if (v && I.push(S[g]), m) {
        const F = $t(r, l, x);
        I.push(S[F[0]], S[F[1]]);
      }
      if (C = [...C, {
        placement: r,
        overflows: I
      }], !I.every((F) => F <= 0)) {
        var R, A;
        const F = (((R = o.flip) == null ? void 0 : R.index) || 0) + 1, L = b[F];
        if (L)
          return {
            data: {
              index: F,
              overflows: C
            },
            reset: {
              placement: L
            }
          };
        let P = (A = C.filter((j) => j.overflows[0] <= 0).sort((j, M) => j.overflows[1] - M.overflows[1])[0]) == null ? void 0 : A.placement;
        if (!P)
          switch (f) {
            case "bestFit": {
              var T;
              const j = (T = C.map((M) => [M.placement, M.overflows.filter((H) => H > 0).reduce((H, it) => H + it, 0)]).sort((M, H) => M[1] - H[1])[0]) == null ? void 0 : T[0];
              j && (P = j);
              break;
            }
            case "initialPlacement":
              P = s;
              break;
          }
        if (r !== P)
          return {
            reset: {
              placement: P
            }
          };
      }
      return {};
    }
  };
};
function ft(e, t) {
  return {
    top: e.top - t.height,
    right: e.right - t.width,
    bottom: e.bottom - t.height,
    left: e.left - t.width
  };
}
function pt(e) {
  return kt.some((t) => e[t] >= 0);
}
const qn = function(e) {
  return e === void 0 && (e = {}), {
    name: "hide",
    options: e,
    async fn(t) {
      const {
        rects: n
      } = t, {
        strategy: i = "referenceHidden",
        ...r
      } = ue(e, t);
      switch (i) {
        case "referenceHidden": {
          const o = await we(t, {
            ...r,
            elementContext: "reference"
          }), l = ft(o, n.reference);
          return {
            data: {
              referenceHiddenOffsets: l,
              referenceHidden: pt(l)
            }
          };
        }
        case "escaped": {
          const o = await we(t, {
            ...r,
            altBoundary: !0
          }), l = ft(o, n.floating);
          return {
            data: {
              escapedOffsets: l,
              escaped: pt(l)
            }
          };
        }
        default:
          return {};
      }
    }
  };
};
async function Xn(e, t) {
  const {
    placement: n,
    platform: i,
    elements: r
  } = e, o = await (i.isRTL == null ? void 0 : i.isRTL(r.floating)), l = Q(n), s = U(n), a = Ve(n) === "y", u = ["left", "top"].includes(l) ? -1 : 1, v = o && a ? -1 : 1, m = ue(t, e);
  let {
    mainAxis: p,
    crossAxis: f,
    alignmentAxis: c
  } = typeof m == "number" ? {
    mainAxis: m,
    crossAxis: 0,
    alignmentAxis: null
  } : {
    mainAxis: 0,
    crossAxis: 0,
    alignmentAxis: null,
    ...m
  };
  return s && typeof c == "number" && (f = s === "end" ? c * -1 : c), a ? {
    x: f * v,
    y: p * u
  } : {
    x: p * u,
    y: f * v
  };
}
const Yn = function(e) {
  return e === void 0 && (e = 0), {
    name: "offset",
    options: e,
    async fn(t) {
      const {
        x: n,
        y: i
      } = t, r = await Xn(t, e);
      return {
        x: n + r.x,
        y: i + r.y,
        data: r
      };
    }
  };
}, Kn = function(e) {
  return e === void 0 && (e = {}), {
    name: "shift",
    options: e,
    async fn(t) {
      const {
        x: n,
        y: i,
        placement: r
      } = t, {
        mainAxis: o = !0,
        crossAxis: l = !1,
        limiter: s = {
          fn: (y) => {
            let {
              x: g,
              y: w
            } = y;
            return {
              x: g,
              y: w
            };
          }
        },
        ...a
      } = ue(e, t), u = {
        x: n,
        y: i
      }, v = await we(t, a), m = Ve(Q(r)), p = Nt(m);
      let f = u[p], c = u[m];
      if (o) {
        const y = p === "y" ? "top" : "left", g = p === "y" ? "bottom" : "right", w = f + v[y], x = f - v[g];
        f = Xe(w, f, x);
      }
      if (l) {
        const y = m === "y" ? "top" : "left", g = m === "y" ? "bottom" : "right", w = c + v[y], x = c - v[g];
        c = Xe(w, c, x);
      }
      const h = s.fn({
        ...t,
        [p]: f,
        [m]: c
      });
      return {
        ...h,
        data: {
          x: h.x - n,
          y: h.y - i
        }
      };
    }
  };
};
function ie(e) {
  return Wt(e) ? (e.nodeName || "").toLowerCase() : "#document";
}
function k(e) {
  var t;
  return (e == null || (t = e.ownerDocument) == null ? void 0 : t.defaultView) || window;
}
function J(e) {
  var t;
  return (t = (Wt(e) ? e.ownerDocument : e.document) || window.document) == null ? void 0 : t.documentElement;
}
function Wt(e) {
  return e instanceof Node || e instanceof k(e).Node;
}
function Z(e) {
  return e instanceof Element || e instanceof k(e).Element;
}
function q(e) {
  return e instanceof HTMLElement || e instanceof k(e).HTMLElement;
}
function mt(e) {
  return typeof ShadowRoot > "u" ? !1 : e instanceof ShadowRoot || e instanceof k(e).ShadowRoot;
}
function Te(e) {
  const {
    overflow: t,
    overflowX: n,
    overflowY: i,
    display: r
  } = $(e);
  return /auto|scroll|overlay|hidden|clip/.test(t + i + n) && !["inline", "contents"].includes(r);
}
function Gn(e) {
  return ["table", "td", "th"].includes(ie(e));
}
function tt(e) {
  const t = nt(), n = $(e);
  return n.transform !== "none" || n.perspective !== "none" || (n.containerType ? n.containerType !== "normal" : !1) || !t && (n.backdropFilter ? n.backdropFilter !== "none" : !1) || !t && (n.filter ? n.filter !== "none" : !1) || ["transform", "perspective", "filter"].some((i) => (n.willChange || "").includes(i)) || ["paint", "layout", "strict", "content"].some((i) => (n.contain || "").includes(i));
}
function Qn(e) {
  let t = me(e);
  for (; q(t) && !Me(t); ) {
    if (tt(t))
      return t;
    t = me(t);
  }
  return null;
}
function nt() {
  return typeof CSS > "u" || !CSS.supports ? !1 : CSS.supports("-webkit-backdrop-filter", "none");
}
function Me(e) {
  return ["html", "body", "#document"].includes(ie(e));
}
function $(e) {
  return k(e).getComputedStyle(e);
}
function De(e) {
  return Z(e) ? {
    scrollLeft: e.scrollLeft,
    scrollTop: e.scrollTop
  } : {
    scrollLeft: e.pageXOffset,
    scrollTop: e.pageYOffset
  };
}
function me(e) {
  if (ie(e) === "html")
    return e;
  const t = (
    // Step into the shadow DOM of the parent of a slotted node.
    e.assignedSlot || // DOM Element detected.
    e.parentNode || // ShadowRoot detected.
    mt(e) && e.host || // Fallback.
    J(e)
  );
  return mt(t) ? t.host : t;
}
function zt(e) {
  const t = me(e);
  return Me(t) ? e.ownerDocument ? e.ownerDocument.body : e.body : q(t) && Te(t) ? t : zt(t);
}
function be(e, t, n) {
  var i;
  t === void 0 && (t = []), n === void 0 && (n = !0);
  const r = zt(e), o = r === ((i = e.ownerDocument) == null ? void 0 : i.body), l = k(r);
  return o ? t.concat(l, l.visualViewport || [], Te(r) ? r : [], l.frameElement && n ? be(l.frameElement) : []) : t.concat(r, be(r, [], n));
}
function Ut(e) {
  const t = $(e);
  let n = parseFloat(t.width) || 0, i = parseFloat(t.height) || 0;
  const r = q(e), o = r ? e.offsetWidth : n, l = r ? e.offsetHeight : i, s = Fe(n) !== o || Fe(i) !== l;
  return s && (n = o, i = l), {
    width: n,
    height: i,
    $: s
  };
}
function rt(e) {
  return Z(e) ? e : e.contextElement;
}
function fe(e) {
  const t = rt(e);
  if (!q(t))
    return re(1);
  const n = t.getBoundingClientRect(), {
    width: i,
    height: r,
    $: o
  } = Ut(t);
  let l = (o ? Fe(n.width) : n.width) / i, s = (o ? Fe(n.height) : n.height) / r;
  return (!l || !Number.isFinite(l)) && (l = 1), (!s || !Number.isFinite(s)) && (s = 1), {
    x: l,
    y: s
  };
}
const Zn = /* @__PURE__ */ re(0);
function qt(e) {
  const t = k(e);
  return !nt() || !t.visualViewport ? Zn : {
    x: t.visualViewport.offsetLeft,
    y: t.visualViewport.offsetTop
  };
}
function Jn(e, t, n) {
  return t === void 0 && (t = !1), !n || t && n !== k(e) ? !1 : t;
}
function ae(e, t, n, i) {
  t === void 0 && (t = !1), n === void 0 && (n = !1);
  const r = e.getBoundingClientRect(), o = rt(e);
  let l = re(1);
  t && (i ? Z(i) && (l = fe(i)) : l = fe(e));
  const s = Jn(o, n, i) ? qt(o) : re(0);
  let a = (r.left + s.x) / l.x, u = (r.top + s.y) / l.y, v = r.width / l.x, m = r.height / l.y;
  if (o) {
    const p = k(o), f = i && Z(i) ? k(i) : i;
    let c = p.frameElement;
    for (; c && i && f !== p; ) {
      const h = fe(c), y = c.getBoundingClientRect(), g = $(c), w = y.left + (c.clientLeft + parseFloat(g.paddingLeft)) * h.x, x = y.top + (c.clientTop + parseFloat(g.paddingTop)) * h.y;
      a *= h.x, u *= h.y, v *= h.x, m *= h.y, a += w, u += x, c = k(c).frameElement;
    }
  }
  return Le({
    width: v,
    height: m,
    x: a,
    y: u
  });
}
function _n(e) {
  let {
    rect: t,
    offsetParent: n,
    strategy: i
  } = e;
  const r = q(n), o = J(n);
  if (n === o)
    return t;
  let l = {
    scrollLeft: 0,
    scrollTop: 0
  }, s = re(1);
  const a = re(0);
  if ((r || !r && i !== "fixed") && ((ie(n) !== "body" || Te(o)) && (l = De(n)), q(n))) {
    const u = ae(n);
    s = fe(n), a.x = u.x + n.clientLeft, a.y = u.y + n.clientTop;
  }
  return {
    width: t.width * s.x,
    height: t.height * s.y,
    x: t.x * s.x - l.scrollLeft * s.x + a.x,
    y: t.y * s.y - l.scrollTop * s.y + a.y
  };
}
function er(e) {
  return Array.from(e.getClientRects());
}
function Xt(e) {
  return ae(J(e)).left + De(e).scrollLeft;
}
function tr(e) {
  const t = J(e), n = De(e), i = e.ownerDocument.body, r = se(t.scrollWidth, t.clientWidth, i.scrollWidth, i.clientWidth), o = se(t.scrollHeight, t.clientHeight, i.scrollHeight, i.clientHeight);
  let l = -n.scrollLeft + Xt(e);
  const s = -n.scrollTop;
  return $(i).direction === "rtl" && (l += se(t.clientWidth, i.clientWidth) - r), {
    width: r,
    height: o,
    x: l,
    y: s
  };
}
function nr(e, t) {
  const n = k(e), i = J(e), r = n.visualViewport;
  let o = i.clientWidth, l = i.clientHeight, s = 0, a = 0;
  if (r) {
    o = r.width, l = r.height;
    const u = nt();
    (!u || u && t === "fixed") && (s = r.offsetLeft, a = r.offsetTop);
  }
  return {
    width: o,
    height: l,
    x: s,
    y: a
  };
}
function rr(e, t) {
  const n = ae(e, !0, t === "fixed"), i = n.top + e.clientTop, r = n.left + e.clientLeft, o = q(e) ? fe(e) : re(1), l = e.clientWidth * o.x, s = e.clientHeight * o.y, a = r * o.x, u = i * o.y;
  return {
    width: l,
    height: s,
    x: a,
    y: u
  };
}
function ht(e, t, n) {
  let i;
  if (t === "viewport")
    i = nr(e, n);
  else if (t === "document")
    i = tr(J(e));
  else if (Z(t))
    i = rr(t, n);
  else {
    const r = qt(e);
    i = {
      ...t,
      x: t.x - r.x,
      y: t.y - r.y
    };
  }
  return Le(i);
}
function Yt(e, t) {
  const n = me(e);
  return n === t || !Z(n) || Me(n) ? !1 : $(n).position === "fixed" || Yt(n, t);
}
function ir(e, t) {
  const n = t.get(e);
  if (n)
    return n;
  let i = be(e, [], !1).filter((s) => Z(s) && ie(s) !== "body"), r = null;
  const o = $(e).position === "fixed";
  let l = o ? me(e) : e;
  for (; Z(l) && !Me(l); ) {
    const s = $(l), a = tt(l);
    !a && s.position === "fixed" && (r = null), (o ? !a && !r : !a && s.position === "static" && !!r && ["absolute", "fixed"].includes(r.position) || Te(l) && !a && Yt(e, l)) ? i = i.filter((v) => v !== l) : r = s, l = me(l);
  }
  return t.set(e, i), i;
}
function or(e) {
  let {
    element: t,
    boundary: n,
    rootBoundary: i,
    strategy: r
  } = e;
  const l = [...n === "clippingAncestors" ? ir(t, this._c) : [].concat(n), i], s = l[0], a = l.reduce((u, v) => {
    const m = ht(t, v, r);
    return u.top = se(m.top, u.top), u.right = pe(m.right, u.right), u.bottom = pe(m.bottom, u.bottom), u.left = se(m.left, u.left), u;
  }, ht(t, s, r));
  return {
    width: a.right - a.left,
    height: a.bottom - a.top,
    x: a.left,
    y: a.top
  };
}
function sr(e) {
  return Ut(e);
}
function lr(e, t, n) {
  const i = q(t), r = J(t), o = n === "fixed", l = ae(e, !0, o, t);
  let s = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const a = re(0);
  if (i || !i && !o)
    if ((ie(t) !== "body" || Te(r)) && (s = De(t)), i) {
      const u = ae(t, !0, o, t);
      a.x = u.x + t.clientLeft, a.y = u.y + t.clientTop;
    } else
      r && (a.x = Xt(r));
  return {
    x: l.left + s.scrollLeft - a.x,
    y: l.top + s.scrollTop - a.y,
    width: l.width,
    height: l.height
  };
}
function vt(e, t) {
  return !q(e) || $(e).position === "fixed" ? null : t ? t(e) : e.offsetParent;
}
function Kt(e, t) {
  const n = k(e);
  if (!q(e))
    return n;
  let i = vt(e, t);
  for (; i && Gn(i) && $(i).position === "static"; )
    i = vt(i, t);
  return i && (ie(i) === "html" || ie(i) === "body" && $(i).position === "static" && !tt(i)) ? n : i || Qn(e) || n;
}
const ar = async function(e) {
  let {
    reference: t,
    floating: n,
    strategy: i
  } = e;
  const r = this.getOffsetParent || Kt, o = this.getDimensions;
  return {
    reference: lr(t, await r(n), i),
    floating: {
      x: 0,
      y: 0,
      ...await o(n)
    }
  };
};
function ur(e) {
  return $(e).direction === "rtl";
}
const cr = {
  convertOffsetParentRelativeRectToViewportRelativeRect: _n,
  getDocumentElement: J,
  getClippingRect: or,
  getOffsetParent: Kt,
  getElementRects: ar,
  getClientRects: er,
  getDimensions: sr,
  getScale: fe,
  isElement: Z,
  isRTL: ur
};
function dr(e, t) {
  let n = null, i;
  const r = J(e);
  function o() {
    clearTimeout(i), n && n.disconnect(), n = null;
  }
  function l(s, a) {
    s === void 0 && (s = !1), a === void 0 && (a = 1), o();
    const {
      left: u,
      top: v,
      width: m,
      height: p
    } = e.getBoundingClientRect();
    if (s || t(), !m || !p)
      return;
    const f = Ce(v), c = Ce(r.clientWidth - (u + m)), h = Ce(r.clientHeight - (v + p)), y = Ce(u), w = {
      rootMargin: -f + "px " + -c + "px " + -h + "px " + -y + "px",
      threshold: se(0, pe(1, a)) || 1
    };
    let x = !0;
    function O(b) {
      const S = b[0].intersectionRatio;
      if (S !== a) {
        if (!x)
          return l();
        S ? l(!1, S) : i = setTimeout(() => {
          l(!1, 1e-7);
        }, 100);
      }
      x = !1;
    }
    try {
      n = new IntersectionObserver(O, {
        ...w,
        // Handle <iframe>s
        root: r.ownerDocument
      });
    } catch {
      n = new IntersectionObserver(O, w);
    }
    n.observe(e);
  }
  return l(!0), o;
}
function fr(e, t, n, i) {
  i === void 0 && (i = {});
  const {
    ancestorScroll: r = !0,
    ancestorResize: o = !0,
    elementResize: l = typeof ResizeObserver == "function",
    layoutShift: s = typeof IntersectionObserver == "function",
    animationFrame: a = !1
  } = i, u = rt(e), v = r || o ? [...u ? be(u) : [], ...be(t)] : [];
  v.forEach((g) => {
    r && g.addEventListener("scroll", n, {
      passive: !0
    }), o && g.addEventListener("resize", n);
  });
  const m = u && s ? dr(u, n) : null;
  let p = -1, f = null;
  l && (f = new ResizeObserver((g) => {
    let [w] = g;
    w && w.target === u && f && (f.unobserve(t), cancelAnimationFrame(p), p = requestAnimationFrame(() => {
      f && f.observe(t);
    })), n();
  }), u && !a && f.observe(u), f.observe(t));
  let c, h = a ? ae(e) : null;
  a && y();
  function y() {
    const g = ae(e);
    h && (g.x !== h.x || g.y !== h.y || g.width !== h.width || g.height !== h.height) && n(), h = g, c = requestAnimationFrame(y);
  }
  return n(), () => {
    v.forEach((g) => {
      r && g.removeEventListener("scroll", n), o && g.removeEventListener("resize", n);
    }), m && m(), f && f.disconnect(), f = null, a && cancelAnimationFrame(c);
  };
}
const pr = (e, t, n) => {
  const i = /* @__PURE__ */ new Map(), r = {
    platform: cr,
    ...n
  }, o = {
    ...r.platform,
    _c: i
  };
  return $n(e, t, {
    ...r,
    platform: o
  });
};
function Ye(e) {
  var t;
  return (t = e == null ? void 0 : e.$el) != null ? t : e;
}
function mr(e) {
  return {
    name: "arrow",
    options: e,
    fn(t) {
      const n = Ye(de(e.element));
      return n == null ? {} : Hn({
        element: n,
        padding: e.padding
      }).fn(t);
    }
  };
}
function hr(e, t, n) {
  n === void 0 && (n = {});
  const i = n.whileElementsMounted, r = V(() => {
    var b;
    return (b = de(n.open)) != null ? b : !0;
  }), o = V(() => de(n.middleware)), l = V(() => {
    var b;
    return (b = de(n.placement)) != null ? b : "bottom";
  }), s = V(() => {
    var b;
    return (b = de(n.strategy)) != null ? b : "absolute";
  }), a = V(() => Ye(e.value)), u = V(() => Ye(t.value)), v = E(null), m = E(null), p = E(s.value), f = E(l.value), c = xt({}), h = E(!1);
  let y;
  function g() {
    a.value == null || u.value == null || pr(a.value, u.value, {
      middleware: o.value,
      placement: l.value,
      strategy: s.value
    }).then((b) => {
      v.value = b.x, m.value = b.y, p.value = b.strategy, f.value = b.placement, c.value = b.middlewareData, h.value = !0;
    });
  }
  function w() {
    typeof y == "function" && (y(), y = void 0);
  }
  function x() {
    if (w(), i === void 0) {
      g();
      return;
    }
    if (a.value != null && u.value != null) {
      y = i(a.value, u.value, g);
      return;
    }
  }
  function O() {
    r.value || (h.value = !1);
  }
  return W([o, l, s], g, {
    flush: "sync"
  }), W([a, u], x, {
    flush: "sync"
  }), W(r, O, {
    flush: "sync"
  }), rn() && on(w), {
    x: ce(v),
    y: ce(m),
    strategy: ce(p),
    placement: ce(f),
    middlewareData: ce(c),
    isPositioned: ce(h),
    update: g
  };
}
var vr = Object.defineProperty, gr = (e, t, n) => t in e ? vr(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n, yr = (e, t, n) => (gr(e, typeof t != "symbol" ? t + "" : t, n), n);
function Ke(e) {
  return e == null || e.value == null ? null : e.value instanceof Node ? e.value : "$el" in e.value && e.value.$el ? Ke(E(e.value.$el)) : "getBoundingClientRect" in e.value ? e.value : null;
}
class wr {
  constructor() {
    yr(this, "current", this.detect());
  }
  set(t) {
    this.current !== t && (this.current = t);
  }
  reset() {
    this.set(this.detect());
  }
  get isServer() {
    return this.current === "server";
  }
  get isClient() {
    return this.current === "client";
  }
  detect() {
    return typeof window > "u" || typeof document > "u" ? "server" : "client";
  }
}
const Gt = new wr();
function Qt(e) {
  return e.reduce((t, n) => n.type === ve ? t.concat(Qt(n.children)) : t.concat(n), []);
}
function gt(e) {
  return e == null ? !1 : typeof e.type == "string" || typeof e.type == "object" || typeof e.type == "function";
}
function yt(e) {
  return e = de(e), e && (e == null ? void 0 : e.nodeType) !== Node.COMMENT_NODE;
}
function br(e, t, n, i, r) {
  W([
    () => r.offset,
    () => r.flip,
    () => r.shift,
    () => r.autoPlacement,
    () => r.arrow,
    () => r.hide,
    () => r.middleware
  ], () => {
    const o = [];
    (typeof r.offset == "number" || typeof r.offset == "object" || typeof r.offset == "function") && o.push(Yn(r.offset)), (r.flip === !0 || typeof r.flip == "number" || typeof r.flip == "object") && o.push(Un({
      padding: typeof r.flip == "number" ? r.flip : void 0,
      ...typeof r.flip == "object" ? r.flip : {}
    })), (r.shift === !0 || typeof r.shift == "number" || typeof r.shift == "object") && o.push(Kn({
      padding: typeof r.shift == "number" ? r.shift : void 0,
      ...typeof r.shift == "object" ? r.shift : {}
    })), (r.autoPlacement === !0 || typeof r.autoPlacement == "object") && o.push(zn(
      typeof r.autoPlacement == "object" ? r.autoPlacement : void 0
    )), (r.arrow === !0 || typeof r.arrow == "number") && o.push(mr({
      element: i,
      padding: r.arrow === !0 ? 0 : r.arrow
    })), o.push(...typeof r.middleware == "function" ? r.middleware({
      referenceEl: t,
      floatingEl: n
    }) : r.middleware || []), (r.hide === !0 || typeof r.hide == "object") && o.push(qn(
      typeof r.hide == "object" ? r.hide : void 0
    )), e.value = o;
  }, { immediate: !0 });
}
function xr(e, t, n) {
  let i = () => {
  };
  ne(() => {
    if (e && Gt.isClient && typeof ResizeObserver < "u" && t.value && t.value instanceof Element) {
      const r = new ResizeObserver(([o]) => {
        n.value = o.borderBoxSize.reduce((l, { inlineSize: s }) => l + s, 0);
      });
      r.observe(t.value), i = () => {
        r.disconnect(), n.value = null;
      };
    }
  }), ln(() => {
    i();
  });
}
const Or = (e) => {
  switch (e) {
    case "top":
      return "origin-bottom";
    case "bottom":
      return "origin-top";
    case "left":
      return "origin-right";
    case "right":
      return "origin-left";
    case "top-start":
    case "right-end":
      return "origin-bottom-left";
    case "top-end":
    case "left-end":
      return "origin-bottom-right";
    case "right-start":
    case "bottom-start":
      return "origin-top-left";
    case "left-start":
    case "bottom-end":
      return "origin-top-right";
    default:
      return "";
  }
};
function Tr(e, t) {
  const n = V(() => {
    if (typeof e.originClass == "function")
      return e.originClass(t.value);
    if (typeof e.originClass == "string")
      return e.originClass;
    if (e.tailwindcssOriginClass)
      return Or(t.value);
  }), i = V(
    () => e.enter || n.value ? `${e.enter || ""} ${n.value || ""}` : void 0
  ), r = V(
    () => e.leave || n.value ? `${e.leave || ""} ${n.value || ""}` : void 0
  );
  return { originClassRef: n, enterActiveClassRef: i, leaveActiveClassRef: r };
}
[
  "[contentEditable=true]",
  "[tabindex]",
  "a[href]",
  "area[href]",
  "button:not([disabled])",
  "iframe",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])"
].map(
  // TODO: Remove this once JSDOM fixes the issue where an element that is
  // "hidden" can be the document.activeElement, because this is not possible
  // in real browsers.
  process.env.NODE_ENV === "test" ? (e) => `${e}:not([tabindex='-1']):not([style*='display: none'])` : (e) => `${e}:not([tabindex='-1'])`
).join(",");
const Sr = Symbol("ReferenceContext"), Cr = Symbol("FloatingContext"), Er = Symbol("ArrowContext"), d = {
  as: {
    type: [String, Function],
    default: "template"
  },
  floatingAs: {
    type: [String, Function],
    default: "div"
  },
  show: {
    type: Boolean,
    default: null
  },
  placement: {
    type: String,
    default: "bottom-start"
  },
  strategy: {
    type: String,
    default: "absolute"
  },
  offset: [Number, Function, Object],
  shift: {
    type: [Boolean, Number, Object],
    default: !1
  },
  flip: {
    type: [Boolean, Number, Object],
    default: !1
  },
  arrow: {
    type: [Boolean, Number],
    default: !1
  },
  autoPlacement: {
    type: [Boolean, Object],
    default: !1
  },
  hide: {
    type: [Boolean, Object],
    default: !1
  },
  autoUpdate: {
    type: [Boolean, Object],
    default: !0
  },
  zIndex: {
    type: [Number, String],
    default: 9999
  },
  transitionName: String,
  transitionType: String,
  enter: String,
  enterFrom: String,
  enterTo: String,
  leave: String,
  leaveFrom: String,
  leaveTo: String,
  originClass: [String, Function],
  tailwindcssOriginClass: {
    type: Boolean,
    default: !1
  },
  portal: {
    type: Boolean,
    default: !1
  },
  transform: {
    type: Boolean,
    default: !0
  },
  adaptiveWidth: {
    type: Boolean,
    default: !1
  },
  composable: {
    type: Boolean,
    default: !1
  },
  dialog: {
    type: Boolean,
    default: !1
  },
  middleware: {
    type: [Array, Function],
    default: () => []
  }
};
function Ar(e, t, n, i) {
  const { referenceRef: r } = i, o = t, l = Ee(n, {
    ref: r
  }), s = Ge(
    e,
    o.as === "template" ? l : {}
  );
  return o.as === "template" ? s : typeof o.as == "string" ? D(o.as, l, [s]) : D(o.as, l, () => [s]);
}
function Ir(e, t, n, i) {
  const { floatingRef: r, props: o, mounted: l, show: s, x: a, y: u, placement: v, strategy: m, referenceElWidth: p, updateFloating: f } = i, c = Ee(
    { ...o, as: o.floatingAs },
    t
  ), { enterActiveClassRef: h, leaveActiveClassRef: y } = Tr(c, v), g = {
    enterActiveClass: h.value,
    enterFromClass: c.enterFrom,
    enterToClass: c.enterTo,
    leaveActiveClass: y.value,
    leaveFromClass: c.leaveFrom,
    leaveToClass: c.leaveTo
  }, w = {
    name: c.transitionName,
    type: c.transitionType,
    appear: !0,
    ...c.transitionName ? {} : g,
    onBeforeEnter() {
      s.value = !0;
    },
    onAfterLeave() {
      s.value = !1;
    }
  }, x = {
    enter: h.value,
    enterFrom: c.enterFrom,
    enterTo: c.enterTo,
    leave: y.value,
    leaveFrom: c.leaveFrom,
    leaveTo: c.leaveTo,
    onBeforeEnter: w.onBeforeEnter,
    onAfterLeave: w.onAfterLeave
  }, O = {
    style: {
      // If enable dialog mode, then set `transform` to false.
      ...!c.dialog && c.transform ? {
        position: m.value,
        zIndex: c.zIndex,
        top: "0px",
        left: "0px",
        right: "auto",
        bottom: "auto",
        transform: `translate(${Math.round(a.value || 0)}px,${Math.round(u.value || 0)}px)`
      } : {
        position: m.value,
        zIndex: c.zIndex,
        top: `${u.value || 0}px`,
        left: `${a.value || 0}px`
      },
      width: c.adaptiveWidth && typeof p.value == "number" ? `${p.value}px` : void 0
    }
  };
  function b(C) {
    return c.portal ? D(Sn, () => C) : C;
  }
  function S(C) {
    const R = Ee(
      O,
      n,
      c.dialog ? {} : { ref: r }
    );
    return c.as === "template" ? C : typeof c.as == "string" ? D(c.as, R, C) : D(c.as, R, () => C);
  }
  function I() {
    function C() {
      var R;
      const A = c.as === "template" ? Ee(
        O,
        n,
        c.dialog ? {} : { ref: r }
      ) : null, T = Ge(e, A);
      return ((R = T.props) == null ? void 0 : R.unmount) === !1 ? (f(), T) : typeof c.show != "boolean" || c.show ? T : $e();
    }
    return Gt.isServer ? l.value && c.show ? C() : $e() : c.transitionChild ? D(Dt, {
      key: `placement-${v.value}`,
      ...c.dialog ? { ref: r } : {},
      as: "template",
      ...x
    }, C) : D(an, {
      ...c.dialog ? { ref: r } : {},
      ...w
    }, C);
  }
  return b(
    S(
      I()
    )
  );
}
function Fr(e, t, n, i, r) {
  const o = E(!1), l = st(i, "placement"), s = st(i, "strategy"), a = xt({}), u = E(null), v = E(void 0), m = E(void 0), p = V(() => Ke(t)), f = V(() => Ke(n)), c = V(
    () => yt(p) && yt(f)
  ), { x: h, y, placement: g, strategy: w, middlewareData: x, update: O } = hr(p, f, {
    placement: l,
    strategy: s,
    middleware: a,
    whileElementsMounted: () => {
    }
  }), b = E(null);
  ne(() => {
    o.value = !0;
  }), W(e, (T, F) => {
    T && !F ? r("show") : !T && F && r("hide");
  }, { immediate: !0 });
  function S() {
    c.value && (O(), r("update"));
  }
  W([l, s, a], S, { flush: "sync" }), br(
    a,
    p,
    f,
    u,
    i
  ), W(x, () => {
    const T = x.value.arrow;
    v.value = T == null ? void 0 : T.x, m.value = T == null ? void 0 : T.y;
  }), xr(i.adaptiveWidth, p, b), W(e, async (T, F, L) => {
    if (await sn(), e.value && c.value && i.autoUpdate) {
      const P = fr(
        p.value,
        f.value,
        S,
        typeof i.autoUpdate == "object" ? i.autoUpdate : void 0
      );
      L(P);
    }
  }, { flush: "post", immediate: !0 });
  const I = E(!0);
  W(p, () => {
    !(p.value instanceof Element) && c.value && I.value && (I.value = !1, window.requestAnimationFrame(() => {
      I.value = !0, S();
    }));
  }, { flush: "sync" });
  const C = {
    referenceRef: t,
    placement: g
  }, R = {
    floatingRef: n,
    props: i,
    mounted: o,
    show: e,
    x: h,
    y,
    placement: g,
    strategy: w,
    referenceElWidth: b,
    updateFloating: S
  }, A = {
    ref: u,
    placement: g,
    x: v,
    y: m
  };
  return G(Er, A), { referenceApi: C, floatingApi: R, arrowApi: A, x: h, y, placement: g, strategy: w, referenceEl: p, floatingEl: f, middlewareData: x, update: S };
}
const Zt = {
  name: "Float",
  inheritAttrs: !1,
  props: d,
  emits: ["show", "hide", "update"],
  setup(e, { emit: t, slots: n, attrs: i }) {
    const r = E(e.show ?? !1), o = E(null), l = E(null), {
      referenceApi: s,
      floatingApi: a,
      placement: u
    } = Fr(r, o, l, e, t);
    function v(p) {
      return e.as === "template" ? p : typeof e.as == "string" ? D(e.as, i, p) : D(e.as, i, () => p);
    }
    const m = {
      placement: u.value
    };
    return e.composable || e.dialog ? (G(Sr, s), G(Cr, a), () => {
      if (n.default)
        return v(n.default(m));
    }) : () => {
      if (!n.default)
        return;
      const [p, f] = Qt(n.default(m)).filter(gt);
      if (!gt(p))
        return;
      const c = Ar(
        p,
        { as: "template" },
        {},
        s
      ), h = Ir(
        f,
        { as: e.floatingAs },
        {},
        a
      );
      return v([
        c,
        h
      ]);
    };
  }
};
d.as;
d.floatingAs, d.transitionName, d.transitionType, d.enter, d.enterFrom, d.enterTo, d.leave, d.leaveFrom, d.leaveTo, d.originClass, d.tailwindcssOriginClass;
({
  ...d.as
});
d.as, d.show, d.placement, d.strategy, d.offset, d.shift, d.flip, d.arrow, d.autoPlacement, d.hide, d.autoUpdate, d.zIndex, d.transitionName, d.transitionType, d.enter, d.enterFrom, d.enterTo, d.leave, d.leaveFrom, d.leaveTo, d.originClass, d.tailwindcssOriginClass, d.portal, d.transform, d.middleware;
d.as, d.placement, d.strategy, d.offset, d.shift, {
  ...d.flip
}, d.arrow, d.autoPlacement, d.hide, d.autoUpdate, d.zIndex, d.transitionName, d.transitionType, d.enter, d.enterFrom, d.enterTo, d.leave, d.leaveFrom, d.leaveTo, d.originClass, d.tailwindcssOriginClass, d.transform, d.middleware;
d.as, d.placement, d.strategy, d.offset, d.shift, d.flip, d.arrow, d.autoPlacement, d.hide, d.autoUpdate, d.zIndex, d.transitionName, d.transitionType, d.enter, d.enterFrom, d.enterTo, d.leave, d.leaveFrom, d.leaveTo, d.originClass, d.tailwindcssOriginClass, d.transform, d.middleware;
const Jt = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [i, r] of t)
    n[i] = r;
  return n;
}, Pr = {
  name: "ModelSelect",
  mixins: [je],
  components: [Zt],
  emits: ["blur", "searchchange", "update:modelValue"],
  props: {
    modelValue: {
      type: [String, Number, Object, Boolean]
    },
    customAttr: {
      type: Function,
      default: () => ""
    },
    options: {
      type: Array
    }
  },
  data() {
    return {
      showMenu: !1,
      searchText: "",
      mousedownState: !1,
      // mousedown on option menu
      pointer: -1
    };
  },
  watch: {
    value(e) {
      this.pointer = this.filteredOptions.findIndex((t) => t.value === this.optionValue(e));
    },
    filteredOptions() {
      this.pointerAdjust();
    },
    searchText() {
      this.$emit("searchchange", this.searchText);
    }
  },
  computed: {
    searchTextCustomAttr() {
      return this.selectedOption && this.selectedOption.value ? this.customAttr(this.selectedOption) : "";
    },
    inputText() {
      if (this.searchText)
        return "";
      {
        let e = this.placeholder;
        return this.selectedOption && (e = this.selectedOption.text), e;
      }
    },
    customAttrs() {
      try {
        if (Array.isArray(this.options))
          return this.options.map((e) => this.customAttr(e));
      } catch {
      }
      return [];
    },
    textClass() {
      return !this.selectedOption && this.placeholder ? "default" : "";
    },
    menuClass() {
      return {
        visible: this.showMenu,
        hidden: !this.showMenu
      };
    },
    menuStyle() {
      return {
        display: this.showMenu ? "block" : "none"
      };
    },
    filteredOptions() {
      return this.searchText ? this.options.filter((e) => {
        try {
          return this.filterPredicate(e.text, this.searchText);
        } catch {
          return !0;
        }
      }) : this.options;
    },
    selectedOption() {
      return this.options.find((e) => e.value === this.optionValue(this.modelValue));
    }
  },
  methods: {
    deleteTextOrItem() {
      !this.searchText && this.modelValue && (this.selectItem({}), this.openOptions());
    },
    openOptions() {
      B.openOptions(this);
    },
    blurInput() {
      B.blurInput(this);
    },
    closeOptions() {
      B.closeOptions(this);
    },
    prevItem() {
      B.prevItem(this);
    },
    nextItem() {
      B.nextItem(this);
    },
    enterItem() {
      B.enterItem(this);
    },
    pointerSet(e) {
      B.pointerSet(this, e);
    },
    pointerAdjust() {
      B.pointerAdjust(this);
    },
    mousedownItem() {
      B.mousedownItem(this);
    },
    selectItem(e) {
      this.searchText = "", this.closeOptions(), typeof this.modelValue == "object" && this.modelValue ? this.$emit("update:modelValue", e) : (this.$emit("update:modelValue", e.value), e.value !== void 0 && e.value === e.text && (this.searchText = e.value));
    },
    optionValue(e) {
      return typeof e == "object" && e !== null ? e.value : e;
    }
  }
}, Rr = /* @__PURE__ */ K("i", { class: "dropdown icon" }, null, -1), Lr = ["disabled", "tabindex", "id", "name", "value"], jr = ["data-vss-custom-attr"], Br = ["data-vss-custom-attr", "onClick", "onMouseenter"];
function Vr(e, t, n, i, r, o) {
  const l = Ot("Float");
  return _(), ee("div", {
    class: Y(["ui fluid search selection dropdown", { "active visible": r.showMenu, error: e.isError, disabled: e.isDisabled }]),
    onClick: t[11] || (t[11] = (...s) => o.openOptions && o.openOptions(...s)),
    onFocus: t[12] || (t[12] = (...s) => o.openOptions && o.openOptions(...s))
  }, [
    Rr,
    K("input", {
      class: "search",
      autocomplete: "off",
      disabled: e.isDisabled,
      tabindex: e.isDisabled ? -1 : 0,
      id: e.id,
      name: e.name,
      value: r.searchText,
      onInput: t[0] || (t[0] = (s) => r.searchText = s.target.value),
      ref: "input",
      onFocus: t[1] || (t[1] = z((...s) => o.openOptions && o.openOptions(...s), ["prevent"])),
      onKeyup: [
        t[2] || (t[2] = N((...s) => o.closeOptions && o.closeOptions(...s), ["esc"])),
        t[7] || (t[7] = N(z((...s) => o.enterItem && o.enterItem(...s), ["prevent"]), ["enter"]))
      ],
      onBlur: t[3] || (t[3] = (...s) => o.blurInput && o.blurInput(...s)),
      onKeydown: [
        t[4] || (t[4] = N((...s) => o.prevItem && o.prevItem(...s), ["up"])),
        t[5] || (t[5] = N((...s) => o.nextItem && o.nextItem(...s), ["down"])),
        t[6] || (t[6] = N(z(() => {
        }, ["prevent"]), ["enter"])),
        t[8] || (t[8] = N((...s) => o.deleteTextOrItem && o.deleteTextOrItem(...s), ["delete"]))
      ]
    }, null, 40, Lr),
    Tt(l, {
      placement: "bottom",
      strategy: "fixed"
    }, {
      default: St(() => [
        K("div", {
          class: Y(["text", o.textClass]),
          "data-vss-custom-attr": o.searchTextCustomAttr
        }, he(o.inputText), 11, jr),
        K("div", {
          class: Y(["menu", o.menuClass]),
          ref: "menu",
          onMousedown: t[10] || (t[10] = z(() => {
          }, ["prevent"])),
          style: He(o.menuStyle),
          tabindex: "-1"
        }, [
          (_(!0), ee(ve, null, We(o.filteredOptions, (s, a) => (_(), ee("div", {
            key: a,
            class: Y(["item", { selected: s.selected || r.pointer === a, disabled: s.disabled }]),
            "data-vss-custom-attr": o.customAttrs[a] ? o.customAttrs[a] : "",
            onClick: z((u) => o.selectItem(s), ["stop"]),
            onMousedown: t[9] || (t[9] = (...u) => o.mousedownItem && o.mousedownItem(...u)),
            onMouseenter: (u) => o.pointerSet(a)
          }, [
            ze(e.$slots, "default", {
              option: s,
              idx: a
            }, () => [
              Ue(he(s.text), 1)
            ])
          ], 42, Br))), 128))
        ], 38)
      ]),
      _: 3
    })
  ], 34);
}
const wt = /* @__PURE__ */ Jt(Pr, [["render", Vr]]), Yr = {
  name: "ModelListSelect",
  mixins: [je],
  emits: ["blur", "searchchange", "update:modelValue"],
  render: function() {
    return D(wt, {
      id: this.id,
      name: this.name,
      options: this.options,
      modelValue: this.innerValue,
      isError: this.isError,
      isDisabled: this.isDisabled,
      placeholder: this.placeholder,
      filterPredicate: this.filterPredicate,
      onBlur: () => this.$emit("blur"),
      "onUpdate:modelValue": this.onInput,
      onSearchchange: (e) => this.$emit("searchchange", e)
    });
  },
  props: {
    modelValue: {
      type: [String, Number, Object, Boolean]
    },
    list: {
      type: Array
    },
    optionValue: {
      type: String
    },
    optionText: {
      type: String
    },
    customText: {
      type: Function
    },
    optionDisabled: {
      type: String
    }
  },
  computed: {
    options() {
      return this.list.map((e) => ({ value: e[this.optionValue], text: this.buildText(e), disabled: !!e[this.optionDisabled] }));
    },
    innerValue() {
      return this.modelValue ? typeof this.modelValue == "object" ? this.modelValue ? {
        value: this.modelValue[this.optionValue],
        text: this.buildText(this.modelValue),
        disabled: !!this.modelValue[this.optionDisabled]
      } : { value: "", text: "", disabled: !1 } : this.modelValue : this.modelValue;
    }
  },
  methods: {
    buildText(e) {
      return e[this.optionValue] !== void 0 ? this.customText ? this.customText(e) : e[this.optionText] : "";
    },
    onInput(e) {
      if (e === void 0)
        return this.$emit("update:modelValue", "");
      if (Object.keys(e).length === 0 && e.constructor === Object)
        this.$emit("update:modelValue", e);
      else if (typeof e == "object") {
        const t = this.list.find((n) => n[this.optionValue] === e.value);
        this.$emit("update:modelValue", t);
      } else
        this.$emit("update:modelValue", e);
    }
  },
  components: {
    ModelSelect: wt
  }
}, Mr = {
  name: "MultiSelect",
  mixins: [je],
  components: [Zt],
  emits: ["blur", "searchchange", "select"],
  props: {
    customAttr: {
      type: Function,
      default: () => ""
    },
    options: {
      type: Array
    },
    selectedOptions: {
      type: Array
    },
    cleanSearch: {
      type: Boolean,
      default: !0
    },
    hideSelectedOptions: {
      type: Boolean,
      default: !1
    }
  },
  data() {
    return {
      showMenu: !1,
      searchText: "",
      mousedownState: !1,
      // mousedown on option menu
      pointer: -1
    };
  },
  watch: {
    selectedOptions() {
      this.pointer = -1;
    },
    filteredOptions() {
      this.pointerAdjust();
    },
    searchText() {
      this.$emit("searchchange", this.searchText);
    }
  },
  computed: {
    inputText() {
      return this.searchText ? "" : this.placeholder;
    },
    textClass() {
      return this.placeholder ? "default" : "";
    },
    inputWidth() {
      return {
        width: (this.searchText.length + 1) * 8 + 20 + "px"
      };
    },
    menuClass() {
      return {
        visible: this.showMenu,
        hidden: !this.showMenu
      };
    },
    menuStyle() {
      return {
        display: this.showMenu ? "block" : "none"
      };
    },
    nonSelectOptions() {
      return this.options.filter((e) => this.selectedOptions.findIndex((t) => t.value === e.value) === -1);
    },
    filteredOptions() {
      return this.searchText ? this.nonSelectOptions.filter((e) => {
        try {
          return this.cleanSearch ? this.filterPredicate(this.accentsTidy(e.text), this.searchText) : this.filterPredicate(e.text, this.searchText);
        } catch {
          return !0;
        }
      }) : this.nonSelectOptions;
    }
  },
  methods: {
    deleteTextOrLastItem() {
      !this.searchText && this.selectedOptions.length > 0 && this.deleteItem(this.selectedOptions[this.selectedOptions.length - 1]);
    },
    openOptions() {
      B.openOptions(this);
    },
    blurInput() {
      B.blurInput(this);
    },
    closeOptions() {
      B.closeOptions(this);
    },
    prevItem() {
      B.prevItem(this), this.openOptions();
    },
    nextItem() {
      B.nextItem(this), this.openOptions();
    },
    enterItem() {
      B.enterItem(this);
    },
    pointerSet(e) {
      B.pointerSet(this, e);
    },
    pointerAdjust() {
      B.pointerAdjust(this);
    },
    mousedownItem() {
      B.mousedownItem(this);
    },
    selectItem(e) {
      const t = this.selectedOptions.concat(e), n = t.filter((i, r) => t.indexOf(i) === r);
      this.closeOptions(), this.searchText = "", this.$emit("select", n, e, "insert");
    },
    deleteItem(e) {
      const t = this.selectedOptions.filter((n) => n.value !== e.value);
      this.$emit("select", t, e, "delete");
    },
    accentsTidy(e) {
      let t = e.toString().toLowerCase();
      return t = t.replace(new RegExp("[àáâãäå]", "g"), "a"), t = t.replace(new RegExp("æ", "g"), "ae"), t = t.replace(new RegExp("ç", "g"), "c"), t = t.replace(new RegExp("[èéêë]", "g"), "e"), t = t.replace(new RegExp("[ìíîï]", "g"), "i"), t = t.replace(new RegExp("ñ", "g"), "n"), t = t.replace(new RegExp("[òóôõö]", "g"), "o"), t = t.replace(new RegExp("œ", "g"), "oe"), t = t.replace(new RegExp("[ùúûü]", "g"), "u"), t = t.replace(new RegExp("[ýÿ]", "g"), "y"), t;
    }
  }
}, Dr = /* @__PURE__ */ K("i", { class: "dropdown icon" }, null, -1), kr = ["data-vss-custom-attr"], Nr = ["onClick"], $r = ["disabled", "tabindex", "id", "name"], Hr = ["data-vss-custom-attr", "onClick", "onMouseenter"];
function Wr(e, t, n, i, r, o) {
  const l = Ot("Float");
  return _(), ee("div", {
    class: Y(["ui fluid search dropdown selection multiple", { "active visible": r.showMenu, error: e.isError, disabled: e.isDisabled }]),
    onClick: t[11] || (t[11] = (...s) => o.openOptions && o.openOptions(...s)),
    onFocus: t[12] || (t[12] = (...s) => o.openOptions && o.openOptions(...s))
  }, [
    Dr,
    n.hideSelectedOptions ? $e("", !0) : (_(!0), ee(ve, { key: 0 }, We(n.selectedOptions, (s, a) => (_(), ee("a", {
      key: a,
      class: "ui label transition visible",
      style: { display: "inline-block !important" },
      "data-vss-custom-attr": n.customAttr(s)
    }, [
      ze(e.$slots, "selected", {
        option: s,
        idx: a
      }, () => [
        Ue(he(s.text), 1),
        K("i", {
          class: "delete icon",
          onClick: (u) => o.deleteItem(s)
        }, null, 8, Nr)
      ])
    ], 8, kr))), 128)),
    un(K("input", {
      class: "search",
      autocomplete: "off",
      disabled: e.isDisabled,
      tabindex: e.isDisabled ? -1 : 0,
      id: e.id,
      name: e.name,
      "onUpdate:modelValue": t[0] || (t[0] = (s) => r.searchText = s),
      ref: "input",
      style: He(o.inputWidth),
      onFocus: t[1] || (t[1] = z((...s) => o.openOptions && o.openOptions(...s), ["prevent"])),
      onKeyup: [
        t[2] || (t[2] = N((...s) => o.closeOptions && o.closeOptions(...s), ["esc"])),
        t[7] || (t[7] = N(z((...s) => o.enterItem && o.enterItem(...s), ["prevent"]), ["enter"]))
      ],
      onBlur: t[3] || (t[3] = (...s) => o.blurInput && o.blurInput(...s)),
      onKeydown: [
        t[4] || (t[4] = N((...s) => o.prevItem && o.prevItem(...s), ["up"])),
        t[5] || (t[5] = N((...s) => o.nextItem && o.nextItem(...s), ["down"])),
        t[6] || (t[6] = N(z(() => {
        }, ["prevent"]), ["enter"])),
        t[8] || (t[8] = N((...s) => o.deleteTextOrLastItem && o.deleteTextOrLastItem(...s), ["delete"]))
      ]
    }, null, 44, $r), [
      [cn, r.searchText]
    ]),
    Tt(l, {
      placement: "bottom",
      strategy: "fixed"
    }, {
      default: St(() => [
        K("div", {
          class: Y(["text", o.textClass])
        }, he(o.inputText), 3),
        K("div", {
          class: Y(["menu", o.menuClass]),
          ref: "menu",
          onMousedown: t[10] || (t[10] = z(() => {
          }, ["prevent"])),
          style: He(o.menuStyle),
          tabindex: "-1"
        }, [
          (_(!0), ee(ve, null, We(o.filteredOptions, (s, a) => (_(), ee("div", {
            key: a,
            class: Y(["item", { selected: s.selected || r.pointer === a, disabled: s.disabled }]),
            "data-vss-custom-attr": n.customAttr(s),
            onClick: z((u) => o.selectItem(s), ["stop"]),
            onMousedown: t[9] || (t[9] = (...u) => o.mousedownItem && o.mousedownItem(...u)),
            onMouseenter: (u) => o.pointerSet(a)
          }, [
            ze(e.$slots, "default", {
              option: s,
              idx: a
            }, () => [
              Ue(he(s.text), 1)
            ])
          ], 42, Hr))), 128))
        ], 38)
      ]),
      _: 3
    })
  ], 34);
}
const bt = /* @__PURE__ */ Jt(Mr, [["render", Wr]]), Kr = {
  name: "MultiListSelect",
  mixins: [je],
  emits: ["blur", "searchchange", "select"],
  render: function() {
    return D(bt, {
      id: this.id,
      name: this.name,
      options: this.options,
      selectedOptions: this.items,
      isError: this.isError,
      isDisabled: this.isDisabled,
      placeholder: this.placeholder,
      filterPredicate: this.filterPredicate,
      onSelect: this.onSelect,
      onSearchchange: (e) => this.$emit("searchchange", e)
    });
  },
  props: {
    list: {
      type: Array
    },
    optionValue: {
      type: String
    },
    optionText: {
      type: String
    },
    customText: {
      type: Function
    },
    selectedItems: {
      type: Array
    },
    optionDisabled: {
      type: String
    }
  },
  computed: {
    options() {
      return this.list.map((e) => ({ value: e[this.optionValue], text: this.buildText(e), disabled: !!e[this.optionDisabled] }));
    },
    items() {
      return this.selectedItems.map((e) => ({ value: e[this.optionValue], text: this.buildText(e), disabled: !!e[this.optionDisabled] }));
    }
  },
  methods: {
    buildText(e) {
      return e[this.optionValue] !== void 0 ? this.customText ? this.customText(e) : e[this.optionText] : "";
    },
    onSelect(e, t) {
      if (Object.keys(t).length === 0 && t.constructor === Object)
        this.$emit("select", e, t);
      else {
        const n = this.list.filter((r, o) => e.find((l, s) => r[this.optionValue] === l.value)), i = this.list.find((r) => r[this.optionValue] === t.value);
        this.$emit("select", n, i);
      }
    }
  },
  components: {
    MultiSelect: bt
  }
};
export {
  Yr as ModelListSelect,
  wt as ModelSelect,
  Kr as MultiListSelect,
  bt as MultiSelect
};
