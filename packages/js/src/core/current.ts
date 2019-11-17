import { PREFERS_COLOR_SCHEME_NAMES, PrefersColorScheme } from "./prefers";
import { matchPrefers } from "./media-query";
import { lazy } from "../util/lazy";

export interface ObservableValue<T> {
  readonly observable: Observable<T>;
  readonly value: T;
}

let queries:
  | {
      [K in PrefersColorScheme]?: ObservableValue<boolean>;
    }
  | undefined;

export function prefers(cs: PrefersColorScheme): ObservableValue<boolean> {
  if (!queries) {
    queries = {};
  }

  if (queries[cs]) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return queries[cs]!;
  }

  const query = matchPrefers(cs);

  let value!: boolean;
  const ob = new Observable<boolean>(observer => {
    const handler = (e: MediaQueryList | MediaQueryListEvent) =>
      observer.next((value = e.matches));

    handler(query);

    query.addEventListener("change", handler);

    // Return a cleanup function which will cancel the event stream
    return () => {
      // Detach the event handler
      query.removeEventListener("change", handler);
      if (queries) queries[cs] = undefined;
    };
  });

  const obj: ObservableValue<boolean> = {
    get observable() {
      return ob;
    },
    get value() {
      return value;
    },
  };

  return (queries[cs] = obj);
}

function genPrefersColorScheme(): ObservableValue<PrefersColorScheme> {
  let currentValue: PrefersColorScheme | undefined = undefined;
  let oldValue: PrefersColorScheme | undefined = undefined;

  const ob = new Observable<PrefersColorScheme>(observer => {
    let checking: undefined | Promise<void> = undefined;

    const check = async () => {
      if (currentValue !== oldValue) {
        oldValue = currentValue;
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        observer.next(currentValue!);
      }
      checking = undefined;
    };

    const subscriptions = PREFERS_COLOR_SCHEME_NAMES.map(cs => {
      const obv = prefers(cs);
      return obv.observable.subscribe({
        next(v: boolean) {
          if (v) currentValue = cs;
          else if (currentValue === cs) {
            currentValue = undefined;
          }

          if (currentValue !== oldValue && !checking) {
            checking = check();
          }
        },
      });
    });

    // Return a cleanup function which will cancel the event stream
    return () => {
      for (const sub of subscriptions) {
        sub.unsubscribe();
      }
    };
  });

  return {
    get observable() {
      return ob;
    },
    get value() {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      return currentValue!;
    },
  };
}

export const prefersColorScheme: () => ObservableValue<
  PrefersColorScheme
> = lazy(genPrefersColorScheme);
