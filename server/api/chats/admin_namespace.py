from flask_socketio import Namespace

class AdminNamespace(Namespace):
    def on_connect(self):
        print('Admin Namespace connected')
