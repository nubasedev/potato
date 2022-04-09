const fs = require('fs')
const Path = require('path')
const deleteDirRecursive = (path) => {
  if (fs.existsSync(path)) {
    fs.readdirSync(path).forEach((file) => {
      const curPath = Path.join(path, file)
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
  deleteDirRecursive(Path.join(__dirname, '../lib', dir))
} else {
  deleteDirRecursive(Path.join(__dirname, '../lib/cjs'))
  deleteDirRecursive(Path.join(__dirname, '../lib/esm'))
  deleteDirRecursive(Path.join(__dirname, '../lib/umd'))
  deleteDirRecursive(Path.join(__dirname, '../lib/types'))
}
