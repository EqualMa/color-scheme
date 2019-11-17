interface SubscriptionObserver<T> {
  // Sends the next value in the sequence
  next(value: T): void;
  // Sends the sequence error
  error(errorValue: unknown): void;
  // Sends the completion notification
  complete(): void;
  // A boolean value indicating whether the subscription is closed
  readonly closed: boolean;
}
