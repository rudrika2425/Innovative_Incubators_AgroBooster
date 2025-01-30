from flask import Blueprint, request, jsonify
import requests
from datetime import datetime
import os

weather_forecast_bp = Blueprint("weather_forecast", __name__)

# Replace with your actual API key
API_KEY = os.getenv("WEATHER_API_KEY")

@weather_forecast_bp.route("/forecast", methods=['GET'])  # Matches /weather-forecast
def get_weather_forecast():
    lat = request.args.get("lat")
    lon = request.args.get("lon")

    if not lat or not lon:
        return jsonify({"error": "Latitude and Longitude are required"}), 400

    try:
        # Construct API URL for weather forecast
        api_url = f"https://api.agromonitoring.com/agro/1.0/weather/forecast?lat={lat}&lon={lon}&appid={API_KEY}"

        # Make request to AgroMonitoring API
        response = requests.get(api_url)
        data = response.json()

        # Process forecast data
        forecasts = []
        for entry in data:
            forecast = {
                "datetime": datetime.utcfromtimestamp(entry["dt"]).strftime('%Y-%m-%d %H:%M:%S UTC'),
                "temperature": entry["main"]["temp"],
                "feels_like": entry["main"]["feels_like"],
                "humidity": entry["main"]["humidity"],
                "pressure": entry["main"]["pressure"],
                "sea_level_pressure": entry["main"].get("sea_level", "N/A"),
                "ground_level_pressure": entry["main"].get("grnd_level", "N/A"),
                "wind_speed": entry["wind"]["speed"],
                "wind_direction": entry["wind"]["deg"],
                "wind_gust": entry["wind"].get("gust", "N/A"),
                "cloud_coverage": entry["clouds"]["all"],
                "weather_condition": entry["weather"][0]["main"],
                "weather_description": entry["weather"][0]["description"],
                "weather_icon": f"https://openweathermap.org/img/wn/{entry['weather'][0]['icon']}.png"
            }
            forecasts.append(forecast)

        return jsonify({"forecast": forecasts})

    except Exception as e:
        return jsonify({"error": str(e)}), 500
