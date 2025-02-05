import React from 'react';
import { Sidebar } from './Sidebar';
import { Outlet } from 'react-router-dom';

const FarmerDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Sidebar />
      <div className="md:ml-64 ml-0 pt-16 md:pt-0">
        <Outlet />
      </div>
    </div>
  );
};

export default FarmerDashboard;