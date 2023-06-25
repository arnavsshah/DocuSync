from flask import redirect
from flask_cors import cross_origin

from home import bp
from db import db
from config import OPENAI_API_KEY

import openai

openai.api_key = OPENAI_API_KEY


@bp.route('/', methods=['GET'])
@cross_origin()
def get_documentation():
    
    init_prompt = "Generate markdown code for the following text. Do not change any text or add any images. "

    documentation = db['documentation'].find_one({'doc_id': 1})

    prompt = init_prompt + documentation['doc']

    conversation = [{"role": "user", "content": prompt}]
    markdown_doc = openai.ChatCompletion.create(model="gpt-3.5-turbo", messages=conversation).choices[0].message.content

    return markdown_doc


@bp.route('/<int:param>/', methods=['GET'])
@cross_origin()
def get_documentation_by_index(param):

    if param > 3:
        return redirect('/')

    init_prompt = "Generate markdown code for the following text. Do not change any text or add any images. "

    documentation = db['documentation'].find_one({'doc_id': param})

    prompt = init_prompt + documentation['doc']

    conversation = [{"role": "user", "content": prompt}]
    markdown_doc = openai.ChatCompletion.create(model="gpt-3.5-turbo", messages=conversation).choices[0].message.content

    return markdown_doc