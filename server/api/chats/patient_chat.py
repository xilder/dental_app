from flask import session, request
from flask_socketio import Namespace, emit, join_room, leave_room, disconnect
from models.messages import Message
from models.engine.db import db_client

online_users: dict[str, str] = {}


class Chat(Namespace):
    def on_connect(self):
        if not session["user_id"]:
            disconnect()
        print(f"Client connected: {request.sid}")
        user = session["user_id"]
        online_users[user] = request.sid
        o_users = [a_user for a_user in online_users.keys() if a_user != user]
        emit('users', o_users, broadcast=True)

        # offline_msgs = db_client.find_obj_by('message', receiver_id=user, type='pending').all()

        # for msg in offline_msgs:
        #     sender_id = msg.to_json().get('sender_id')
        #     text = msg.get('text')
        #     created_at = msg.get('created_at')
        #     self.emit('offline_message', {'sender_id': sender_id, 'text': text, 'created_at': created_at}, room=request.sid)
        #     db_client.update('message', msg.id, type='delivered')
        # print("Client connected to namespace")

    def on_disconnect(self):
        user = session["user_id"]
        del online_users[user]
        disconnect()

    # def on_join_room(self, data):
    #     patient = data['patient']
    #     doctor = data['doctor']
    #     join_room(f'room_{patient}_{doctor}')

    # def on_message(self, data):
    #     # room_id = data['room_id']
    #     sender_id = session["sender_id"]
    #     receiver_id = data["receiver_id"]
    #     text = data["text"]
    #     message = db_client.add(
    #         "message", sender_id=sender_id, receiver_id=receiver_id, text=text
    #     )
    #     recipient_sid = online_users.get(receiver_id, None)

    #     if recipient_sid and message:
    #         data["created_at"] = message.to_json().created_at
    #         self.emit("message", data, room=recipient_sid)
    #     else:
    #         db_client.update("message", message.id, type="pending")

    # def message(self, data):
    #     sender_id = data['sender_id']
    #     receiver_id = data['receiver_id']
    #     room_id = data['room_id']
    #     text = data['text']
    #     message = Message(sender_id=sender_id, receiver_id=receiver_id, text=text, room_id=room_id)
    #     db_client.add(message)
    #     self.emit('message', text, room=room_id)

    def on_users(self, data):
        if data:
            print(data)
        # user = session["user_id"]
        o_users = [user for user in online_users.keys()]
        print(online_users, o_users)
        emit('users', o_users, broadcast=True)

    def on_send_message(self, data):
        receiver_id = data["receiver_id"]
        recipient_sid = online_users.get(receiver_id, None)
        print(recipient_sid, data)

        self.emit("receive_message", data, room=recipient_sid)
