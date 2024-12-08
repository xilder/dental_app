#!/usr/bin/env python3
from models.user import User
from tasks.accounts_task import send_verification_message
from models.engine.auth import Auth,generate_confirmation_token
from tests.test_models.test_engine.test_model import TestModel
from api.app import app
from models.engine.db import db_client
from itsdangerous import URLSafeTimedSerializer
from config import config
from socketio import Client


AUTH = Auth()
AUTH.reset_database()
# serialiser = URLSafeTimedSerializer(config.dev.SECRET_KEY)
# print(serialiser)
# serialised = serialiser.dumps('abel', salt=config.dev.SECURITY_PASSWORD_SALT)
# print(serialised)

# email = serialiser.loads(
#             serialised, salt=config.dev.SECURITY_PASSWORD_SALT, max_age=1
#         )
# print(email)

# with app.app_context():
#     AUTH.reset_database()
#     user_params = TestModel()
#     user_params.email = 'abel.fagbemi@med.uniben.edu'

#     user = AUTH.register_user(**user_params.to_json())
#     token = AUTH.get_reset_password_token(user.email)
#     send_verification_message(user)

# user_params = TestModel()
# user = User(**user_params.to_json())
# print(user.email)
# db_client.add(user)
# user = db_client.find_obj_by('user', id=user.id).first()
# print(user)
# db_client.update('user', user.id, email='abel')
# user = db_client.find_obj_by('user', id=user.id).first()
# print(user.email)

# print(generate_confirmation_token('allah'))

# Create a SocketIO client
sio = Client()

# Define event handlers
@sio.event(namespace='/chats')
def connect():
    print('I\'m connected!')
    sio.emit('my_event', [5, 6, 7], namespace='/chats')

@sio.event(namespace='/chats')
def response(data):
    print('Message received from server:', data)

@sio.event(namespace='/chats')
def disconnect():
    print('I\'m disconnected!')


# Connect to the server
sio.connect('http://localhost:5000/chats')
sio.emit('hello', [1, 2, 3, 4], namespace='/chats')  # Replace with the actual server URL
# Keep the client running (optional)
sio.wait()