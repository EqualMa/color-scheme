import {
  PrefersColorScheme,
  PREFERS_COLOR_SCHEME_NAMES,
} from "@color-scheme/js";

export type NormalizedPrefersColorScheme =
  | Exclude<PrefersColorScheme, "no-preference">
  | "noPreference";

export const normalizeColorScheme: (
  v: PrefersColorScheme,
) => NormalizedPrefersColorScheme = v =>
  v === "no-preference" ? "noPreference" : v;

export const NORM_PREFERS_COLOR_SCHEME_NAMES = PREFERS_COLOR_SCHEME_NAMES.map(
  normalizeColorScheme,
);
