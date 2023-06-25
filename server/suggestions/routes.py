from flask import request, redirect
from flask_cors import cross_origin

from suggestions import bp
from db import db


@bp.route('/', methods=['GET'])
@cross_origin()
def get_suggestions():

    cursor = db['suggestions'].find()

    data = []
    for obj in cursor:
        del obj['_id']
        
        if obj['pending']:
            data.append(obj)

    return {'suggestions': data}


@bp.route('/', methods=['POST'])
@cross_origin()
def post_suggestions():

    db['documentation'].updateOne(
        {'doc_id': int(request.form.get('doc_id'))},  {'$set': {"doc": request.form.get('new_doc')}}
    )

    db['suggestions'].updateOne(
        {'suggestion_id': request.form.get('suggestion_id')}, {'$set': {"pending": False}}
    )

    return 'Success', 200
