from flask import Blueprint, jsonify
import google.generativeai as genai

# Create the blueprint
predict_bp = Blueprint('predict', __name__)

# Route definition
@predict_bp.route('/', methods=['GET'])
def get_prediction():
    try:
        # Configure the API
        genai.configure(api_key="AIzaSyDfNKh9DapTzLwXRO1kFsmTkPtTighZDJs")

        # Farmer Input Data
        farm_name = "yogya farms"
        land_area = "5 acres"
        farming_tools = ["Plow"]
        irrigation_system = "Flood Irrigation"
        location = {
            "city": "Sambhal",
            "region": "Uttar Pradesh",
            "country": "IN",
            "latitude": 28.590361,
            "longitude": 78.571762,
            "altitude": 190,
            "tropical_zone": "Temperate Zone "
        }

        # Weather Data
        weather ={
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
        soil_report = "pH: 7.6, Nitrogen: 200ppm, Phosphorus: 250ppm, Potassium: 130ppm ,zinc:0.2ppm,sulfur:9.76ppm , organic carbon: 1.28ppm sandy soil"

        input_prompt = f"""
        Using the provided Soil and Environmental Analysis Report, predict suitable crops based on soil properties, climate, and official crop data.

**Farm Details:**
- Farm Name: {farm_name}
- Land Area: {land_area}
- Farming Tools: {', '.join(farming_tools)}
- Irrigation System: {irrigation_system}
- Location: {location['city']}, {location['region']}, {location['country']}
- Altitude: {location['altitude']} meters
- Latitude: {location['latitude']}° N
- Longitude: {location['longitude']}° E
- Tropical Zone: {location['tropical_zone']}
-crop season-Kharif

**Soil Report:**
{soil_report}

**Weather Data:**
- Cloud Coverage: {weather['cloud_coverage']}%
- Humidity: {weather['humidity']}%
- Temperature: {weather['temperature']} K
- Weather Description: {weather['weather_description']}
- Wind Speed: {weather['wind_speed']} m/s

** Time**
-Month-June
-Date-25
-Season-Monsoon

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
  - **Scientific Name**: [Name]
  - **Variety**: [Variety]

Ensure:
✅ Only crop names and categories are provided based on the given soil and environmental conditions.  
✅ No extra interpretations or explanations.  
✅ Conversions are done internally but not displayed.  

        """

        # Use the model to generate a response
        model = genai.GenerativeModel("gemini-1.5-flash")
        response = model.generate_content(input_prompt)

        return jsonify({
            "status": "success",
            "predictions": response.text
        })

    except Exception as e:
        return jsonify({
            "status": "error",
            "message": str(e)
        }), 500