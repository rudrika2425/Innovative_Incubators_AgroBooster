import React, { useState, useEffect } from "react";
import { useUser } from "../Context/UserContext";
import { useNavigate } from "react-router-dom";
import { TranslatedText } from "../languageTranslation/TranslatedText";

const SoilTestReportUploader = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [result, setResult] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [farmerInput, setFarmerInput] = useState(null);
  const nevigate = useNavigate();
  const { user } = useUser();

  useEffect(() => {
    const storedFarmerData = localStorage.getItem("farmerInput");
    if (storedFarmerData) {
      try {
        const parsedFarmerData = JSON.parse(storedFarmerData);
        setFarmerInput(parsedFarmerData);
        localStorage.removeItem("farmerInput");
      } catch (error) {
        console.error("Error parsing farmer data:", error);
      }
    }
  }, []);

  const fetchLocationAndFarmerData = async () => {
    try {
      const response = await fetch("http://127.0.0.1:4000/location/ip-location");
      if (!response.ok) throw new Error("Failed to fetch location");
      const locationData = await response.json();
      return locationData;
    } catch (error) {
      console.error("Error fetching location:", error);
      throw error;
    }
  };

  const fetchWeather = async (lat, lon) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:4000/weather/get_weather?lat=${lat}&lon=${lon}`
      );
      if (!response.ok) throw new Error("Failed to fetch weather");
      const weatherData = await response.json();
      return weatherData;
    } catch (error) {
      console.error("Error fetching weather:", error);
      throw error;
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setFileName(file ? file.name : "");
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert(<TranslatedText text="Please select a file first." />);
      return;
    }

    setIsAnalyzing(true);
    setErrorMessage(null);

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await fetch(
        "http://127.0.0.1:4000/analyze_soil/api/analyze-soil-report",
        {
          method: 'POST',
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (data?.analysis) {
        setResult(data.analysis);
      } else {
        setErrorMessage(<TranslatedText text="No analysis result received." />);
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      setErrorMessage(<TranslatedText text="Failed to analyze the report. Please try again." />);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSubmit = async () => {
    if (!result) {
      alert(<TranslatedText text="Please upload the soil report first." />);
      return;
    }
  
    setIsSubmitting(true);
    try {
      const locationData = await fetchLocationAndFarmerData();
      const weatherData = await fetchWeather(
        locationData.latitude,
        locationData.longitude
      );
  
      const farmerId = user.id;
  
      const farmerData = {
        farmerId,
        farmerInput: farmerInput,
        location: locationData,
        weather: weatherData,
        soilAnalysisReport: result,
      };

      console.log(farmerData);
  
      alert("AgroBooster is accessing your location");
  
      const response = await fetch("http://127.0.0.1:4000/farmer_data/save-farmer-data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(farmerData),
      });
  
      if (!response.ok) {
        throw new Error("Failed to store data in backend");
      }
  
      const responseData = await response.json();
      console.log("Data stored successfully:", responseData);
      localStorage.setItem("farmId", responseData.id);
      nevigate(`/crop?farmId=${responseData.id}`);

    } catch (error) {
      setErrorMessage(<TranslatedText text="Failed to collect all required data. Please try again." />);
      console.error("Error in submit:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <h2 className="text-4xl font-bold text-emerald-600 mb-6 mt-10">
        <TranslatedText text="Upload Soil Test Report" />
      </h2>

      {!selectedFile ? (
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="block w-96 p-2 border rounded-md mb-4"
          aria-label={<TranslatedText text="Upload soil test report" />}
        />
      ) : (
        <div className="mb-4">
          <span className="text-gray-400">
            <TranslatedText text="Selected File" />: {fileName}
          </span>
        </div>
      )}

      <button
        onClick={handleUpload}
        disabled={isAnalyzing || !selectedFile}
        className={`px-4 py-2 text-white rounded-md ${
          isAnalyzing || !selectedFile
            ? "bg-emerald-600"
            : "bg-emerald-600 hover:bg-emerald-700"
        }`}
      >
        {isAnalyzing ? 
          <TranslatedText text="Analyzing..." /> : 
          <TranslatedText text="Upload and Analyze" />
        }
      </button>

      {errorMessage && (
        <div className="w-full max-w-md p-4 mt-4 border rounded-lg shadow-md bg-red-100 text-red-700">
          <h3 className="text-lg font-semibold mb-2">
            <TranslatedText text="Error" />
          </h3>
          <p>{errorMessage}</p>
        </div>
      )}

      {result && (
        <div className="w-full max-w-md p-4 mt-4 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-2">
            <TranslatedText text="Analysis Result" />
          </h3>
          <div className="p-2 bg-gray-100 rounded-md">
            <p><TranslatedText text={result}/></p>
          </div>
        </div>
      )}

      <div className="flex justify-end mt-4">
        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className={`px-4 py-2 rounded-lg transition ${
            result && !isSubmitting
              ? "bg-emerald-600 text-white hover:bg-emerald-700"
              : "bg-gray-400 text-white cursor-not-allowed"
          }`}
        >
          {isSubmitting ? 
            <TranslatedText text="Processing..." /> : 
            <TranslatedText text="Submit" />
          }
        </button>
      </div>
    </div>
  );
};

export default SoilTestReportUploader;