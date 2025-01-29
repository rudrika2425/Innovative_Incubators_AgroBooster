import React from "react";
import { useLanguage } from "../Context/LanguageContext";  
import { useTranslation } from "react-i18next";

const LanguageSelector = () => {
  const { language, setLanguage } = useLanguage();
  const { t } = useTranslation();  // useTranslation hook

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  return (
    <select onChange={handleLanguageChange} value={language}>
      <option value="en">{t('english')}</option>
      <option value="hi">{t('hindi')}</option>
    </select>
  );
};

export default LanguageSelector;
