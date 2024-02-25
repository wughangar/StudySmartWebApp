import pymongo
from bson import ObjectId

myclient = pymongo.MongoClient("mongodb://localhost:27017/")

mydb = myclient["study_smart"]

users_collection = mydb["users"]
topics_collection = mydb['topics']


def store_study_guide(study_guide_data, topic_id):
    study_guide_data['text'] = None
    topics_collection.update_one({"_id": ObjectId(topic_id)}, {"$set": {"study_guide": study_guide_data}})


def store_quiz_questions(quiz_questions, topic_id):
    topics_collection.update_one({"_id": ObjectId(topic_id)}, {"$push": {"quiz_questions": {"$each": quiz_questions}}})
