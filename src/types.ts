// eslint-disable-next-line no-shadow
export enum Language {
    ENGLISH = "EN",
    GERMAN = "DE",
    FRENCH = "FR",
    SPANISH = "ES",
    PORTUGUESE = "PT",
    ITALIAN = "IT",
    DUTCH = "NL",
    POLISH = "PL",
    RUSSIAN = "RU",
    CHINESE = "ZH",
    JAPANESE = "JA"
}

export interface TranslationResult {
    translatedText: string;
    sourceLanguage: string;
}
