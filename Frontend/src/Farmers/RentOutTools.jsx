import React, { useState, useEffect } from "react";
import axios from "axios";
import { useUser } from "../Context/UserContext";
import { Tractor, Mic, MicOff } from "lucide-react";
import { TranslatedText } from '../languageTranslation/TranslatedText';
import toast from "react-hot-toast";
const toastConfig = {
  success: {
    duration: 3000,
    position: 'top-center',
    style: {
      background: '#F0FDF4',
      color: '#166534',
      padding: '16px',
      borderRadius: '8px',
      fontSize: '16px',
    },
  },
  error: {
    duration: 3000,
    position: 'top-center',
    style: {
      background: '#FEF2F2',
      color: '#991B1B',
      padding: '16px',
      borderRadius: '8px',
      fontSize: '16px',
    },
  },
};
function RentOutTools() {
  const { user } = useUser();
  const initialState = {
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
  };

  const [formData, setFormData] = useState(initialState);
  const [isListening, setIsListening] = useState(false);
  const [currentField, setCurrentField] = useState(null);

  const startVoiceInput = (fieldName) => {
    if (!('webkitSpeechRecognition' in window)) {
      toast.error(<TranslatedText text="Speech recognition is not supported in this browser." />, toastConfig.error);
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = 'en-US';
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
      setIsListening(true);
      setCurrentField(fieldName);
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
      setCurrentField(null);
    };

    recognition.onend = () => {
      setIsListening(false);
      setCurrentField(null);
    };

    recognition.start();
  };

  const VoiceInput = ({ fieldName }) => (
    <button
      type="button"
      onClick={() => startVoiceInput(fieldName)}
      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-emerald-600 hover:text-emerald-800 transition-colors"
    >
      {isListening && currentField === fieldName ? (
        <MicOff className="w-5 h-5" />
      ) : (
        <Mic className="w-5 h-5" />
      )}
    </button>
  );

  // Rest of the handlers remain the same
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const updatedImages = [...formData.images, ...selectedFiles].slice(0, 5);

    if (selectedFiles.length + formData.images.length > 5) {
     
      toast.error(<TranslatedText text="You can upload up to 5 images only." />, toastConfig.error);
    }

    setFormData(prev => ({
      ...prev,
      images: updatedImages
    }));
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
        `${import.meta.env.VITE_API_URL}tools/addtools`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 201) {
        
        toast.success(<TranslatedText text="Details submitted successfully!"/>, toastConfig.success);
        setFormData(initialState);
      }
    } catch (error) {
      console.error("Error submitting form data:", error);
      toast.success(<TranslatedText text="An error occurred while submitting your data."/>, toastConfig.success);
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-yellow-50 to-yellow-100">
      <nav className="sticky top-0 z-20 w-full bg-gradient-to-b from-yellow-50 to-yellow-100 backdrop-blur-sm shadow-md px-4 py-2">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-yellow-100 rounded-full shadow-lg">
            <Tractor className="w-8 h-8 text-yellow-600" />
          </div>
          <h1 className="text-3xl font-bold text-yellow-900">
            <TranslatedText text="Rent out your tools here.." />
          </h1>
        </div>
      </nav>

      <div className="relative z-10 flex justify-center items-center py-8 px-4">
        <div className="w-full max-w-4xl bg-white/80 backdrop-blur-sm shadow-2xl rounded-lg p-8 border border-emerald-200">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <label className="block text-emerald-800 font-semibold mb-2">
                <TranslatedText text="Title" />
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  placeholder="Enter a title for your listing"
                  className="w-full border border-emerald-300 rounded-lg p-3 pr-12 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition"
                  onChange={handleChange}
                  required
                />
                <VoiceInput fieldName="title" />
              </div>
            </div>

            {/* Category */}
            <div>
              <label className="block text-emerald-800 font-semibold mb-2">
                <TranslatedText text="Category" />
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

            {/* Brand and Model */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-emerald-800 font-semibold mb-2">
                  <TranslatedText text="Brand" />
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="brand"
                    value={formData.brand}
                    placeholder="Enter brand name"
                    className="w-full border border-emerald-300 rounded-lg p-3 pr-12 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition"
                    onChange={handleChange}
                    required
                  />
                  <VoiceInput fieldName="brand" />
                </div>
              </div>
              <div>
                <label className="block text-emerald-800 font-semibold mb-2">
                  <TranslatedText text="Model" />
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="model"
                    value={formData.model}
                    placeholder="Enter model name/number"
                    className="w-full border border-emerald-300 rounded-lg p-3 pr-12 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition"
                    onChange={handleChange}
                    required
                  />
                  <VoiceInput fieldName="model" />
                </div>
              </div>
            </div>

            {/* Condition */}
            <div>
              <label className="block text-emerald-800 font-semibold mb-2">
                <TranslatedText text="Condition" />
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="condition"
                  value={formData.condition}
                  placeholder="e.g., Like New, Serviced"
                  className="w-full border border-emerald-300 rounded-lg p-3 pr-12 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition"
                  onChange={handleChange}
                  required
                />
                <VoiceInput fieldName="condition" />
              </div>
            </div>

            {/* Specifications */}
            <div>
              <label className="block text-emerald-800 font-semibold mb-2">
                <TranslatedText text="Specifications" />
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
                <VoiceInput fieldName="specs" />
              </div>
            </div>

            {/* Rate and Availability */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-emerald-800 font-semibold mb-2">
                  <TranslatedText text="Rental Rate (per day)" />
                </label>
                <div className="relative">
                  <input
                    type="number"
                    name="rate"
                    value={formData.rate}
                    placeholder="Enter rental rate"
                    className="w-full border border-emerald-300 rounded-lg p-3 pr-12 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition"
                    onChange={handleChange}
                    required
                  />
                  <VoiceInput fieldName="rate" />
                </div>
              </div>
              <div>
                <label className="block text-emerald-800 font-semibold mb-2">
                  <TranslatedText text="Availability" />
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="availability"
                    value={formData.availability}
                    placeholder="e.g., All weekdays"
                    className="w-full border border-emerald-300 rounded-lg p-3 pr-12 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition"
                    onChange={handleChange}
                    required
                  />
                  <VoiceInput fieldName="availability" />
                </div>
              </div>
            </div>

            {/* Image Upload Section */}
            <div>
              <label className="block text-emerald-800 font-semibold mb-2">
                <TranslatedText text="Upload Images (Max 5)" />
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

            {/* Contact Information */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-emerald-800 font-semibold mb-2">
                  <TranslatedText text="Your Name" />
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="renterName"
                    value={formData.renterName}
                    placeholder="Enter your name"
                    className="w-full border border-emerald-300 rounded-lg p-3 pr-12 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition"
                    onChange={handleChange}
                    required
                  />
                  <VoiceInput fieldName="renterName" />
                </div>
              </div>
              <div>
                <label className="block text-emerald-800 font-semibold mb-2">
                  <TranslatedText text="Contact Information" />
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="contact"
                    value={formData.contact}
                    placeholder="Phone number or email"
                    className="w-full border border-emerald-300 rounded-lg p-3 pr-12 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition"
                    onChange={handleChange}
                    required
                  />
                  <VoiceInput fieldName="contact" />
                </div>
              </div>
              <div>
                <label className="block text-emerald-800 font-semibold mb-2">
                  <TranslatedText text="District" />
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="district"
                    value={formData.district}
                    placeholder="Enter district"
                    className="w-full border border-emerald-300 rounded-lg p-3 pr-12 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition"
                    onChange={handleChange}
                    required
                  />
                  <VoiceInput fieldName="district" />
                </div>
              </div>
              <div>
                <label className="block text-emerald-800 font-semibold mb-2">
                  <TranslatedText text="State" />
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    placeholder="Enter state"
                    className="w-full border border-emerald-300 rounded-lg p-3 pr-12 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition"
                    onChange={handleChange}
                    required
                  />
                  <VoiceInput fieldName="state" />
                </div>
              </div>
            </div>

            {/* Terms and Conditions */}
            <div>
              <label className="block text-emerald-800 font-semibold mb-2">
                <TranslatedText text="Terms and Conditions" />
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
                <VoiceInput fieldName="terms" />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-emerald-600 text-white font-medium px-8 py-4 rounded-full hover:bg-emerald-500 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <TranslatedText text="Submit Details" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RentOutTools;