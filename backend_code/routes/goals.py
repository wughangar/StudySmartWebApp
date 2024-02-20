from flask import Blueprint, jsonify, request
from backend_code.db import mydb 
from bson import ObjectId
goals_bp = Blueprint('goals', __name__)

# Route to set study goals
@goals_bp.route('/goals', methods=['POST'])
def set_goals():
    # Get user input from request
    data = request.get_json()
    username = data.get('username')
    weekly_hours = data.get('weekly_hours')
    daily_hours = data.get('daily_hours')
    topics = data.get('topics')

    # Store study goals in the database
    goals_collection = mydb["goals"]  
    goals_collection.update_one({'username': username}, {'$set': {
        'weekly_hours': weekly_hours,
        'daily_hours': daily_hours,
        'topics': topics
    }}, upsert=True)

    return jsonify({"message": "Study goals set successfully"}), 200

# Route to retrieve study goals
@goals_bp.route('/goals/<username>', methods=['GET'])
def get_goals(username):
    # Retrieve study goals from the database
    goals_collection = mydb["goals"] 
    goals = goals_collection.find_one({'username': username})

    if goals:
        # Convert ObjectId to string
        goals['_id'] = str(goals['_id'])
        return jsonify(goals), 200
    else:
        return jsonify({"message": "Study goals not found for the current week"}), 404

