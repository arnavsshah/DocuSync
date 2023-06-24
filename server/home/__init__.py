from flask import Blueprint

bp = Blueprint('home', __name__)

from home import routes