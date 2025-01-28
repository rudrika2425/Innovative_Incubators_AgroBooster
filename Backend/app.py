# app.py
from flask import Flask
from pymongo import MongoClient
from flask_cors import CORS
from routes.user_routes import user_routes 
from routes.analyze_soil_report import analyze_soil_report_bp


def create_app():
    app = Flask(__name__)
    CORS(app)

    # MongoDB Setup
    client = MongoClient('mongodb://localhost:27017/')  
    app.db = client['mydatabase'] 

    # Register Blueprints
    app.register_blueprint(user_routes, url_prefix='/users')
    app.register_blueprint(analyze_soil_report_bp, url_prefix='/analyze_soil')  

    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True)
