import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { WiDaySunny } from 'react-icons/wi';  // Weather icon
import { BsCalendar } from 'react-icons/bs'; // Calendar icon

const FarmDetails = () => {
  const { farmId } = useParams();  // Get the farmId from the URL
  const [farm, setFarm] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFarmDetails = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:4000/farmer_data/farm/${farmId}`);  // Call the Flask API
        setFarm(response.data);
      } catch (err) {
        setError("Failed to fetch farm details.");
      }
    };
    
    fetchFarmDetails();
  }, [farmId]);

  if (error) return <p className="text-red-500">{error}</p>;
  if (!farm) return <p>Loading farm details...</p>;

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Navbar */}
      <nav className="bg-green-700 text-white p-4 flex justify-between items-center shadow-lg">
        <h1 className="text-xl font-bold">Farm Dashboard</h1>
        <div className="flex space-x-6 text-2xl">
          <WiDaySunny className="cursor-pointer" title="Weather Info" />
          <BsCalendar className="cursor-pointer" title="Calendar" />
        </div>
      </nav>

      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6 mt-6">
        <h1 className="text-2xl font-bold text-green-700 mb-4">Farm Details</h1>

        {/* Farm Information */}
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-gray-800">General Information</h2>
          <p><span className="font-semibold">Farm ID:</span> {farm._id}</p>
          <p><span className="font-semibold">Farmer ID:</span> {farm.farmerId}</p>
          <p><span className="font-semibold">Farm Name:</span> {farm.farmerInput.farmName}</p>
          <p><span className="font-semibold">Land Area:</span> {farm.farmerInput.landArea} acres</p>
        </div>

        {/* Farming Tools */}
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Farming Tools</h2>
          <ul className="list-disc list-inside">
            {farm.farmerInput.farmingTools.map((tool, index) => (
              <li key={index}>{tool}</li>
            ))}
          </ul>
        </div>

        {/* Location Information */}
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Location</h2>
          <p><span className="font-semibold">City:</span> {farm.location.city}</p>
          <p><span className="font-semibold">Region:</span> {farm.location.region}</p>
          <p><span className="font-semibold">Country:</span> {farm.location.country}</p>
          <p><span className="font-semibold">Altitude:</span> {farm.location.altitude} m</p>
          <p><span className="font-semibold">Latitude:</span> {farm.location.latitude}</p>
          <p><span className="font-semibold">Longitude:</span> {farm.location.longitude}</p>
          <p><span className="font-semibold">Tropical Zone:</span> {farm.location.tropical_zone}</p>
        </div>

        {/* Weather Information */}
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Weather</h2>
          <p><span className="font-semibold">Temperature:</span> {farm.weather.temperature} K</p>
          <p><span className="font-semibold">Feels Like:</span> {farm.weather.feels_like} K</p>
          <p><span className="font-semibold">Humidity:</span> {farm.weather.humidity}%</p>
          <p><span className="font-semibold">Pressure:</span> {farm.weather.pressure} hPa</p>
          <p><span className="font-semibold">Wind Speed:</span> {farm.weather.wind_speed} m/s</p>
          <p><span className="font-semibold">Cloud Coverage:</span> {farm.weather.cloud_coverage}%</p>
          <p><span className="font-semibold">Weather Description:</span> {farm.weather.weather_description}</p>
          <p><span className="font-semibold">Date/Time (UTC):</span> {farm.weather.date_time_utc}</p>
        </div>

        {/* Irrigation System and Soil Analysis */}
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Irrigation and Soil</h2>
          <p><span className="font-semibold">Irrigation System:</span> {farm.farmerInput.irrigationSystem}</p>
          <p><span className="font-semibold">Soil Analysis Report:</span> {farm.soilAnalysisReport}</p>
        </div>

        {/* Crop Information */}
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Crop Details</h2>
          <p><span className="font-semibold">Crop:</span> {farm.crop}</p>
          <p><span className="font-semibold">Variety:</span> {farm.variety}</p>
        </div>
      </div>
    </div>
  );
};

export default FarmDetails;
