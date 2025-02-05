import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Home, Settings, Users, FileText, Bell } from 'lucide-react';

export const Sidebar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    
    const menuItems = [
      { id: 'Home', icon: Home, label: 'Home', path: '/farmerdashboard' },
      { id: 'yourfarms', icon: Bell, label: 'Your Farms', path: '/farmerdashboard/your-farms' },
      { id: 'rentouttools', icon: Users, label: 'Rent Out Tools', path: '/farmerdashboard/rent-out-tools' },
      { id: 'borowtools', icon: FileText, label: 'Borrow Tools', path: '/farmerdashboard/borrow-tools' },
      
      
    ];
  
    return (
      <div className="w-64 h-screen bg-white shadow-lg fixed left-0">
        <div className="flex flex-col h-full">
          <div className="p-4">
            <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
          </div>
          <nav className="flex-1">
            {menuItems.map(({ id, icon: Icon, label, path }) => (
              <button
                key={id}
                onClick={() => navigate(path)}
                className={`flex items-center w-full px-6 py-3 text-left
                  ${location.pathname === path
                    ? 'bg-blue-50 text-blue-600 border-r-4 border-blue-600' 
                    : 'text-gray-600 hover:bg-gray-50'
                  }`}
              >
                <Icon className="w-5 h-5 mr-3" />
                <span className="font-medium">{label}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>
    );
  };
