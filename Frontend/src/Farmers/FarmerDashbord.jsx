import React from 'react';
import { Sidebar } from './Sidebar';
import { Outlet } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const FarmerDashboard = () => {
  const location = useLocation();
  const cropData = location.state?.crop;
  console.log("Received crop data:", cropData);


  return (
    <div className="min-h-screen bg-gray-100">
      <Sidebar />
      <div className="md:ml-64 ml-0 md:pt-0">
        <Outlet />
      </div>
    </div>
  );
};

export default FarmerDashboard;
