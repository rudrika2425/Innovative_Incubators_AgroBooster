from flask import Blueprint, request, jsonify
from datetime import datetime
import os
import requests

weather_forecast_bp = Blueprint("weather_forecast", __name__)

# Replace with your actual API key
API_KEY = os.getenv("WEATHER_API_KEY")

print(API_KEY)

@weather_forecast_bp.route("/forecast", methods=['GET'])
def get_weather_forecast():
    lat = request.args.get("lat")
    lon = request.args.get("lon")
    
    print(lat,lon)

    if not lat or not lon:
        return jsonify({"error": "Latitude and Longitude are required"}), 400
    
    try:
        # Construct API URL for OpenWeather API
        api_url = f"https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude=minutely&appid={API_KEY}"
        
        
        # Make request to OpenWeather API
        response = requests.get(api_url)
        data = response.json()
        
        # Process and format the response
        formatted_response = {
            "lat": data.get("lat"),
            "lon": data.get("lon"),
            "timezone": data.get("timezone"),
            "timezone_offset": data.get("timezone_offset"),
            "current": format_current_weather(data.get("current", {})),
            "hourly": [format_hourly_weather(hour) for hour in data.get("hourly", [])],
            "daily": [format_daily_weather(day) for day in data.get("daily", [])]
        }

        print(formatted_response)
        
        return jsonify(formatted_response)
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

def format_current_weather(current):
    if not current:
        return {}
        
    return {
        "dt": current.get("dt"),
        "sunrise": current.get("sunrise"),
        "sunset": current.get("sunset"),
        "temp": current.get("temp"),
        "feels_like": current.get("feels_like"),
        "pressure": current.get("pressure"),
        "humidity": current.get("humidity"),
        "dew_point": current.get("dew_point"),
        "uvi": current.get("uvi"),
        "clouds": current.get("clouds"),
        "visibility": current.get("visibility"),
        "wind_speed": current.get("wind_speed"),
        "wind_deg": current.get("wind_deg"),
        "wind_gust": current.get("wind_gust"),
        "weather": current.get("weather", [])
    }

def format_hourly_weather(hour):
    if not hour:
        return {}
        
    formatted = {
        "dt": hour.get("dt"),
        "temp": hour.get("temp"),
        "feels_like": hour.get("feels_like"),
        "pressure": hour.get("pressure"),
        "humidity": hour.get("humidity"),
        "dew_point": hour.get("dew_point"),
        "uvi": hour.get("uvi"),
        "clouds": hour.get("clouds"),
        "visibility": hour.get("visibility"),
        "wind_speed": hour.get("wind_speed"),
        "wind_deg": hour.get("wind_deg"),
        "wind_gust": hour.get("wind_gust"),
        "weather": hour.get("weather", []),
        "pop": hour.get("pop", 0)
    }
    
    # Add rain data if present
    if "rain" in hour:
        formatted["rain"] = hour["rain"]
    
    return formatted

def format_daily_weather(day):
    if not day:
        return {}
        
    return {
        "dt": day.get("dt"),
        "sunrise": day.get("sunrise"),
        "sunset": day.get("sunset"),
        "moonrise": day.get("moonrise"),
        "moonset": day.get("moonset"),
        "moon_phase": day.get("moon_phase"),
        "summary": day.get("summary"),
        "temp": day.get("temp", {}),
        "feels_like": day.get("feels_like", {}),
        "pressure": day.get("pressure"),
        "humidity": day.get("humidity"),
        "dew_point": day.get("dew_point"),
        "wind_speed": day.get("wind_speed"),
        "wind_deg": day.get("wind_deg"),
        "wind_gust": day.get("wind_gust"),
        "weather": day.get("weather", []),
        "clouds": day.get("clouds"),
        "pop": day.get("pop", 0),
        "rain": day.get("rain", 0),
        "uvi": day.get("uvi")
    }