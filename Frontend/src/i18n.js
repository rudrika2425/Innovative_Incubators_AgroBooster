import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import enTranslation from "./locales/en.json";
import hiTranslation from "./locales/hi.json";

// Translation resources
const resources = {
  en: { translation: enTranslation },
  hi: { translation: hiTranslation },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    lng: "en", // Default language
    fallbackLng: "en",
    interpolation: { escapeValue: false }, // React already escapes by default
  });

export default i18n;
