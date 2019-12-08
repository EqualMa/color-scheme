import { ObservableValue } from "./types";

import { PrefersColorScheme, listenCurrent, lazy } from "@color-scheme/js";

import { getDefaultObservableCtor } from "./polyfill";
import { Observable } from "./shims";

function genPrefersColorScheme(
  clean: () => void,
): ObservableValue<PrefersColorScheme> {
  const Observable = getDefaultObservableCtor();

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

export const current: <TPrefersColorSchemeObservable = Observable<
  PrefersColorScheme
>>() => ObservableValue<
  PrefersColorScheme,
  TPrefersColorSchemeObservable
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
> = lazy(genPrefersColorScheme) as any;
