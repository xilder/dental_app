#!/usr/bin/env python3
"""User class"""
from models.base import BaseModel, Base
from sqlalchemy import Column, String



class User(BaseModel, Base):
    """properties for users"""
    __tablename__ = 'users'

    first_name = Column(String(30), nullable=False)
    last_name = Column(String(30), nullable=False)
    email = Column(String(60), unique=True, index=True, nullable=False)
    username = Column(String(60), unique=True, index=True, nullable=False)
    password = Column(String(60), nullable=False)
    token = Column(String(60), nullable=True)
    session = Column(String(60), nullable=True)
    reset_token = Column(String(60), nullable=True)
