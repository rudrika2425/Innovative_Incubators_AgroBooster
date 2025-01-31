import os
import logging
from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.utils import secure_filename
import google.generativeai as genai
from dotenv import load_dotenv  # Import the load_dotenv function

# Load environment variables from .env file
load_dotenv()
# Configure logging
logging.basicConfig(level=logging.DEBUG)

# Flask app setup
app = Flask(__name__)
CORS(app, origins=["http://localhost:5173"])  # Adjust the origin as needed

# Configuration
UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# Load API Key from environment variable
GENAI_API_KEY = os.getenv('GOOGLE_API_KEY')  # Ensure your API key is set in the environment
if not GENAI_API_KEY:
    logging.error("No API_KEY found. Please set the GOOGLE_API_KEY environment variable.")
    raise ValueError("No API_KEY found. Please set the GOOGLE_API_KEY environment variable.")

genai.configure(api_key=GENAI_API_KEY)

ALLOWED_EXTENSIONS = {'jpg', 'jpeg', 'png', 'gif', 'webp'}

def allowed_file(filename):
    """Check if the uploaded file is in an allowed format."""
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def generate_prompt(user_query, language):
    """Generate a structured prompt for plant health analysis with numbered, concise responses."""

    if language == 'hi':  # Hindi
        base_prompt = (
           "पौधे की छवि का विश्लेषण करें और निम्न प्रारूप में उत्तर दें बिना किसी अतिरिक्त जानकारी और विशेष वर्णों के:\n"
            "1. वर्तमान स्वास्थ्य स्थिति: पौधे के स्वास्थ्य का विस्तृत विवरण\n"
            "2. संभावित बीमारियां या समस्याएं: किसी भी संभावित स्वास्थ्य जोखिम का वर्णन\n"
            "3. तत्काल उपचार सिफारिशें: तुरंत की जाने वाली कार्रवाई\n"
            "4. दीर्घकालिक देखभाल सुझाव: भविष्य में पौधे की देखभाल के लिए मार्गदर्शन\n"
            "\n"
            f"किसान का सवाल: {user_query}\n"
            "उत्तर स्पष्ट, संक्षिप्त और सटीक होने चाहिए।"
        )

        if "कीट" in user_query or "कीटों" in user_query:
            base_prompt += "\n कीट नियंत्रण पर विशेष ध्यान दें।"
        elif "उर्वरक" in user_query or "खाद" in user_query:
            base_prompt += "\n पोषण और उर्वरक की आवश्यकताओं पर ध्यान दें।"

        return base_prompt

    else:  # Default to English
        base_prompt = (
            "Analyze the plant image and respond in the following format without any extra information and special character:\n"
            "1. Current health status: Detailed description of the plant's health\n"
            "2. Potential diseases or issues: Description of any potential health risks\n"
            "3. Immediate treatment recommendations: Actions to take immediately\n"
            "4. Long-term care suggestions: Guidance for future plant care\n"
            "\n"
            f"Farmer's specific query: {user_query}\n"
            "Responses must be clear, concise, and precise."
        )

        if "pest" in user_query or "insect" in user_query:
            base_prompt += "\n Focus specifically on pest control methods."
        elif "fertilizer" in user_query or "manure" in user_query:
            base_prompt += "\n Focus specifically on nutritional needs and fertilization."

        return base_prompt



@app.route('/upload', methods=['POST'])
def upload_file():
    """Handle file uploads and return analysis results."""
    if "file" not in request.files:
        return jsonify({"error": "No file uploaded."}), 400

    file = request.files["file"]
    if file.filename == "":
        return jsonify({"error": "No file selected."}), 400

    if not allowed_file(file.filename):
        return jsonify({"error": "File type not allowed. Only images are supported."}), 400

    # Securely save the file
    filename = secure_filename(file.filename)
    file_path = os.path.join(UPLOAD_FOLDER, filename)
    file.save(file_path)

    logging.info(f"File saved at: {file_path}")

    try:
        # Prepare the prompt based on user query and selected language
        user_query = request.form.get('query', 'general')  # Get the user's query
        language = request.form.get('language', 'en')  # Get the user's selected language
        prompt = generate_prompt(user_query, language)

        # Upload the file to the Gemini AI API
        sample_file = genai.upload_file(file_path)

        # Create the model instance
        model = genai.GenerativeModel("gemini-1.5-flash")

        # Call the API with the prompt and the uploaded file
        response = model.generate_content([prompt, sample_file])

        if response and hasattr(response, 'text'):
            logging.info(f"Analysis Result: {response.text}")
            return jsonify({"analysis": response.text}), 200
        else:
            logging.error("Failed to generate analysis from the AI model.")
            return jsonify({"error": "AI analysis failed. Try again later."}), 429

    except Exception as e:
        logging.error(f"Error during processing: {e}")
        return jsonify({"error": "Failed to analyze the image. Please try again."}), 500

    finally:
        # Clean up the uploaded file
        try:
            if os.path.exists(file_path):
                os.remove(file_path)
                logging.info(f"Temporary file {file_path} removed successfully.")
            else:
                logging.warning(f"File {file_path} not found for cleanup.")
        except Exception as cleanup_error:
            logging.error(f"Error during file cleanup: {cleanup_error}")

@app.route('/chat', methods=['POST'])
def chat():
    """Simple chatbot for general farming queries."""
    data = request.json
    user_message = data.get('message', '').lower()
    language = data.get('language', 'en')  # Get the user's selected language

    # Define responses based on user input
    if "help" in user_message:
        response = (
            "Upload an image of your plant, and I will analyze its health, detect diseases, and suggest solutions."
            if language == 'en' else
            "अपने पौधे की एक छवि अपलोड करें, और मैं इसकी सेहत का विश्लेषण करूंगा, बीमारियों का पता लगाऊंगा, और समाधान सुझाऊंगा।"
        )
    elif "how to grow" in user_message:
        response = (
            "Ensure your plant gets enough sunlight, water, and nutrients. Upload an image for detailed advice."
            if language == 'en' else
            "सुनिश्चित करें कि आपके पौधे को पर्याप्त धूप, पानी और पोषक तत्व मिलते हैं। विस्तृत सलाह के लिए एक छवि अपलोड करें।"
        )
    else:
        response = (
            "I'm here to assist! Upload an image or ask a farming-related question."
            if language == 'en' else
            "मैं मदद करने के लिए यहाँ हूँ! एक छवि अपलोड करें या कृषि से संबंधित प्रश्न पूछें।"
        )

    return jsonify({"response": response}), 200

if __name__ == '__main__':
    app.run(debug=True)