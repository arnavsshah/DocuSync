# DocuSync
Real-time suggestions for internal and external product documentation.

(Not strictly required but good practice. Could use a docker container as well)
```
conda create --name docusync python=3.8.10
conda activate docusync
```

##### For the frontend
```
python populate_documentation.py
npm install
cd ..
```

##### For the backend
```
cd server
pip install -r requirements.txt
cd ..
```

##### Create a .env file within the `server` sub-directory with the following format
```
USERNAME = "<username>"
PASSWORD = "<password>"
OPENAI_API_KEY = "<api_key>"
```

##### To setup and populate the database

Register and create a database on MonogoDB Atlas. For this project, the name of the database is 'docusync' and the names of the collections are 'documentation' & 'suggestions'.

Replace the URI in `server/config.py` with your own database URI.

```
cd server/direct_db_edits
python populate_documentation.py
python populate_suggestions.py
cd ..
```

##### To run the frontend server
```
cd client
npm start
cd ..
```

##### To run the backend server
```
cd server
python app.py
cd ..
```

Go to [localhost:3000](http://localhost:3000/)

![DocuSync](/docusync.jpg)

[Devpost Entry for the HackerDojo Generative AI hackathon](https://devpost.com/software/docusync-w4c930)

###### Additional
- You can use the `server/direct_db_edits/reset_pending.py` script to get back all accepted suggestions (sets `pending` to True so that it is displayed in the diff screen)
- You can use the `server/direct_db_edits/delete_answers.py` script to delete 'answer', 'old_doc' and 'new_doc' fields from all suggestions.