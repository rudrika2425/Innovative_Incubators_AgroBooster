from flask import Blueprint, request, jsonify, current_app
from datetime import datetime

# Create a blueprint for contact data routes
contact_bp = Blueprint('contact_bp', __name__)

@contact_bp.route('/submit-contact-data', methods=['POST'])
def submit_contact_data():
    # Retrieve JSON data from the request
    data = request.get_json()
    if not data:
        return jsonify({"error": "No data provided"}), 400

    # Extract relevant data fields
    full_name = data.get("fullName")
    phone_number = data.get("phoneNumber")
    message = data.get("message")
    
    # Ensure all required fields are provided
    if not full_name or not phone_number or not message:
        return jsonify({"error": "Missing required fields"}), 400

    # Create a contact data object to insert into MongoDB
    contact_data = {
        "full_name": full_name,
        "phone_number": phone_number,
        "message": message,
        "submitted_at": datetime.utcnow()
    }

    try:
        # Insert the data into the 'contacts' collection in MongoDB
        result = current_app.db.contacts.insert_one(contact_data)
        return jsonify({
            "message": "Message submitted successfully",
            "id": str(result.inserted_id)
        }), 201
    except Exception as e:
        return jsonify({
            "error": "An error occurred while inserting data",
            "details": str(e)
        }), 500
