import fs from 'fs'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'
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
const dir = process.argv.slice(2)[0]
if (dir) {
  deleteDirRecursive(path.join(__dirname, '../lib', dir))
} else {
  deleteDirRecursive(path.join(__dirname, '../lib/cjs'))
  deleteDirRecursive(path.join(__dirname, '../lib/esm'))
  deleteDirRecursive(path.join(__dirname, '../lib/umd'))
  deleteDirRecursive(path.join(__dirname, '../lib/types'))
}
