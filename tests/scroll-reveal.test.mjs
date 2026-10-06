import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import vm from "node:vm";

const source = readFileSync(new URL("../src/hooks/useScrollReveal.js", import.meta.url), "utf8")
  .replace(/^import .*;\r?\n/gm, "").replace("export default function", "function");
const element = (top = 200, preset = "up") => ({
  connected: true, dataset: { scrollReveal: preset },
  getClientRects: () => [1], getBoundingClientRect: () => ({ top, bottom: top + 100 }),
  contains(target) { return target === this; },
});
function setup({ mobile = false, reduced = false } = {}) {
  const single = element();
  const group = { children: [element(400), element(400), element(900)], dataset: { scrollGroup: "up" } };
  const listeners = new Map();
  const root = { querySelectorAll: (selector) => selector.includes("reveal") ? [single] : [group],
    contains: (node) => node.connected,
    addEventListener: (name, fn) => listeners.set(name, fn), removeEventListener: (name) => listeners.delete(name) };
  const tweens = [], contexts = [], observers = [], frames = new Map();
  let frameId = 0, cleanup, mediaCleanup, refreshes = 0;
  class Observer {
    constructor(callback) { this.callback = callback; observers.push(this); }
    observe() {}
    disconnect() { this.disconnected = true; }
  }
  const sandbox = {
    useRef: () => ({ current: root }), useLayoutEffect: (fn) => { cleanup = fn(); },
    MutationObserver: Observer, ResizeObserver: Observer, document: {},
    requestAnimationFrame: (fn) => { frames.set(++frameId, fn); return frameId; },
    cancelAnimationFrame: (id) => frames.delete(id),
    ScrollTrigger: { refresh: () => refreshes++ },
    gsap: {
      registerPlugin() {},
      matchMedia: () => ({ add: (_, fn) => { mediaCleanup = fn({ conditions: { mobile, reduced } }); }, revert: () => mediaCleanup?.() }),
      context: (fn) => { fn(); const context = { reverted: false, revert() { this.reverted = true; } }; contexts.push(context); return context; },
      fromTo: (targets, from, to) => { const tween = { targets, from, to, progress: () => to.onComplete() }; tweens.push(tween); return tween; },
    },
  };
  vm.createContext(sandbox);
  vm.runInContext(source + "\nuseScrollReveal();", sandbox);
  const flush = () => { for (const [id, fn] of [...frames]) { frames.delete(id); fn(); } };
  return { single, group, tweens, contexts, observers, frames, listeners, flush, cleanup: () => cleanup(),
    refreshes: () => refreshes };
}

test("one reveal per heading/row, no duplicates after rescans", () => {
  const page = setup();
  assert.equal(page.tweens.length, 3);
  assert.equal(page.tweens[1].targets.length, 2);
  page.flush(); page.observers[0].callback(); page.flush();
  assert.equal(page.tweens.length, 3);
  assert.equal(page.tweens[0].to.scrollTrigger.once, true);
  page.cleanup();
  assert.ok(page.contexts.every((context) => context.reverted));
  assert.ok(page.observers.every((observer) => observer.disconnected));
  assert.equal(page.frames.size, 0);
  assert.equal(page.listeners.size, 0);
});
test("API additions animate and removed products release their contexts", () => {
  const page = setup();
  page.group.children.push(element(1200));
  page.observers[0].callback(); page.flush();
  assert.equal(page.tweens.length, 4);
  page.group.children[0].connected = false;
  page.group.children.shift();
  page.observers[0].callback(); page.flush();
  assert.equal(page.contexts[1].reverted, true);
  page.cleanup();
});
test("mobile uses shorter travel and reduced motion creates no animation observers", () => {
  const mobile = setup({ mobile: true });
  assert.equal(mobile.tweens[0].from.y, 18);
  assert.equal(mobile.tweens[0].to.duration, 0.55);
  mobile.cleanup();
  const reduced = setup({ reduced: true });
  assert.equal(reduced.tweens.length, 0);
  assert.equal(reduced.observers.length, 0);
  reduced.cleanup();
});
test("keyboard focus finishes reveals so focused content is visible", () => {
  const page = setup();
  page.listeners.get("focusin")({ target: page.single });
  page.observers[0].callback(); page.flush();
  assert.equal(page.tweens.length, 3);
  page.cleanup();
});
