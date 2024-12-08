#!/usr/bin/env python3
"""User class"""
from models.base import BaseModel, Base
from sqlalchemy import Column, String, Boolean
from sqlalchemy.orm import relationship



class User(BaseModel, Base):
    """properties for users"""
    __tablename__ = 'users'

    first_name = Column(String(30), nullable=False)
    last_name = Column(String(30), nullable=False)
    email = Column(String(60), unique=True, index=True, nullable=False)
    username = Column(String(60), unique=True, index=True, nullable=False)
    password = Column(String(60), nullable=False)
    token = Column(String(100), default='')
    session = Column(String(60), default='')
    authenticated = Column(Boolean, default=False)
    confirmed = Column(Boolean, default=False)
    messages = relationship('Message', backref='user')
