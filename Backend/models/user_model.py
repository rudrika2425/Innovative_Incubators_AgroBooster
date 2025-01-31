from flask_pymongo import PyMongo
from werkzeug.security import generate_password_hash, check_password_hash

mongo = PyMongo()

class User:
    @staticmethod
    def create_user(fullname, phone_number, password):
        if mongo.db.users.find_one({"phone_number": phone_number}):
            return {"error": "Phone number already registered"}

        hashed_password = generate_password_hash(password)
        user_id = mongo.db.users.insert_one({
            "fullname": fullname,
            "phone_number": phone_number,
            "password": hashed_password
        }).inserted_id

        return {"message": "User signed up successfully!", "user_id": str(user_id)}

    @staticmethod
    def find_by_phone(phone_number):
        return mongo.db.users.find_one({"phone_number": phone_number})

    @staticmethod
    def verify_password(stored_password, input_password):
        return check_password_hash(stored_password, input_password)
