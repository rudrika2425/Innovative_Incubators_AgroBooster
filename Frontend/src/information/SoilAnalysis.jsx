import React, { useState, useEffect } from "react";
import axios from "axios";

const SoilTestReportUploader = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [farmerInput, setFarmerInput] = useState(null);
  const [location, setLocation] = useState(null);
  const [weather, setWeather] = useState(null);
  const [farmerData, setFarmerData] = useState(null);

  const fetchLocationAndFarmerData = async () => {
    try {
      const response = await fetch("http://127.0.0.1:4000/location/ip-location");
      if (!response.ok) throw new Error("Failed to fetch location");
      const locationData = await response.json();
      
      const storedFarmerData = localStorage.getItem("farmerInput");
      const parsedFarmerData = storedFarmerData ? JSON.parse(storedFarmerData) : {};
      
      // Store farmerInput and location in state
      setFarmerInput(parsedFarmerData);
      setLocation(locationData);

    } catch (error) {
      console.error("Error fetching location:", error);
    }
  };

  const fetchWeather = async (lat,lon) => {
    try {
      const response = await fetch(`http://127.0.0.1:4000/weather/get_weather?lat=${lat}&lon=${lon}`);
      if (!response.ok) throw new Error("Failed to fetch weather");
      const weatherData = await response.json();
      console.log(weatherData)
      setWeather(weatherData);

    } catch (error) {
      console.error("Error fetching weather:", error);
    }
  }
  

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setFileName(file ? file.name : "");
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select a file first.");
      return;
    }
  
    setIsLoading(true);
    setErrorMessage(null);
  
    const formData = new FormData();
    formData.append("file", selectedFile);
  
    try {
      const response = await axios.post(
        "http://127.0.0.1:4000/analyze_soil/api/analyze-soil-report",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
  
      if (response.data?.analysis) {
        const analysisResult = response.data.analysis;
        setResult(analysisResult);
      } else {
        setErrorMessage("No analysis result received.");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      setErrorMessage("Failed to analyze the report. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  

  const handleSubmit = async () => {
    if (!result) {
      alert("Please upload the soil report first.");
      return;
    }

    fetchLocationAndFarmerData();

    const lat = location.latitude;
    const lon = location.longitude;
    console.log(lat);
    console.log(lon);

    fetchWeather(lat,lon)

    alert("Agrobooster is accesssing your location..")  
    
    console.log(farmerInput)
    console.log(location)
    console.log(weather)

    setFarmerData({
      farmerInput: farmerInput,
      location: location,
      weather: weather,
      soilAnalysisReport: result
    })

    console.log(farmerData)
  };

  return (
    <div>
      <h2 className="text-4xl font-bold mb-4 text-green-600 mb-6 mt-10">Upload Soil Test Report</h2>

      {!selectedFile ? (
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="block w-96 p-2 border rounded-md mb-4"
        />
      ) : (
        <div className="mb-4">
          <span className="text-gray-400">Selected File: {fileName}</span>
        </div>
      )}

      <button
        onClick={handleUpload}
        disabled={isLoading || !selectedFile}
        className={`px-4 py-2 text-white rounded-md ${
          isLoading || !selectedFile ? "bg-green-600" : "bg-green-600 hover:bg-green-700"
        }`}
      >
        {isLoading ? "Analyzing..." : "Upload and Analyze"}
      </button>

      {errorMessage && (
        <div className="w-full max-w-md p-4 mt-4 border rounded-lg shadow-md bg-red-100 text-red-700">
          <h3 className="text-lg font-semibold mb-2">Error</h3>
          <p>{errorMessage}</p>
        </div>
      )}

      {result && (
        <div className="w-full max-w-md p-4 mt-4 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-2">Analysis Result</h3>
          <div className="p-2 bg-gray-100 rounded-md">
            <p>{result}</p>
          </div>
        </div>
      )}

      <div className="flex justify-end">
        <button
          onClick={handleSubmit}
          className={`px-4 py-2 rounded-lg transition ${
            result ? "bg-green-600 text-white hover:bg-green-700" : "bg-gray-400 text-gray-700 cursor-not-allowed"
          }`}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default SoilTestReportUploader;
