import React from "react";
import { useTranslation } from "react-i18next";

const languages = [
  { code: "en", name: "English" },
  { code: "fr", name: "Français" },
  { code: "te", name: "తెలుగు" },
  { code: "hi", name: "हिंदी" },
];

const LanguageSelector = () => {
  const { i18n } = useTranslation();

  const handleLanguageChange = (event) => {
    const selectedLanguage = event.target.value;
    i18n.changeLanguage(selectedLanguage);
  };

  return (
    <div className="dropdown-container">
      <select
        value={i18n.language}
        onChange={handleLanguageChange}
        className="language-dropdown"
      >
        {languages.map((lng) => (
          <option key={lng.code} value={lng.code}>
            {lng.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguageSelector;
