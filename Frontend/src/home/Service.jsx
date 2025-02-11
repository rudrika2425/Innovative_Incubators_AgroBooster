import React from "react";
import { 
  BarChart2, Landmark, TestTube2, Microscope, CloudSun, CropIcon, 
  Droplet, Clock, Trophy, AlertCircle, Users, Database
} from "lucide-react";
import { TranslatedText } from '../languageTranslation/TranslatedText';

const SectionWrapper = ({ id, title, children }) => (
  <div id={id} className="relative min-h-screen overflow-hidden bg-gradient-to-b from-yellow-100 to-yellow-200 py-16">
    <div className="container mx-auto px-4 relative z-10">
      <h2 className="text-6xl font-extrabold text-emerald-900 text-center mb-16">
        {title}
        <div className="text-xl font-normal text-emerald-700 mt-10 p-5">
          <TranslatedText text="Empowering farmers with cutting-edge agricultural technology, we bring innovation to the fields. Our solutions enhance productivity, reduce waste, and promote sustainable farming. By integrating smart techniques and bioenzymes, we ensure healthier crops and soil. Together, we are shaping the future of agriculture for a emeralder tomorrow." />
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
      title: <TranslatedText text="Data-Driven Insights"/>,
      description: <TranslatedText text="Access real-time analysis of weather, soil, and terrain conditions to make informed farming decisions. Optimize practices to ensure optimal crop growth." />,
      features: [
        <TranslatedText text="Real-time weather and soil monitoring" />,
        <TranslatedText text="AI-powered terrain analysis" />,
        <TranslatedText text="Smart decision-making tools" />,
        <TranslatedText text="Historical data insights" />
      ],
      iconBg: "bg-emerald-100",
      iconColor: "text-emerald-900",
      bgColor: "bg-emerald-200",
      textColor: "text-emerald-900"
    },
    {
      icon: <Landmark />,
      secondaryIcon: <Clock className="w-6 h-6 text-rose-900 absolute top-2 right-2" />,
      title: <TranslatedText text="Precision Tools"/>,
      description: <TranslatedText text="Receive personalized crop calendars and task schedules tailored to your farm. Improve efficiency and productivity by managing time and resources effectively." />,
      features: [
        <TranslatedText text="AI-driven crop calendar" />,
        <TranslatedText text="Automated task scheduling" />,
        <TranslatedText text="Resource allocation optimization" />,
        <TranslatedText text="Farm efficiency tracking" />
      ],
      iconBg: "bg-rose-100",
      iconColor: "text-rose-900",
      bgColor: "bg-rose-200",
      textColor: "text-rose-900"
    },
    {
      icon: <TestTube2 />,
      secondaryIcon: <AlertCircle className="w-6 h-6 text-violet-900 absolute top-2 right-2" />,
      title: <TranslatedText text="Soil Testing"/>,
      description: <TranslatedText text="Get data-backed recommendations for soil health to enhance crop yields. Identify nutrient deficiencies and optimize soil management." />,
      features: [
        <TranslatedText text="Nutrient deficiency analysis" />,
        <TranslatedText text="Soil moisture level tracking" />,
        <TranslatedText text="pH and salinity assessment" />,
        <TranslatedText text="Fertilizer application insights" />
      ],
      iconBg: "bg-violet-100",
      iconColor: "text-violet-900",
      bgColor: "bg-violet-200",
      textColor: "text-violet-900"
    },
    {
      icon: <Microscope />,
      secondaryIcon: <Trophy className="w-6 h-6 text-lime-900 absolute top-2 right-2" />,
      title: <TranslatedText text="Disease Detection"/>,
      description: <TranslatedText text="AI-powered plant disease recognition detects issues early, minimizing crop loss. Proactively manage plant health and reduce pesticide use." />,
      features: [
        <TranslatedText text="AI-based plant disease identification" />,
        <TranslatedText text="Real-time health monitoring" />,
        <TranslatedText text="Early pest detection alerts" />,
        <TranslatedText text="Targeted treatment suggestions" />
      ],
      iconBg: "bg-lime-100",
      iconColor: "text-lime-900",
      bgColor: "bg-lime-200",
      textColor: "text-lime-900"
    },
    {
      icon: <CloudSun />,
      secondaryIcon: <Users className="w-6 h-6 text-stone-900 absolute top-2 right-2" />,
      title: <TranslatedText text="Weather Prediction"/>,
      description: <TranslatedText text="AI-driven weather and pest invasion forecasts help farmers prepare for extreme conditions. Make proactive decisions to safeguard crops from unpredictable weather." />,
      features: [
        <TranslatedText text="Hyperlocal weather forecasting" />,
        <TranslatedText text="Storm and drought alerts" />,
        <TranslatedText text="Pest invasion predictions" />,
        <TranslatedText text="Climate impact assessment" />
      ],
      iconBg: "bg-stone-100",
      iconColor: "text-stone-900",
      bgColor: "bg-stone-200",
      textColor: "text-stone-900"
    },
    {
      icon: <CropIcon />,
      secondaryIcon: <Droplet className="w-6 h-6 text-orange-900 absolute top-2 right-2" />,
      title: <TranslatedText text="Actionable Insights"/>,
      description: <TranslatedText text="Receive real-time, actionable reports to enhance farming decisions. Proactively manage crops and operations with clear, data-driven insights." />,
      features: [
        <TranslatedText text="Automated farm reports" />,
        <TranslatedText text="Custom performance metrics" />,
        <TranslatedText text="AI-powered decision support" />,
        <TranslatedText text="Sustainability and yield tracking" />
      ],
      iconBg: "bg-orange-100",
      iconColor: "text-orange-900",
      bgColor: "bg-orange-200",
      textColor: "text-orange-900"
    },
  ];
  
  

  return (
    <SectionWrapper id={id} title="Agricultural Services">
      <div className="grid md:grid-cols-3 gap-6 mx-4 md:mx-16">
        {purposes.map((purpose, index) => (
          <div
            key={index}
            className={`relative p-6 text-center flex flex-col items-center justify-between rounded-2xl ${purpose.bgColor} border border-transparent`}
          >
            {purpose.secondaryIcon}
            <div className={`p-4 rounded-full mb-4 ${purpose.iconBg}`}>
              {React.cloneElement(purpose.icon, {
                className: `w-8 h-8 ${purpose.iconColor}`,
              })}
            </div>
            <div className="space-y-3">
              <h3 className={`text-xl font-bold mb-2 ${purpose.textColor}`}>
                <TranslatedText text={purpose.title} />
              </h3>
              <p className={`text-sm leading-relaxed ${purpose.textColor}`}>
                <TranslatedText text={purpose.description} />
              </p>
              <ul className={`text-sm ${purpose.textColor} mt-3 space-y-1`}>
                {purpose.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center justify-center gap-2">
                    <span className={`w-1.5 h-1.5 rounded-full ${purpose.iconBg}`}></span>
                    <TranslatedText text={feature} />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
   
    </SectionWrapper>
  );
  
  
};

export default Service;
