import os
import logging
import time
from flask import Blueprint, request, jsonify
from werkzeug.utils import secure_filename
import google.generativeai as genai
from PIL import Image

# Configure logging
logging.basicConfig(level=logging.DEBUG)

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# Load API Key
GENAI_API_KEY = os.getenv('GENAI_API_KEY')


genai.configure(api_key=GENAI_API_KEY)

ALLOWED_EXTENSIONS = {'jpg', 'jpeg', 'png', 'gif', 'webp'}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

# Create a Blueprint
analyze_soil_report_bp = Blueprint("analyze_soil_report", __name__)

def retry_api_call(model, prompt, image, max_retries=5, base_delay=2):
    """Retries API call with exponential backoff when getting a 429 error."""
    for attempt in range(max_retries):
        try:
            response = model.generate_content([prompt, image])
            if hasattr(response, 'text'):
                return response.text.strip()
        except Exception as e:
            error_message = str(e)
            logging.error(f"API request failed: {error_message}")

            if "429" in error_message or "quota" in error_message.lower():
                if attempt < max_retries - 1:
                    delay = min(base_delay * (attempt + 1), 5)  # Max 5 sec delay
                    logging.warning(f"Quota limit hit (429). Retrying in {delay} seconds...")
                    time.sleep(delay)
                else:
                    return "Error: API quota exceeded. Try again later."
            else:
                break  # If it's a different error, don't retry

    return None

@analyze_soil_report_bp.route("/api/analyze-soil-report", methods=["POST"])
def analyze_soil_report():
    if "file" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files["file"]
    if file.filename == "":
        return jsonify({"error": "No file selected"}), 400

    if not allowed_file(file.filename):
        return jsonify({"error": "File type not allowed. Only images are supported."}), 400

    # Securely save the file
    filename = secure_filename(file.filename)
    file_path = os.path.join(UPLOAD_FOLDER, filename)
    file.save(file_path)

    try:
        # Open the image
        with Image.open(file_path) as image:
            model = genai.GenerativeModel(model_name="gemini-1.5-flash")
            prompt = (
                "Extract the values and their respective units from the following soil report for these parameters: "
                "pH, Nitrogen, Phosphorus, Potassium, Zinc, Sulfur, and Organic Carbon (or Organic Matter/Carbon). "
                "Format the response as: "
                "'pH: value unit, Nitrogen: value unit, Phosphorus: value unit, Potassium: value unit, Zinc: value unit, "
                "Sulfur: value unit, Organic Carbon: value unit'. "
                "If a parameter value is not present, use 'N/A' in place of the value and unit."
                "Do not include any additional explanation or information."
            )

            result = retry_api_call(model, prompt, image)

            if result and not result.startswith("Error"):
                logging.info(f"Analysis Result: {result}")
                return jsonify({"analysis": result})
            else:
                logging.error("Failed to generate analysis from the AI model.")
                return jsonify({"error": "AI analysis failed due to quota limits. Try again later."}), 429

    except Exception as e:
        logging.error(f"Error during processing: {e}")
        return jsonify({"error": "Failed to analyze the report. Please try again."}), 500

    finally:
        try:
            if os.path.exists(file_path):
                os.remove(file_path)
                logging.info(f"Temporary file {file_path} removed successfully.")
            else:
                logging.warning(f"File {file_path} not found for cleanup.")
        except Exception as cleanup_error:
            logging.error(f"Error during file cleanup: {cleanup_error}")
