import { PrefersColorScheme, listenPrefers } from "../core";
import { ValueChangeEventGenerator } from "./util/event-generator";

export function prefers(
  cs: PrefersColorScheme,
  emitCurrentValue = false,
): AsyncGenerator<boolean, void, boolean> {
  return new ValueChangeEventGenerator(listener => {
    listenPrefers(cs, listener, emitCurrentValue);
  });
}
