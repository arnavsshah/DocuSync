from flask import Blueprint
from flask_cors import CORS

bp = Blueprint('forum', __name__)
CORS(bp)

from forum import routes