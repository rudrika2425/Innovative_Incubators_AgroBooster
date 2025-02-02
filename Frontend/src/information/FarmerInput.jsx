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

    if (!formData.farmName || !formData.landArea || !formData.irrigationSystem || formData.farmingTools.length === 0) {
      alert("Please fill in all fields before proceeding.");
      return;
    }

    localStorage.setItem("farmerInput", JSON.stringify(formData));
    window.location.href = "/farmer-information/soilTesting";
  };

  return (
    <form className="max-w-8xl mx-auto space-y-6 bg-white p-6 rounded-xl shadow-2xl md:p-8 lg:p-10">
      <div className="flex flex-col md:flex-row md:justify-between items-center">
        <h2 className="text-3xl md:text-4xl font-semibold  text-green-600 mb-4 md:mb-0">Basic Information</h2>
        <div>
          <label className="block font-semibold mb-1 text-gray-700">Select Language</label>
          <select
            value={language}
            onChange={(e) => !isLanguageLocked && setLanguage(e.target.value)}
            className="w-full md:w-48 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            disabled={isLanguageLocked}
          >
            <option value="en-US">English</option>
            <option value="hi-IN">Hindi</option>
          </select>
        </div>
      </div>

      {['farmName', 'landArea'].map((field, index) => (
        <div key={index}>
          <label htmlFor={field} className="block font-semibold mb-2 capitalize text-gray-800">
            {field === 'farmName' ? 'Farm Name' : 'Area of Land (in acres)'}
          </label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              id={field}
              name={field}
              value={formData[field]}
              onChange={handleChange}
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder={`Enter ${field === 'farmName' ? 'farm name' : 'area of land'}`}
            />
            <button
              type="button"
              onClick={() => startListening(field)}
              className="p-3 bg-green-600 text-white rounded-full hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <FontAwesomeIcon icon={faMicrophone} />
            </button>
          </div>
        </div>
      ))}

      <div>
        <label className="block font-semibold mb-2 text-gray-800">Farming Tools</label>
        <select
          className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          onChange={(e) => handleToolSelect(e.target.value)}
        >
          <option value="">Select a Tool</option>
          {farmingToolsList.map((tool, index) => (
            <option key={index} value={tool}>{tool}</option>
          ))}
        </select>
        <div className="mt-3 flex flex-wrap gap-2">
          {formData.farmingTools.map((tool, index) => (
            <button
              key={index}
              type="button"
              className="flex items-center bg-green-400 text-white py-1 px-3 rounded-full shadow-md hover:bg-green-500"
              onClick={() => handleToolRemove(tool)}
            >
              {tool}
              <FontAwesomeIcon icon={faXmark} className="ml-2" />
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block font-semibold mb-2 text-gray-700">Irrigation System</label>
        <select
          id="irrigationSystem"
          name="irrigationSystem"
          value={formData.irrigationSystem}
          onChange={handleChange}
          className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
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
        className={`  px-5 py-2 rounded-md text-lg font-semibold transition-all duration-300 ${formData.farmName && formData.landArea && formData.farmingTools.length > 0 && formData.irrigationSystem ? "bg-green-600 text-white hover:bg-green-700" : "bg-gray-300 text-gray-600 cursor-not-allowed"}`}
      >
        Next
      </button>
    </form>
  );
};

export default FarmerInput;
