import React, { useState, useEffect } from "react";
import axios from "axios"; // Import axios for API requests
import { motion } from "framer-motion"; // Install Framer Motion with npm install framer-motion
import { useNavigate } from "react-router-dom";

const BorrowTools = () => {
  const [products, setProducts] = useState([]); // Store tools in state
  const [selectedCategory, setSelectedCategory] = useState("");
  const navigate = useNavigate();

  // Fetch tools from the backend when the component mounts
  useEffect(() => {
    axios
      .get("http://localhost:5000/tools") // Replace with the actual backend URL
      .then((response) => {
        setProducts(response.data); // Set the fetched tools into state
      })
      .catch((error) => {
        console.error("Error fetching tools:", error);
      });
  }, []);

  // Adjusted logic to show all products when no category is selected
  const filteredProducts = selectedCategory
    ? products.filter((product) => product.category === selectedCategory)
    : products;

  const handleInfo = (product) => {
    navigate('/description', { state: { product } });
  };

  return (
    <div
      style={{
        backgroundImage: `url('/Images/des.png')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        opacity: 0.8, // Adjust transparency
      }}
      className="min-h-screen bg-gradient-to-b from-green-50 to-green-100"
    >
      {/* Navbar */}
      <nav className="bg-green-600 shadow-lg">
        <div className="w-full px-4 py-4 flex justify-between items-center">
          <div className="flex space-x-6">
            {["Shop All", "Tractor", "Harvester", "Irrigation System", "Plow", "Other"].map((category) => (
              <a
                key={category}
                href="#"
                className="text-white font-semibold hover:text-green-300 transition duration-200"
                onClick={() => setSelectedCategory(category.toLowerCase() === "shop all" ? "" : category.toLowerCase())}
              >
                {category}
              </a>
            ))}
          </div>
          <div className="flex items-center space-x-4">
            <input
              type="text"
              placeholder="Search..."
              className="p-2 border border-gray-300 rounded-md focus:outline-none"
            />
            <button className="bg-green-800 text-white px-4 py-2 rounded-md hover:bg-green-400 transition duration-200">
              Search
            </button>
            <a href="#" className="text-white hover:text-green-300 transition duration-200">
              Wishlist
            </a>
            <a href="#" className="text-white hover:text-green-300 transition duration-200">
              Cart (0)
            </a>
          </div>
        </div>
      </nav>

      {/* Products Section */}
      <div className="w-full px-4 py-12">
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          {filteredProducts.map((product) => (
            <motion.div
              key={product.id}
              className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
              whileHover={{ scale: 1.03 }}
            >
              <img
                src={product.images[0]}
                alt={product.title}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">{product.title}</h3>
                <p className="text-green-600 font-bold mt-2">{product.rate}</p>
                <p className="text-xs text-gray-500 mt-1">{product.address}</p>
                <button
                  onClick={() => handleInfo(product)}
                  className="w-full mt-4 bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition duration-300"
                >
                  Rent Now
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default BorrowTools;
