from flask import jsonify, make_response
from api.views import validate_view
from models.engine.db import db_client


@validate_view.route("/email/<email>")
def validate_email(email):
    """checks if an email address is already registered"""
    user = db_client.find_obj_by("user", email=email).first()
    print(user)
    if user:
        return make_response(
            jsonify(
                valid=False, message=f"{email} has already been registered"
            ),
            200,
        )
    else:
        return make_response(jsonify(valid=True, message="Valid email"), 200)


@validate_view.route("/username/<username>")
def validate_username(username):
    """checks if a username is already registered"""
    user = db_client.find_obj_by("user", username=username).first()
    print(user)
    if user:
        return make_response(
            jsonify(
                valid=False, message=f"{username} has already been registered"
            ),
            200,
        )
    else:
        return make_response(
            jsonify(valid=True, message="Valid username"), 200
        )
