from flask import redirect
from flask_cors import cross_origin

from home import bp
from db import db



@bp.route('/', methods=['GET'])
@cross_origin()
def get_documentation():

    documentation = db['documentation'].find_one({'doc_id': 1})

    return documentation['doc']


@bp.route('/<int:param>/', methods=['GET'])
@cross_origin()
def get_documentation_by_index(param):

    if param > 3:
        return redirect('/')

    documentation = db['documentation'].find_one({'doc_id': param})

    return documentation['doc']