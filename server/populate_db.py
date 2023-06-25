from db import db
from config import OPENAI_API_KEY

import uuid
from datetime import datetime

import openai

openai.api_key = OPENAI_API_KEY


documentations_collection = db['documentation']
suggestions_collection = db['suggestions']

init_prompt = "Generate markdown code for the following text. Do not change any text or add any images. "

with open('documentations/sign_in.txt') as f:
    doc = f.read()
    prompt = init_prompt + doc

    conversation = [{"role": "user", "content": prompt}]
    markdown_doc = openai.ChatCompletion.create(model="gpt-3.5-turbo", messages=conversation).choices[0].message.content

    documentations_collection.insert_one({'doc_id': 1, 'doc': markdown_doc})

with open('documentations/restore_data.txt') as f:
    doc = f.read()
    prompt = init_prompt + doc
    conversation = [{"role": "user", "content": prompt}]
    markdown_doc = openai.ChatCompletion.create(model="gpt-3.5-turbo", messages=conversation).choices[0].message.content

    documentations_collection.insert_one({'doc_id': 2, 'doc': markdown_doc})

with open('documentations/cancel_workspace.txt') as f:
    doc = f.read()
    prompt = init_prompt + doc
    conversation = [{"role": "user", "content": prompt}]
    markdown_doc = openai.ChatCompletion.create(model="gpt-3.5-turbo", messages=conversation).choices[0].message.content

    documentations_collection.insert_one({'doc_id': 3, 'doc': markdown_doc})



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
        'date': datetime.today().replace(microsecond=0),
        'doc_id': doc_id,
        'pending': True
    }

    suggestions_collection.insert_one(to_insert)





