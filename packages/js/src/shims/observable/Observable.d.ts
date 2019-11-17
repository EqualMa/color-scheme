/**
 * @see https://github.com/tc39/proposal-observable#observable
 */
declare class Observable<T> {
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

interface Subscription {
  // Cancels the subscription
  unsubscribe(): void;
  // A boolean value indicating whether the subscription is closed
  readonly closed: boolean;
}

type SubscriberFunction<T> = (
  observer: SubscriptionObserver<T>,
) => (() => void) | Subscription;
