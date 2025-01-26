import React, { useState } from "react";
import { motion } from "framer-motion"; // Install Framer Motion with npm install framer-motion
import { useNavigate } from "react-router-dom";

const RentProduct = () => {
  const products = [
    {   id:1,
        title: "Eco-Friendly Sofa",
        category: "harvester",
        brand: "GreenLiving",
        model: "GLS-2025",
        condition: "New",
        specs: "Made from 100% recycled materials, 3-seater, adjustable backrest, removable covers for easy cleaning.",
        rate: "Rs. 25 per day",
        availability: "Available",
        deposit: "Rs. 1000",
        address: "House No. 45, Model Town Extension, Ludhiana, Punjab - 141002 Landmark: Opposite Guru Nanak Stadium",
        deliveryRange: "Within 20 km radius of Ludhiana",
        renterName: "John Doe",
        contact: "9876543210",
        terms: "No smoking or pets allowed. Minimum rental period of 3 days.",
        images: [
          "https://via.placeholder.com/150",
          "https://via.placeholder.com/150",
          "https://via.placeholder.com/150"
        ],
      },
    {
      id: 2,
      title: "Eco-Friendly Sofa",
      category: "harvester",
      brand: "GreenLiving",
      model: "GLS-2025",
      condition: "New",
      specs: "Made from 100% recycled materials, 3-seater, adjustable backrest, removable covers for easy cleaning.",
      rate: "Rs. 25 per day",
      availability: "Available",
      deposit: "Rs. 1000",
      address: "House No. 45, Model Town Extension, Ludhiana, Punjab - 141002 Landmark: Opposite Guru Nanak Stadium",
      deliveryRange: "Within 20 km radius of Ludhiana",
      renterName: "John Doe",
      contact: "9876543210",
      terms: "No smoking or pets allowed. Minimum rental period of 3 days.",
      images: [
        "https://via.placeholder.com/150",
        "https://via.placeholder.com/150",
        "https://via.placeholder.com/150"
      ],
    },
        {
            title: "Eco-Friendly Sofa",
            category: "other",
            brand: "GreenLiving",
            model: "GLS-2025",
            condition: "New",
            specs: "Made from 100% recycled materials, 3-seater, adjustable backrest, removable covers for easy cleaning.",
            rate: "Rs. 25 per day",
            availability: "Available",
            deposit: "Rs. 1000",
            address: "House No. 45, Model Town Extension, Ludhiana, Punjab - 141002 Landmark: Opposite Guru Nanak Stadium",
            deliveryRange: "Within 20 km radius of Ludhiana",
            renterName: "John Doe",
            contact: "9876543210",
            terms: "No smoking or pets allowed. Minimum rental period of 3 days.",
            images: [
              "https://via.placeholder.com/150",
              "https://via.placeholder.com/150",
              "https://via.placeholder.com/150"
            ],
        },
        {
            title: "Eco-Friendly Sofa",
            category: "other",
            brand: "GreenLiving",
            model: "GLS-2025",
            condition: "New",
            specs: "Made from 100% recycled materials, 3-seater, adjustable backrest, removable covers for easy cleaning.",
            rate: "Rs. 25 per day",
            availability: "Available",
            deposit: "Rs. 1000",
            address: "House No. 45, Model Town Extension, Ludhiana, Punjab - 141002 Landmark: Opposite Guru Nanak Stadium",
            deliveryRange: "Within 20 km radius of Ludhiana",
            renterName: "John Doe",
            contact: "9876543210",
            terms: "No smoking or pets allowed. Minimum rental period of 3 days.",
            images: [
              "https://via.placeholder.com/150",
              "https://via.placeholder.com/150",
              "https://via.placeholder.com/150"
            ],
        },
        {
            title: "Eco-Friendly Sofa",
            category: "other",
            brand: "GreenLiving",
            model: "GLS-2025",
            condition: "New",
            specs: "Made from 100% recycled materials, 3-seater, adjustable backrest, removable covers for easy cleaning.",
            rate: "Rs. 25 per day",
            availability: "Available",
            deposit: "Rs. 1000",
            address: "House No. 45, Model Town Extension, Ludhiana, Punjab - 141002 Landmark: Opposite Guru Nanak Stadium",
            deliveryRange: "Within 20 km radius of Ludhiana",
            renterName: "John Doe",
            contact: "9876543210",
            terms: "No smoking or pets allowed. Minimum rental period of 3 days.",
            images: [
              "https://via.placeholder.com/150",
              "https://via.placeholder.com/150",
              "https://via.placeholder.com/150"
            ],
        },
        {
            title: "Eco-Friendly Sofa",
            category: "other",
            brand: "GreenLiving",
            model: "GLS-2025",
            condition: "New",
            specs: "Made from 100% recycled materials, 3-seater, adjustable backrest, removable covers for easy cleaning.",
            rate: "Rs. 25 per day",
            availability: "Available",
            deposit: "Rs. 1000",
            address: "House No. 45, Model Town Extension, Ludhiana, Punjab - 141002 Landmark: Opposite Guru Nanak Stadium",
            deliveryRange: "Within 20 km radius of Ludhiana",
            renterName: "John Doe",
            contact: "9876543210",
            terms: "No smoking or pets allowed. Minimum rental period of 3 days.",
            images: [
              "https://via.placeholder.com/150",
              "https://via.placeholder.com/150",
              "https://via.placeholder.com/150"
            ],
        },
        {
            title: "Eco-Friendly Sofa",
            category: "irrigation system",
            brand: "GreenLiving",
            model: "GLS-2025",
            condition: "New",
            specs: "Made from 100% recycled materials, 3-seater, adjustable backrest, removable covers for easy cleaning.",
            rate: "Rs. 25 per day",
            availability: "Available",
            deposit: "Rs. 1000",
            address: "House No. 45, Model Town Extension, Ludhiana, Punjab - 141002 Landmark: Opposite Guru Nanak Stadium",
            deliveryRange: "Within 20 km radius of Ludhiana",
            renterName: "John Doe",
            contact: "9876543210",
            terms: "No smoking or pets allowed. Minimum rental period of 3 days.",
            images: [
              "https://via.placeholder.com/150",
              "https://via.placeholder.com/150",
              "https://via.placeholder.com/150"
            ],
        },
      ];
 const navigate=useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleInfo=(product)=>{
    navigate('/description',{state:{product}});
  }     
  // Adjusted logic to show all products when no category is selected
  const filteredProducts = selectedCategory
    ? products.filter((product) => product.category === selectedCategory)
    : products;

  return (
    <div style={{
        backgroundImage: `url('/Images/des.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        opacity: 0.8, // Adjust transparency
      }} className="min-h-screen bg-gradient-to-b from-green-50 to-green-100">
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


export default RentProduct;
