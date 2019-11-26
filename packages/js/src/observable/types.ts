export interface ObservableValue<T> {
  readonly observable: Observable<T>;
  readonly value: T;
}
