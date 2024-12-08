#!usr/bin/python3
"""handles routes"""
from flask import Blueprint

app_view = Blueprint('auth', __name__, url_prefix='/api/v1/auth')
validate_view = Blueprint('validate', __name__, url_prefix='/api/v1/validate')

from api.views.auth_view import *
from api.views.validate_view import *