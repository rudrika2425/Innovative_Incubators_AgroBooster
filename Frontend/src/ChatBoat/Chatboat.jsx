import React, { useState, useEffect, useRef } from "react";
import { Mic, Send, Languages, ChevronDown, Leaf } from "lucide-react";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [chatInput, setChatInput] = useState("");
  const [file, setFile] = useState(null);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const messagesEndRef = useRef(null);
  const dropdownRef = useRef(null);
  

  // Available languages
  const languages = [
    { code: 'en', name: 'English', voice: 'en-US' },
    { code: 'hi', name: 'हिंदी', voice: 'hi-IN' },
    
  ];

  // Translations object
  const translations = {
    en: {
      welcome: 'Welcome to Plant Assistant',
      askAnything: 'Ask me anything about plants and gardening!',
      typeMessage: 'Type your message...',
      upload: 'Upload'
    },
    hi: {
      welcome: 'पौधा सहायक में आपका स्वागत है',
      askAnything: 'पौधों और बागवानी के बारे में कुछ भी पूछें!',
      typeMessage: 'अपना संदेश लिखें...',
      upload: 'अपलोड'
    }
  };

  const t = (key) => translations[currentLanguage]?.[key] || translations.en[key];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsLanguageDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [messages]);

  const handleLanguageChange = (langCode) => {
    setCurrentLanguage(langCode);
  };

  const startListening = () => {
    if (!("SpeechRecognition" in window || "webkitSpeechRecognition" in window)) {
      alert("Speech recognition is not supported in your browser.");
      return;
    }

    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    const selectedLang = languages.find(lang => lang.code === currentLanguage);
    recognition.lang = selectedLang.voice;
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
      setMessages(prev => [...prev, { 
        type: "system", 
        text: currentLanguage === 'en' ? "Listening..." : "सुन रहा हूं..." 
      }]);
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setChatInput(transcript);
      handleChatSubmit(transcript);
    };

    recognition.onerror = () => {
      setMessages(prev => [...prev, { 
        type: "system", 
        text: currentLanguage === 'en' ? "Speech recognition failed" : "आवाज़ पहचान विफल" 
      }]);
    };

    recognition.start();
  };

  const speak = (text) => {
    window.speechSynthesis.cancel();
    const speech = new SpeechSynthesisUtterance(text);
    const selectedLang = languages.find(lang => lang.code === currentLanguage);
    speech.lang = selectedLang.voice;

    const voices = window.speechSynthesis.getVoices();
    const voice = voices.find(v => v.lang.startsWith(selectedLang.voice)) || voices[0];
    if (voice) speech.voice = voice;

    window.speechSynthesis.speak(speech);
  };

  const handleChatSubmit = async (voiceInput = null) => {
    const messageText = voiceInput || chatInput;
    if (!messageText) return;

    setMessages(prev => [...prev, { type: "user", text: messageText }]);

    try {
      const response = await fetch("http://127.0.0.1:5000/chat", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: messageText,
          language: currentLanguage
        })
      });

      const data = await response.json();
      setMessages(prev => [...prev, { type: "bot", text: data.response }]);
      speak(data.response);
    } catch (error) {
      console.error("Chatbot error:", error);
    }

    setChatInput("");
  };

  const handleFileUpload = async () => {
    if (!file) return;

    const uploadText = currentLanguage === 'en' ? "Uploading file..." : "फ़ाइल अपलोड हो रही है...";
    setMessages(prev => [...prev, { type: "user", text: uploadText }]);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("query", chatInput);
    formData.append("language", currentLanguage);

    try {
      const response = await fetch("http://127.0.0.1:5000/upload", {
        method: 'POST',
        body: formData
      });

      const data = await response.json();
      setMessages(prev => [...prev, {
        type: "bot",
        text: data.analysis || (currentLanguage === 'en' ? 
          "Analysis failed. Please try again." : 
          "विश्लेषण विफल हुआ। कृपया पुनः प्रयास करें।")
      }]);
      speak(data.analysis);
    } catch (error) {
      console.error("File upload error:", error);
      const errorMsg = currentLanguage === 'en' ? 
        "Error uploading file." : 
        "फ़ाइल अपलोड करने में त्रुटि।";
      setMessages(prev => [...prev, { type: "bot", text: errorMsg }]);
      speak(errorMsg);
    }
    setFile(null);
  };

  return (
    <div className="flex h-screen bg-green-100">
      {/* Sidebar */}
      <div className="w-64 bg-green-800 text-white p-4 flex flex-col shadow-lg rounded-r-lg">
        <div className="flex items-center space-x-2 mb-8">
          <Leaf className="w-8 h-8" />
          <h1 className="text-2xl font-bold">Plant Assistant</h1>
        </div>

        {/* Language Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
            className="w-full flex items-center justify-between px-4 py-2 bg-green-700 rounded-lg hover:bg-green-600 transition duration-200"
          >
            <div className="flex items-center">
              <Languages className="mr-2 w-5 h-5" />
              <span>{languages.find(l => l.code === currentLanguage)?.name}</span>
            </div>
            <ChevronDown className={`w-5 h-5 transition-transform ${isLanguageDropdownOpen ? 'rotate-180' : ''}`} />
          </button>

          {isLanguageDropdownOpen && (
            <div className="absolute w-full mt-2 bg-white rounded-lg shadow-lg overflow-hidden">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    handleLanguageChange(lang.code);
                    setIsLanguageDropdownOpen(false);
                  }}
                  className="w-full px-4 py-2 text-gray-800 hover:bg-gray-100 text-left"
                >
                  {lang.name}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Decorative plant image */}
        <div className="mt-auto">
          <img 
            src="https://img.freepik.com/free-photo/palm-tree-house-plant-pot_53876-125837.jpg?ga=GA1.1.1606226826.1737563268&semt=ais_hybrid" 
            alt="Decorative Plant" 
            className="rounded-lg opacity-50"
          />
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col bg-white rounded-l-lg shadow-lg">
        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4">
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-green-700 ">
    
              <h2 className="text-3xl font-bold mb-2">{t('welcome')}</h2>
              <p>{t('askAnything')}</p>
            </div>
          ) : (
            messages.map((msg, index) => (
              <div
                key={index}
                className={`flex mb-4 ${msg.type === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-3xl p-4 rounded-lg ${
                    msg.type === "user"
                      ? "bg-green-700 text-white"
                      : msg.type === "system"
                      ? "bg-gray-200 mx-auto text-center"
                      : "bg-white border border-green-500 shadow-md"
                  }`}
                >
                  <p>{msg.text}</p>
                </div>
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="border-t bg-white p-4 shadow-md">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder={t('typeMessage')}
                className="flex-1 p-3 border border-green-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-700"
                onKeyPress={(e) => e.key === 'Enter' && handleChatSubmit()}
              />
              <button
                onClick={() => handleChatSubmit()}
                className="p-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-200"
              >
                <Send className="w-5 h-5" />
              </button>
              <button
                onClick={startListening}
                className="p-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition duration-200"
              >
                <Mic className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-2 flex items-center space-x-2">
              <input
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
                className="text-sm text-gray-500  p-2 border border-gray-600 rounded-lg bg-gray-100"
                accept="image/*"
              />
              {file && (
                <button
                  onClick={handleFileUpload}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-200 text-sm"
                >
                  {t('upload')}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;