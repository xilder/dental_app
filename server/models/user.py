#!/usr/bin/env python3
"""User class"""

from models.base import BaseModel, Base
from models.messages import Message
from sqlalchemy import Column, String, Boolean
from sqlalchemy.orm import relationship


class User(BaseModel, Base):
    """properties for users"""

    __tablename__ = "users"
    __mapper_args__ = {
        "polymorphic_identity": "users",
        "polymorphic_on": "type",
    }

    first_name = Column(String(30), nullable=False)
    last_name = Column(String(30), nullable=False)
    email = Column(String(60), unique=True, index=True, nullable=False)
    username = Column(String(60), unique=True, index=True, nullable=False)
    password = Column(String(60), nullable=False)
    token = Column(String(100), default="")
    session = Column(String(60), default="")
    authenticated = Column(Boolean, default=False)
    confirmed = Column(Boolean, default=False)
    messages_sent = relationship(
        "Message",
        backref="sender",
        foreign_keys=[Message.sender_id],
        cascade="delete",
    )
    messages_received = relationship(
        "Message",
        backref="receiver",
        foreign_keys=[Message.receiver_id],
        cascade="delete",
    )
    type = Column(String(50), nullable=False)

    def get_name(self):
        return f"{self.first_name} {self.last_name}"
