from bson import ObjectId
from flask import Blueprint, jsonify, request

from backend_code.ai.ai_processor import ai_processor
from backend_code.common.common import fix_mongodb_record_for_jsonify
from backend_code.db import topics_collection, store_study_guide, store_quiz_questions, store_study_guide_chapter_body

topics_bp = Blueprint('topics_bp', __name__)


@topics_bp.route('/topics', methods=['POST'])
def insert_topic():
    data = request.get_json()
    topic = data
    topic['study_guide'] = None
    topic['quiz_questions'] = []
    topic['qa_questions'] = []

    try:
        result = topics_collection.insert_one(topic)
    except Exception as e:
        return jsonify({'error': f'Failed to insert topic: {e}'}), 500

    result = topics_collection.find_one({'_id': result.inserted_id})

    return jsonify({'topic': fix_mongodb_record_for_jsonify(result)}), 200


@topics_bp.route('/topics/by_user', methods=['POST'])
def get_topics_by_userid():
    data = request.get_json()
    userid = data['userid']
    topics = list(topics_collection.find({'userid': userid}))

    result = list(map(lambda x: fix_mongodb_record_for_jsonify(x), topics))
    return jsonify({"topics": result}), 200


@topics_bp.route('/topics/generate_summary', methods=['POST'])
def generate_topic_summary():
    data = request.get_json()
    topic_title = data['topic_title']

    result = ai_processor.generate_summary(topic_title)

    print(f"AI Result:\n\"{result}\"")
    return jsonify({"summary": result}), 200


@topics_bp.route('/topics/generate_study_guide', methods=['POST'])
def generate_study_guide():
    data = request.get_json()
    topic_id = data['topic_id']

    try:
        topic_data = topics_collection.find_one({'_id': ObjectId(topic_id)})
        study_guide_data = ai_processor.generate_study_guide(topic_data)
        store_study_guide(study_guide_data, topic_id)

        topic_data = topics_collection.find_one({'_id': ObjectId(topic_id)})
        return jsonify({'topic': fix_mongodb_record_for_jsonify(topic_data)})
    except Exception as e:
        print("Unable to find topic: ", topic_id)
        print("Exception: ", e)

        return jsonify({'error': 'topic not found'}), 404


@topics_bp.route('/topics/generate_quiz', methods=['POST'])
def generate_quiz_questions():
    data = request.get_json()
    topic_id = data['topic_id']

    try:
        topic = topics_collection.find_one({'_id': ObjectId(topic_id)})
        quiz_questions = ai_processor.generate_quiz_questions(topic)

        store_quiz_questions(quiz_questions, topic_id)

        topic_data = topics_collection.find_one({'_id': ObjectId(topic_id)})
        return jsonify({'topic': fix_mongodb_record_for_jsonify(topic_data)})
    except Exception as e:
        print("Unable to find topic: ", topic_id)
        print("Exception: ", e)
        return jsonify({'error': 'topic not found'}), 404


@topics_bp.route('/topics/generate_study_guide_chapter', methods=['POST'])
def generate_quiz_question_chapter():
    data = request.get_json()
    topic_id = data['topic_id']
    chapter_index = data['chapter_index']

    try:
        topic = topics_collection.find_one({'_id': ObjectId(topic_id)})

        body = ai_processor.generate_study_guide_chapter(topic, chapter_index-1)

        store_study_guide_chapter_body(topic_id, chapter_index, body)
        
        topic = topics_collection.find_one({'_id': ObjectId(topic_id)})
        return jsonify({'topic': fix_mongodb_record_for_jsonify(topic)})
    except Exception as e:
        print("Unable to find topic: ", topic_id)
        print("Exception: ", e)
        return jsonify({'error': 'topic not found'}), 404
