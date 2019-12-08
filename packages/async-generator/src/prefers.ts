import { PrefersColorScheme, listenPrefers } from "@color-scheme/js";
import { ValueChangeEventGenerator } from "./util/event-generator";

export function prefers(
  cs: PrefersColorScheme,
  emitCurrentValue = false,
): AsyncGenerator<boolean, void, boolean> {
  return new ValueChangeEventGenerator(listener => {
    listenPrefers(cs, listener, emitCurrentValue);
  });
}
