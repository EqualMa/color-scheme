export type ValueChangeListener<V> = (v: V) => void;
export type Unlisten = () => void;
export type AsyncUnlisten = () => Promise<void>;
export type ValueChangeListenerHandler<V> = (
  listener: ValueChangeListener<V>,
) => Unlisten | AsyncUnlisten | void;
