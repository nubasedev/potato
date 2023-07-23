import commonjs from "@rollup/plugin-commonjs";
import json from '@rollup/plugin-json';
import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import postcss from 'rollup-plugin-postcss';
/**
 * @type {import('rollup').RollupOptions[]}
 */
export default [
  {
    input: "src/index.ts",
    output: [
      {
        file: 'lib/esm/index.js',
        format: "esm",
        sourcemap: true,
        assetFileNames: '[name][extname]'
      }
    ],
    plugins: [
      resolve(),
      commonjs(),
      typescript({ tsconfig: "config/tsconfig.esm.json" }),
      json(),
      postcss({
        modules: true,
        minimize: true,
      }),
      // scss({
      //   output: false,
      // }),

    ],
    external: ["react", "react-dom"]
  },
  // {
  //   input: "lib/esm/types/index.d.ts",
  //   output: [{ file: "lib/index.d.ts", format: "esm" }],
  //   plugins: [dts()]
  // }
];
