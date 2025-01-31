from flask import Blueprint, request, jsonify
from twilio.rest import Client
from dotenv import load_dotenv
import random
import os


load_dotenv()

twilio_bp = Blueprint('twilio', __name__)

@twilio_bp.route("/send_sms", methods=["POST"])
def send_sms():
    try:
        data = request.get_json()
        if not data or "phone_number" not in data:
            return jsonify({"error": "Phone number is required"}), 400  

        phone_number = data["phone_number"]
        print(f"Received phone number: {phone_number}")  

       
        account_sid = os.getenv("TWILIO_SID")
        auth_token = os.getenv("TWILIO_AUTH_TOKEN")
        from_number = os.getenv("TWILIO_PHONE_NUMBER")
        
        if not all([account_sid, auth_token, from_number]):
            return jsonify({"error": "Twilio credentials not found"}), 500

        client = Client(account_sid, auth_token)

        otp = str(random.randint(100000, 999999))
        message = client.messages.create(
            body=f"Your OTP is: {otp}",
            from_=from_number,
            to=phone_number
        )

        return jsonify({"message": "OTP sent successfully", "otp": otp})

    except Exception as e:
        print(f"Error: {e}")  
        return jsonify({"error": "Failed to send OTP"}), 500
