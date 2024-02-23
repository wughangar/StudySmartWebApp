import os

import bcrypt
from flask import Flask, jsonify, request, session, render_template, send_from_directory

from flask_mail import Mail 

from backend_code.routes.facts import facts_bp

from backend_code.routes.goals import goals_bp
from backend_code.routes.summary import summary_bp
from backend_code.db import mydb
from backend_code.routes.tweet import daily_tweet_bp
from backend_code.routes.topics import topics_bp

# Set the frontend paths relative to this script's directory
frontend_dir = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'frontend_code')
template_dir = os.path.join(frontend_dir, 'templates')
static_dir = os.path.join(frontend_dir, 'static')
js_dir = os.path.join(frontend_dir, 'js')

app = Flask(__name__, template_folder=template_dir, static_folder=static_dir)

# Set authentication parameters
app.secret_key = os.urandom(24)
MIN_USERNAME_LENGTH = 3
MAX_USERNAME_LENGTH = 20
MIN_PASSWORD_LENGTH = 6

#set email configurations
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = 'gurulifestyle13@gmail.com'
app.config['MAIL_PASSWORD'] = 'pkxw ycgn tsbq xacn'
mail = Mail(app)


# Register blueprints
app.register_blueprint(goals_bp)
app.register_blueprint(summary_bp)
app.register_blueprint(daily_tweet_bp)
app.register_blueprint(topics_bp)

# @app.before_request
# def before_request():
#    if 'username' not in session and request.endpoint not in ['hello', 'signup', 'logout', 'login', 'goals']:
#        return jsonify({'message': 'Please login'})

users_collection = mydb["users"]


@app.route('/')
def hello():
    return render_template("index.html")


@app.route('/signup', methods=['GET'])
def signup_form():
    return render_template("signup.html")


@app.route('/learn', methods=['POST'])
def learn():
    return render_template("chat.py")


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

    # verification_token = generate_verification_token()

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


@app.route('/js/<path:filename>')
def custom_js(filename):
    return send_from_directory(js_dir, filename)


if __name__ == '__main__':
    app.run(debug=True)
