import React from "react";
import { Leaf, Sprout, Sun, Tractor, Droplet, Wheat, Cloud } from "lucide-react";
import Navbar from "./Navbar";
import Hero from "./Hero";
import About from "./About";
import Service from "./Service";
import Contact from "./Contact";
import Footer from "./Footer";
import { useTranslation } from "react-i18next";

const Dashboard = () => {
  const { t } = useTranslation();

  const FloatingElements = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute animate-float"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animation: `float ${8 + Math.random() * 4}s infinite ${Math.random() * 2}s`,
          }}
        >
          {i % 5 === 0 ? (
            <Leaf className="w-6 h-6 text-emerald-600/30" />
          ) : i % 5 === 1 ? (
            <Sprout className="w-7 h-7 text-lime-600/30" />
          ) : i % 5 === 2 ? (
            <Sun className="w-8 h-8 text-yellow-600/30" />
          ) : i % 5 === 3 ? (
            <Tractor className="w-9 h-9 text-green-600/30" />
          ) : (
            <Droplet className="w-7 h-7 text-blue-600/30" />
          )}
        </div>
      ))}
    </div>
  );

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-green-50 to-emerald-200">
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
      `}</style>

      <FloatingElements />
      <div className="absolute inset-0 bg-transparent opacity-80 mesh-gradient"></div>

      <div className="relative z-10">
        <Navbar />
        <Hero id="hero" title={t("home")} />
        <About id="about" title={t("about")} />
        <Service id="service" title={t("services")} />
        <Contact id="contact" title={t("contact")} />
        <Footer />
      </div>
    </div>
  );
};

export default Dashboard;
