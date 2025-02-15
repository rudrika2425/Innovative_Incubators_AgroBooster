import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { TranslatedText } from "../languageTranslation/TranslatedText";

const FarmDetails = ({ onWeatherClick, onCalendarClick }) => {
  const { farmId } = useParams();
  const [farm, setFarm] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  

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

  const handleDelete = async () => {
    if (window.confirm(<TranslatedText text="deleteConfirmation" />)) {
      try {
        await axios.delete(`http://127.0.0.1:4000/farmer_data/delete-farm/${farmId}`);
        navigate('/farmerdashboard');
      } catch (err) {
        setError(<TranslatedText text="deleteError" />);
      }
    }
  };

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


  const convertKelvinToCelsius = (kelvin) => {
    return (kelvin - 273.15).toFixed(1);
  };

  if (error) return <p className="text-red-500">{error}</p>;
  if (!farm) return <p><TranslatedText text="loading" /></p>;


  return (
    <div className="min-h-screen bg-emerald-50">
      {/* Navbar */}
      <nav className="sticky top-0 z-20 w-full bg-gradient-to-b from-yellow-50 to-yellow-100 backdrop-blur-sm shadow-md px-4 py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-3xl font-bold text-yellow-900">
              <TranslatedText text="farmDashboard" />
            </h1>
            <div className="flex space-x-4">
              <button
                onClick={handleWeather}
                className="flex items-center px-4 py-2 text-white rounded-md bg-yellow-600 hover:bg-yellow-500 transition-colors"
              >
                <TranslatedText text="weather" />
              </button>
              <button
                onClick={handleCalendar}
                className="flex items-center px-4 py-2 text-white rounded-md bg-yellow-600 hover:bg-yellow-500 transition-colors"
              >
                <TranslatedText text="calendar" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl min-h-screen mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-gradient-to-b from-yellow-50 to-yellow-100">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Info Card */}
          <div className="bg-white border-b-2 border-emerald-500 rounded-lg shadow-md p-6 space-y-4">
            <h2 className="text-2xl font-bold text-emerald-800 border-b border-emerald-500 pb-2">
            <TranslatedText text={farm.farmerInput.farmName} />
            </h2>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-lg text-emerald-700">
                <span className="font-medium"> <TranslatedText text={farm.farmerInput.landArea}/></span>
                <span className="text-emerald-500"><TranslatedText text="acres" /></span>
              </div>
            </div>
            <div className="pt-4 space-y-2">
              <h3 className="font-semibold text-emerald-700">
                <TranslatedText text="currentCrop" />
              </h3>
              <div className="flex items-center gap-4">
                <div className="bg-emerald-100 px-3 py-1 rounded-full text-emerald-700">
                <TranslatedText text={farm.crop} />
                </div>
                <div className="bg-emerald-50 px-3 py-1 rounded-full text-emerald-600">
                <TranslatedText text={farm.variety} />
                </div>
              </div>
            </div>
          </div>

          {/* Weather Card */}
          <div className="bg-white border-b-2 border-emerald-500 rounded-lg shadow-md p-6 space-y-4">
            <h2 className="text-xl font-bold text-emerald-800 border-b border-emerald-500 pb-2">
              <TranslatedText text="currentWeather" />
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-3xl font-bold text-emerald-800">
                <TranslatedText text= {convertKelvinToCelsius(farm.weather.temperature)} />°C
                </p>
                <p className="text-sm text-emerald-500">
                  <TranslatedText text="feelsLike" /> {convertKelvinToCelsius(farm.weather.feels_like)}°C
                </p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-emerald-500"><TranslatedText text="humidity" /></span>
                  <span className="font-medium text-emerald-700"> <TranslatedText text={farm.weather.humidity}/>%</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-emerald-500"><TranslatedText text="wind" /></span>
                  <span className="font-medium text-emerald-700"><TranslatedText text={farm.weather.wind_speed}/>m/s</span>
                </div>
              </div>
            </div>
            <p className="text-sm text-emerald-600 capitalize pt-2">
            <TranslatedText text={farm.weather.weather_description}/>
            </p>
          </div>

          {/* Location Card */}
          <div className="bg-white border-b-2 border-emerald-500 rounded-lg shadow-md p-6 space-y-4">
            <h2 className="text-xl font-bold text-emerald-800 border-b border-emerald-500 pb-2">
              <TranslatedText text="location" />
            </h2>
            <div className="space-y-2">
              <p className="text-emerald-700">
              <TranslatedText text= {farm.location.city} />,  <TranslatedText text={farm.location.region}/>
              </p>
              <p className="text-emerald-700"> <TranslatedText text={farm.location.country}/></p>
              <div className="pt-2 grid grid-cols-2 gap-2 text-sm">
                <div>
                  <p className="text-emerald-500"><TranslatedText text="altitude" /></p>
                  <p className="font-medium text-emerald-700"> <TranslatedText text={farm.location.altitude} />m</p>
                </div>
                <div>
                  <p className="text-emerald-500"><TranslatedText text="zone" /></p>
                  <p className="font-medium text-emerald-700"> <TranslatedText text={farm.location.tropical_zone} /></p>
                </div>
              </div>
            </div>
          </div>

          {/* Tools and Equipment */}
          <div className="bg-white rounded-lg border-b-2 border-emerald-500 shadow-md p-6 col-span-1 lg:col-span-2">
            <h2 className="text-xl font-bold text-emerald-800 border-b border-emerald-500 pb-2 mb-4">
              <TranslatedText text="farmEquipment" />
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {farm.farmerInput.farmingTools.map((tool, index) => (
                <div
                  key={index}
                  className="bg-emerald-50 px-4 py-2 rounded-lg text-emerald-700 text-sm"
                >
                  <TranslatedText text={tool} /> 
                </div>
              ))}
            </div>
          </div>

          {/* Irrigation and Soil */}
          <div className="bg-white rounded-lg border-b-2 border-emerald-500 shadow-md p-6">
            <h2 className="text-xl font-bold text-emerald-800 border-b border-emerald-500 pb-2 mb-4">
              <TranslatedText text="irrigationSoil" />
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-emerald-500">
                  <TranslatedText text="irrigationSystem" />
                </h3>
                <p className="text-emerald-700"> <TranslatedText text={farm.farmerInput.irrigationSystem} /></p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-emerald-500">
                  <TranslatedText text="soilAnalysis" />
                </h3>
                <p className="text-emerald-700"> <TranslatedText text={farm.soilAnalysisReport}/></p>
              </div>
            </div>
          </div>
        </div>

        {/* Delete Button */}
        <div className="mt-8 flex justify-end mr-4">
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            <TranslatedText text="deleteFarm" />
          </button>
        </div>
      </main>
    </div>
  );
};

export default FarmDetails;