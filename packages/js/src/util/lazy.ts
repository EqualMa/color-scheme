export function lazy<T>(gen: () => T): () => T {
  let v!: T;
  let assigned = false;

  return (): T => {
    return assigned ? v : (assigned = true) && (v = gen());
  };
}
