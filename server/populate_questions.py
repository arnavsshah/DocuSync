from db import db
from config import OPENAI_API_KEY

import uuid
from datetime import datetime

import openai

openai.api_key = OPENAI_API_KEY


suggestions_collection = db['suggestions']


doc_ids = [1, 1, 2, 3, 3]
questions = ['I cannot find the Inbox Button?',
            'How many security questions will I be asked in order to reset my password?',
            'How long do deleted emails stay in the Trash?',
            'I canceled my google workplace subscription but do not have access to Google Ads.',
            'How will the users storage be affected on cancellation?']

for doc_id, question in zip(doc_ids, questions):
    to_insert = {
        'suggestion_id': str(uuid.uuid4()),
        'question': question,
        'date': datetime.today(),
        'doc_id': doc_id,
        'pending': True
    }

    suggestions_collection.insert_one(to_insert)





