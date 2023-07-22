import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { copyScssFiles } from './utils.mjs';
const __dirname = dirname(fileURLToPath(import.meta.url));
process.argv[1] === 'esm' && copyScssFiles(path.resolve(__dirname, '../src'), path.resolve(__dirname, '../lib/esm'))
process.argv[1] === 'cjs' && copyScssFiles(path.resolve(__dirname, '../src'), path.resolve(__dirname, '../lib/cjs'))
