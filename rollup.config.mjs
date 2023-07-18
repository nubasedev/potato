import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import fs from 'fs';
import path, { dirname } from 'path';
import postcss from 'rollup-plugin-postcss';
import { terser } from 'rollup-plugin-terser';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url))
const deleteDirRecursive = (path) => {
  if (fs.existsSync(path)) {
    fs.readdirSync(path).forEach((file) => {
      const curPath = path.join(path, file)
      if (fs.lstatSync(curPath).isDirectory()) {
        deleteDirRecursive(curPath)
      } else {
        fs.unlinkSync(curPath)
      }
    })
    fs.rmdirSync(path)
  }
}
deleteDirRecursive(path.join(__dirname, '../lib'))
/**
 * @type {import('rollup').RollupOptions}
 */
export default {
  input: {
    index: './src/index.ts',
  },
  output: [
    {
      dir: 'lib',
      // file: 'lib/cjs/index.js',
      format: 'cjs',
      sourcemap: true,
    },
    {
      dir: 'lib',
      // file: 'lib/esm/index.js',
      format: 'esm',
      sourcemap: true,
    },
    {
      dir: 'lib',
      // file: 'lib/umd/index.js',
      name: 'FcMde',
      format: 'umd',
      sourcemap: true,
    },
  ],
  plugins: [
    resolve(),
    commonjs(),
    typescript({
      tsconfig: './tsconfig.rollup.json',
      declaration: true,
      declarationDir: 'lib/types',
      outDir: 'lib',
    }),
    json(),
    postcss(),
    terser(),
  ],
  external: ['react', 'react-dom'],
};
