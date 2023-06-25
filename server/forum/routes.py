from flask import request, redirect
from flask_cors import cross_origin

from forum import bp
from db import db
from config import OPENAI_API_KEY

import openai
from datetime import datetime
import uuid


openai.api_key = OPENAI_API_KEY


@bp.route('/', methods=['GET'])
@cross_origin()
def get_questions_and_answers():

    cursor = db['suggestions'].find().sort('date', -1)

    data = []
     
    for obj in cursor:
        data.append(
            {"question": obj["question"],
             "answer": obj['answer'] if 'answer' in obj else None,
             "suggestion_id": obj['suggestion_id']}
        )

    return {'data': data}


@bp.route('/questions', methods=['POST'])
@cross_origin()
def post_questions():

    suggestions_collection = db["suggestions"]

    doc_id = int(request.form.get('doc_id'))
    question = request.form.get('question')

    to_insert = {
        'suggestion_id': str(uuid.uuid4()),
        'question': question,
        'date': datetime.today().replace(microsecond=0),
        'doc_id': doc_id,
        'pending': True
    }
    
    suggestions_collection.insert_one(to_insert)

    return 'Success', 200



@bp.route('/answers', methods=['POST'])
@cross_origin()
def post_answers():
    answer = request.form.get('answer')

    suggestions_collection = db["suggestions"]
    documentations_collection = db['documentation']
    
    suggestion = suggestions_collection.find_one({'suggestion_id': request.form.get('suggestion_id')})
    documentation = documentations_collection.find_one({'doc_id': suggestion['doc_id']})

    init_prompt = "Update the following markdown text only in areas where there are changes required based on the question and answer following it: "
    question_prefix = 'The question is: '
    answer_prefix = 'The answer is: '
    final_prompt = 'Update my document with this information and return the whole markdown text. Do not change anything other than what is specific to the question.'

    prompt = init_prompt + documentation['doc'] + question_prefix + suggestion['question'] + answer_prefix + answer + final_prompt

    conversation = [{"role": "user", "content": prompt}]
    new_doc = openai.ChatCompletion.create(model="gpt-3.5-turbo", messages=conversation).choices[0].message.content

    to_update = {
        'answer': answer,
        'old_doc': documentation['doc'],
        'new_doc': new_doc
    }
    
    suggestions_collection.update_one(
        {'suggestion_id': suggestion['suggestion_id']},
        {'$set': to_update}
        )

    return 'Success', 200




@bp.route('/postman', methods=['POST'])
@cross_origin()
def post_questions_and_answers():

    suggestions_collection = db["suggestions"]

    init_prompt = "This is the text which I would like you to update: "
    question_prefix = 'The question is: '
    answer_prefix = 'The answer is: '
    final_prompt = 'Update my document with this information and return the whole text'

    doc_id = int(request.form.get('doc_id'))

    with open('documentations/gmail.txt', 'r') as f:
        doc = f.read()

    question = request.form.get('question')
    answer = request.form.get('answer')

    prompt = init_prompt + doc + question_prefix + question + answer_prefix + answer + final_prompt


    conversation = [{"role": "user", "content": prompt}]
    new_doc = openai.ChatCompletion.create(model="gpt-3.5-turbo", messages=conversation).choices[0].message.content

    to_insert = {
        'suggestion_id': str(uuid.uuid4()),
        'question': question,
        'answer': answer,
        'old_doc': doc,
        'new_doc': new_doc,
        'date': datetime.today().replace(microsecond=0),
        'doc_id': doc_id,
        'pending': True
    }
    
    suggestions_collection.insert_one(to_insert)

    return redirect('/forum')
