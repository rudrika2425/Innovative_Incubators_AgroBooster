import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Home, Sprout, Newspaper, Menu, X } from 'lucide-react';
import { TranslatedText } from '../languageTranslation/TranslatedText';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    {
      to: "/",
      icon: <Home className="w-5 h-5" />,
      text: "Home"
    },
    {
      to: "/schemes",
      icon: <Sprout className="w-5 h-5" />,
      text: "Schemes"
    },
    {
      to: "/news",
      icon: <Newspaper className="w-5 h-5" />,
      text: "News"
    }
  ];

  return (
    <nav className="bg-gradient-to-r from-emerald-600 to-emerald-500 shadow-lg backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <Link
            to="/"
            className="flex items-center gap-2 lg:gap-3 group"
          >
            <div className="p-2 bg-white/10 rounded-full transition-all duration-300 group-hover:bg-white/20">
              <Sprout className="h-5 w-5 lg:h-6 lg:w-6 text-white" />
            </div>
            <span className="text-white text-lg lg:text-2xl font-bold truncate">
              <TranslatedText text="Schemes and News"/>
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.text}
                to={link.to}
                className="flex items-center gap-2 text-white hover:text-yellow-200 text-lg font-medium transition-colors duration-300"
              >
                {link.icon}
                <span><TranslatedText text={link.text}/></span>
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-white hover:bg-white/10 rounded-lg transition-colors duration-300"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isOpen && (
          <div className="lg:hidden py-4 px-2">
            <div className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.text}
                  to={link.to}
                  className="flex items-center gap-3 text-white hover:text-yellow-200 text-lg font-medium p-2 rounded-lg hover:bg-white/10 transition-all duration-300"
                  onClick={() => setIsOpen(false)}
                >
                  {link.icon}
                  <span><TranslatedText text={link.text}/></span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;