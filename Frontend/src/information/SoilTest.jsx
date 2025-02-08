import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone, faXmark, faLocationCrosshairs } from '@fortawesome/free-solid-svg-icons';
import Test from './SoilAnalysis.jsx';

const SoilTest = () => {
  const [selectedState, setSelectedState] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [filteredLabs, setFilteredLabs] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState("en-IN");
  const [languageLocked, setLanguageLocked] = useState(false);
  const [isListeningState, setIsListeningState] = useState(false);
  const [isListeningDistrict, setIsListeningDistrict] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Function to get user's current location
  const getCurrentLocation = () => {
    setIsLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });
          await searchNearbyLabs(latitude, longitude);
          setIsLoading(false);
        },
        (error) => {
          console.error("Error getting location:", error);
          setIsLoading(false);
          alert("Unable to get your location. Please try entering your state and district manually.");
        }
      );
    } else {
      alert("Geolocation is not supported by your browser");
      setIsLoading(false);
    }
  };

  // Function to search for nearby labs using Google Places API
  const searchNearbyLabs = async (latitude, longitude) => {
    try {
      const response = await fetch(`http://127.0.0.1:4000/api/search-labs?lat=${latitude}&lng=${longitude}`);
      const data = await response.json();
      
      // Transform the Google Places results into our lab format
      const labResults = data.results.map(place => ({
        state: place.address_components.find(comp => comp.types.includes("administrative_area_level_1"))?.long_name || "",
        district: place.address_components.find(comp => comp.types.includes("administrative_area_level_2"))?.long_name || "",
        labName: place.name,
        address: place.formatted_address,
        email: place.email || "Contact for email",
        phone: place.formatted_phone_number || "N/A"
      }));

      setFilteredLabs(labResults);
    } catch (error) {
      console.error("Error searching labs:", error);
      alert("Error searching for nearby labs. Please try again.");
    }
  };

  // Function to search labs by state and district
  const handleSearch = async () => {
    if (!selectedState && !selectedDistrict) {
      alert("Please enter either state, district, or use current location");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`http://127.0.0.1:4000/api/search-labs-location?state=${selectedState}&district=${selectedDistrict}`);
      const data = await response.json();
      
      const labResults = data.results.map(place => ({
        state: place.address_components.find(comp => comp.types.includes("administrative_area_level_1"))?.long_name || "",
        district: place.address_components.find(comp => comp.types.includes("administrative_area_level_2"))?.long_name || "",
        labName: place.name,
        address: place.formatted_address,
        email: place.email || "Contact for email",
        phone: place.formatted_phone_number || "N/A"
      }));

      setFilteredLabs(labResults);
    } catch (error) {
      console.error("Error searching labs:", error);
      alert("Error searching for labs. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVoiceInput = (field) => {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = selectedLanguage;
    recognition.start();
    
    if (field === "state") {
      setIsListeningState(true);
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setSelectedState(transcript);
      };
    } else if (field === "district") {
      setIsListeningDistrict(true);
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setSelectedDistrict(transcript);
      };
    }

    setLanguageLocked(true);

    recognition.onend = () => {
      if (field === "state") {
        setIsListeningState(false);
      } else if (field === "district") {
        setIsListeningDistrict(false);
      }
    };
  };

  return (
    <div className="bg-white p-4 md:p-6 rounded-lg shadow-lg">
      {/* Header Section */}
      <div className="space-y-4 md:space-y-6">
        <h2 className="text-2xl md:text-4xl font-bold text-green-600">
          Soil Testing Agencies
        </h2>
        
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <p className="text-base md:text-lg">
            Find nearby soil testing agencies or upload your soil test report.
          </p>
          
          <div className="w-full md:w-64">
            <label className="block font-semibold mb-2">Select Language</label>
            <select
              value={selectedLanguage}
              onChange={(e) => !languageLocked && setSelectedLanguage(e.target.value)}
              className="w-full border rounded-lg p-2"
              disabled={languageLocked}
            >
              <option value="en-IN">English</option>
              <option value="hi-IN">Hindi</option>
            </select>
          </div>
        </div>
      </div>

      {/* Search Section */}
      <div className="mt-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {/* State Input */}
          <div>
            <label htmlFor="stateInput" className="block font-semibold mb-2">
              Select a State
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                id="stateInput"
                placeholder="Enter state"
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="flex-1 border rounded-lg p-2"
              />
              <button
                onClick={() => handleVoiceInput("state")}
                className="bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700 transition flex items-center gap-2"
              >
                <FontAwesomeIcon icon={isListeningState ? faXmark : faMicrophone} />
                <span className="hidden md:inline">Voice</span>
              </button>
            </div>
          </div>

          {/* District Input */}
          <div>
            <label htmlFor="districtInput" className="block font-semibold mb-2">
              Select a District
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                id="districtInput"
                placeholder="Enter district"
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
                className="flex-1 border rounded-lg p-2"
              />
              <button
                onClick={() => handleVoiceInput("district")}
                className="bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700 transition flex items-center gap-2"
              >
                <FontAwesomeIcon icon={isListeningDistrict ? faXmark : faMicrophone} />
                <span className="hidden md:inline">Voice</span>
              </button>
            </div>
          </div>

          {/* Search Buttons */}
          <div className="flex items-end gap-2">
            <button
              onClick={handleSearch}
              disabled={isLoading}
              className="flex-1 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
            >
              {isLoading ? "Searching..." : "Search"}
            </button>
            <button
              onClick={getCurrentLocation}
              disabled={isLoading}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
            >
              <FontAwesomeIcon icon={faLocationCrosshairs} />
              <span className="hidden md:inline">Use Location</span>
            </button>
          </div>
        </div>
      </div>

      {/* Results Table */}
      {filteredLabs.length > 0 && (
        <div className="mt-6 overflow-x-auto">
          <table className="w-full min-w-[640px]">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left bg-green-100">State</th>
                <th className="px-4 py-2 text-left bg-green-100">District</th>
                <th className="px-4 py-2 text-left bg-green-100">Lab Name</th>
                <th className="px-4 py-2 text-left bg-green-100">Address</th>
                <th className="px-4 py-2 text-left bg-green-100">Contact</th>
              </tr>
            </thead>
            <tbody>
              {filteredLabs.map((lab, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="px-4 py-2">{lab.state}</td>
                  <td className="px-4 py-2">{lab.district}</td>
                  <td className="px-4 py-2">{lab.labName}</td>
                  <td className="px-4 py-2">{lab.address}</td>
                  <td className="px-4 py-2">
                    {lab.email}<br />
                    {lab.phone}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Test />
    </div>
  );
};

export default SoilTest;