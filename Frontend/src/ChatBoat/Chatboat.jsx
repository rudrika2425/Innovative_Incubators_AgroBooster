import React, { useState } from "react";
import axios from "axios";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [chatInput, setChatInput] = useState("");
  const [file, setFile] = useState(null);
  const [language, setLanguage] = useState("en");
  const [isOpen, setIsOpen] = useState(false); 

  const handleChatSubmit = async () => {
    if (!chatInput) {
      alert("Please enter a message.");
      return;
    }

    const newMessage = { type: "user", text: chatInput };
    setMessages((prevMessages) => [...prevMessages, newMessage]);

    try {
      const response = await axios.post("http://127.0.0.1:5000/chat", {
        message: chatInput,
        language,
      });

      const botMessage = { type: "bot", text: response.data.response };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Failed to send message. Please try again.");
    }

    setChatInput("");
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleFileUpload = async () => {
    if (!file) {
      alert("Please select a file to upload.");
      return;
    }

    const newMessage = { type: "user", text: "Uploaded an image for analysis." };
    setMessages((prevMessages) => [...prevMessages, newMessage]);

    const formData = new FormData();
    formData.append("file", file);  // Ensure key is 'file' as expected by Flask

    try {
      const response = await axios.post("http://127.0.0.1:5000/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",  // Important to set the correct content type
        },
      });

      if (response.status === 200) {
        const botMessage = {
          type: "bot",
          text: `Disease: ${response.data.result.disease}\nConfidence: ${response.data.result.confidence}%\nSolution: ${response.data.result.solution}`,
        };
        setMessages((prevMessages) => [...prevMessages, botMessage]);
      } else {
        alert("Failed to upload file. Please try again.");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Failed to upload file. Please try again.");
    }

    setFile(null);
  };

  return (
    <div>
      {/* Floating Chatbot Button */}
      <div
        className="fixed bottom-5 right-5 bg-blue-500 text-white p-6 rounded-full cursor-pointer shadow-lg z-50"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <span className="text-xl">-</span>
        ) : (
          <span className="text-xl">💬</span>
        )}
      </div>

      {/* Chatbot Window */}
      {isOpen && (
        <div className="fixed bottom-16 right-5 w-full max-w-md bg-white rounded-lg shadow-lg z-40">
          <div className="bg-blue-500 text-white p-4 rounded-t-lg">
            <h1 className="text-xl font-bold text-center">Plant Disease Chatbot</h1>
            <p className="text-sm text-center mt-2">Ask questions or upload a plant image for analysis!</p>
          </div>

          <div className="flex flex-col p-4 space-y-4">
            {/* Messages Section */}
            <div className="h-64 overflow-y-auto p-4 bg-gray-50 rounded-lg border border-gray-200">
              {messages.length === 0 ? (
                <p className="text-gray-500 text-center">No messages yet.</p>
              ) : (
                messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`mb-2 p-2 rounded-lg ${
                      msg.type === "user"
                        ? "bg-blue-100 text-blue-800 self-end"
                        : "bg-green-100 text-green-800 self-start"
                    }`}
                  >
                    <p className="text-sm">{msg.text}</p>
                  </div>
                ))
              )}
            </div>

            {/* Chat Input */}
            <div className="flex space-x-2">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 p-2 border border-gray-300 rounded-lg"
              />
              <button
                onClick={handleChatSubmit}
                className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-600"
              >
                Send
              </button>
            </div>

            {/* File Upload Section */}
            <div className="flex flex-col space-y-2">
              <input type="file" onChange={handleFileChange} className="text-sm" />
              <button
                onClick={handleFileUpload}
                className="bg-green-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-green-600"
              >
                Upload Image
              </button>
            </div>

            {/* Language Selector */}
            <div className="mt-4">
              <label className="block text-sm font-semibold mb-2">Language:</label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg"
              >
                <option value="en">English</option>
                <option value="hi">Hindi</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
