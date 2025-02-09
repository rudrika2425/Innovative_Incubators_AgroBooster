from flask import Blueprint, jsonify, request
from flask_cors import CORS
import google.generativeai as genai
from bson import ObjectId
from pymongo import MongoClient

# Create the blueprint
predict_bp = Blueprint('predict_bp', __name__)
CORS(predict_bp)

# MongoDB connection
client = MongoClient('mongodb://localhost:27017/')
db = client['agrobooster']
farms_collection = db['farmers']

def configure_genai():
    genai.configure(api_key="AIzaSyDfNKh9DapTzLwXRO1kFsmTkPtTighZDJs")

def generate_input_prompt(farmer_data):
    farm_input = farmer_data.get('farmerInput', {})
    location = farmer_data.get('location', {})
    weather = farmer_data.get('weather', {})
    
    return f"""
    Using the provided Soil and Environmental Analysis Report, predict suitable crops based on soil properties, climate, and official crop data.

    Farm Details:
    - Farm Name: {farm_input.get('farmName')}
    - Land Area: {farm_input.get('landArea')} acres
    - Farming Tools: {', '.join(farm_input.get('farmingTools', []))}
    - Irrigation System: {farm_input.get('irrigationSystem')}
    - Soil Type: {farm_input.get('soilType')}
    - Crop Season: {farm_input.get('cropSeason')}
    - Location: {location.get('city')}, {location.get('region')}, {location.get('country')}
    - Altitude: {location.get('altitude')} meters
    - Latitude: {location.get('latitude')}° N
    - Longitude: {location.get('longitude')}° E
    - Tropical Zone: {location.get('tropical_zone')}
    - Crop Season: {farm_input.get('cropSeason')}

    Soil Report:
    {farmer_data.get('soilAnalysisReport')}

    Weather Data:
    - Cloud Coverage: {weather.get('cloud_coverage')}%
    - Humidity: {weather.get('humidity')}%
    - Temperature: {weather.get('temperature')} K
    - Weather Description: {weather.get('weather_description')}
    - Wind Speed: {weather.get('wind_speed')} m/s
    - Date Time: {weather.get('date_time_utc')}
    - Feels Like: {weather.get('feels_like')} K
    - Pressure: {weather.get('pressure')} hPa

    Instructions for Crop Prediction:
    1. Convert all soil and environmental parameters into appropriate agricultural measurement units internally.
    2. Compare the soil and environmental conditions with crop suitability databases (e.g., USDA, FAO).
    3. Identify and categorize suitable crops into:
       - Food Crops
       - Cash Crops
       - Forage Crops
       - Fiber Crops
       - Oilseed Crops
       - Spices and Aromatic Crops
       - Medicinal Plants

    Output Format (Strictly Follow This Format):
    - Crop Type: [Category]
      - Common Name: [Name]
      - Hindi Name: [Name in Hindi]
      - Variety: [Variety provide list of 2 to 3 varities]
      - Description: (what this crop is about)
      - Brief (Provide an overview of this crop, including its optimal soil and climate conditions, ideal growth duration (from sowing to harvest, specifying the months), fertilizer and irrigation needs, and any common diseases it may face. This detailed information will help farmers evaluate whether the crop is suitable for their local environment and farming practices throughout the year.)
      - please suggest atleast 8 crops always.
      -every above data given should me personalised to the input given by the farmer

    Ensure:
    ✅ Only crop names, Hindi names, varieties, and descriptions are provided based on the given soil and environmental conditions.
    ✅ No extra interpretations or explanations.
    ✅ Conversions are done internally but not displayed.
    """

@predict_bp.route('/', methods=['POST'])
def get_prediction():
    try:
        data = request.get_json()
        farm_id = data.get('farmId')
        
        if not farm_id:
            return jsonify({
                "status": "error",
                "message": "Farm ID is required"
            }), 400

        # Fetch farmer data from MongoDB
        farmer_data = farms_collection.find_one({"_id": ObjectId(farm_id)})
        
        if not farmer_data:
            return jsonify({
                "status": "error",
                "message": "Farmer not found"
            }), 404

        configure_genai()
        model = genai.GenerativeModel("gemini-1.5-flash")
        response = model.generate_content(generate_input_prompt(farmer_data))

        return jsonify({
            "status": "success",
            "predictions": response.text
        })

    except Exception as e:
        return jsonify({
            "status": "error",
            "message": str(e)
        }), 500