# # routes/crop_prediction_routes.py
# from flask import Blueprint, request, jsonify, current_app
# from services.crop_prediction_service import CropPredictionService

# crop_prediction_bp = Blueprint('crop_prediction', __name__)

# def get_crop_service():
#     if not hasattr(current_app, 'crop_service'):
#         current_app.crop_service = CropPredictionService(current_app.db)
#     return current_app.crop_service

# @crop_prediction_bp.route('/predict', methods=['POST'])
# def predict_crop():
#     try:
#         if not request.is_json:
#             return jsonify({'error': 'Content-Type must be application/json'}), 400
            
#         data = request.get_json()
#         if not data:
#             return jsonify({'error': 'No data provided'}), 400
            
#         required_fields = ['N', 'P', 'K', 'temperature', 'humidity', 'ph', 'rainfall']
#         missing_fields = [field for field in required_fields if field not in data]
        
#         if missing_fields:
#             return jsonify({'error': f'Missing required fields: {", ".join(missing_fields)}'}), 400
            
#         crop_service = get_crop_service()
#         result = crop_service.predict_crop(data)
#         return jsonify(result)
#     except Exception as e:
#         return jsonify({'error': str(e)}), 500

# @crop_prediction_bp.route('/train', methods=['POST'])
# def train_model():
#     try:
#         crop_service = get_crop_service()
#         result = crop_service.train_model()
#         return jsonify({'message': 'Model trained successfully', 'result': result})
#     except Exception as e:
#         return jsonify({'error': str(e)}), 500