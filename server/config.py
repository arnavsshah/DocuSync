from dotenv import dotenv_values

config = dotenv_values(".env")

USERNAME = config["USERNAME"]
PASSWORD = config["PASSWORD"]

URI = f"mongodb+srv://{USERNAME}:{PASSWORD}@docusync.mwni1jn.mongodb.net/?retryWrites=true&w=majority"