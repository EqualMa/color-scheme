import { Unlisten, ValueChangeListenerHandler } from "../core/types";

export class ValueChangeEventGenerator<T>
  implements AsyncGenerator<T, void, boolean> {
  private continue = true;
  private cleaned = false;
  private curResolve: ((v: IteratorResult<T>) => void) | undefined = undefined;
  private curPromise: Promise<IteratorResult<T>> | undefined = undefined;
  private $unlsn: Unlisten | undefined | void = undefined;

  public constructor(listenerHandler: ValueChangeListenerHandler<T>) {
    this.$unlsn = listenerHandler(v => {
      const r = this.curResolve;
      if (r === undefined) throw new Error("Invalid state");

      this.curResolve = undefined;
      this.curPromise = undefined;

      r({ done: !this.continue, value: v });
    });
  }

  [Symbol.asyncIterator]() {
    return this;
  }
  async next(con: boolean | PromiseLike<boolean> = true) {
    this.continue = await con;

    return (
      this.curPromise ||
      (this.curPromise = new Promise<IteratorResult<T>>(resolve => {
        if (this.curResolve)
          console.warn("Invalid usage of async-generator.prefers");
        this.curResolve = resolve;
      }))
    );
  }
  // TODO: what should be returned
  return(): Promise<IteratorReturnResult<void>> {
    this.$clear();
    return Promise.resolve({ done: true, value: undefined });
  }
  throw(e: unknown): never {
    this.$clear();
    throw e;
    // TODO:
    //  return Promise.resolve({done:true,value:undefined})
  }
  $clear() {
    if (!this.cleaned) {
      this.cleaned = true;

      this.curResolve = undefined;
      this.curPromise = undefined;

      const unlsn = this.$unlsn;
      if (typeof unlsn === "function") {
        unlsn();
      }
    }
  }
}
