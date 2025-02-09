import React from "react";
import { Link, NavLink } from "react-router-dom";
import LanguageDropdown from "../languageTranslation/LanguageToggle";
import { TranslatedText } from "../languageTranslation/TranslatedText";

function Navbar() {
  

  return (
    <nav className="flex bg-emerald-600 bg-opacity-100 sticky top-0 left-0 w-full z-50 shadow-md  h-19">
      <div className="container text-white mx-auto px-10 flex justify-between items-center py-4">
        <Link 
          to="/" 
          className="cursor-pointer  hover:text-amber-600 font-bold text-3xl no-underline"
        >
          <TranslatedText text="AgroBooster"/>
        </Link>

        <ul className="hidden lg:flex space-x-8 mr-10 mb-1 text-white">
          <li>
            <NavLink
              to="/"
              className=" cursor-pointer font-semibold text-xl hover:text-amber-600 no-underline"
            >
              <TranslatedText text="Home"/>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              className=" cursor-pointer font-semibold text-xl hover:text-amber-600 no-underline"
            >
              <TranslatedText text="About Us"/>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/services"
              className="  cursor-pointer font-semibold text-xl hover:text-amber-600 no-underline"
            >
              <TranslatedText text="Services"/>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contact"
              className="  cursor-pointer font-semibold text-xl hover:text-amber-600 no-underline"
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