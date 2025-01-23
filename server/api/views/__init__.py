#!usr/bin/python3
"""handles routes"""
from flask import Blueprint

app_view = Blueprint('auth', __name__, url_prefix='/api/v1/auth')
validate_view = Blueprint('validate', __name__, url_prefix='/api/v1/validate')
chat_view = Blueprint('chat', __name__, url_prefix='/api/v1/chat')
resource_view = Blueprint('resources', __name__, url_prefix='/api/v1/resources')

from api.views.auth_view import *
from api.views.validate_view import *
from api.views.chat_messages_view import *
from api.views.resources_view import *