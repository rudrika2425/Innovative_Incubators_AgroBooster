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

@auth_bp.route("/login", methods=["POST"])
def login():
    try:
        data = request.get_json()
        print("Received login data:", data)  # Debug print
        
        # Validate required fields
        required_fields = ['phone_number', 'password']
        for field in required_fields:
            if not data.get(field):
                return jsonify({"error": f"Missing required field: {field}"}), 400
        
        # Retrieve user from database
        user = User.find_by_phone(data['phone_number'])
        
        if not user or not User.verify_password(user["password"], data["password"]):
            return jsonify({"error": "Invalid phone number or password"}), 401
        
        return jsonify({
            "message": "Login successful",
            "user": {
                "id": str(user["_id"]),  # Convert ObjectId to string
                "phone_number": user["phone_number"],
                "fullname": user["fullname"]
            }
        }), 200
        
    except Exception as e:
        logging.error(f"Login error: {str(e)}")
        return jsonify({"error": "An error occurred during login"}), 500
