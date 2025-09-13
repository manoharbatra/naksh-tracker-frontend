import i18n from "i18next"
import { initReactI18next } from "react-i18next"
import LanguageDetector from "i18next-browser-languagedetector"

// Dynamically import all translation.json files
const modules = import.meta.glob("./locales/**/translation.json", {
    eager: true, // means they’re loaded immediately (not async)
})

const resources = {}
const languages = []

for (const path in modules) {
    const match = path.match(/\.\/locales\/(.+)\/translation\.json$/)

    if (match) {
        const lang = match[1] // e.g. "en", "fr", "es"
        resources[lang] = { translation: modules[path] }
        if (!languages.includes(lang)) {
            languages.push(lang)
        }
    }
}

i18n.use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng: {
            "fr-CA": ["fr", "en"], // if no fr-CA translation, fallback to fr, then en
            default: ["en"],
        },
        interpolation: { escapeValue: false },
        detection: {
            order: ["localStorage", "navigator"], // check localStorage first, then browser
            caches: ["localStorage"], // where to store user choice
            lookupLocalStorage: "appLang", // 👈 custom key name
        },
    })

export { languages }
export default i18n
