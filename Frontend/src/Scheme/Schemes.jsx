import React, { useState, useEffect } from 'react';
import { Sprout, ExternalLink } from 'lucide-react';

const Schemes = () => {
  const [schemes, setSchemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://127.0.0.1:4000/api/schemes')
      .then(res => res.json())
      .then(data => {
        setSchemes(data.data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <div className="flex flex-col items-center gap-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
        <div className="text-emerald-600">Loading schemes...</div>
      </div>
    </div>
  );

  if (error) return (
    <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-xl shadow-lg">
      <div className="flex items-center gap-2">
        <span className="font-medium">Error:</span>
        <span>{error}</span>
      </div>
    </div>
  );

  return (
    <div className="bg-gradient-to-b from-yellow-50 to-yellow-100 py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-4">
            <div className="p-4 bg-emerald-100 rounded-full shadow-lg">
              <Sprout className="w-8 h-8 text-emerald-600" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-emerald-900 mb-4">
            Government Schemes for Farmers
          </h1>
          <p className="text-xl text-emerald-700 max-w-3xl mx-auto">
            Explore various government initiatives designed to support and empower farmers
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {schemes.map(scheme => (
            <div 
              key={scheme.id} 
              className="group bg-white/80 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl border border-emerald-100"
            >
              <div className="h-48 relative overflow-hidden">
                <img
                  src={scheme.image}
                  alt={scheme.name}
                  className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/20 to-transparent" />
              </div>

              <div className="p-8">
                <h2 className="text-2xl font-bold text-emerald-800 mb-4">
                  {scheme.name}
                </h2>
                <p className="text-emerald-700 mb-6">
                  {scheme.description}
                </p>

                <div className="mb-6">
                  <h3 className="font-semibold text-emerald-800 mb-3">Benefits:</h3>
                  <ul className="space-y-2">
                    {scheme.benefits.map((benefit, index) => (
                      <li 
                        key={index}
                        className="flex items-start gap-2 text-emerald-700"
                      >
                        <Sprout className="w-5 h-5 text-emerald-500 mt-1 flex-shrink-0" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-6">
                  <h3 className="font-semibold text-emerald-800 mb-3">Eligibility:</h3>
                  <p className="text-emerald-700">
                    {scheme.eligibility}
                  </p>
                </div>

                <a
                  href={scheme.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-emerald-600 text-white px-6 py-3 rounded-full hover:bg-emerald-500 transition-all duration-300 font-medium shadow-lg hover:shadow-xl group"
                >
                  <span>Learn More & Apply</span>
                  <ExternalLink className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Schemes;