import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Sprout, Leaf, Tractor, Cloud, Sun } from "lucide-react";
import { useUser } from "../Context/UserContext";

const BorrowTools = () => {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const {user} = useUser();
  const farmerId = user.id;

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:4000/tools/gettools?farmerId=${farmerId}`)
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
    navigate("/farmerdashboard/description", { state: { product } });
  };



  const categories = ["Shop All", "Tractor", "Harvester", "Irrigation System", "Plow", "Other"];

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-yellow-50 to-yellow-100">
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-30px) rotate(5deg); }
        }
      `}</style>

  

      <div className="relative z-10">
        {/* Header and Dropdown Row */}
        <div className="container mx-auto px-4 py-2 flex shadow-md items-center justify-between bg-gradient-to-b from-yellow-50 to-yellow-100">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-yellow-100 rounded-full shadow-lg">
              <Tractor className="w-8 h-8 text-yellow-600" />
            </div>
            <h1 className="text-3xl font-bold text-yellow-900">Borrow Tools</h1>
          </div>

          <div className="relative w-64">
            <button
              onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
              className="w-full bg-yellow-600 text-white py-3 px-4 rounded-full flex items-center justify-between hover:bg-yellow-500 transition-colors"
            >
              {selectedCategory ?
                selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1) :
                "Select Category"
              }
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {isCategoryDropdownOpen && (
              <div className="absolute z-20 w-full bg-white shadow-lg rounded-lg mt-1">
                {categories.map((category) => (
                  <button
                    key={category}
                    className="w-full text-left px-4 py-3 hover:bg-emerald-50 transition-colors"
                    onClick={() => {
                      setSelectedCategory(category.toLowerCase() === "shop all" ? "" : category.toLowerCase());
                      setIsCategoryDropdownOpen(false);
                    }}
                  >
                    {category}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Products Grid */}
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="group bg-white/80 border-b-2 border-emerald-700 backdrop-blur-sm rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300"
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
                  <p className="text-amber-600 font-bold mt-2">Rs. {product.rate} per day.</p>
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
    </div>
  );
};

export default BorrowTools;