import React, { useEffect } from "react";
import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";

const FarmerDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Redirect to "step1" if the user is on "/farmer-Information"
  useEffect(() => {
    if (location.pathname === "/farmer-Information") {
      navigate("/farmer-Information/step1", { replace: true });
    }
  }, [location, navigate]);

  return (
    <div
      className="min-h-screen flex bg-cover bg-center"
      style={{
        backgroundImage: `url('../images/Home-img.png')`,
      }}
    >
      <aside className="w-64 bg-green-600 bg-opacity-80 text-white h-screen pt-6 fixed shadow-lg">
        <Link to="/">
          <h1 className="text-4xl font-bold mb-8 ml-5">AgroBooster</h1>
        </Link>
        <h3 className="text-lg ml-5">Welcomes, you Name</h3>

        <nav>
          <ul className="mt-32">
            <li className="mb-10 ">
              <Link
                to="basicInformation"
                className="block p-3 hover:bg-gray-100 hover:text-green-600 text-white cursor-pointer font-semibold text-2xl text-center w-full transition-all duration-300"
              >
                Basic Information
              </Link>
            </li>
            <li className="mb-4">
              <Link
                to="soilTesting"
                className="block p-3 hover:bg-gray-100 hover:text-green-600 text-white cursor-pointer font-semibold text-2xl text-center w-full transition-all duration-300"
              >
                Soil Testing
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      <div className="flex-1 ml-64 relative">
        <div className="absolute inset-0 bg-white bg-opacity-70"></div>

        <div className="relative z-10">
          <main className="p-6 bg-opacity-30 bg-gray-100 rounded-lg shadow-md mx-6 mt-6">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default FarmerDashboard;
