import { Observable } from "./shims";

export interface ObservableValue<T, TObservable = Observable<T>> {
  readonly observable: TObservable;
  readonly value: T;
}
