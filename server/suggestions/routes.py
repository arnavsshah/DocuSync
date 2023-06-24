from suggestions import bp
from flask_cors import cross_origin

from db import db

@bp.route('/', methods=['GET'])
@cross_origin()
def suggestions():

    cursor = db['suggestions'].find()

    data = []
    for obj in cursor:
        data.append(obj)

    return {'suggestions': [{
        'question': suggestion['question'],
        'answer': suggestion['answer'],
        'new_doc': suggestion['new_doc'],
        'old_doc': suggestion['old_doc']
    } for suggestion in data]}
