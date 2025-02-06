import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

class Config:
    MONGO_URI = os.getenv('MONGO_URI', 'mongodb://localhost:27017/agrobooster')  # Ensure database name is included
    SECRET_KEY = os.getenv('SECRET_KEY', 'agrobooster')
    GEMINI_API_KEY = os.getenv('GEMINI_API_KEY')
    cloud_name=os.getenv('CLOUDINARY_CLOUD_NAME'),
    api_key=os.getenv('CLOUDINARY_API_KEY'),
    api_secret=os.getenv('CLOUDINARY_API_SECRET')
