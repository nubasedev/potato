/**
 * @version 1.0.0
 */
import DeepSort from 'deep-sort-object'
import FastGlob from 'fast-glob'
import { writeFileSync } from 'fs'
import path, { basename, dirname } from 'path'
import { fileURLToPath } from 'url'
import { PoParser } from './po-parser.mjs'
import { PotBuilder } from './pot-builder.mjs'
const __dirname = dirname(fileURLToPath(import.meta.url))
class LangBuilder {
  data = {}
  constructor() {
    this.build()
  }
  setData = async () => {
    new PotBuilder({
      potPath: path.resolve(__dirname, '../locales/lang.pot'),
      sourceDir: path.resolve(__dirname, '../src'),
    })
    const files = await FastGlob(path.resolve(__dirname, '../locales/*.po'))
    files.map((file) => {
      const lang = basename(file, '.po')
      const langId = lang.replace('_', '-')
      const parser = new PoParser({
        poPath: path.resolve(__dirname, `../locales/${lang}.po`),
      })
      const items = parser.parse()
      Object.keys(items).map((text) => {
        if (!this.data[text]) {
          this.data[text] = {}
        }
        if (!this.data[text][langId]) {
          this.data[text][langId] = items[text]
        }
      })
    })
  }
  build = async () => {
    await this.setData()
    this.data = DeepSort(this.data)
    const jsonPath = path.resolve(
      __dirname,
      `../src/components/language/data.json`,
    )
    writeFileSync(jsonPath, JSON.stringify(this.data, null, 2))
  }
}
new LangBuilder()
