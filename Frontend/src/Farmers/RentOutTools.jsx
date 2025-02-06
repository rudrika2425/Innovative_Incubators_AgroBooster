import React, { useState } from "react";
import { Sprout, Leaf, Sun, Cloud, Tractor } from "lucide-react";

const FloatingElements = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {[...Array(30)].map((_, i) => (
      <div
        key={i}
        className="absolute animate-float opacity-40"
        style={{
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          animation: `float ${8 + Math.random() * 4}s infinite ${Math.random() * 2}s`,
          zIndex: 0
        }}
      >
        {i % 5 === 0 ? (
          <Leaf className="w-8 h-8 text-emerald-600" />
        ) : i % 5 === 1 ? (
          <Sprout className="w-9 h-9 text-lime-600" />
        ) : i % 5 === 2 ? (
          <Sun className="w-10 h-10 text-yellow-600" />
        ) : i % 5 === 3 ? (
          <Tractor className="w-11 h-11 text-green-600" />
        ) : (
          <Cloud className="w-10 h-10 text-gray-600" />
        )}
      </div>
    ))}
  </div>
);

function RentOutTools() {
  const [formData, setFormData] = useState({
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
    terms: "",
    images: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    alert("Details submitted successfully!");
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-yellow-50 to-yellow-100">
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-30px) rotate(5deg); }
        }
      `}</style>

      <FloatingElements />

      <div className="relative z-10 flex justify-center items-center py-8 px-4">
        <div className="w-full max-w-4xl bg-white/90 backdrop-blur-sm shadow-2xl rounded-lg p-8">
          {/* Header with Icon Group */}
          <div className="flex justify-center gap-4 mb-6">
            <div className="p-4 bg-emerald-100 rounded-full shadow-lg animate-bounce-slow">
              <Tractor className="w-12 h-12 text-emerald-600" />
            </div>
            <div className="p-4 bg-lime-100 rounded-full shadow-lg animate-bounce-slow delay-100">
              <Sprout className="w-12 h-12 text-lime-600" />
            </div>
          </div>

          <h1 className="text-3xl font-extrabold text-emerald-900 mb-6 text-center tracking-tight">
            Rent Out Your Farming Tools
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <label className="block text-emerald-800 font-semibold mb-2">
                Title
              </label>
              <input
                type="text"
                name="title"
                placeholder="Enter a title for your listing"
                className="w-full border border-emerald-300 rounded-lg p-3 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition bg-white/80"
                onChange={handleChange}
                required
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-emerald-800 font-semibold mb-2">
                Category
              </label>
              <select
                name="category"
                className="w-full border border-emerald-300 rounded-lg p-3 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition bg-white/80"
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
                  Brand
                </label>
                <input
                  type="text"
                  name="brand"
                  placeholder="Enter brand name"
                  className="w-full border border-emerald-300 rounded-lg p-3 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition bg-white/80"
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label className="block text-emerald-800 font-semibold mb-2">
                  Model
                </label>
                <input
                  type="text"
                  name="model"
                  placeholder="Enter model name/number"
                  className="w-full border border-emerald-300 rounded-lg p-3 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition bg-white/80"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Condition */}
            <div>
              <label className="block text-emerald-800 font-semibold mb-2">
                Condition
              </label>
              <input
                type="text"
                name="condition"
                placeholder="e.g., Like New, Serviced"
                className="w-full border border-emerald-300 rounded-lg p-3 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition bg-white/80"
                onChange={handleChange}
                required
              />
            </div>

            {/* Specifications */}
            <div>
              <label className="block text-emerald-800 font-semibold mb-2">
                Specifications
              </label>
              <textarea
                name="specs"
                placeholder="Provide technical specifications or additional details"
                className="w-full border border-emerald-300 rounded-lg p-3 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition bg-white/80"
                rows="3"
                onChange={handleChange}
              ></textarea>
            </div>

            {/* Rental Rate and Availability */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-emerald-800 font-semibold mb-2">
                  Rental Rate (per day)
                </label>
                <input
                  type="number"
                  name="rate"
                  placeholder="Enter rental rate"
                  className="w-full border border-emerald-300 rounded-lg p-3 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition bg-white/80"
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label className="block text-emerald-800 font-semibold mb-2">
                  Availability
                </label>
                <input
                  type="text"
                  name="availability"
                  placeholder="e.g., All weekdays"
                  className="w-full border border-emerald-300 rounded-lg p-3 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition bg-white/80"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Images */}
            <div>
              <label className="block text-emerald-800 font-semibold mb-2">
                Upload Images (Max 5)
              </label>
              <input
                type="file"
                name="images"
                accept="image/*"
                multiple
                className="w-full border border-emerald-300 rounded-lg p-3 bg-white/80 hover:bg-emerald-50 transition"
                onChange={(e) => {
                  const files = Array.from(e.target.files);
                  if (formData.images.length + files.length > 5) {
                    alert('Maximum 5 images allowed');
                    return;
                  }
                  e.target.value = '';
                  setFormData(prev => ({
                    ...prev,
                    images: [...prev.images, ...files]
                  }));
                }}
              />
              {formData.images.length > 0 && (
                <div className="mt-3">
                  <h3 className="text-sm text-emerald-700 mb-2">Uploaded Images:</h3>
                  <div className="flex flex-wrap gap-4">
                    {formData.images.map((file, index) => (
                      <div
                        key={index}
                        className="relative w-20 h-20 rounded-lg overflow-hidden border border-emerald-300 shadow-md"
                      >
                        <img
                          src={URL.createObjectURL(file)}
                          alt={`Uploaded ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                        <button
                          onClick={() => {
                            setFormData(prevData => ({
                              ...prevData,
                              images: prevData.images.filter((_, i) => i !== index),
                            }));
                          }}
                          className="absolute top-0 right-0 bg-emerald-600 text-white text-xs p-1 hover:bg-emerald-700"
                        >
                          X
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Renter's Details */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-emerald-800 font-semibold mb-2">Your Name</label>
                <input
                  type="text"
                  name="renterName"
                  placeholder="Enter your name"
                  className="w-full border border-emerald-300 rounded-lg p-3 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition bg-white/80"
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label className="block text-emerald-800 font-semibold mb-2">Contact Information</label>
                <input
                  type="text"
                  name="contact"
                  placeholder="Phone number or email"
                  className="w-full border border-emerald-300 rounded-lg p-3 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition bg-white/80"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Terms and Conditions */}
            <div>
              <label className="block text-emerald-800 font-semibold mb-2">Terms and Conditions</label>
              <textarea
                name="terms"
                placeholder="Provide any usage or rental terms"
                className="w-full border border-emerald-300 rounded-lg p-3 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition bg-white/80"
                rows="3"
                onChange={handleChange}
              ></textarea>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-emerald-600 text-white font-bold py-4 rounded-full shadow-lg hover:bg-emerald-500 transition-all duration-300 flex items-center justify-center gap-2 mt-8"
            >
              <Tractor className="w-6 h-6" />
              <span>Submit Details</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RentOutTools;