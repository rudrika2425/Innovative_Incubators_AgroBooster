import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone, faXmark } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

const FarmerInput = () => {
  const [formData, setFormData] = useState({
    farmName: "",
    landArea: "",
    farmingTools: [],
    irrigationSystem: "",
  });

  const [isListening, setIsListening] = useState(false);
  const [currentField, setCurrentField] = useState(null);
  const [language, setLanguage] = useState("en-US");
  const [isLanguageLocked, setIsLanguageLocked] = useState(false);

  const farmingToolsList = [
    "Tractor", "Plough", "Harvester", "Sprayer",
    "Cultivator", "Seeder", "Water Pump", "Plow",
    "Rake", "Hoe"
  ];

  const irrigationSystems = [
    "Drip Irrigation", "Sprinkler Irrigation",
    "Flood Irrigation", "Surface Irrigation",
    "Subsurface Irrigation"
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
  
    // Check if all fields are filled
    if (!formData.farmName || !formData.landArea || !formData.irrigationSystem || formData.farmingTools.length === 0) {
      alert("Please fill in all fields before proceeding.");
      return;
    }
  
    // Save farmer input to localStorage
    localStorage.setItem("farmerInput", JSON.stringify(formData));
  
    // Navigate to the next page
    window.location.href = "/farmer-information/soilTesting";
  };

  return (
    <form className="space-y-6 bg-white p-6 rounded-lg shadow-lg">
      <div className="flex flex-row">
        <h2 className="text-4xl font-bold text-green-600 mt-3">Basic Information</h2>
        <div className="ml-170">
          <label className="block font-semibold mb-2">Select Language</label>
          <select
            value={language}
            onChange={(e) => !isLanguageLocked && setLanguage(e.target.value)}
            className="w-full p-2 border rounded-lg"
            disabled={isLanguageLocked}
          >
            <option value="en-US">English</option>
            <option value="hi-IN">Hindi</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="farmName" className="block font-semibold mb-2">Farm Name</label>
        <div className="flex">
          <input
            type="text"
            id="farmName"
            name="farmName"
            value={formData.farmName}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
            placeholder="Enter farm name"
          />
          <button
            type="button"
            onClick={() => startListening("farmName")}
            className="ml-2 px-4 py-2 bg-green-600 text-white rounded-lg"
          >
            <FontAwesomeIcon icon={faMicrophone} />
          </button>
        </div>
      </div>

      <div>
        <label htmlFor="landArea" className="block font-semibold mb-2">Area of Land (in acres)</label>
        <div className="flex">
          <input
            type="text"
            id="landArea"
            name="landArea"
            value={formData.landArea}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
            placeholder="Enter area of land"
          />
          <button
            type="button"
            onClick={() => startListening("landArea")}
            className="ml-2 px-4 py-2 bg-green-600 text-white rounded-lg"
          >
            <FontAwesomeIcon icon={faMicrophone} />
          </button>
        </div>
      </div>

      <div>
        <label htmlFor="farmingTools" className="block font-semibold mb-2">Farming Tools</label>
        <select
          className="w-full p-2 border rounded-lg"
          onChange={(e) => handleToolSelect(e.target.value)}
        >
          <option value="">Select a Tool</option>
          {farmingToolsList.map((tool, index) => (
            <option key={index} value={tool}>{tool}</option>
          ))}
        </select>
        <div className="mt-2 flex flex-wrap gap-2">
          {formData.farmingTools.map((tool, index) => (
            <button
              key={index}
              type="button"
              className="flex items-center bg-green-400 text-white py-1 px-3 rounded-full"
              onClick={() => handleToolRemove(tool)}
            >
              {tool}
              <span className="ml-1 text-white">
                <FontAwesomeIcon icon={faXmark} />
              </span>
            </button>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="irrigationSystem" className="block font-semibold mb-2">Irrigation System</label>
        <select
          id="irrigationSystem"
          name="irrigationSystem"
          value={formData.irrigationSystem}
          onChange={handleChange}
          className="w-full p-2 border rounded-lg"
        >
          <option value="">Select Irrigation System</option>
          {irrigationSystems.map((system, index) => (
            <option key={index} value={system}>{system}</option>
          ))}
        </select>
      </div>

      <button
        type="button"
        onClick={handleNext}
        className={`px-4 py-2 rounded-lg transition ${formData.farmName && formData.landArea && formData.farmingTools.length > 0 && formData.irrigationSystem ? "bg-green-600 text-white hover:bg-green-700" : "bg-gray-400 text-gray-700 cursor-not-allowed"}`}
      >
        Next
      </button>
    </form>
  );
};

export default FarmerInput;
