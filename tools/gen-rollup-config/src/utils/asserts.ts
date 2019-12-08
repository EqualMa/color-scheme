import isEqual from "lodash.isequal";

export function assertSameObject<T>(
  objs: T[],
  msg = "objects should be equal to each other",
): T | undefined {
  let cur = undefined;
  for (const obj of objs) {
    if (cur === undefined) {
      cur = obj;
      continue;
    }

    if (!isEqual(cur, obj)) {
      throw new Error(msg);
    }
  }
  return cur;
}

export function assertAllUndefinded(
  vars: unknown[],
  msg = "should all be undefined",
): undefined {
  for (const v of vars) {
    if (v !== undefined) throw new Error(msg);
  }
  return undefined;
}
