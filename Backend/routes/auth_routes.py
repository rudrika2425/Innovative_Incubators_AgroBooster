from flask import Blueprint, request, jsonify
from models.user_model import User

auth_bp = Blueprint("auth", __name__)

@auth_bp.route("/signup", methods=["POST"])
def signup():
    data = request.get_json()
    fullname = data.get("fullname")
    phone_number = data.get("phone_number")
    password = data.get("password")
    otp = data.get("otp")
    expected_otp = data.get("expected_otp")

    if otp != expected_otp:
        return jsonify({"error": "Invalid OTP"}), 400

    response = User.create_user(fullname, phone_number, password)
    return jsonify(response)
