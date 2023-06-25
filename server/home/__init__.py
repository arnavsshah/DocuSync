from flask import Blueprint
from flask_cors import CORS

bp = Blueprint('home', __name__)
CORS(bp)

from home import routes