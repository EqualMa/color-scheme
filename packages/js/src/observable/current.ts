import { ObservableValue } from "./types";

import { PrefersColorScheme, listenCurrent } from "../core";

import { lazy } from "../util/lazy";

function genPrefersColorScheme(
  clean: () => void,
): ObservableValue<PrefersColorScheme> {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  let value!: PrefersColorScheme;

  const ob = new Observable<PrefersColorScheme>(observer => {
    const unlsn = listenCurrent(v => {
      value = v;
      observer.next(v);
    }, true);

    // Return a cleanup function which will cancel the event stream
    return () => {
      unlsn();
      clean();
    };
  });

  return {
    get observable() {
      return ob;
    },
    get value() {
      return value;
    },
  };
}

export const current: () => ObservableValue<PrefersColorScheme> = lazy(
  genPrefersColorScheme,
);
