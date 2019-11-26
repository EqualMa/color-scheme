/* eslint-env node */
import resolve from "rollup-plugin-node-resolve";
import externals from "rollup-plugin-node-externals";
import commonjs from "rollup-plugin-commonjs";
import { DEFAULT_EXTENSIONS } from "@babel/core";
import typescript from "rollup-plugin-typescript2";
import babel from "rollup-plugin-babel";
import { terser } from "rollup-plugin-terser";
import * as glob from "glob";
import * as path from "path";

const isProduction = process.env.NODE_ENV === "production";

const EXCLUDED_FROM_ENTRIES = ["core"];

const extractModuleName = file => path.relative("src", path.dirname(file));

const otherEntries = {
  ...glob
    .sync("src/*/index.ts")
    .map(p => [extractModuleName(p), p])
    .filter(p => !EXCLUDED_FROM_ENTRIES.includes(p[0]))
    .reduce((obj, [name, file]) => ({ ...obj, [name]: file }), {}),
};

const mainEntry = "src/core/index.ts";

const input = ({ bundle }) =>
  bundle
    ? {
      ...otherEntries,
      "color-scheme": mainEntry,
    }
    : {
      ...otherEntries,
      index: mainEntry,
    };

const POLYFILL_DIR = path.dirname(require.resolve('core-js'))
const isPolyfill = id =>
  path.resolve(id).startsWith(POLYFILL_DIR)


export const config = ({ format, min = false, bundle = false }) => {
  const postfix = `${bundle ? ".bundle" : ""}${min ? ".min" : ""}.js`;
  return {
    input: input({ bundle }),
    output: {
      dir: "dist/" + (bundle ? "bundle/" : "") + format,
      entryFileNames: "[name]" + postfix,
      chunkFileNames: "chunk-[name]" + postfix,
      format,
      sourcemap: isProduction,
    },
    manualChunks(id) {
      if (isPolyfill(id)) {
        return 'polyfill';
      }
    },
    plugins: [
      // https://github.com/Septh/rollup-plugin-node-externals
      !bundle &&
      externals({
        deps: true,
        peerDeps: true,
      }),
      bundle && resolve(),
      typescript({
        tsconfig: "./tsconfig.prod.json",
        clean: true,
      }),
      bundle && commonjs(),
      babel({
        extensions: [...DEFAULT_EXTENSIONS, ".ts", ".tsx"],
        exclude: "node_modules/**",
      }),
      min && terser(),
    ],
  };
};
export default [
  { format: "esm", min: false, bundle: false },
  { format: "esm", min: false, bundle: true },
  // { format: "esm", min: true, bundle: true },
].map(config);
