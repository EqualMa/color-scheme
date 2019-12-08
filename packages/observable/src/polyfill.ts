import { ObservableCtor } from './shims'

declare global {
  const Observable: ObservableCtor | undefined
}

let ObservableCtor: (ObservableCtor | undefined) = typeof Observable === 'function' ? Observable : undefined

export function getDefaultObservableCtor<O extends ObservableCtor = ObservableCtor>(): O {
  if (!ObservableCtor) {
    throw new ReferenceError('Observable is not defined')
  }

  return ObservableCtor as O
}

export function setDefaultObservableCtor<T extends typeof Observable>(Observable: T, overwrite: boolean = false) {
  if (ObservableCtor !== undefined && (!overwrite)) {
    throw new Error('You are trying to overwrite default Observable for \
@color-scheme/js. You can set the second param of setDefaultObservable as true to force the overwrite')
  }

  ObservableCtor = Observable
}
