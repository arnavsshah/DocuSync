from flask import Blueprint
from flask_cors import CORS

bp = Blueprint('suggestions', __name__)
CORS(bp)

from suggestions import routes