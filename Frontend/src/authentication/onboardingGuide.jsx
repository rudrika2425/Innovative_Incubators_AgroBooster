import React, { useState, useEffect } from 'react';
import {
  ChevronRight, Map, Calendar, Mic, Beaker, Tractor, Bot,
  ArrowRight, CheckCircle, Leaf, Sun, Cloud, Droplets,
  ThermometerSun, Sprout, Wheat
} from 'lucide-react';
import { Link } from 'react-router-dom';

const OnboardingGuide = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [currentUtterance, setCurrentUtterance] = useState(null);
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [speechRate, setSpeechRate] = useState(1);
  const [speechPitch, setSpeechPitch] = useState(1);

  const steps = [
    {
      title: "Smart Farming Assistant",
      icon: <Sprout className="w-12 h-12 text-emerald-500 animate-bounce" />,
      description: "Your digital farming companion that brings traditional farming wisdom together with modern technology.",
      details: [
        "Simple farmer-friendly interface",
        "Local language support",
        "Voice-guided assistance"
      ],
      bgColor: "bg-gradient-to-br from-emerald-100/80 to-emerald-200/80",
      accent: "emerald"
    },
    {
      title: "Local Field Conditions",
      icon: <ThermometerSun className="w-12 h-12 text-amber-500 animate-pulse" />,
      description: "Get precise weather and soil insights specific to your field location.",
      details: [
        "Field-specific weather alerts",
        "Soil condition monitoring",
        "Local climate patterns"
      ],
      bgColor: "bg-gradient-to-br from-amber-100/80 to-amber-200/80",
      accent: "amber"
    },
    {
      title: "Crop Management",
      icon: <Wheat className="w-12 h-12 text-yellow-600 animate-spin-slow" />,
      description: "Track your crops from sowing to harvest with expert guidance at every step.",
      details: [
        "Crop health monitoring",
        "Growth stage tracking",
        "Harvest timing optimization"
      ],
      bgColor: "bg-gradient-to-br from-yellow-100/80 to-yellow-200/80",
      accent: "yellow"
    },
    {
      title: "Seasonal Planning",
      icon: <Calendar className="w-12 h-12 text-lime-600" />,
      description: "Plan your farming activities according to seasons and market demands.",
      details: [
        "Seasonal crop recommendations",
        "Market price predictions",
        "Planting schedules"
      ],
      bgColor: "bg-gradient-to-br from-lime-100/80 to-lime-200/80",
      accent: "lime"
    },
    {
      title: "Equipment & Tools",
      icon: <Tractor className="w-12 h-12 text-stone-600 animate-bounce-slow" />,
      description: "Access modern farming equipment and tools when you need them.",
      details: [
        "Local equipment rentals",
        "Tool sharing network",
        "Maintenance schedules"
      ],
      bgColor: "bg-gradient-to-br from-stone-100/80 to-stone-200/80",
      accent: "stone"
    },
    {
      title: "Soil Care",
      icon: <Beaker className="w-12 h-12 text-orange-600" />,
      description: "Understand and improve your soil health for better yields.",
      details: [
        "Soil testing services",
        "Fertilizer recommendations",
        "Organic farming tips"
      ],
      bgColor: "bg-gradient-to-br from-orange-100/80 to-orange-200/80",
      accent: "orange"
    }
  ];

  const CropPattern = () => {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-15">
        {[...Array(16)].map((_, i) => (
          <React.Fragment key={i}>
            <Wheat
              className={`absolute w-16 h-16 ${i % 3 === 0 ? 'text-amber-800' :
                i % 3 === 1 ? 'text-yellow-800' :
                  'text-lime-800'
                } transform transition-all duration-1000 ease-in-out`}
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                transform: `rotate(${i * 45}deg) ${i % 2 === 0 ? 'scale(1.2)' : 'scale(1)'}`,
                animation: `${i % 2 === 0 ? 'float 6s infinite' : 'sway 4s infinite'}`
              }}
            />
          </React.Fragment>
        ))}
      </div>
    );
  };

  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      setVoices(availableVoices);
      const defaultVoice = availableVoices.find(voice => voice.lang.startsWith('en')) || availableVoices[0];
      setSelectedVoice(defaultVoice);
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;

    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  const stopSpeaking = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
    setCurrentUtterance(null);
  };

  const speakText = (text) => {
    stopSpeaking();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = selectedVoice;
    utterance.rate = speechRate;
    utterance.pitch = speechPitch;

    utterance.onend = () => {
      setIsSpeaking(false);
      setCurrentUtterance(null);
    };

    utterance.onerror = (event) => {
      console.error('Speech synthesis error:', event);
      setIsSpeaking(false);
      setCurrentUtterance(null);
    };

    setCurrentUtterance(utterance);
    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="min-h-screen bg-[#f4f1de] p-6 relative overflow-hidden">
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes sway {
          0%, 100% { transform: rotate(-5deg); }
          50% { transform: rotate(5deg); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }
      `}</style>

      <CropPattern />

      <div className="max-w-5xl mx-auto space-y-12 relative">
        <div className="text-center space-y-6 mb-16">
          <div className="inline-block relative mb-8 group">
            <div className="absolute inset-0 bg-amber-600 rounded-full blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-500" />
            <div className="relative bg-gradient-to-br from-emerald-200 to-lime-300 rounded-full p-8 transform transition-transform duration-500 group-hover:scale-105">
              <Wheat className="w-20 h-20 text-amber-700 animate-bounce" />
            </div>
          </div>

          <h1 className="text-5xl font-bold text-stone-800 mb-6">
            Welcome to Agro Booster
          </h1>

          <p className="text-xl text-stone-700 max-w-2xl mx-auto leading-relaxed">
            Combining generations of farming wisdom with modern technology for sustainable agriculture.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <div className="flex items-center gap-2 bg-white/90 backdrop-blur px-6 py-3 rounded-full shadow-lg border border-emerald-200 hover:scale-105 transition-transform duration-300">
              <Sprout className="w-5 h-5 text-emerald-600" />
              <span className="text-stone-800 font-medium">Farmer-First Approach</span>
            </div>
            <div className="flex items-center gap-2 bg-white/90 backdrop-blur px-6 py-3 rounded-full shadow-lg border border-amber-200 hover:scale-105 transition-transform duration-300">
              <Sun className="w-5 h-5 text-amber-600" />
              <span className="text-stone-800 font-medium">Weather-Smart</span>
            </div>
            <div className="flex items-center gap-2 bg-white/90 backdrop-blur px-6 py-3 rounded-full shadow-lg border border-lime-200 hover:scale-105 transition-transform duration-300">
              <Leaf className="w-5 h-5 text-lime-600" />
              <span className="text-stone-800 font-medium">Sustainable Methods</span>
            </div>
          </div>
        </div>

        <div className="grid gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              onMouseEnter={() => {
                setActiveStep(index);
                setIsHovering(true);
              }}
              onMouseLeave={() => setIsHovering(false)}
              className={`rounded-2xl transform transition-all duration-500 backdrop-blur-sm
                ${index === activeStep ? 'scale-100 opacity-100 shadow-2xl' : 'scale-95 opacity-90'}
                ${step.bgColor} border-2 border-stone-200/50 hover:scale-[1.02]`}
            >
              <div className="flex flex-row items-center gap-6 p-6 border-b border-stone-200/50">
                <div className="p-4 rounded-2xl bg-white/95 shadow-lg relative group">
                  <div className="absolute inset-0 bg-amber-600 rounded-2xl blur-lg opacity-20 group-hover:opacity-30 transition-opacity" />
                  <div className="relative">{step.icon}</div>
                </div>
                <h3 className="text-2xl font-bold text-stone-800">
                  {step.title}
                </h3>
                <Mic
                  className="w-6 h-6 text-stone-600 cursor-pointer hover:text-stone-800"
                  onClick={() => speakText(`${step.title}. ${step.description} Key features include: ${step.details.join(', ')}`)}
                />
              </div>
              <div className="pt-4 pb-6 px-6">
                <p className="text-lg text-stone-700 mb-6 leading-relaxed">{step.description}</p>
                <div className="grid md:grid-cols-2 gap-4">
                  {step.details.map((detail, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-3 bg-white/95 backdrop-blur p-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-stone-200/50 hover:scale-105"
                    >
                      <CheckCircle className={`w-5 h-5 text-${step.accent}-600 flex-shrink-0`} />
                      <span className="text-stone-700">{detail}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center pt-12 pb-16 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/farmer-Information" className="block w-full sm:w-auto">
              <button className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-emerald-700 to-lime-600 text-white px-8 py-4 rounded-full hover:from-emerald-600 hover:to-lime-500 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl w-full sm:w-auto">
                <span className="relative z-10">Start Your Journey</span>
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-lime-400 rounded-full blur-xl opacity-20 group-hover:opacity-30 transition-opacity" />
              </button>
            </Link>
            <Link to="/farmerdashboard" className="block w-full sm:w-auto">
              <button className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-amber-700 to-yellow-600 text-white px-8 py-4 rounded-full hover:from-amber-600 hover:to-yellow-500 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl w-full sm:w-auto">
                <span className="relative z-10">Browse Equipment</span>
                <Tractor className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-full blur-xl opacity-20 group-hover:opacity-30 transition-opacity" />
              </button>
            </Link>
          </div>
          <p className="text-sm text-stone-600">Begin your sustainable farming journey today</p>
        </div>
      </div>
    </div>
  );
};

export default OnboardingGuide;