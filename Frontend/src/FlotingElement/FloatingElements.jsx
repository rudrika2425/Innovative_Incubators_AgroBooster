import React from "react";
import { Sprout, Leaf, Sun, Cloud, Tractor } from "lucide-react";

const FloatingElements = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {[...Array(20)].map((_, i) => (
      <div
        key={i}
        className="absolute animate-float opacity-40"
        style={{
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          animation: `float ${8 + Math.random() * 4}s infinite ${Math.random() * 2}s`,
          zIndex: 0,
        }}
      >
        {i % 5 === 0 ? (
          <Leaf className="w-8 h-8 text-yellow-600" />
        ) : i % 5 === 1 ? (
          <Sprout className="w-9 h-9 text-lime-600" />
        ) : i % 5 === 2 ? (
          <Sun className="w-10 h-10 text-yellow-600" />
        ) : i % 5 === 3 ? (
          <Tractor className="w-11 h-11 text-green-600" />
        ) : (
          <Cloud className="w-10 h-10 text-gray-600" />
        )}
      </div>
    ))}
  </div>
);

export default FloatingElements;
