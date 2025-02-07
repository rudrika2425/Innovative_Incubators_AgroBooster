from flask import Flask, jsonify
from flask_cors import CORS
import google.generativeai as genai
import json
from datetime import datetime
from bson import ObjectId
from flask import Blueprint
import re
from pymongo import MongoClient
 

calendar_bp = Blueprint('calendar_bp', __name__)
CORS(calendar_bp)

# MongoDB connection
client = MongoClient('mongodb://localhost:27017/')
db = client['agrobooster']
farms_collection = db['farmers']

genai.configure(api_key="AIzaSyDfNKh9DapTzLwXRO1kFsmTkPtTighZDJs")

@calendar_bp.route("/generate_schedule/<farm_id>", methods=["GET"])
def get_farmer_info(farm_id):
    try:
        # Fetch the farmer document using ObjectId
        farmer_data = farms_collection.find_one({"_id": ObjectId(farm_id)})
        
        if not farmer_data:
            return jsonify({"error": "Farmer not found"}), 404
        response = {
            "farmName": farmer_data.get("farmerInput", {}).get("farmName"),
            "landArea": farmer_data.get("farmerInput", {}).get("landArea"),
            "farmingTools": farmer_data.get("farmerInput", {}).get("farmingTools", []),
            "irrigationSystem": farmer_data.get("farmerInput", {}).get("irrigationSystem"),
            "location": farmer_data.get("location"),
            "weather": farmer_data.get("weather"),
            "soilAnalysisReport": farmer_data.get("soilAnalysisReport"),
            "crop_type":"rice",
            "variety":"IR 64 Parboil Rice",
            "current_date" : datetime.today().date()

        }
        crop_type = response["crop_type"]
        variety = response["variety"]
        location = response["location"]
        soil_analysis_report = response["soilAnalysisReport"]
        land_area = response["landArea"]
        irrigation_system = response["irrigationSystem"]
        weather = response["weather"]
        current_date = response["current_date"]

        input_prompt = f"""
        Based on the provided agricultural parameters, generate a detailed and precise growing schedule for {crop_type} and variety {variety}, cultivation in {location} , including:
        Using the provided Soil and Environmental Analysis Report:

            
        Soil and Environmental Analysis Report:
        - soilAnalysisReport : {soil_analysis_report}
        - Land Area: {land_area} hectares
        - Crop Type: {crop_type}
        - Irrigation System: {irrigation_system}

        Environmental Conditions:
        - Humidity: {weather.get('humidity')}%
        - Temperature: {weather.get('temperature')}°C
        - Pressure: {weather.get('pressure')} hPa
        - Cloud Coverage: {weather.get('cloud_coverage')}%
        - Wind Speed: {weather.get('wind_speed')} m/s
        - Weather Description: {weather.get('weather_description')}

        Growing Conditions:
        - Altitude: {location.get('altitude')} meters
        - Latitude: {location.get('latitude')}° N
        - Longitude: {location.get('longitude')}° E
        - Region: {location.get('region')}
        - Climate Zone: {location.get('tropical_zone')}

        Tasks should be generated as:
        [Task Title] | [Brief Task Description]
        Start Date: YYYY-MM-DD
        End Date: YYYY-MM-DD
        Description: [Detailed description]
        Sustainable resources that can be used: [Resources]

        Generate a growing schedule for {crop_type} (variety: {variety}) in {location}. Format each task exactly as follows:

        [Task Title] | [Brief Task Description]
        Start Date: YYYY-MM-DD
        End Date: YYYY-MM-DD
        Description: [Detailed description]
        Sustainable resources that can be used: [Resources]
        
        - The title of the task
        - The description of the task
        - The starting date for that task in relation to {current_date} (e.g., 20-02-2025 need exact dates )
        - The ending date for that task, calculated based on {current_date} and the starting date.
        - Sustainable resources which can maximize the yield and at the same time will not harm environment
        - There should be no   extra info for that particular activity
        - task description can be a bit longer
        - if it is not possible to grow the crop in the current season then  display the dates for upcoming season, but data should be precise 
        the output should contain no other information except for the given data no other information should be provided
        results can be in years also if needed,provide precise information
        Dont give any extra info or note
        The output should be in the following format:
        """

        model = genai.GenerativeModel("gemini-1.5-flash")
        response = model.generate_content(input_prompt)

        pattern = r"(.*?) \| (.*?)\nStart Date: (\d{4}-\d{2}-\d{2})\nEnd Date: (\d{4}-\d{2}-\d{2})\nDescription: (.*?)\nSustainable resources that can be used: (.*?)(?=\n\n|\Z)"
        
        matches = re.finditer(pattern, response.text, re.DOTALL)
        structured_data = []
        
        for match in matches:
            structured_data.append({
                "title": match.group(1).strip(),
                "task_description": match.group(2).strip(),
                "start_date": match.group(3),
                "end_date": match.group(4),
                "description": match.group(5).strip(),
                "sustainable_resource": match.group(6).strip()
            })

        return jsonify(structured_data)
    except Exception as e:
        return jsonify({"error": str(e)}), 500