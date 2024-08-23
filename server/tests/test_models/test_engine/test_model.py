#!usr/bin/python3
import forgery_py

class TestModel:
    """models for testing"""
    def __init__(self):
        self.first_name = forgery_py.name.first_name()
        self.last_name = forgery_py.name.last_name()
        self.email = forgery_py.internet.email_address()
        self.username = forgery_py.internet.user_name()
        self.password = forgery_py.lorem_ipsum.word()

    def to_json(self):
        new_dict = self.__dict__.copy()
        return new_dict