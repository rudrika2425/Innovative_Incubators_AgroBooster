import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMicrophone, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import {
  Wheat,
  Sprout,
  Leaf,
  Sun,
  Cloud,
  Droplet,
  Tractor,
  Target,
  Globe,
  ArrowUpRight,
  Brain,
} from "lucide-react";

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
    "Shallow Black Soil",
    "Deep Black Soil",
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
  const FloatingElements = () => (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      {[...Array(30)].map((_, i) => (
        <div
          key={i}
          className="absolute animate-float opacity-20"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDuration: `${8 + Math.random() * 4}s`,
            animationDelay: `${Math.random() * 2}s`,
            zIndex: 1,
          }}
        >
          {
            [
              <Leaf className="w-8 h-8 text-emerald-800" />,
              <Sprout className="w-9 h-9 text-yellow-600" />,
              <Sun className="w-10 h-10 text-yellow-500" />,
              <Tractor className="w-11 h-11 text-emerald-800" />,
              <Droplet className="w-9 h-9 text-blue-600" />,
              <Cloud className="w-10 h-10 text-gray-400" />,
              <Globe className="w-8 h-8 text-indigo-600" />,
              <Target className="w-9 h-9 text-red-600" />,
              <Brain className="w-10 h-10 text-purple-600" />,
              <Wheat className="w-11 h-11 text-amber-600" />,
            ][i % 10]
          }
        </div>
      ))}
    </div>
  );

  return (
    <div className="relative  bg-gradient-to-b from-yellow-50 to-yellow-100 py-10">
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>

      <FloatingElements />

      <div className="relative z-10 max-w-4xl mx-auto bg-white rounded-xl shadow-xl overflow-hidden">
        <form className="space-y-8 p-8">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-emerald-800 mb-4">
              Basic Information
            </h2>
            <p className="text-lg text-emerald-700">
              Please provide your farming details to help us serve you better
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center justify-between col-span-2">
              <div className="flex items-center gap-2">
                <Wheat className="w-8 h-8 text-emerald-600" />
                <span className="text-xl font-semibold text-emerald-800">
                  Farm Details
                </span>
              </div>
              <div>
                <label className="block font-semibold mb-1 text-emerald-800">
                  Select Language
                </label>
                <select
                  value={language}
                  onChange={(e) =>
                    !isLanguageLocked && setLanguage(e.target.value)
                  }
                  className="w-48 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  disabled={isLanguageLocked}
                >
                  <option value="en-US">English</option>
                  <option value="hi-IN">Hindi</option>
                </select>
              </div>
            </div>

            {["farmName", "landArea"].map((field, index) => (
              <div key={index} className="col-span-2 md:col-span-1">
                <label
                  htmlFor={field}
                  className="block font-semibold mb-2 text-emerald-800"
                >
                  {field === "farmName"
                    ? "Farm Name"
                    : "Area of Land (in acres)"}
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    id={field}
                    name={field}
                    value={formData[field]}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg text-emerald-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder={`Enter ${
                      field === "farmName" ? "farm name" : "area of land"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => startListening(field)}
                    className="p-3 bg-emerald-600 text-white rounded-xl h-12 flex items-center gap-2 w-30 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors duration-300"
                  >
                    Voice
                    <FontAwesomeIcon icon={faMicrophone} />
                  </button>
                </div>
              </div>
            ))}

            <div className="col-span-2 md:col-span-1">
              <label className="block font-semibold mb-2 text-emerald-800">
                Soil Type
              </label>
              <select
                name="soilType"
                value={formData.soilType}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg text-emerald-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="">Select Soil Type</option>
                {soilTypes.map((soil, index) => (
                  <option key={index} value={soil}>
                    {soil}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-span-2 md:col-span-1">
              <label className="block font-semibold mb-2 text-emerald-800">
                Crop Season
              </label>
              <select
                name="cropSeason"
                value={formData.cropSeason}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg text-emerald-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="">Select Crop Season</option>
                {cropSeasons.map((season, index) => (
                  <option key={index} value={season.name}>
                    {season.name} - {season.period}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-span-2">
              <label className="block font-semibold mb-2 text-emerald-800">
                Farming Tools
              </label>
              <select
                className="w-full px-4 py-3 border border-gray-200 rounded-lg text-emerald-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                onChange={(e) => handleToolSelect(e.target.value)}
              >
                <option value="">Select a Tool</option>
                {farmingToolsList.map((tool, index) => (
                  <option key={index} value={tool}>
                    {tool}
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
                    {tool}
                    <FontAwesomeIcon icon={faXmark} className="ml-2" />
                  </button>
                ))}
              </div>
            </div>

            <div className="col-span-2">
              <label className="block font-semibold mb-2 text-emerald-800">
                Irrigation System
              </label>
              <select
                id="irrigationSystem"
                name="irrigationSystem"
                value={formData.irrigationSystem}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg text-emerald-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="">Select Irrigation System</option>
                {irrigationSystems.map((system, index) => (
                  <option key={index} value={system}>
                    {system}
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
              Next
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FarmerInput;
