from flask import Blueprint, jsonify, request
from flask_cors import CORS
import google.generativeai as genai

# Create the blueprint
predict_bp = Blueprint('predict', __name__)

# Configure CORS
CORS(predict_bp)

# Configure the API
def configure_genai():
    genai.configure(api_key="AIzaSyDfNKh9DapTzLwXRO1kFsmTkPtTighZDJs")

def generate_input_prompt(data):
    farm_input = data.get('farmerInput', {})
    location = farm_input.get('location', {})
    weather = farm_input.get('weather', {})

    return f"""
Using the provided Soil and Environmental Analysis Report, predict suitable crops based on soil properties, climate, and official crop data.

**Farm Details:**
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
- Crop Season: Kharif

**Soil Report:**
{farm_input.get('soilAnalysisReport')}

**Weather Data:**
- Cloud Coverage: {weather.get('cloud_coverage')}%
- Humidity: {weather.get('humidity')}%
- Temperature: {weather.get('temperature')} K
- Weather Description: {weather.get('weather_description')}
- Wind Speed: {weather.get('wind_speed')} m/s
- Date Time: {weather.get('date_time_utc')}
- Feels Like: {weather.get('feels_like')} K
- Pressure: {weather.get('pressure')} hPa



**Instructions for Crop Prediction:**
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

**Output Format (Strictly Follow This Format):**
- **Crop Type**: [Category]
  - **Common Name**: [Name]
  - **Hindi Name**: [Name in Hindi]
  - **Variety**: [Variety]
  - **Description**: (what this crop is about)
  - Optimal Soil & Climate Conditions (pH range, water needs, temperature range, sunlight exposure)
  - Growth Duration (Days to maturity, seasonal growth cycle)
  - Fertilizer & Irrigation Needs (Recommended fertilizers, irrigation type, organic or synthetic inputs)
  - Uses & Economic Value** (Food, industrial use, medicinal benefits, market demand, by-products)
  - Disease Resistance & Pest Control** (Common diseases, pest-resistant varieties, organic pest management methods)
  - please suggest atleas 5 crops always.

Ensure:
✅ Only crop names, Hindi names, varieties, and descriptions are provided based on the given soil and environmental conditions.  
✅ No extra interpretations or explanations.  
✅ Conversions are done internally but not displayed.
    """

# Route for prediction
@predict_bp.route('/', methods=['POST'])
def get_prediction():
    try:
        # Get data from request
        data = request.get_json()
        
        configure_genai()  # Configure API
        model = genai.GenerativeModel("gemini-1.5-flash")
        response = model.generate_content(generate_input_prompt(data))

        return jsonify({
            "status": "success",
            "predictions": response.text
        })
    
    except Exception as e:
        return jsonify({
            "status": "error",
            "message": str(e)
        }), 500