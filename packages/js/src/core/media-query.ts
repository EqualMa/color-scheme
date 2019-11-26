import { PrefersColorScheme } from "./prefers-color-scheme";

export function matchPrefers(colorScheme: PrefersColorScheme): MediaQueryList {
  return window.matchMedia(`(prefers-color-scheme: ${colorScheme})`);
}

// https://caniuse.com/#feat=mdn-api_mediaquerylist_eventtarget_inheritance
// https://developer.mozilla.org/en-US/docs/Web/API/MediaQueryList#Methods
const supportEventTarget =
  typeof MediaQueryList === "function" &&
  typeof MediaQueryList.prototype === "object" &&
  typeof MediaQueryList.prototype.addEventListener === "function" &&
  typeof MediaQueryList.prototype.removeEventListener === "function";

export type MediaQueryListEventListener = (ev: MediaQueryListEvent) => void;

export const addListenerToMediaQueryList: (
  mql: MediaQueryList,
  listener: MediaQueryListEventListener,
) => () => void = supportEventTarget
  ? (mql, lsn) => {
      mql.addEventListener("change", lsn);
      return () => mql.removeEventListener("change", lsn);
    }
  : (mql, lsn) => {
      mql.addListener(lsn);
      return () => mql.removeListener(lsn);
    };
