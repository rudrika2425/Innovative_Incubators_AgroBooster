// components/BasicInfoForm.jsx
import React, { useState } from "react";

const BasicInfoForm = () => {
  const [formData, setFormData] = useState({
    landArea: "",
    farmingTools: "",
    irrigationSystem: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Basic Information:", formData);
    // Proceed to the next step
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 bg-white p-6 rounded-lg shadow-lg"
    >
      <h2 className="text-2xl font-bold text-orange-600">Basic Information</h2>

      <div>
        <label htmlFor="landArea" className="block font-semibold mb-2">
          Area of Land (in acres)
        </label>
        <input
          type="text"
          id="landArea"
          name="landArea"
          value={formData.landArea}
          onChange={handleChange}
          className="w-full p-2 border rounded-lg"
          placeholder="Enter area of land"
        />
      </div>

      <div>
        <label htmlFor="farmingTools" className="block font-semibold mb-2">
          Farming Tools
        </label>
        <input
          type="text"
          id="farmingTools"
          name="farmingTools"
          value={formData.farmingTools}
          onChange={handleChange}
          className="w-full p-2 border rounded-lg"
          placeholder="List farming tools"
        />
      </div>

      <div>
        <label htmlFor="irrigationSystem" className="block font-semibold mb-2">
          Irrigation System
        </label>
        <input
          type="text"
          id="irrigationSystem"
          name="irrigationSystem"
          value={formData.irrigationSystem}
          onChange={handleChange}
          className="w-full p-2 border rounded-lg"
          placeholder="Describe irrigation system"
        />
      </div>

      <button
        type="submit"
        className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition"
      >
        Next
      </button>
    </form>
  );
};

export default BasicInfoForm;
