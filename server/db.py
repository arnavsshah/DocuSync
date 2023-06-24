from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi

from config import URI

client = MongoClient(URI, server_api=ServerApi('1'))

db = client["docusync"]


# try:
#     client.admin.command('ping')
#     print("You successfully connected to MongoDB!")
# except Exception as e:
#     print(e)