// Auto-install when vue is found (eg. in browser via <script> tag)
import plugin from ".";

const Vue = (globalThis.Vue as unknown) as import("vue").VueConstructor;

if (typeof Vue !== "undefined" && Vue && typeof Vue.use === "function") {
  Vue.use(plugin);
}
