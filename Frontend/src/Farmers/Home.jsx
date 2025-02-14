import React, { useState, useEffect } from "react";
import { Image as ImageIcon, Trash2, ArrowRight, RefreshCw } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useUser } from "../Context/UserContext";
import { TranslatedText } from '../languageTranslation/TranslatedText';
const Home = () => {
  const [myTools, setMyTools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const {user} = useUser();
  const farmerId = user.id;

  const fetchMyTools = async (farmerId) => {
    try {
      setLoading(true);
      const response = await fetch(
        `http://127.0.0.1:4000/tools/tools/farmer/${farmerId}`
      );
      if (!response.ok) throw new Error("Failed to fetch my tools");
      const data = await response.json();
      setMyTools(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch tools when component mounts or location changes
  useEffect(() => {
    if (farmerId) {
      fetchMyTools(farmerId);
    }
  }, [farmerId, location.key]); // Add location.key to dependencies

  const handleRefresh = () => {
    fetchMyTools(farmerId);
  };


  const handleDeleteTool = async (toolId) => {
    try {
      const response = await fetch(`http://127.0.0.1:4000/tools/tools/${toolId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to delete tool");
      }

      fetchMyTools(farmerId);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleImageUpdate = async (toolId, files) => {
    if (files.length > 5) {
      setError("Maximum 5 images allowed");
      return;
    }

    const formData = new FormData();
    Array.from(files).forEach((file) => {
      formData.append("images", file);
    });

    try {
      const response = await fetch(`http://127.0.0.1:4000/tools/tools/${toolId}/images`, {
        method: "PUT",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to update images");
      }

      fetchMyTools(farmerId);
    } catch (error) {
      setError(error.message);
    }
  };
  

  const ToolCard = ({ tool }) => (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group border-b-2 border-emerald-700">
      <div className="relative aspect-video overflow-hidden">
        <img
          src={tool.images?.[0] || "/api/placeholder/400/300"}
          alt={tool.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        {tool.images?.length > 1 && (
          <div className="absolute bottom-2 right-2 bg-emerald/70 text-white px-2 py-1 rounded-full text-xs flex items-center gap-1">
            <ImageIcon size={12} />
            <span>{tool.images.length}</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-emerald/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="text-xl font-semibold text-emerald-900">{tool.title}</h3>
            <p className="text-sm text-emerald-600">{tool.brand} {tool.model}</p>
          </div>
          <div className="text-right">
            <p className="text-lg font-bold text-emerald-600">₹{tool.rate}/day</p>
            {tool.deposit > 0 && (
              <p className="text-xs text-emerald-500">Deposit: ₹{tool.deposit}</p>
            )}
          </div>
        </div>
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-sm text-emerald-600">
            <span className="px-2 py-1 bg-emerald-50 text-emerald-700 rounded-full">{tool.category}</span>
            <span className="px-2 py-1 bg-emerald-50 text-emerald-700 rounded-full">{tool.condition}</span>
          </div>
          <p className="text-sm text-emerald-600">
            {tool.district}, {tool.state}
          </p>
        </div>
        <div className="mt-4 flex gap-2">
          <button
            onClick={() => handleDeleteTool(tool._id)}
            className="flex items-center gap-1 px-3 py-1.5 bg-red-50 text-red-600 rounded-full hover:bg-red-100 transition-colors"
          >
            <Trash2 size={16} />
            <span>Delete</span>
          </button>
          <label
            htmlFor={`file-upload-${tool._id}`}
            className="flex items-center gap-1 px-3 py-1.5 bg-emerald-50 text-emerald-600 rounded-full hover:bg-emerald-100 transition-colors cursor-pointer"
          >
            <ImageIcon size={16} />
            <span>Update Images</span>
          </label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => handleImageUpdate(tool._id, e.target.files)}
            className="hidden"
            id={`file-upload-${tool._id}`}
          />
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-yellow-50 to-yellow-100">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-yellow-100">
      <div className="sticky top-0 z-20 w-full bg-gradient-to-b from-yellow-50 to-yellow-100 backdrop-blur-sm shadow-md px-4">
        <div className="container mx-auto px-4 py-5">
          <h1 className="text-3xl font-bold text-yellow-900">
            <TranslatedText text="Manage your agricultural tools and equipment" />
          </h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg">
            <TranslatedText text={error} />
          </div>
        )}

        {myTools.length === 0 ? (
          <div className="max-w-2xl mx-auto">
            <div className="text-center py-12 bg-white/80 backdrop-blur-sm rounded-xl border border-emerald-200 shadow-lg">
              <ImageIcon size={48} className="mx-auto text-emerald-400 mb-4" />
              <h3 className="text-2xl font-semibold text-emerald-900 mb-2">
                <TranslatedText text="Start Your Equipment Listing" />
              </h3>
              <p className="text-emerald-700 mb-4 px-4">
                <TranslatedText text="Share your agricultural tools with other farmers and earn additional income" />
              </p>
              <div className="space-y-4">
                <div className="flex items-center justify-center gap-8 px-6">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <span className="text-emerald-600 font-bold">1</span>
                    </div>
                    <p className="text-sm text-emerald-700">
                      <TranslatedText text="List Your Tools" />
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <span className="text-emerald-600 font-bold">2</span>
                    </div>
                    <p className="text-sm text-emerald-700">
                      <TranslatedText text="Set Your Rates" />
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <span className="text-emerald-600 font-bold">3</span>
                    </div>
                    <p className="text-sm text-emerald-700">
                      <TranslatedText text="Start Earning" />
                    </p>
                  </div>
                </div>
                <Link 
                  to="/farmerdashboard/rent-out-tools"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors mx-auto"
                >
                  <TranslatedText text="Add Your First Tool" />
                  <ArrowRight size={20} />
                </Link>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl border border-emerald-200">
                <h4 className="text-lg font-semibold text-emerald-900 mb-2">
                  <TranslatedText text="Market Insights" />
                </h4>
                <p className="text-emerald-700 text-sm">
                  <TranslatedText text="Most demanded equipment in your area:" />
                </p>
                <ul className="mt-2 space-y-2">
                  <li className="flex items-center gap-2 text-sm text-emerald-600">
                    <span className="w-2 h-2 bg-emerald-400 rounded-full"></span>
                    <TranslatedText text="Tractor Implements" />
                  </li>
                  <li className="flex items-center gap-2 text-sm text-emerald-600">
                    <span className="w-2 h-2 bg-emerald-400 rounded-full"></span>
                    <TranslatedText text="Harvesting Equipment" />
                  </li>
                  <li className="flex items-center gap-2 text-sm text-emerald-600">
                    <span className="w-2 h-2 bg-emerald-400 rounded-full"></span>
                    <TranslatedText text="Irrigation Systems" />
                  </li>
                </ul>
              </div>
              
              <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl border border-emerald-200">
                <h4 className="text-lg font-semibold text-emerald-900 mb-2">
                  <TranslatedText text="Benefits" />
                </h4>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-sm text-emerald-700">
                    <span className="w-2 h-2 bg-emerald-400 rounded-full"></span>
                    <TranslatedText text="Extra income from idle equipment" />
                  </li>
                  <li className="flex items-center gap-2 text-sm text-emerald-700">
                    <span className="w-2 h-2 bg-emerald-400 rounded-full"></span>
                    <TranslatedText text="Help other farmers in your community" />
                  </li>
                  <li className="flex items-center gap-2 text-sm text-emerald-700">
                    <span className="w-2 h-2 bg-emerald-400 rounded-full"></span>
                    <TranslatedText text="Secure rental process" />
                  </li>
                </ul>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {myTools.map((tool) => (
              <ToolCard key={tool._id} tool={tool} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;