import React, { useState, useEffect } from "react";

const CropPrediction = () => {
  const [predictions, setPredictions] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPredictions = async () => {
      try {
        const response = await fetch("http://127.0.0.1:4000/predict/");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (data.status === "success") {
          setPredictions(data.predictions);
        } else {
          throw new Error(data.message || "Failed to get predictions");
        }
      } catch (error) {
        setError("Failed to fetch crop predictions. Please ensure the backend server is running.");
        console.error("Error fetching predictions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPredictions();
  }, []);

  if (loading) {
    return (
      <div className="w-full max-w-4xl mx-auto mt-8 bg-white rounded-lg shadow-md">
        <div className="flex items-center justify-center p-8">
          <svg
            className="animate-spin h-8 w-8 text-blue-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          <p className="ml-2 text-lg">Analyzing crop data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full max-w-4xl mx-auto mt-8 bg-red-50 border border-red-200 text-red-800 rounded-lg p-4">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto mt-8 bg-white rounded-lg shadow-md">
      <div className="border-b border-gray-200 p-6">
        <div className="flex items-center">
          <svg
            className="h-6 w-6 text-green-500 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
            />
          </svg>
          <h2 className="text-xl font-bold text-gray-900">Crop Prediction Results</h2>
        </div>
      </div>
      <div className="p-6">
        {predictions ? (
          <div className="space-y-6">
            {predictions.split('\n\n').map((section, index) => {
              const [heading, ...items] = section.split('\n');
              return (
                <div key={index} className="space-y-2">
                  <h3 className="text-lg font-semibold text-gray-900">{heading}</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    {items.map((item, itemIndex) => (
                      <li key={itemIndex} className="text-gray-700">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-center text-gray-500">No predictions available.</p>
        )}
      </div>
    </div>
  );
};

export default CropPrediction;