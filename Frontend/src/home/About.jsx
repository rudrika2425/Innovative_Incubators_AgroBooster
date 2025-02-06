import React from "react";
import { Leaf, Sprout, Sun, Tractor, Droplet, Wheat } from "lucide-react";

const About = ({ id }) => {
  const FloatingElements = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none bg-gradient-to-b from-yellow-50 to-yellow-100 flex items-center">
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute animate-float"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animation: `float ${8 + Math.random() * 4}s infinite ${Math.random() * 2}s`,
          }}
        >
          {i % 5 === 0 ? (
            <Leaf className="w-6 h-6 text-emerald-600/30" />
          ) : i % 5 === 1 ? (
            <Sprout className="w-7 h-7 text-lime-600/30" />
          ) : i % 5 === 2 ? (
            <Sun className="w-8 h-8 text-yellow-600/30" />
          ) : i % 5 === 3 ? (
            <Tractor className="w-9 h-9 text-green-600/30" />
          ) : (
            <Droplet className="w-7 h-7 text-blue-600/30" />
          )}
        </div>
      ))}
    </div>
  );

  const StatCard = ({ icon: Icon, value, label }) => (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-emerald-100 text-center animate-bounce-slow transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
      <div className="bg-emerald-100 rounded-full p-4 mx-auto mb-4 w-20 h-20 flex items-center justify-center">
        <Icon className="w-10 h-10 text-emerald-600" />
      </div>
      <h3 className="text-3xl font-bold text-emerald-800 mb-2">{value}</h3>
      <p className="text-emerald-900">{label}</p>
    </div>
  );

  return (
    <section
      id={id}
      className="relative min-h-screen bg-gradient-to-b from-green-50 to-yellow-500 flex items-center"
    >
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        .mesh-gradient {
          background-color: hsla(131, 41%, 95%, 1);
          background-image:
            radial-gradient(at 40% 20%, hsla(128, 50%, 92%, 0.4) 0px, transparent 50%),
            radial-gradient(at 80% 0%, hsla(189, 50%, 92%, 0.4) 0px, transparent 50%),
            radial-gradient(at 0% 50%, hsla(74, 50%, 92%, 0.4) 0px, transparent 50%),
            radial-gradient(at 80% 50%, hsla(40, 50%, 92%, 0.4) 0px, transparent 50%),
            radial-gradient(at 0% 100%, hsla(82, 50%, 92%, 0.4) 0px, transparent 50%),
            radial-gradient(at 80% 100%, hsla(126, 50%, 92%, 0.4) 0px, transparent 50%),
            radial-gradient(at 0% 0%, hsla(93, 50%, 92%, 0.4) 0px, transparent 50%);
        }
      `}</style>

      <div className="absolute inset-0 mesh-gradient opacity-60" />
      <FloatingElements />

      <div className="relative z-10 container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center space-y-10 lg:space-y-0 lg:space-x-12">
          <div className="w-full lg:w-1/2 text-center lg:text-left">
            <div className="flex justify-center lg:justify-start gap-4 mb-6">
              <div className="p-3 bg-amber-100 rounded-full shadow-lg animate-bounce-slow">
                <Wheat className="w-8 h-8 text-amber-600" />
              </div>
              <div className="p-3 bg-emerald-100 rounded-full shadow-lg animate-bounce-slow delay-100">
                <Sprout className="w-8 h-8 text-emerald-600" />
              </div>
              <div className="p-3 bg-lime-100 rounded-full shadow-lg animate-bounce-slow delay-200">
                <Leaf className="w-8 h-8 text-lime-600" />
              </div>
            </div>

            <h2 className="text-4xl md:text-5xl font-extrabold text-emerald-900 mb-6 tracking-tight leading-tight">
              About <span className="text-emerald-700">AgroBooster</span>
            </h2>
            <p className="text-xl text-emerald-800 leading-relaxed mb-8">
              At <span className="text-emerald-700 font-semibold">AgroBooster</span>, we are revolutionizing agriculture
              through cutting-edge artificial intelligence. Our mission is to empower farmers with intelligent
              tools that maximize crop yields, reduce environmental impact, and transform data into actionable insights.
            </p>
          </div>

          <div className="w-full lg:w-1/2 grid grid-cols-2 gap-6">
            <StatCard
              icon={Tractor}
              value="500+"
              label="Farms Transformed"
            />
            <StatCard
              icon={Leaf}
              value="30%"
              label="Yield Increase"
            />
            <StatCard
              icon={Droplet}
              value="40%"
              label="Water Saved"
            />
            <StatCard
              icon={Sun}
              value="95%"
              label="Sustainability"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
