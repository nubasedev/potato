declare class Main {
    private langId;
    setLangId: (langId: string) => void;
    gettext: (text: string, context?: string) => string;
}
export declare const MdeLanguage: Main;
export {};
