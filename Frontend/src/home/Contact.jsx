import React, { useState } from "react";
import { 
  Wheat, Sprout, Leaf, Sun, Cloud, Droplet, Tractor, 
  Clock, Phone, Mail, MapPin, MessageSquare,
  CheckCircle, AlertCircle
} from "lucide-react";
import axios from 'axios';

const Contact = ({ id }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    message: ""
  });
  const [statusMessage, setStatusMessage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await axios.post("http://127.0.0.1:4000/contact/submit-contact-data", formData);
      
      setStatusMessage({
        type: "success",
        message: response.data.message || "Thank you for your message! We'll get back to you soon."
      });
      
      // Reset form
      setFormData({
        fullName: "",
        phoneNumber: "",
        message: ""
      });
    } catch (error) {
      setStatusMessage({
        type: "error",
        message: error.response?.data?.error || "Something went wrong. Please try again later."
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const FloatingElements = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute animate-float opacity-20"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDuration: `${8 + Math.random() * 4}s`,
            animationDelay: `${Math.random() * 2}s`,
            zIndex: 1
          }}
        >
          {[
            <Leaf className="w-8 h-8 text-emerald-800" />,
            <Sprout className="w-9 h-9 text-yellow-600" />,
            <Sun className="w-10 h-10 text-yellow-500" />,
            <Tractor className="w-11 h-11 text-emerald-800" />,
            <Droplet className="w-9 h-9 text-yellow-600" />,
            <Cloud className="w-10 h-10 text-yellow-400" />
          ][i % 6]}
        </div>
      ))}
    </div>
  );

  const supportCategories = [
    {
      icon: <MessageSquare className="w-8 h-8" />,
      title: "Technical Support",
      description: "Get help with our agricultural software and IoT devices"
    }
  ];

  const renderFormInput = (name, type = "text", placeholder, required = true) => (
    <input
      type={type}
      name={name}
      id={name}
      value={formData[name]}
      onChange={handleInputChange}
      placeholder={placeholder}
      className="px-4 py-2 border border-yellow-200 rounded-lg text-emerald-800 focus:outline-none focus:ring-2 focus:ring-emerald-800"
      required={required}
      aria-label={placeholder}
    />
  );

  return (

   
    <div id={id} className="relative min-h-screen bg-gradient-to-b from-yellow-100 to-yellow-200 py-20">

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
      `}</style>

      <FloatingElements />

      <div className="relative z-10 container mx-auto px-4 flex flex-col justify-center">
        <header className="text-center mb-16">
          <h1 className="text-5xl font-bold text-emerald-800 mb-4">
            Get in Touch
          </h1>
          <p className="text-lg text-emerald-800 max-w-2xl mx-auto">
            Whether you're looking for technical support or have questions about our services,
            our team is here to help you succeed in your farming journey.
          </p>
        </header>

        <section className="grid md:grid-cols-1 gap-8 mb-16 max-w-xl ml-110" aria-label="Support Categories">
          {supportCategories.map((category, index) => (
            <div key={index} className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-emerald-800/10">
              <div className="text-emerald-800 mb-4" aria-hidden="true">
                {category.icon}
              </div>
              <h2 className="text-xl font-semibold text-emerald-800 mb-2">
                {category.title}
              </h2>
              <p className="text-yellow-700">
                {category.description}
              </p>
            </div>
          ))}
        </section>

        <section className="bg-white/90 backdrop-blur-sm rounded-xl shadow-xl overflow-hidden max-w-4xl mx-auto border border-emerald-800/10">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-2/5 bg-gradient-to-br from-emerald-800 to-emerald-900 text-white p-8">
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4 flex items-center">
                  <Wheat className="mr-3 w-8 h-8" aria-hidden="true" />
                  Agrobooster
                </h2>
                <p className="opacity-90">
                  Join our community of innovative farmers and agricultural experts.
                  We're here to support your success every step of the way.
                </p>
              </div>

              <div className="space-y-6">
                {[
                  { icon: <MapPin />, title: "Main Office", content: "123 Farm Innovation Road" },
                  { icon: <Phone />, title: "Phone", content: "+1 (555) FARM-HELP" },
                  { icon: <Clock />, title: "Hours", content: "24/7 Support Available" }
                ].map((item, index) => (
                  <div key={index} className="flex items-center">
                    <span className="mr-3 w-6 h-6" aria-hidden="true">{item.icon}</span>
                    <div>
                      <h3 className="font-semibold">{item.title}</h3>
                      <p className="opacity-90">{item.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="md:w-3/5 p-8">
              <h2 className="text-2xl font-bold text-emerald-800 mb-6">
                Send Us a Message
              </h2>
              <form className="space-y-4" onSubmit={handleSubmit} noValidate>
                <div className="grid md:grid-cols-2 gap-4">
                  {renderFormInput("fullName", "text", "Full Name")}
                  {renderFormInput("phoneNumber", "tel", "Phone Number")}
                </div>
                <textarea
                  name="message"
                  id="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Your Message"
                  rows="4"
                  className="w-full px-4 py-2 border border-yellow-200 rounded-lg text-emerald-800 focus:outline-none focus:ring-2 focus:ring-emerald-800"
                  required
                  aria-label="Your Message"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-emerald-800 text-white py-3 rounded-lg hover:bg-emerald-900 transition duration-300 disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-emerald-800 focus:ring-offset-2"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
              </form>

              {statusMessage && (
                <div
                  role="alert"
                  className={`mt-4 p-4 rounded-lg flex items-center ${
                    statusMessage.type === "success" ? "bg-emerald-100 text-emerald-800" : "bg-red-100 text-red-800"
                  }`}
                >
                  {statusMessage.type === "success" ? (
                    <CheckCircle className="w-5 h-5 mr-2" aria-hidden="true" />
                  ) : (
                    <AlertCircle className="w-5 h-5 mr-2" aria-hidden="true" />
                  )}
                  {statusMessage.message}
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Contact;