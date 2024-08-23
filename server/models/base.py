#!/usr/bin/env python3
"""Base Model Class"""
# from flask_sqlalchemy
from sqlalchemy import Column, DateTime, String
from sqlalchemy.ext.declarative import declarative_base
from datetime import datetime
from uuid import uuid4
import pytz


TIME_FORMAT = '%H:%M:%S %a - %B %d, %Y'
TZ = pytz.timezone('Africa/Lagos')
Base = declarative_base()

class BaseModel():
    """Base Model Class"""
    id = Column(String(40), primary_key=True)
    created_at = Column(DateTime, default=lambda: datetime.now(tz=TZ))
    updated_at = Column(DateTime, default=lambda: datetime.now(tz=TZ))

    def __init__(self, *_, **kwargs):
        f"""Initialises the {self.__class__.__name__} class"""
        self.id = str(uuid4())
        self.created_at = datetime.now(tz=TZ)
        self.updated_at = datetime.now(tz=TZ)

        if kwargs:
            for k, v in kwargs.items():
                if k == 'id' and type(v) is str:
                    self.id = kwargs.get('id', self.id)

                elif k == 'created_at' and type(v) is str:
                    self.created_at = datetime.strptime(
                        kwargs.get('created_at'), TIME_FORMAT)

                elif k == 'updated_at' and type(v) is str:
                    self.updated_at = datetime.strptime(
                        kwargs.get('updated_at'), TIME_FORMAT)

                else:
                    if hasattr(self, k):
                        setattr(self, k, v)

        else:
            self.id = str(uuid4())
            self.created_at = datetime.now(tz=TZ)
            self.updated_at = datetime.now(tz=TZ)


    def update(self, **kwargs: dict):
        """updates self"""
        for k, v in kwargs.items():
            if not hasattr(self, k):
                raise ValueError
            setattr(self, k, v)
        self.updated_at = datetime.now(tz=TZ)

    def __str__(self):
        f"""The {self.__class__.__name__} string representation"""
        attr_list = [f'{k}: {v}' for k, v in self.to_json().items()]
        return '[{}]: ({})\n\t{}'.format(
            self.__class__.__name__,
            self.id,
            '\n\t'.join(attr_list))

    def to_json(self):
        f"""Returns the {self.__class__.__name__} object representation"""
        new_obj = self.__dict__.copy()
        for k, v in new_obj.items():
            if k in ['created_at', 'updated_at']:
                new_obj[k] = v.strftime(TIME_FORMAT)
        if 'password' in new_obj:
            del new_obj['password']
        del new_obj['_sa_instance_state']
        return new_obj
