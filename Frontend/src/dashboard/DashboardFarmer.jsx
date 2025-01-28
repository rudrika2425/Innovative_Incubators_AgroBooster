// FarmerDashboard.jsx
import React from "react";
import { Outlet, Link } from "react-router-dom";

const FarmerDashboard = () => {
  return (
    <div
      className="min-h-screen flex bg-cover bg-center"
      style={{
        backgroundImage: `url('../images/Home-img.png')`,
      }}
    >
      <aside className="w-64 bg-black bg-opacity-80 text-white h-screen pt-6 fixed shadow-lg">
        <Link to="/">
          <h1 className="text-4xl font-bold mb-8 ml-8">AgroBooster</h1>
        </Link>
        <nav>
          <ul className="mt-16">
            <li className="mb-4">
              <Link
                to="step1"
                className="block p-3 hover:bg-gray-100 hover:text-orange-600 text-white cursor-pointer font-semibold text-2xl text-center w-full transition-all duration-300"
              >
                Basic Information
              </Link>
            </li>
            <li className="mb-4">
              <Link
                to="step2"
                className="block p-3 hover:bg-gray-100 hover:text-orange-600 text-white cursor-pointer font-semibold text-2xl text-center w-full transition-all duration-300"
              >
                Soil Testing
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      <div className="flex-1 ml-64 relative">
        <div className="absolute inset-0 bg-black bg-opacity-70"></div>

        <div className="relative z-10">
          <main className="p-6 bg-opacity-30 bg-black rounded-lg shadow-md mx-6 mt-6">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default FarmerDashboard;
