import { Subscription } from "./subscription";

export interface Observer<T> {
  // Receives the subscription object when `subscribe` is called
  start(subscription: Subscription): void;

  // Receives the next value in the sequence
  next(value: T): void;

  // Receives the sequence error
  error(errorValue: T): void;

  // Receives a completion notification
  complete(): void;
}
