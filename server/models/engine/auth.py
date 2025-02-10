#!usr/bin/python3
from typing import Any
from bcrypt import checkpw
from sqlalchemy.exc import NoResultFound
# from errors.account_error import UnconfirmedAccountError
from models.engine.db import db_client, UserTypes
from itsdangerous import BadSignature, SignatureExpired, URLSafeTimedSerializer
from config import config


def verify_token(token: str):
    try:
        serialiser = URLSafeTimedSerializer(config.dev.SECRET_KEY)
        email = serialiser.loads(
            token, salt=config.dev.SECURITY_PASSWORD_SALT, max_age=3600
        )
        return email
    except BadSignature as e:
        raise e


def generate_confirmation_token(email: str) -> str:
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

    def find_user_by(self, cls: UserTypes = "patient", **query: Any):
        """returns a user"""
        return self._db.find_user_by(cls=cls, **query)

    def register_user(self, cls: UserTypes, **kwargs: Any):
        """registers a new user"""
        email, username = (
            kwargs["email"],
            kwargs["username"],
        )
        try:
            if self._db.find_obj_by(cls, email=email).first():
                raise ValueError(f"{email} is registered email")
            if self._db.find_obj_by(cls, username=username).first():
                raise ValueError(f"{username} is a registered username")
        except NoResultFound:
            pass
        user = self._db.add(cls=cls, **kwargs)
        if not user:
            return None
        x_user = self._db.find_user_by(cls=cls, id=user.id)
        return x_user

    def update(self, id, cls: UserTypes = "patient", **kwargs: Any):
        return self._db.update(cls=cls, obj_id=id, **kwargs)

    def valid_login(self, cls: UserTypes = "patient", **kwargs):
        """returns true if user's credentials are valid"""
        try:
            user = self._db.find_user_by_login(cls=cls, **kwargs)
            # if not user.confirmed:
            #     raise UnconfirmedAccountError(
            #         "Please check your email for  confirmation link"
            #     )
            if not user:
                return None
            password = kwargs.get("password", None)
            if not password:
                return None
            if checkpw(
                password.encode("utf-8"), user.password.encode("utf-8")
            ):
                return user
            return None
        except Exception:
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
    #         user = self._db.find_obj_by(
    #             'user', session_id=session_id
    #                  ).first()
    #         return user
    #     except Exception:
    #         return None

    # def destroy_session(self, user_id: str) -> User:
    #     """destroys a session by setting user session_id to None"""
    #     return self._db.update('user', user_id, session=None)

    def get_reset_token(self, email: str, cls: UserTypes = "patient"):
        """generates a reset token"""
        user = self._db.find_user_by(cls=cls, email=email)
        if not user:
            return None
        token = generate_confirmation_token(email)
        update_status = self._db.update(cls=cls, id=str(user.id), token=token)
        if not update_status:
            return None
        return token

    def get_user_from_token(self, token: str, cls: UserTypes = "patient"):
        """returns a user id token is valid"""
        try:
            verified = verify_token(token)
            user = self._db.find_user_by(cls=cls, email=verified)
            return user
        except SignatureExpired as e:
            from tasks.accounts_task import send_verification_message

            user = self._db.find_user_by(cls=cls, token=token)
            if not user:
                raise BadSignature("Invalid token")
            send_verification_message(user)
            raise e
        except Exception:
            return None

    def update_password(
        self, token: str, password: str, cls: UserTypes = "patient"
    ):
        """updates a user password"""
        user = self._db.find_user_by(cls=cls, token=token)
        if not user:
            return False
        updated_user = self._db.update(
            cls="user",
            id=str(user.id),
            password=password,
            token=None,
        )
        if not updated_user:
            return False
        return True

    def delete_user(self, id: str):
        """deletes a user"""
        return self._db.delete_obj(id)

    def reset_database(self):
        """resets the datbase"""
        self._db.reset_database()

    def close_db(self):
        """closes database"""
        self._db.close()
