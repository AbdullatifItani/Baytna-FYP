import os
from flask import Flask, render_template, request, session, redirect
from flask_cors import CORS
from flask_migrate import Migrate
from flask_login import LoginManager

from .socket_handler import socketio
from .models import db, User
from .api.auth_routes import auth_routes
from .api.property_routes import property_routes
from .api.agent_routes import agent_routes
from .api.appointment_routes import appointment_routes
from .api.review_routes import review_routes
from .api.search_routes import search_routes
from .api.service_area_routes import service_area_routes
from .api.channel_routes import channel_routes
from .api.upload import upload_bp
from .api.favorites_routes import favorites_routes
from .api.chatbot_routes import chatbot_routes

from .seeds import seed_commands

from .config import Config

app = Flask(__name__)
app.config.from_object(Config)
app.config['UPLOAD_FOLDER'] = 'uploads/'

# Setup login manager
login = LoginManager(app)
login.login_view = 'auth.unauthorized'


@login.user_loader
def load_user(id):
    return User.query.get(int(id))


# Tell flask about our seed commands
app.cli.add_command(seed_commands)

app.config.from_object(Config)
app.register_blueprint(auth_routes, url_prefix='/api/auth')
app.register_blueprint(property_routes, url_prefix='/api/properties')
app.register_blueprint(agent_routes, url_prefix='/api/agents')
app.register_blueprint(appointment_routes, url_prefix='/api/appointments')
app.register_blueprint(review_routes, url_prefix='/api/reviews')
app.register_blueprint(search_routes, url_prefix='/api/search')
app.register_blueprint(service_area_routes, url_prefix='/api/service_areas')
app.register_blueprint(channel_routes, url_prefix='/api/channels')
app.register_blueprint(upload_bp, url_prefix='/api')
app.register_blueprint(favorites_routes, url_prefix='/api/favorites')
app.register_blueprint(chatbot_routes, url_prefix='/api/chatbot')
db.init_app(app)
Migrate(app, db)
socketio.init_app(app)

from datetime import timedelta
app.config['PERMANENT_SESSION_LIFETIME'] = timedelta(days=7)  # Keep the session for 7 days

# Application Security
#CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})
#CORS(app, supports_credentials=True)
#CORS(
#    app,
#    supports_credentials=True,
#    resources={r"/*": {"origins": "http://localhost:3000"}}
#)
#CORS(
#    app,
#    supports_credentials=True,
#    origins=[
#        "http://localhost:3000",
#        "http://127.0.0.1:3000"
#    ],
#    methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
#    allow_headers=["Content-Type", "Authorization"]
#)
#CORS(app)
#CORS(app, supports_credentials=True)
CORS(
    app,
    supports_credentials=True,
    resources={
        r"/*": {
            "origins": [
                "http://localhost:3000",
                "http://127.0.0.1:3000",
                "http://[::1]:3000",
                "http://localhost:3000/",
                "http://127.0.0.1:3000/",
                "http://[::1]:3000/",


            ],
            "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
            "allow_headers": ["Content-Type", "Authorization"],
            "expose_headers": ["Content-Type", "Authorization"]

        }
    }
)


# Since we are deploying with Docker and Flask,
# we won't be using a buildpack when we deploy to Heroku.
# Therefore, we need to make sure that in production any
# request made over http is redirected to https.
# Well.........
#@app.before_request
#def https_redirect():
#    if os.environ.get('FLASK_ENV') == 'production':
#        if request.headers.get('X-Forwarded-Proto') == 'http':
#            url = request.url.replace('http://', 'https://', 1)
#            code = 301
#            return redirect(url, code=code)

"""@app.teardown_request
def teardown_request(exception=None):
    if not session:
        print("Session has been cleared.")"""

"""CORS(
    app,
    supports_credentials=True,
    resources={r"/*": {"origins": ["http://localhost:3000", "http://127.0.0.1:3000"]}}
)"""

@app.teardown_request
def teardown_request(exception=None):
    if not session:
        print("Session has been cleared.")
        # Check if the session cookie exists
        if 'session' not in request.cookies:
            print("Reason: Session cookie is missing.")
        else:
            print("Reason: Session exists in cookies but is empty.")
    else:
        print("Session state at teardown:", session)

@app.before_request
def before_request():
    print(session)
    
@app.after_request
def after_request(response):
    print(session)
    return response


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def react_root(path):
    if path == 'favicon.ico':
        return app.send_static_file('favicon.ico')
    return app.send_static_file('index.html')

if __name__ == '__main__':
    socketio.run(app)
    #socketio.run(app, host="127.0.0.1", port=5000)
