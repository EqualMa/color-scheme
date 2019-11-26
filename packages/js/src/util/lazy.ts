export function lazy<T>(gen: (clear: () => void) => T): () => T {
  let v!: T;
  let assigned = false;
  const clear = () => {
    (v as unknown) = undefined;
    assigned = false;
  };

  return (): T => (assigned ? v : (assigned = true) && (v = gen(clear)));
}
