import React from "react";
import { Link, NavLink } from "react-router-dom";
import LanguageDropdown from "../languageTranslation/LanguageToggle";
import { TranslatedText } from "../languageTranslation/TranslatedText";

function Navbar() {
  

  return (
    <nav className="bg-white sticky bg-opacity-100 fixed top-0 left-0 w-full z-50 shadow-md">
      <div className="container text-emerald-600 mx-auto px-10 flex justify-between items-center py-4">
        <Link 
          to="/" 
          className="cursor-pointer font-bold text-3xl"
        >
          <TranslatedText text="AgroBooster"/>
        </Link>

        <ul className="hidden lg:flex space-x-8 mr-10">
          <li>
            <NavLink
              to="/"
              className="cursor-pointer font-semibold text-lg hover:text-amber-600"
            >
              <TranslatedText text="Home"/>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              className="cursor-pointer font-semibold text-lg hover:text-amber-600"
            >
              <TranslatedText text="About Us"/>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/services"
              className="cursor-pointer font-semibold text-lg hover:text-amber-600"
            >
              <TranslatedText text="Services"/>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contact"
              className="cursor-pointer font-semibold text-lg hover:text-amber-600"
            >
              <TranslatedText text="Contact Us"/>
            </NavLink>
          </li>
        </ul>

        <LanguageDropdown />
      </div>
    </nav>
  );
}

export default Navbar;