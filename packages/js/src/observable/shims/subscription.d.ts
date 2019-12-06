export interface Subscription {
  // Cancels the subscription
  unsubscribe(): void;
  // A boolean value indicating whether the subscription is closed
  readonly closed: boolean;
}

export type SubscriberFunction<T> = (
  observer: SubscriptionObserver<T>,
) => (() => void) | Subscription;

export interface SubscriptionObserver<T> {
  // Sends the next value in the sequence
  next(value: T): void;
  // Sends the sequence error
  error(errorValue: unknown): void;
  // Sends the completion notification
  complete(): void;
  // A boolean value indicating whether the subscription is closed
  readonly closed: boolean;
}
