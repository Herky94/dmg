import it from "@/locales/it.json";
import en from "@/locales/en.json";

export type Locale = "it" | "en";

const translations = {
  it,
  en,
} as const;

export function getTranslations(locale: Locale) {
  return translations[locale];
}

export type Translations = typeof it;
