"""User class"""
from models.base import BaseModel, Base
from  sqlalchemy import Column, String, ForeignKey



class Message(BaseModel, Base):
    """properties for users"""
    __tablename__ = 'messages'

    text = Column(String)
    sender_id = Column(String, ForeignKey('users.id'), nullable=False)
    receiver_id = Column(String, ForeignKey('users.id'), nullable=False)
    room_id = Column(String, nullable=False)