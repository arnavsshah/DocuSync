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
        
        if obj['pending'] and 'answer' in obj:
            data.append(obj)

    return {'suggestions': data}


@bp.route('/', methods=['POST'])
@cross_origin()
def post_suggestions():

    db['documentation'].update_one(
        {'doc_id': int(request.json['doc_id'])},  {'$set': {"new_doc": request.json['new_doc']}}
    )

    db['suggestions'].update_one(
        {'suggestion_id': request.json['suggestion_id']}, {'$set': {"pending": False}}
    )

    return 'Success', 200


@bp.route('/delete/', methods=['POST'])
@cross_origin()
def delete_suggestions():

    db['suggestions'].update_one(
        {'suggestion_id': request.json['suggestion_id']}, {'$set': {"pending": False}}
    )

    return 'Success', 200