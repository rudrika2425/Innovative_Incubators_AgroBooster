import React, { useState, useEffect, useRef } from "react";
import { Mic, Send, Languages, ChevronDown, Leaf, Sprout } from "lucide-react";

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
  
    const voices = window.speechSynthesis.getVoices();
    const selectedLang = languages.find(lang => lang.code === currentLanguage);
    
    const voice = voices.find(v => {
      if (currentLanguage === 'en') {
        return v.lang.startsWith('en-US') || v.lang.startsWith('en-IN');
      }
      if (currentLanguage === 'hi') {
        return v.lang.startsWith('hi-IN') || 
               v.lang.includes('Hindi') || 
               v.name.includes('Hindi');
      }
      return false;
    }) || voices[0];
  
    const speakChunks = (chunks) => {
      if (chunks.length === 0) return;
  
      const speech = new SpeechSynthesisUtterance(chunks[0]);
      speech.lang = selectedLang.voice;
      
      if (voice) {
        speech.voice = voice;
      }
  
      speech.rate = currentLanguage === 'hi' ? 0.8 : 0.9;
      speech.pitch = currentLanguage === 'hi' ? 0.9 : 1.0;
  
      speech.onend = () => {
        speakChunks(chunks.slice(1));
      };
  
      window.speechSynthesis.speak(speech);
    };
  
    const chunks = currentLanguage === 'hi' 
      ? text.match(/.{1,100}(?:\s|$)/g) || [text]
      : [text];
  
    speakChunks(chunks);
  };
  
  const processMultilineResponse = (response) => {
    const lines = response.split('\n')
      .filter(line => line.trim() !== '')
      .map(line => line.trim());
  
    return lines;
  };
  
  const handleChatSubmit = async (voiceInput = null) => {
    const messageText = voiceInput || chatInput;
    if (!messageText) return;
  
    setMessages(prev => [...prev, { type: "user", text: messageText }]);
  
    try {
      const response = await fetch(`${import.meta.env.VITE_CHAT_URL}chat`, {
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
      
      const processedResponse = processMultilineResponse(data.response);
      
      processedResponse.forEach(line => {
        setMessages(prev => [...prev, { type: "bot", text: line }]);
      });
  
      speak(processedResponse.join(' '));
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
      const response = await fetch(`${import.meta.env.VITE_CHAT_URL}upload`, {
        method: 'POST',
        body: formData
      });
  
      const data = await response.json();
      
      if (data.analysis) {
        const processedAnalysis = processMultilineResponse(data.analysis);
        
        processedAnalysis.forEach(line => {
          setMessages(prev => [...prev, {
            type: "bot",
            text: line
          }]);
        });
  
        speak(processedAnalysis.join(' '));
      } else {
        const errorMsg = currentLanguage === 'en' ? 
          "Analysis failed. Please try again." : 
          "विश्लेषण विफल हुआ। कृपया पुनः प्रयास करें।";
        setMessages(prev => [...prev, { type: "bot", text: errorMsg }]);
        speak(errorMsg);
      }
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
    <div className="min-h-screen bg-gradient-to-b from-yellow-100 to-yellow-200">
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-30px) rotate(5deg); }
        }
        .animate-bounce-slow {
          animation: bounce 3s infinite;
        }
      `}</style>
      
      <div className="flex max-sm:flex-col max-sm:gap-4  h-screen p-4">
        {/* Sidebar */}
        <div className="sm:w-72 max-sm:mx-auto w-11/12 bg-yellow-50 backdrop-blur-sm rounded-2xl shadow-lg border border-emerald-500 p-6 sm:mr-4">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 bg-emerald-100 rounded-full shadow-md">
              <Leaf className="w-8 h-8 text-emerald-600" />
            </div>
            <h1 className="text-2xl font-bold text-yellow-900">Plant Assistant</h1>
          </div>

          {/* Language Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
              className="w-full flex items-center justify-between px-4 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-xl hover:from-emerald-600 hover:to-emerald-700 transition-all duration-300 shadow-md"
            >
              <div className="flex items-center gap-2">
                <Languages className="w-5 h-5" />
                <span className="font-medium">{languages.find(l => l.code === currentLanguage)?.name}</span>
              </div>
              <ChevronDown className={`w-5 h-5 transition-transform ${isLanguageDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {isLanguageDropdownOpen && (
              <div className="absolute w-full mt-2 bg-white rounded-xl shadow-lg overflow-hidden border border-emerald-100">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      handleLanguageChange(lang.code);
                      setIsLanguageDropdownOpen(false);
                    }}
                    className="w-full px-4 py-3 text-emerald-900 hover:bg-emerald-50 text-left font-medium transition-colors"
                  >
                    {lang.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Main Chat Area */}
        <div className="flex-1 backdrop-blur-sm rounded-2xl bg-yellow-50  shadow-lg border border-emerald-500 flex flex-col">
          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-6">
            {messages.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                <div className="p-4 bg-emerald-100 rounded-full shadow-lg animate-bounce-slow">
                  <Sprout className="w-12 h-12 text-emerald-600" />
                </div>
                <h2 className="text-3xl font-bold text-yellow-900">{t('welcome')}</h2>
                <p className="text-xl text-emerald-800">{t('askAnything')}</p>
              </div>
            ) : (
              messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex mb-4 ${msg.type === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-3xl p-4 rounded-xl shadow-md ${
                      msg.type === "user"
                        ? "bg-gradient-to-r from-emerald-500 to-emerald-600 text-white"
                        : msg.type === "system"
                        ? "bg-amber-50 border border-amber-200 mx-auto text-center text-amber-800"
                        : "bg-white border border-emerald-200 text-emerald-900"
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
          <div className="border-t border-emerald-100 bg-emerald-50 p-6 rounded-b-2xl">
            <div className="max-w-4xl mx-auto space-y-4">
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder={t('typeMessage')}
                  className="flex-1 px-4 py-3 border border-emerald-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white/90"
                  onKeyPress={(e) => e.key === 'Enter' && handleChatSubmit()}
                />
                <button
                  onClick={() => handleChatSubmit()}
                  className="p-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-500 transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  <Send className="w-6 h-6" />
                </button>
                <button
                  onClick={startListening}
                  className="p-3 bg-amber-600 text-white rounded-xl hover:bg-amber-500 transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  <Mic className="w-6 h-6" />
                </button>
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  className="flex-1 text-sm text-emerald-900 p-3 border border-emerald-500 rounded-xl bg-white/90"
                  accept="image/*"
                />
                {file && (
                  <button
                    onClick={handleFileUpload}
                    className="px-6 py-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-500 transition-all duration-300 shadow-md hover:shadow-lg font-medium"
                  >
                    {t('upload')}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;