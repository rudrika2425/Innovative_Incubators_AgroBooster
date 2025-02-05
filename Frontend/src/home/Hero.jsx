import React from "react";
import { Wheat, Sprout, Leaf, Sun, Cloud, Droplet, Tractor } from "lucide-react";

const Hero = ({ id }) => {
  const FloatingElements = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(30)].map((_, i) => (
        <div
          key={i}
          className="absolute animate-float opacity-20"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animation: `float ${8 + Math.random() * 4}s infinite ${Math.random() * 2}s`,
            zIndex: 1
          }}
        >
          {i % 6 === 0 ? (
            <Leaf className="w-8 h-8 text-emerald-600" />
          ) : i % 6 === 1 ? (
            <Sprout className="w-9 h-9 text-lime-600" />
          ) : i % 6 === 2 ? (
            <Sun className="w-10 h-10 text-yellow-600" />
          ) : i % 6 === 3 ? (
            <Tractor className="w-11 h-11 text-green-600" />
          ) : i % 6 === 4 ? (
            <Droplet className="w-9 h-9 text-blue-600" />
          ) : (
            <Cloud className="w-10 h-10 text-gray-600" />
          )}
        </div>
      ))}
    </div>
  );

  return (
    <div id={id} className="relative min-h-screen bg-gradient-to-b from-green-50 to-emerald-200">
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
      `}</style>

      <FloatingElements />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-4">
        <div className="space-y-6 max-w-5x mt-5l">
          {/* Icon Group */}
          <div className="flex justify-center gap-4 mb-4">
            <div className="p-4 bg-amber-100 rounded-full shadow-lg animate-bounce-slow">
              <Wheat className="w-12 h-12 text-amber-600" />
            </div>
            <div className="p-4 bg-emerald-100 rounded-full shadow-lg animate-bounce-slow delay-100">
              <Sprout className="w-12 h-12 text-emerald-600" />
            </div>
            <div className="p-4 bg-lime-100 rounded-full shadow-lg animate-bounce-slow delay-200">
              <Leaf className="w-12 h-12 text-lime-600" />
            </div>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl md:text-6xl font-extrabold text-emerald-900 mb-4 tracking-tight leading-tight">
            AGRICULTURAL COMMUNITY SERVICE
          </h1>

          {/* Subtitle */}
          <p className="text-2xl md:text-4xl text-emerald-800 font-medium mb- max-w-3xl mx-auto leading-relaxed">
            Bringing innovative solutions to 
            <span className="text-amber-600"> farming communities</span>
          </p>

          {/* Feature Points */}
          <div className="flex flex-wrap justify-center gap-6 mb-12">
            <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full border border-emerald-200 shadow-lg">
              <Sprout className="w-5 h-5 text-emerald-600" />
              <span className="text-emerald-900">Sustainable Farming</span>
            </div>
            <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full border border-emerald-200 shadow-lg">
              <Sun className="w-5 h-5 text-amber-600" />
              <span className="text-emerald-900">Smart Agriculture</span>
            </div>
            <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full border border-emerald-200 shadow-lg">
              <Cloud className="w-5 h-5 text-lime-600" />
              <span className="text-emerald-900">Weather Intelligence</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a
              href="/chatbot"
              className="group relative inline-flex items-center gap-3 bg-emerald-600 text-white px-8 py-4 rounded-full hover:bg-emerald-500 transition-all duration-300 font-medium text-lg shadow-lg hover:shadow-xl"
            >
              <Sprout className="w-6 h-6" />
              <span>Plant Bot</span>
            </a>
            <a
              href="/login"
              className="group relative inline-flex items-center gap-3 bg-amber-600 text-white px-8 py-4 rounded-full hover:bg-amber-500 transition-all duration-300 font-medium text-lg shadow-lg hover:shadow-xl"
            >
              <Wheat className="w-6 h-6" />
              <span>Grow Crop</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;