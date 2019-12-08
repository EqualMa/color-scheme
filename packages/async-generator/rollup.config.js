/* eslint-env node */
import {
  config,
  isProduction,
  OPTIONS_DEFAULT,
} from "@color-scheme/gen-rollup-config";

const mainEntry = "src/index.ts";

export const input = ({ bundle }) =>
  bundle
    ? {
        "color-scheme-async-generator": mainEntry,
      }
    : mainEntry;

const GLOBAL_LIB_NAME = "colorSchemeAsyncGenerator";

const output = cfg => {
  const { format, min, bundle, esnext } = cfg;

  const dir = esnext
    ? "dist/esnext"
    : "dist/" + (bundle ? "bundle/" : "") + format;
  const postfix = `${bundle ? ".bundle" : ""}${min ? ".min" : ""}.js`;
  return {
    dir,
    entryFileNames: "[name]" + postfix,
    chunkFileNames: "chunk-[name]" + postfix,
    format,
    name: GLOBAL_LIB_NAME,
    sourcemap: isProduction,
  };
};

export default OPTIONS_DEFAULT.map(opt => ({
  input: input(opt),
  output,
  ...opt,
})).map(config);
