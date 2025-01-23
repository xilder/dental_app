#!/usr/bin/env python3
"""Config Module"""
from datetime import timedelta
import os
from dotenv import load_dotenv
from redis import Redis
import secrets


load_dotenv()

class Config():
    """Flask Base Config"""
    # SECRET_KEY = os.getenv('SECRET_KEY')
    SQL_ALCHEMY_COMMIT_ON_TEARDOWN = os.getenv('SQL_ALCHEMY_COMMIT_ON_TEARDOWN')
    # MAIL_PREFIX = '[Epitome]'
    # MAIL_SENDER = 'Epitome Admin <kanieloutis@gmail.com>'
    ADMIN = os.getenv('ADMIN')

    # session variables
    # SESSION_KEY_PREFIX = 'session:'
    PERMANENT_SESSION_LIFETIME = timedelta(days=1)
    SESSION_PERMANENT = True
    SESSION_TYPE = 'redis'
    SESSION_REDIS = Redis(host='localhost', port=6379)
    SECRET_KEY = b"\xd8\x7f\x0e<q'\xf4\xb5\x86-\x80\x08\\vK\xef\x86\x8a\x93\xdb\x9b>\xb8\x98\x81 \xaa\xfe\xcd\xe6\xb06"
    SECURITY_PASSWORD_SALT = b'\x9ci\\\x05\x921iZ\xd8m\xe9\x82&\xae|,\xeb\xfd+N\xfa\x88\x18\xb9\xdc\x82t$\x889\x82-'
    CELERY_BROKER_URL = 'redis://localhost:6379/1'
    MAIL_SERVER = 'smtp.gmail.com'
    MAIL_PORT = 587
    # MAIL_USERNAME = ''
    MAIL_PASSWORD = 'gtwf wkcc ifpk ethw'
    MAIL_DEFAULT_SENDER = 'olabowaleayobami@gmail.com'
    MAIL_USERNAME = 'olabowaleayobami@gmail.com'
    MAIL_USE_TLS = True
    # CELERY_RESULT_BACKEND = 'redis://localhost:6379/1'

class DevConfig(Config):
    """Flask Development Config Class"""
    DB_USERNAME = 'dev'
    DB_PASSWD = 'testing'
    DB_NAME = 'epitome_test_db'
    DB_HOST = 'localhost'
    SQLALCHEMY_DATABASE_URI = f'mysql+mysqldb://{DB_NAME}:{DB_PASSWD}@{DB_HOST}{DB_NAME}'
    HOST = 'http://localhost'
    PORT = 5000
    URL = f'{HOST}:{PORT}'

class ProductionConfig(Config):
    """Flask Production Config Class"""
    DB_USERNAME = os.getenv('DB_USERNAME')
    DB_PASSWD = os.getenv('DB_PASSWD')
    DB_NAME = os.getenv('DB_NAME')
    DB_HOST = os.getenv('DB_HOST')
    SQLALCHEMY_DATABASE_URI = f'mysql+mysqldb://{DB_NAME}:{DB_PASSWD}@{DB_HOST}{DB_NAME}'
    DEBUG = False

class Configurations():
    def __init__(self):
        self.dev = DevConfig()
        self. prod = ProductionConfig()

config = Configurations()
