import pymongo

myclient = pymongo.MongoClient("mongodb://localhost:27017/")

mydb = myclient["study_smart"]
