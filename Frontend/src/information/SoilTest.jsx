import React, { useState,useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone, faXmark } from '@fortawesome/free-solid-svg-icons';
import labData from "./../LabData.js";
import Test from './Test';



const SoilTest = () => {
  const [selectedState, setSelectedState] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [filteredLabs, setFilteredLabs] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState("en-IN"); // Default language is English
  const [languageLocked, setLanguageLocked] = useState(false); // To lock the language dropdown
  const [isListening, setIsListening] = useState(false); // To track if voice input is in progress
  const [isListeningState, setIsListeningState] = useState(false); // Listening state for state input
  const [isListeningDistrict, setIsListeningDistrict] = useState(false);
  const [farmerData, setFarmerData] = useState(null);

  useEffect(() => {
    // Retrieve farmer input from localStorage
    const storedFarmerData = localStorage.getItem("farmerInput");
    if (storedFarmerData) {
      setFarmerData(JSON.parse(storedFarmerData));

      // Remove farmerInput from localStorage
      localStorage.removeItem("farmerInput");
    }
  }, []);

  console.log(farmerData)

  const handleSearch = () => {
    const results = labData.filter(
      (lab) =>
        lab.state.toLowerCase().includes(selectedState.toLowerCase()) &&
        lab.district.toLowerCase().includes(selectedDistrict.toLowerCase())
    );
    setFilteredLabs(results);
  };

  const handleVoiceInput = (field) => {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = selectedLanguage; // Use the selected language
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

    // Lock the language dropdown after the first voice input
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
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-4xl font-bold text-green-600 mb-1">
        Soil Testing Agencies
      </h2>
      <div className="flex flex-row">
        <p className="mb-4 text-lg -mr-15 mt-7">
          Find nearby soil testing agencies or upload your soil test report.
        </p>
        <div className="mb-4 ml-130">
          <label className="block font-semibold mb-2">Select Language</label>
          <select
            value={selectedLanguage}
            onChange={(e) => !languageLocked && setSelectedLanguage(e.target.value)}  // Disable if languageLocked is true
            className="block w-full border rounded-lg p-2"
            disabled={languageLocked} // Disable the dropdown once locked
          >
            <option value="en-IN">English</option>
            <option value="hi-IN">Hindi</option>
          </select>
        </div>
      </div>

      <div className="flex flex-row">
        <div className="mb-6 flex flex-row gap-56">
          <div>
            <label htmlFor="stateInput" className="block font-semibold mb-2">
              Select a State
            </label>
            <div className="flex items-center gap-4">
              <input
                type="text"
                id="stateInput"
                placeholder="Enter state"
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="block w-full border rounded-lg p-2 mb-4"
              />
              <button
                onClick={() => handleVoiceInput("state")}
                className="ml-2 bg-green-600 text-white px-4 py-2 rounded-lg flex flex-row gap-2 text-md -mt-4 hover:bg-green-700"
              >
                <FontAwesomeIcon className="mt-1" icon={isListening ? faXmark : faMicrophone} />
                <p className="">Voice</p>
              </button>
            </div>
          </div>
          <div>
            <label htmlFor="districtInput" className="block font-semibold mb-2">
              Select a District
            </label>
            <div className="flex items-center gap-4">
              <input
                type="text"
                id="districtInput"
                placeholder="Enter district"
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
                className="block w-full border rounded-lg p-2 mb-4"
              />
              <button
                onClick={() => handleVoiceInput("district")}
                className="ml-2 bg-green-600 text-white px-4 py-2 rounded-lg flex flex-row gap-2 text-md -mt-4 hover:bg-green-700"
              >
                <FontAwesomeIcon className="mt-1" icon={isListening ? faXmark : faMicrophone} />
                <p className="">Voice</p>
              </button>
            </div>
          </div>

          <button
            onClick={handleSearch}
            className="bg-green-600 text-white px-4 py-2 h-10 w-36 mt-8 rounded-lg hover:bg-green-700 transition mr-4"
          >
            Search
          </button>
        </div>
      </div>

      {filteredLabs.length > 0 && (
        <table className="w-full mt-6">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left bg-green-100">State</th>
              <th className="px-4 py-2 text-left bg-green-100">District</th>
              <th className="px-4 py-2 text-left bg-green-100">Lab Name</th>
              <th className="px-4 py-2 text-left bg-green-100">Address</th>
              <th className="px-4 py-2 text-left bg-green-100">Email</th>
            </tr>
          </thead>
          <tbody>
            {filteredLabs.map((lab, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="px-4 py-2">{lab.state}</td>
                <td className="px-4 py-2">{lab.district}</td>
                <td className="px-4 py-2">{lab.labName}</td>
                <td className="px-4 py-2">{lab.address}</td>
                <td className="px-4 py-2">{lab.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <Test/>
    </div>
  );
};

export default SoilTest;
