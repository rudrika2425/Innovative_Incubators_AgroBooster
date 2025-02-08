import React, { useState } from 'react';
import { useLanguage } from './LanguageContext';
import { ChevronDown } from 'lucide-react';

const LanguageDropdown = () => {
  const { language, toggleLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const handleLanguageChange = (newLang) => {
    if (language !== newLang) {
      toggleLanguage();
    }
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-32 px-4 py-2 text-sm bg-white border rounded-md shadow-sm hover:bg-gray-50"
      >
        <span>{language === 'en' ? 'English' : 'हिंदी'}</span>
        <ChevronDown className="w-4 h-4" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-32 bg-white border rounded-md shadow-lg">
          <button
            onClick={() => handleLanguageChange('en')}
            className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-100 ${
              language === 'en' ? 'bg-blue-50 text-blue-600' : ''
            }`}
          >
            English
          </button>
          <button
            onClick={() => handleLanguageChange('hi')}
            className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-100 ${
              language === 'hi' ? 'bg-blue-50 text-blue-600' : ''
            }`}
          >
            हिंदी
          </button>
        </div>
      )}
    </div>
  );
};

export default LanguageDropdown;