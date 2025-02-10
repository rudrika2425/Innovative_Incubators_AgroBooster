from flask import Blueprint, request, jsonify, current_app
from bson import ObjectId, errors

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
        data = current_app.db.farmers.find_one(
            {'farmerId': farmer_id}, 
            sort=[('_id', -1)]  # Newest entry based on MongoDB ObjectId
        )
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
    
@farmer_data_bp.route('/get-all-farmer-data/<string:farmer_id>', methods=['GET'])
def get_all_farmer_data(farmer_id):
    try:
        # Fetch all entries for the given farmerId, sorted by createdAt in descending order
        data = list(current_app.db.farmers.find(
            {'farmerId': farmer_id}
        ).sort('createdAt', -1))  # Sorting to get latest first

        if not data:
            return jsonify({"error": "No records found for this farmer ID"}), 404

        # Convert ObjectId to string for JSON serialization
        for entry in data:
            entry['_id'] = str(entry['_id'])

        return jsonify(data), 200
    except Exception as e:
        return jsonify({
            "error": "An error occurred while retrieving data",
            "details": str(e)
        }), 500


@farmer_data_bp.route('/farm/<farmId>', methods=['GET'])
def get_farm_by_id(farmId):
    print(farmId)
    try:
        # Query the farmers collection using current_app.db
        farm = current_app.db.farmers.find_one({"_id": ObjectId(farmId)})  # Ensure farmId is a string
        print(farm)
        if not farm:
            return jsonify({"error": "Farm not found"}), 404

        # Convert ObjectId to string for JSON serialization if necessary
        farm["_id"] = str(farm["_id"])
        
        return jsonify(farm), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    

@farmer_data_bp.route('/delete-farm/<farmId>', methods=['DELETE'])
def delete_farm(farmId):
    try:
        # Convert string farmId to ObjectId
        farm_object_id = ObjectId(farmId)
        
        # Delete the farm document from MongoDB
        result = current_app.db.farmers.delete_one({"_id": farm_object_id})
        
        if result.deleted_count == 0:
            return jsonify({"error": "Farm not found"}), 404
            
        return jsonify({
            "message": "Farm deleted successfully",
            "deleted_id": farmId
        }), 200
    except errors.InvalidId:
        return jsonify({"error": "Invalid farm ID format"}), 400
    except Exception as e:
        return jsonify({
            "error": "An error occurred while deleting the farm",
            "details": str(e)
        }), 500