import { FORMATS_BROWSER } from "./constants";
import { GenRollupConfigOptions } from "./config";

export type PartialGenOptions = Pick<
  GenRollupConfigOptions,
  Exclude<keyof GenRollupConfigOptions, "input" | "output">
>;

export const OPTION_ESNEXT: PartialGenOptions = { format: "esm", esnext: true, emitTsDeclaration: true };

export const OPTION_MAIN_AND_MODULE: PartialGenOptions = {
  format: ["esm", "cjs"],
};

export const OPTIONS_BROWSER: readonly PartialGenOptions[] = [
  { format: FORMATS_BROWSER, bundle: true, min: false },
  { format: FORMATS_BROWSER, bundle: true, min: true },
];

export const OPTIONS_DEFAULT: readonly PartialGenOptions[] = [
  OPTION_ESNEXT,
  OPTION_MAIN_AND_MODULE,
  ...OPTIONS_BROWSER,
];
