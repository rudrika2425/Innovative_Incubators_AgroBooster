import { useState, useEffect } from 'react';
import { useLanguage } from './LanguageContext';
import { translateText } from './TranslationService';

export const useTranslation = (text) => {
  const { language } = useLanguage();
  const [translatedText, setTranslatedText] = useState(text);

  useEffect(() => {
    if (language === 'hi') {
      translateText(text, 'hi').then(setTranslatedText);
    } else {
      setTranslatedText(text);
    }
  }, [text, language]);

  return translatedText;
};