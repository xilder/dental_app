#!/usr/bin/env python3
"""DB module"""
from typing import Union
from models.user import User
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy.orm.session import Session
from models.base import Base
import os


username = os.getenv('DB_USERNAME') or 'dami'
passwd = os.getenv('DB_PASSWD') or 'testing'
db = os.getenv('DB_NAME') or'epitome_test_db'
host = os.getenv('DB_HOST') or 'localhost'
SQLALCHEMY_DATABASE_URI = f'mysql+mysqldb://{username}:{passwd}@{host}/{db}'


T = Union[User]
classes = {
    'user': User
}

class DBClient:
    """DB class"""

    def __init__(self) -> None:
        """initialises a new DB instance"""
        self._engine = create_engine(SQLALCHEMY_DATABASE_URI)
        Base.metadata.create_all(self._engine)
        self.__session = None

    @property
    def _session(self) -> Session:
        """Memoised session object"""
        if self.__session is None:
            DBSession = sessionmaker(bind=self._engine)
            self.__session = DBSession()
        return self.__session

    def add(self, obj: T) -> T:
        """adds a new object to the database"""
        try:
            self._session.add(obj)
            self._session.commit()
        except Exception:
            self._session.rollback()
            return None

    def find_obj_by(self, cls: str, **query: dict):
        """returns the obj that matches the query"""
        try:
            return self._session.query(classes[cls]).filter_by(**query)
        except Exception:
            return None

    def find_user(self, cls: str, **kwargs: dict) -> T:
        """returns queried user"""
        email = kwargs.get('email')
        username = kwargs.get('username')
        user = self.find_obj_by(cls, email=email).first()
        if not user:
            user = self.find_obj_by(cls, username=username).first()
        return user

    def update(self, cls: str, obj_id: str, **kwargs) -> T:
        """updates an object"""
        try:
            obj = self.find_obj_by(cls, id=obj_id).first()
            obj.update(**kwargs)
            self.add(obj)
            return True
        except Exception as e:
            self._session.rollback()
            raise Exception('failed update')
            # return False

    def delete_obj(self, id: str) -> bool:
        """deletes an object from the database"""
        try:
            user = self.find_obj_by('user', id=id).first()
            self._session.delete(user)
            self._session.commit()
            return True
        except Exception:
            self._session.rollback()
            return False

    def reset_database(self):
        """resets database"""
        if db == 'epitome_test_db':
            Base.metadata.drop_all(self._engine)
            Base.metadata.create_all(self._engine)
        return None

    def close(self):
        """ends session"""
        self._session.close()

db_client = DBClient()
