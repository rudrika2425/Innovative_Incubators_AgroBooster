import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { Sprout, Leaf, Save } from 'lucide-react';

const CropPrediction = () => {
  const [predictions, setPredictions] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams] = useSearchParams();
  const [crop,setCrop]=useState("");
  const [variety,setVariety]=useState("");

  const navigate=useNavigate();

  const parsePrediction = (prediction) => {
    try {
      const lines = prediction.split('\n').filter(line => line.trim() !== '');
      
      const getValueFromLine = (prefix) => {
        const line = lines.find(l => l.includes(prefix));
        return line ? line.replace(prefix, '').replace('', '').trim() : '';
      };

      const cropType = getValueFromLine('Crop Type:');
      const commonName = getValueFromLine('Common Name:');
      const hindiName = getValueFromLine('Hindi Name:');
      const variety = getValueFromLine('Variety:');
      
      const descIndex = lines.findIndex(l => l.includes('Description:'));
      const description = descIndex !== -1 
        ? lines.slice(descIndex).join('\n').replace('Description:', '').trim()
        : '';

      // Only return the prediction if it has all required fields
      if (cropType && commonName && variety && description) {
        return {
          cropType,
          commonName,
          hindiName,
          variety,
          description
        };
      }
      return null;
    } catch (err) {
      console.error('Error parsing prediction:', err);
      return null;
    }
  };

 
    const handleSave = async () => {
      const farmId = localStorage.getItem("farmId");
      console.log("Farm ID:", farmId);
      console.log(crop);
      console.log(variety);
      if (!farmId) {
        console.error("Farm ID is missing.");
        return;
      } 
      try {
        const response = await fetch("http://127.0.0.1:4000/calendar/update-farm", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            crop,
            variety,
            farmId,
          }),
        });
        console.log(response);
        if (response.ok) {
          const result = await response.json();
          console.log("Crop saved successfully:", result);
          navigate("/farmerdashboard", {
            state: { farmId, crop, variety },
          });
        } else {
          console.error("Failed to save crop data.");
        }
      } catch (error) {
        console.error("Error saving crop data:", error);
      }
    };

  useEffect(() => {
    const fetchPredictions = async () => {
      setLoading(true);
      try {
        
        const farmId = searchParams.get('farmId');
        console.log(farmId);
        if (!farmId) {
          throw new Error('No farm ID found in local storage');

        }

        console.log('Attempting to fetch predictions for farmId:', farmId);

        const response = await fetch('http://127.0.0.1:4000/predict/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({ farmId }),
          credentials: 'omit'
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(`errorData.message || HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        if (data.status === 'error') {
          throw new Error(data.message);
        }
        
        setPredictions(data.predictions);
      } catch (err) {
        console.error('Error fetching predictions:', err);
        setError(err.message || 'Failed to connect to the server. Please make sure the backend is running.');
      } finally {
        setLoading(false);
      }
    };

    fetchPredictions();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center p-12 space-y-4">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-gray-600">Analyzing farm data and generating predictions...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto my-8 p-6 bg-red-50 rounded-lg border border-red-200">
        <h3 className="text-xl font-semibold text-red-700 mb-2">Error</h3>
        <p className="text-red-600">{error}</p>
        <div className="mt-4">
          <p className="text-sm text-gray-600">Please ensure:</p>
          <ul className="list-disc ml-6 mt-2 text-sm text-gray-600">
            <li>The Flask server is running on port 4000</li>
            <li>MongoDB is running and accessible</li>
            <li>Your farm ID is correctly stored in local storage</li>
          </ul>
        </div>
      </div>
    );
  }

  if (!predictions) {
    return (
      <div className="max-w-4xl mx-auto my-8 p-6 bg-yellow-50 rounded-lg border border-yellow-200">
        <p className="text-yellow-700">No predictions available at this time.</p>
      </div>
    );
  }

  const parsedPredictions = predictions
    .split('\n\n')
    .map(parsePrediction)
    .filter(Boolean); // Remove null values

    return (
      <div className="relative min-h-screen bg-gradient-to-b from-yellow-50 to-yellow-100 py-12 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="flex justify-center gap-4 mb-6">
              <div className="p-4 bg-emerald-100 rounded-full shadow-lg">
                <Sprout className="w-6 h-6 text-emerald-600" />
              </div>
              <div className="p-4 bg-lime-100 rounded-full shadow-lg">
                <Leaf className="w-6 h-6 text-lime-600" />
              </div>
            </div>
            <h2 className="text-4xl font-bold text-yellow-900 mb-4">Crop Predictions</h2>
          </div>
  
          {/* Input Section */}
          <div className="mb-12 max-w-3xl mx-auto">
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-emerald-200 shadow-lg">
              <h3 className="text-xl font-semibold text-emerald-800 mb-4">Add New Crop</h3>
              <div className="flex flex-wrap gap-4">
                <input
                  type="text"
                  placeholder="Crop Name"
                  className="flex-1 px-4 py-2 border border-emerald-200 rounded-full focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white/90"
                  onChange={(e) => setCrop(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Variety"
                  className="flex-1 px-4 py-2 border border-emerald-200 rounded-full focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white/90"
                  onChange={(e) => setVariety(e.target.value)}

                />
                <button
                  onClick={handleSave}
                  className="flex items-center gap-2 px-6 py-2 bg-emerald-600 text-white rounded-full hover:bg-emerald-700 transition-colors shadow-lg"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Crop</span>
                </button>
              </div>
            </div>
          </div>
  
          {/* Predictions Grid */}
          {!predictions ? (
            <div className="text-center py-8">
              <p className="text-emerald-800">No predictions available at this time.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {parsedPredictions.map((prediction, index) => (
                <div
                  key={index}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl border border-emerald-200 p-6 hover:shadow-xl transition-all duration-300 shadow-lg"
                >
                  <div className="mb-4">
                    <span className="inline-block px-4 py-1.5 bg-emerald-100 text-emerald-800 rounded-full text-sm font-medium">
                      {prediction.cropType}
                    </span>
                  </div>
                  <h3 className="text-2xl font-semibold text-yellow-900 mb-3">
                    {prediction.commonName}
                  </h3>
                  {prediction.hindiName && (
                    <p className="text-emerald-800 mb-3 font-medium">{prediction.hindiName}</p>
                  )}
                  <div className="mb-4 p-4 bg-emerald-50/50 rounded-xl">
                    <h4 className="font-medium text-emerald-900 mb-2">Varieties:</h4>
                    <p className="text-emerald-800">{prediction.variety}</p>
                  </div>
                  <div className="p-4 bg-emerald-50/50 rounded-xl">
                    <h4 className="font-medium text-emerald-900 mb-2">Description:</h4>
                    <p className="text-emerald-800 leading-relaxed">{prediction.description}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

export default CropPrediction;