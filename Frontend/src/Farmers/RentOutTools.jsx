import React, { useState } from "react";
import axios from "axios";
import { useUser } from "../Context/UserContext";
import { Sprout, Leaf, Tractor, Cloud, Sun } from "lucide-react";

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



  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
  
    setFormData((prevData) => {
      // Merge existing and new files, ensuring a max of 5 images
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

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-yellow-50 to-yellow-100">
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-30px) rotate(5deg); }
        }
      `}</style>

      {/* Navigation Bar */}
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
            {/* Rest of the form fields remain unchanged */}
            {/* Title */}
            <div>
              <label className="block text-emerald-800 font-semibold mb-2">
                Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                placeholder="Enter a title for your listing"
                className="w-full border border-emerald-300 rounded-lg p-3 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition"
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
                  Brand
                </label>
                <input
                  type="text"
                  name="brand"
                  value={formData.brand}
                  placeholder="Enter brand name"
                  className="w-full border border-emerald-300 rounded-lg p-3 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition"
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
                  value={formData.model}
                  placeholder="Enter model name/number"
                  className="w-full border border-emerald-300 rounded-lg p-3 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition"
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
                value={formData.condition}
                placeholder="e.g., Like New, Serviced"
                className="w-full border border-emerald-300 rounded-lg p-3 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition"
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
                value={formData.specs}
                placeholder="Provide technical specifications or additional details"
                className="w-full border border-emerald-300 rounded-lg p-3 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition"
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
                  value={formData.rate}
                  placeholder="Enter rental rate"
                  className="w-full border border-emerald-300 rounded-lg p-3 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition"
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
                  value={formData.availability}
                  placeholder="e.g., All weekdays"
                  className="w-full border border-emerald-300 rounded-lg p-3 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Image Upload */}
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


            {/* Renter's Details */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-emerald-800 font-semibold mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  name="renterName"
                  value={formData.renterName}
                  placeholder="Enter your name"
                  className="w-full border border-emerald-300 rounded-lg p-2"
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label className="block text-emerald-800 font-semibold mb-1">
                  Contact Information
                </label>
                <input
                  type="text"
                  name="contact"
                  value={formData.contact}
                  placeholder="Phone number or email"
                  className="w-full border border-emerald-300 rounded-lg p-2"
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label className="block text-emerald-800 font-semibold mb-1">
                  District
                </label>
                <input
                  type="text"
                  name="district"
                  value={formData.district}
                  placeholder="District"
                  className="w-full border border-emerald-300 rounded-lg p-2"
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label className="block text-emerald-800 font-semibold mb-1">
                  State
                </label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  placeholder="State"
                  className="w-full border border-emerald-300 rounded-lg p-2"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Terms and Conditions */}
            <div>
              <label className="block text-emerald-800 font-semibold mb-1">
                Terms and Conditions
              </label>
              <textarea
                name="terms"
                value={formData.terms}
                placeholder="Provide any usage or rental terms"
                className="w-full border border-emerald-300 rounded-lg p-2"
                rows="3"
                onChange={handleChange}
              ></textarea>
            </div>

            {/* Submit Button */}
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