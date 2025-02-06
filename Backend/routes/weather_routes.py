from flask import Blueprint, request, jsonify
import requests
from datetime import datetime
import os

weather_bp = Blueprint("weather", __name__)

# Your AgroMonitoring API key (Replace with your actual API key)
API_KEY = os.getenv("WEATHER_API_KEY")

@weather_bp.route("/get_weather", methods=['GET'])  # Matches /weather
def get_weather():
    lat = request.args.get("lat")
    lon = request.args.get("lon")

    if not lat or not lon:
        return jsonify({"error": "Latitude and Longitude are required"}), 400

    try:
        # Construct API URL
        api_url = f"https://weather.googleapis.com/v1/weather?location={lat},{lon}&key=AIzaSyDPMJgjhQ-E28ntMZFACLI_N0SfEeEjQFE"

        # Make request to AgroMonitoring API
        response = requests.get(api_url)
        data = response.json()

        if "main" in data:
            # Convert UNIX timestamp to a readable format
            timestamp = data.get("dt", None)
            formatted_time = datetime.utcfromtimestamp(timestamp).strftime('%Y-%m-%d %H:%M:%S') if timestamp else "N/A"

            return jsonify({
                "date_time_utc": formatted_time,
                "temperature": data["main"]["temp"],
                "feels_like": data["main"]["feels_like"],
                "humidity": data["main"]["humidity"],
                "pressure": data["main"]["pressure"],
                "wind_speed": data["wind"]["speed"],
                "cloud_coverage": data["clouds"]["all"],
                "weather_description": data["weather"][0]["description"]
            })
        else:
            return jsonify({"error": "Could not fetch weather data", "response": data}), 500

    except Exception as e:
        return jsonify({"error": str(e)}), 500
