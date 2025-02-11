import React, { useState, useEffect } from 'react';
import { ExternalLink, Search, Calendar } from 'lucide-react';

// Basic Card Components
const Card = ({ children, className }) => (
  <div className={`border rounded-lg shadow-md ${className}`}>{children}</div>
);

const CardContent = ({ children, className }) => (
  <div className={`p-4 ${className}`}>{children}</div>
);

const CardHeader = ({ children, className }) => (
  <div className={`p-4 border-b ${className}`}>{children}</div>
);

const CardTitle = ({ children, className }) => (
  <h2 className={`text-lg font-bold ${className}`}>{children}</h2>
);

// Basic Button Component
const Button = ({ children, onClick, className }) => (
  <button onClick={onClick} className={`py-2 px-4 rounded ${className}`}>
    {children}
  </button>
);

// Basic Input Component
const Input = ({ ...props }) => (
  <input
    {...props}
    className="border rounded p-2 w-full"
  />
);

// Basic Alert Component
const Alert = ({ children, variant }) => (
  <div className={`p-4 ${variant === 'destructive' ? 'bg-red-100 text-red-800' : ''}`}>
    {children}
  </div>
);

const FarmerDashboard = () => {
  const [schemes, setSchemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeScheme, setActiveScheme] = useState(null);

  useEffect(() => {
    fetchSchemes();
    const interval = setInterval(fetchSchemes, 300000);
    return () => clearInterval(interval);
  }, []);

  const fetchSchemes = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://127.0.0.1:4000/api/schemes');
      const data = await response.json();
      setSchemes(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch schemes. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const filteredSchemes = schemes.filter(scheme => {
    const matchesSearch = scheme.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         scheme.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || scheme.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <div className="max-w-6xl mx-auto p-4">
        <Card className="mb-6 bg-white shadow-lg">
          <CardHeader className="space-y-6">
            <CardTitle className="text-3xl font-bold text-green-800 text-center">
              किसान सहायता पोर्टल
              <span className="block text-xl font-normal text-gray-600 mt-2">
                Farmer Assistance Portal
              </span>
            </CardTitle>
            
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search schemes..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <select
                className="p-2 rounded border"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="all">All Categories</option>
                <option value="financial">Financial Aid</option>
                <option value="equipment">Equipment</option>
                <option value="insurance">Insurance</option>
                <option value="training">Training</option>
              </select>
            </div>
          </CardHeader>
        </Card>

        {loading ? (
          <div className="text-center p-8">Loading schemes...</div>
        ) : error ? (
          <Alert variant="destructive">
            {error}
          </Alert>
        ) : (
          <div className="grid gap-6">
            {filteredSchemes.map((scheme) => (
              <Card 
                key={scheme.id}
                className="transform transition-all hover:scale-[1.01] hover:shadow-xl"
              >
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-start gap-3">
                        <h3 className="text-xl font-semibold text-gray-900">
                          {scheme.title}
                        </h3>
                        {scheme.is_new && (
                          <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                            New
                          </span>
                        )}
                      </div>
                      
                      <p className="mt-2 text-gray-600">{scheme.description}</p>
                      
                      {activeScheme === scheme.id && (
                        <div className="mt-4 space-y-3 text-sm">
                          <p className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            <span>Last Date: {scheme.last_date}</span>
                          </p>
                          <p><strong>Eligibility:</strong> {scheme.eligibility}</p>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex flex-col gap-3">
                      <Button
                        className="border border-gray-300"
                        onClick={() => setActiveScheme(
                          activeScheme === scheme.id ? null : scheme.id
                        )}
                      >
                        {activeScheme === scheme.id ? 'Show Less' : 'Show More'}
                      </Button>
                      
                      <Button
                        className="bg-green-600 hover:bg-green-700 text-white"
                        onClick={() => window.open(scheme.registration_url, '_blank')}
                      >
                        Apply Now <ExternalLink className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FarmerDashboard;