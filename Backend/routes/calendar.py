from flask import Flask, jsonify,request
from flask_cors import CORS
import google.generativeai as genai
import json
from datetime import datetime
from bson import ObjectId
from flask import Blueprint
import re
from bson import ObjectId, errors
from pymongo import MongoClient
 

calendar_bp = Blueprint('calendar_bp', __name__)
CORS(calendar_bp)

# MongoDB connection
client = MongoClient('mongodb://localhost:27017/')
db = client['agrobooster']
farms_collection = db['farmers']

@calendar_bp.route('/update-farm', methods=['POST'])
def update_farm():
    data = request.json  # Get data from the request
    farm_id = data.get('farmId')
    crop = data.get('crop')
    variety = data.get('variety')
    print(farm_id," ",crop," ",variety)

    if not farm_id or not crop or not variety:
        return jsonify({"error": "farmId, crop, and variety are required"}), 400

    try:
        # Find the farmer by _id (convert it to ObjectId)
        result = farms_collection.update_one(
            {"_id": ObjectId(farm_id)},
            {
                "$set": {
                    "crop": crop,
                    "variety": variety
                }
            }
        )

        if result.modified_count > 0:
            return jsonify({"message": "Farm updated successfully"}), 200

        else:
            return jsonify({"error": "No farm found or no changes made"}), 404

    except Exception as e:
        return jsonify({"error": str(e)}), 500

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
            "cropSeason":farmer_data.get("farmerInput",{}).get("cropSeason"),
            "soilType":farmer_data.get("farmerInput",{}).get("soilType"),
            "location": farmer_data.get("location"),
            "weather": farmer_data.get("weather"),
            "soilAnalysisReport": farmer_data.get("soilAnalysisReport"),
            "crop_type":farmer_data.get("crop"),
            "variety":farmer_data.get("variety"),
            "current_date" : datetime.today().date()
        }
        crop_type = response["crop_type"]
        variety = response["variety"]
        location = response["location"]
        soil_analysis_report = response["soilAnalysisReport"]
        land_area = response["landArea"]
        farmingTools=response["farmingTools"]
        cropSeason=response["cropSeason"]
        soilType=response["soilType"]
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
        - soilType:{soilType}
        - FarmingTools:{farmingTools}
        - cropSeason:{cropSeason}

        Environmental Conditions:
         - weather:{weather}
         - location:{location}

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

        The title of the task | The description of the task
        Start Date:The starting date for that task in relation to {current_date} (e.g., 20-02-2025 need exact dates ) 
        End Date: The ending date for that task, calculated based on {current_date} and the starting date.
        Description: [Detailed description]
        Sustainable resources that can be used: Sustainable resources which can maximize the yield and at the same time will not harm environment. It should be personalised accoridng to the user provided data.
        
        - I do not want any other information like GenerateContentResponse , done=True etc. 
        - There should be no   extra info for that particular activity
        - Keep in mind the {cropSeason} prvided suggest date schedule according to that only
        - if it is not possible to grow the crop in the current season then  display the dates for upcoming season, but data should be precise 
        the output should contain no other information except for the given data no other information should be provided
        results can be in years also if needed,provide precise information
        Dont give any extra info or note
        
        """

        model = genai.GenerativeModel("gemini-1.5-flash")
        response = model.generate_content(input_prompt)
        print(response)

        pattern = r"(.*?) \| (.*?)\nStart Date:(\d{4}-\d{2}-\d{2})\nEnd Date:(\d{4}-\d{2}-\d{2})\nDescription:(.*?)\nSustainable resources that can be used:(.*?)(?=\n\n|\Z)"

        
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