import React from 'react';
import { Sprout, Leaf, Save } from 'lucide-react';
import { TranslatedText } from '../languageTranslation/TranslatedText';

const CropPrediction = () => {
  const [predictions, setPredictions] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [crop, setCrop] = React.useState("");
  const [variety, setVariety] = React.useState("");

  const cardColors = [
    'bg-emerald-200/90',
    'bg-blue-200/90',
    'bg-purple-200/90',
    'bg-rose-200/90',
    'bg-cyan-200/90',
    'bg-orange-200/90',
    'bg-lime-200/90',
    'bg-blue-100/90',
    'bg-green-100/90',
  ];

  const cardIcons = [Sprout, Leaf];

  const parsePrediction = (prediction) => {
    try {
      const lines = prediction.split('\n').filter(line => line.trim() !== '');
      
      const getValueFromLine = (prefix) => {
        const line = lines.find(l => l.includes(prefix));
        return line ? line.replace(prefix, '').replace(/^[*-]\s*/, '').trim() : '';
      };

      const cropType = getValueFromLine('Crop Type:');
      const commonName = getValueFromLine('Common Name:');
      const hindiName = getValueFromLine('Hindi Name:');
      const variety = getValueFromLine('Variety:');
      const description = lines.find(l => l.includes('Description:'))?.replace('Description:', '').trim() || '';

      return cropType && commonName ? {
        cropType,
        commonName,
        hindiName,
        variety,
        description
      } : null;
    } catch (err) {
      console.error('Error parsing prediction:', err);
      return null;
    }
  };

  const handleSave = async () => {
    const farmId = localStorage.getItem("farmId");
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
        window.location.href = "/farmerdashboard";
      }
    } catch (error) {
      console.error("Error saving crop data:", error);
    }
  };

  React.useEffect(() => {
    const fetchPredictions = async () => {
      setLoading(true);
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const farmId = urlParams.get('farmId');
        
        if (!farmId) {
          throw new Error('No farm ID found in URL parameters');
        }

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
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        if (data.status === 'error') {
          throw new Error(data.message);
        }
        
        setPredictions(data.predictions);
      } catch (err) {
        setError(err.message || 'Failed to connect to the server');
      } finally {
        setLoading(false);
      }
    };

    fetchPredictions();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-12 space-y-8 bg-gradient-to-b from-yellow-50 to-yellow-100">
        <div className="relative">
          <Sprout className="w-16 h-16 text-emerald-600 animate-bounce" />
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-8 h-1 bg-emerald-300 rounded-full opacity-50" />
        </div>
        <div className="flex flex-col items-center gap-4 max-w-2xl text-center">
          <div className="bg-white/80 backdrop-blur-sm px-8 py-4 rounded-2xl border border-emerald-200 shadow-xl">
            <h2 className="text-3xl font-bold text-emerald-800 mb-2">
              <TranslatedText text="AgroBooster" />
            </h2>
            <p className="text-xl text-emerald-600">
              <TranslatedText text="Analyzing your farm's unique characteristics to predict optimal crops for maximum yield..." />
            </p>
          </div>
          <div className="flex gap-3">
            <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse" />
            <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse delay-150" />
            <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse delay-300" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto my-8 p-6 bg-red-50 rounded-lg border border-red-200">
        <h3 className="text-xl font-semibold text-red-700 mb-2">
          <TranslatedText text="Error" />
        </h3>
        <p className="text-red-600">{error}</p>
        <div className="mt-4">
          <p className="text-sm text-gray-600">
            <TranslatedText text="Please ensure:" />
          </p>
          <ul className="list-disc ml-6 mt-2 text-sm text-gray-600">
            <li><TranslatedText text="The Flask server is running on port 4000" /></li>
            <li><TranslatedText text="MongoDB is running and accessible" /></li>
            <li><TranslatedText text="Your farm ID is correctly stored in local storage" /></li>
          </ul>
        </div>
      </div>
    );
  }

  const parsedPredictions = predictions
    ?.split('\n\n')
    .map(parsePrediction)
    .filter(Boolean);

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
          <h2 className="text-4xl font-bold text-yellow-900 mb-4">
            <TranslatedText text="Crop Predictions" />
          </h2>
        </div>

        {/* Input Section */}

        {/* Description Section */}
        <div className="max-w-3xl mx-auto mb-12 bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-emerald-100">
          <div className="flex items-center gap-4">
            <div className="flex-shrink-0">
              <Sprout className="w-8 h-8 text-emerald-600" />
            </div>
            <p className="text-xl font-medium leading-relaxed bg-gradient-to-r from-emerald-800 to-emerald-600 bg-clip-text text-transparent">
              <TranslatedText text="Discover your farm's potential with our tailored crop recommendations, carefully selected based on your unique soil composition and local climate conditions" />
            </p>
          </div>
        </div>

        {/* Predictions Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {parsedPredictions && parsedPredictions.map((prediction, index) => {
            const IconComponent = cardIcons[index % cardIcons.length];
            return (
              <div
                key={index}
                className={`${cardColors[index % cardColors.length]} backdrop-blur-sm rounded-2xl border border-gray-200 p-6 hover:shadow-xl transition-all duration-300 shadow-lg transform hover:-translate-y-1`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <IconComponent className="w-6 h-6 text-emerald-600" />
                  <span >
                  <TranslatedText text={prediction.cropType} className="text-sm font-medium text-emerald-700 bg-white/60 px-4 py-1 rounded-full"/>
                  </span>
                </div>
                
                <h3 >
                <TranslatedText text={prediction.commonName} className="text-2xl font-bold text-gray-900 mb-6"/>
                </h3>
                
                
                
                <div className="mb-4 p-4 bg-white/60 rounded-xl">
                  <h4 className="font-medium text-base text-gray-800 mb-2">
                    <TranslatedText text="Recommended Varieties" />
                  </h4>
                  <TranslatedText text={prediction.variety} className="text-sm text-gray-700"/>
                </div>
                
                <div className="p-4 bg-white/60 rounded-xl">
                  <h4 className="font-medium text-base text-gray-800 mb-2">
                    <TranslatedText text="Growing Guide" />
                  </h4>
                  <p>
                  <TranslatedText text={prediction.description} className="text-sm text-gray-700 leading-relaxed" />
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="mb-12 max-w-3xl mx-auto mt-20">
          <div className="bg-white/90 backdrop-blur-sm p-8 rounded-xl shadow-lg border border-emerald-100">
            <h3 className="text-2xl text-emerald-700 font-semibold mb-4">
              <TranslatedText text="Save Your Selection" />
            </h3>
            
            <div className="mb-6">
              <p className="text-lg text-emerald-600 mb-10">
                <TranslatedText text="Select your preferred crop and variety for your farm." />
              </p>
              <input
                type="text"
                placeholder="Crop Name"
                className="flex-1 px-6 py-3 border-2 border-emerald-200 rounded-full focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white/90 text-lg"
                onChange={(e) => setCrop(e.target.value)}
              />
              <input
                type="text"
                placeholder="Variety"
                className="flex-1 px-6 ml-5 py-3 border-2 border-emerald-200 rounded-full focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white/90 text-lg"
                onChange={(e) => setVariety(e.target.value)}
              />
            </div>
            <div className="flex gap-4 mb-8">
              <button
                onClick={handleSave}
                className="flex items-center justify-center gap-2 p-4 text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-md transition-all duration-300"
              >
                <Save className="w-5 h-5" />
                <TranslatedText text="Save" />
              </button>
            </div>
          </div>
        </div>
    </div>
  );
}

export default CropPrediction;
