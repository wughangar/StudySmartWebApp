import os

from flask import Flask
from flask_cors import CORS
from flask_mail import Mail

from backend_code.routes.auth import auth_bp
from backend_code.routes.topics import topics_bp

# Set the frontend paths relative to this script's directory
frontend_dir = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'frontend_code')
template_dir = os.path.join(frontend_dir, 'templates')
static_dir = os.path.join(frontend_dir, 'static')
js_dir = os.path.join(frontend_dir, 'js')

app = Flask(__name__, template_folder=template_dir, static_folder=static_dir)
CORS(app)

# Set authentication parameters
app.secret_key = os.urandom(24)

# set email configurations
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = 'gurulifestyle13@gmail.com'
app.config['MAIL_PASSWORD'] = 'pkxw ycgn tsbq xacn'
mail = Mail(app)


# Register blueprints
app.register_blueprint(auth_bp)
app.register_blueprint(topics_bp)

# app.register_blueprint(goals_bp)
# app.register_blueprint(summary_bp)
# app.register_blueprint(daily_tweet_bp)
# app.register_blueprint(users_bp)


if __name__ == '__main__':
    app.run(debug=True)
