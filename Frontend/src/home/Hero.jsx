import React from "react";
import { Sprout, Leaf, Sun, Cloud, Tractor, Target, Globe, ArrowUpRight, MapPin, Mic, Calendar, Shield, Brain, Database, Radio, } from "lucide-react";
import { TranslatedText } from "../languageTranslation/TranslatedText";

const Hero = ({ id }) => {
  const platformSteps = [
    {
      icon: <MapPin className="w-12 h-12 text-white" />,
      title: "Location Intelligence",
      description: "Precise terrain and weather condition analysis for targeted agricultural strategies.",
      color: "bg-emerald-600",
      details: [
        "Satellite-based terrain mapping",
        "Microclimate analysis",
        "Soil composition tracking"
      ]
    },
    {
      icon: <Mic className="w-12 h-12 text-white" />,
      title: "Voice-Enabled Insights",
      description: "Seamless communication of agricultural requirements through advanced voice recognition.",
      color: "bg-lime-600",
      details: [
        "Multi-language support",
        "Agricultural query resolution",
        "Instant technical guidance"
      ]
    },
    {
      icon: <Calendar className="w-12 h-12 text-white" />,
      title: "Smart Scheduling",
      description: "AI-powered calendar for optimal planting, irrigation, and crop management.",
      color: "bg-yellow-600",
      details: [
        "Crop lifecycle management",
        "Seasonal planting recommendations",
        "Resource allocation optimization"
      ]
    },
    {
      icon: <Shield className="w-12 h-12 text-white" />,
      title: "Crop Protection",
      description: "Advanced disease detection and prevention strategies using machine learning.",
      color: "bg-blue-600",
      details: [
        "Disease detection algorithms",
        "Pest risk prediction",
        "Treatment recommendation system"
      ]
    },
    {
      icon: <Brain className="w-12 h-12 text-white" />,
      title: "Predictive Analytics",
      description: "Machine learning models to forecast crop yields and potential challenges.",
      color: "bg-purple-600",
      details: [
        "Yield forecasting models",
        "Market price predictions",
        "Risk assessment framework"
      ]
    },
    {
      icon: <Database className="w-12 h-12 text-white" />,
      title: "Comprehensive Insights",
      description: "Aggregate data-driven recommendations for holistic farm management.",
      color: "bg-indigo-600",
      details: [
        "Integrated agricultural database",
        "Cross-regional comparative analysis",
        "Historical performance tracking"
      ]
    }
  ];

  

  const PlatformStep = ({ icon, title, description, color, details }) => (
    <div className="group relative max-w-6xl h-96 bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg transform transition-all hover:scale-105 hover:shadow-xl">
      <div className={`p-4 rounded-full inline-flex items-center justify-center mb-4 ${color}`}>
        {icon}
      </div>
      <h3 className="text-2xl font-bold text-emerald-900 mb-3">
        <TranslatedText text={title} />
      </h3>
      <p className="text-emerald-800 mb-3">
        <TranslatedText text={description} />
      </p>
      <ul className="space-y-2">
        {details.map((detail, detailIndex) => (
          <li 
            key={detailIndex} 
            className="flex items-center text-emerald-800"
          >
            <Leaf className="mr-2 text-emerald-600 w-4 h-4" />
            <TranslatedText text={detail} />
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div id={id} className="bg-gradient-to-b from-yellow-50 to-yellow-100 relative">
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-30px) rotate(5deg); }
        }
      `}</style>

   

      <div className="relative min-h-screen bg-gradient-to-b from-yellow-50 to-yellow-100">
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-10">
          <div className="space-y-6 max-w-5xl -mt-20">
            <div className="flex justify-center gap-4 mb-4">
              <div className="p-4 bg-emerald-100 rounded-full shadow-lg animate-bounce-slow">
                <Sprout className="w-6 h-6 text-emerald-600" />
              </div>
              <div className="p-4 bg-lime-100 rounded-full shadow-lg animate-bounce-slow delay-100">
                <Leaf className="w-6 h-6 text-lime-600" />
              </div>
            </div>

            <h1 className="text-4xl md:text-6xl font-extrabold text-yellow-900 mb-4 tracking-tight leading-tight">
              <TranslatedText text="AGRICULTURAL COMMUNITY SERVICE" />
            </h1>

            <p className="text-2xl md:text-4xl text-emerald-800 font-medium max-w-3xl mx-auto leading-relaxed">
              <TranslatedText text="Bringing innovative solutions to" />{' '}
              <span className="text-amber-600">
                <TranslatedText text="farming communities" />
              </span>
            </p>

            <div className="flex flex-wrap justify-center gap-6 mb-12">
              <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full border border-emerald-200 shadow-lg">
                <Sprout className="w-5 h-5 text-emerald-600" />
                <span className="text-emerald-900">
                  <TranslatedText text="Sustainable Farming" />
                </span>
              </div>
              <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full border border-emerald-200 shadow-lg">
                <Sun className="w-5 h-5 text-amber-600" />
                <span className="text-emerald-900">
                  <TranslatedText text="Smart Agriculture" />
                </span>
              </div>
              <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full border border-emerald-200 shadow-lg">
                <Cloud className="w-5 h-5 text-lime-600" />
                <span className="text-emerald-900">
                  <TranslatedText text="Weather Intelligence" />
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <a
                href="/chatbot"
                className="group relative inline-flex items-center gap-3 bg-emerald-600 text-white px-8 py-4 rounded-full hover:bg-emerald-500 transition-all duration-300 font-medium text-lg shadow-lg hover:shadow-xl no-underline"
              >
                <Sprout className="w-6 h-6" />
                <span><TranslatedText text="Plant Bot" /></span>
              </a>
              <a
                href="/login"
                className="no-underline group relative inline-flex items-center gap-3 bg-amber-600 text-white px-8 py-4 rounded-full hover:bg-amber-500 transition-all duration-300 font-medium text-lg shadow-lg hover:shadow-xl"
              >
                <Sprout className="w-6 h-6" />
                <span><TranslatedText text="Grow Crop" /></span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Platform Steps Section */}
      <section className="container mx-auto px-6 py-16 bg-white/50 relative bg-gradient-to-b from-yellow-50 to-yellow-100">

        <h2 className="text-6xl font-bold text-center text-emerald-900 mb-12">
          <TranslatedText text="Our Platform" />{' '}
          <span className="text-yellow-700">
            <TranslatedText text="Journey" />
          </span>
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8 m-10">
          {platformSteps.map((step, index) => (
            <PlatformStep 
              key={index}
              icon={step.icon}
              title={step.title}
              description={step.description}
              color={step.color}
              details={step.details}
            />
          ))}
        </div>
      </section>

      {/* Technology Impact Section */}
      <section className="container mx-auto px-6 py-16 bg-gradient-to-b from-yellow-50 to-yellow-100 relative">
        
        <h2 className="text-6xl font-bold text-center text-emerald-900 mb-20">
          <TranslatedText text="Technology" />{' '}
          <span className="text-yellow-700">
            <TranslatedText text="Transforming Agriculture" />
          </span>
        </h2>
        
        <div className="grid md:grid-cols-2 gap-12 items-center m-14">
          <div>
            <h3 className="text-3xl font-semibold text-emerald-900 mb-6">
              <TranslatedText text="Revolutionizing Farming Practices" />
            </h3>
            <p className="text-xl text-emerald-800 mb-6">
              <TranslatedText text="AgroBooster integrates cutting-edge technologies to address complex agricultural challenges, providing farmers with unprecedented insights and capabilities." />
            </p>
            <ul className="space-y-4 text-lg text-emerald-700">
              <li className="flex items-center">
                <Sprout className="mr-4 text-emerald-600" />
                <TranslatedText text="AI-driven crop health monitoring" />
              </li>
              <li className="flex items-center">
                <Radio className="mr-4 text-lime-600" />
                <TranslatedText text="Real-time environmental sensing" />
              </li>
              <li className="flex items-center">
                <Globe className="mr-4 text-blue-600" />
                <TranslatedText text="Global agricultural knowledge network" />
              </li>
            </ul>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-8 shadow-lg">
            <h4 className="text-2xl font-bold text-emerald-900 mb-6">
              <TranslatedText text="Our Technological Ecosystem" />
            </h4>
            <div className="grid grid-cols-3 gap-4">
              {[
                { icon: <Tractor className="w-12 h-12 text-emerald-600" />, name: "Precision" },
                { icon: <Sun className="w-12 h-12 text-yellow-600" />, name: "Climate" },
                { icon: <Cloud className="w-12 h-12 text-blue-600" />, name: "Weather" },
                { icon: <Target className="w-12 h-12 text-red-600" />, name: "Analytics" },
                { icon: <ArrowUpRight className="w-12 h-12 text-purple-600" />, name: "Growth" },
                { icon: <Brain className="w-12 h-12 text-indigo-600" />, name: "AI" }
              ].map((tech, index) => (
                <div key={index} className="flex flex-col items-center">
                  {tech.icon}
                  <span className="text-sm text-emerald-800 mt-2">
                    <TranslatedText text={tech.name} />
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;