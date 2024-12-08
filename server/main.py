#!/usr/bin/env python3
from models.base import BaseModel
from models.user import User
from server.api.app import db
TIME_FORMAT = '%a - %B %d, %Y - %H:%M:%S'
# TZ = pytz.timezone('Africa/Lagos')
db.create_all

user = User()
db.session.add(user)
db.session.commit()

print(user)