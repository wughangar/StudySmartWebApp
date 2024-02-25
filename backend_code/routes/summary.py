from flask import Blueprint, jsonify, request
from backend_code.db import mydb


summary_bp = Blueprint('summary', __name__)

MAX_SUMMARY_WORDS = 400


@summary_bp.route('/summary', methods=['POST'])
def save_summary():
    data = request.get_json()
    username = data.get('username')
    topic = data.get('topic')
    user_summary = data.get('summary')

    word_count = len(user_summary.split())
    if word_count > MAX_SUMMARY_WORDS:
        return jsonify({'message': f"Summary exceeds the maximum word limit of {MAX_SUMMARY_WORDS} words"}), 400

    summary_collection = mydb["summary"]
    summary_collection.insert_one({
        "username": username,
        "topic": topic,
        "summary": user_summary
    })
    return jsonify({"message": "Summary saved successfully"}), 200


@summary_bp.route('/summary/<topic>', methods=['GET'])
def get_summary(topic):
    # Retrieve the summary for the specified topic
    summary_collection = mydb["summary"]
    summary = summary_collection.find_one({'topic': topic})

    if summary:
        return jsonify({"topic": topic, "summary": summary['summary']}), 200
    else:
        return jsonify({"message": "Summary not found"}), 404

@summary_bp.route('/summary', methods=['GET'])
def get_all_summaries():
    summary_collection = mydb["summary"]
    summaries = summary_collection.find()
    summary_list = []
    for summary in summaries:
        summary_list.append({
            "topic": summary['topic'],
            "summary": summary['summary']
        })

    grouped_summaries = {}
    for entry in summary_list:
        topic = entry['topic']
        if topic in grouped_summaries:
            grouped_summaries[topic].append(entry['summary'])
        else:
            grouped_summaries[topic] = [entry['summary']]

    return jsonify(grouped_summaries), 200
