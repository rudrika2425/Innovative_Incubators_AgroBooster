import React from 'react';
import { Leaf, Sprout, Sun } from "lucide-react";
import { Link } from 'react-router-dom';

const Footer = () => {
  const FloatingElements = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(50)].map((_, i) => (
        <div
          key={i}
          className="absolute animate-float opacity-40"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animation: `float ${8 + Math.random() * 4}s infinite ${Math.random() * 2}s`,
            zIndex: 0
          }}
        >
          {i % 3 === 0 ? (
            <Leaf className="w-8 h-8 text-emerald-600" />
          ) : i % 3 === 1 ? (
            <Sprout className="w-9 h-9 text-lime-600" />
          ) : (
            <Sun className="w-10 h-10 text-yellow-600" />
          )}
        </div>
      ))}
    </div>
  );

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