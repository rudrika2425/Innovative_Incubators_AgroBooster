import React from "react";
import { 
  BarChart2, Landmark, TestTube2, Microscope, CloudSun, CropIcon, 
  Droplet, Clock, Trophy, AlertCircle, Users, Database
} from "lucide-react";

const SectionWrapper = ({ id, title, children }) => (
  <div id={id} className="relative min-h-screen overflow-hidden bg-gradient-to-b from-yellow-100 to-yellow-200 py-16">
    <div className="container mx-auto px-4 relative z-10">
      <h2 className="text-6xl font-extrabold text-emerald-900 text-center mb-16">
        {title}
        <div className="text-xl font-normal text-emerald-700 mt-10 p-5">
          Empowering farmers with cutting-edge agricultural technology, we bring innovation to the fields. Our solutions enhance productivity, reduce waste, and promote sustainable farming. By integrating smart techniques and bioenzymes, we ensure healthier crops and soil. Together, we are shaping the future of agriculture for a emeralder tomorrow.
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
      secondaryIcon: <Database className="w-6 h-6 text-emerald-900 absolute top-2 right-2" />,
      title: "Data-Driven Insights",
      description: "Access real-time analysis of weather, soil, and terrain conditions to make informed farming decisions. Optimize practices to ensure optimal crop growth.",
      features: [
        "Real-time weather and soil monitoring",
        "AI-powered terrain analysis",
        "Smart decision-making tools",
        "Historical data insights"
      ],
      iconBg: "bg-emerald-100",
      iconColor: "text-emerald-900",
      bgColor: "bg-emerald-200",
      textColor: "text-emerald-900"
    },
    {
      icon: <Landmark />,
      secondaryIcon: <Clock className="w-6 h-6 text-rose-900 absolute top-2 right-2" />,
      title: "Precision Tools",
      description: "Receive personalized crop calendars and task schedules tailored to your farm. Improve efficiency and productivity by managing time and resources effectively.",
      features: [
        "AI-driven crop calendar",
        "Automated task scheduling",
        "Resource allocation optimization",
        "Farm efficiency tracking"
      ],
      iconBg: "bg-rose-100",
      iconColor: "text-rose-900",
      bgColor: "bg-rose-200",
      textColor: "text-rose-900"
    },
    {
      icon: <TestTube2 />,
      secondaryIcon: <AlertCircle className="w-6 h-6 text-violet-900 absolute top-2 right-2" />,
      title: "Soil Testing",
      description: "Get data-backed recommendations for soil health to enhance crop yields. Identify nutrient deficiencies and optimize soil management.",
      features: [
        "Nutrient deficiency analysis",
        "Soil moisture level tracking",
        "pH and salinity assessment",
        "Fertilizer application insights"
      ],
      iconBg: "bg-violet-100",
      iconColor: "text-violet-900",
      bgColor: "bg-violet-200",
      textColor: "text-violet-900"
    },
    {
      icon: <Microscope />,
      secondaryIcon: <Trophy className="w-6 h-6 text-lime-900 absolute top-2 right-2" />,
      title: "Disease Detection",
      description: "AI-powered plant disease recognition detects issues early, minimizing crop loss. Proactively manage plant health and reduce pesticide use.",
      features: [
        "AI-based plant disease identification",
        "Real-time health monitoring",
        "Early pest detection alerts",
        "Targeted treatment suggestions"
      ],
      iconBg: "bg-lime-100",
      iconColor: "text-lime-900",
      bgColor: "bg-lime-200",
      textColor: "text-lime-900"
    },
    {
      icon: <CloudSun />,
      secondaryIcon: <Users className="w-6 h-6 text-stone-900 absolute top-2 right-2" />,
      title: "Weather Prediction",
      description: "AI-driven weather and pest invasion forecasts help farmers prepare for extreme conditions. Make proactive decisions to safeguard crops from unpredictable weather.",
      features: [
        "Hyperlocal weather forecasting",
        "Storm and drought alerts",
        "Pest invasion predictions",
        "Climate impact assessment"
      ],
      iconBg: "bg-stone-100",
      iconColor: "text-stone-900",
      bgColor: "bg-stone-200",
      textColor: "text-stone-900"
    },
    {
      icon: <CropIcon />,
      secondaryIcon: <Droplet className="w-6 h-6 text-orange-900 absolute top-2 right-2" />,
      title: "Actionable Insights",
      description: "Receive real-time, actionable reports to enhance farming decisions. Proactively manage crops and operations with clear, data-driven insights.",
      features: [
        "Automated farm reports",
        "Custom performance metrics",
        "AI-powered decision support",
        "Sustainability and yield tracking"
      ],
      iconBg: "bg-orange-100",
      iconColor: "text-orange-900",
      bgColor: "bg-orange-200",
      textColor: "text-orange-900"
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
      <div className="bg-yellow-600 py-16 rounded-3xl mt-10">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center text-white">
                <div className="flex justify-center mb-4">
                  {React.cloneElement(stat.icon, { className: "w-12 h-12 text-emerald-300" })}
                </div>
                <div className="text-4xl font-bold mb-2">{stat.value}</div>
                <div className="text-emerald-200">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <SectionWrapper id={id} title="Agricultural Services">
      <div className="grid md:grid-cols-3 gap-6 mx-4 md:mx-16">
        {purposes.map((purpose, index) => (
          <div
            key={index}
            className={`relative p-6 text-center flex flex-col items-center justify-between rounded-2xl ${purpose.bgColor} border border-transparent`}
          >
            {purpose.secondaryIcon}
            <div
              className={`p-4 rounded-full mb-4 ${purpose.iconBg}`}
            >
              {React.cloneElement(purpose.icon, {
                className: `w-8 h-8 ${purpose.iconColor}`,
              })}
            </div>
            <div className="space-y-3">
              <h3 className={`text-xl font-bold mb-2 ${purpose.textColor}`}>
                {purpose.title}
              </h3>
              <p className={`text-sm leading-relaxed ${purpose.textColor}`}>
                {purpose.description}
              </p>
              <ul className={`text-sm ${purpose.textColor} mt-3 space-y-1`}>
                {purpose.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center justify-center gap-2">
                    <span className={`w-1.5 h-1.5 rounded-full ${purpose.iconBg}`}></span>
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