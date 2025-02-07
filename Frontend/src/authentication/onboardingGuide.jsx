import React from 'react';
import { 
  ChevronRight, 
  CircleDot,
  Sprout,
  ArrowRight,
  CheckCircle
} from 'lucide-react';

const ShowModeDetails = ({ mode }) => {
  // Utility function to trim and capitalize text
  const formatText = (text) => {
    return text
      .trim()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  };

  // Example mode data structure with consistent naming
  const modeData = {
    title: formatText(mode?.title || "Mode Title"),
    description: formatText(mode?.description || "Mode description goes here"),
    sections: [
      {
        heading: "Benefits",
        items: [
          "Benefit 1: Improved Efficiency",
          "Benefit 2: Cost Reduction",
          "Benefit 3: Better Results",
          "Benefit 4: Enhanced Performance"
        ].map(formatText)
      },
      {
        heading: "Features",
        items: [
          "Feature 1: Smart Analytics",
          "Feature 2: Real-time Monitoring",
          "Feature 3: Automated Reports",
          "Feature 4: Custom Dashboards"
        ].map(formatText)
      },
      {
        heading: "Advantages",
        items: [
          "Advantage 1: Time Saving",
          "Advantage 2: Resource Optimization",
          "Advantage 3: Quality Control",
          "Advantage 4: Risk Management"
        ].map(formatText)
      },
      {
        heading: "Specifications",
        items: [
          "Specification 1: System Requirements",
          "Specification 2: Hardware Compatibility",
          "Specification 3: Software Integration",
          "Specification 4: Data Security"
        ].map(formatText)
      }
    ]
  };

  return (
    <div className="min-h-screen bg-[#f4f1de] p-6 relative overflow-hidden">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header Card */}
        <div className="rounded-2xl backdrop-blur-sm bg-gradient-to-br from-emerald-100/80 to-emerald-200/80 border-2 border-stone-200/50 transition-all duration-500 hover:scale-[1.02] shadow-xl">
          <div className="flex flex-row items-center gap-6 p-6 border-b border-stone-200/50">
            <div className="p-4 rounded-2xl bg-white/95 shadow-lg relative group">
              <div className="absolute inset-0 bg-amber-600 rounded-2xl blur-lg opacity-20 group-hover:opacity-30 transition-opacity" />
              <div className="relative">
                <Sprout className="w-12 h-12 text-emerald-500 animate-bounce" />
              </div>
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-stone-800">
                {modeData.title}
              </h2>
              <p className="text-lg text-stone-700 leading-relaxed">
                {modeData.description}
              </p>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {modeData.sections.map((section, sectionIndex) => (
            <div 
              key={sectionIndex}
              className="rounded-2xl backdrop-blur-sm bg-gradient-to-br from-emerald-100/80 to-emerald-200/80 border-2 border-stone-200/50 transition-all duration-500 hover:scale-[1.02] shadow-xl overflow-hidden"
            >
              {/* Section Header */}
              <div className="flex items-center gap-3 p-4 border-b border-stone-200/50 bg-white/20">
                <CircleDot className="w-6 h-6 text-emerald-600" />
                <h3 className="text-xl font-semibold text-stone-800">
                  {formatText(section.heading)}
                </h3>
              </div>

              {/* Section Content */}
              <div className="p-4 space-y-3">
                {section.items.map((item, idx) => (
                  <div 
                    key={idx}
                    className="flex items-center gap-3 bg-white/95 backdrop-blur p-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-stone-200/50 hover:scale-105"
                  >
                    <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                    <span className="text-stone-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4 pt-6">
          <button className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-emerald-700 to-lime-600 text-white px-8 py-4 rounded-full hover:from-emerald-600 hover:to-lime-500 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl">
            <span className="relative z-10">View Details</span>
            <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-lime-400 rounded-full blur-xl opacity-20 group-hover:opacity-30 transition-opacity" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShowModeDetails;