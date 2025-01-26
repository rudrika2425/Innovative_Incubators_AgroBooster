from flask import Blueprint, jsonify, current_app

user_routes = Blueprint('user_routes', __name__)

@user_routes.route('/')
def home():
    return jsonify({"message": "Welcome to AgroBooster"})

