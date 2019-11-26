import { PrefersColorScheme } from "./prefers-color-scheme";

export function initColorSchemeDict(): Record<PrefersColorScheme, undefined> {
  return { "no-preference": undefined, dark: undefined, light: undefined };
}
