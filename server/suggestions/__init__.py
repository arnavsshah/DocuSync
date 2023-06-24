from flask import Blueprint

bp = Blueprint('suggestions', __name__)

from suggestions import routes