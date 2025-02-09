import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';


const FarmDetails = ({  onWeatherClick, onCalendarClick }) => {

   const { farmId } = useParams();   
  const [farm, setFarm] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFarmDetails = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:4000/farmer_data/farm/${farmId}`);   
        setFarm(response.data);
      } catch (err) {
        setError("Failed to fetch farm details.");
      }
    };
    
    fetchFarmDetails();
  }, [farmId]);
 
  const navigate = useNavigate();

  const handleCalendar = () => {
    navigate(`/farmerdashboard/farm-details/${farmId}/calendar`);
  };

  const handleWeather = () => {
    if (farm?.location) {
      navigate(`/farmerdashboard/weather-forecast?lat=${farm.location.latitude}&lon=${farm.location.longitude}`);
    } else {
      navigate("/farmerdashboard/weather-forecast");
    }
  };

  if (error) return <p className="text-red-500">{error}</p>;
  if (!farm) return <p>Loading farm details...</p>;


  const convertKelvinToCelsius = (kelvin) => {
    return (kelvin - 273.15).toFixed(1);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-gradient-to-r from-green-600 to-green-700 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-xl font-semibold">Farm Dashboard</h1>
            <div className="flex space-x-4">
              <button 
                onClick={handleWeather}
                className="flex items-center px-4 py-2 rounded-md bg-green-500 hover:bg-green-400 transition-colors"
              >
                Weather
              </button>
              <button 
                onClick={handleCalendar}
                className="flex items-center px-4 py-2 rounded-md bg-green-500 hover:bg-green-400 transition-colors"
              >
                Calendar
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Info Card */}
          <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
            <h2 className="text-2xl font-bold text-gray-800 border-b pb-2">
              {farm.farmerInput.farmName}
            </h2>
            <div className="space-y-2">
            
              <div className="flex items-center gap-2 text-lg text-gray-700">
                <span className="font-medium">{farm.farmerInput.landArea}</span>
                <span className="text-gray-500">acres</span>
              </div>
            </div>
            <div className="pt-4 space-y-2">
              <h3 className="font-semibold text-gray-700">Current Crop</h3>
              <div className="flex items-center gap-4">
                <div className="bg-green-100 px-3 py-1 rounded-full text-green-700">
                  {farm.crop}
                </div>
                <div className="bg-green-50 px-3 py-1 rounded-full text-green-600">
                  {farm.variety}
                </div>
              </div>
            </div>
          </div>

          {/* Weather Card */}
          <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
            <h2 className="text-xl font-bold text-gray-800 border-b pb-2">
              Current Weather
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-3xl font-bold text-gray-800">
                  {convertKelvinToCelsius(farm.weather.temperature)}°C
                </p>
                <p className="text-sm text-gray-500">
                  Feels like {convertKelvinToCelsius(farm.weather.feels_like)}°C
                </p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-gray-500">Humidity</span>
                  <span className="font-medium">{farm.weather.humidity}%</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-500">Wind</span>
                  <span className="font-medium">{farm.weather.wind_speed} m/s</span>
                </div>
              </div>
            </div>
            <p className="text-sm text-gray-600 capitalize pt-2">
              {farm.weather.weather_description}
            </p>
          </div>

          {/* Location Card */}
          <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
            <h2 className="text-xl font-bold text-gray-800 border-b pb-2">
              Location
            </h2>
            <div className="space-y-2">
              <p className="text-gray-700">
                {farm.location.city}, {farm.location.region}
              </p>
              <p className="text-gray-700">{farm.location.country}</p>
              <div className="pt-2 grid grid-cols-2 gap-2 text-sm">
                <div>
                  <p className="text-gray-500">Altitude</p>
                  <p className="font-medium">{farm.location.altitude} m</p>
                </div>
                <div>
                  <p className="text-gray-500">Zone</p>
                  <p className="font-medium">{farm.location.tropical_zone}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Tools and Equipment */}
          <div className="bg-white rounded-lg shadow-md p-6 col-span-1 lg:col-span-2">
            <h2 className="text-xl font-bold text-gray-800 border-b pb-2 mb-4">
              Farm Equipment
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {farm.farmerInput.farmingTools.map((tool, index) => (
                <div 
                  key={index}
                  className="bg-gray-50 px-4 py-2 rounded-lg text-gray-700 text-sm"
                >
                  {tool}
                </div>
              ))}
            </div>
          </div>

          {/* Irrigation and Soil */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 border-b pb-2 mb-4">
              Irrigation & Soil
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Irrigation System</h3>
                <p className="text-gray-700">{farm.farmerInput.irrigationSystem}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Soil Analysis</h3>
                <p className="text-gray-700">{farm.soilAnalysisReport}</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default FarmDetails;