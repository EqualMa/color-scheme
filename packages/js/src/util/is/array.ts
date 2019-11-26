export function isInArrayChecker<T extends readonly unknown[]>(
  array: T,
): (v: unknown) => v is T[number] {
  return (v): v is T[number] => array.indexOf(v) !== -1;
}

export function isInArray<T extends readonly unknown[]>(
  v: unknown,
  array: T,
): v is T[number] {
  return array.indexOf(v) !== -1;
}
