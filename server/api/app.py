#!/usr/bin.env python3
from flask import Flask, abort, jsonify, make_response, request, session
from flask_session import Session
from flask_cors import CORS
from config import config
from models.engine.db import db_client
from os import getenv
from api.views import app_view
from models.engine.auth import Auth


app = Flask(__name__)
AUTH = Auth()

# configure app
app.config.from_object(config['dev'])
app.url_map.strict_slashes = False

# initialise extensions
CORS(app, resources={r"/api/v1/*": {"origins": "*"}})

# session configuration
Session(app)

# register blueprints
app.register_blueprint(app_view)

@app.before_request
def before_request():
    """authorise each request"""
    excluded_path = ['/hello', '/api/v1/auth/login', '/api/v1/auth/register']

    if AUTH.require_auth(request.path, excluded_path):
        id = session.get('user_id', None)
        if id is None:
            return make_response(jsonify(error="unauthorised user"), 403)

@app.teardown_appcontext
def close_db(obj):
    """closes storage"""
    db_client.close()

@app.errorhandler(404)
def page_not_found(err):
    """loads a returns an error 404 message"""
    return make_response(jsonify(error='Not found'), 404)

@app.errorhandler(401)

@app.route('/hello', methods=['GET'])
def hello():
    """server greeting"""
    return make_response(jsonify(message='Hello there')), 200

@app.route('/test_path', methods=['get'])
def test_path():
    """test path for authenticated users"""
    user_obj = session['user']
    user = user_obj.to_json()
    message = f"{user['username']} is logged in"
    load = {
        'email': user['email'],
        'username': user['username'],
        'message': message
    }
    return make_response(jsonify(load))

if __name__ == '__main__':
    host = getenv('API_HOST', 'localhost')
    port = getenv('API_PORT', 5000)
    app.run(host=host, port=port, debug=True)