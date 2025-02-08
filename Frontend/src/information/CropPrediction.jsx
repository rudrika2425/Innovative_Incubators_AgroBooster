import React, { useState, useEffect } from "react";
import { Leaf, Droplet, Sun, CloudRain, Sprout, Cloud, Tractor } from 'lucide-react';
import { useNavigate } from "react-router-dom";

const FloatingElements = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {[...Array(20)].map((_, i) => (
      <div
        key={i}
        className="absolute animate-float opacity-40"
        style={{
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          animation: `float ${8 + Math.random() * 4}s infinite ${Math.random() * 20}s`,
          zIndex: 0
        }}
      >
        {i % 5 === 0 ? (
          <Leaf className="w-8 h-8 text-emerald-600" />
        ) : i % 5 === 1 ? (
          <Sprout className="w-9 h-9 text-lime-600" />
        ) : i % 5 === 2 ? (
          <Sun className="w-10 h-10 text-yellow-600" />
        ) : i % 5 === 3 ? (
          <Tractor className="w-11 h-11 text-green-600" />
        ) : (
          <Cloud className="w-10 h-10 text-gray-600" />
        )}
      </div>
    ))}
  </div>
);

const gradientClasses = [
  'bg-gradient-to-br from-emerald-100 to-emerald-200',
  'bg-gradient-to-br from-amber-100 to-amber-200',
  'bg-gradient-to-br from-yellow-100 to-yellow-200',
  'bg-gradient-to-br from-lime-100 to-lime-200',
  'bg-gradient-to-br from-stone-100 to-stone-200',
  'bg-gradient-to-br from-orange-100 to-orange-200'
];

const CropCard = ({ cropData = {}, index }) => {
  const [showFullDetails, setShowFullDetails] = useState(false);

  const formatText = (text) => {
    if (!text) return '';
    return text
      .trim()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  };

  const {
    commonName = 'Unknown Crop',
    cropType = 'Unspecified',
    hindiName = '',
    variety = 'Not Available',
    description = {}
  } = cropData;

  const formattedDescription = Object.entries(description).reduce((acc, [key, value]) => {
    acc[key] = formatText(value);
    return acc;
  }, {});

  const renderDetailIcon = (key) => {
    const iconMap = {
      optimalConditions: <Sun className="w-6 h-6 text-yellow-600" />,
      growthDuration: <Leaf className="w-6 h-6 text-emerald-600" />,
      fertilizerNeeds: <Droplet className="w-6 h-6 text-blue-600" />,
      economicValue: <CloudRain className="w-6 h-6 text-purple-600" />,
      diseaseResistance: <Leaf className="w-6 h-6 text-red-600" />
    };
    return iconMap[key] || null;
  };

  const gradientClass = gradientClasses[index % gradientClasses.length];

  return (
    <div   className={`w-full max-w-3xl mx-auto ${gradientClass} rounded-2xl shadow-xl overflow-hidden transform transition-all duration-300 ease-in-out hover:shadow-2xl hover:scale-[1.02] mb-8`}>
      <div className="relative p-8" >
        <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
          <Sprout className="w-full h-full text-emerald-900" />
        </div>

        <div className="flex justify-between items-start mb-3">
          <div className="space-y-2">
            <h3 className="text-3xl font-bold text-emerald-900 tracking-tight">{formatText(commonName)}</h3>
            <p className="text-sm font-semibold text-emerald-700 uppercase tracking-wider">{formatText(cropType)}</p>
          </div>
          {hindiName && (
            <span className="text-sm font-medium text-emerald-700 bg-emerald-50 px-4 py-2 rounded-full shadow-sm border border-emerald-200">
              {formatText(hindiName)}
            </span>
          )}
        </div>

        <div className="mb-2 bg-white bg-opacity-70 backdrop-blur-sm p-4 rounded-xl shadow-sm border border-emerald-100">
          <div className="flex items-center gap-3">
            <Sprout className="w-8 h-8 text-emerald-600" />
            <div>
              <strong className="text-emerald-900 text-lg block mb-1">Variety</strong>
              <span className="text-emerald-800 text-lg">{formatText(variety)}</span>
            </div>
          </div>
        </div>

        {Object.keys(formattedDescription).length > 0 && showFullDetails && (
          <div className="space-y-4">
            {Object.entries(formattedDescription).map(([key, value]) => (
              <div key={key} className="flex items-start gap-4 bg-white bg-opacity-70 backdrop-blur-sm p-4 rounded-xl shadow-sm border border-emerald-100 transition-all duration-300 hover:bg-opacity-90">
                <div className="mt-1">{renderDetailIcon(key)}</div>
                <div className="flex-1">
                  <h4 className="font-semibold text-lg text-emerald-900 mb-2">
                    {formatText(key.replace(/([A-Z])/g, ' $1').trim())}
                  </h4>
                  <p className="text-emerald-800 leading-relaxed">{value}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {Object.keys(description).length > 0 && (
          <button
            onClick={() => setShowFullDetails(!showFullDetails)}
            className="mt-1 w-full py-4 text-emerald-700 bg-white bg-opacity-70 hover:bg-opacity-90 rounded-xl transition-all duration-300 font-semibold shadow-sm border border-emerald-100 hover:shadow-md"
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
  const [dataFetched, setDataFetched] = useState(false);
  const [crop, setCrop] = useState("");
  const [variety, setVariety] = useState("");
 
  const navigate = useNavigate();
  
  const handleCrop = async () => {
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

  const parsePredictions = (predictionText) => {
    try {
      const lines = predictionText.split('\n');
      const predictions = [];
      let currentCrop = {};

      lines.forEach(line => {
        line = line.trim();
        
        if (line.startsWith('- **Common Name**:')) {
          if (Object.keys(currentCrop).length > 0) {
            predictions.push({ ...currentCrop });
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
        } else {
          const descriptions = {
            'Optimal Soil & Climate Conditions': 'optimalConditions',
            'Growth Duration': 'growthDuration',
            'Fertilizer & Irrigation Needs': 'fertilizerNeeds',
            'Uses & Economic Value': 'economicValue',
            'Disease Resistance & Pest Control': 'diseaseResistance'
          };

          for (const [key, field] of Object.entries(descriptions)) {
            if (line.includes(key)) {
              const value = line
                .replace(`* - **${key}**:`, '')
                .replace(/^\*\s*-?\s*/, '')
                .trim();
              
              currentCrop.description[field] = value;
              break;
            }
          }
        }
      });

      if (Object.keys(currentCrop).length > 0) {
        predictions.push({ ...currentCrop });
      }

      return predictions.slice(1);
    } catch (parseError) {
      console.error("Parsing error:", parseError);
      return [];
    }
  };

  useEffect(() => {
    const farmData = JSON.parse(localStorage.getItem("farmData") || "{}");

    if (!dataFetched) {
      const fetchPredictions = async () => {
        try {
          const requestData = {
            _id: farmData._id,
            farmerId: farmData.farmerId,
            farmerInput: {
              farmName: farmData.farmerInput?.farmName || "Unknown Farm",
              landArea: farmData.farmerInput?.landArea || "0",
              farmingTools: farmData.farmerInput?.farmingTools || [],
              irrigationSystem: farmData.farmerInput?.irrigationSystem || "Unknown",
              location: {
                altitude: farmData.farmerInput?.location?.altitude || 0,
                city: farmData.farmerInput?.location?.city || "Unknown",
                country: farmData.farmerInput?.location?.country || "Unknown",
                ip: farmData.farmerInput?.location?.ip || "",
                latitude: farmData.farmerInput?.location?.latitude || "0",
                longitude: farmData.farmerInput?.location?.longitude || "0",
                region: farmData.farmerInput?.location?.region || "Unknown",
                tropical_zone: farmData.farmerInput?.location?.tropical_zone || "Unknown"
              },
              weather: {
                cloud_coverage: farmData.farmerInput?.weather?.cloud_coverage || 0,
                date_time_utc: farmData.farmerInput?.weather?.date_time_utc || "",
                feels_like: farmData.farmerInput?.weather?.feels_like || 0,
                humidity: farmData.farmerInput?.weather?.humidity || 0,
                pressure: farmData.farmerInput?.weather?.pressure || 0,
                temperature: farmData.farmerInput?.weather?.temperature || 0,
                weather_description: farmData.farmerInput?.weather?.weather_description || "Unknown",
                wind_speed: farmData.farmerInput?.weather?.wind_speed || 0
              },
              soilAnalysisReport: farmData.farmerInput?.soilAnalysisReport || "Unknown"
            }
          };

          const response = await fetch("http://127.0.0.1:4000/predict/", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestData)
          });
          
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          
          const data = await response.json();
          
          if (data.status === "success") {
            const parsedPredictions = parsePredictions(data.predictions);
            console.log(parsedPredictions);
            setPredictions(parsedPredictions);
          } else {
            throw new Error(data.message || "Failed to get predictions");
          }
        } catch (error) {
          console.error("Fetch error:", error);
          setError(`Failed to fetch crop predictions: ${error.message}`);
        } finally {
          setLoading(false);
          setDataFetched(true);
          localStorage.removeItem("farmData");
        }
      };

      fetchPredictions();
    }
  }, [dataFetched]);

  if (loading) return (
    <div className="relative min-h-screen bg-gradient-to-b from-yellow-50 to-yellow-100">
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-30px) rotate(5deg); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
      
      <FloatingElements />
      
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-4">
        <div className="space-y-6">
          <div className="flex justify-center gap-4 mb-8">
            <div className="p-4 bg-emerald-100 rounded-full shadow-lg animate-bounce">
              <Sprout className="w-12 h-12 text-emerald-600" />
            </div>
          </div>
          <h2 className="text-3xl font-extrabold text-yellow-900 animate-pulse">
            Analyzing Your Farm Data
          </h2>
          <p className="text-lg text-emerald-800">
            Please wait while we process your crop predictions...
          </p>
        </div>
      </div>
    </div>
  );

  if (error) return (
    <div className="relative min-h-screen bg-gradient-to-b from-yellow-50 to-yellow-100">
      <FloatingElements />
      <div className="relative z-10 w-full max-w-4xl mx-auto mt-8 bg-red-50 border border-red-200 text-red-800 rounded-lg p-6 text-center">
        {error}
      </div>
    </div>
  );

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-yellow-50 to-yellow-100">
      <FloatingElements />
      <div className="relative z-10 w-full max-w-5xl mx-auto pt-8 px-4 pb-12">
        <h2 className="text-5xl font-extrabold text-emerald-900 mb-8 text-center">
          Crop Predictions for Your Farm
        </h2>
        <h2 className="text-lg font-extrabold text-yellow-900 mb-8 text-center">
        "Harvest Success with Smart Crop Predictions—Customized for Your Farm, Driven by Your Data!" 🌾🚀
        </h2>
        <div className="flex flex-col items-center">
          {predictions && predictions.length > 0 ? (
            predictions.map((crop, index) => (
              <CropCard key={index} cropData={crop} index={index}/>
            ))
          ) : (
            <div className="text-center text-gray-500">
              No crop predictions available.
            </div>
          )}
        </div>
      </div>
      <div className="crop-form">
      <div className="input">
        <label>Crop:</label>
        <input
          type="text"
          value={crop}
          onChange={(e) => setCrop(e.target.value)}
          placeholder="Enter crop name"
        />
      </div>
      <div className="input">
        <label>Variety:</label>
        <input
          type="text"
          value={variety}
          onChange={(e) => setVariety(e.target.value)}
          placeholder="Enter variety name"
        />
      </div>
      <button onClick={handleCrop}>Save Crop</button>
    </div>
      
    </div>
    
  );
};

export default CropPrediction;