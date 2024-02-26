import pymongo
from bson import ObjectId

myclient = pymongo.MongoClient("mongodb://localhost:27017/")

mydb = myclient["study_smart"]

users_collection = mydb["users"]
topics_collection = mydb['topics']


def store_study_guide(topic_id, study_guide_data):
    topics_collection.update_one({"_id": ObjectId(topic_id)},
                                 {"$set": {"study_guide": study_guide_data}})


def store_study_guide_chapter_body(topic_id, chapter_index, text_body):
    topics_collection.update_one({"_id": ObjectId(topic_id)},
                                 {"$set": {f"study_guide.chapters.{chapter_index - 1}.body": text_body}})


def push_quiz_questions(topic_id, quiz_questions, chapter_index=None):
    if chapter_index is not None:
        topics_collection.update_one({"_id": ObjectId(topic_id)},
                                     {"$push": {
                                         f"study_guide.chapters.{chapter_index}.quiz_questions": {"$each":
                                                                                                      quiz_questions}}})
    else:
        topics_collection.update_one({"_id": ObjectId(topic_id)},
                                     {"$push": {"quiz_questions": {"$each": quiz_questions}}})


def push_topic_qa(topic_id, qa, chapter_index=None):
    if chapter_index is not None:
        topics_collection.update_one({"_id": ObjectId(topic_id)},
                                     {"$push": {
                                         f"study_guide.chapters.{chapter_index}.qa_questions": qa}})
    else:
        topics_collection.update_one({"_id": ObjectId(topic_id)},
                                     {"$push": {
                                         f"qa_questions": qa}})
