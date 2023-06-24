from flask import Flask

from home import bp as home_bp
from forum import bp as forum_bp
from suggestions import bp as suggestions_bp


app = Flask(__name__)

app.register_blueprint(home_bp)
app.register_blueprint(forum_bp, url_prefix='/forum')
app.register_blueprint(suggestions_bp, url_prefix='/suggestions')


if __name__ == "__main__":
    app.run(debug=True)