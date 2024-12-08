#!usr/bin/python3
from typing import Type
import forgery_py

class TestModel:
    """models for testing"""
    def __init__(self):
        self.first_name: str = forgery_py.name.first_name()
        self.last_name: str = forgery_py.name.last_name()
        self.email: str = forgery_py.internet.email_address()
        self.username: str = forgery_py.internet.user_name()
        self.password: str = forgery_py.lorem_ipsum.word()

    def to_json(self):
        new_dict = self.__dict__.copy()
        return new_dict