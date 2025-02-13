import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMicrophone, faXmark } from "@fortawesome/free-solid-svg-icons";
import {Wheat} from "lucide-react";
import { TranslatedText } from "../languageTranslation/TranslatedText";

const FarmerInput = () => {
  const [formData, setFormData] = useState({
    farmName: "",
    landArea: "",
    farmingTools: [],
    irrigationSystem: "",
    soilType: "",
    cropSeason: "",
  });

  const [isListening, setIsListening] = useState(false);
  const [currentField, setCurrentField] = useState(null);
  const [language, setLanguage] = useState("en-US");
  const [isLanguageLocked, setIsLanguageLocked] = useState(false);

  const soilTypes = [
    "Khadar (New Alluvium)",
    "Bhangar (Old Alluvium)",
    "Shallow emerald Soil",
    "Deep emerald Soil",
    "Yellowish-Red Soil",
    "Reddish-Brown Soil",
    "Upland Laterite",
    "Lowland Laterite",
    "Sandy Soil",
    "Loamy Desert Soil",
    "Usara Soil",
    "Kallar Soil",
    "Kari Soil (Kerala)",
    "Jalki Soil",
    "Podzolic Soil",
    "Humus-Rich Soil",
  ];

  const cropSeasons = [
    { name: "Kharif", period: "Rainy Season (June-October)" },
    { name: "Rabi", period: "Winter Season (October-March)" },
    { name: "Zaid", period: "Summer Season (March-June)" },
  ];

  const farmingToolsList = [
    "Tractor",
    "Plough",
    "Harvester",
    "Sprayer",
    "Cultivator",
    "Seeder",
    "Water Pump",
    "Plow",
    "Rake",
    "Hoe",
  ];

  const irrigationSystems = [
    "Drip Irrigation",
    "Sprinkler Irrigation",
    "Flood Irrigation",
    "Surface Irrigation",
    "Subsurface Irrigation",
  ];

  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = SpeechRecognition ? new SpeechRecognition() : null;

  if (recognition) {
    recognition.continuous = false;
    recognition.interimResults = false;
  }

  const startListening = (field) => {
    if (!recognition) {
      alert("Speech Recognition is not supported in this browser.");
      return;
    }

    if (!isLanguageLocked) {
      setIsLanguageLocked(true);
    }

    setIsListening(true);
    setCurrentField(field);
    recognition.lang = language;
    recognition.start();

    recognition.onresult = (event) => {
      const speechResult = event.results[0][0].transcript;
      let value = speechResult.trim();

      if (field === "landArea") {
        const numericValue = parseFloat(value);
        if (!isNaN(numericValue) && value !== "") {
          value = numericValue;
        } else {
          alert("Please speak a valid number for the land area.");
          setIsListening(false);
          return;
        }
      }

      setFormData((prev) => ({ ...prev, [field]: value }));
      setIsListening(false);
    };

    recognition.onerror = () => {
      setIsListening(false);
    };
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleToolSelect = (tool) => {
    if (!formData.farmingTools.includes(tool)) {
      setFormData((prev) => ({
        ...prev,
        farmingTools: [...prev.farmingTools, tool],
      }));
    }
  };

  const handleToolRemove = (tool) => {
    setFormData((prev) => ({
      ...prev,
      farmingTools: prev.farmingTools.filter((t) => t !== tool),
    }));
  };

  const handleNext = (e) => {
    e.preventDefault();

    if (
      !formData.farmName ||
      !formData.landArea ||
      !formData.irrigationSystem ||
      formData.farmingTools.length === 0 ||
      !formData.soilType ||
      !formData.cropSeason
    ) {
      alert("Please fill in all fields before proceeding.");
      return;
    }

    localStorage.setItem("farmerInput", JSON.stringify(formData));
    window.location.href = "/farmer-information/soilTesting";
  };
  

  return (
    <div className="relative bg-gradient-to-b from-yellow-50 to-yellow-100 py-10">
      <div className="relative z-10 max-w-4xl mx-auto bg-white rounded-xl shadow-xl overflow-hidden">
        <form className="space-y-8 p-8">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-emerald-800 mb-4">
              <TranslatedText text="Basic Information" />
            </h2>
            <p className="text-lg text-emerald-700">
              <TranslatedText text="Please provide your farming details to help us serve you better" />
            </p>
          </div>
  
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center justify-between col-span-2">
              <div className="flex items-center gap-2">
                <Wheat className="w-8 h-8 text-emerald-600" />
                <span className="text-xl font-semibold text-emerald-800">
                  <TranslatedText text="Farm Details" />
                </span>
              </div>
              <div>
                <label className="block font-semibold mb-1 text-emerald-800">
                  <TranslatedText text="Select Language" />
                </label>
                <select
                  value={language}
                  onChange={(e) => !isLanguageLocked && setLanguage(e.target.value)}
                  className="w-48 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  disabled={isLanguageLocked}
                >
                  <option value="en-US"><TranslatedText text="English" /></option>
                  <option value="hi-IN"><TranslatedText text="Hindi" /></option>
                </select>
              </div>
            </div>
  
            {["farmName", "landArea"].map((field, index) => (
              <div key={index} className="col-span-2 md:col-span-1">
                <label
                  htmlFor={field}
                  className="block font-semibold mb-2 text-emerald-800"
                >
                  <TranslatedText 
                    text={field === "farmName" ? "Farm Name" : "Area of Land (in acres)"} 
                  />
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    id={field}
                    name={field}
                    value={formData[field]}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg text-emerald-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder=
                      {`Enter ${field === "farmName" ? "farm name" : "area of land"}`}
                    />
                  <button
                    type="button"
                    onClick={() => startListening(field)}
                    className="p-3 bg-emerald-600 text-white rounded-xl h-12 flex items-center gap-2 w-30 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors duration-300"
                  >
                    <TranslatedText text="Voice" />
                    <FontAwesomeIcon icon={faMicrophone} />
                  </button>
                </div>
              </div>
            ))}
  
            <div className="col-span-2 md:col-span-1">
              <label className="block font-semibold mb-2 text-emerald-800">
                <TranslatedText text="Soil Type" />
              </label>
              <select
                name="soilType"
                value={formData.soilType}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg text-emerald-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value=""><TranslatedText text="Select Soil Type" /></option>
                {soilTypes.map((soil, index) => (
                  <option key={index} value={soil}>
                    <TranslatedText text={soil} />
                  </option>
                ))}
              </select>
            </div>
  
            <div className="col-span-2 md:col-span-1">
              <label className="block font-semibold mb-2 text-emerald-800">
                <TranslatedText text="Crop Season" />
              </label>
              <select
                name="cropSeason"
                value={formData.cropSeason}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg text-emerald-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value=""><TranslatedText text="Select Crop Season" /></option>
                {cropSeasons.map((season, index) => (
                  <option key={index} value={season.name}>
                    <TranslatedText text={`${season.name} - ${season.period}`} />
                  </option>
                ))}
              </select>
            </div>
  
            <div className="col-span-2">
              <label className="block font-semibold mb-2 text-emerald-800">
                <TranslatedText text="Farming Tools" />
              </label>
              <select
                className="w-full px-4 py-3 border border-gray-200 rounded-lg text-emerald-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                onChange={(e) => handleToolSelect(e.target.value)}
              >
                <option value=""><TranslatedText text="Select a Tool" /></option>
                {farmingToolsList.map((tool, index) => (
                  <option key={index} value={tool}>
                    <TranslatedText text={tool} />
                  </option>
                ))}
              </select>
              <div className="mt-3 flex flex-wrap gap-2">
                {formData.farmingTools.map((tool, index) => (
                  <button
                    key={index}
                    type="button"
                    className="flex items-center bg-emerald-600 text-white py-2 px-4 rounded-full shadow-md hover:bg-emerald-700 transition-colors duration-300"
                    onClick={() => handleToolRemove(tool)}
                  >
                    <TranslatedText text={tool} />
                    <FontAwesomeIcon icon={faXmark} className="ml-2" />
                  </button>
                ))}
              </div>
            </div>
  
            <div className="col-span-2">
              <label className="block font-semibold mb-2 text-emerald-800">
                <TranslatedText text="Irrigation System" />
              </label>
              <select
                id="irrigationSystem"
                name="irrigationSystem"
                value={formData.irrigationSystem}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg text-emerald-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value=""><TranslatedText text="Select Irrigation System" /></option>
                {irrigationSystems.map((system, index) => (
                  <option key={index} value={system}>
                    <TranslatedText text={system} />
                  </option>
                ))}
              </select>
            </div>
          </div>
  
          <div className="pt-6">
            <button
              type="button"
              onClick={handleNext}
              className={`w-full px-6 py-4 rounded-lg text-lg font-semibold transition-all duration-300 ${
                formData.farmName &&
                formData.landArea &&
                formData.farmingTools.length > 0 &&
                formData.irrigationSystem &&
                formData.soilType &&
                formData.cropSeason
                  ? "bg-emerald-800 text-white hover:bg-emerald-900 shadow-lg hover:shadow-xl"
                  : "bg-gray-300 text-gray-600 cursor-not-allowed"
              }`}
            >
              <TranslatedText text="Next" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FarmerInput;
