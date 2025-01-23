#!/usr/bin/env python3
"""DB module"""

from typing import Any, Union, Optional
from models.user import User
from models.doctor import Doctor
from models.patient import Patient
from models.messages import Message
from models.appointment import Appointment
from models.diagnosis import Diagnosis
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, Query
from sqlalchemy.orm.session import Session
from models.base import Base
from typing import Type
import os


username = os.getenv("DB_USERNAME") or "dami"
passwd = os.getenv("DB_PASSWD") or "testing"
db = os.getenv("DB_NAME") or "epitome_test_db"
host = os.getenv("DB_HOST") or "localhost"
SQLALCHEMY_DATABASE_URI = f"mysql+mysqldb://{username}:{passwd}@{host}/{db}"

T = Union[User, Patient, Doctor, Message, Appointment, Diagnosis]
classes: dict[str, Type[T]] = {
    "user": User,
    "patient": Patient,
    "doctor": Doctor,
    "message": Message,
    "appointment": Appointment,
    "diagnosis": Diagnosis,
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

    def add(self, cls: str, **kwargs: Any) -> Optional[T]:
        """adds a new object to the database"""
        try:
            obj = classes[cls](**kwargs)
            self._session.add(obj)
            self._session.commit()
            return obj
        except Exception as e:
            self._session.rollback()
            print(e)
            return None

    def find_obj_by(self, cls: str, **query: Any) -> Query[T]:
        """returns the obj that matches the query"""
        return self._session.query(classes[cls]).filter_by(**query)

    def find_user_by(self, cls="patient", **kwargs: Any) -> Optional[User]:
        """returns queried user"""
        user = self.find_obj_by(cls=cls, **kwargs).first()
        if not isinstance(user, User):
            return None
        return user

    def find_user_by_login(
        self, cls="patient", **kwargs: Any
    ) -> Optional[User]:
        """returns queried user"""
        email = kwargs.get("email")
        username = kwargs.get("username")
        user = self.find_obj_by(cls=cls, email=email).first()
        if not user:
            user = self.find_obj_by(cls=cls, username=username).first()
        if not isinstance(user, User):
            return None
        return user

    def update(self, cls: str, id: str, **kwargs: Any) -> Optional[T]:
        """updates an object"""
        try:
            obj = self.find_obj_by(cls, id=id).first()
            if not obj:
                return None
            obj.update_self(**kwargs)
            self._session.add(obj)
            self._session.commit()
            return obj
        except Exception:
            self._session.rollback()
            return None

    def get_name_by_id(self, id: str, cls: str = 'user') -> Optional[str]:
        """returns the name of the object"""
        obj = self.find_obj_by(cls, id=id).first()
        if not obj or not isinstance(obj, User):
            return None
        return obj.get_name()

    def delete_obj(self, id: str) -> bool:
        """deletes an object from the database"""
        try:
            obj = self.find_obj_by("user", id=id).first()
            if not obj:
                return False
            self._session.delete(obj)
            self._session.commit()
            return True
        except Exception:
            self._session.rollback()
            return False

    def reset_database(self):
        """resets database"""
        if db == "epitome_test_db":
            Base.metadata.drop_all(self._engine)
            Base.metadata.create_all(self._engine)
        return None

    def close(self):
        """ends session"""
        self._session.close()


db_client = DBClient()
