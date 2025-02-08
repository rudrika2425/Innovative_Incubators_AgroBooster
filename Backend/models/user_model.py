from werkzeug.security import generate_password_hash, check_password_hash
from flask import current_app

class User:
    @staticmethod
    def create_user(fullname, phone_number, password,islogin=False):
        mongo = current_app.db  # ✅ Correct way to access PyMongo in Flask

        if mongo["users"].find_one({"phone_number": phone_number}):
            return {"error": "Phone number already registered"}

        hashed_password = generate_password_hash(password)
        user_id = mongo["users"].insert_one({
            "fullname": fullname,
            "phone_number": phone_number,
            "password": hashed_password,
            "isFirstLogin": True 
        }).inserted_id

        return {"message": "User signed up successfully!", "user_id": str(user_id)}

    @staticmethod
    def find_by_phone(phone_number):
        mongo = current_app.db  # ✅ Fix here too
        return mongo["users"].find_one({"phone_number": phone_number})

    @staticmethod
    def verify_password(stored_password, input_password):
        return check_password_hash(stored_password, input_password)
