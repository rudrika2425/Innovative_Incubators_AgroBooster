import React from "react";
import { useTranslation } from "react-i18next"; // Import the hook
import Navbar from "./Navbar";
import Hero from "./Hero";
import About from "./About";
import Service from "./Service";
import Contact from "./Contact";
import Footer from "./Footer";

const Dashboard = () => {
  const { t } = useTranslation(); // Initialize the translation hook

  return (
    <div>
      {/* Pass a callback function to Navbar */}
      <Navbar />
      <Hero id="hero" title={t("home")} /> {/* Example of passing translated text */}
      <About id="about" title={t("about")} />
      <Service id="service" title={t("services")} />
      <Contact id="contact" title={t("contact")} />
      <Footer />
    </div>
  );
};

export default Dashboard;
