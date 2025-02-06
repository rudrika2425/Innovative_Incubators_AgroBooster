from flask import current_app
import datetime
from bson import ObjectId

class ToolRental:
    @staticmethod
    def create_tool_rental(data):
        mongo = current_app.db  # Access MongoDB instance in Flask
        
        # if not mongo["users"].find_one({"_id": ObjectId(data["farmerID"])}):
        #     return {"error": "Farmer (user) not found."}
        if "farmer_id" not in data:
            return {"error": "Farmer ID is required."}
        
        # Prepare tool data
        tool_data = {
            "farmer_id":data["farmer_id"],
            "title": data["title"],
            "category": data["category"],
            "brand": data["brand"],
            "model": data["model"],
            "condition": data["condition"],
            "specs": data["specs"],
            "rate": int(data["rate"]) if data["rate"].isdigit() else 0,
            "availability": data["availability"],
            "deposit": int(data["deposit"]) if data["deposit"].isdigit() else 0,
            "address": data["address"],
            "deliveryRange": data["deliveryRange"],
            "renterName": data["renterName"],
            "contact": data["contact"],
            "district": data["district"],
            "state": data["state"],
            "terms": data["terms"],
            "images": data["images"],  # Array of image URLs
            "created_at": datetime.datetime.utcnow()
        }

        # Insert tool data into the "rentalTools" collection
        tool_id = mongo["rentalTools"].insert_one(tool_data).inserted_id

        return {"message": "Tool rental listing created successfully!", "tool_id": str(tool_id)}

    @staticmethod
    def find_tool_by_id(tool_id):
        mongo = current_app.db
        return mongo["rentalTools"].find_one({"_id": ObjectId(tool_id)})
    
    @staticmethod
    def find_tools_by_farmer(farmer_id):
        mongo = current_app.db
        tools_cursor = mongo["rentalTools"].find({"farmer_id": farmer_id})
        
        # Convert ObjectId to string for each tool in the list
        tools_list = []
        for tool in tools_cursor:
            tool["_id"] = str(tool["_id"])  # Convert ObjectId to string
            tools_list.append(tool)
        
        return tools_list
    
    @staticmethod
    def find_all_tools():
        mongo = current_app.db  # Access MongoDB instance in Flask
        tools_cursor = mongo["rentalTools"].find()
        
        # Convert ObjectId to string
        tools_list = []
        for tool in tools_cursor:
            tool["_id"] = str(tool["_id"])  # Convert ObjectId to string
            tools_list.append(tool)
        
        return tools_list

    @staticmethod
    def delete_tool_by_id(tool_id):
        mongo = current_app.db
        result = mongo["rentalTools"].delete_one({"_id": ObjectId(tool_id)})
        if result.deleted_count:
            return {"message": "Tool rental listing deleted successfully."}
        else:
            return {"error": "Tool rental listing not found."}