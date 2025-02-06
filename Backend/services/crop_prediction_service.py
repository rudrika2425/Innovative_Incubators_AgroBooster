# import os
# from models.crop_prediction.crop_model import CropModel
# from models.crop_prediction.gemini_service import GeminiService

# # services/crop_prediction_service.py
# class CropPredictionService:
#     def __init__(self, db):
#         self.db = db
#         self.crop_model = CropModel(db)
#         self.gemini_service = GeminiService(db)
#         try:
#             self.crop_model.load_model()
#         except FileNotFoundError:
#             print("Model not found. Please train the model first.")
    
#     def train_model(self):
#         try:
#             data_path = os.path.join(os.path.dirname(__file__), '../data/crop_recommendation.csv')
#             self.crop_model.train_model(data_path)
#             return {'status': 'success'}
#         except Exception as e:
#             raise Exception(f"Training failed: {str(e)}")
    
#     def predict_crop(self, soil_data):
#         features = [
#             soil_data['N'],
#             soil_data['P'],
#             soil_data['K'],
#             soil_data['temperature'],
#             soil_data['humidity'],
#             soil_data['ph'],
#             soil_data['rainfall']
#         ]
        
#         try:
#             # Try ML model predictions first
#             model_predictions = self.crop_model.predict_multiple_crops(features, top_n=3)
            
#             # Get additional advice from Gemini
#             gemini_results = self.gemini_service.get_crop_predictions(soil_data)
            
#             return {
#                 'status': 'success',
#                 'source': 'ml_model',
#                 'predictions': model_predictions,
#                 'gemini_recommendations': gemini_results['recommended_crops'],
#                 'detailed_advice': gemini_results['detailed_advice']
#             }
            
#         except Exception as e:
#             print(f"ML model prediction failed: {str(e)}, falling back to Gemini API")
            
#             # Fallback to Gemini API
#             gemini_results = self.gemini_service.get_crop_predictions(soil_data)
            
#             if gemini_results['recommended_crops']:
#                 # Convert Gemini results to match ML model format
#                 predictions = [
#                     {'crop': crop, 'probability': 0.9 - (i * 0.1)} 
#                     for i, crop in enumerate(gemini_results['recommended_crops'])
#                 ]
                
#                 return {
#                     'status': 'success',
#                     'source': 'gemini',
#                     'predictions': predictions,
#                     'gemini_recommendations': gemini_results['recommended_crops'],
#                     'detailed_advice': gemini_results['detailed_advice']
#                 }
#             else:
#                 return {
#                     'status': 'error',
#                     'error': str(e),
#                     'message': 'Both ML model and Gemini API failed to provide predictions'
#                 }
