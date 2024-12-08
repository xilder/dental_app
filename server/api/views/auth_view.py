from flask import abort, jsonify, make_response, request, session
from itsdangerous import SignatureExpired
from api.views import app_view
from models.engine.auth import Auth
from models.user import User
from errors.account_error import UnconfirmedAccountError

AUTH = Auth()


@app_view.route("/register", methods=["POST"])
def register():
    from tasks.accounts_task import send_verification_message

    """registration route"""
    if not request.get_json():
        return make_response(jsonify("Not a JSON"), 400)

    try:
        user_params = request.get_json()
        user = AUTH.register_user(**user_params)
        token = AUTH.get_token(user.email)

        if token:
            send_verification_message(user)
        return make_response(
            f"A confirmation mail has been sent to {user.email}.",
            201,
        )
    except Exception as e:
        AUTH.delete_user(user.id)
        return make_response(str(e), 400)


@app_view.route("/confirmation/<token>")
def confirmation(token):
    try:
        if not token:
            abort(404)
        user = AUTH.get_user_from_token(token=token)
        if user.confirmed:
            return make_response("Account already confirmed", 403)
        if AUTH.update(user.id, confirmed=True):
            return make_response("Account Confirmation Successful", 200)
    except SignatureExpired:
        return make_response('Account expired. Please your email for a new confirmation mail')
    except Exception:
        return make_response("Invalid token", 403)


@app_view.route("/login", methods=["POST"])
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

        session["user_id"] = user.id
        session["user"] = user.to_json()
        return make_response(jsonify(user.to_json()))
    except UnconfirmedAccountError as e:
        return make_response(str(e), 403)



@app_view.route("/profile", methods=["GET"])
def profile() -> User:
    """returns the information of the user logged in"""
    user: User = session.get("user", None)
    if user is None:
        return make_response("Unauthorised", 401)

    return make_response(jsonify(user))


@app_view.route("/logout", methods=["DELETE"])
def logout() -> str:
    """terminates session"""
    session.pop("user_id")
    session.pop("user")
    return make_response(jsonify(), 200)


@app_view.route("/users", methods=["DELETE"])
def delete_user() -> str:
    """deletes a user"""
    id = session.get("user_id", None)
    if not id:
        abort(401)

    if not AUTH.delete_user(id):
        return make_response(jsonify("Account not deleted"), 403)

    return make_response(jsonify("Account deleted"))


@app_view.route("/reset_password", methods=["POST"])
def reset_password():
    if request.get_json() is None:
        return make_response(jsonify("Not a json"), 401)

    user_params = request.get_json()
    email = user_params.get("email", None)
    token = AUTH.get_reset_password_token(email=email)
    if token is None:
        return make_response(jsonify("Unauthorised"), 401)
    return make_response(jsonify(f"Visit {email} for the reset email"))


@app_view.route("/change_password/<token>", methods=["POST"])
def change_password(token):
    """Change Password"""
    user = AUTH.get_user_from_token(token)
    if user is None:
        return make_response(jsonify("Invalid token"), 401)
    user_params = request.get_json()
    password = user_params.get("password", None)
    if not AUTH.change_password(token, password):
        return make_response(jsonify("Invalid token"), 401)
    return make_response(jsonify("Password changed"))

    # return make_response(jsonify(message='Change Password'))


# @app_view.route('/user', methods=['POST'])
# def update_user():
#     """updates a user profile"""
#     id = session.get('user_id')
#     if not id:
#         abort(401)
