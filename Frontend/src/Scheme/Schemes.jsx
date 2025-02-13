import React, { useState, useEffect } from 'react';

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
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
    </div>
  );

  if (error) return (
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
      Error: {error}
    </div>
  );

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Government Schemes for Farmers</h1>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
        {schemes.map(scheme => (
          <div key={scheme.id} className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105">
            <div className="h-48 bg-gray-200">
              <img 
                src={scheme.image} 
                alt={scheme.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <h2 className="text-2xl font-bold text-green-600 mb-3">{scheme.name}</h2>
              <p className="text-gray-600 mb-4">{scheme.description}</p>
              <div className="mb-4">
                <h3 className="font-semibold text-gray-700 mb-2">Benefits:</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-600">
                  {scheme.benefits.map((benefit, index) => (
                    <li key={index}>{benefit}</li>
                  ))}
                </ul>
              </div>
              <div className="mb-4">
                <h3 className="font-semibold text-gray-700 mb-2">Eligibility:</h3>
                <p className="text-gray-600">{scheme.eligibility}</p>
              </div>
              <a
                href={scheme.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition duration-300"
              >
                Learn More & Apply
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Schemes;