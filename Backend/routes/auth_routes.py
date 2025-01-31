from flask import Blueprint, request, jsonify
from models.user_model import User
import logging

auth_bp = Blueprint("auth", __name__)

@auth_bp.route("/signup", methods=["POST"])
def signup():
    try:
        data = request.get_json()
        print("Received signup data:", data)  # Debug print
        
        # Validate required fields
        required_fields = ['fullname', 'phone_number', 'password', 'otp', 'expected_otp']
        for field in required_fields:
            if not data.get(field):
                return jsonify({"error": f"Missing required field: {field}"}), 400
        
        # Validate OTP
        if data['otp'] != data['expected_otp']:
            return jsonify({"error": "Invalid OTP"}), 400
        
        response = User.create_user(
            fullname=data['fullname'],
            phone_number=data['phone_number'],
            password=data['password']
        )
        
        if "error" in response:
            return jsonify(response), 400
            
        return jsonify(response), 201
        
    except Exception as e:
        logging.error(f"Signup error: {str(e)}")
        return jsonify({"error": "An error occurred during signup"}), 500