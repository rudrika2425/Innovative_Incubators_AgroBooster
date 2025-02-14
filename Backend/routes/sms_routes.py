from flask import Blueprint, request, jsonify
import requests
from dotenv import load_dotenv
import random
import os

load_dotenv()

sms_bp = Blueprint('sms', __name__)

@sms_bp.route("/send_sms", methods=["POST"])
def send_sms():
    try:
        data = request.get_json()
        if not data or "phone_number" not in data:
            return jsonify({"error": "Phone number is required"}), 400
        
        phone_number = data["phone_number"]
        print(f"Received phone number: {phone_number}")
        
        # Get API key from environment variables
        api_key = os.getenv("FAST2SMS_API_KEY")
        if not api_key:
            return jsonify({"error": "Fast2SMS API key not found"}), 500

        # Generate OTP
        otp = str(random.randint(100000, 999999))
        
        # Prepare the message
        message = f"Hey Farmer! Your AgroBooster authentication OTP is {otp}. Unlock growth and harvest success with us!"
        
        # Fast2SMS API endpoint
        url = f"https://www.fast2sms.com/dev/bulkV2?authorization={api_key}&route=q&message={message}&flash=0&numbers={phone_number}&schedule_time="
        
        
        # Make the API request
        response = requests.get(url)
        
        # Check if the request was successful
        if response.status_code == 200:
            response_data = response.json()
            if response_data.get("return"):
                return jsonify({
                    "message": "OTP sent successfully",
                    "otp": otp
                })
            else:
                return jsonify({
                    "error": "Failed to send OTP",
                    "details": response_data.get("message")
                }), 500
        else:
            return jsonify({
                "error": "Failed to send OTP",
                "details": f"Status code: {response.status_code}"
            }), 500

    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"error": "Failed to send OTP"}), 500