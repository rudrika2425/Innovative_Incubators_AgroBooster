import React, { useState, useEffect } from 'react';
import { Newspaper, Calendar, Building2, ExternalLink } from 'lucide-react';

const News = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}api/news`)
      .then(res => res.json())
      .then(data => {
        setNews(data.data);
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
        <div className="text-emerald-600">Loading latest news...</div>
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
              <Newspaper className="w-8 h-8 text-emerald-600" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-emerald-900 mb-4">
            Agriculture News & Updates
          </h1>
          <p className="text-xl text-emerald-700 max-w-3xl mx-auto">
            Stay informed with the latest developments in agriculture
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {news.map((article, index) => (
            <div 
              key={index} 
              className="group bg-white/80 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl border border-emerald-100"
            >
              <div className="relative h-48 bg-emerald-50 overflow-hidden">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-110"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/api/placeholder/400/300";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/20 to-transparent" />
              </div>

              <div className="p-6">
                <h2 className="text-xl font-bold text-emerald-800 mb-3 line-clamp-2 h-14">
                  {article.title}
                </h2>
                <p className="text-emerald-600 mb-4 line-clamp-3 h-20">
                  {article.description}
                </p>

                <div className="flex flex-col gap-2 mb-6 text-sm text-emerald-600">
                  <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4" />
                    <span>{article.source}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
                  </div>
                </div>

                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-emerald-600 text-white px-6 py-3 rounded-full hover:bg-emerald-500 transition-all duration-300 font-medium shadow-lg hover:shadow-xl group"
                >
                  <span>Read Full Article</span>
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

export default News;