# # model_train.py
# import os
# import sys
# from app import create_app
# from services.crop_prediction_service import CropPredictionService
# import logging

# logging.getLogger('pymongo').setLevel(logging.WARNING)

# def main():
#     app = create_app()
    
#     with app.app_context():
#         db = app.db
        
#         crop_service = CropPredictionService(db)
        
#         try:
#             result = crop_service.train_model()
#             print(f"Model training result: {result}")
#         except Exception as e:
#             print(f"Error during model training: {str(e)}")
#             sys.exit(1)

# if __name__ == "__main__":
#     main()