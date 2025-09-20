import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// Import translation JSONs
import en from "./locales/en/translation.json";
import fr from "./locales/fr/translation.json";
import te from "./locales/te/translation.json";
import hi from "./locales/hi/translation.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false, // React already handles escaping
    },
    resources: {
      en: { translation: en },
      fr: { translation: fr },
      te: { translation: te },
      hi: { translation: hi },
    },
  });

export default i18n;
