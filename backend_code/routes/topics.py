from flask import Blueprint, jsonify, request
from backend_code.db import mydb 
from openai import OpenAI
from bson import json_util 

topics_bp = Blueprint('topics_bp', __name__)

api_key = "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"


class AIProcessor:
    def __init__(self, api_key):
        self.api_key = api_key
        self.client = OpenAI(api_key=self.api_key)

    def initiate_conversation(self, topic):
        initial_message = {"role": "user", "content": f"I want to learn about {topic}"}
        response = self.client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[initial_message]
        )
        ai_response = response.choices[0].message.content
        return ai_response

    def generate_study_guide(self, topic):
        messages = [{"role": "system", "content": "You are a helpful assistant."},
                    {"role": "user", "content": f"Generate a study guide for {topic}."}]
        response = self.client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=messages
        )
        return response.choices[0].message.content

    def generate_quiz_questions(self, topic):
        messages = [{"role": "system", "content": "You are a helpful assistant."},
                    {"role": "user", "content": f"Generate quiz questions for {topic}."}]
        response = self.client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=messages
        )
        return response.choices[0].message.content  # and here

    def explain_topic(self, topic):
        messages = [{"role": "system", "content": "You are a helpful assistant."},
                    {"role": "user", "content": f"Explain {topic}."}]
        response = self.client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=messages
        )
        return response.choices[0].message.content 


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
    ai_processor = AIProcessor(api_key)
    ai_response = ai_processor.initiate_conversation(topic)
    return jsonify({"message": ai_response})

@topics_bp.route('/topics/<topic>/study-guide', methods=['GET'])
def generate_study_guide(topic):
    ai_processor = AIProcessor(api_key)
    study_guide = ai_processor.generate_study_guide(topic)
    return jsonify({"study_guide": study_guide})

@topics_bp.route('/topics/<topic>/quiz-questions', methods=['GET'])
def generate_quiz_questions(topic):
    ai_processor = AIProcessor(api_key)
    quiz_questions = ai_processor.generate_quiz_questions(topic)
    return jsonify({"quiz_questions": quiz_questions})

@topics_bp.route('/topics/<topic>/explanation', methods=['GET'])
def explain_topic(topic):
    ai_processor = AIProcessor(api_key)
    explanation = ai_processor.explain_topic(topic)
    return jsonify({"explanation": explanation})
