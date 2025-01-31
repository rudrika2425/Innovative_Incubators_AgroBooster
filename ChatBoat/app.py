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
CORS(app)  # Allow all origins (for development)
  # Adjust the origin as needed

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
    """Generate a simple and detailed prompt for analyzing plant health, based on the user's query and selected language."""

    if language == 'hi':  # Hindi
        # Main prompt for general analysis
        main_prompt = (
            "कृपया इस पौधे की छवि का विश्लेषण करें और इसके स्वास्थ्य, संभावित बीमारियों और उपचार के उपायों के बारे में सरल और स्पष्ट जानकारी दें।\n\n"
            "किसान का सवाल:\n"
            f"{user_query}\n\n"
            "उत्तर संक्षेप में दें और प्रत्येक जानकारी को एक नई पंक्ति में लिखें, बिना किसी विशेष चिह्न के।\n"
        )


        # Additional prompts for different situations (e.g., specific issues like pests, nutrition)
        if "कीट" in user_query or "कीटों" in user_query:  # If query is about pests
            additional_prompt = (
                "अगर पौधे पर कीटों का हमला हो तो उसके इलाज के लिए उपयुक्त उपायों के बारे में जानकारी दें।\n"
                "उत्तर को संक्षेप में अलग-अलग पंक्तियों में दें।"
            )
        elif "उर्वरक" in user_query or "खाद" in user_query:  # If query is about fertilizers
            additional_prompt = (
                "पौधे की बढ़वार के लिए सही उर्वरक या खाद के प्रयोग के बारे में जानकारी दें।\n"
                "उत्तर को संक्षेप में अलग-अलग पंक्तियों में दें।"
            )
        else:
            additional_prompt = ""

        return main_prompt + additional_prompt

    else:  # Default to English
        # Main prompt for general analysis
        main_prompt = (
            f"Please analyze this plant image and provide simple and clear insights on its health, potential diseases, and suggested solutions. "
            f"Farmer's question: {user_query}\n"
            "Please provide the answers in short and separate lines without any special characters."
        )

        # Additional prompts for different situations (e.g., pests, fertilizers)
        if "pest" in user_query or "insect" in user_query:  # If query is about pests
            additional_prompt = (
                "If there are pests affecting the plant, please provide the best treatment methods to address the issue.\n"
                "Please provide the answers in short and separate lines."
            )
        elif "fertilizer" in user_query or "manure" in user_query:  # If query is about fertilizers
            additional_prompt = (
                "Please suggest the right fertilizer or manure for the plant's growth and health.\n"
                "Please provide the answers in short and separate lines."
            )
        else:
            additional_prompt = ""

        return main_prompt + additional_prompt


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