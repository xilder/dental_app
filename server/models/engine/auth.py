#!usr/bin/python3
from uuid import uuid4
from sqlalchemy.orm.exc import NoResultFound
from models.engine.db import db_client
from bcrypt import checkpw, hashpw, gensalt
from models.user import User
# from flask import session

def _hash_password(password: str) -> bytes:
    """returns the hashed value of a password"""
    return hashpw(password.encode('utf-8'), gensalt())

def _generate_uuid() -> str:
    """returns the string value of a uuid"""
    return str(uuid4())

def generate_confirmation_token() -> str:
    """"""

class Auth:
    """handles the authentication process of this app"""
    def __init__(self):
        """initialises an instance of the Auth class"""
        self._db = db_client

    def require_auth(self, path: str, excluded_paths: list[str]):
        """return true if path requires authentication"""
        if not path or not excluded_paths:
            return True

        if path in excluded_paths:
            return False

        for excluded_path in excluded_paths:
            if excluded_path.startswith(path):
                return False
            elif path.startswith(excluded_path):
                return False
            elif excluded_path[-1] == '*':
                if path.startswith(excluded_path[:-1]):
                    return False

        return True

    def register_user(self, **kwargs: dict) -> User:
        """registers a new user"""
        email = kwargs.get('email')
        username = kwargs.get('username')
        password = _hash_password(kwargs.get('password'))
        kwargs['password'] = password
        try:
            if self._db.find_obj_by('user', email=email).first():
                raise ValueError(f"{email} is registered email")
            if self._db.find_obj_by('user', username=username).first():
                raise ValueError(f"{username} is a registered username")
        except NoResultFound:
            pass

        user = User(**kwargs)
        id = user.id
        self._db.add(user)
        x_user = self._db.find_obj_by('user', id=id).first()
        return x_user

    def valid_login(self, **kwargs: dict) -> User:
        """returns true if user's credentials are valid"""
        user = self._db.find_user('user', **kwargs)
        if not user:
            return None
        password = kwargs.get('password', None)
        if not password:
            return None
        if checkpw(password.encode('utf-8'), user.password.encode('utf-8')):
            return user
        return None

    # def create_session(self, email: str) -> str:
    #     try:
    #         user = self._db.find_obj_by(email=email).first()
    #         session_id = _generate_uuid()
    #         user.session_id = session_id
    #         return session_id
    #     except:
    #         return None

    # def get_user_from_session_id(self, session_id: str) -> User | None:
    #     """returns user from session"""
    #     try:
    #         if not session_id:
    #             return None
    #         user = self._db.find_obj_by('user', session_id=session_id).first()
    #         return user
    #     except Exception:
    #         return None

    # def destroy_session(self, user_id: str) -> User:
    #     """destroys a session by setting user session_id to None"""
    #     return self._db.update('user', user_id, session=None)

    def get_reset_password_token(self, email: str) -> str:
        """generates a reset token for retrieval of password"""
        try:
            user =  self._db.find_obj_by(email=email).first()
            token = _generate_uuid()
            self._db.update('user', user.id, reset_token=token)
            return token
        except Exception:
            return None

    def update_password(self, token: str, password: str) -> bool:
        """updates a user password"""
        try:
            user = self._db.find_obj_by('user', reset_token=token).first()
            hashed_password = _hash_password(password)
            self._db.update('user', user.id, password=hashed_password)
            return True
        except Exception:
            return False

    def delete_user(self, id: str):
        """deletes a user"""
        return self._db.delete_obj(id)

    def reset_database(self):
        """resets the datbase"""
        self._db.reset_database()

    def close_db(self):
        """closes database"""
        self._db.close()
