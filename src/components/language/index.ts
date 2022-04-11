import { MdeLangProps } from './typings'
interface MdeLangsProps {
  [text: string]: string
}
class Main {
  private langs: MdeLangsProps = {}
  public setLang = (lang: MdeLangProps) => {
    this.langs = require(`./${lang}.json`)
  }
  public gettext = (text: string, context = ''): string => {
    const id = `${context || ''}${text}`
    return this.langs?.[id] ?? text
  }
}
export const MdeLanguage = new Main()
