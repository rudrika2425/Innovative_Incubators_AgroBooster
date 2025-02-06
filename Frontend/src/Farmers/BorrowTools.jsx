import React, { useState } from "react";
import { Sprout, Leaf, Sun, Tractor, Search, Heart, ShoppingCart } from "lucide-react";

const BorrowTools = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  
  const products = [
    {
      id: 1,
      title: "Eco-Friendly Sofa",
      category: "harvester",
      brand: "GreenLiving",
      model: "GLS-2025",
      condition: "New",
      specs: "Made from 100% recycled materials, 3-seater, adjustable backrest, removable covers for easy cleaning.",
      rate: "Rs. 25 per day",
      availability: "Available",
      deposit: "Rs. 1000",
      address: "House No. 45, Model Town Extension, Ludhiana, Punjab - 141002",
      deliveryRange: "Within 20 km radius of Ludhiana",
      renterName: "John Doe",
      contact: "9876543210",
      terms: "No smoking or pets allowed. Minimum rental period of 3 days.",
      images: ["/api/placeholder/400/300"]
    }
  ];

  const handleInfo = (product) => {
    setSelectedProduct(product);
    // You can implement your own way to show product details, 
    // such as setting a state to show a modal or updating the UI
  };

  const filteredProducts = selectedCategory
    ? products.filter((product) => product.category === selectedCategory)
    : products;

  // Floating Elements Component
  const FloatingElements = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(15)].map((_, i) => (
        <div
          key={i}
          className="absolute animate-float opacity-30"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animation: `float ${8 + Math.random() * 4}s infinite ${Math.random() * 2}s`,
            zIndex: 0
          }}
        >
          {i % 4 === 0 ? (
            <Leaf className="w-8 h-8 text-emerald-600" />
          ) : i % 4 === 1 ? (
            <Sprout className="w-9 h-9 text-lime-600" />
          ) : i % 4 === 2 ? (
            <Sun className="w-10 h-10 text-yellow-600" />
          ) : (
            <Tractor className="w-11 h-11 text-green-600" />
          )}
        </div>
      ))}
    </div>
  );

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-yellow-50 to-yellow-100">
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-30px) rotate(5deg); }
        }
      `}</style>

      <FloatingElements />

      {/* Navbar */}
      <nav className="relative z-10 bg-emerald-600/90 backdrop-blur-sm shadow-lg">
        <div className="w-full px-6 py-4 flex justify-between items-center">
          <div className="flex space-x-6">
            {["Shop All", "Tractor", "Harvester", "Irrigation System", "Plow", "Other"].map((category) => (
              <button
                key={category}
                className={`text-white font-medium hover:text-yellow-200 transition duration-300 ${
                  (category.toLowerCase() === "shop all" && !selectedCategory) || 
                  category.toLowerCase() === selectedCategory 
                    ? "border-b-2 border-yellow-300" 
                    : ""
                }`}
                onClick={() => setSelectedCategory(category.toLowerCase() === "shop all" ? "" : category.toLowerCase())}
              >
                {category}
              </button>
            ))}
          </div>
          <div className="flex items-center space-x-4">
            
           
          </div>
        </div>
      </nav>

      {/* Products Grid */}
      <div className="relative z-10 container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="group bg-white/80 backdrop-blur-sm rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 border border-emerald-100"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={product.images[0]}
                  alt={product.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-emerald-900">{product.title}</h3>
                <p className="text-amber-600 font-bold mt-2">{product.rate}</p>
                <p className="text-sm text-emerald-700 mt-1 truncate">{product.address}</p>
                <button
                  onClick={() => handleInfo(product)}
                  className="w-full mt-4 bg-emerald-600 text-white py-2 rounded-full hover:bg-emerald-500 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <Tractor className="w-5 h-5" />
                  <span>View More Details</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BorrowTools;