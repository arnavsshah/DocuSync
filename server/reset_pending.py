from db import db

suggestions_collection = db['suggestions']

suggestions_collection.update_many({'pending': False}, {'$set': {'pending': True}})





