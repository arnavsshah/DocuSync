from flask import redirect
from flask_cors import cross_origin

from home import bp
from db import db



@bp.route('/', methods=['GET'])
@cross_origin()
def get_documentation():

    cursor = db['documentation'].find()
    data = []

    for documentation in cursor:
        if 'new_doc' in documentation:
            data.append(documentation['new_doc'])
        else:
            data.append(documentation['doc'])

    return {'data': data}