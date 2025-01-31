from flask import Flask
from flask_cors import CORS
from flask_pymongo import PyMongo
from config import Config

# Initialize PyMongo globally but do not initialize it yet
mongo = PyMongo()

def create_app():
    app = Flask(__name__)
    
    # Load configuration
    app.config.from_object(Config)
    
    # Initialize extensions
    CORS(app)
    
    # Initialize MongoDB with the app
    mongo.init_app(app)

    # Test MongoDB connection
    try:
        mongo.db.command('ping')  # Pings MongoDB to check if it's connected
        print("✅ MongoDB connection successful!")
    except Exception as e:
        print(f"❌ MongoDB connection failed! Error: {e}")
        raise e  # Stop app if MongoDB fails

    # Import blueprints after initializing mongo
    from routes.auth_routes import auth_bp
    from routes.twilio_routes import twilio_bp
    from routes.analyze_soil_report_routes import analyze_soil_report_bp
    from routes.get_location import location_bp
    from routes.weather_routes import weather_bp
    from routes.weather_forcast import weather_forecast_bp

    # Register blueprints
    app.register_blueprint(auth_bp, url_prefix="/user")
    app.register_blueprint(twilio_bp, url_prefix="/twilio")
    app.register_blueprint(analyze_soil_report_bp, url_prefix='/analyze_soil')
    app.register_blueprint(location_bp, url_prefix='/location')
    app.register_blueprint(weather_bp, url_prefix='/weather')
    app.register_blueprint(weather_forecast_bp, url_prefix='/weather_forecast')

    return app

if __name__ == "__main__":
    app = create_app()
    app.run(debug=True, port=4000)
