import { VueConstructor } from "vue";
import { listenCurrent, PrefersColorScheme } from "@color-scheme/js";
import {
  normalizeColorScheme,
  NormalizedPrefersColorScheme,
  NORM_PREFERS_COLOR_SCHEME_NAMES,
} from "./norm-names";

export interface PrefersColorSchemeInfo
  extends Record<NormalizedPrefersColorScheme, boolean | undefined> {
  value: PrefersColorScheme | undefined;
}

export const observeCurrent = (Vue: VueConstructor) => {
  const cur = Vue.observable<PrefersColorSchemeInfo>({
    value: undefined,
    light: undefined,
    dark: undefined,
    noPreference: undefined,
  });

  listenCurrent(v => {
    cur.value = v;
    const normv = normalizeColorScheme(v);
    for (const ncs of NORM_PREFERS_COLOR_SCHEME_NAMES) {
      cur[ncs] = normv === ncs;
    }
  }, true);

  return cur;
};
