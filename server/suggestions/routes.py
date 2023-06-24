from suggestions import bp

from db import client, db, collection


@bp.route('/', methods=['GET'])
def suggestions():

    cursor = collection.find()

    data = []
    for obj in cursor:
        data.append(obj)

    return data