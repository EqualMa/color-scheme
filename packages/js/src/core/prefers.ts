export const PREFERS_COLOR_SCHEME_NAMES = [
  "light",
  "dark",
  "no-preference",
] as const;
export type PrefersColorScheme = typeof PREFERS_COLOR_SCHEME_NAMES[number];
