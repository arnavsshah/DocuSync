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

    cursor = db['suggestions'].find().sort('date', 1)

    data = []
     
    for obj in cursor:
        print(obj["question"])
        data.append(
            {"question": obj["question"],
             "answer": obj['answer'] if 'answer' in obj else None,
             "suggestion_id": obj['suggestion_id']}
        )

    return {'data': data}


@bp.route('/questions/', methods=['POST'])
@cross_origin()
def post_questions():

    suggestions_collection = db["suggestions"]

    doc_id = int(request.json['doc_id'])
    question = request.json['question']

    to_insert = {
        'suggestion_id': str(uuid.uuid4()),
        'question': question,
        'date': datetime.today().replace(microsecond=0),
        'doc_id': doc_id,
        'pending': True
    }
    
    suggestions_collection.insert_one(to_insert)

    return 'Success', 200



@bp.route('/answers/', methods=['POST'])
@cross_origin()
def post_answers():

    answer = request.json['answer']

    suggestions_collection = db["suggestions"]
    documentations_collection = db['documentation']
    
    suggestion = suggestions_collection.find_one({'suggestion_id': request.json['suggestion_id']})
    documentation = documentations_collection.find_one({'doc_id': suggestion['doc_id']})

    init_prompt = "Update the following product documentation written in markdown text, only in areas where there are changes required based on the question and answer following it and return the entire documentation which would include the changes. The documentation is: "
    question_prefix = 'The question is: '
    answer_prefix = 'The answer is: '
    final_prompt = 'Do not append the changes to the original documentation but instead, update the text in the original documentation that is altered. Be succinct. Do not change anything other than what is specific to the question. Additionally, do not explicitly mention the question and answer in the returned text.'

    prompt = init_prompt + documentation['doc'] + question_prefix + suggestion['question'] + answer_prefix + answer + final_prompt

    conversation = [{"role": "user", "content": prompt}]
    new_doc = openai.ChatCompletion.create(model="gpt-3.5-turbo", messages=conversation, temperature=0).choices[0].message.content

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
