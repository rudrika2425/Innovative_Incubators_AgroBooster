from flask import Blueprint, request, jsonify
import requests
import os

# Create the blueprint
labs_bp = Blueprint('labs', __name__)

# Get API key from environment variable
GOOGLE_PLACES_API_KEY = os.getenv("GOOGLE_PLACES_API_KEY")

def get_detailed_place_info(place_id):
    """Helper function to fetch detailed place information"""
    details_url = f"https://maps.googleapis.com/maps/api/place/details/json?place_id={place_id}&fields=name,formatted_address,formatted_phone_number,address_components,geometry&key={GOOGLE_PLACES_API_KEY}"
    details_response = requests.get(details_url)
    return details_response.json().get("result", {})

@labs_bp.route('/search-labs', methods=['GET'])
def search_labs():
    lat = request.args.get('lat')
    lng = request.args.get('lng')
    
    if not lat or not lng:
        return jsonify({"error": "Latitude and Longitude are required"}), 400
    
    try:
        url = f"https://maps.googleapis.com/maps/api/place/nearbysearch/json?location={lat},{lng}&radius=50000&keyword=soil+testing+laboratory&type=establishment&key={GOOGLE_PLACES_API_KEY}"
        response = requests.get(url)
        response_data = response.json()
        
        # Get detailed information for each place
        detailed_results = []
        for place in response_data.get("results", []):
            place_id = place.get("place_id")
            if place_id:
                detailed_results.append(get_detailed_place_info(place_id))
        
        return jsonify({"results": detailed_results})
    
    except Exception as e:
        print("Error:", e)
        return jsonify({"error": "Error fetching labs data"}), 500

@labs_bp.route('/search-labs-location', methods=['GET'])
def search_labs_location():
    state = request.args.get('state')
    district = request.args.get('district')
    
    if not state:
        return jsonify({"error": "State is required"}), 400
    
    search_query = f"soil testing laboratory in {district + ', ' if district else ''}{state}"
    
    try:
        url = f"https://maps.googleapis.com/maps/api/place/textsearch/json?query={requests.utils.quote(search_query)}&type=establishment&key={GOOGLE_PLACES_API_KEY}"
        response = requests.get(url)
        response_data = response.json()
        
        # Get detailed information for each place
        detailed_results = []
        for place in response_data.get("results", []):
            place_id = place.get("place_id")
            if place_id:
                detailed_results.append(get_detailed_place_info(place_id))
        
        return jsonify({"results": detailed_results})
    
    except Exception as e:
        print("Error:", e)
        return jsonify({"error": "Error fetching labs data"}), 500