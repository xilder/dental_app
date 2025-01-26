from flask import abort, jsonify, make_response, request, session
from itsdangerous import SignatureExpired
from api.views import app_view
from models.engine.auth import Auth
from errors.account_error import UnconfirmedAccountError

AUTH = Auth()


@app_view.route("/register/<role>", methods=["POST"])
def register(role: str):
    """registration route"""
    if not request.get_json():
        return make_response(jsonify("Not a JSON"), 400)
    try:
        user_params = request.get_json()
        user = AUTH.register_user(cls=role, **user_params)
        if not user:
            return make_response("Registration failed", 400)
        token = AUTH.get_reset_token(cls=role, email=str(user.email))
        if token:
            from tasks.accounts_task import send_verification_message

            # send_verification_message(user)
        return make_response(
            f"A confirmation mail has been sent to {user.email}.",
            201,
        )
    except Exception as e:
        # AUTH.delete_user(user.id)
        return make_response(str(e), 401)


@app_view.route("/confirmation/<role>/<token>")
def confirmation(role: str, token: str):
    try:
        if not token:
            abort(404)
        user = AUTH.get_user_from_token(cls=role, token=token)
        if not user:
            return make_response("Invalid token", 403)
        if bool(user.confirmed):
            return make_response(
                "Account already confirmed. Please proceed to login", 400
            )
        if AUTH.update(cls=role, id=user.id, confirmed=True):
            return make_response("Account Confirmation Successful", 200)
        return make_response("Account confirmation failed", 400)
    except SignatureExpired:
        return make_response(
            "Token expired. Please your email for a new confirmation mail",
            400,
        )
    except Exception:
        return make_response("Invalid token", 403)


@app_view.route("/login/", methods=["POST"])
def login():
    """login route"""
    try:
        if request.get_json() is None:
            return make_response(jsonify("Not a json"), 401)
        user_params = request.get_json()
        data = user_params.get("data", None)
        password = user_params.get("password", None)
        user = AUTH.valid_login(email=data, username=data, password=password)
        if not user:
            return make_response("Invalid login credentials", 404)
        # TODO: add check for account confirmation
        session_user = user.to_json()
        for key in ["updated_at", "created_at", "type", "session", "token"]:
            del session_user[key]
        session["user_id"] = user.id
        session["user"] = session_user
        return make_response(jsonify(session_user))
    except UnconfirmedAccountError as e:
        return make_response(str(e), 403)


@app_view.route("/profile", methods=["GET"])
def profile():
    """returns the information of the user logged in"""
    user = session.get("user", None)
    if user is None:
        return make_response("Unauthorised", 401)
    return make_response(jsonify(user))


@app_view.route("/logout", methods=["DELETE"])
def logout():
    """terminates session"""
    session.pop("user_id")
    session.pop("user")
    return make_response(jsonify(), 200)


@app_view.route("/users/", methods=["DELETE"])
def delete_user():
    """deletes a user"""
    params = request.get_json()
    id = params.get("id", None)
    if not id:
        abort(401)
    if not AUTH.delete_user(id):
        return make_response(jsonify("Account not deleted"), 403)
    return make_response(jsonify("Account deleted"))


# @app_view.route("/reset_password", methods=["POST"])
# def reset_password():
#     if request.get_json() is None:
#         return make_response(jsonify("Not a json"), 401)

#     user_params = request.get_json()
#     email = user_params.get("email", None)
#     token = AUTH.get_reset_token(cls='user', email=email)
#     if token is None:
#         return make_response(jsonify("Unauthorised"), 401)
#     return make_response(jsonify(f"Visit {email} for the reset email"))


@app_view.route("/change_password", methods=["POST"])
def change_password(token):
    """Change Password"""
    user_params = request.get_json()
    password = user_params.get("password", None)
    id = session.get("user_id", None)
    user = AUTH.find_user_by(cls="user", id=id)
    if user is None:
        return make_response(jsonify("Unauthorised"), 403)
    if not AUTH.update(cls="user", id=id, password=password):
        return make_response(jsonify("Invalid token"), 401)
    return make_response(jsonify("Password changed"))


# @app_view.route('/user', methods=['POST'])
# def update_user():
#     """updates a user profile"""
#     id = session.get('user_id')
#     if not id:
#         abort(401)
