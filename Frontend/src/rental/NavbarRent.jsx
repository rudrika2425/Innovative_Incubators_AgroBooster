import React from "react";
import { Link } from "react-scroll";

function NavbarRent() {
  return (
    <nav className="bg-transparent   bg-opacity-90  top-0 left-0 w-full z-50 shadow-none">
      <div className="container  text-black mx-auto px-10 flex justify-between items-center py-4">
        <Link
          to="hero"
          spy={true}
          smooth={true}
          duration={500}
          className="cursor-pointer font-bold text-3xl"
        >
          Agro<span className="text-green-700">Booster</span>
        </Link>

        <ul className="hidden lg:flex space-x-8 mr-10">
          <li>
            <Link
              to="hero"
              spy={true}
              smooth={true}
              duration={500}
              className="cursor-pointer font-semibold text-lg hover:text-green-700"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="about"
              spy={true}
              smooth={true}
              duration={500}
              className="cursor-pointer font-semibold text-lg hover:text-green-700"
            >
              About Us
            </Link>
          </li>
          <li>
            <Link
              to="service"
              spy={true}
              smooth={true}
              duration={500}
              className="cursor-pointer font-semibold text-lg hover:text-green-700"
            >
              Services
            </Link>
          </li>
          <li>
            <Link
              to="contact"
              spy={true}
              smooth={true}
              duration={500}
              className="cursor-pointer font-semibold text-lg hover:text-green-700"
            >
              Contact Us
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default NavbarRent;
