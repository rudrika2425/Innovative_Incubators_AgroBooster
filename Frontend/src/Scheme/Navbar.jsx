import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-green-600 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l9-9 9 9M5 10v10a1 1 0 001 1h3a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1h3a1 1 0 001-1V10M9 21h6" />
            </svg>
            <span className="text-white text-xl font-bold">Farmer's Portal</span>
          </Link>
          <div className="flex space-x-6">
            <Link to="/schemes" className="text-white hover:text-green-200 font-medium">Schemes</Link>
            <Link to="/news" className="text-white hover:text-green-200 font-medium">News</Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;