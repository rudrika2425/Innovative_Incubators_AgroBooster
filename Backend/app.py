# app.py
from flask import Flask
from pymongo import MongoClient
from flask_cors import CORS
from routes.user_routes import user_routes 
from routes.analyze_soil_report_routes import analyze_soil_report_bp
from routes.get_location import location_bp
from routes.weather_routes import weather_bp
from routes.weather_forcast import weather_forecast_bp


def create_app():
    app = Flask(__name__)
    CORS(app, origins=["http://localhost:5173"])

    # MongoDB Setup
    client = MongoClient('mongodb://localhost:27017/')  
    app.db = client['mydatabase'] 

    # Register Blueprints
    app.register_blueprint(user_routes, url_prefix='/users')
    app.register_blueprint(analyze_soil_report_bp, url_prefix='/analyze_soil')  
    app.register_blueprint(location_bp,url_prefix='/location')
    app.register_blueprint(weather_bp,url_prefix='/weather')
    app.register_blueprint(weather_forecast_bp,url_prefix='/weather_forecast')

    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True,port=4000)
