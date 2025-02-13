import os
import requests
from flask import Flask, request, jsonify
from flask_cors import CORS
import pymongo
from config import Config
import logging
from datetime import datetime,timedelta

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
    from routes.sms_routes import sms_bp
    from routes.analyze_soil_report_routes import analyze_soil_report_bp
    from routes.get_location import location_bp
    from routes.weather_routes import weather_bp
    from routes.weather_forcast import weather_forecast_bp
    from routes.farmer_data_routes import farmer_data_bp
    from routes.contact_routes import contact_bp
    from routes.predict_routes import predict_bp
    from routes.rent import tool_rental_bp
    from routes.calendar import calendar_bp
    from routes.labs_routes import labs_bp
    # from routes.weather_alert_routes import weather_alert_bp,init_alert_scheduler

    # Register blueprints
    app.register_blueprint(auth_bp, url_prefix="/user")
    app.register_blueprint(sms_bp, url_prefix="/twilio")
    app.register_blueprint(analyze_soil_report_bp, url_prefix="/analyze_soil")
    app.register_blueprint(location_bp, url_prefix="/location")
    app.register_blueprint(weather_bp, url_prefix="/weather")
    app.register_blueprint(weather_forecast_bp, url_prefix="/weather_forecast")
    app.register_blueprint(farmer_data_bp, url_prefix="/farmer_data")
    app.register_blueprint(contact_bp, url_prefix="/contact")
    app.register_blueprint(predict_bp, url_prefix="/predict")
    app.register_blueprint(tool_rental_bp, url_prefix="/tools") 
    app.register_blueprint(calendar_bp,url_prefix='/calendar')
    app.register_blueprint(labs_bp,url_prefix='/api')
    # app.register_blueprint(weather_alert_bp)
    # init_alert_scheduler(app)
    # News API Configuration
    NEWS_API_KEY = "55b454ac61604a2d9173f2a1576f0260"  # Replace with your actual NewsAPI key
    NEWS_CACHE = {'data': None, 'last_updated': None}

    # Static Scheme Data
    SCHEMES_DATA = [
        {
            "id": 1,
            "name": "PM-KISAN",
            "description": "किसान परिवारों को प्रति वर्ष 6000 रुपये की सीधी आय सहायता",
            "benefits": [
                "प्रति वर्ष 6000 रुपये की वित्तीय सहायता",
                "बैंक खातों में सीधे ट्रांसफर",
                "कृषि आवश्यकताओं के लिए समर्थन"
            ],
            "eligibility": "सभी छोटे और सीमांत किसान",
            "link": "https://pmkisan.gov.in/",
            "image": "https://pmkisan.gov.in/new_images/PradhanMantriKisanSammanNidhiBanner.jpg"
        },
        {
            "id": 2,
            "name": "किसान क्रेडिट कार्ड",
            "description": "किसानों को समय पर क्रेडिट तक पहुंच प्रदान करता है",
            "benefits": [
                "फसलों के लिए आसान क्रेडिट पहुंच",
                "लचीले पुनर्भुगतान विकल्प",
                "बीमा कवरेज"
            ],
            "eligibility": "सभी किसान, शेयरक्रॉपर्स और कृषि करने वाले",
            "link": "https://www.india.gov.in/spotlight/kisan-credit-card",
            "image": "https://pmkisan.gov.in/new_images/SabkaSathSabkaVikasSabkaViswas.jpg"
        }
    ]

    @app.route('/api/schemes', methods=['GET'])
    def get_schemes():
        try:
            return jsonify({
                "status": "success",
                "data": SCHEMES_DATA
            })
        except Exception as e:
            return jsonify({"error": str(e)}), 500

    @app.route('/api/news', methods=['GET'])
    def get_news():
        try:
            # Check cache (refresh every 30 minutes)
            if (NEWS_CACHE['data'] and NEWS_CACHE['last_updated'] and 
                datetime.now() - NEWS_CACHE['last_updated'] < timedelta(minutes=30)):
                return jsonify({"status": "success", "data": NEWS_CACHE['data']})

            # Keywords for Indian agriculture news in Hindi
            indian_agri_keywords = "किसान OR कृषि OR पीएम-किसान OR किसान क्रेडिट कार्ड"

            # Build the API URL with specific parameters for Indian agriculture news in Hindi
            url = (
                f"https://newsapi.org/v2/everything?"
                f"q={indian_agri_keywords}&"
                f"apiKey={NEWS_API_KEY}&"
                f"language=hi&"  # Set language to Hindi
                f"sortBy=publishedAt"
            )

            response = requests.get(url)
            print(response.json())  # Log the raw response from the API

            if response.status_code == 200:
                news_data = response.json()

                # Process and filter news
                formatted_news = []
                for article in news_data.get("articles", []):
                    if article.get("urlToImage") and article.get("description"):
                        formatted_news.append({
                            "title": article["title"],
                            "description": article["description"],
                            "url": article["url"],
                            "image": article["urlToImage"],
                            "publishedAt": article["publishedAt"],
                            "source": article["source"]["name"]
                        })

                # Update cache with filtered news
                NEWS_CACHE['data'] = formatted_news[:12]  # Store top 12 relevant articles
                NEWS_CACHE['last_updated'] = datetime.now()

                return jsonify({
                    "status": "success",
                    "data": NEWS_CACHE['data']
                })
            else:
                return jsonify({"error": "Failed to fetch news"}), 500

        except Exception as e:
            return jsonify({"error": str(e)}), 500

    # Attach MongoDB client to app for access in routes
    app.mongo_client = client  # Fixed this
    
    return app




if __name__ == "__main__":
    app = create_app()
    if app:
        app.run(debug=True, port=4000)  # Run the Flask app only if MongoDB is connected
    else:
        print("❌ Application startup failed due to MongoDB connection error.")



