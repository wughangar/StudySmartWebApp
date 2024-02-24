from bson import json_util
from flask import Blueprint, jsonify, request

from backend_code.db import mydb
from backend_code.routes.ai_processor import ai_processor

topics_bp = Blueprint('topics_bp', __name__)


@topics_bp.route('/topics', methods=['POST'])
def set_topics():
    data = request.get_json()
    username = data['username']
    topics = data['topics']
    topics_collection = mydb['topics']
    topics_collection.update_one({'username': username}, {'$set': {'topics': topics}}, upsert=True)

    return jsonify({"message": "Topics for the week set successfully"}), 200


@topics_bp.route('/topics', methods=['GET'])
def display_topics():
    topics_collection = mydb['topics']
    topics = topics_collection.find()
    topics_list = [json_util.dumps(topic) for topic in topics]
    response_object = {"message": "Your set topics are:", "topics": topics_list}
    return jsonify(response_object)


@topics_bp.route('/topics/<topic>', methods=['GET'])
def start_lesson(topic):
    ai_response = ai_processor.initiate_conversation(topic)
    return jsonify({"message": ai_response})


@topics_bp.route('/topics/<topic>/study-guide', methods=['GET'])
def generate_study_guide(topic):
    study_guide = ai_processor.generate_study_guide(topic)
    return jsonify({"study_guide": study_guide})


@topics_bp.route('/topics/<topic>/quiz-questions', methods=['GET'])
def generate_quiz_questions(topic):
    quiz_questions = ai_processor.generate_quiz_questions(topic)
    return jsonify({"quiz_questions": quiz_questions})


@topics_bp.route('/topics/<topic>/explanation', methods=['GET'])
def explain_topic(topic):
    explanation = ai_processor.explain_topic(topic)
    return jsonify({"explanation": explanation})
