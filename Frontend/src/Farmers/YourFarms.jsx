import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MapPin, ExternalLink } from 'lucide-react';
import { useUser } from '../Context/UserContext';
import { useNavigate } from 'react-router-dom';

const YourFarms = () => {
    const [farms, setFarms] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { user } = useUser();
    const navigate = useNavigate();

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
    }, []);

    if (isLoading) {
        return <div className="text-center py-10">Loading farms...</div>;
    }

    return (
        <div>
            <div className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto py-4 px-6">
                    <h1 className="text-2xl font-bold text-gray-800">Your Farms</h1>
                </div>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
                {farms.map((farm) => (
                    <div 
                        key={farm._id} 
                        className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
                    >
                        <div className="p-6">
                            <h2 className="text-xl font-bold mb-2">{farm.farmerInput.farmName}</h2>
                            
                            <div className="flex items-center text-gray-600 mb-2">
                                <MapPin className="mr-2 text-blue-500" size={20} />
                                <span>{farm.location.city}, {farm.location.region}</span>
                            </div>
                            
                            <div className="mt-4 text-sm text-gray-500">
                                <p>Land Area: {farm.farmerInput.landArea} acres</p>
                                <p>Irrigation: {farm.farmerInput.irrigationSystem}</p>
                            </div>

                            <button
                                onClick={() => navigate(`/farmerdashboard/farm-details/${farm._id}`)}
                                className="mt-4 flex items-center justify-center w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                            >
                                <span>View More Details</span>
                                <ExternalLink className="ml-2" size={16} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default YourFarms;