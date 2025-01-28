// components/SoilTestForm.jsx
import React from "react";

const SoilTestForm = () => {
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    console.log("Uploaded file:", file);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-orange-600 mb-6">
        Soil Testing Agencies
      </h2>

      <p className="mb-4">
        Find nearby soil testing agencies or upload your soil test report.
      </p>

      <div className="mb-6">
        <label htmlFor="fileUpload" className="block font-semibold mb-2">
          Upload Soil Test Report
        </label>
        <input
          type="file"
          id="fileUpload"
          onChange={handleFileUpload}
          className="block w-full border rounded-lg p-2"
        />
      </div>

      <button className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition">
        Submit
      </button>
    </div>
  );
};

export default SoilTestForm;
