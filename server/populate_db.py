from db import db

import uuid
import datetime

documentations_collection = db['documentation']
suggestions_collection = db['suggestions']


with open('documentations/sign_in.txt') as f:
    doc = f.read()
    documentations_collection.insert_one({'doc_id': 1, 'doc': doc})

with open('documentations/restore_data.txt') as f:
    doc = f.read()
    documentations_collection.insert_one({'doc_id': 2, 'doc': doc})

with open('documentations/cancel_workspace.txt') as f:
    doc = f.read()
    documentations_collection.insert_one({'doc_id': 3, 'doc': doc})



doc_ids = [1, 1, 2, 2, 3, 3]
questions = ['I cannot find the Inbox Button?',
            'How many security questions will I be asked in order to reset my password?',
            'How long do deleted emails stay in the Trash?',
            'Can I recover draft emails?',
            'I want to halt my subscriptions for 2 months and not permanently',
            'How will the users storage be affected on cancellation?']

for doc_id, question in zip(doc_ids, questions):
    to_insert = {
        'suggestion_id': str(uuid.uuid4()),
        'question': question,
        'date': datetime.today().replace(microsecond=0),
        'doc_id': doc_id,
        'pending': True
    }

    suggestions_collection.insert_one(to_insert)