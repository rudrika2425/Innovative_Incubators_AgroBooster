import React, { useEffect, useState } from 'react';
import { Sun, Cloud, CloudRain, CloudFog, Sprout, Leaf } from 'lucide-react';

const WeatherForecast = () => {
    const [forecast, setForecast] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const API_URL = "http://127.0.0.1:4000/weather_forecast/forecast?lat=28.590361&lon=78.571762";

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                const response = await fetch(API_URL);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setForecast(data.forecast);
            } catch (error) {
                console.error("Error fetching weather data:", error);
                setError("Failed to load weather data");
            } finally {
                setLoading(false);
            }
        };

        fetchWeather();
    }, []);

   

    const kelvinToCelsius = (kelvin) => Math.round(kelvin - 273.15);

    const getWeatherIcon = (condition) => {
        switch (condition?.toLowerCase()) {
            case 'clear':
                return <Sun className="w-8 h-8 text-amber-600" />;
            case 'clouds':
                return <Cloud className="w-8 h-8 text-gray-600" />;
            case 'rain':
                return <CloudRain className="w-8 h-8 text-blue-600" />;
            default:
                return <CloudFog className="w-8 h-8 text-gray-600" />;
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric'
        });
    };

    const formatTime = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit'
        });
    };

    if (loading) {
        return (
            <div className="p-6 relative min-h-screen bg-gradient-to-b from-yellow-50 to-yellow-100">
                <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-lg p-6">
                    <div className="h-40 w-full bg-yellow-100 animate-pulse rounded-lg"></div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-6 relative min-h-screen bg-gradient-to-b from-yellow-50 to-yellow-100">
                <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-lg p-6">
                    <div className="text-red-400 text-center">{error}</div>
                </div>
            </div>
        );
    }

    const currentWeather = forecast?.[0] || {};
    const hourlyForecast = forecast?.slice(0, 8) || [];
    const dailyForecast = forecast?.reduce((acc, item) => {
        const date = new Date(item.datetime).toDateString();
        if (!acc[date]) {
            acc[date] = {
                datetime: item.datetime,
                temperature: {
                    max: item.temperature,
                    min: item.temperature
                },
                weather_condition: item.weather_condition,
                feels_like: item.feels_like
            };
        } else {
            acc[date].temperature.max = Math.max(acc[date].temperature.max, item.temperature);
            acc[date].temperature.min = Math.min(acc[date].temperature.min, item.temperature);
        }
        return acc;
    }, {});

    return (
        <div className="p-6 relative min-h-screen bg-gradient-to-b from-yellow-50 to-yellow-100">
            <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-30px) rotate(5deg); }
        }
      `}</style>

         

            <div className="relative z-10 space-y-6">
                <h1 className="text-4xl font-extrabold text-yellow-900 text-center mb-8">
                    Weather Intelligence
                </h1>

                <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-lg p-6">
                    <div className="flex items-center justify-between flex-wrap gap-4">
                        <div className="flex items-center space-x-4">
                            <div className="p-4 bg-emerald-100 rounded-full shadow-lg">
                                {getWeatherIcon(currentWeather.weather_condition)}
                            </div>
                            <div>
                                <div className="text-5xl font-light text-emerald-900">
                                    {kelvinToCelsius(currentWeather.temperature)}°C
                                </div>
                                <div className="text-emerald-700">
                                    Feels like {kelvinToCelsius(currentWeather.feels_like)}°C
                                </div>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="text-xl text-emerald-800">{formatDate(currentWeather.datetime)}</div>
                            <div className="text-emerald-700">
                                {currentWeather.weather_description}
                                <br />
                                Humidity: {currentWeather.humidity}%
                                <br />
                                Wind: {Math.round(currentWeather.wind_speed)} m/s
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-lg p-6">
                    <h2 className="text-xl font-semibold text-emerald-800 mb-4">Hourly Forecast</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
                        {hourlyForecast.map((hour, index) => (
                            <div key={index} className="text-center p-2 bg-emerald-50/50 rounded-3xl border border-emerald-200 shadow-lg flex flex-col items-center justify-between h-24">
                                <div className="text-emerald-700">{formatTime(hour.datetime)}</div>
                                <div className="flex-grow flex items-center justify-center">
                                    {getWeatherIcon(hour.weather_condition)}
                                </div>
                                <div className="text-emerald-900">{kelvinToCelsius(hour.temperature)}°</div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-lg p-6">
                    <h2 className="text-xl font-semibold text-emerald-800 mb-4">Daily Forecast</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                        {Object.values(dailyForecast).map((day, index) => (
                            <div key={index} className="text-center p-4 bg-emerald-50/50 rounded-4xl border border-emerald-200 shadow-lg">
                                <div className="font-medium text-emerald-800">{formatDate(day.datetime)}</div>
                                <div className="flex-grow flex items-center justify-center">{getWeatherIcon(day.weather_condition)}</div>
                                <div className="space-y-1">
                                    <div className="text-lg text-emerald-900">{kelvinToCelsius(day.temperature.max)}°</div>
                                    <div className="text-emerald-700 text-sm">{kelvinToCelsius(day.temperature.min)}°</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WeatherForecast;