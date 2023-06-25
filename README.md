# DocuSync
Real-time suggestions for internal and external product documentation.

(Not strictly required)
```
conda create --name docusync python=3.8.10
conda activate docusync
```

For the frontend
```
cd client
npm install
cd ..
```

For the backend
```
cd server
pip install -r requirements.txt
cd ..
```

Create a .env file within the `server` sub-directory with the following format
```
USERNAME = "<username>"
PASSWORD = "<password>"
OPENAI_API_KEY = "<api_key>"
```

Register and create a database on MonogoDB Atlas. For this project, the name of the database is 'docusync' and the names of the collections are 'documentation' & 'suggestions'.

Replace the URI in `server/config.py` with your own database URI.

```
cd server
python populate_db.py
cd ..
```

To run the frontend server
```
cd client
npm start
cd ..
```

To run the backend server
```
cd server
python app.py
cd ..
```

Go to [localhost:3000](http://localhost:3000/)


