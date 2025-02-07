import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const BorrowTools = () => {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://127.0.0.1:4000/tools/gettools") // Replace with the actual backend URL
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching tools:", error);
      });
  }, []);

  const filteredProducts = selectedCategory
    ? products.filter((product) => product.category === selectedCategory)
    : products;

  const handleInfo = (product) => {
    navigate("/description", { state: { product } });
  };

  return (
    <div
      style={{
        backgroundImage: `url('/Images/des.png')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        opacity: 0.8,
      }}
      className="min-h-screen bg-gradient-to-b from-green-50 to-green-100"
    >
      {/* Navbar */}
      <nav className="relative z-10 bg-emerald-600/90 backdrop-blur-sm shadow-lg">
        <div className="w-full px-6 py-4 flex justify-between items-center">
          <div className="flex space-x-6">
            {["Shop All", "Tractor", "Harvester", "Irrigation System", "Plow", "Other"].map(
              (category) => (
                <button
                  key={category}
                  className={`text-white font-medium hover:text-yellow-200 transition duration-300 ${
                    (category.toLowerCase() === "shop all" && !selectedCategory) ||
                    category.toLowerCase() === selectedCategory
                      ? "border-b-2 border-yellow-300"
                      : ""
                  }`}
                  onClick={() =>
                    setSelectedCategory(category.toLowerCase() === "shop all" ? "" : category.toLowerCase())
                  }
                >
                  {category}
                </button>
              )
            )}
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
