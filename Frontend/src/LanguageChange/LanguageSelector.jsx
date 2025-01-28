// src/components/LanguageSelector.js
import React, { useState, useEffect } from "react";
import { translateText } from "../LanguageChange/translationService";


const LanguageSelector = ({ textToTranslate, onTranslation }) => {
  const [language, setLanguage] = useState("en");

  const handleLanguageChange = async (e) => {
    const selectedLanguage = e.target.value;
    setLanguage(selectedLanguage);

    // Translate the text and pass it to the parent component
    const translation = await translateText(textToTranslate, selectedLanguage);
    onTranslation(translation);
  };

  return (
    <div>
      <select
        value={language}
        onChange={handleLanguageChange}
        className="p-2 border rounded shadow-md"
      >
        <option value="en">English</option>
        <option value="es">Spanish</option>
        <option value="fr">French</option>
        <option value="hi">Hindi</option>
        <option value="zh">Chinese</option>
        {/* Add more languages as needed */}
      </select>
    </div>
  );
};

export default LanguageSelector;
