import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import LanguageDropdown from "../languageTranslation/LanguageToggle";
import { TranslatedText } from "../languageTranslation/TranslatedText";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-emerald-600 sticky top-0 left-0 w-full z-50 shadow-md">
      <div className="container mx-auto px-4 lg:px-10">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link
            to="/"
            className="cursor-pointer hover:text-amber-600 font-bold text-3xl text-white no-underline"
          >
            <TranslatedText text="AgroBooster" />
          </Link>

          {/* Desktop Menu */}
          <ul className="hidden lg:flex space-x-8 text-white">
            <li>
              <NavLink
                to="/"
                className="cursor-pointer font-semibold text-xl hover:text-amber-600 no-underline"
              >
                <TranslatedText text="Home" />
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                className="cursor-pointer font-semibold text-xl hover:text-amber-600 no-underline"
              >
                <TranslatedText text="About Us" />
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/services"
                className="cursor-pointer font-semibold text-xl hover:text-amber-600 no-underline"
              >
                <TranslatedText text="Services" />
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contact"
                className="cursor-pointer font-semibold text-xl hover:text-amber-600 no-underline"
              >
                <TranslatedText text="Contact Us" />
              </NavLink>
            </li>
          </ul>

          {/* Language Dropdown - Desktop */}
          <div className="hidden lg:block">
            <LanguageDropdown />
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="lg:hidden text-white p-2"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden">
            <ul className="flex flex-col space-y-4 pb-4 text-white">
              <li>
                <NavLink
                  to="/"
                  className="block cursor-pointer font-semibold text-xl hover:text-amber-600 no-underline"
                  onClick={() => setIsOpen(false)}
                >
                  <TranslatedText text="Home" />
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/about"
                  className="block cursor-pointer font-semibold text-xl hover:text-amber-600 no-underline"
                  onClick={() => setIsOpen(false)}
                >
                  <TranslatedText text="About Us" />
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/services"
                  className="block cursor-pointer font-semibold text-xl hover:text-amber-600 no-underline"
                  onClick={() => setIsOpen(false)}
                >
                  <TranslatedText text="Services" />
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/contact"
                  className="block cursor-pointer font-semibold text-xl hover:text-amber-600 no-underline"
                  onClick={() => setIsOpen(false)}
                >
                  <TranslatedText text="Contact Us" />
                </NavLink>
              </li>
              {/* Language Dropdown - Mobile */}
              <li className="pt-2">
                <LanguageDropdown />
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;