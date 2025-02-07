import React from "react";
import { Link, NavLink } from "react-router-dom";
import LanguageSelector from "../LanguageChange/LanguageSelector";
import { useTranslation } from "react-i18next";

function Navbar() {
  const { t } = useTranslation();

  return (
    <nav className="bg-white sticky bg-opacity-100 fixed top-0 left-0 w-full z-50 shadow-md">
      <div className="container text-emerald-600 mx-auto px-10 flex justify-between items-center py-4">
        <Link 
          to="/" 
          className="cursor-pointer font-bold text-3xl"
        >
          {t("Agro")}<span className="text-amber-600">{t("Booster")}</span>
        </Link>

        <ul className="hidden lg:flex space-x-8 mr-10">
          <li>
            <NavLink
              to="/"
              className="cursor-pointer font-semibold text-lg hover:text-amber-600"
            >
              {t("home")}
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              className="cursor-pointer font-semibold text-lg hover:text-amber-600"
            >
              {t("about")}
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/services"
              className="cursor-pointer font-semibold text-lg hover:text-amber-600"
            >
              {t("services")}
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contact"
              className="cursor-pointer font-semibold text-lg hover:text-amber-600"
            >
              {t("contact")}
            </NavLink>
          </li>
        </ul>

        <LanguageSelector />
      </div>
    </nav>
  );
}

export default Navbar;