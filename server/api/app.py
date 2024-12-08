#!/usr/bin.env python3
import logging
from flask import Flask, jsonify, make_response, request, session
from flask_session import Session
from flask_cors import CORS
from flask_socketio import SocketIO, emit
from flask_mail import Mail
from celery import Celery
from api.chats.patient_chat import Chat

# from api.chats import AdminNamespace
from config import config
from models.engine.db import db_client
from os import getenv
from api.views import app_view, validate_view
from models.engine.auth import Auth
from log_handlers import mail_handler, file_handler

app = Flask(__name__)
app_logger = app.logger
AUTH = Auth()

# configure app
app.config.from_object(config.dev)
app.url_map.strict_slashes = False

# add socketio
sio = SocketIO(app, cors_allowed_origins="*", transport=["websocket"])
sio.on_namespace(Chat('/chats'))
# sio.on_namespace('/admin', AdminNamespace)

# add mail
mail = Mail(app)

# add celery task to the app
celery = Celery(app.name, broker=app.config["CELERY_BROKER_URL"])
celery.conf.update(app.config)

# initialise extensions
CORS(app, resources={r"*": {"origins": "*"}}, supports_credentials=True)

# session configuration
Session(app)

# register blueprints
app.register_blueprint(app_view)
app.register_blueprint(validate_view)

# initialise app logger
app_logger.setLevel(logging.INFO)
app_logger.addHandler(mail_handler)
app_logger.addHandler(file_handler)


# ping socket
@sio.on("connect")
def ping():
    """pings the client"""
    emit("message", {"message": "Welcome to the chat app!", "sender": "Glory"})


@sio.on("message")
def handle_message(data):
    """handles incoming messages"""
    emit("message", data)


@app.before_request
def before_request():
    """authorise each request"""
    excluded_path = [
        "/hello",
        "/api/v1/validate/*",
        "/api/v1/auth/confirmation/*",
        "/api/v1/auth/login",
        "/api/v1/auth/register",
        "/chats",
    ]
    id = session.get("user_id", None)

    # app_logger.info('new request')

    if AUTH.require_auth(request.path, excluded_path):
        if id is None:
            return make_response(jsonify(error="unauthorised user"), 403)


@app.teardown_appcontext
def close_db(obj):
    """closes storage"""
    db_client.close()


@app.errorhandler(404)
def page_not_found(err):
    """loads a returns an error 404 message"""
    return make_response(jsonify(error="Not found"), 404)


@app.route("/hello")
def hello():
    """server greeting"""
    return make_response(jsonify(message="Hello there")), 200


@app.route("/test_path")
def test_path():
    """test path for authenticated users"""
    user = session["user"]
    # user = user_obj.to_json()
    message = f"{user['username']} is logged in"
    load = {"email": user["email"], "username": user["username"], "message": message}
    return make_response(jsonify(load))


if __name__ == "__main__":
    host = getenv("API_HOST", "localhost")
    port = getenv("API_PORT", 5000)
    sio.run(app, host=host, port=port, debug=True)
