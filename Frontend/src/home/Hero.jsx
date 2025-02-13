import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TranslatedText } from '../languageTranslation/TranslatedText';
import { 
  Sprout, Leaf, Sun, Cloud, Tractor, Target, Globe, ArrowUpRight, 
  MapPin, Mic, Calendar, Shield, Brain, Database, Radio, Camera,
  MessageSquare, Upload, Newspaper
} from 'lucide-react';

const Hero = ({ id }) => {
  
  const navigate = useNavigate();

  const features = [
    {
      icon: <Target className="w-12 h-12 text-blue-600" />,
      title: <TranslatedText text="Data-Driven Insights" />,
      description: <TranslatedText text="Get real-time analysis of soil, terrain, and weather patterns with predictive analytics." />,
      bgColor: "bg-blue-200",
      hoverColor: "hover:bg-blue-100"
    },
    {
      icon: <Calendar className="w-12 h-12 text-green-600" />,
      title: <TranslatedText text="Precision Farming Tools" />,
      description: <TranslatedText text="Personalized crop calendars and automated schedules for optimal farm management." />,
      bgColor: "bg-green-200",
      hoverColor: "hover:bg-green-100"
    },
    {
      icon: <Cloud className="w-12 h-12 text-cyan-600" />,
      title: <TranslatedText text="Resource Optimization" />,
      description: <TranslatedText text="AI-powered irrigation scheduling and smart fertilizer recommendations." />,
      bgColor: "bg-cyan-200",
      hoverColor: "hover:bg-cyan-100"
    },
    {
      icon: <Database className="w-12 h-12 text-purple-600" />,
      title: <TranslatedText text="Soil Testing Integration" />,
      description: <TranslatedText text="Direct access to soil testing services with AI-based recommendations." />,
      bgColor: "bg-purple-200",
      hoverColor: "hover:bg-purple-100"
    },
    {
      icon: <Camera className="w-12 h-12 text-indigo-600" />,
      title: <TranslatedText text="Real-Time Image Analysis" />,
      description: <TranslatedText text="Upload crop images for instant disease detection and treatment suggestions." />,
      bgColor: "bg-indigo-200",
      hoverColor: "hover:bg-indigo-100"
    },
    {
      icon: <Mic className="w-12 h-12 text-orange-600" />,
      title: <TranslatedText text="Voice Integration" />,
      description: <TranslatedText text="AI-powered voice commands in multiple regional languages." />,
      bgColor: "bg-orange-200",
      hoverColor: "hover:bg-orange-100"
    },
    {
      icon: <Globe className="w-12 h-12 text-gray-600" />,
      title: <TranslatedText text="Global Network" />,
      description: <TranslatedText text="Transparent supply chain tracking and compliance management." />,
      bgColor: "bg-gray-200",
      hoverColor: "hover:bg-gray-100"
    },
    {
      icon: <Target className="w-12 h-12 text-red-600" />,
      title: <TranslatedText text="Resource Sharing" />,
      description: <TranslatedText text="Access and share agricultural resources with nearby farmers." />,
      bgColor: "bg-red-200",
      hoverColor: "hover:bg-red-100"
    }
  ];

  const workflowSteps = [
    {
      icon: <Sprout className="w-8 h-8 text-emerald-600" />,
      title: <TranslatedText text="Farmer Authentication" />,
      description: <TranslatedText text="Sign up and verify your farming credentials" />,
      animation: "animate-fade-right",
      bgColor: "bg-emerald-200"
    },
    {
      icon: <Globe className="w-8 h-8 text-blue-600" />,
      title: <TranslatedText text="Location Access" />,
      description: <TranslatedText text="Get terrain and weather data for your area" />,
      animation: "animate-fade-right delay-100",
      bgColor: "bg-blue-200"
    },
    {
      icon: <Mic className="w-8 h-8 text-purple-600" />,
      title: <TranslatedText text="Voice Input" />,
      description: <TranslatedText text="Share farm details through voice commands" />,
      animation: "animate-fade-right delay-200",
      bgColor: "bg-purple-200"
    },
    {
      icon: <Target className="w-8 h-8 text-red-600" />,
      title: <TranslatedText text="Crop Selection" />,
      description: <TranslatedText text="Choose crops based on AI recommendations" />,
      animation: "animate-fade-right delay-300",
      bgColor: "bg-red-200"
    },
    {
      icon: <Calendar className="w-8 h-8 text-amber-600" />,
      title: <TranslatedText text="Smart Calendar" />,
      description: <TranslatedText text="Get AI-powered farming schedule" />,
      animation: "animate-fade-left delay-100",
      bgColor: "bg-amber-200"
    },
    {
      icon: <MessageSquare className="w-8 h-8 text-green-600" />,
      title: <TranslatedText text="AI Assistant" />,
      description: <TranslatedText text="Upload images for instant crop analysis" />,
      animation: "animate-fade-left delay-200",
      bgColor: "bg-green-200"
    }
  ];

  return (
    <div className="bg-gradient-to-b from-yellow-50 to-yellow-100">
      {/* Hero Section */}
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
          <button
          onClick={() => navigate('/farmerscheme')}
          className="fixed bottom-8 right-8 z-50 group"
          aria-label="Go to News"
        >
          <div className="relative">
            {/* Button background with hover effect */}
            <div className="absolute inset-0 bg-emerald-500 rounded-full transition-transform duration-300 group-hover:scale-110 animate-pulse" />
            
            {/* Main button */}
            <div className="relative bg-yellow-600 p-6 rounded-full shadow-lg transform transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-xl">
              <Newspaper className="w-6 h-6 text-white" />
            </div>

            {/* Tooltip */}
            <div className="absolute bottom-full right-0 mb-2 pointer-events-none">
              <div className="bg-white px-4 py-2 rounded-full shadow-lg text-emerald-600 font-medium text-sm whitespace-nowrap opacity-0 transform translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                <TranslatedText text="Check latest news and government schemes."/>
              </div>
            </div>
          </div>
        </button>
        </div>
      </div>
      <section className="py-20 overflow-hidden bg-gradient-to-b from-yellow-50 to-yellow-100 relative">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-emerald-900 mb-16 animate-fade-down">
          <TranslatedText text="How AgroBooster Works"/>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative">
            {workflowSteps.map((step, index) => (
              <div 
                key={index} 
                className={`relative ${step.bgColor} backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1 ${step.animation}`}
              >
                <div className="absolute -right-4 -top-4 bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-full p-4 shadow-lg">
                  {step.icon}
                </div>
                <div className="pt-8">
                  <h3 className="text-xl font-bold text-emerald-900 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-emerald-700">
                    {step.description}
                  </p>
                </div>
                
                {index < workflowSteps.length - 1 && index !== 2 && (
                  <div className="hidden lg:block absolute top-1/2 right-0 w-8 h-1 bg-emerald-400 transform translate-x-full" />
                )}
              </div>
            ))}
          </div>

          {/* Additional Features */}
          
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-emerald-100 rounded-full filter blur-3xl opacity-30 animate-pulse" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-yellow-100 rounded-full filter blur-3xl opacity-30 animate-pulse delay-1000" />
      </section>
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
      {/* Features Grid */}
      <section className="py-20 bg-gradient-to-b from-yellow-50 to-yellow-100 relative">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-emerald-900 mb-16 animate-fade-down">
            <TranslatedText text="How Our AI Solution Benefits Farmers" />
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className={`${feature.bgColor} p-6 rounded-xl shadow-lg ${feature.hoverColor} transition-all duration-300 transform hover:-translate-y-1 animate-fade-up`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-emerald-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-emerald-700">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Workflow Section */}
      
      
    </div>
  );
};

export default Hero;