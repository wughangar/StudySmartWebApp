from flask import Flask, jsonify, request, session
from db import mydb
import bcrypt
import os


app = Flask(__name__)
app.secret_key = os.urandom(24)

@app.before_request
def before_request():
    if 'username' not in session and request.endpoint not in ['hello', 'signup', 'logout', 'login']:
        return jsonify({'message': 'Please login'})

users_collection = mydb["users"]


@app.route('/', methods=['POST'])
def hello():
    return "Building first web-application!!"


@app.route('/signup', methods=['POST'])
def signup():
    user_data = request.get_json()
    username = user_data.get("username")
    password = user_data.get("password")

   
    existing_user = users_collection.find_one({"username": username})
    if existing_user:
        return jsonify({"message": "Username already exists"}), 400

    hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
    
    new_user = {"username": username,
                "password": hashed_password.decode('utf-8')}  
    users_collection.insert_one(new_user)
    return jsonify({"message": "Signup successful"}), 201


@app.route('/login', methods=['POST'])
def login():
    user_data = request.get_json()
    username = user_data.get("username")
    password = user_data.get("password")

    user = users_collection.find_one({'username': username})
    if user:
        hashed_password = user["password"]
        
        if bcrypt.checkpw(password.encode('utf-8'), hashed_password.encode('utf-8')):
            session["username"] = username
            return jsonify({"message": "login successful"}), 200
        else:
            return jsonify({"message": "invalid credentials"}), 401
    else:
        return jsonify({"message": "invalid credentials"}), 401

@app.route('/logout', methods=['POST'])
def logout():
    session.pop("username", None)
    return jsonify({"message": "logout successful"}), 200
    




if __name__ == '__main__':
    app.run(host='0.0.0', port=5000, debug=True)
