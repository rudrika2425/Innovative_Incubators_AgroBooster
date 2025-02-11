# import os
# import requests
# from flask import Flask, request, jsonify
# from flask_cors import CORS
# import pymongo
# from config import Config
# import logging
# from apscheduler.schedulers.background import BackgroundScheduler
# from bs4 import BeautifulSoup

# # Set up logging
# werkzeug_logger = logging.getLogger("werkzeug")
# werkzeug_logger.setLevel(logging.ERROR)
# logging.getLogger('pymongo').setLevel(logging.WARNING)
# logging.basicConfig(level=logging.INFO)

# def create_app():
#     app = Flask(__name__)

#     # Load configuration
#     app.config.from_object(Config)

#     # Initialize extensions
#     CORS(app)

#     # Initialize MongoDB
#     client = pymongo.MongoClient(app.config["MONGO_URI"])
#     app.db = client.get_database()

#     # Test MongoDB connection
#     try:
#         app.db.command('ping')
#         print("✅ MongoDB connection successful!")
#         logging.info("✅ MongoDB connection successful!")
#     except Exception as e:
#         print(f"❌ MongoDB connection failed! Error: {e}")
#         logging.error(f"❌ MongoDB connection failed! Error: {e}")
#         raise e 
    
#     # Import blueprints
#     from routes.auth_routes import auth_bp
#     from routes.twilio_routes import twilio_bp
#     from routes.analyze_soil_report_routes import analyze_soil_report_bp
#     from routes.get_location import location_bp
#     from routes.weather_routes import weather_bp
#     from routes.weather_forcast import weather_forecast_bp
#     from routes.farmer_data_routes import farmer_data_bp
#     from routes.contact_routes import contact_bp
#     from routes.predict_routes import predict_bp
#     from routes.rent import tool_rental_bp
#     from routes.calendar import calendar_bp
#     from routes.labs_routes import labs_bp

#     # Register blueprints
#     app.register_blueprint(auth_bp, url_prefix="/user")
#     app.register_blueprint(twilio_bp, url_prefix="/twilio")
#     app.register_blueprint(analyze_soil_report_bp, url_prefix="/analyze_soil")
#     app.register_blueprint(location_bp, url_prefix="/location")
#     app.register_blueprint(weather_bp, url_prefix="/weather")
#     app.register_blueprint(weather_forecast_bp, url_prefix="/weather_forecast")
#     app.register_blueprint(farmer_data_bp, url_prefix="/farmer_data")
#     app.register_blueprint(contact_bp, url_prefix="/contact")
#     app.register_blueprint(predict_bp, url_prefix="/predict")
#     app.register_blueprint(tool_rental_bp, url_prefix="/tools") 
#     app.register_blueprint(calendar_bp, url_prefix='/calendar')
#     app.register_blueprint(labs_bp, url_prefix='/api')
    
#     # Attach MongoDB client to app
#     app.mongo_client = client

#     # Initialize schemes collection
#     schemes_collection = app.db["schemes"]
#     schemes_collection.create_index("id", unique=True)

#     def scrape_schemes():
#         print("🕒 Starting to scrape schemes...")
#         websites = [
#             'https://agricoop.nic.in/en/schemes',
#             'https://pmkisan.gov.in'
#         ]
#         schemes = []
        
#         for url in websites:
#             print(f"🔍 Scraping {url}...")
#             try:
#                 response = requests.get(url)
#                 response.raise_for_status()  # Raise an error for bad responses
#                 soup = BeautifulSoup(response.text, 'html.parser')
#                 scheme_elements = soup.select('.scheme-item')
                
#                 for element in scheme_elements:
#                     scheme = {
#                         'id': element.get('id'),
#                         'title': element.select_one('.scheme-title').text.strip(),
#                         'description': element.select_one('.scheme-desc').text.strip(),
#                         'category': element.select_one('.category').text.strip(),
#                         'last_date': element.select_one('.last-date').text.strip(),
#                         'eligibility': element.select_one('.eligibility').text.strip(),
#                         'registration_url': element.select_one('.apply-link')['href'],
#                         'is_new': 'new-scheme' in element.get('class', [])
#                     }
#                     print(f"📋 Found scheme: {scheme['title']}")
#                     schemes.append(scheme)
#             except requests.RequestException as e:
#                 print(f"❌ Error scraping {url}: {e}")
#                 logging.error(f"Error scraping {url}: {e}")
#             except Exception as e:
#                 print(f"❌ Unexpected error while processing {url}: {e}")
#                 logging.error(f"Unexpected error while processing {url}: {e}")
        
#         for scheme in schemes:
#             try:
#                 print(f"💾 Updating scheme {scheme['id']} in MongoDB...")
#                 schemes_collection.update_one({'id': scheme['id']}, {"$set": scheme}, upsert=True)
#                 print(f"✅ Scheme {scheme['id']} updated successfully.")
#             except Exception as e:
#                 print(f"❌ Error updating scheme {scheme['id']} in MongoDB: {e}")
#                 logging.error(f"Error updating scheme {scheme['id']} in MongoDB: {e}")

#     @app.route('/api/schemes', methods=['GET'])
#     def get_schemes():
#         try:
#             print("📡 Fetching schemes from MongoDB...")
#             schemes = list(schemes_collection.find({}, {'_id': 0}))
#             print(f"📊 Found {len(schemes)} schemes.")
#             return jsonify(schemes), 200
#         except Exception as e:
#             print(f"❌ Error fetching schemes from MongoDB: {e}")
#             logging.error(f"Error fetching schemes from MongoDB: {e}")
#             return jsonify({"error": "Failed to fetch schemes"}), 500

#     scheduler = BackgroundScheduler()
#     scheduler.add_job(scrape_schemes, 'interval', hours=1)
#     scheduler.start()
#     print("🕒 Scheduler started to scrape schemes every hour.")
    
#     return app

# if __name__ == "__main__":
#     app = create_app()
#     if app:
#         print("🚀 Starting Flask application...")
#         app.run(debug=True, port=4000)
#     else:
#         print("❌ Application startup failed due to MongoDB connection error.")