from suggestions import bp

from db import db


@bp.route('/', methods=['GET'])
def suggestions():

    cursor = db['suggestions'].find()

    data = []
    for obj in cursor:
        data.append(obj['new_doc'])

    return data
