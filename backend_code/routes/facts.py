import requests
from flask_mail import Mail, Message
from apscheduler.schedulers.background import BackgroundScheduler
from backend_code.db import mydb
#from backend_code.app import app
from flask import Blueprint 

facts_bp = Blueprint('facts', __name__)


def fetch_quote():
    url = "https://api.quotable.io/quotes/random"
    try: 
        response = requests.get(url)
        data = response.json()
        if isinstance(data, dict):
            return data['content']
        elif isinstance(data, list):
            return data[0]['content']
    except Exception as e: 
        print(f"Error fetching quote: {e}")
        return None


def send_reminder_email():
    with app.app_context():
        quote = fetch_quote()
        if quote:
            users_collection = mydb["users"]
            users = users_collection.find({}, {"email": 1}) 
            for user in users:
                email = user.get("email")
                if email:
                    msg = Message('Daily Study Quote', recipients=[email])
                    msg.body = f'Your daily study quote: "{quote}"'
                    Mail.send(msg)
        else:
            print("Failed to fetch quote, reminder email not sent")

scheduler = BackgroundScheduler()
scheduler.add_job(send_reminder_email, 'cron', hour=9)
scheduler.start()
