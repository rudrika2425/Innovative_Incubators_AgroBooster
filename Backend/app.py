import os
import requests
from flask import Flask, request, jsonify
from flask_cors import CORS
import pymongo
from config import Config
import logging
from pytz import timezone
from pymongo import MongoClient
from twilio.rest import Client 
from apscheduler.schedulers.background import BackgroundScheduler
from datetime import datetime,timedelta

werkzeug_logger = logging.getLogger("werkzeug")
werkzeug_logger.setLevel(logging.ERROR)
logging.getLogger('pymongo').setLevel(logging.WARNING)



def create_app():
    app = Flask(__name__)

    # Load configuration
    app.config.from_object(Config)

    # Initialize extensions
    CORS(app)
    
    
    # Initialize MongoDB
    client = pymongo.MongoClient(app.config["MONGO_URI"])
    app.db = client.get_database()  # ✅ This makes db accessible as current_app.db

    # Test MongoDB connection
    try:
        app.db.command('ping')  # ✅ Pings MongoDB to check if it's connected
        print("✅ MongoDB connection successful!")
    except Exception as e:
        print(f"❌ MongoDB connection failed! Error: {e}")
        raise e  # Stop app if MongoDB fails

    # Import blueprints after initializing MongoDB
    from routes.auth_routes import auth_bp
    from routes.sms_routes import sms_bp
    from routes.analyze_soil_report_routes import analyze_soil_report_bp
    from routes.get_location import location_bp
    from routes.weather_routes import weather_bp
    from routes.weather_forcast import weather_forecast_bp
    from routes.farmer_data_routes import farmer_data_bp
    from routes.contact_routes import contact_bp
    from routes.predict_routes import predict_bp
    from routes.rent import tool_rental_bp
    from routes.calendar import calendar_bp
    from routes.labs_routes import labs_bp
    from routes.scheme_routes import scheme_bp
    # from routes.weather_alert_routes import weather_alert_bp,init_alert_scheduler

    # Register blueprints
    app.register_blueprint(auth_bp, url_prefix="/user")
    app.register_blueprint(sms_bp, url_prefix="/twilio")
    app.register_blueprint(analyze_soil_report_bp, url_prefix="/analyze_soil")
    app.register_blueprint(location_bp, url_prefix="/location")
    app.register_blueprint(weather_bp, url_prefix="/weather")
    app.register_blueprint(weather_forecast_bp, url_prefix="/weather_forecast")
    app.register_blueprint(farmer_data_bp, url_prefix="/farmer_data")
    app.register_blueprint(contact_bp, url_prefix="/contact")
    app.register_blueprint(predict_bp, url_prefix="/predict")
    app.register_blueprint(tool_rental_bp, url_prefix="/tools") 
    app.register_blueprint(calendar_bp,url_prefix='/calendar')
    app.register_blueprint(labs_bp,url_prefix='/api')
    app.register_blueprint(scheme_bp,url_prefix='/api')
    # app.register_blueprint(weather_alert_bp)
    # init_alert_scheduler(app)
    # News API Configuration
    

    # Attach MongoDB client to app for access in routes
    app.mongo_client = client  # Fixed this
    
    return app

client = MongoClient("mongodb://localhost:27017/")
db = client["agrobooster"]
crop_schedules_collection = db["crop_schedules"]
print(crop_schedules_collection)
   
TWILIO_ACCOUNT_SID = os.getenv('TWILIO_SID')
TWILIO_AUTH_TOKEN = os.getenv('TWILIO_AUTH_TOKEN')
TWILIO_PHONE_NUMBER = os.getenv('TWILIO_PHONE_NUMBER')
scheduler = BackgroundScheduler()
scheduler.start()

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

 
def check_activities():
    print(f"Scheduled task running at {datetime.now()}")
    try:
        # Get today's date
        today = datetime.today().date()
        schedules = crop_schedules_collection.find()
        for schedule in schedules:
            farm_id = schedule.get("farmId")
            tasks = schedule.get("tasks", [])
            user_phone_number = schedule.get("phonenum")
            
            for task in tasks:
                start_date = task.get("start_date")
                if isinstance(start_date, str):
                    start_date = datetime.fromisoformat(start_date).date()

                if start_date == today:
                    # Prepare the SMS message
                    sms_body = f"Reminder: {task['title']} starts today. Description: {task['description']}"
                    send_sms(user_phone_number, sms_body)
    except Exception as e:
        print(f"Error checking schedules: {e}")
    
scheduler.add_job(
    func=check_activities,
    trigger="cron",
    hour=9,
    minute=30,
    timezone="Asia/Kolkata"
)



if __name__ == "__main__":
    app = create_app()
    if app:
        app.run(debug=True, port=4000)  # Run the Flask app only if MongoDB is connected
    else:
        print("❌ Application startup failed due to MongoDB connection error.")



