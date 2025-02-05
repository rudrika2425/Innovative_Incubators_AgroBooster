import React from "react"; 
import { 
  BarChart2, 
  Landmark, 
  TestTube2, 
  Microscope, 
  CloudSun, 
  CropIcon,
  Leaf,
  Wheat,
  Sun
} from "lucide-react";    

const Service = ({ id }) => {
  const purposes = [
    {
      icon: <BarChart2 />,
      title: "Data-Driven Insights",
      description: "Access real-time analysis of weather, soil, and terrain conditions to make informed farming decisions. Optimize practices to ensure optimal crop growth.",
      iconBg: "bg-amber-100",
      iconColor: "text-amber-600"
    },
    {
      icon: <Landmark />,
      title: "Precision Tools",
      description: "Receive personalized crop calendars and task schedules tailored to your farm. Improve efficiency and productivity by managing time and resources effectively.",
      iconBg: "bg-orange-100",
      iconColor: "text-orange-600"
    },
    {
      icon: <TestTube2 />,
      title: "Soil Testing",
      description: "Get data-backed recommendations for soil health to enhance crop yields. Identify nutrient deficiencies and optimize soil management..",
      iconBg: "bg-pink-100",
      iconColor: "text-pink-600"
    },
    {
      icon: <Microscope />,
      title: "Disease Detection",
      description: "AI-powered plant disease recognition detects issues early, minimizing crop loss. Proactively manage plant health and reduce pesticide use.",
      iconBg: "bg-rose-100",
      iconColor: "text-rose-600"
    },
    {
      icon: <CloudSun />,
      title: "Weather Prediction",
      description: "AI-driven weather and pest invasion forecasts help farmers prepare for extreme conditions. Make proactive decisions to safeguard crops from unpredictable weather.",
      iconBg: "bg-emerald-100",
      iconColor: "text-emerald-600"
    },
    {
      icon: <CropIcon />,
      title: "Actionable Insights",
      description: "Receive real-time, actionable reports to enhance farming decisions. Proactively manage crops and operations with clear, data-driven insights.",
      iconBg: "bg-slate-100",
      iconColor: "text-slate-600"
    }
  ];

  const FloatingElements = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 ">
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute animate-float opacity-20"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animation: `float ${8 + Math.random() * 4}s infinite ${Math.random() * 2}s`,
          }}
        >
          {i % 3 === 0 ? (
            <Leaf className="w-10 h-10 text-emerald-600" />
          ) : i % 3 === 1 ? (
            <Wheat className="w-10 h-10 text-amber-600" />
          ) : (
            <Sun className="w-10 h-10 text-yellow-600" />
          )}
        </div>
      ))}
    </div>
  );

  return (
    <div id={id} className="relative min-h-screen overflow-hidden bg-gradient-to-b from-green-50 to-emerald-200 py-16">
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
      `}</style>
      
      <FloatingElements />

      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-4xl font-extrabold text-emerald-900 text-center mb-12">
          Our <span className="text-amber-600">Services</span>
        </h2>
        <div className="grid md:grid-cols-3 gap-6 m-15">
          {purposes.map((purpose, index) => (
            <div
              key={index}
              className="bg-white border border-emerald-100 rounded-2xl p-6 text-center 
              transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl 
              flex flex-col items-center justify-between"
            >
              <div className={`p-4 rounded-full mb-4 ${purpose.iconBg} flex items-center justify-center`}>
                {React.cloneElement(purpose.icon, {
                  className: `w-10 h-10 ${purpose.iconColor}`
                })}
              </div>
              <div>
                <h3 className={`text-xl font-bold mb-3 ${purpose.iconColor}`}>
                  {purpose.title}
                </h3>
                <p className="text-emerald-800 text-sm">
                  {purpose.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Service;