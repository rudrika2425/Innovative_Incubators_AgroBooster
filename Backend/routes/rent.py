from flask import Blueprint, request, jsonify
from models.rent_model import ToolRental
from werkzeug.utils import secure_filename
import os

tool_rental_bp = Blueprint('tool_rental', __name__)

# Route to create a new tool rental listing
@tool_rental_bp.route('/addtools', methods=['POST'])
def create_tool_rental():
    try:
   
        if request.files:
            data = request.form.to_dict()
            data['images'] = request.files.getlist('images')
        else:
            # Handle JSON data (backward compatibility)
            data = request.get_json()
        
        response = ToolRental.create_tool_rental(data)
        
        if "error" in response:
            return jsonify(response), 400
            
        return jsonify(response), 201

    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Route to get all tool rentals
@tool_rental_bp.route('/gettools', methods=['GET'])
def get_all_tools():
    try:
        tools = ToolRental.find_all_tools()
        return jsonify(tools), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Route to get tool rentals by farmer ID
@tool_rental_bp.route('/tools/farmer/<farmer_id>', methods=['GET'])
def get_tools_by_farmer(farmer_id):
    try:
        tools = ToolRental.find_tools_by_farmer(farmer_id)
        return jsonify(tools), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Route to delete a tool rental by ID
@tool_rental_bp.route('/tools/<tool_id>', methods=['DELETE'])
def delete_tool(tool_id):
    try:
        response = ToolRental.delete_tool_by_id(tool_id)
        if "error" in response:
            return jsonify(response), 404
        return jsonify(response), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# New route to update tool images
@tool_rental_bp.route('/tools/<tool_id>/images', methods=['PUT'])
def update_tool_images(tool_id):
    try:
        if not request.files:
            return jsonify({"error": "No images provided"}), 400
            
        images = request.files.getlist('images')
        
        # Validate number of images
        if len(images) > 5:
            return jsonify({"error": "Maximum 5 images allowed"}), 400
            
        response = ToolRental.update_tool_images(tool_id, images)
        
        if "error" in response:
            return jsonify(response), 400
            
        return jsonify(response), 200
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# New route to get a single tool by ID
@tool_rental_bp.route('/tools/<tool_id>', methods=['GET'])
def get_tool_by_id(tool_id):
    try:
        tool = ToolRental.find_tool_by_id(tool_id)
        if not tool:
            return jsonify({"error": "Tool not found"}), 404
        return jsonify(tool), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500