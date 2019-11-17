import { PrefersColorScheme } from "./prefers";

export function matchPrefers(colorScheme: PrefersColorScheme): MediaQueryList {
  return window.matchMedia(`(prefers-color-scheme: ${colorScheme})`);
}
