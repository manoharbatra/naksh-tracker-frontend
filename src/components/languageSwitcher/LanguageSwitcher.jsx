import React, {useState} from "react"
import { useTranslation } from "react-i18next"
import { languages } from "../../i18n";

function LanguageSwitcher() {
    const { i18n } = useTranslation()
    const [open, setOpen] = useState(false)

    return (
        <div>
            <div style={{ position: "relative", display: "inline-block" }}>
                <button
                    onClick={() => setOpen(!open)}
                    style={{ padding: "8px", fontSize: "16px" }}
                >
                    {i18n.language.toUpperCase()} ▼
                </button>

                {open && (
                    <ul
                        style={{
                            position: "absolute",
                            top: "100%",
                            left: 0,
                            backgroundColor: "white",
                            border: "1px solid #ccc",
                            listStyle: "none",
                            margin: 0,
                            padding: 0,

                            zIndex: 1000,
                            width: "100px",
                        }}
                    >
                        {languages.map((lang) => (
                            <li
                                key={lang}
                                style={{
                                    padding: "8px",
                                    cursor: "pointer",
                                    backgroundColor:
                                        i18n.language === lang
                                            ? "#eee"
                                            : "white",
                                }}
                                onClick={() => {
                                    i18n.changeLanguage(lang)
                                    setOpen(false)
                                }}
                            >
                                {lang.toUpperCase()}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    )
}

export default LanguageSwitcher
