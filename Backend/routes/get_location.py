# routes/location.py
from flask import Blueprint, request, jsonify
import requests

location_bp = Blueprint("location", __name__)

# Function to get the actual public IP
def get_public_ip():
    try:
        response = requests.get("https://api64.ipify.org?format=json")
        return response.json().get("ip")
    except:
        return None

# Function to get altitude from Open-Elevation API
def get_altitude(lat, lon):
    try:
        response = requests.get(f"https://api.opentopodata.org/v1/test-dataset?locations={lat},{lon}")
        
        if response.status_code != 200:
            return f"Error: OpenTopoData API returned status {response.status_code}"

        data = response.json()

        if "results" in data and data["results"]:
            return data["results"][0].get("elevation", "No elevation data")

        return "Elevation data not found"

    except requests.exceptions.RequestException as e:
        return f"API request failed: {str(e)}"
    
def get_tropical_zone(lat):
    lat = float(lat)

    if -23.4368 <= lat <= 23.4368:
        return "Tropical Zone 🌴"
    elif 23.4368 < lat <= 66.5:
        return "Temperate Zone 🌳"
    else:
        return "Polar Zone ❄️"

@location_bp.route("/ip-location", methods=["GET"])
def get_location():
    # Get IP from request or detect public IP
    ip = request.args.get("ip") or get_public_ip() or request.remote_addr

    # Handle local network (localhost)
    if ip == "127.0.0.1":
        return jsonify({"error": "Cannot determine location for localhost"}), 400

    try:
        # Get location data from ipinfo.io (replace with your API key)
        response = requests.get(f"http://ipinfo.io/{ip}?token=366c50fd694068")
        data = response.json()

        if "bogon" in data:
            return jsonify({"error": "Invalid or private IP address"}), 400

        lat, lon = data.get("loc").split(",")

        # Get altitude data
        altitude = get_altitude(lat, lon)

        location = {
            "ip": data.get("ip"),
            "city": data.get("city"),
            "region": data.get("region"),
            "country": data.get("country"),
            "latitude": lat,
            "longitude": lon,
            "altitude": altitude if altitude is not None else "N/A",
            "tropical_zone": get_tropical_zone(lat)
        }
        return jsonify(location)

    except Exception as e:
        return jsonify({"error": str(e)}), 500
