import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Sprout, Leaf, Sun, Cloud, Tractor } from "lucide-react";
import FloatingElements from "../FlotingElement/FloatingElements";
const DescriptionPage = () => {
  const { state } = useLocation();
  const { product } = state;
  const [mainImage, setMainImage] = useState(product.images[0]);



  return (
    <div className="relative h-screen flex justify-center items-center bg-gradient-to-b from-yellow-50 to-yellow-100 overflow-hidden px-4">
      <div className="relative z-10 container mx-auto px-6 py-4 bg-gradient-to-b from-emerald-50 to-emerald-100 backdrop-blur-sm shadow-lg rounded-lg flex flex-col lg:flex-row items-center gap-6 w-full h-[90vh] overflow-hidden">
        
        {/* Floating Background Icons */}
        <FloatingElements />

        {/* Left Section - Image */}
        <div className="flex flex-col items-center w-full lg:w-1/3">
          <motion.div 
            className="bg-white/80 backdrop-blur-sm shadow-2xl rounded-lg overflow-hidden w-full h-[300px]"
            whileHover={{ scale: 1.02 }}
          >
            <img
              src={mainImage}
              alt={product.title}
              className="w-full h-full object-cover rounded-lg"
            />
          </motion.div>
          <div className="flex space-x-3 overflow-x-auto pb-2 mt-3">
            {product.images.map((image, index) => (
              <motion.div 
                key={index} 
                className="bg-white/80 backdrop-blur-sm shadow-lg rounded-lg overflow-hidden flex-shrink-0"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <img
                  src={image}
                  alt={`image-${index}`}
                  className="w-20 h-20 object-cover cursor-pointer"
                  onClick={() => setMainImage(image)}
                />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right Section - Product Info */}
        <motion.div 
          className="w-full lg:w-2/3 space-y-4 overflow-y-auto h-full p-2"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="bg-white/80 backdrop-blur-sm shadow-lg rounded-lg p-4 space-y-3 relative">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-100 rounded-full shadow-lg">
                <Tractor className="w-6 h-6 text-emerald-600" />
              </div>
              <h2 className="text-3xl font-bold text-yellow-900">{product.title}</h2>
            </div>
            <p className="text-xl font-bold text-emerald-600">Rs. {product.rate} per day.</p>
            <p className="text-gray-500 flex items-center gap-2">
              <Cloud className="w-4 h-4" />
              {product.address}
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm shadow-lg rounded-lg p-4 space-y-3">
            <h4 className="text-xl font-semibold text-emerald-800 flex items-center gap-2">
              <Sprout className="w-5 h-5" />
              Product Details
            </h4>
            <div className="bg-white/60 rounded-lg p-3 text-sm">
              <p className="text-gray-700">{product.specs}</p>
              <p className="text-gray-700">Brand: {product.brand}</p>
              <p className="text-gray-700">Model: {product.model}</p>
              <p className="text-gray-700">Condition: {product.condition}</p>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm shadow-lg rounded-lg p-4 space-y-3">
            <h4 className="text-xl font-semibold text-emerald-800 flex items-center gap-2">
              <Leaf className="w-5 h-5" />
              Contact Info
            </h4>
            <div className="bg-white/60 rounded-lg p-3 text-sm">
              <p className="text-gray-700">Renter: {product.renterName}</p>
              <p className="text-gray-700">Contact: {product.contact}</p>
              <p className="text-gray-700">District: {product.district}</p>
              <p className="text-gray-700">State: {product.state}</p>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm shadow-lg rounded-lg p-4 space-y-3">
            <h4 className="text-xl font-semibold text-emerald-800 flex items-center gap-2">
              <Sun className="w-5 h-5" />
              Delivery Info
            </h4>
            <div className="bg-white/60 rounded-lg p-3 text-sm">
              <p className="text-gray-700">Range: {product.deliveryRange}</p>
              <p className="text-gray-700">Deposit: {product.deposit}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DescriptionPage;
