import google.generativeai as genai

# Configure the API with your API key
genai.configure(api_key="AIzaSyDfNKh9DapTzLwXRO1kFsmTkPtTighZDJs")

soil_report="pH: 7.6 unitless, Nitrogen: 200ppm, Phosphorus: 250 ppm, Potassium: 130 ppm, Zinc: 0.2 ppm, Sulfur: 9.76 ppm, Organic Carbon: 1.28 ppm"
rainfall = 800.00
humidity = 85.00
temperature = 28.00
soil_type = "Clay"
organic_matter = 4.0
altitude = 214
irrigation_type = "Flood Irrigation"
region = "Tropical Agro-Climatic Zone"
state = "Uttar Pradesh"
district = "Sambhal"
climate_zone = "Tropical"
weather_patterns = "Monsoon-dominant with dry spells"
season = "Rabi"
latitude = 28.590361
longitude =  78.571762


input_prompt = f"""
Using the provided Soil and Environmental Analysis Report:

soil Report: {soil_report}

The soil report includes the following parameters:
- NPK (Nitrogen, Phosphorus, Potassium), Zn, pH, Sulphur, Organic Carbon. The analysis is taken by Gemini.

Environmental Conditions:
- Rainfall: {rainfall} mm/month
- Humidity: {humidity}%
- Temperature: {temperature}°C

Growing Conditions:
- Altitude: {altitude} meters
- Location: {state}, {district}
- Latitude: {latitude}° N
- Longitude: {longitude}° E

Region:
- Region: {region}
- Water Management: Irrigation Type: {irrigation_type}
- Climate Zone: {climate_zone}
- Weather Patterns: {weather_patterns}
- Season: {season}

Additional Instructions:
1. **Unit Conversion**:
    - Convert all units to standard agricultural measurement systems:
        - ppm (parts per million) to kg/ha.
        - Temperature remains in Celsius.
        - Rainfall remains in mm/month.

2. **Comparison with Official Crop Data**:
    - Compare the converted soil and environmental data with crop databases from reliable agricultural sources.
    - Use external crop databases for comparison (such as USDA, FAO, or other crop databases) to match suitable crops with the soil conditions and growing parameters.

3. **Crop Categorization**:
    Categorize suitable crops into the following types:
    - Food Crops
    - Cash Crops
    - Forage Crops
    - Fiber Crops
    - Oilseed Crops
    - Spices and Aromatic Crops
    - Medicinal Plants

For each crop type, provide:
1. Heading with crop type.
2. Common Name of the crop 
3. Scientific name of crop
4. variety of the crop .

Please ensure:
- No extra information such as environmental interpretation or conversion details is included.
- Only crop types, names, and varieties should be listed based on the soil and environmental conditions provided.
- don't show conversions 
"""

# Use the model to generate a response based on the input
model = genai.GenerativeModel("gemini-1.5-flash")
response = model.generate_content(input_prompt)

# Print the response from the model
print(response.text)