from flask import Flask, jsonify, request
from flask_cors import CORS
from pymongo import MongoClient
from bson import ObjectId
from datetime import datetime

class CalendarModel:
    def craete_crop_schedule(farm_id, tasks, phonenum):
        crop_schedule = {
            "farmId": farm_id,
            "tasks": [
                {
                    "title": task["title"],
                    "description": task["description"],
                    "start_date": datetime.strptime(task["start_date"], "%Y-%m-%d"),
                    "end_date": datetime.strptime(task["end_date"], "%Y-%m-%d"),
                    "task_description": task["task_description"],
                    "sustainable_resource": task["sustainable_resource"]
                }
                for task in tasks
            ],
            "phonenum": phonenum,  # Added missing comma here
            "created_at": datetime.utcnow()
        }
        result = mongo["crop_schedules"].insert_one(crop_schedule)
        return str(result.inserted_id)