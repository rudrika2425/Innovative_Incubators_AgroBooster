import React, { useState } from "react";

const Sidebar = () => {
  const [soilTestOpen, setSoilTestOpen] = useState(false);
  const [toolsForRentOpen, setToolsForRentOpen] = useState(false);

  return (
    <div className="w-full sm:w-64 bg-gradient-to-b from-blue-500 to-green-500 h-screen shadow-lg p-4 text-white">
      <h1 className="text-2xl font-bold mb-6 text-center">Sidebar</h1>

      {/* Info Section */}
      <div className="mb-4">
        <h2 className="font-semibold text-lg mb-2">Info</h2>
        <p className="text-sm text-gray-200">Detailed information goes here.</p>
      </div>

      {/* Soil Test Section */}
      <div className="mb-4">
        <h2
          onClick={() => setSoilTestOpen(!soilTestOpen)}
          className="font-semibold text-lg mb-2 cursor-pointer flex justify-between items-center"
        >
          Soil Test
          <span className="text-sm">{soilTestOpen ? "▲" : "▼"}</span>
        </h2>
        {soilTestOpen && (
          <ul className="mt-2 border rounded-lg bg-white text-gray-800">
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
              <a href="#component1">Component 1</a>
            </li>
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
              <a href="#component2">Component 2</a>
            </li>
          </ul>
        )}
      </div>

      {/* PlantBot Section */}
      <div className="mb-4">
        <h2 className="font-semibold text-lg mb-2">PlantBot</h2>
        <p className="text-sm text-gray-200">Interact with PlantBot here.</p>
      </div>

      {/* Tools for Rent Section */}
      <div className="mb-4">
        <h2
          onClick={() => setToolsForRentOpen(!toolsForRentOpen)}
          className="font-semibold text-lg mb-2 cursor-pointer flex justify-between items-center"
        >
          Tools for Rent
          <span className="text-sm">{toolsForRentOpen ? "▲" : "▼"}</span>
        </h2>
        {toolsForRentOpen && (
          <ul className="mt-2 border rounded-lg bg-white text-gray-800">
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
              <a href="#give-tools">Give Tools on Rent</a>
            </li>
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
              <a href="#take-tools">Take Tools on Rent</a>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
