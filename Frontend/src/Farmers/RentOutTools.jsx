import React, { useState } from "react";
import axios from "axios";
import { useUser } from "../Context/UserContext";
import { Sprout, Leaf, Tractor, Cloud, Sun, Mic } from "lucide-react";

function RentOutTools() {
  const { user } = useUser();
  const [formData, setFormData] = useState({
    farmer_id: user.id,
    title: "",
    category: "",
    brand: "",
    model: "",
    condition: "",
    specs: "",
    rate: "",
    availability: "",
    deposit: "",
    address: "",
    deliveryRange: "",
    renterName: "",
    contact: "",
    district: "",
    state: "",
    terms: "",
    images: [],
  });
  const [isListening, setIsListening] = useState(false);
  const [currentField, setCurrentField] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleImageChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
  
    setFormData((prevData) => {
      const updatedImages = [...prevData.images, ...selectedFiles].slice(0, 5);
  
      if (updatedImages.length > 5) {
        alert("You can upload up to 5 images only.");
      }
  
      return { ...prevData, images: updatedImages };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();

      Object.keys(formData).forEach(key => {
        if (key !== 'images') {
          formDataToSend.append(key, formData[key]);
        }
      });

      formData.images.forEach((file) => {
        formDataToSend.append("images", file);
      });

      const response = await axios.post(
        "http://127.0.0.1:4000/tools/addtools",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 201) {
        alert("Details submitted successfully!");
        setFormData({
          farmer_id: user.id,
          title: "",
          category: "",
          brand: "",
          model: "",
          condition: "",
          specs: "",
          rate: "",
          availability: "",
          deposit: "",
          address: "",
          deliveryRange: "",
          renterName: "",
          contact: "",
          district: "",
          state: "",
          terms: "",
          images: [],
        });
      }
    } catch (error) {
      console.error("Error submitting form data:", error);
      alert("An error occurred while submitting your data.");
    }
  };

  const handleSpeechRecognition = (fieldName) => {
    setCurrentField(fieldName);
    setIsListening(true);

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setFormData(prev => ({
        ...prev,
        [fieldName]: transcript
      }));
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
      setCurrentField(null);
    };

    recognition.start();
  };

  const InputWithSpeech = ({ label, name, type = "text", placeholder, required = false, value }) => (
    <div className="relative">
      <label className="block text-emerald-800 font-semibold mb-2">
        {label}
      </label>
      <div className="relative flex items-center">
        <input
          type={type}
          name={name}
          value={value}
          placeholder={placeholder}
          className="w-full border border-emerald-300 rounded-lg p-3 pr-12 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition"
          onChange={handleChange}
          required={required}
        />
        <button
          type="button"
          onClick={() => handleSpeechRecognition(name)}
          className={`absolute right-2 p-2 rounded-full hover:bg-emerald-100 transition-colors ${
            isListening && currentField === name ? 'text-red-500 animate-pulse' : 'text-emerald-600'
          }`}
        >
          <Mic className="w-5 h-5" />
        </button>
      </div>
    </div>
  );

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-yellow-50 to-yellow-100">
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-30px) rotate(5deg); }
        }
      `}</style>

      <nav className="sticky top-0 z-20 w-full bg-gradient-to-b from-yellow-50 to-yellow-100 backdrop-blur-sm shadow-md px-4 py-2">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-yellow-100 rounded-full shadow-lg">
            <Tractor className="w-8 h-8 text-yellow-600" />
          </div>
          <h1 className="text-3xl font-bold text-yellow-900">Rent out your tools here..</h1>
        </div>
      </nav>

      <div className="relative z-10 flex justify-center items-center py-8 px-4">
        <div className="w-full max-w-4xl bg-white/80 backdrop-blur-sm shadow-2xl rounded-lg p-8 border border-emerald-200">
          <form onSubmit={handleSubmit} className="space-y-6">
            <InputWithSpeech
              label="Title"
              name="title"
              placeholder="Enter a title for your listing"
              required
              value={formData.title}
            />

            <div>
              <label className="block text-emerald-800 font-semibold mb-2">
                Category
              </label>
              <select
                name="category"
                value={formData.category}
                className="w-full border border-emerald-300 rounded-lg p-3 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition"
                onChange={handleChange}
                required
              >
                <option value="">Select a category</option>
                <option value="tractor">Tractor</option>
                <option value="harvester">Harvester</option>
                <option value="irrigation">Irrigation System</option>
                <option value="plow">Plow</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <InputWithSpeech
                label="Brand"
                name="brand"
                placeholder="Enter brand name"
                required
                value={formData.brand}
              />
              <InputWithSpeech
                label="Model"
                name="model"
                placeholder="Enter model name/number"
                required
                value={formData.model}
              />
            </div>

            <InputWithSpeech
              label="Condition"
              name="condition"
              placeholder="e.g., Like New, Serviced"
              required
              value={formData.condition}
            />

            <div>
              <label className="block text-emerald-800 font-semibold mb-2">
                Specifications
              </label>
              <div className="relative">
                <textarea
                  name="specs"
                  value={formData.specs}
                  placeholder="Provide technical specifications or additional details"
                  className="w-full border border-emerald-300 rounded-lg p-3 pr-12 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition"
                  rows="3"
                  onChange={handleChange}
                />
                <button
                  type="button"
                  onClick={() => handleSpeechRecognition('specs')}
                  className={`absolute right-2 top-2 p-2 rounded-full hover:bg-emerald-100 transition-colors ${
                    isListening && currentField === 'specs' ? 'text-red-500 animate-pulse' : 'text-emerald-600'
                  }`}
                >
                  <Mic className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <InputWithSpeech
                label="Rental Rate (per day)"
                name="rate"
                type="number"
                placeholder="Enter rental rate"
                required
                value={formData.rate}
              />
              <InputWithSpeech
                label="Availability"
                name="availability"
                placeholder="e.g., All weekdays"
                required
                value={formData.availability}
              />
            </div>

            <div>
              <label className="block text-emerald-800 font-semibold mb-2">
                Upload Images (Max 5)
              </label>
              <input
                type="file"
                name="images"
                accept="image/*"
                multiple
                className="w-full border border-emerald-300 rounded-lg p-3 hover:bg-emerald-50 transition"
                onChange={handleImageChange}
              />
              {formData.images.length > 0 && (
                <div className="mt-3">
                  <h3 className="text-sm text-emerald-700 mb-2">Selected Images:</h3>
                  <div className="flex flex-wrap gap-4">
                    {formData.images.map((file, index) => (
                      <div
                        key={index}
                        className="relative w-20 h-20 rounded-lg overflow-hidden border border-emerald-300 shadow-md"
                      >
                        <img
                          src={URL.createObjectURL(file)}
                          alt={`Selected ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setFormData((prevData) => ({
                              ...prevData,
                              images: prevData.images.filter((_, i) => i !== index),
                            }));
                          }}
                          className="absolute top-0 right-0 bg-red-500 text-white text-xs p-1 rounded-sm hover:bg-red-700"
                        >
                          X
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <InputWithSpeech
                label="Your Name"
                name="renterName"
                placeholder="Enter your name"
                required
                value={formData.renterName}
              />
              <InputWithSpeech
                label="Contact Information"
                name="contact"
                placeholder="Phone number or email"
                required
                value={formData.contact}
              />
              <InputWithSpeech
                label="District"
                name="district"
                placeholder="District"
                required
                value={formData.district}
              />
              <InputWithSpeech
                label="State"
                name="state"
                placeholder="State"
                required
                value={formData.state}
              />
            </div>

            <div>
              <label className="block text-emerald-800 font-semibold mb-2">
                Terms and Conditions
              </label>
              <div className="relative">
                <textarea
                  name="terms"
                  value={formData.terms}
                  placeholder="Provide any usage or rental terms"
                  className="w-full border border-emerald-300 rounded-lg p-3 pr-12 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition"
                  rows="3"
                  onChange={handleChange}
                />
                <button
                  type="button"
                  onClick={() => handleSpeechRecognition('terms')}
                  className={`absolute right-2 top-2 p-2 rounded-full hover:bg-emerald-100 transition-colors ${
                    isListening && currentField === 'terms' ? 'text-red-500 animate-pulse' : 'text-emerald-600'
                  }`}
                >
                  <Mic className="w-5 h-5 " />
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-emerald-600 text-white font-medium px-8 py-4 rounded-full hover:bg-emerald-500 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Submit Details
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RentOutTools;