import langs from './data.json'
class Main {
  private langId = ''
  public setLangId = (langId: string): void => {
    this.langId = langId
  }
  public gettext = (text: string, context = ''): string => {
    if (!this.langId) {
      return text
    }
    const id = `${context || ''}${text}`
    return (
      (langs as Record<string, Record<string, string>>)?.[id]?.[this.langId] ??
      text
    )
  }
}
export const MdeLanguage = new Main()
