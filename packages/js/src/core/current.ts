import {
  PREFERS_COLOR_SCHEME_NAMES,
  PrefersColorScheme,
} from "./prefers-color-scheme";
import { ValueChangeListener, Unlisten } from "./types";
import { listenPrefers, prefers } from "./prefers";

export function listenCurrent(
  listener: ValueChangeListener<PrefersColorScheme>,
  emitCurrentValue = false,
): Unlisten {
  let oldValue: PrefersColorScheme | undefined = undefined;
  let curValue: PrefersColorScheme | undefined = undefined;

  let updater: unknown = undefined;
  const update = () =>
    setTimeout(() => {
      if (curValue !== oldValue) {
        oldValue = curValue;
        updater = undefined;

        if (curValue === undefined) throw new Error("Invalid state");

        listener(curValue);
      }
    }, 0) || true;

  const unlisteners = PREFERS_COLOR_SCHEME_NAMES.map(cs =>
    listenPrefers(
      cs,
      v => {
        if (v || curValue === cs) {
          curValue = v ? cs : undefined;
          if (!updater) {
            updater = update();
          }
        }
      },
      emitCurrentValue,
    ),
  );

  return () => {
    for (const unlsn of unlisteners) {
      unlsn();
    }
  };
}

export function current(): PrefersColorScheme {
  for (const cs of PREFERS_COLOR_SCHEME_NAMES) {
    if (prefers(cs)) {
      return cs;
    }
  }

  throw new Error("Unexpected value for media: prefers-color-scheme");
}
