# # models/crop_prediction/crop_model.py
# import pandas as pd
# from sklearn.model_selection import train_test_split
# from sklearn.ensemble import RandomForestClassifier
# import numpy as np
# import pickle
# import os

# class CropModel:
#     def __init__(self, db):
#         self.db = db
#         self.model = None
#         self.model_path = os.path.join(os.path.dirname(__file__), '../../data/crop_model.pkl')
    
#     def train_model(self, data_path):
#         data = pd.read_csv(data_path)
#         X = data[['N', 'P', 'K', 'temperature', 'humidity', 'ph', 'rainfall']]
#         y = data['label']
        
#         X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
        
#         self.model = RandomForestClassifier(n_estimators=100)
#         self.model.fit(X_train, y_train)
        
#         os.makedirs(os.path.dirname(self.model_path), exist_ok=True)
#         with open(self.model_path, 'wb') as f:
#             pickle.dump(self.model, f)
        
#         self.db.crop_models.insert_one({
#             'model_name': 'random_forest_crop_predictor',
#             'training_date': pd.Timestamp.now(),
#             'accuracy_score': self.model.score(X_test, y_test),
#             'features': ['N', 'P', 'K', 'temperature', 'humidity', 'ph', 'rainfall']
#         })
    
#     def predict_multiple_crops(self, features, top_n=3):
#         """Predict top N suitable crops with their probabilities"""
#         if self.model is None:
#             self.load_model()
        
#         # Get probability scores for all classes
#         probabilities = self.model.predict_proba([features])[0]
#         # Get indices of top N predictions
#         top_indices = np.argsort(probabilities)[-top_n:][::-1]
        
#         predictions = []
#         for idx in top_indices:
#             crop = self.model.classes_[idx]
#             probability = probabilities[idx]
#             predictions.append({
#                 'crop': crop,
#                 'probability': float(probability)
#             })
        
#         return predictions

#     def load_model(self):
#         if os.path.exists(self.model_path):
#             with open(self.model_path, 'rb') as f:
#                 self.model = pickle.load(f)
#         else:
#             raise FileNotFoundError("Model file not found. Please train the model first.")
