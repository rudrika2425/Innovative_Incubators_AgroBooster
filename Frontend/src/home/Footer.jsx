import React from 'react';
import { Leaf, Sprout, Sun } from "lucide-react";
import { Link } from 'react-router-dom';
import FloatingElements from "../FlotingElement/FloatingElements";
const Footer = () => {
  

  return (
    <section className="relative bg-emerald-700 text-white py-5  overflow-hidden">
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-30px) rotate(5deg); }
        }
      `}</style>
      
      <FloatingElements />
      
      <div className="container mx-auto px-6 text-center relative z-10">
        <h2 className="text-5xl font-bold mb-8">
          Cultivating a Sustainable Agricultural Future
        </h2>
        <p className="text-2xl max-w-4xl mx-auto mb-5">
          Our mission transcends technological innovation – we are building a comprehensive ecosystem that empowers farmers, optimizes agricultural practices, and contributes to global food security through intelligent, data-driven solutions.
        </p>
        <h4 className="text-lg text-yellow-600">All Rights Reserved under @AgroBooster</h4>
      </div>
    </section>
  );
};

export default Footer;