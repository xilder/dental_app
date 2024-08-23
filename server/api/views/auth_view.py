from flask import abort, jsonify, make_response, redirect, request, session, url_for
from api.views import app_view
from models.engine.auth import Auth
from models.user import User

AUTH = Auth()

@app_view.route('/register', methods=['POST'])
def register() -> User:
    """registration route"""
    if not request.get_json():
        return make_response(jsonify(error='Not a JSON'), 400)

    try:
        user_params = request.get_json()
        user = AUTH.register_user(**user_params)
        return make_response(jsonify(user.to_json()), 201)
    except ValueError as e:
        return make_response(jsonify(error=str(e)), 400)

@app_view.route('/login', methods=['POST'])
def login() -> User:
    """login route"""
    if request.get_json() is None:
        return make_response(jsonify(error='Not a json'), 401)

    user_params = request.get_json()
    data = user_params.get('data', None)
    password = user_params.get('password', None)

    user = AUTH.valid_login(email=data, username=data, password=password)
    if not user:
        return make_response(jsonify(error='Invalid login credentials'), 404)

    session['user_id'] = user.id
    session['user'] = user
    return make_response(jsonify(user.to_json()))

@app_view.route('/profile', methods=['GET'])
def profile() -> User:
    """returns the information of the user logged in"""
    user = session.get('user', None)
    if user is None:
        return make_response(jsonify(error='Unauthorised'), 401)

    return make_response(jsonify(user.to_json()))

@app_view.route('/logout', methods=['DELETE'])
def logout() -> str:
    """terminates session"""
    session.pop('user_id')
    session.pop('user')
    return make_response(jsonify(), 200)

@app_view.route('/users', methods=['DELETE'])
def delete_user() -> str:
    """deletes a user"""
    id = session.get('user_id', None)
    if not id:
        abort(401)

    if not AUTH.delete_user(id):
        return make_response(jsonify(error='Account not deleted'), 403)

    return make_response(jsonify(message='Account deleted'))
