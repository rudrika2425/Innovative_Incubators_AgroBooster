import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MapPin, ExternalLink, Plus, Sprout, Leaf, Home } from 'lucide-react';
import { useUser } from '../Context/UserContext';
import { useNavigate } from 'react-router-dom';

const YourFarms = () => {
  const [farms, setFarms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useUser();
  const navigate = useNavigate();

  const FloatingElements = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute animate-float opacity-40"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animation: `float ${8 + Math.random() * 4}s infinite ${Math.random() * 2}s`,
            zIndex: 0
          }}
        >
          {i % 2 === 0 ? (
            <Leaf className="w-8 h-8 text-emerald-600" />
          ) : (
            <Sprout className="w-9 h-9 text-lime-600" />
          )}
        </div>
      ))}
    </div>
  );

  useEffect(() => {
    const fetchFarms = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:4000/farmer_data/get-all-farmer-data/${user.id}`);
        setFarms(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching farms:', error);
        setIsLoading(false);
      }
    };

    fetchFarms();
  }, [user.id]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-yellow-100 flex items-center justify-center">
        <div className="text-2xl text-emerald-800 font-semibold">Loading farms...</div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-yellow-50 to-yellow-100">
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-30px) rotate(5deg); }
        }
      `}</style>

      <FloatingElements />

      <div className="relative z-10">
        <div className="sticky bg-gradient-to-b from-yellow-50 to-yellow-100 backdrop-blur-sm shadow-md fix">
          <div className="max-w-7xl mx-auto py-4 px-6 flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-yellow-100 rounded-full shadow-lg">
                <Home className="w-8 h-8 text-yellow-600" />
              </div>
              <h1 className="text-3xl font-bold text-yellow-900">Your Farms</h1>
            </div>
            <a
              href="/farmer-Information/basicinformation"
              className="inline-flex items-center gap-2 bg-yellow-600 text-white px-6 py-3 rounded-full hover:bg-yellow-700 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <Plus className="w-5 h-5" />
              <span>Add New Farm</span>
            </a>
          </div>
        </div>

        <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
          {farms.map((farm) => (
            <div
              key={farm._id}
              className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              <div className="p-6">
                <h2 className="text-2xl font-bold text-emerald-800 mb-3">{farm.farmerInput.farmName}</h2>

                <div className="flex items-center text-gray-700 mb-3">
                  <MapPin className="mr-2 text-emerald-500" size={20} />
                  <span>{farm.location.city}, {farm.location.region}</span>
                </div>

                <div className="mt-4 text-gray-600 space-y-2">
                  <p className="flex items-center gap-2">
                    <Sprout className="w-5 h-5 text-emerald-500" />
                    Land Area: {farm.farmerInput.landArea} acres
                  </p>
                  <p className="flex items-center gap-2">
                    <Leaf className="w-5 h-5 text-emerald-500" />
                    Irrigation: {farm.farmerInput.irrigationSystem}
                  </p>
                </div>

                <button
                  onClick={() => navigate(`/farmerdashboard/farm-details/${farm._id}`)}
                  className="mt-6 flex items-center justify-center w-full py-3 px-6 bg-emerald-600 text-white rounded-full hover:bg-emerald-700 transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  <span>View More Details</span>
                  <ExternalLink className="ml-2" size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default YourFarms;