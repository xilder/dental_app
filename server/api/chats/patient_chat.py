from flask import session
from flask_socketio import Namespace, join_room, leave_room, disconnect
from models.messages import Message
from models.engine.db import db_client

class Chat(Namespace):
    def on_connect(self):
        if not session['user_id']:
            disconnect()
        print("Client connected to namespace")

    def on_disconnect(self):
        disconnect()

    def on_my_event(self, data):
        result = 1
        for i in data:
            result *= i
        self.emit('response', result)
    def on_hello(self, data):
        print("Received data:", data)
        # Emit an event to all clients in this namespace
        result = 1
        print(data)
        for i in data:
            result = result * i
        self.emit('response', {'message': result})

    def on_patient_join_chat_room(self, data):
        patient = session['user']
        doctor_id = data['doctor_id']
        chat_room = f'room_{patient.id}_{doctor_id}'
        join_room(chat_room)
        self.emit('joined_room', f'{patient.first_name} joined room', room=chat_room)

    def on_doctor_join_chat_room(self, data):
        doctor = session['user']
        patient_id = data['patient_id']
        chat_room = f'room_{patient_id}_{doctor.id}'
        join_room(chat_room)
        self.emit('joined_room', f'{doctor.first_name} joined room', room=chat_room)

    def message(self, data):
        sender_id = data['sender_id']
        receiver_id = data['receiver_id']
        room_id = data['room_id']
        text = data['text']
        message = Message(sender_id=sender_id, receiver_id=receiver_id, text=text, room_id=room_id)
        db_client.add(message)
        self.emit('message', text, room=room_id)

