from flask import Blueprint, request, jsonify, current_app

# Create a blueprint for farmer data routes
farmer_data_bp = Blueprint('farmer_data_bp', __name__)

@farmer_data_bp.route('/save-farmer-data', methods=['POST'])
def save_farmer_data():
    # Retrieve JSON data from the request
    data = request.get_json()
    if not data:
        return jsonify({"error": "No data provided"}), 400

    try:
        # Insert the data into the 'farmers' collection in MongoDB
        result = current_app.db.farmers.insert_one(data)
        return jsonify({
            "message": "Data inserted successfully",
            "id": str(result.inserted_id)
        }), 201
    except Exception as e:
        return jsonify({
            "error": "An error occurred while inserting data",
            "details": str(e)
        }), 500
    
@farmer_data_bp.route('/get-farmer-data/<string:farmer_id>', methods=['GET'])
def get_farmer_data(farmer_id):
    try:
        # Query the 'farmers' collection using the provided farmerId
        data = current_app.db.farmers.find_one({'farmerId': farmer_id})
        if not data:
            return jsonify({"error": "Farmer data not found"}), 404

        # Convert ObjectId to string for JSON serialization
        data['_id'] = str(data['_id'])
        return jsonify(data), 200
    except Exception as e:
        return jsonify({
            "error": "An error occurred while retrieving data",
            "details": str(e)
        }), 500
