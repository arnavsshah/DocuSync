from db import db

suggestions_collection = db['suggestions']

suggestions_collection.update_many({}, {'$unset': {'answer': 1, 'old_doc': 1, 'new_doc': 1}})





