import os

import bcrypt
from flask import Flask, jsonify, request, session, render_template, send_from_directory
from routes.goals import goals_bp 
from routes.summary import  summary_bp
# from flask_mail import Mail, Message
from db import mydb
from routes.tweet import  daily_tweet_bp 

app = Flask(__name__)
app.secret_key = os.urandom(24)
MIN_USERNAME_LENGTH = 3
MAX_USERNAME_LENGTH = 20
MIN_PASSWORD_LENGTH = 6
app.register_blueprint(goals_bp)
app.register_blueprint(summary_bp)
app.register_blueprint(daily_tweet_bp)


#@app.before_request
#def before_request():
#    if 'username' not in session and request.endpoint not in ['hello', 'signup', 'logout', 'login', 'goals']:
#        return jsonify({'message': 'Please login'})

users_collection = mydb["users"]


@app.route('/')
def hello():
    return render_template("index.html")


@app.route('/signup', methods=['POST'])
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
    
    #verification_token = generate_verification_token()

    hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
    
    new_user = {"username": username,
                "password": hashed_password.decode('utf-8'),
                "email": email}  
    users_collection.insert_one(new_user)
    return jsonify({"message": "Signup successfull"}), 201


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


@app.route('/static/<path:filename>')
def custom_static(filename):
    return send_from_directory(app.static_folder, filename)




if __name__ == '__main__':
    app.run(debug=True)
