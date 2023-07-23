import commonjs from "@rollup/plugin-commonjs";
import json from '@rollup/plugin-json';
import resolve from "@rollup/plugin-node-resolve";
import terser from '@rollup/plugin-terser';
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
        name: 'FcMde',
        file: 'lib/umd/index.js',
        format: "umd",
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
      typescript({ tsconfig: "config/tsconfig.umd.json" }),
      terser()
    ],
    external: ["react", "react-dom"]
  },
];
