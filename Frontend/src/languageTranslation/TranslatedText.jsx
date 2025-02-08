import React, { memo } from 'react';
import { useTranslation } from './useTranslation';

export const TranslatedText = memo(({ text }) => {
  const translatedText = useTranslation(text);
  return <>{translatedText}</>;
});