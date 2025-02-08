import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone, faXmark, faLocationCrosshairs, faMap, faDirections } from '@fortawesome/free-solid-svg-icons';
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
  const [showMap, setShowMap] = useState(false);
  const [selectedLab, setSelectedLab] = useState(null);
  const YOUR_GOOGLE_MAPS_API_KEY = "AIzaSyAF5JeH_iVKoIf_eLWiSeVkANZsDO4Ertk";

  const getCurrentLocation = () => {
    setIsLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          const userLoc = { lat: latitude, lng: longitude };
          console.log("User location set:", userLoc);
          setUserLocation(userLoc);
          try {
            await searchNearbyLabs(latitude, longitude);
          } catch (error) {
            console.error("Error searching nearby labs:", error);
            alert("Error finding nearby labs. Please try again.");
          }
          setIsLoading(false);
        },
        (error) => {
          console.error("Geolocation error:", error);
          setIsLoading(false);
          const defaultLocation = { lat: 20.5937, lng: 78.9629 };
          setUserLocation(defaultLocation);
          alert("Unable to get precise location. Using default location.");
        },
        { timeout: 10000, maximumAge: 0, enableHighAccuracy: true }
      );
    } else {
      setIsLoading(false);
      alert("Geolocation is not supported by your browser");
    }
  };

  const searchNearbyLabs = async (latitude, longitude) => {
    try {
      const response = await fetch(`http://127.0.0.1:4000/api/search-labs?lat=${latitude}&lng=${longitude}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log("API Response:", data);
      
      if (!data.results || data.results.length === 0) {
        alert("No labs found in this area. Please try a different location.");
        return;
      }

      const labResults = data.results
        .map(place => {
          if (!place.geometry?.location) {
            console.log("Lab missing location:", place);
            return null;
          }
          return {
            labName: place.name,
            address: place.formatted_address,
            email: place.email || "Contact for email",
            phone: place.formatted_phone_number || "N/A",
            location: {
              lat: place.geometry.location.lat,
              lng: place.geometry.location.lng
            }
          };
        })
        .filter(lab => lab !== null);

      console.log("Processed lab results:", labResults);
      setFilteredLabs(labResults);
    } catch (error) {
      console.error("Error searching labs:", error);
      alert("Error searching for nearby labs. Please try again.");
    }
  };

  const handleSearch = async () => {
    if (!selectedState && !selectedDistrict) {
      alert("Please enter either state, district, or use current location");
      return;
    }

    setIsLoading(true);
    try {
      // First, geocode the entered location
      const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
        `${selectedDistrict} ${selectedState} India`
      )}&key=${YOUR_GOOGLE_MAPS_API_KEY}`;
      
      const geocodingResponse = await fetch(geocodeUrl);
      const geocodingData = await geocodingResponse.json();
      
      if (geocodingData.results && geocodingData.results[0]) {
        const location = geocodingData.results[0].geometry.location;
        console.log("Geocoded location:", location);
        setUserLocation({ lat: location.lat, lng: location.lng });
        
        // Search for labs using the geocoded coordinates
        const response = await fetch(
          `http://127.0.0.1:4000/api/search-labs-location?state=${selectedState}&district=${selectedDistrict}`
        );
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log("Lab search response:", data);

        const labResults = data.results
          .map(place => {
            if (!place.geometry?.location) {
              console.log("Lab missing location:", place);
              return null;
            }
            return {
              labName: place.name,
              address: place.formatted_address,
              email: place.email || "Contact for email",
              phone: place.formatted_phone_number || "N/A",
              location: {
                lat: place.geometry.location.lat,
                lng: place.geometry.location.lng
              }
            };
          })
          .filter(lab => lab !== null);

        console.log("Processed lab results:", labResults);
        setFilteredLabs(labResults);
      } else {
        alert("Location not found. Please check the entered state and district.");
      }
    } catch (error) {
      console.error("Error during search:", error);
      alert("Error searching for labs. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVoiceInput = (field) => {
    if (!window.SpeechRecognition && !window.webkitSpeechRecognition) {
      alert("Speech recognition is not supported in your browser");
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = selectedLanguage;
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
      if (field === "state") {
        setIsListeningState(true);
      } else {
        setIsListeningDistrict(true);
      }
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      if (field === "state") {
        setSelectedState(transcript);
      } else {
        setSelectedDistrict(transcript);
      }
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      alert("Error with voice input. Please try again or type manually.");
    };

    recognition.onend = () => {
      if (field === "state") {
        setIsListeningState(false);
      } else {
        setIsListeningDistrict(false);
      }
    };

    recognition.start();
    setLanguageLocked(true);
  };

  const handleMapView = (lab) => {
    console.log("handleMapView called with lab:", lab);
    if (!lab.location) {
      alert("Location information for this lab is not available.");
      return;
    }

    if (!userLocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newUserLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          console.log("Setting user location:", newUserLocation);
          setUserLocation(newUserLocation);
          setSelectedLab(lab);
          setShowMap(true);
        },
        (error) => {
          console.error("Error getting user location:", error);
          setSelectedLab(lab);
          setShowMap(true);
        }
      );
    } else {
      console.log("Using existing user location:", userLocation);
      setSelectedLab(lab);
      setShowMap(true);
    }
  };

  const MapView = ({ userLocation, labLocation, onClose }) => {
    useEffect(() => {
      let map, directionsService, directionsRenderer;
      console.log("MapView mounted with:", { userLocation, labLocation });

      const loadMap = async () => {
        try {
          // Load Google Maps script
          await new Promise((resolve, reject) => {
            if (window.google && window.google.maps) {
              resolve();
              return;
            }

            const script = document.createElement('script');
            script.src = `https://maps.googleapis.com/maps/api/js?key=${YOUR_GOOGLE_MAPS_API_KEY}`;
            script.async = true;
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
          });

          const mapElement = document.getElementById('map');
          if (!mapElement) {
            console.error("Map element not found");
            return;
          }

          // Initialize map
          map = new google.maps.Map(mapElement, {
            zoom: 12,
            center: userLocation || labLocation,
            mapTypeControl: true,
            fullscreenControl: true,
            streetViewControl: true,
            zoomControl: true
          });

          // Initialize directions service and renderer
          directionsService = new google.maps.DirectionsService();
          directionsRenderer = new google.maps.DirectionsRenderer({
            map: map,
            suppressMarkers: false,
            preserveViewport: false
          });

          if (!userLocation) {
            // Show only lab location if user location is not available
            console.log("Showing only lab location");
            new google.maps.Marker({
              position: labLocation,
              map: map,
              title: selectedLab?.labName,
              animation: google.maps.Animation.DROP
            });
          } else {
            // Calculate and display route
            console.log("Calculating route");
            const request = {
              origin: userLocation,
              destination: labLocation,
              travelMode: google.maps.TravelMode.DRIVING,
              optimizeWaypoints: true
            };

            directionsService.route(request, (result, status) => {
              if (status === google.maps.DirectionsStatus.OK) {
                console.log("Route calculated successfully");
                directionsRenderer.setDirections(result);
              } else {
                console.error('Directions request failed:', status);
                alert("Unable to get directions. Showing locations only.");
                
                // Add markers if directions fail
                new google.maps.Marker({
                  position: userLocation,
                  map: map,
                  title: "Your Location",
                  animation: google.maps.Animation.DROP
                });
                new google.maps.Marker({
                  position: labLocation,
                  map: map,
                  title: selectedLab?.labName,
                  animation: google.maps.Animation.DROP
                });

                // Fit bounds to show both markers
                const bounds = new google.maps.LatLngBounds();
                bounds.extend(userLocation);
                bounds.extend(labLocation);
                map.fitBounds(bounds);
              }
            });
          }
        } catch (error) {
          console.error("Error loading map:", error);
          alert("Error loading map. Please try again.");
        }
      };

      loadMap();

      return () => {
        if (directionsRenderer) {
          directionsRenderer.setMap(null);
        }
      };
    }, [userLocation, labLocation]);

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg w-full max-w-4xl">
          <div className="p-4 border-b flex justify-between items-center">
            <h3 className="text-xl font-bold">
              {userLocation ? 'Directions to ' : 'Location of '}{selectedLab?.labName}
            </h3>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <FontAwesomeIcon icon={faXmark} size="lg" />
            </button>
          </div>
          <div id="map" className="w-full h-[500px] rounded-b-lg"></div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-gradient-to-b from-emerald-50 to-emerald-100  p-4 md:p-6 rounded-lg shadow-lg">
     
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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

      {/* Results Section */}
      {filteredLabs.length > 0 && (
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredLabs.map((lab, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="p-4">
                <h3 className="text-lg font-semibold text-green-600 mb-2">{lab.labName}</h3>
                <div className="space-y-2 text-gray-600">
                  <p className="text-sm">{lab.address}</p>
                  <div className="border-t pt-2">
                    <p className="text-sm">{lab.email}</p>
                    <p className="text-sm">{lab.phone}</p>
                  </div>
                </div>
                <div className="mt-4 flex justify-end">
                  <button
                    onClick={() => handleMapView(lab)}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
                  >
                    <FontAwesomeIcon icon={faDirections} />
                    <span>Get Directions</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

{showMap && selectedLab && (
  <MapView
    userLocation={userLocation}
    labLocation={selectedLab.location} // Ensure this is correct
    onClose={() => setShowMap(false)}
  />
)}

      <Test />
    </div>
  );
};

export default SoilTest;