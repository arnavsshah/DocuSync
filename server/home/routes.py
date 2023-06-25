from flask import redirect

from home import bp
from db import db

from flask_cors import cross_origin


@bp.route('/', methods=['GET'])
@cross_origin()
def get_documentation():

    documentation = db['documentation'].find_one({'doc_id': 1})
    del documentation['_id']
    return documentation['doc']


@bp.route('/<int:param>/', methods=['GET'])
@cross_origin()
def get_documentation_by_index(param):

    if param > 3:
        return redirect('/')

    documentation = db['documentation'].find_one({'doc_id': param})
    del documentation['_id']
    return documentation['doc']