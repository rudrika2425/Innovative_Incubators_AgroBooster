from flask import Blueprint, current_app
from pymongo import MongoClient
import requests
from datetime import datetime
from twilio.rest import Client
import logging
import os

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

weather_alert_bp = Blueprint('weather_alert', __name__)

client = MongoClient('mongodb://localhost:27017/')
db = client['agrobooster']
farms_collection = db['farmers']
users_collection = db['users']

# Twilio configuration
TWILIO_ACCOUNT_SID = os.getenv('TWILIO_SID')
TWILIO_AUTH_TOKEN = os.getenv('TWILIO_AUTH_TOKEN')
TWILIO_PHONE_NUMBER = os.getenv('TWILIO_PHONE_NUMBER')
WEATHER_API_KEY = os.getenv('WEATHER_API_KEY_OPENWEATHER')

twilio_client = Client(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)

def get_user_phone(user_id):
    """Fetch user's phone number from users collection"""
    try:
        user = users_collection.find_one({"_id": ObjectId(user_id)})
        return user.get('phone_number') if user else None
    except Exception as e:
        logger.error(f"Error fetching user phone: {str(e)}")
        return None

def send_sms_alert(phone_number, message):
    """Send SMS using Twilio"""
    try:
        message = twilio_client.messages.create(
            body=message,
            from_=TWILIO_PHONE_NUMBER,
            to="+91"+phone_number
        )
        logger.info(f"SMS sent successfully: {message.sid}")
        return True
    except Exception as e:
        logger.error(f"Error sending SMS: {str(e)}")
        return False

def format_alert_message(farm_name, alerts):
    """Format alert message for SMS"""
    message = f"⚠️ Weather Alert for {farm_name}:\n\n"
    
    for alert in alerts:
        event = alert.get('event', 'Weather Alert')
        description = alert.get('description', 'No description available')
        start_time = datetime.fromtimestamp(alert.get('start')).strftime('%Y-%m-%d %H:%M')
        
        message += f"- {event}\n"
        message += f"  Time: {start_time}\n"
        message += f"  Details: {description[:100]}...\n\n"
    
    message += "\nPlease take necessary precautions."
    return message

def check_farm_weather_alerts():
    """Check weather alerts for all farms and send SMS notifications"""
    try:
        # Fetch all farms
        farms = farms_collection.find({})
        alerts_sent = 0
        
        for farm in farms:
            try:
                # Extract required data
                farmer_Input = farm.get('farmerInput', {})
                farm_name = farmer_Input.get('farmName')
                farmer_id = farm.get('farmerId')
                location = farm.get('location', {})
                lat = location.get('latitude')
                lon = location.get('longitude')
                
                if not all([farm_name, farmer_id, lat, lon]):
                    continue
                
                # Get weather data
                api_url = f"https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude=minutely&appid={WEATHER_API_KEY}"
                response = requests.get(api_url)
                weather_data = response.json()
                
                # Get user's phone number once for both alerts
                phone_number = get_user_phone(farmer_id)
                if not phone_number:
                    logger.warning(f"No phone number found for farmer ID: {farmer_id}")
                    continue
                
                # Check for alerts
                if "alerts" in weather_data:
                    # Format and send alert message
                    message = format_alert_message(farm_name, weather_data["alerts"])
                    if send_sms_alert(phone_number, message):
                        alerts_sent += 1
                
                # Check for severe weather conditions
                current = weather_data.get('current', {})
                if current:
                    severe_conditions = []
                    
                    # Check temperature (over 35°C/308.15K or below 5°C/278.15K)
                    temp = current.get('temp')
                    if temp:
                        if temp > 308.15:
                            severe_conditions.append(f"High temperature alert: {temp-273.15:.1f}°C")
                        elif temp < 278.15:
                            severe_conditions.append(f"Low temperature alert: {temp-273.15:.1f}°C")
                    
                    # Check wind speed (over 20 m/s)
                    wind_speed = current.get('wind_speed')
                    if wind_speed and wind_speed > 20:
                        severe_conditions.append(f"High wind speed alert: {wind_speed} m/s")
                    
                    if severe_conditions:
                        message = f"⚠️ Severe Weather Alert for {farm_name}:\n\n"
                        message += "\n".join(severe_conditions)
                        message += "\n\nPlease take necessary precautions."
                        
                        if send_sms_alert(phone_number, message):
                            alerts_sent += 1
                
            except Exception as e:
                logger.error(f"Error processing farm {farm.get('farmName', 'Unknown')}: {str(e)}")
                continue
        
        return {
            "status": "success",
            "alerts_sent": alerts_sent,
            "message": f"Successfully sent {alerts_sent} weather alerts"
        }
        
    except Exception as e:
        logger.error(f"Error in check_farm_weather_alerts: {str(e)}")
        return {
            "status": "error",
            "message": str(e)
        }

@weather_alert_bp.route('/check-alerts', methods=['GET'])
def trigger_alert_check():
    """API endpoint to manually trigger alert check"""
    try:
        result = check_farm_weather_alerts()
        return jsonify(result)
    except Exception as e:
        return jsonify({
            "status": "error",
            "message": str(e)
        }), 500

# Schedule regular alert checks
from flask_apscheduler import APScheduler
scheduler = APScheduler()

def init_alert_scheduler(app):
    scheduler.init_app(app)
    scheduler.add_job(
        id='check_weather_alerts',
        func=check_farm_weather_alerts,
        trigger='interval',
        minutes=30
    )
    scheduler.start()