#!usr/bin/python3
"""handles routes"""
from flask import Blueprint

app_view = Blueprint('routes', __name__, url_prefix='/api/v1/auth')

from api.views.auth_view import *