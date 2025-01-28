import os
import tensorflow as tf
import numpy as np
from PIL import Image

# Path to the trained model
current_dir = os.path.dirname(__file__)
model_path = os.path.join(current_dir, 'plant_disease_model.h5')
model = tf.keras.models.load_model(model_path)

def preprocess_image(image_path):
    image = Image.open(image_path).resize((224, 224))
    image = np.array(image) / 255.0  # Normalize the image
    image = np.expand_dims(image, axis=0)  # Add batch dimension
    return image

def analyze_image(image_path):
    image = preprocess_image(image_path)
    predictions = model.predict(image)
    class_index = np.argmax(predictions)
    confidence = np.max(predictions)

    # Define classes and solutions
    classes = ["Healthy", "Blight", "Rust", "Mildew"]
    solutions = {
        "Healthy": "No issues detected. Keep up the good work!",
        "Blight": "Apply a fungicide and ensure good air circulation.",
        "Rust": "Remove affected leaves and use a sulfur-based spray.",
        "Mildew": "Ensure proper drainage and avoid overwatering."
    }

    return {
        "disease": classes[class_index],
        "confidence": round(confidence * 100, 2),
        "solution": solutions[classes[class_index]]
    }
