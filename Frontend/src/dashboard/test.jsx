import React, { useState } from "react";

const CameraInput = () => {
  const [photoFile, setPhotoFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);

  const handleCapture = (event) => {
    const file = event.target.files[0]; // Access the file object
    if (file) {
      setPhotoFile(file); // Store the file
      const photoURL = URL.createObjectURL(file); // Create a preview URL
      setPhotoPreview(photoURL); // Store the preview URL
      console.log("File:", file); // Log the file object
    }
  };

  return (
    <div className="p-4 flex flex-col items-center">
      <label
        htmlFor="cameraInput"
        className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-lg mb-4"
      >
        Take a Photo
      </label>
      <input
        id="cameraInput"
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={handleCapture}
      />
      {photoPreview && (
        <div className="mt-4">
          <p className="mb-2">Preview:</p>
          <img
            src={photoPreview}
            alt="Captured"
            className="w-64 h-auto rounded-lg shadow-md"
          />
        </div>
      )}
      {photoFile && (
        <div className="mt-4">
          <p className="mb-2">File Details:</p>
          <ul>
            <li>Name: {photoFile.name}</li>
            <li>Size: {(photoFile.size / 1024).toFixed(2)} KB</li>
            <li>Type: {photoFile.type}</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default CameraInput;
