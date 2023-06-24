from forum import bp

from db import client, db, collection

@bp.route('/', methods=['GET'])
def forum():

    cursor = collection.find()

    data = []
    for obj in cursor:
        data.append(obj)

    return data