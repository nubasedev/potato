/**
 * @version 1.0.0
 */
import { existsSync, readFileSync } from 'fs'
export class PoParser {
  poPath = ''
  items = {}
  constructor({ poPath }) {
    this.poPath = poPath
    if (!existsSync(this.poPath)) {
      throw new Error(`${this.poPath} not exists`)
    }
  }
  parse = () => {
    const code = readFileSync(this.poPath).toString()
    const reg = new RegExp(
      `(msgctxt\\s+"(.+?)"\\s+)?msgid\\s+"(.+?)"\\s+msgstr\\s+"(.+?)"`,
      'gm',
    )
    ;[...code.matchAll(reg)].map(([, , ctxt = '', id, str]) => {
      const key = ctxt !== '' ? `${ctxt}|${id}` : id
      this.items[key] = str
    })
    this.items = Object.keys(this.items)
      .sort()
      .reduce((r, k) => ((r[k] = this.items[k]), r), {})
    return this.items
  }
}
