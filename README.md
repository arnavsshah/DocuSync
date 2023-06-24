# DocuSync
Real-time suggestions for internal and external product documentation.


```
conda create --name docusync python=3.8.10
conda activate docusync
```

```
cd server
pip install -r requirements.txt
```

Create a .env file within the server sub-directory with the following format
```
USERNAME = "<username>"
PASSWORD = "<password>"
```


To run the backend server
```
cd server
python app.py
```


