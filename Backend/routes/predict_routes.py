from flask import Blueprint, jsonify
import google.generativeai as genai

# Create the blueprint
predict_bp = Blueprint('predict', __name__)

# Configure the API
def configure_genai():
    genai.configure(api_key="AIzaSyDfNKh9DapTzLwXRO1kFsmTkPtTighZDJs")

# Farm Details
farm_data = {
    "farm_name": "Yogya Farms",
    "land_area": "5 acres",
    "farming_tools": ["Plow"],
    "irrigation_system": "Flood Irrigation",
    "location": {
        "city": "Sambhal",
        "region": "Uttar Pradesh",
        "country": "IN",
        "latitude": 28.590361,
        "longitude": 78.571762,
        "altitude": 190,
        "tropical_zone": "Temperate Zone"
    }
}

# Weather Data
weather_data = {
    "cloud_coverage": 0,
    "date_time_utc": "2025-02-06 11:17:54",
    "feels_like": 294.44,
    "humidity": 19,
    "pressure": 1013,
    "temperature": 295.64,
    "weather_description": "clear sky",
    "wind_speed": 6.55
}

# Soil Analysis Report
soil_report = "pH: 7.6, Nitrogen: 200ppm, Phosphorus: 250ppm, Potassium: 130ppm, Zinc: 0.2ppm, Sulfur: 9.76ppm, Organic Carbon: 1.28ppm, Sandy Soil"

# Generate input prompt
def generate_input_prompt():
    return f"""
Using the provided Soil and Environmental Analysis Report, predict suitable crops based on soil properties, climate, and official crop data.

**Farm Details:**
- Farm Name: {farm_data['farm_name']}
- Land Area: {farm_data['land_area']}
- Farming Tools: {', '.join(farm_data['farming_tools'])}
- Irrigation System: {farm_data['irrigation_system']}
- Location: {farm_data['location']['city']}, {farm_data['location']['region']}, {farm_data['location']['country']}
- Altitude: {farm_data['location']['altitude']} meters
- Latitude: {farm_data['location']['latitude']}° N
- Longitude: {farm_data['location']['longitude']}° E
- Tropical Zone: {farm_data['location']['tropical_zone']}
- Crop Season: Kharif

**Soil Report:**
{soil_report}

**Weather Data:**
- Cloud Coverage: {weather_data['cloud_coverage']}%
- Humidity: {weather_data['humidity']}%
- Temperature: {weather_data['temperature']} K
- Weather Description: {weather_data['weather_description']}
- Wind Speed: {weather_data['wind_speed']} m/s

**Time Information:**
- Month: June
- Date: 25
- Season: Monsoon
- Region: Upper Gangetic Plain Region

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
  - **Description**: [A **detailed** description including:]
    - **Optimal Soil & Climate Conditions** (pH range, water needs, temperature range, sunlight exposure)
    - **Growth Duration** (Days to maturity, seasonal growth cycle)
    - **Fertilizer & Irrigation Needs** (Recommended fertilizers, irrigation type, organic or synthetic inputs)
    - **Uses & Economic Value** (Food, industrial use, medicinal benefits, market demand, by-products)
    - **Disease Resistance & Pest Control** (Common diseases, pest-resistant varieties, organic pest management methods)
  - please suggest atleas 5 crops always.

Ensure:
✅ Only crop names, Hindi names, varieties, and descriptions are provided based on the given soil and environmental conditions.  
✅ No extra interpretations or explanations.  
✅ Conversions are done internally but not displayed.   
    """

# Route for prediction
@predict_bp.route('/', methods=['GET'])
def get_prediction():
    try:
        configure_genai()  # Configure API
        model = genai.GenerativeModel("gemini-1.5-flash")
        response = model.generate_content(generate_input_prompt())

        return jsonify({
            "status": "success",
            "predictions": response.text
        })
    
    except Exception as e:
        return jsonify({
            "status": "error",
            "message": str(e)
        }), 500
