#!usr/bin/python3
from uuid import uuid4
from errors.account_error import UnconfirmedAccountError
from sqlalchemy.orm.exc import NoResultFound
from models.engine.db import db_client
from bcrypt import checkpw, hashpw, gensalt
from models.user import User
from itsdangerous import BadSignature, SignatureExpired, URLSafeTimedSerializer
from config import config
# from flask import session


def _hash_password(password: str) -> bytes:
    """returns the hashed value of a password"""
    return hashpw(password.encode("utf-8"), gensalt())


def _generate_uuid() -> str:
    """returns the string value of a uuid"""
    return str(uuid4())


def verify_token(token):
    try:
        serialiser = URLSafeTimedSerializer(config.dev.SECRET_KEY)
        email = serialiser.loads(
        token, salt=config.dev.SECURITY_PASSWORD_SALT, max_age=3600
        )
        return email
    except BadSignature as e:
        raise e
    except SignatureExpired as e:
        raise e


def generate_confirmation_token(email) -> str:
    """Generates a signed confirmation token"""
    serialiser = URLSafeTimedSerializer(config.dev.SECRET_KEY)
    token = serialiser.dumps(email, salt=config.dev.SECURITY_PASSWORD_SALT)
    return token


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
            elif excluded_path[-1] == "*":
                if path.startswith(excluded_path[:-1]):
                    return False

        return True

    def register_user(self, **kwargs: dict) -> User:
        """registers a new user"""
        email = kwargs.get("email")
        username = kwargs.get("username")
        password = _hash_password(kwargs.get("password"))
        kwargs["password"] = password
        try:
            if self._db.find_obj_by("user", email=email).first():
                raise ValueError(f"{email} is registered email")
            if self._db.find_obj_by("user", username=username).first():
                raise ValueError(f"{username} is a registered username")
        except NoResultFound:
            pass

        user = User(**kwargs)
        id = user.id
        self._db.add(user)
        x_user = self._db.find_obj_by("user", id=id).first()
        return x_user

    def update(self, id, **params):
        return self._db.update(cls="user", obj_id=id, **params)

    def valid_login(self, **kwargs: dict) -> User:
        """returns true if user's credentials are valid"""
        try:
            user = self._db.find_user("user", **kwargs)
            if not user.confirmed:
                raise UnconfirmedAccountError('Please check your email for  confirmation link')
            if not user:
                return None
            password = kwargs.get("password", None)
            if not password:
                return None
            if checkpw(password.encode("utf-8"), user.password.encode("utf-8")):
                return user
            return None
        except Exception as e:
            raise e

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

    def get_reset_token(self, email: str) -> str:
        """generates a reset token"""
        try:
            user = self._db.find_obj_by('user', email=email).first()
            token = generate_confirmation_token(email)
            # if token is None:
            #     raise ValueError
            success = self._db.update("user", user.id, token=token)
            if not success:
                raise Exception('failed update')
            return token
        except Exception as e:
            raise e
            # return None

    def get_user_from_token(self, token) -> User | None:
        """returns a user id token is valid"""
        try:
            verified = verify_token(token)
            return self._db.find_obj_by("user", email=verified).first()
        except SignatureExpired as e:
            from tasks.accounts_task import send_verification_message
            user = self._db.find_obj_by("user", token=token).first()
            send_verification_message(user)
            raise e
        except Exception as e:
            raise e
            # return None

    def update_password(self, token: str, password: str) -> bool:
        """updates a user password"""
        try:
            user = self._db.find_obj_by("user", token=token).first()
            self._db.update(
                "user", user.id, password=_hash_password(password), token=None
            )
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
