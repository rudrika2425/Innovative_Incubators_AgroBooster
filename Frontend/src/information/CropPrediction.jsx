import React, { useState, useEffect } from 'react';

const CropPrediction = () => {
  const [predictions, setPredictions] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  useEffect(() => {
    const fetchPredictions = async () => {
      setLoading(true);
      try {
        const farmId = localStorage.getItem('farmId');
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
    <div className="max-w-6xl mx-auto my-12 bg-white rounded-xl shadow-lg p-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-8">Crop Predictions</h2>
      
      {parsedPredictions.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {parsedPredictions.map((prediction, index) => (
            <div 
              key={index}
              className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow"
            >
              <div className="mb-4">
                <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                  {prediction.cropType}
                </span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {prediction.commonName}
              </h3>
              {prediction.hindiName && (
                <p className="text-gray-600 mb-2">{prediction.hindiName}</p>
              )}
              <div className="mb-4">
                <h4 className="font-medium text-gray-700 mb-1">Varieties:</h4>
                <p className="text-gray-600">{prediction.variety}</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-700 mb-1">Description:</h4>
                <p className="text-gray-600 text-sm">{prediction.description}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-gray-600">No valid predictions found. Please try again.</p>
        </div>
      )}
    </div>
  );
};

export default CropPrediction;