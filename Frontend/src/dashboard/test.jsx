import React, { useState } from 'react';
import axios from 'axios';

const SoilTestReportUploader = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert('Please select a file first.');
      return;
    }

    setIsLoading(true);
    setErrorMessage(null); // Reset error message if a new upload is attempted
    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await axios.post('http://127.0.0.1:5000/api/analyze-soil-report', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Handle response data properly
      if (response.data?.analysis) {
        setResult(response.data.analysis); // Set the simple string response
      } else {
        setErrorMessage('No analysis result received.');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      setErrorMessage('Failed to analyze the report. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 space-y-4">
      <div className="w-full max-w-md p-4 border rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Upload Soil Test Report</h2>
        <input 
          type="file" 
          accept="image/*" 
          onChange={handleFileChange} 
          className="block w-full p-2 border rounded-md mb-4" 
        />
        <button 
          onClick={handleUpload} 
          disabled={isLoading} 
          className={`px-4 py-2 text-white rounded-md ${isLoading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'}`}
        >
          {isLoading ? 'Analyzing...' : 'Upload and Analyze'}
        </button>
      </div>

      {/* Display error message if any */}
      {errorMessage && (
        <div className="w-full max-w-md p-4 mt-4 border rounded-lg shadow-md bg-red-100 text-red-700">
          <h3 className="text-lg font-semibold mb-2">Error</h3>
          <p>{errorMessage}</p>
        </div>
      )}

      {/* Display analysis result if available */}
      {result && (
        <div className="w-full max-w-md p-4 mt-4 border rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-2">Analysis Result</h3>
          <div className="p-2 bg-gray-100 rounded-md">
            <p>{result}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SoilTestReportUploader;
