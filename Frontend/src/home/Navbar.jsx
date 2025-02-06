import React from "react";
import { Link } from "react-scroll";
import LanguageSelector from "../LanguageChange/LanguageSelector"; // Import LanguageSelector
import { useTranslation } from "react-i18next"; // Import useTranslation hook

function Navbar() {
  const { t } = useTranslation();

  return (
    <nav className="bg-transparent sticky bg-opacity-90 fixed top-0 left-0 w-full z-50 shadow-none -mb-17">
      <div className="container text-emerald-600 mx-auto px-10 flex justify-between items-center py-4">
        <Link
          to="hero"
          spy={true}
          smooth={true}
          duration={500}
          className="cursor-pointer font-bold text-3xl"
        >
         {t("Agro")}<span className="text-amber-600">{t("Booster")}</span>
        </Link>

        <ul className="hidden lg:flex space-x-8 mr-10">
          <li>
            <Link
              to="hero"
              spy={true}
              smooth={true}
              duration={500}
              className="cursor-pointer font-semibold text-lg hover:text-amber-600"
            >
              {t("home")}
            </Link>
          </li>
          <li>
            <Link
              to="about"
              spy={true}
              smooth={true}
              duration={500}
              className="cursor-pointer font-semibold text-lg hover:text-amber-600"
            >
              {t("about")}
            </Link>
          </li>
          <li>
            <Link
              to="service"
              spy={true}
              smooth={true}
              duration={500}
              className="cursor-pointer font-semibold text-lg hover:text-amber-600"
            >
              {t("services")}
            </Link>
          </li>
          <li>
            <Link
              to="contact"
              spy={true}
              smooth={true}
              duration={500}
              className="cursor-pointer font-semibold text-lg hover:text-amber-600"
            >
              {t("contact")}
            </Link>
          </li>
        </ul>

        {/* Language Selector */}
        <LanguageSelector />
      </div>
    </nav>
  );
}

export default Navbar;
