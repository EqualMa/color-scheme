import { PrefersColorScheme, listenPrefers } from "../core";
import { ObservableValue } from "./types";
import { initColorSchemeDict } from "../core";
import { Observable } from './shims';
import { getDefaultObservableCtor } from './polyfill';

let obs:
  | Record<PrefersColorScheme, ObservableValue<boolean> | undefined>
  | undefined = undefined;

export function prefers<TBooleanObservable = Observable<boolean>>(cs: PrefersColorScheme): ObservableValue<boolean, TBooleanObservable>
export function prefers(cs: PrefersColorScheme): ObservableValue<boolean> {
  const Observable = getDefaultObservableCtor()

  if (!obs) obs = initColorSchemeDict();

  const curOb = obs[cs];
  if (curOb !== undefined) return curOb;

  let value!: boolean;
  const ob = new Observable<boolean>(observer => {
    const unlsn = listenPrefers(
      cs,
      v => {
        value = v;
        observer.next(v);
      },
      true,
    );

    // Return a cleanup function which will cancel the event stream
    return () => {
      unlsn();
      if (obs) obs[cs] = undefined;
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

  return (obs[cs] = obj);
}
