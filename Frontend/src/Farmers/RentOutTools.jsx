import React, { useState } from "react";
import axios from "axios";
// import NavbarRent from "./NavbarRent";
import {useUser} from "../Context/UserContext"

function RentOutTools() {
  const {user} = useUser();
  const [formData, setFormData] = useState({
    farmer_id:user.id,
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
    district:"",
    state:"",
    terms: "",
    images: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    // Limit the number of files to 5
    if (files.length > 5) {
      alert("You can upload up to 5 images only.");
      return;
    }

    setFormData((prevData) => ({
      ...prevData,
      images: files,
    }));
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Create a new FormData object for sending the form data including images
      const formDataToSend = new FormData();
      for (let key in formData) {
        if (key !== "images") {
          formDataToSend.append(key, formData[key]);
        } else {
          formData.images.forEach((file) => {
            formDataToSend.append("images", file);
          });
        }
      }
  const response = await axios.post("http://127.0.0.1:4000/tools/addtools", formDataToSend, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  if (response.status === 201) {
    alert("Details submitted successfully!");
  }
} catch (error) {
  console.error("Error submitting form data:", error);
  alert("An error occurred while submitting your data.");
}
};

    

  return (
    <>
    {/* <NavbarRent/> */}
    <div  style={{
    backgroundImage: `url('/Images/bgRent.png')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    opacity: 0.8, // Adjust transparency
  }} className="min-h-screen bg-gradient-to-r from-green-100 via-green-200 to-green-100 flex justify-center items-center py-8 px-4">
      <div className="w-full max-w-4xl bg-white shadow-2xl rounded-lg p-8 transform transition-transform hover:scale-105 duration-300">
        <h1 className="text-3xl font-extrabold text-green-700 mb-6 text-center">
          Rent Out Your Farming Tools
        </h1>
        <form
          onSubmit={handleSubmit}
          className="space-y-6 animate-fade-in"
        >
          {/* Title */}
          <div >
            <label className="block text-green-800 font-semibold mb-2">
              Title
            </label>
            <input
              type="text"
              name="title"
              placeholder="Enter a title for your listing"
              className="w-full border border-green-300 rounded-lg p-3 focus:ring-2 focus:ring-green-500 focus:outline-none transition"
              onChange={handleChange}
              required
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-green-800 font-semibold mb-2">
              Category
            </label>
            <select
              name="category"
              className="w-full border border-green-300 rounded-lg p-3 focus:ring-2 focus:ring-green-500 focus:outline-none transition"
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
              <label className="block text-green-800 font-semibold mb-2">
                Brand
              </label>
              <input
                type="text"
                name="brand"
                placeholder="Enter brand name"
                className="w-full border border-green-300 rounded-lg p-3 focus:ring-2 focus:ring-green-500 focus:outline-none transition"
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block text-green-800 font-semibold mb-2">
                Model
              </label>
              <input
                type="text"
                name="model"
                placeholder="Enter model name/number"
                className="w-full border border-green-300 rounded-lg p-3 focus:ring-2 focus:ring-green-500 focus:outline-none transition"
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Condition */}
          <div>
            <label className="block text-green-800 font-semibold mb-2">
              Condition
            </label>
            <input
              type="text"
              name="condition"
              placeholder="e.g., Like New, Serviced"
              className="w-full border border-green-300 rounded-lg p-3 focus:ring-2 focus:ring-green-500 focus:outline-none transition"
              onChange={handleChange}
              required
            />
          </div>

          {/* Specifications */}
          <div>
            <label className="block text-green-800 font-semibold mb-2">
              Specifications
            </label>
            <textarea
              name="specs"
              placeholder="Provide technical specifications or additional details"
              className="w-full border border-green-300 rounded-lg p-3 focus:ring-2 focus:ring-green-500 focus:outline-none transition"
              rows="3"
              onChange={handleChange}
            ></textarea>
          </div>

          {/* Rental Rate and Availability */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-green-800 font-semibold mb-2">
                Rental Rate (per day)
              </label>
              <input
                type="number"
                name="rate"
                placeholder="Enter rental rate"
                className="w-full border border-green-300 rounded-lg p-3 focus:ring-2 focus:ring-green-500 focus:outline-none transition"
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block text-green-800 font-semibold mb-2">
                Availability
              </label>
              <input
                type="text"
                name="availability"
                placeholder="e.g., All weekdays"
                className="w-full border border-green-300 rounded-lg p-3 focus:ring-2 focus:ring-green-500 focus:outline-none transition"
                onChange={handleChange}
                required
              />
            </div>
          </div>

{/* Image Upload */}
<div>
  <label className="block text-green-800 font-semibold mb-2">
    Upload Images (Max 5)
  </label>
  <input
    type="file"
    name="images"
    accept="image/*"
    multiple
    className="w-full border border-green-300 rounded-lg p-3 hover:bg-green-50 transition"
    onChange={(e) => {
      const files = Array.from(e.target.files);

      // Validate image count
      if (formData.images.length + files.length > 5) {
        alert('You can upload a maximum of 5 images.');
        return;
      }

      // Clear the input after selecting files
      e.target.value = '';

      // Add images
      setFormData((prevData) => ({
        ...prevData,
        images: [...prevData.images, ...files], // Add new files to existing ones
      }));
    }}
  />
  {formData.images.length > 0 && (
    <div className="mt-3">
      <h3 className="text-sm text-green-700 mb-2">Uploaded Images:</h3>
      <div className="flex flex-wrap gap-4">
        {formData.images.map((file, index) => (
          <div
            key={index}
            className="relative w-20 h-20 rounded-lg overflow-hidden border border-green-300 shadow-md"
          >
            <img
              src={URL.createObjectURL(file)}
              alt={`Uploaded ${index + 1}`}
              className="w-full h-full object-cover"
            />
            {/* Delete Button */}
            <button
              onClick={() => {
                setFormData((prevData) => ({
                  ...prevData,
                  images: prevData.images.filter((_, i) => i !== index), // Remove the clicked image
                }));
              }}
              className="absolute top-0 right-0 bg-green-600 text-white text-xs p-1 rounded-half hover:bg-red-700"
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
              <label className="block text-gray-700 font-medium mb-1">Your Name</label>
              <input
                type="text"
                name="renterName"
                placeholder="Enter your name"
                className="w-full border border-gray-300 rounded-lg p-2"
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">Contact Information</label>
              <input
                type="text"
                name="contact"
                placeholder="Phone number or email"
                className="w-full border border-gray-300 rounded-lg p-2"
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">District</label>
              <input
                type="text"
                name="district"
                placeholder="District"
                className="w-full border border-gray-300 rounded-lg p-2"
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">State</label>
              <input
                type="text"
                name="state"
                placeholder="State"
                className="w-full border border-gray-300 rounded-lg p-2"
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Terms and Conditions */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Terms and Conditions</label>
            <textarea
              name="terms"
              placeholder="Provide any usage or rental terms"
              className="w-full border border-gray-300 rounded-lg p-2"
              rows="3"
              onChange={handleChange}
            ></textarea>
          </div>



          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-green-500 text-white font-bold py-3 rounded-lg shadow-lg hover:bg-green-600 transition-transform transform hover:scale-105"
          >
            Submit Details
          </button>
        </form>
      </div>
    </div>
    </>
  );
  
}
 

export default RentOutTools;

