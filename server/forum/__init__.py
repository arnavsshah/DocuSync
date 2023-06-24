from flask import Blueprint

bp = Blueprint('forum', __name__)

from forum import routes