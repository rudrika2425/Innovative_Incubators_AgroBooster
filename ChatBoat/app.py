from flask import Flask, request, jsonify
from werkzeug.utils import secure_filename
import os
from models.disease_model import analyze_image  
from utils.translate import translate_text  
from utils.file_utils import allowed_file  
from flask_cors import CORS  


app = Flask(__name__)
CORS(app, origins=["http://localhost:5173"])  

app.config['UPLOAD_FOLDER'] = 'uploads'
app.config['ALLOWED_EXTENSIONS'] = {'png', 'jpg', 'jpeg'}

if not os.path.exists(app.config['UPLOAD_FOLDER']):
    os.makedirs(app.config['UPLOAD_FOLDER'])

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        print("No file found in request")
        return jsonify({"error": "No file uploaded."}), 400
    
    file = request.files['file']
    if file.filename == '':
        print("No file selected")
        return jsonify({"error": "No file selected."}), 400

    if file and allowed_file(file.filename, app.config['ALLOWED_EXTENSIONS']):
        print(f"File received: {file.filename}")
        filename = secure_filename(file.filename)
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(file_path)

       
        try:
            result = analyze_image(file_path)
            result['confidence'] = int(result['confidence'])
            return jsonify({"result": result}), 200
        except Exception as e:
            print(f"Error processing image: {str(e)}")
            return jsonify({"error": f"Error processing the image: {str(e)}"}), 500
    
    print("Invalid file format")
    return jsonify({"error": "Invalid file format."}), 400



@app.route('/chat', methods=['POST'])
def chat():
    data = request.json
    user_message = data.get('message', '').lower()
    lang = data.get('language', 'en')

   
    if "help" in user_message:
        response = "Upload an image of your plant, and I'll detect diseases and suggest solutions."
    elif "how to grow" in user_message:
        response = "Ensure adequate sunlight and water. Upload an image for detailed advice."
    else:
        response = "I'm here to assist. Upload an image or ask a question!"

    try:
        translated_response = translate_text(response, lang)
        return jsonify({"response": translated_response}), 200
    except Exception as e:
        return jsonify({"error": "Error during translation."}), 500

if __name__ == '__main__':
    app.run(debug=True)
