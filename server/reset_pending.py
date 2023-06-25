from db import db
from config import OPENAI_API_KEY

import uuid
from datetime import datetime

import openai

openai.api_key = OPENAI_API_KEY


suggestions_collection = db['suggestions']

suggestions_collection.update_many({'pending': False}, {'$set': {'pending': True}})





