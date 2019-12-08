import { PrefersColorScheme } from "./prefers-color-scheme";
import { ValueChangeListener, Unlisten } from "./types";
import { matchPrefers, addListenerToMediaQueryList } from "./media-query";
import { initColorSchemeDict } from "./util";
import { SimpleSet } from "../util/simple-set";

type Queries = { [K in PrefersColorScheme]: Query | undefined };
interface Query {
  mql: MediaQueryList;
  listeners: SimpleSet<ValueChangeListener<boolean>>;
  readonly value: boolean;
  clean: () => void;
}

let queries: Queries | undefined = undefined;

function initQuery(cs: PrefersColorScheme): Query {
  const mql = matchPrefers(cs);

  let value = mql.matches;
  const listeners = new SimpleSet<ValueChangeListener<boolean>>();

  const unlisten = addListenerToMediaQueryList(mql, ev => {
    if (ev.matches !== value) {
      value = ev.matches;
      for (const lsn of listeners) {
        lsn(value);
      }
    }
  });

  return {
    mql,
    listeners,
    get value() {
      return value;
    },
    clean: unlisten,
  };
}

function getQuery(cs: PrefersColorScheme): Query {
  if (!queries) queries = initColorSchemeDict();
  return queries[cs] || (queries[cs] = initQuery(cs));
}

/**
 * @returns a function to stop listening
 */
export function listenPrefers(
  cs: PrefersColorScheme,
  listener: ValueChangeListener<boolean>,
  emitCurrentValue = false,
): Unlisten {
  const { listeners, value, clean } = getQuery(cs);

  if (emitCurrentValue) listener(value);

  listeners.add(listener);

  return () => {
    listeners.delete(listener);
    if (listeners.size === 0) {
      clean();
      if (queries) {
        queries[cs] = undefined;
      }
    }
  };
}

export function prefers(cs: PrefersColorScheme): boolean {
  return getQuery(cs).value;
}
