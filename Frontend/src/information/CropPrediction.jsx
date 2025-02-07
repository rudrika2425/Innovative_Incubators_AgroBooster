import React, { useState, useEffect } from "react";
import { Leaf, Droplet, Sun, CloudRain, Sprout } from 'lucide-react';

const CropCard = ({ cropData = {} }) => {
  const [showFullDetails, setShowFullDetails] = useState(false);

  // Provide default values to prevent undefined errors
  const {
    commonName = 'Unknown Crop',
    cropType = 'Unspecified',
    hindiName = '',
    variety = 'Not Available',
    description = {}
  } = cropData;

  const renderDetailIcon = (key) => {
    const iconMap = {
      optimalConditions: <Sun className="w-5 h-5 text-green-500" />,
      growthDuration: <Leaf className="w-5 h-5 text-blue-500" />,
      fertilizerNeeds: <Droplet className="w-5 h-5 text-yellow-500" />,
      economicValue: <CloudRain className="w-5 h-5 text-purple-500" />,
      diseaseResistance: <Leaf className="w-5 h-5 text-red-500" />
    };
    return iconMap[key] || null;
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-emerald-200 overflow-hidden transform transition-all hover:scale-[1.02]">
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h3 className="text-2xl font-bold text-emerald-900">{commonName}</h3>
            <p className="text-sm text-emerald-700 uppercase tracking-wide">{cropType}</p>
          </div>
          {hindiName && (
            <span className="text-sm font-medium text-emerald-600 bg-emerald-100 px-3 py-1 rounded-full">
              {hindiName}
            </span>
          )}
        </div>

        <div className="mb-4 flex items-center gap-2 bg-emerald-50 p-3 rounded-lg">
          <Sprout className="w-6 h-6 text-emerald-600" />
          <div>
            <strong className="text-emerald-900 text-lg">Variety:</strong> 
            <span className="text-emerald-800 ml-2">{variety}</span>
          </div>
        </div>

        {Object.keys(description).length > 0 && showFullDetails && (
          <div className="space-y-4">
            {Object.entries(description).map(([key, value]) => (
              <div key={key} className="flex items-start space-x-3 bg-emerald-50 p-3 rounded-lg">
                {renderDetailIcon(key)}
                <div>
                  <h4 className="font-semibold text-emerald-900 mb-1">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </h4>
                  <p className="text-emerald-800">{value}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {Object.keys(description).length > 0 && (
          <button
            onClick={() => setShowFullDetails(!showFullDetails)}
            className="mt-4 w-full py-3 text-emerald-600 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors font-semibold"
          >
            {showFullDetails ? "Hide Details" : "Show More Details"}
          </button>
        )}
      </div>
    </div>
  );
};

const CropPrediction = () => {
  const [predictions, setPredictions] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const parsePredictions = (predictionText) => {
    try {
      const lines = predictionText.split('\n');
      const predictions = [];
      let currentCrop = {};

      lines.forEach(line => {
        line = line.trim();
        if (line.startsWith('- **Common Name**:')) {
          if (Object.keys(currentCrop).length > 0) {
            predictions.push(currentCrop);
          }
          currentCrop = {
            commonName: line.replace('- **Common Name**:', '').trim(),
            description: {}
          };
        } else if (line.startsWith('- **Crop Type**:')) {
          currentCrop.cropType = line.replace('- **Crop Type**:', '').trim();
        } else if (line.startsWith('- **Hindi Name**:')) {
          currentCrop.hindiName = line.replace('- **Hindi Name**:', '').trim();
        } else if (line.startsWith('- **Variety**:')) {
          currentCrop.variety = line.replace('- **Variety**:', '').trim();
        } else if (line.includes('Optimal Soil & Climate Conditions')) {
          currentCrop.description.optimalConditions = line.replace('* - **Optimal Soil & Climate Conditions**:', '').trim();
        } else if (line.includes('Growth Duration')) {
          currentCrop.description.growthDuration = line.replace('* - **Growth Duration**:', '').trim();
        } else if (line.includes('Fertilizer & Irrigation Needs')) {
          currentCrop.description.fertilizerNeeds = line.replace('* - **Fertilizer & Irrigation Needs**:', '').trim();
        } else if (line.includes('Uses & Economic Value')) {
          currentCrop.description.economicValue = line.replace('* - **Uses & Economic Value**:', '').trim();
        } else if (line.includes('Disease Resistance & Pest Control')) {
          currentCrop.description.diseaseResistance = line.replace('* - **Disease Resistance & Pest Control**:', '').trim();
        }
      });

      if (Object.keys(currentCrop).length > 0) {
        predictions.push(currentCrop);
      }

      // Remove the first element from predictions array
      return predictions.slice(1);
    } catch (parseError) {
      console.error("Parsing error:", parseError);
      return [];
    }
  };

  useEffect(() => {
    const fetchPredictions = async () => {
      try {
        const response = await fetch("http://127.0.0.1:4000/predict/");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        
        if (data.status === "success") {
          const parsedPredictions = parsePredictions(data.predictions);
          console.log("Parsed Predictions:", parsedPredictions);
          setPredictions(parsedPredictions);
        } else {
          throw new Error(data.message || "Failed to get predictions");
        }
      } catch (error) {
        console.error("Fetch error:", error);
        setError(`Failed to fetch crop predictions: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchPredictions();
  }, []);

  if (loading) return (
    <div className="w-full max-w-4xl mx-auto mt-8 flex justify-center items-center space-x-3">
      <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full"></div>
      <p className="text-gray-700">Loading crop predictions...</p>
    </div>
  );

  if (error) return (
    <div className="w-full max-w-4xl mx-auto mt-8 bg-red-50 border border-red-200 text-red-800 rounded-lg p-6 text-center">
      {error}
    </div>
  );

  return (
    <div className="w-full max-w-5xl mx-auto mt-8 px-4">
      <h2 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">
        Crop Predictions for Your Farm
      </h2>
      <div className="grid md:grid-cols-2 gap-6">
        {predictions && predictions.length > 0 ? (
          predictions.map((crop, index) => (
            <CropCard key={index} cropData={crop} />
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500">
            No crop predictions available.
          </div>
        )}
      </div>
    </div>
  );
};

export default CropPrediction;