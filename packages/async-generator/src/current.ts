import { PrefersColorScheme, listenCurrent } from "@color-scheme/js";

import { ValueChangeEventGenerator } from "./util/event-generator";

export function current(
  emitCurrentValue = false,
): AsyncGenerator<PrefersColorScheme, void, boolean> {
  return new ValueChangeEventGenerator(listener => {
    listenCurrent(listener, emitCurrentValue);
  });
}
