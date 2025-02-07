from flask import current_app
import datetime
from bson import ObjectId
import cloudinary.uploader
from werkzeug.datastructures import FileStorage


class ToolRental:
    @staticmethod
    def create_tool_rental(data):
        mongo = current_app.db  # Access MongoDB instance in Flask
        
        try:
            # Handle image uploads if present
            image_urls = []
            if 'images' in data and isinstance(data['images'], list):
                for image in data['images']:
                    if isinstance(image, FileStorage):
                        # Upload to Cloudinary
                        upload_result = cloudinary.uploader.upload(image)
                        image_urls.append(upload_result['secure_url'])

            # Prepare tool data
            tool_data = {
                "farmer_id": data["farmer_id"],
                "title": data["title"],
                "category": data["category"],
                "brand": data["brand"],
                "model": data["model"],
                "condition": data["condition"],
                "specs": data["specs"],
                "rate": int(data["rate"]) if str(data["rate"]).isdigit() else 0,
                "availability": data["availability"],
                "deposit": int(data["deposit"]) if str(data.get("deposit", "0")).isdigit() else 0,
                "address": data.get("address", ""),
                "deliveryRange": data.get("deliveryRange", ""),
                "renterName": data["renterName"],
                "contact": data["contact"],
                "district": data["district"],
                "state": data["state"],
                "terms": data["terms"],
                "images": image_urls,  # Store Cloudinary URLs
                "created_at": datetime.datetime.utcnow()
            }

            # Insert tool data into the "rentalTools" collection
            tool_id = mongo["rentalTools"].insert_one(tool_data).inserted_id
            
            return {"message": "Tool rental listing created successfully!", "tool_id": str(tool_id)}
        
        except Exception as e:
            return {"error": f"Error creating tool rental: {str(e)}"}

    @staticmethod
    def find_tool_by_id(tool_id):
        mongo = current_app.db
        tool = mongo["rentalTools"].find_one({"_id": ObjectId(tool_id)})
        if tool:
            tool["_id"] = str(tool["_id"])
        return tool

    @staticmethod
    def find_tools_by_farmer(farmer_id):
        mongo = current_app.db
        tools_cursor = mongo["rentalTools"].find({"farmer_id": farmer_id})
        
        # Convert ObjectId to string for each tool in the list
        tools_list = []
        for tool in tools_cursor:
            tool["_id"] = str(tool["_id"])
            tools_list.append(tool)
        
        return tools_list

    @staticmethod
    def find_all_tools():
        mongo = current_app.db
        tools_cursor = mongo["rentalTools"].find()
        
        # Convert ObjectId to string
        tools_list = []
        for tool in tools_cursor:
            tool["_id"] = str(tool["_id"])
            tools_list.append(tool)
        
        return tools_list

    @staticmethod
    def delete_tool_by_id(tool_id):
        mongo = current_app.db
        
        try:
            
            tool = mongo["rentalTools"].find_one({"_id": ObjectId(tool_id)})
            
            if not tool:
                return {"error": "Tool rental listing not found."}
            
            # Delete images from Cloudinary
            for image_url in tool.get("images", []):
                try:
                    # Extract public_id from Cloudinary URL
                    public_id = image_url.split('/')[-1].split('.')[0]
                    cloudinary.uploader.destroy(public_id)
                except Exception as e:
                    print(f"Error deleting image from Cloudinary: {str(e)}")
            
            # Delete the tool document
            result = mongo["rentalTools"].delete_one({"_id": ObjectId(tool_id)})
            
            if result.deleted_count:
                return {"message": "Tool rental listing and associated images deleted successfully."}
            else:
                return {"error": "Tool rental listing not found."}
                
        except Exception as e:
            return {"error": f"Error deleting tool rental: {str(e)}"}

    @staticmethod
    def update_tool_images(tool_id, new_images):
        """
        Update tool images - useful for adding/removing images after creation
        """
        mongo = current_app.db
        
        try:
            image_urls = []
            for image in new_images:
                if isinstance(image, FileStorage):
                    upload_result = cloudinary.uploader.upload(image)
                    image_urls.append(upload_result['secure_url'])
            
            result = mongo["rentalTools"].update_one(
                {"_id": ObjectId(tool_id)},
                {"$set": {"images": image_urls}}
            )
            
            if result.modified_count:
                return {"message": "Tool images updated successfully."}
            else:
                return {"error": "Tool rental listing not found or no changes made."}
                
        except Exception as e:
            return {"error": f"Error updating tool images: {str(e)}"}