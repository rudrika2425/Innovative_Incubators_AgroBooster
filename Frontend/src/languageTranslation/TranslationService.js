const API_KEY = 'AIzaSyCXnavNRrmi36bNtHVMrmkonoZRQhoXy7A';
const VITE_API_URL = 'https://translation.googleapis.com/language/translate/v2';

export const translateText = async (text, targetLanguage) => {
  try {
    const response = await fetch(`${VITE_API_URL}?key=${API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        q: text,
        target: targetLanguage,
        source: targetLanguage === 'en' ? 'hi' : 'en',
      }),
    });

    const data = await response.json();
    return data.data.translations[0].translatedText;
  } catch (error) {
    console.error('Translation error:', error);
    return text;
  }
};