import os
import requests
from flask import Flask, request, jsonify
from flask_cors import CORS
import pymongo
from config import Config
import logging

werkzeug_logger = logging.getLogger("werkzeug")
werkzeug_logger.setLevel(logging.ERROR)
logging.getLogger('pymongo').setLevel(logging.WARNING)

def create_app():
    app = Flask(__name__)

    # Load configuration
    app.config.from_object(Config)

    # Initialize extensions
    CORS(app)

    # Initialize MongoDB
    client = pymongo.MongoClient(app.config["MONGO_URI"])
    app.db = client.get_database()  # ✅ This makes db accessible as current_app.db

    # Test MongoDB connection
    try:
        app.db.command('ping')  # ✅ Pings MongoDB to check if it's connected
        print("✅ MongoDB connection successful!")
    except Exception as e:
        print(f"❌ MongoDB connection failed! Error: {e}")
        raise e  # Stop app if MongoDB fails

    # Import blueprints after initializing MongoDB
    from routes.auth_routes import auth_bp
    from routes.twilio_routes import twilio_bp
    from routes.analyze_soil_report_routes import analyze_soil_report_bp
    from routes.get_location import location_bp
    from routes.weather_routes import weather_bp
    from routes.weather_forcast import weather_forecast_bp
    from routes.farmer_data_routes import farmer_data_bp
    from routes.contact_routes import contact_bp
    from routes.predict_routes import predict_bp
    from routes.rent import tool_rental_bp
    from routes.calendar import calendar_bp

    # Register blueprints
    app.register_blueprint(auth_bp, url_prefix="/user")
    app.register_blueprint(twilio_bp, url_prefix="/twilio")
    app.register_blueprint(analyze_soil_report_bp, url_prefix="/analyze_soil")
    app.register_blueprint(location_bp, url_prefix="/location")
    app.register_blueprint(weather_bp, url_prefix="/weather")
    app.register_blueprint(weather_forecast_bp, url_prefix="/weather_forecast")
    app.register_blueprint(farmer_data_bp, url_prefix="/farmer_data")
    app.register_blueprint(contact_bp, url_prefix="/contact")
    app.register_blueprint(predict_bp, url_prefix="/predict")
    app.register_blueprint(tool_rental_bp, url_prefix="/tools") 
    app.register_blueprint(calendar_bp,url_prefix='/calendar')

    GOOGLE_PLACES_API_KEY = os.getenv("GOOGLE_PLACES_API_KEY")

    @app.route('/api/search-labs', methods=['GET'])
    def search_labs():
        lat = request.args.get('lat')
        lng = request.args.get('lng')

        if not lat or not lng:
            return jsonify({"error": "Latitude and Longitude are required"}), 400

        try:
            url = f"https://maps.googleapis.com/maps/api/place/nearbysearch/json?location={lat},{lng}&radius=50000&keyword=soil+testing+laboratory&type=establishment&key={GOOGLE_PLACES_API_KEY}"
            response = requests.get(url)
            response_data = response.json()

            # Get detailed information for each place
            detailed_results = []
            for place in response_data.get("results", []):
                place_id = place.get("place_id")
                if place_id:
                    details_url = f"https://maps.googleapis.com/maps/api/place/details/json?place_id={place_id}&fields=name,formatted_address,formatted_phone_number,address_components&key={GOOGLE_PLACES_API_KEY}"
                    details_response = requests.get(details_url)
                    detailed_results.append(details_response.json().get("result", {}))

            return jsonify({"results": detailed_results})
        
        except Exception as e:
            print("Error:", e)
            return jsonify({"error": "Error fetching labs data"}), 500

    @app.route('/api/search-labs-location', methods=['GET'])
    def search_labs_location():
        state = request.args.get('state')
        district = request.args.get('district')

        if not state:
            return jsonify({"error": "State is required"}), 400

        search_query = f"soil testing laboratory in {district + ', ' if district else ''}{state}"

        try:
            url = f"https://maps.googleapis.com/maps/api/place/textsearch/json?query={requests.utils.quote(search_query)}&type=establishment&key={GOOGLE_PLACES_API_KEY}"
            response = requests.get(url)
            response_data = response.json()

            # Get detailed information for each place
            detailed_results = []
            for place in response_data.get("results", []):
                place_id = place.get("place_id")
                if place_id:
                    details_url = f"https://maps.googleapis.com/maps/api/place/details/json?place_id={place_id}&fields=name,formatted_address,formatted_phone_number,address_components&key={GOOGLE_PLACES_API_KEY}"
                    details_response = requests.get(details_url)
                    detailed_results.append(details_response.json().get("result", {}))

            return jsonify({"results": detailed_results})
        
        except Exception as e:
            print("Error:", e)
            return jsonify({"error": "Error fetching labs data"}), 500

    # Attach MongoDB client to app for access in routes
    app.mongo_client = client  # ✅ Fixed this

    return app

if __name__ == "__main__":
    app = create_app()
    if app:
        app.run(debug=True, port=4000)  # Run the Flask app only if MongoDB is connected
    else:
        print("❌ Application startup failed due to MongoDB connection error.")
