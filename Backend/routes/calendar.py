from flask import Flask, jsonify
from flask_cors import CORS
import google.generativeai as genai
import json
from datetime import datetime
import re
app = Flask(__name__)
CORS(app)  # Allow frontend to fetch data

# Configure Gemini API Key
genai.configure(api_key="AIzaSyDfNKh9DapTzLwXRO1kFsmTkPtTighZDJs")

# Root route
@app.route("/", methods=["GET"])
def home():
    return "Welcome to the Flask API!"

@app.route("/generate_schedule", methods=["GET"])
def generate_schedule():
    # Set parameters (same as before)
    soil_report="pH: 7.6 unitless, Nitrogen: 280ppm, Phosphorus: 25 ppm, Potassium: 300 ppm, Zinc: 1.5 ppm, Sulfur: 15 ppm, Organic Carbon: 0.75%"
    rainfall = 750.00
    humidity = 65.00
    temperature = 28.00
    pressure=1013.25
    soil_type = "Clay loam with good drainage"
    organic_matter = 1.7
    altitude = 165
    irrigation_type = "Drip Irrigation or Sprinkler Irrigation"  
    region = "Bundelkhand Region" 
    state = "Uttar Pradesh"
    city = "Jhansi" 
    climate_zone = "Tropical Savanna" 
    cloud_coverage=56
    latitude = 25.5693
    longitude =  78.8099
    crop_type = "cash crop"
    crop = "Pigeon Pea"
    variety = "ICP 9063"
    land_area=6.5
    current_date = datetime.today().date()


    input_prompt = f"""
    Based on the provided agricultural parameters, generate a detailed and precise growing schedule for {crop} and variety {variety}, cultivation in {state} {city} district, including:
    Using the provided Soil and Environmental Analysis Report:

    soil Report: {soil_report}
    crop_type:{crop_type}
    organic_matter:{organic_matter}
    soil_type:{soil_type}
    land_area:{land_area}
    
    The soil report includes the following parameters:
    - NPK (Nitrogen, Phosphorus, Potassium), Zn, pH, Sulphur, Organic Carbon. The analysis is taken by Gemini.

    Environmental Conditions:
    - Rainfall: {rainfall} mm/month
    - Humidity: {humidity}%
    - Temperature: {temperature}°C
    - pressure:{pressure}hPa

    Growing Conditions:
    - Altitude: {altitude} meters
    - Location: {state}, {city}
    - Latitude: {latitude}° N
    - Longitude: {longitude}° E

    Region:
    - Region: {region}
    - Water Management: Irrigation Type: {irrigation_type}
    - Climate Zone: {climate_zone}
    - cloud_coverage: {cloud_coverage}
    
     **Unit Conversion**:
    - Convert all units to standard agricultural measurement systems:
        - ppm (parts per million) to kg/ha.
        - Temperature remains in Celsius.
        - Rainfall remains in mm/month.

    "Please provide the description and title of each task in the {crop} of varirty {variety} cultivation schedule. For each task, include:

    - The title of the task
    - The description of the task
    - The starting date for that task in relation to {current_date} (e.g., 20-02-2025 need exact dates )
    - The ending date for that task, calculated based on {current_date} and the starting date.
    - There should be some extra info if any for that particular activity
    - if it is not possible to grow the crop in the current season then suggest the dates for upcoming season or year, but data should be precise 
    the output should contain no other information except for the given data no other information should be provided
    results can be in years also if needed,provide precise information
    The output should be in the following format:

    Land Preparation | Soil tillage and leveling
    Start Date: 2025-02-15
    End Date: 2025-02-20
    Description: Prepare the land by plowing, harrowing, and leveling to create a suitable seedbed. Ensure proper drainage.
    Additional info: Consider using a precision planter to maintain consistent depth and spacing.

    Planting | Setting sugarcane setts
    Start Date: 2025-02-25
    End Date: 2025-03-05
    Description: Plant Co 0238 sugarcane setts at the recommended spacing. Ensure proper depth and firmness.
    Additional info: Ensure proper soil texture and avoid compacting soil during tillage.
    """

    # Use Gemini AI to generate schedule
    model = genai.GenerativeModel("gemini-1.5-flash")
    response = model.generate_content(input_prompt)
    print("Raw response from Gemini API:", response.text)
    pattern = r"(?P<title>.*?) \| (?P<description>.*?)\nStart Date: (?P<start_date>\S+)\nEnd Date: (?P<end_date>\S+)\nDescription: (?P<desc>.*?)\nAdditional info: (?P<additional_info>.*?)\n"

    # Parse the text using regular expression
    matches = re.findall(pattern,response.text)
    structured_data = []
    for match in matches:
        structured_data.append({
            "title": match[0],
            "description": match[1],
            "start_date": match[2],
            "end_date": match[3],
            "desc": match[4],
            "additional_info": match[5]
        })
    json_data = json.dumps(structured_data, indent=2)
    return json_data

# if __name__ == "__main__":
#     app.run(debug=True)
