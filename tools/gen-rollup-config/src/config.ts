import resolve from "@rollup/plugin-node-resolve";
import externals from "rollup-plugin-node-externals";
import commonjs from "rollup-plugin-commonjs";
import { DEFAULT_EXTENSIONS } from "@babel/core";
import typescript from "rollup-plugin-typescript2";
import babel from "rollup-plugin-babel";
import { terser } from "rollup-plugin-terser";

import {
  InputOption,
  OutputOptions,
  ModuleFormat,
  RollupOptions,
} from "rollup";

export interface GenRollupConfigOptions {
  input: InputOption;
  output:
  | OutputOptions
  | ((opt: GenRollupConfigOptionsWithSingleFormat) => OutputOptions);

  min?: boolean;
  bundle?: boolean;
  esnext?: boolean;

  /**
   * - if `opt.output` is a function, then:
   *
   *   - if `opt.format` is a string, then:
   *
   *     `opt.output(opt)` will be used as output options
   *
   *   - else ( `opt.format` is a string array ):
   *
   *     `opt.format.map(f => opt.output({...opt, format: f}))` will be used as output options
   *
   * - else ( `opt.output` is an object):
   *
   *   - if `opt.format` is a string, then:
   *
   *     `opt.output({...opt, format: opt.format})` will be used as output options
   *
   *   - else ( `opt.format` is a string array ):
   *
   *     `opt.format.map(f => ({...opt.output, format: f}))` will be used as output options
   */
  format?: ModuleFormat | readonly ModuleFormat[];

  /**
   * @default "./tsconfig.prod.json"
   */
  tsconfigFile?: string;

  emitTsDeclaration?: boolean;

  preserveModules?: boolean
}

export interface GenRollupConfigOptionsWithSingleFormat
  extends GenRollupConfigOptions {
  format?: ModuleFormat;
}

export const config: (opt: GenRollupConfigOptions) => RollupOptions = opt => {
  const {
    input,
    format,
    output,
    min = false,
    bundle = false,
    esnext = false,

    tsconfigFile = "./tsconfig.prod.json",
    emitTsDeclaration = false,

    preserveModules = false,
  } = opt;

  const genOutput: (
    c: GenRollupConfigOptionsWithSingleFormat,
  ) => OutputOptions = c =>
      typeof output === "function" ? output(c) : { format: c.format, ...output };

  const cfg: RollupOptions = {
    input,
    output: Array.isArray(format)
      ? format.map(f => genOutput({ ...opt, format: f }))
      : genOutput(opt as GenRollupConfigOptionsWithSingleFormat),
    preserveModules,
    plugins: [
      // if the output is a bundle, then deps are resolved to be included in the output
      // else, the deps are marked as as external modules and won't be included in the output
      bundle
        ? resolve({
          // https://github.com/rollup/plugins/tree/master/packages/node-resolve
          mainFields: ["module", "main"],
        })
        : externals({
          // https://github.com/Septh/rollup-plugin-node-externals
          deps: true,
          peerDeps: true,
        }),
      typescript({
        tsconfig: tsconfigFile,
        tsconfigOverride: {
          compilerOptions: { declaration: emitTsDeclaration },
        },
        clean: true,
      }),
      bundle && commonjs(),
      !esnext &&
      babel({
        extensions: [...DEFAULT_EXTENSIONS, ".ts", ".tsx"],
        exclude: "node_modules/**",
      }),
      min && terser(),
    ],
  };
  return cfg
};
