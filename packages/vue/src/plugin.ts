import { VueConstructor } from "vue";

import { devMode } from "./utils";

import { PrefersColorSchemeInfo, observeCurrent } from "./vue-observable";

const installed = false;

let current: PrefersColorSchemeInfo;

export default class VueColorSchemePlugin {
  private constructor() {
    if (devMode() && !installed) {
      console.warn(
        `[vue-color-scheme] not installed. Make sure to call \`Vue.use(VueColorSchemePlugin)\` before create VueColorSchemePlugin instance.`,
      );
    }
  }

  get current() {
    return current;
  }

  public static install(Vue: VueConstructor) {
    const isDev = devMode();

    if (installed) {
      if (isDev) {
        console.warn(
          "[vue-color-scheme] already installed. Vue.use(VueColorSchemePlugin) should be called only once.",
        );
      }
      return;
    }

    current = observeCurrent(Vue);

    // 4. add an instance method
    Vue.prototype.$colorScheme = new VueColorSchemePlugin();

    if (isDev) {
      console.info("[vue-color-scheme] is plugged in.");
    }
  }
}
