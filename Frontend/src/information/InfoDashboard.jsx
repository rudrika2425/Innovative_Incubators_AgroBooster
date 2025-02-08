import React, { useEffect } from "react";
import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import { useUser } from "../Context/UserContext";
import { UserCircle } from "lucide-react";

const InfoDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useUser();

  useEffect(() => {
    if (location.pathname === "/farmer-Information") {
      navigate("/farmer-information/basicInformation", { replace: true });
    }
  }, [location, navigate]);

  return (
    <div
    >
      {/* Professional Navbar */}
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Left side - Logo */}
            <Link to="/" className="flex items-center">
              <h1 className="text-4xl font-bold text-emerald-600 hover:text-yellow-500 transition-colors">
                Agro<span className="text-amber-600">Booster</span>
              </h1>
            </Link>

            {/* Right side - User Info */}
            <div className="flex items-center space-x-4">
              <span className="text-emerald-600">
                Welcome, <span className="font-medium text-amber-600">{user.fullname}</span>
              </span>
              <div className="relative group">
                <UserCircle 
                  className="w-10 h-10 text-gray-600 cursor-pointer hover:text-gray-700 transition-colors" 
                />
                {/* Dropdown menu */}
                <div className="hidden  absolute right-0 w-48 py-2 mt-2 bg-white rounded-md shadow-lg border border-gray-100">
                  <Link 
                    to="/farmer-information/basicInformation" 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50"
                  >
                    Basic Information
                  </Link>
                  <Link 
                    to="/farmer-information/soilTesting" 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50"
                  >
                    Soil Testing
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="relative flex-1">
        <div className="absolute inset-0 bg-white bg-opacity-70"></div>
        <div className="relative z-10">
          <main className="mx-auto ">
            
              <Outlet />
            
          </main>
        </div>
      </div>
    </div>
  );
};

export default InfoDashboard;