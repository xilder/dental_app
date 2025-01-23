# # from flask import session
# from flask import request
# from flask_socketio import Namespace, join_room, leave_room, disconnect, emit
# from api.app import sio
# # from models.messages import Message
# # from models.engine.db import db_client
# from uuid import uuid4



#     def on_disconnect(self):
#         disconnect()

#     def on_offer(self, offer):
#         sid = request.sid
#         print('offer received', offer)
#         room = 'a'
#         emit('offer', offer, room=room, include_self=False, broadcast=True, skip_sid=sid)

#     def on_answer(self, answer):
#         room = 'a'
#         emit('answer', answer, room=room, include_self=False, broadcast=True) 