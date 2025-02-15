from flask import Blueprint
from datetime import datetime
from pymongo import MongoClient
from apscheduler.schedulers.background import BackgroundScheduler
from twilio.rest import Client
import os

task_notification_bp = Blueprint('task_notification', __name__)

# MongoDB setup
client = MongoClient("mongodb://localhost:27017/")
db = client["agrobooster"]
crop_schedules_collection = db["crop_schedules"]

# Twilio setup
TWILIO_ACCOUNT_SID = os.getenv('TWILIO_SID')
TWILIO_AUTH_TOKEN = os.getenv('TWILIO_AUTH_TOKEN')
TWILIO_PHONE_NUMBER = os.getenv('TWILIO_PHONE_NUMBER')

# Initialize scheduler
scheduler = BackgroundScheduler()
scheduler.start()

# Initialize Twilio client
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
            user_phone_number = "+91"+schedule.get("phonenum")
            
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

# Schedule the job
scheduler.add_job(
    func=check_activities,
    trigger="cron",
    hour=9,
    minute=30,
    timezone="Asia/Kolkata"
)