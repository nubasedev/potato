/**
 * @version 1.0.0
 */
import { lstatSync, readdirSync, readFileSync, writeFileSync } from 'fs'
import { extname } from 'path'
export class PotBuilder {
  potPath = ''
  sourceDir = ''
  entries = {}
  /**
   * @type {string[]}
   */
  filePaths = []
  constructor({ potPath, sourceDir }) {
    this.potPath = potPath
    this.sourceDir = sourceDir
    this.fetchDirOrFile(this.sourceDir)
    this.filePaths.map(this.buildEntries)
    this.buildPotFile()
  }
  buildEntries = (path) => {
    const code = readFileSync(path).toString()
    const reg = new RegExp(
      `gettext\\s*\\(\\s*('.+?')\\s*,*\\s*('.+?')*\\s*\\)`,
      'gm',
    )
    const matches = code.matchAll(reg)
    if (matches) {
      for (const match of matches) {
        const msgid = match[1].slice(1, -1)
        const msgctxt = (match[2] || '').slice(1, -1)
        if (this.entries[`${msgid}${msgctxt}`]) {
          continue
        }
        this.entries[`${msgid}${msgctxt}`] = `
${msgctxt ? `msgctxt ${JSON.stringify(msgctxt)}` : ''}
msgid ${JSON.stringify(msgid)}
msgstr ""
`.trim()
      }
    }
  }
  buildPotFile = () => {
    const toWriteData = `
#, fuzzy
msgid ""
msgstr ""
"Project-Id-Version: \\n"
"POT-Creation-Date: \\n"
"PO-Revision-Date: \\n"
"Last-Translator: Km.Van\\n"
"Language-Team: INN STUDIO\\n"
"MIME-Version: 1.0\\n"
"Content-Type: text/plain; charset=UTF-8\\n"
"Content-Transfer-Encoding: 8bit\\n"
"X-Generator: Poedit 3.0.1\\n"
"X-Poedit-Basepath: ../src\\n"
"Plural-Forms: nplurals=2; plural=(n != 1);\\n"
"X-Poedit-SourceCharset: UTF-8\\n"
"X-Poedit-KeywordsList: gettext\\n"

${Object.values(this.entries).join('\n\n')}
`.trim()
    writeFileSync(this.potPath, toWriteData, 'utf8')
  }
  fetchDirOrFile = (filePathOrDir) => {
    if (lstatSync(filePathOrDir).isDirectory()) {
      readdirSync(filePathOrDir).map((p) =>
        this.fetchDirOrFile(`${filePathOrDir}/${p}`),
      )
    } else {
      if (['.ts', '.tsx'].includes(extname(filePathOrDir))) {
        this.filePaths.push(filePathOrDir)
      }
    }
  }
}
