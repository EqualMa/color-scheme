export function isObject(x: unknown): x is object {
  return typeof x === "object";
}

export function isNonNullObject(x: unknown): x is NonNullable<object> {
  return x !== null && typeof x === "object";
}

export function isNonNull<T>(x: null | T): x is NonNullable<T> {
  return x !== null && x !== undefined;
}
