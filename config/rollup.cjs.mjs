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
        file: 'lib/cjs/index.js',
        format: "cjs",
        sourcemap: true,
        assetFileNames: '[name][extname]'
      },
    ],
    plugins: [
      json(),
      postcss({
        modules: true,
        minimize: true,
      }),
      resolve(),
      commonjs(),
      typescript({ tsconfig: "config/tsconfig.cjs.json" })
    ],
    external: ["react", "react-dom"]
  },
];
