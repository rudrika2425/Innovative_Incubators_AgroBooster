import React, { useEffect, useState } from 'react';
import { Sun, Cloud, CloudRain, CloudFog, Wind, Droplets } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import { TranslatedText } from '../languageTranslation/TranslatedText';

const WeatherForecast = () => {
    const [searchParams] = useSearchParams();
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const latitude = searchParams.get('lat');
    const longitude = searchParams.get('lon');
    const VITE_API_URL = `${import.meta.env.VITE_API_URL}weather_forecast/forecast?lat=${latitude}&lon=${longitude}`;
    console.log(VITE_API_URL);
    console.log(latitude, longitude)
    useEffect(() => {
        const fetchWeather = async () => {
            if (!latitude || !longitude) {
                setError("Latitude and longitude are required");
                setLoading(false);
                return;
            }

            try {
                const response = await fetch(VITE_API_URL);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                console.log(data)
                
                setWeatherData(data);
            } catch (error) {
                console.error("Error fetching weather data:", error);
                setError("Failed to load weather data");
            } finally {
                setLoading(false);
            }
        };

        fetchWeather();
    }, [VITE_API_URL, latitude, longitude]);

    
    console.log(weatherData)

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

    const formatTime = (timestamp) => {
        const date = new Date(timestamp * 1000);
        return date.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit'
        });
    };

    const formatDate = (timestamp) => {
        const date = new Date(timestamp * 1000);
        return date.toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric'
        });
    };

    if (loading) {
        return (
            <div className="p-6 min-h-screen bg-gradient-to-b from-yellow-50 to-yellow-100">
                <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-lg p-6">
                    <div className="h-40 w-full bg-yellow-100 animate-pulse rounded-lg"></div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-6 min-h-screen bg-gradient-to-b from-yellow-50 to-yellow-100">
                <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-lg p-6">
                    <div className="text-red-400 text-center">
                        <TranslatedText text={error} />
                    </div>
                </div>
            </div>
        );
    }

    const current = weatherData?.current || {};
    const hourlyForecast = weatherData?.hourly?.slice(0, 8) || [];
    const dailyForecast = weatherData?.daily || [];

    return (
        <div className="p-6 min-h-screen bg-gradient-to-b from-yellow-50 to-yellow-100">
            <div className="space-y-6">
                <h1 className="text-4xl font-extrabold text-yellow-900 text-center mb-8">
                    <TranslatedText text="Weather Intelligence" />
                </h1>

                {/* Location Display */}
                <div className="text-center text-emerald-800 mb-4">
                    <TranslatedText text="Location" />: {latitude}°, {longitude}°
                    <div className="text-sm text-emerald-600">
                        <TranslatedText text="Timezone" />: {weatherData?.timezone}
                    </div>
                </div>

                {/* Current Weather */}
                <div className="bg-yellow-100 backdrop-blur-sm rounded-lg shadow-lg p-6">
                    <div className="flex items-center justify-between flex-wrap gap-4">
                        <div className="flex items-center space-x-4">
                            <div className="p-4 bg-emerald-100 rounded-full shadow-lg">
                                {getWeatherIcon(current.weather?.[0]?.main)}
                            </div>
                            <div>
                                <div className="text-5xl font-light text-emerald-900">
                                    {kelvinToCelsius(current.temp)}°C
                                </div>
                                <div className="text-emerald-700">
                                    <TranslatedText text="Feels like" /> {kelvinToCelsius(current.feels_like)}°C
                                </div>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="text-xl text-emerald-800">{formatDate(current.dt)}</div>
                            <div className="text-emerald-700">
                                <TranslatedText text={current.weather?.[0]?.description || ''} />
                                <div className="flex items-center justify-end gap-2">
                                    <Droplets className="w-4 h-4" />
                                    {current.humidity}%
                                </div>
                                <div className="flex items-center justify-end gap-2">
                                    <Wind className="w-4 h-4" />
                                    {Math.round(current.wind_speed)} <TranslatedText text="m/s" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Hourly Forecast */}
                <div className="bg-yellow-100 backdrop-blur-sm rounded-lg shadow-lg p-6">
                    <h2 className="text-2xl font-semibold text-emerald-800 mb-4">
                        <TranslatedText text="Hourly Forecast" />
                    </h2>
                    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
                        {hourlyForecast.map((hour, index) => (
                            <div key={index} className="text-center justify-items-center p-2 bg-emerald-50/50 rounded-3xl border border-emerald-200 shadow-lg">
                                <div className="text-emerald-700">{formatTime(hour.dt)}</div>
                                <div className="my-2">
                                    {getWeatherIcon(hour.weather?.[0]?.main)}
                                </div>
                                <div className="text-emerald-900">{kelvinToCelsius(hour.temp)}°</div>
                                {hour.pop > 0 && (
                                    <div className="text-xs text-blue-600">
                                        {Math.round(hour.pop * 100)}% <TranslatedText text="rain" />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Daily Forecast */}
                <div className="bg-yellow-100 backdrop-blur-sm rounded-lg shadow-lg p-6">
                    <h2 className="text-2xl font-semibold text-emerald-800 mb-4">
                        <TranslatedText text="Daily Forecast" />
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {dailyForecast.map((day, index) => (
                            <div key={index} className="text-center justify-items-center p-4 bg-emerald-50/50 rounded-3xl border border-emerald-200 shadow-lg">
                                <div className="font-medium text-emerald-800">{formatDate(day.dt)}</div>
                                <div className="">
                                    {getWeatherIcon(day.weather?.[0]?.main)}
                                </div>
                                <div className="space-y-1">
                                    <div className="text-lg text-emerald-900">
                                        {kelvinToCelsius(day.temp.max)}°
                                    </div>
                                    <div className="text-emerald-700 text-sm">
                                        {kelvinToCelsius(day.temp.min)}°
                                    </div>
                                </div>
                                {day.summary && (
                                    <div className="text-xs text-emerald-600 mt-2">
                                        <TranslatedText text={day.summary} />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WeatherForecast;