# /app/routes/tool_rental_routes.py
from flask import Blueprint, request, jsonify
from models.rent_model import ToolRental

tool_rental_bp = Blueprint('tool_rental', __name__)

# Route to create a new tool rental listing
@tool_rental_bp.route('/addtools', methods=['POST'])
def create_tool_rental():
    data = request.get_json()  # Receive the tool rental data from the client
    response = ToolRental.create_tool_rental(data) 
    return jsonify(response), 201  # Send back a success response

 
# Route to get all tool rentals
@tool_rental_bp.route('/gettools', methods=['GET'])
def get_all_tools():
    tools = ToolRental.find_all_tools()
    for tool in tools:
        tool['_id'] = str(tool['_id'])
    return jsonify(tools), 200  # Return all tool rentals

# Route to get tool rentals by farmer ID
@tool_rental_bp.route('/tools/farmer/<farmer_id>', methods=['GET'])
def get_tools_by_farmer(farmer_id):
    tools = ToolRental.find_tools_by_farmer(farmer_id)
    return jsonify(tools), 200  # Return tools rented by a specific farmer


# Route to delete a tool rental by ID
@tool_rental_bp.route('/tools/<tool_id>', methods=['DELETE'])
def delete_tool(tool_id):
    response = ToolRental.delete_tool_by_id(tool_id)
    if "error" in response:
        return jsonify(response), 404  # Return an error response if tool not found
    return jsonify(response), 200  # Return success response
