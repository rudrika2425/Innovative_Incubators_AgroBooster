from flask import Flask, jsonify,request
from flask_cors import CORS
import google.generativeai as genai
import json
from datetime import datetime
from bson import ObjectId
from flask import Blueprint
import re
import os
from bson import ObjectId, errors
from pymongo import MongoClient
from twilio.rest import Client 
from apscheduler.schedulers.background import BackgroundScheduler

# Initialize the scheduler
scheduler = BackgroundScheduler()
scheduler.start()

calendar_bp = Blueprint('calendar_bp', __name__)
CORS(calendar_bp)


from apscheduler.schedulers.background import BackgroundScheduler

# Initialize the scheduler
# scheduler = BackgroundScheduler()
# scheduler.start()

# Schedule the activity check to run daily at 9:00 AM


# MongoDB connection
client = MongoClient('mongodb://localhost:27017/')
db = client['agrobooster']
farms_collection = db['farmers']

client = MongoClient("mongodb://localhost:27017/")
db = client["agrobooster"]
crop_schedules_collection = db["crop_schedules"]

@calendar_bp.route('/save_schedule/<farm_id>', methods=['POST'])
def create_crop_schedule(farm_id):
    tasks = request.json.get("tasks", [])
    phonenum = request.json.get("phonenum", "N/A")
    crop_schedule = {
        "farmId": farm_id,
        "phonenum": phonenum,
        "tasks": [
            {
                "title": task["title"],
                "description": task["description"],
                "start_date": datetime.strptime(task["start_date"], "%Y-%m-%d"),
                "end_date": datetime.strptime(task["end_date"], "%Y-%m-%d"),
                "task_description": task["task_description"],
                "sustainable_resource": task["sustainable_resource"]
            }
            for task in tasks
            
        ],
        "created_at": datetime.utcnow()
    }
    result = crop_schedules_collection.insert_one(crop_schedule)
    return jsonify({"message": "Crop schedule saved", "id": str(result.inserted_id)}), 201

@calendar_bp.route('/get_schedule/<farm_id>', methods=['GET'])
def get_crop_schedule(farm_id):
    schedule = crop_schedules_collection.find_one({"farmId": farm_id})
    if schedule:
        schedule["_id"] = str(schedule["_id"])   
        return jsonify(schedule)
    else:
        return jsonify({"message": "No schedule found"}), 404


@calendar_bp.route('/update-farm', methods=['POST'])
def update_farm():
    data = request.json  
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
    
TWILIO_ACCOUNT_SID = os.getenv('TWILIO_SID')
TWILIO_AUTH_TOKEN = os.getenv('TWILIO_AUTH_TOKEN')
TWILIO_PHONE_NUMBER = os.getenv('TWILIO_PHONE_NUMBER')

twilio_client = Client(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)
def send_sms(to, body):
    try:
        message = twilio_client.messages.create(
            body=body,
            from_=TWILIO_PHONE_NUMBER,
            to=to
        )
        print(f"SMS sent: {message.sid}")
        return True
    except Exception as e:
        print(f"Error sending SMS: {e}")
        return False

    
@calendar_bp.route('/test_check_activities', methods=['GET'])
def test_check_activities():
    return check_activities()



@calendar_bp.route('/check-activities', methods=['GET'])
def check_activities():
    try:
        # Get today's date
        today = datetime.today().date()
        print(f"Today's date: {today}")
        # Fetch all schedules from MongoDB
        schedules = crop_schedules_collection.find()
        
         
        start_date=datetime.today().date()
        user_phone_number = "+917860254396"
        if start_date == today:
                # Prepare the SMS message
                sms_body = f"Reminder: your task starts today. Description: "
                send_sms(user_phone_number, sms_body)
                    
        # for schedule in schedules:
        #     farm_id = schedule.get("farmId")
        #     tasks = schedule.get("tasks", [])
        #     user_phone_number = "+917860254396"  # Replace with the user's phone number
            
            
            # for task in tasks:
            #     start_date = task.get("start_date")
            #     if isinstance(start_date, str):
            #         start_date = datetime.fromisoformat(start_date).date()

            #     if start_date == today:
            #         # Prepare the SMS message
            #         sms_body = f"Reminder: {task['title']} starts today. Description: {task['description']}"
            #         send_sms(user_phone_number, sms_body)

        return jsonify({"message": "Activity check completed"}), 200

    except Exception as e:
        print(f"Error in check_activities: {e}")
        return jsonify({"error": str(e)}), 500


# scheduler.add_job(
#     func=check_activities,
#     trigger="cron",
#     hour=19,
#     minute=50,
#     timezone="UTC"
# )
print("Scheduler started and job added")

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
        Start Date:The starting date for that task and the most yield producing month (give dates according to the {weather} and {location})
        End Date: The ending date for that task, calculated based on {current_date} and the starting date.
        Description: [Detailed description] accoriding to the personalised data provided of the farm and other
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

        pattern = r"(.+?) \| (.+?)\nStart Date: (\d{4}-\d{2}-\d{2})\nEnd Date: (\d{4}-\d{2}-\d{2})\nDescription: (.+?)\nSustainable resources that can be used: (.+?)(?=\n\n|\Z)"

        
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