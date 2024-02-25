import bcrypt
from flask import Blueprint, request, jsonify, session

from backend_code.config import MIN_USERNAME_LENGTH, MIN_PASSWORD_LENGTH
from backend_code.db import users_collection

auth_bp = Blueprint('auth', __name__)


@auth_bp.route('/signup', methods=['POST'])
def signup():
    user_data = request.get_json()
    username = user_data.get("username")
    password = user_data.get("password")
    email = user_data.get("email")

    if len(username) <= MIN_USERNAME_LENGTH:
        return jsonify({'message': f'Username should be more than {MIN_USERNAME_LENGTH} characters.'}), 400

    if len(password) <= MIN_PASSWORD_LENGTH:
        return jsonify({"message": f"Password should be more than {MIN_PASSWORD_LENGTH} characters."}), 400

    if '@' not in email or '.' not in email:
        return jsonify({"message": "Invalid email address."}), 400

    existing_user = users_collection.find_one({"username": username})

    if existing_user:
        return jsonify({"message": "Username already exists"}), 400

    hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

    new_user = {
        "username": username,
        "password": hashed_password.decode('utf-8'),
        "email": email
    }

    result = users_collection.insert_one(new_user)
    new_user_id = result.inserted_id

    return jsonify({
        "message": "Signup successful",
        "user": {
            "_id": str(new_user_id),
            "username": username
        }
    }), 201


@auth_bp.route('/login', methods=['POST'])
def login():
    user_data = request.get_json()
    username = user_data.get("username")
    password = user_data.get("password")

    user = users_collection.find_one({'username': username})
    if user:
        hashed_password = user["password"]

        if bcrypt.checkpw(password.encode('utf-8'), hashed_password.encode('utf-8')):
            session["username"] = username

            user['_id'] = str(user['_id'])
            user.pop("password")
            return jsonify({"message": "login successful", 'user': user}), 200
        else:
            return jsonify({"message": "invalid credentials"}), 401
    else:
        return jsonify({"message": "invalid credentials"}), 401


@auth_bp.route('/logout', methods=['POST'])
def logout():
    return jsonify({"message": "logout successful"}), 200
