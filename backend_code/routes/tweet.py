from flask import Blueprint, redirect

daily_tweet_bp = Blueprint('daily_tweet', __name__)

@daily_tweet_bp.route('/daily_tweet', methods=['GET'])
def daily_tweet():
    twitter_url = 'https://twitter.com/'
    return redirect(twitter_url)
