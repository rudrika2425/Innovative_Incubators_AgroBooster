import React from "react";
import { Link, NavLink } from "react-router-dom";
import LanguageDropdown from "../languageTranslation/LanguageToggle";
import { TranslatedText } from "../languageTranslation/TranslatedText";

function Navbar() {
  

  return (
    <nav className="bg-white bg-opacity-100 sticky top-0 left-0 w-full z-50 shadow-md">
      <div className="container text-emerald-600 mx-auto px-10 flex justify-between items-center py-2">
        <Link 
          to="/" 
          className="cursor-pointer  text-emerald-600  hover:text-amber-600 font-bold text-3xl no-underline"
        >
          <TranslatedText text="AgroBooster"/>
        </Link>

        <ul className="hidden lg:flex space-x-8 mr-10  mt-3 ">
          <li>
            <NavLink
              to="/"
              className="  text-emerald-600 cursor-pointer font-semibold text-lg hover:text-amber-600 no-underline"
            >
              <TranslatedText text="Home"/>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              className=" text-emerald-600 cursor-pointer font-semibold text-lg hover:text-amber-600 no-underline"
            >
              <TranslatedText text="About Us"/>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/services"
              className=" text-emerald-600 cursor-pointer font-semibold text-lg hover:text-amber-600 no-underline"
            >
              <TranslatedText text="Services"/>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contact"
              className="  text-emerald-600 cursor-pointer font-semibold text-lg hover:text-amber-600 no-underline"
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