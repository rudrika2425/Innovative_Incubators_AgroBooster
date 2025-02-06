import google.generativeai as genai
import os
from dotenv import load_dotenv
from datetime import datetime

load_dotenv()

class GeminiService:
    def __init__(self, db):
        self.db = db
        api_key = os.getenv('GEMINI_API_KEY')
        if not api_key:
            raise ValueError("Gemini API key not found in environment variables")
        genai.configure(api_key=api_key)
    
    def get_crop_predictions(self, soil_data):
        try:
            model = genai.GenerativeModel('gemini-pro')
            prompt = f"""
            Based on the following soil data, recommend the top 3 most suitable crops and provide detailed agricultural advice.
            Format the response to clearly list the crops first, then provide detailed advice for each crop.

            Soil Data:
            Nitrogen: {soil_data['N']} kg/ha
            Phosphorus: {soil_data['P']} kg/ha
            Potassium: {soil_data['K']} kg/ha
            pH: {soil_data['ph']}
            Temperature: {soil_data['temperature']}°C
            Humidity: {soil_data['humidity']}%
            Rainfall: {soil_data['rainfall']} mm

            Please format your response as follows:
            TOP RECOMMENDED CROPS:
            1. [First Crop]
            2. [Second Crop]
            3. [Third Crop]

            DETAILED ADVICE:
            [First Crop]:
            - Why suitable for these conditions
            - Specific farming requirements
            - Potential challenges and solutions

            [Second Crop]:
            (same format as above)

            [Third Crop]:
            (same format as above)
            """
            
            response = model.generate_content(prompt)
            advice = response.text
            
            # Extract the top 3 crops from the response
            crops = []
            for line in advice.split('\n'):
                if line.strip().startswith(('1.', '2.', '3.')):
                    crop = line.split('.', 1)[1].strip()
                    crops.append(crop)
            
            crops = crops[:3]  # Ensure we only get top 3
            
            # Store in database
            self.db.crop_advice_history.insert_one({
                'soil_data': soil_data,
                'crops': crops,
                'detailed_advice': advice,
                'timestamp': datetime.now()
            })
            
            return {
                'recommended_crops': crops,
                'detailed_advice': advice
            }
        except Exception as e:
            return {
                'recommended_crops': [],
                'detailed_advice': f"Could not generate advice: {str(e)}"
            }