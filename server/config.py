#!/usr/bin/env python3
"""Config Module"""
from datetime import timedelta
import os
from dotenv import load_dotenv
from redis import Redis


load_dotenv()

class Config():
    """Flask Base Config"""
    SECRET_KEY = os.getenv('SECRET_KEY')
    SQL_ALCHEMY_COMMIT_ON_TEARDOWN = os.getenv('SQL_ALCHEMY_COMMIT_ON_TEARDOWN')
    # MAIL_PREFIX = '[Epitome]'
    # MAIL_SENDER = 'Epitome Admin <kanieloutis@gmail.com>'
    ADMIN = os.getenv('ADMIN')

    # session variables
    SESSION_KEY_PREFIX = 'session:'
    PERMANENT_SESSION_LIFETIME = timedelta(days=1)
    SESSION_PERMANENT = True
    SESSION_TYPE = 'redis'
    SESSION_REDIS = Redis(host='localhost', port=6379)

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

config = {
    'dev': DevConfig,
    'prod': ProductionConfig,
}

