import React from "react";
import { 
  BarChart2, Landmark, TestTube2, Microscope, CloudSun, CropIcon, 
  Leaf, Wheat, Sun, Droplet, Clock, Trophy, AlertCircle, Users, Database,Star
} from "lucide-react";

const FloatingElements = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
    {[...Array(25)].map((_, i) => (
      <div
        key={i}
        className="absolute animate-float opacity-20"
        style={{
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          animation: `float ${8 + Math.random() * 4}s infinite ${Math.random() * 2}s`,
        }}
      >
        {i % 4 === 0 ? (
          <Leaf className="w-12 h-12 text-emerald-600" />
        ) : i % 4 === 1 ? (
          <Wheat className="w-12 h-12 text-amber-600" />
        ) : i % 4 === 2 ? (
          <Sun className="w-12 h-12 text-yellow-600" />
        ) : (
          <Droplet className="w-12 h-12 text-blue-600" />
        )}
      </div>
    ))}
  </div>
);

const SectionWrapper = ({ id, title, children }) => (

  
 <div id={id} className="relative min-h-screen overflow-hidden bg-gradient-to-b from-yellow-100 to-yellow-200 py-16">

    <style>{`
      @keyframes float {
        0%, 100% { transform: translateY(0) rotate(0deg); }
        50% { transform: translateY(-20px) rotate(5deg); }
      }
      @keyframes pulse-slow {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.7; }
      }
      @keyframes bounce-slow {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-10px); }
      }
    `}</style>

    <FloatingElements />
    <div className="container mx-auto px-4 relative z-10">
      <h2 className="text-6xl font-extrabold text-emerald-900 text-center mb-16 tracking-tight">
        {title}
        <div className="text-xl font-normal text-emerald-700 mt-4 ml-5 mr-5">
        Empowering farmers with cutting-edge agricultural technology, we bring innovation to the fields. Our solutions enhance productivity, reduce waste, and promote sustainable farming. By integrating smart techniques and bioenzymes, we ensure healthier crops and soil. Together, we are shaping the future of agriculture for a greener tomorrow.
        </div>
      </h2>
      {children}
    </div>
  </div>
);

const Service = ({ id }) => {
  const purposes = [
    {
      icon: <BarChart2 />,
      secondaryIcon: <Database className="w-6 h-6 text-emerald-400 absolute top-2 right-2" />,
      title: "Data-Driven Insights",
      description: "Access real-time analysis of weather, soil, and terrain conditions to make informed farming decisions. Optimize practices to ensure optimal crop growth.",
      features: [
        "Real-time weather and soil monitoring",
        "AI-powered terrain analysis",
        "Smart decision-making tools",
        "Historical data insights"
      ],
      iconBg: "bg-emerald-100",
      iconColor: "text-emerald-500 animate-pulse",
      bgColor: "bg-gradient-to-br from-emerald-50/90 to-emerald-100/90",
    },
    {
      icon: <Landmark />,
      secondaryIcon: <Clock className="w-6 h-6 text-amber-400 absolute top-2 right-2" />,
      title: "Precision Tools",
      description: "Receive personalized crop calendars and task schedules tailored to your farm. Improve efficiency and productivity by managing time and resources effectively.",
      features: [
        "AI-driven crop calendar",
        "Automated task scheduling",
        "Resource allocation optimization",
        "Farm efficiency tracking"
      ],
      iconBg: "bg-amber-100",
      iconColor: "text-amber-500 animate-pulse",
      bgColor: "bg-gradient-to-br from-amber-100/90 to-amber-200/90",
    },
    {
      icon: <TestTube2 />,
      secondaryIcon: <AlertCircle className="w-6 h-6 text-yellow-600 absolute top-2 right-2" />,
      title: "Soil Testing",
      description: "Get data-backed recommendations for soil health to enhance crop yields. Identify nutrient deficiencies and optimize soil management.",
      features: [
        "Nutrient deficiency analysis",
        "Soil moisture level tracking",
        "pH and salinity assessment",
        "Fertilizer application insights"
      ],
      iconBg: "bg-yellow-100",
      iconColor: "text-yellow-600 animate-spin-slow",
      bgColor: "bg-gradient-to-br from-yellow-100/90 to-yellow-200/90",
    },
    {
      icon: <Microscope />,
      secondaryIcon: <Trophy className="w-6 h-6 text-lime-600 absolute top-2 right-2" />,
      title: "Disease Detection",
      description: "AI-powered plant disease recognition detects issues early, minimizing crop loss. Proactively manage plant health and reduce pesticide use.",
      features: [
        "AI-based plant disease identification",
        "Real-time health monitoring",
        "Early pest detection alerts",
        "Targeted treatment suggestions"
      ],
      iconBg: "bg-lime-100",
      iconColor: "text-lime-600",
      bgColor: "bg-gradient-to-br from-lime-100/90 to-lime-200/90",
    },
    {
      icon: <CloudSun />,
      secondaryIcon: <Users className="w-6 h-6 text-stone-600 absolute top-2 right-2" />,
      title: "Weather Prediction",
      description: "AI-driven weather and pest invasion forecasts help farmers prepare for extreme conditions. Make proactive decisions to safeguard crops from unpredictable weather.",
      features: [
        "Hyperlocal weather forecasting",
        "Storm and drought alerts",
        "Pest invasion predictions",
        "Climate impact assessment"
      ],
      iconBg: "bg-stone-100",
      iconColor: "text-stone-600 animate-bounce-slow",
      bgColor: "bg-gradient-to-br from-stone-100/90 to-stone-200/90",
    },
    {
      icon: <CropIcon />,
      secondaryIcon: <Droplet className="w-6 h-6 text-orange-600 absolute top-2 right-2" />,
      title: "Actionable Insights",
      description: "Receive real-time, actionable reports to enhance farming decisions. Proactively manage crops and operations with clear, data-driven insights.",
      features: [
        "Automated farm reports",
        "Custom performance metrics",
        "AI-powered decision support",
        "Sustainability and yield tracking"
      ],
      iconBg: "bg-orange-100",
      iconColor: "text-orange-600",
      bgColor: "bg-gradient-to-br from-orange-100/90 to-orange-200/90",
    },
  ];
  
  const StatsSection = () => {
    const stats = [
      { value: "20,000+", label: "Farmers Served", icon: <Users className="w-6 h-6" /> },
      { value: "30%", label: "Average Yield Increase", icon: <Trophy className="w-6 h-6" /> },
      { value: "40%", label: "Water Savings", icon: <Droplet className="w-6 h-6" /> },
      { value: "24/7", label: "Monitoring & Support", icon: <Clock className="w-6 h-6" /> },
    ];
  
    return (
      <div className="bg-yellow-600 py-16 rounded-3xl">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center text-white">
                <div className="flex justify-center mb-4">
                  {React.cloneElement(stat.icon, { className: "w-12 h-12 text-emerald-300" })}
                </div>
                <div className="text-4xl font-bold mb-2">{stat.value}</div>
                <div className="text-emerald-200">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };
  return (
    <SectionWrapper id={id} title="Agricultural Services">
     
      <div className="grid md:grid-cols-3 gap-8 mx-4 md:mx-20 mb-15 ">
        {purposes.map((purpose, index) => (
          <div
            key={index}
            className={`relative p-8 text-center transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-emerald-100 flex flex-col items-center justify-between rounded-3xl ${purpose.bgColor} border border-emerald-100`}
          >
            {purpose.secondaryIcon}
            <div
              className={`p-6 rounded-full mb-6 ${purpose.iconBg} flex items-center justify-center transform transition-transform duration-300 hover:scale-110`}
            >
              {React.cloneElement(purpose.icon, {
                className: `w-12 h-12 ${purpose.iconColor}`,
              })}
            </div>
            <div className="space-y-4">
              <h3 className={`text-2xl font-bold mb-3 ${purpose.iconColor}`}>
                {purpose.title}
              </h3>
              <p className="text-emerald-800 text-sm leading-relaxed">
                {purpose.description}
              </p>
              <ul className="text-sm text-emerald-700 mt-4 space-y-2">
                {purpose.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center justify-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
      <StatsSection />
  
    </SectionWrapper>
  );
};

export default Service;