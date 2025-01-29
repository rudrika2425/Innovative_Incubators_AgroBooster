import os
import logging
from flask import Blueprint, request, jsonify
from werkzeug.utils import secure_filename
import google.generativeai as genai
import pytesseract
from PIL import Image

# Configure logging
logging.basicConfig(level=logging.DEBUG)

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# Use environment variable for API key
GENAI_API_KEY = os.getenv('GENAI_API_KEY')
genai.configure(api_key=GENAI_API_KEY)

ALLOWED_EXTENSIONS = {'jpg', 'jpeg', 'png', 'gif', 'pdf', 'txt', 'webp'}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

# Create a Blueprint
analyze_soil_report_bp = Blueprint("analyze_soil_report", __name__)

@analyze_soil_report_bp.route("/api/analyze-soil-report", methods=["POST"])
def analyze_soil_report():
    if "file" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files["file"]
    if file.filename == "":
        return jsonify({"error": "No file selected"}), 400

    if not allowed_file(file.filename):
        return jsonify({"error": "File type not allowed. Only images and text files are supported."}), 400

    # Securely save the file
    filename = secure_filename(file.filename)
    file_path = os.path.join(UPLOAD_FOLDER, filename)
    file.save(file_path)

    try:
        # Use OCR to extract text from the image
        image = Image.open(file_path)
        extracted_text = pytesseract.image_to_string(image)

        # Use the extracted text with Gemini model
        model = genai.GenerativeModel("gemini-1.5-flash")
        prompt = (
            f"Extract the values and their respective units from the following soil report for these parameters: "
            f"pH, Nitrogen, Phosphorus, Potassium, Zinc, Sulfur, and Organic Carbon (or Organic Matter/Carbon). "
            f"Format the response as: "
            f"'pH: value unit, Nitrogen: value unit, Phosphorus: value unit, Potassium: value unit, Zinc: value unit, "
            f"Sulfur: value unit, Organic Carbon: value unit'. "
            f"If a parameter value is not present, use 'N/A' in place of the value and unit."
            f"Do not include any additional explanation or information. Input text: {extracted_text}."
        )


        # Generate the response based on the extracted text
        response = model.generate_content(prompt)

        # Check if the response from the API is valid
        if hasattr(response, 'text'):
            result = response.text.strip()
            logging.info(f"Analysis Result: {result}")
            return jsonify({"analysis": result})
        else:
            logging.error("No valid response text received from the AI model.")
            return jsonify({"error": "Failed to generate analysis from the AI model."}), 500

    except Exception as e:
        logging.error(f"Error during API request or processing: {e}")
        return jsonify({"error": "Failed to analyze the report. Please try again."}), 500

    finally:
        # Clean up the uploaded file securely
        try:
            if os.path.exists(file_path):
                os.remove(file_path)
                logging.info(f"Temporary file {file_path} removed.")
        except Exception as cleanup_error:
            logging.error(f"Error during file cleanup: {cleanup_error}")
