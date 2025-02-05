import React from 'react';
import { Sidebar } from './Sidebar';
import { Navbar } from './Navbar';
import { Outlet } from 'react-router-dom';

const FarmerDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Sidebar />
      <Navbar />
      <div className="ml-64 pt-17">
        <Outlet />
      </div>
    </div>
  );
};

export default FarmerDashboard;