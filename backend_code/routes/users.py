from bson import ObjectId
from flask import Blueprint, jsonify, request

from backend_code.db import mydb

users_bp = Blueprint('users', __name__)

users_collection = mydb["users"]


@users_bp.route('/users', methods=['POST'])
def add_user():
    data = request.get_json()
    user_id = users_collection.insert_one(data).inserted_id
    return jsonify(str(user_id)), 201


@users_bp.route('/users/<id>', methods=['GET'])
def get_user(id):
    user = users_collection.find_one({"_id": ObjectId(id)})
    if user:
        user['_id'] = str(user['_id'])
        return jsonify(user), 200
    else:
        return jsonify({'error': 'User not found'}), 404


@users_bp.route('/users/<id>', methods=['PUT'])
def update_user(id):
    data = request.get_json()
    print("data: ", data)
    result = users_collection.update_one({"_id": ObjectId(id)}, {"$set": data})
    return jsonify({"message": "User updated",
                    'matched': result.matched_count}), 200


@users_bp.route('/users/<id>', methods=['DELETE'])
def delete_user(id):
    users_collection.delete_one({"_id": ObjectId(id)})
    return jsonify({"message": "User deleted"}), 200
