import React, { useState } from "react";
import { Wheat, Sprout, Leaf, Sun, Cloud, Droplet, Tractor } from "lucide-react";
import axios from 'axios';

const Contact = ({ id }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    message: "",
  });
  const [statusMessage, setStatusMessage] = useState("");

  const FloatingElements = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute animate-float opacity-20"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animation: `float ${8 + Math.random() * 4}s infinite ${Math.random() * 2}s`,
            zIndex: 1
          }}
        >
          {i % 6 === 0 ? (
            <Leaf className="w-8 h-8 text-emerald-600" />
          ) : i % 6 === 1 ? (
            <Sprout className="w-9 h-9 text-lime-600" />
          ) : i % 6 === 2 ? (
            <Sun className="w-10 h-10 text-yellow-600" />
          ) : i % 6 === 3 ? (
            <Tractor className="w-11 h-11 text-green-600" />
          ) : i % 6 === 4 ? (
            <Droplet className="w-9 h-9 text-blue-600" />
          ) : (
            <Cloud className="w-10 h-10 text-gray-600" />
          )}
        </div>
      ))}
    </div>
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  // Prepare the form data to be sent to the backend
  const contactData = {
    fullName: formData.fullName,
    phoneNumber: formData.phoneNumber,
    message: formData.message,
  };

  try {
    // Send a POST request using Axios to the Flask backend
    const response = await axios.post("http://127.0.0.1:4000/contact/submit-contact-data", contactData);

    // If the response is successful, set the success message
    setStatusMessage(response.data.message);
    setFormData({ fullName: "", phoneNumber: "", message: "" });
  } catch (error) {
    // If an error occurs, handle it
    if (error.response) {
      // Backend returned an error response
      setStatusMessage(`Error: ${error.response.data.error}`);
    } else {
      // Network error or no response
      setStatusMessage("Something went wrong. Please try again later.");
    }
  }
};


  return (
    <div id={id} className="relative min-h-screen bg-gradient-to-b from-yellow-50 to-yellow-100 py-20">
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
      `}</style>

      <FloatingElements />

      <div className="relative z-10 container mx-auto px-4">
        <h3 className="text-5xl font-bold text-center text-emerald-600 mb-12">
          Contact Us
        </h3>

        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row">
            {/* Contact Info Side */}
            <div className="md:w-1/2 bg-gradient-to-br from-lime-200/80 to-lime-300/80 text-emerald-900 p-8 flex flex-col justify-between rounded-l-xl">
              <div>
                <h2 className="text-2xl font-bold mb-4 flex items-center">
                  <Wheat className="mr-3 w-8 h-8 text-amber-400" />
                  Agricultural Hub
                </h2>
                <p className="mb-6">
                  Connect with our community support team dedicated to empowering farmers worldwide.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center">
                  <Sprout className="mr-3 w-6 h-6 text-lime-400" />
                  <span>123 Farm Innovation Road</span>
                </div>
                <div className="flex items-center">
                  <Sun className="mr-3 w-6 h-6 text-yellow-400" />
                  <span>+1 (555) FARM-HELP</span>
                </div>
                <div className="flex items-center">
                  <Cloud className="mr-3 w-6 h-6 text-blue-400" />
                  <span>support@agricultureservice.org</span>
                </div>
              </div>
            </div>

            {/* Form Side */}
            <div className="md:w-1/2 bg-gradient-to-br from-lime-200/80 to-lime-200/80 flex items-center text-white p-8 flex flex-col justify-between rounded-r-xl">
              <h2 className="text-2xl font-bold text-emerald-900 mb-6">
                Send Us a Message
              </h2>
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="Full Name"
                    className="w-full px-4 py-2 border border-emerald-200 rounded-lg  text-emerald-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    required
                  />
                </div>
                <div>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    placeholder="Phone Number"
                    className="w-full px-4 py-2 border border-emerald-200 rounded-lg text-emerald-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    required
                  />
                </div>
                <div>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Your Message"
                    rows="4"
                    className="w-full px-4 py-2 border border-emerald-200 rounded-lg  text-emerald-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-emerald-600 text-white py-3 rounded-lg hover:bg-emerald-700 transition duration-300"
                >
                  Send Message
                </button>
              </form>

              {statusMessage && (
                <div className="mt-4 text-center text-emerald-800">
                  {statusMessage}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
