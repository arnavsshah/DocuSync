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






