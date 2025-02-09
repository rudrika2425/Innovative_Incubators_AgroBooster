// import React, { useState, useEffect, useRef } from "react";
// import axios from "axios";
// import { useTranslation } from "react-i18next";
// import { FaMicrophone, FaPaperPlane, FaCommentDots, FaTimes, FaLanguage } from "react-icons/fa";

// const Chatbot = () => {
//   const { t, i18n } = useTranslation();
//   const [messages, setMessages] = useState([]);
//   const [chatInput, setChatInput] = useState("");
//   const [file, setFile] = useState(null);
//   const [isOpen, setIsOpen] = useState(false);
//   const [currentLanguage, setCurrentLanguage] = useState('en');
//   const messagesEndRef = useRef(null);

//   // Available languages
//   const languages = [
//     { code: 'en', name: 'English', voice: 'en-US' },
//     { code: 'hi', name: 'हिंदी', voice: 'hi-IN' },
//     { code: 'pa', name: 'ਪੰਜਾਬੀ', voice: 'pa-IN' },
//     { code: 'gu', name: 'ગુજરાતી', voice: 'gu-IN' },
//     { code: 'bn', name: 'বাংলা', voice: 'bn-IN' }
//   ];

//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   const handleLanguageChange = (langCode) => {
//     setCurrentLanguage(langCode);
//     i18n.changeLanguage(langCode);
//   };

//   const startListening = () => {
//     if (!("SpeechRecognition" in window || "webkitSpeechRecognition" in window)) {
//       alert("Speech recognition is not supported in your browser.");
//       return;
//     }

//     const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
//     const selectedLang = languages.find(lang => lang.code === currentLanguage);
//     recognition.lang = selectedLang.voice;
//     recognition.continuous = false;
//     recognition.interimResults = false;

//     recognition.onstart = () => {
//       // Visual feedback for recording start
//       setMessages(prev => [...prev, { 
//         type: "system", 
//         text: currentLanguage === 'en' ? "Listening..." : "सुन रहा हूं..." 
//       }]);
//     };

//     recognition.onresult = (event) => {
//       const transcript = event.results[0][0].transcript;
//       setChatInput(transcript);
//       handleChatSubmit(transcript);
//     };

//     recognition.onerror = () => {
//       setMessages(prev => [...prev, { 
//         type: "system", 
//         text: currentLanguage === 'en' ? "Speech recognition failed" : "आवाज़ पहचान विफल" 
//       }]);
//     };

//     recognition.start();
//   };

//   const speak = (text) => {
//     window.speechSynthesis.cancel(); // Stop any ongoing speech
//     const speech = new SpeechSynthesisUtterance(text);
//     const selectedLang = languages.find(lang => lang.code === currentLanguage);
//     speech.lang = selectedLang.voice;

//     // Get available voices
//     const voices = window.speechSynthesis.getVoices();
//     const voice = voices.find(v => v.lang.startsWith(selectedLang.voice)) || voices[0];
//     if (voice) speech.voice = voice;

//     window.speechSynthesis.speak(speech);
//   };

//   const handleChatSubmit = async (voiceInput = null) => {
//     const messageText = voiceInput || chatInput;
//     if (!messageText) return;

//     setMessages(prev => [...prev, { type: "user", text: messageText }]);

//     try {
//       const { data } = await axios.post("http://127.0.0.1:5000/chat", {
//         message: messageText,
//         language: currentLanguage
//       });

//       setMessages(prev => [...prev, { type: "bot", text: data.response }]);
//       speak(data.response);
//     } catch (error) {
//       console.error("Chatbot error:", error);
//     }

//     setChatInput("");
//   };

//   const handleFileUpload = async () => {
//     if (!file) return;

//     const uploadText = currentLanguage === 'en' ? "Uploading file..." : "फ़ाइल अपलोड हो रही है...";
//     setMessages(prev => [...prev, { type: "user", text: uploadText }]);

//     const formData = new FormData();
//     formData.append("file", file);
//     formData.append("query", chatInput);
//     formData.append("language", currentLanguage);

//     try {
//       const { data } = await axios.post("http://127.0.0.1:5000/upload", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       setMessages(prev => [...prev, {
//         type: "bot",
//         text: data.analysis || (currentLanguage === 'en' ? 
//           "Analysis failed. Please try again." : 
//           "विश्लेषण विफल हुआ। कृपया पुनः प्रयास करें।")
//       }]);
//       speak(data.analysis);
//     } catch (error) {
//       console.error("File upload error:", error);
//       const errorMsg = currentLanguage === 'en' ? 
//         "Error uploading file." : 
//         "फ़ाइल अपलोड करने में त्रुटि।";
//       setMessages(prev => [...prev, { type: "bot", text: errorMsg }]);
//       speak(errorMsg);
//     }
//     setFile(null);
//   };

//   return (
//     <div>
//       <button
//         className="fixed bottom-5 right-5 bg-blue-500 text-white p-4 rounded-full shadow-lg"
//         onClick={() => setIsOpen(!isOpen)}
//       >
//         {isOpen ? <FaTimes size={20} /> : <FaCommentDots size={24} />}
//       </button>

//       {isOpen && (
//         <div className="fixed bottom-16 right-5 w-96 bg-white rounded-lg shadow-lg flex flex-col">
//           <div className="bg-blue-500 text-white p-4 flex justify-between items-center">
//             <h1 className="text-lg font-bold">
//               {currentLanguage === 'en' ? 'Farming Assistant' : 'कृषि सहायक'}
//             </h1>
//             <FaTimes className="cursor-pointer" onClick={() => setIsOpen(false)} />
//           </div>

//           {/* Language Selector */}
//           <div className="bg-gray-100 p-2 flex flex-wrap gap-2 justify-center">
//             {languages.map((lang) => (
//               <button
//                 key={lang.code}
//                 onClick={() => handleLanguageChange(lang.code)}
//                 className={`px-3 py-1 rounded ${
//                   currentLanguage === lang.code
//                     ? 'bg-blue-500 text-white'
//                     : 'bg-white text-gray-700 border'
//                 }`}
//               >
//                 {lang.name}
//               </button>
//             ))}
//           </div>

//           <div className="h-72 overflow-y-auto p-4 bg-gray-50">
//             {messages.map((msg, index) => (
//               <div
//                 key={index}
//                 className={`p-2 rounded-lg max-w-xs mb-2 ${
//                   msg.type === "user" 
//                     ? "bg-blue-100 ml-auto" 
//                     : msg.type === "system"
//                     ? "bg-gray-100 mx-auto text-center text-sm text-gray-500"
//                     : "bg-gray-200"
//                 }`}
//               >
//                 <p className="text-sm">{msg.text}</p>
//               </div>
//             ))}
//             <div ref={messagesEndRef} />
//           </div>

//           <div className="flex p-2 border-t">
//             <input
//               type="text"
//               value={chatInput}
//               onChange={(e) => setChatInput(e.target.value)}
//               placeholder={currentLanguage === 'en' ? 'Type your message...' : 'अपना संदेश लिखें...'}
//               className="flex-1 p-2 border rounded-lg"
//             />
//             <button
//               onClick={() => handleChatSubmit()}
//               className="ml-2 bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
//             >
//               <FaPaperPlane />
//             </button>
//             <button
//               onClick={startListening}
//               className="ml-2 bg-purple-500 text-white p-2 rounded-lg hover:bg-purple-600"
//             >
//               <FaMicrophone />
//             </button>
//           </div>

//           <div className="p-2 border-t">
//             <input 
//               type="file" 
//               onChange={(e) => setFile(e.target.files[0])} 
//               className="text-sm" 
//               accept="image/*"
//             />
//             <button
//               onClick={handleFileUpload}
//               className="bg-emerald-500 text-white p-2 rounded-lg w-full mt-2 hover:bg-emerald-600"
//             >
//               {currentLanguage === 'en' ? 'Upload Image' : 'छवि अपलोड करें'}
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Chatbot;