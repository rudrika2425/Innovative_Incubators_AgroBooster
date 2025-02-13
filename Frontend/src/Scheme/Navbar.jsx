import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Sprout, Newspaper } from 'lucide-react';
import { TranslatedText } from '../languageTranslation/TranslatedText';

const Navbar = () => {
  return (
    <nav className="bg-gradient-to-r from-emerald-600 to-emerald-500 shadow-lg p-4 backdrop-blur-sm sticky top-0 ">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-15">
          {/* Logo and Brand */}
          <Link 
            to="/" 
            className="flex items-center gap-3 group"
          >
            <div className="p-2 bg-white/10 rounded-full transition-all duration-300 group-hover:bg-white/20">
              <Sprout className="h-6 w-6 text-white" />
            </div>
            <span className="text-white text-2xl font-bold">
              <TranslatedText text="Government Schemes and News"/>
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-8">
            <Link 
              to="/" 
              className="flex items-center gap-2 text-white hover:text-yellow-200 text-lg font-medium transition-colors duration-300"
            >
              <Home className="w-5 h-5" />
              <span><TranslatedText text="Home"/></span>
            </Link>
            
            <Link 
              to="/schemes" 
              className="flex items-center gap-2 text-white hover:text-yellow-200 text-lg font-medium transition-colors duration-300"
            >
              <Sprout className="w-5 h-5" />
              <span><TranslatedText text="Schemes"/></span>
            </Link>
            
            <Link 
              to="/news" 
              className="flex items-center gap-2 text-white hover:text-yellow-200 text-lg font-medium transition-colors duration-300"
            >
              <Newspaper className="w-5 h-5" />
              <span><TranslatedText text="News"/></span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;