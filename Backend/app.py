# app.py
from flask import Flask
from pymongo import MongoClient
from routes.user_routes import user_routes 


def create_app():
    app = Flask(__name__)

    # MongoDB Setup
    client = MongoClient('mongodb://localhost:27017/')  
    app.db = client['mydatabase'] 

    # Register Blueprints
    app.register_blueprint(user_routes, url_prefix='/users')  

    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True)
