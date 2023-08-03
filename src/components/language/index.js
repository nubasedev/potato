import langs from './data.json';
class Main {
    langId = '';
    setLangId = (langId) => {
        this.langId = langId;
    };
    gettext = (text, context = '') => {
        if (!this.langId) {
            return text;
        }
        const id = `${context || ''}${text}`;
        return (langs?.[id]?.[this.langId] ??
            text);
    };
}
export const MdeLanguage = new Main();
