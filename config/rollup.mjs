import commonjs from "@rollup/plugin-commonjs";
import json from '@rollup/plugin-json';
import { nodeResolve } from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";
import postcss from 'rollup-plugin-postcss';
import pkg from '../package.json' assert { type: "json" };
/**
 * @type {import('rollup').RollupOptions[]}
 */
export default [
  {
    external: [...Object.keys(pkg.peerDependencies || {})],
    input: ["src/index.ts"],
    output: [
      {
        file: pkg.module,
        format: "esm",
        sourcemap: true,
      },
    ],
    plugins: [
      typescript({ tsconfig: "config/rollup.tsconfig.json" }),
      nodeResolve(),
      commonjs(),
      json(),
      postcss({
        modules: true,
        minimize: true,
      }),
    ],
  },
  {
    input: "lib/types/index.d.ts",
    output: [{ file: "lib/index.d.ts", format: "esm" }],
    external: [/\.scss$/],
    plugins: [
      dts()
    ]
  }
];
