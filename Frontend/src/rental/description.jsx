import React from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";

const DescriptionPage = () => {
  const { state } = useLocation();
  const { product } = state;

  return (
    <div style={{
        backgroundImage: `url('/Images/des.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        opacity: 0.8, // Adjust transparency
      }} className="min-h-screen bg-gradient-to-b from-green-50 to-green-100">
    

      {/* Product Details Section */}
      <div className="w-full px-4 py-12">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          {/* Left Column (Image Gallery) */}
          <div className="space-y-6">
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <img
                src={product.images[0]}
                alt={product.title}
                className="w-full h-80 object-cover"
              />
            </div>
            <div className="flex space-x-4">
              {product.images.map((image, index) => (
                <div key={index} className="bg-white shadow-lg rounded-lg overflow-hidden">
                  <img
                    src={image}
                    alt={`image-${index}`}
                    className="w-20 h-20 object-cover cursor-pointer hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Right Column (Product Details) */}
          <div className="bg-white shadow-lg rounded-lg p-8 space-y-6">
            <h2 className="text-3xl font-semibold text-gray-800">{product.title}</h2>
            <p className="text-green-600 font-bold text-xl">{product.rate}</p>
            <p className="text-sm text-gray-500">{product.address}</p>

            <div className="space-y-3">
              <h4 className="text-xl font-semibold text-gray-700">Product Details:</h4>
              <p className="text-gray-700">{product.specs}</p>
              <p className="text-gray-700">Brand: {product.brand}</p>
              <p className="text-gray-700">Model: {product.model}</p>
              <p className="text-gray-700">Condition: {product.condition}</p>
            </div>

            <div className="space-y-3">
              <h4 className="text-xl font-semibold text-gray-700">Terms & Conditions:</h4>
              <p className="text-gray-700">{product.terms}</p>
            </div>

            <div className="space-y-3">
              <h4 className="text-xl font-semibold text-gray-700">Contact Info:</h4>
              <p className="text-gray-700">Renter: {product.renterName}</p>
              <p className="text-gray-700">Contact: {product.contact}</p>
            </div>

            <div className="space-y-3">
              <h4 className="text-xl font-semibold text-gray-700">Delivery Info:</h4>
              <p className="text-gray-700">Delivery Range: {product.deliveryRange}</p>
              <p className="text-gray-700">Deposit: {product.deposit}</p>
            </div>

            <div className="flex space-x-4">
              <button className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition duration-300">
                Rent Now
              </button>
              <button className="bg-gray-300 text-gray-800 px-6 py-3 rounded-md hover:bg-gray-400 transition duration-300">
                Add to Wishlist
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DescriptionPage;
