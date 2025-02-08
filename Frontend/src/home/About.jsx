import React from "react";
import { 
  Leaf, Sprout, Sun, Tractor, Droplet, Wheat, Cloud, 
  Target, Database, Shield, Brain, Mic, Calendar, Share2, 
  Globe, ChevronRight, ArrowUpRight, Cpu, Radio, Satellite, Lock 
} from "lucide-react";

const AgricultureInnovationPage = ({ id }) => {
  const FloatingElements = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(50)].map((_, i) => (
        <div
          key={i}
          className="absolute animate-float opacity-40"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animation: `float ${8 + Math.random() * 4}s infinite ${Math.random() * 2}s`,
            zIndex: 0
          }}
        >
          {i % 3 === 0 ? (
            <Leaf className="w-8 h-8 text-emerald-600" />
          ) : i % 3 === 1 ? (
            <Sprout className="w-9 h-9 text-lime-600" />
          ) : (
            <Sun className="w-10 h-10 text-yellow-600" />
          )}
        </div>
      ))}
    </div>
  );
    

  return (
    <div className="relative bg-gradient-to-b from-yellow-100 to-yellow-200 text-emerald-900">
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-30px) rotate(5deg); }
        }
      `}</style>

      <FloatingElements />
   

    <div className="bg-gradient-to-b from-yellow-50 to-yellow-100 relative text-emerald-900">

    

      
      {/* About Agriculture Section */}
      <section className="container  px-6 pt-24 pb-5">
        <div className="max-w ">
          <h1 className="text-5xl font-extrabold text-center mb-10">
            Agriculture: The <span className="text-yellow-700">Backbone of Human Civilization</span>
          </h1>
          <p className="text-xl text-center mb-1 m-1">
          Agriculture is the backbone of India, deeply intertwined with its economy, culture, and social fabric. It provides livelihoods to over half of the population, making it a crucial sector for national development. India’s diverse climate supports the cultivation of various crops, including staples like rice and wheat, along with cash crops such as cotton and sugarcane. Beyond food production, agriculture fuels allied industries like dairy, fisheries, and agro-processing, strengthening rural economies. However, challenges such as climate change, soil degradation, and water scarcity threaten sustainability. To address these issues, government initiatives like PM-KISAN, the National Mission for Sustainable Agriculture, and the Soil Health Card Scheme have been introduced. Technological advancements, including precision farming and digital market access, are revolutionizing the sector. Traditional agricultural practices remain significant, as seen in festivals like Makar Sankranti and Pongal, which celebrate harvests. Sustainable agriculture, with an emphasis on organic farming and water conservation, is essential for long-term food security. Climate-resilient crops and eco-friendly techniques can help mitigate environmental challenges. Strengthening agriculture is key to eradicating poverty and ensuring economic stability. As India progresses, a balance between tradition and innovation will shape the future of its agrarian economy.</p>
        </div>
      </section>

      

      {/* Agriculture in India: A Critical Perspective */}
      <section className="container px-6 py-10">
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-10 shadow-lg">
          <h2 className="text-3xl font-bold text-center mb-6">Agriculture in India: A Critical Perspective</h2>
          <p className="text-lg mb-6">
            India stands as the world's second-largest agricultural producer, with over 54% of its population directly or indirectly dependent on agriculture. Despite contributing approximately 18.8% to the national GDP, the sector faces enormous challenges including small landholdings, technological limitations, climate vulnerability, and economic constraints.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-xl font-semibold mb-4">Economic Significance</h3>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <ChevronRight className="mr-2 text-emerald-600" />
                  Employs 42% of workforce
                </li>
                <li className="flex items-center">
                  <ChevronRight className="mr-2 text-emerald-600" />
                  Ensures food security
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Agricultural Diversity</h3>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <ChevronRight className="mr-2 text-emerald-600" />
                  Multiple crop varieties
                </li>
                <li className="flex items-center">
                  <ChevronRight className="mr-2 text-emerald-600" />
                  Varied agro-climatic zones
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Global Standing</h3>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <ChevronRight className="mr-2 text-emerald-600" />
                  Top producer of spices
                </li>
                <li className="flex items-center">
                  <ChevronRight className="mr-2 text-emerald-600" />
                  Second-largest agricultural producer
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Unprecedented Agricultural Challenges */}
      <section className="container mx-auto px-6 py-16">
        <h2 className="text-6xl font-bold text-center mb-12">
          Unprecedented <span className="text-yellow-700">Agricultural Challenges</span>
        </h2>
        
        <div className="max-w-4xl mx-auto space-y-12">
          <div>
            <h3 className="text-3xl font-semibold mb-6">Climate Volatility and Environmental Disruption</h3>
            <p className="text-xl mb-6">
              Agricultural systems face unprecedented challenges from climate change, including extreme weather patterns, unpredictable rainfall, and rapidly shifting ecosystem dynamics.
            </p>
            <ul className="space-y-4 text-lg">
              <li className="flex items-center">
                <ChevronRight className="mr-4 text-emerald-600" />
                Increasing frequency of drought and flood events
              </li>
              <li className="flex items-center">
                <ChevronRight className="mr-4 text-emerald-600" />
                Disrupted crop growth cycles and reduced agricultural predictability
              </li>
              <li className="flex items-center">
                <ChevronRight className="mr-4 text-emerald-600" />
                Rising temperatures threatening traditional agricultural zones
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-3xl font-semibold mb-6">Resource Constraints and Sustainability</h3>
            <p className="text-xl mb-6">
              Diminishing natural resources, increasing global population, and economic pressures create complex challenges for sustainable agricultural development.
            </p>
            <ul className="space-y-4 text-lg">
              <li className="flex items-center">
                <ChevronRight className="mr-4 text-emerald-600" />
                Water scarcity and inefficient irrigation systems
              </li>
              <li className="flex items-center">
                <ChevronRight className="mr-4 text-emerald-600" />
                Reduction in arable land and soil degradation
              </li>
              <li className="flex items-center">
                <ChevronRight className="mr-4 text-emerald-600" />
                Rising input costs and diminishing farmer profitability
              </li>
            </ul>
          </div>
        </div>
      </section>
      {/* Spread of Agriculture in India Section */}
      <section className="container mx-auto px-6 py-3">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-6xl font-bold text-center mb-8">
            Vision of  <span className="text-yellow-700">AgroBooster</span>
          </h2>
          <p className="text-xl text-center mb-1">
          AgroBooster envisions reaching farmers in remote areas where government services and traditional supply chains cannot. By leveraging AI and data-driven insights, it aims to bridge the gap in agricultural accessibility. The goal is to empower farmers with real-time information, precision farming techniques, and smart resource management. Through cutting-edge technology, AgroBooster enhances productivity, optimizes water and soil use, and minimizes losses. It fosters sustainable farming practices to ensure long-term food security. By integrating AI-driven solutions, it helps farmers make informed decisions and improve yields. The platform connects farmers to markets, reducing dependency on intermediaries. Its mission is to transform agricultural landscapes with innovation and efficiency. AgroBooster strives to tackle global food production challenges through smart, scalable solutions. It envisions a future where technology makes farming more sustainable and profitable for all.</p>
        </div>
      </section>
      {/* Revolutionizing Global Agriculture */}
      <section className="container mx-auto px-6 pt-18 pb-16">
        <h1 className="text-6xl font-extrabold text-center mb-8">
          Revolutionizing <span className="text-yellow-700">Global Agriculture</span>
        </h1>
        <p className="text-xl text-center max-w-7xl mx-auto mb-16">
        Transforming agricultural landscapes through cutting-edge technology, AI-driven solutions, and data-driven insights to address global food production challenges. By integrating precision farming, smart resource management, and real-time decision-making tools, we empower farmers to enhance productivity. Our vision is to build a resilient, efficient, and sustainable agricultural ecosystem that ensures long-term food security. Through innovation, we optimize resource use, reduce environmental impact, and promote sustainable farming practices. By bridging the gap between technology and traditional farming, we create opportunities for small and large-scale farmers alike.</p>
        
        <div className="grid md:grid-cols-3 gap-8 m-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-8 shadow-lg">
            <Tractor className="w-16 h-16 text-emerald-600 mx-auto mb-6" />
            <h3 className="text-3xl font-bold text-center mb-4">Global Food Security</h3>
            <p className="text-center">
              Developing technological solutions to increase agricultural productivity, reduce resource waste, and ensure sustainable food production for a growing global population.
            </p>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-8 shadow-lg">
            <Brain className="w-16 h-16 text-purple-600 mx-auto mb-6" />
            <h3 className="text-3xl font-bold text-center mb-4">AI-Powered Insights</h3>
            <p className="text-center">
              Leveraging advanced machine learning and predictive analytics to transform agricultural decision-making, enabling precision farming and proactive resource management.
            </p>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-8 shadow-lg">
            <Satellite className="w-16 h-16 text-blue-600 mx-auto mb-6" />
            <h3 className="text-3xl font-bold text-center mb-4">Technological Ecosystem</h3>
            <p className="text-center">
              Creating an integrated technological ecosystem that combines satellite imaging, edge computing, and real-time data processing to revolutionize agricultural practices.
            </p>
          </div>
        </div>
      </section>

      {/* Technological Intervention Strategies */}
      <section className="container mx-auto px-6 py-8">
        <h2 className="text-5xl font-bold text-center mb-12">
          Technological <span className="text-yellow-700">Intervention Strategies</span>
        </h2>
        
        <div className="max-w-5xl mx-auto space-y-16">
          <div>
            <h3 className="text-4xl font-semibold mb-8">Artificial Intelligence in Agriculture</h3>
            <p className="text-xl mb-8">
              Advanced machine learning algorithms and AI technologies are transforming agricultural practices through intelligent, data-driven decision-making and predictive modeling.
            </p>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-2xl font-bold mb-4">Predictive Analytics</h4>
                <ul className="space-y-3 text-lg">
                  <li className="flex items-center">
                    <ChevronRight className="mr-3 text-emerald-600" />
                    Real-time crop health monitoring
                  </li>
                  <li className="flex items-center">
                    <ChevronRight className="mr-3 text-emerald-600" />
                    Disease and pest prediction models
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-2xl font-bold mb-4">Personalized Recommendations</h4>
                <ul className="space-y-3 text-lg">
                  <li className="flex items-center">
                    <ChevronRight className="mr-3 text-emerald-600" />
                    Customized farming strategies
                  </li>
                  <li className="flex items-center">
                    <ChevronRight className="mr-3 text-emerald-600" />
                    Resource optimization algorithms
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-4xl font-semibold mb-8">Advanced Data Collection Technologies</h3>
            <p className="text-xl mb-8">
              Integrating satellite imagery, drone technologies, and multi-spectral imaging to provide comprehensive agricultural landscape analysis and real-time monitoring.
            </p>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-2xl font-bold mb-4">Geospatial Analysis</h4>
                <ul className="space-y-3 text-lg">
                  <li className="flex items-center">
                    <ChevronRight className="mr-3 text-emerald-600" />
                    High-resolution terrain mapping
                  </li>
                  <li className="flex items-center">
                    <ChevronRight className="mr-3 text-emerald-600" />
                    Comprehensive soil composition analysis
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-2xl font-bold mb-4">Environmental Monitoring</h4>
                <ul className="space-y-3 text-lg">
                  <li className="flex items-center">
                    <ChevronRight className="mr-3 text-emerald-600" />
                    Climate pattern tracking
                  </li>
                  <li className="flex items-center">
                    <ChevronRight className="mr-3 text-emerald-600" />
                    Ecosystem health assessment
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      

    </div>
    </div>
  );
};

export default AgricultureInnovationPage;