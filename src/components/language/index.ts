import langs from './data.json'
class Main {
  private langId = ''
  public setLangId = (langId:string) => {
    this.langId = langId
  }
  public gettext = (text: string, context = ''): string => {
    if(!this.langId){
      return text
    }
    const id = `${context || ''}${text}`
    return langs?.[id]?.[this.langId] ?? text
  }
}
export const MdeLanguage = new Main()
