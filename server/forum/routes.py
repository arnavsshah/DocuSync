from flask import request, redirect, url_for

from forum import bp
from db import db
from config import OPENAI_API_KEY

import openai
from datetime import datetime

openai.api_key = OPENAI_API_KEY


@bp.route('/', methods=['GET'])
def get_questions_and_answers():

    cursor = db['suggestions'].find().sort('date', -1)

    data = []
    for obj in cursor:
        data.append({"question": obj["question"], "answer": obj["answer"]})

    return data


@bp.route('/', methods=['POST'])
def post_questions_and_answers():

    suggestions_collection = db["suggestions"]

    init_prompt = "This is the text which I would like you to update: "
    question_prefix = 'The question is: '
    answer_prefix = 'The answer is: '
    final_prompt = 'Update my document with this information and return the whole text'

    with open('documentations/gmail_password_reset.txt', 'r') as f:
        doc = f.read()

    question = request.form.get('question')
    answer = request.form.get('answer')

    prompt = init_prompt + doc + question_prefix + question + answer_prefix + answer + final_prompt


    conversation = [{"role": "user", "content": prompt}]
    new_doc = openai.ChatCompletion.create(model="gpt-3.5-turbo", messages=conversation).choices[0].message.content

    to_insert = {
        'question': request.form.get('question'),
        'answer': request.form.get('answer'),
        'old_doc': doc,
        'new_doc': new_doc,
        'date': datetime.today().replace(microsecond=0)
    }
    
    suggestions_collection.insert_one(to_insert)

    return redirect('/forum')
