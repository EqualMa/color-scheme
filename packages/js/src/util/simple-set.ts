// partially implements Set<T>
export class SimpleSet<T> {
  private _values: T[] = [];

  get size(): number {
    return this._values.length;
  }

  [Symbol.iterator](): IterableIterator<T> {
    return this._values[Symbol.iterator]();
  }

  public add(v: T): this {
    if (!this.has(v)) {
      this._values.push(v);
    }

    return this;
  }

  public clear() {
    this._values = [];
  }

  public delete(v: T): boolean {
    const i = this._values.indexOf(v);
    if (i === -1) return false;

    this._values.splice(i, 1);
    return true;
  }

  public has(v: T) {
    return this._values.indexOf(v) !== -1;
  }
}
