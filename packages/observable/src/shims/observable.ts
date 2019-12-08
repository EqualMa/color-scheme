import { Observer } from "./observer";
import { SubscriptionObserver, SubscriberFunction, Subscription } from "./subscription";

/**
 * @see https://github.com/tc39/proposal-observable#observable
 */
declare class ObservableClass<T> {
  constructor(subscriber: SubscriberFunction<T>);

  // Subscribes to the sequence with an observer
  subscribe(observer: Partial<Observer<T>>): Subscription;

  // Subscribes to the sequence with callbacks
  subscribe(
    onNext: Function,
    onError?: Function,
    onComplete?: Function,
  ): Subscription;

  // Returns itself
  [Symbol.observable](): Observable<T>;

  // Converts items to an Observable
  public static of<V extends unknown[]>(...items: V): Observable<V[number]>;

  // Converts an observable or iterable to an Observable
  public static from<V>(observable: Iterable<V> | Observable<V>): Observable<V>;
}

export type Observable<T> = ObservableClass<T>
export type ObservableCtor = typeof ObservableClass
