from flask import Flask
from flask_cors import CORS
from flask_pymongo import PyMongo
from config import Config
from routes.auth_routes import auth_bp
from routes.twilio_routes import twilio_bp

mongo = PyMongo()

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    mongo.init_app(app)
    CORS(app)

    # Register Blueprints
    app.register_blueprint(auth_bp, url_prefix="/user")
    app.register_blueprint(twilio_bp, url_prefix="/twilio")

    return app

if __name__ == "__main__":
    app = create_app()
    app.run(debug=True)
