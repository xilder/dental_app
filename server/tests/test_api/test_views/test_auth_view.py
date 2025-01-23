import unittest
import requests
import requests.cookies
from tests.test_models.test_engine.test_model import TestModel
from config import config
from models.engine.auth import Auth
# from models.engine.db import db_client

conf = config['dev']
URL = conf.URL
auth_route = 'api/v1/auth'
auth_url = f'{URL}/{auth_route}'
AUTH = Auth()

class TestAuth(unittest.TestCase):
    """test for the auth route"""

    @classmethod
    def setUpClass(cls):
        AUTH.reset_database()

    @classmethod
    def tearDownClass(cls):
        AUTH.close_db()

    def test_register(self):
        """test for the register route"""
        params = TestModel().to_json()
        r = requests.post(f'{auth_url}/register', json=params)
        if r.status_code == 400:
            self.assertEqual(r.status_code, 400)
        else:
            response = r.json()
            self.assertEqual(r.status_code, 201)
            self.assertEqual(params['first_name'], response.get('first_name'))

    def test_valid_login_by_email(self):
        """test login route by email"""
        params = TestModel().to_json()
        r = requests.post(f'{auth_url}/register', json=params)
        if r.status_code == 400:
            self.assertEqual(r.status_code, 400)
        else:
            self.assertEqual(r.status_code, 201)
            print('\n\tregistration successful')
            # response = r.json()
            print('\ttrying to log in using the email')
            r = requests.post(f'{auth_url}/login', json={'data': params['email'], 'password': params['password']})
            if r.status_code != 200:
                response = r.json()
                print('\tfailed registration')
                error = response.get('error')
                print(f'{error}')
            else:
                session = requests.Session()
                cookie = r.cookies.get('session')
                session.cookies.set('session', cookie)
                print("\ttesting test_path route")
                r = session.get(f'{URL}/test_path')
                response = r.json()
                message = response.get('message')
                print(f'\t{message}')
                username = response.get('username')
                session.close()
                self.assertEqual(username, params['username'])

    def test_valid_login_by_username(self):
        """test login route by username"""
        params = TestModel().to_json()
        r = requests.post(f'{auth_url}/register', json=params)
        if r.status_code == 400:
            self.assertEqual(r.status_code, 400)
        else:
            self.assertEqual(r.status_code, 201)
            print('\n\tregistration successful')
            # response = r.json()
            print('\ttrying to log in using the username')
            r = requests.post(f'{auth_url}/login', json={'data': params['username'], 'password': params['password']})
            if r.status_code != 200:
                response = r.json()
                print('\tfailed registration')
                error = response.get('error')
                print(f'\t{error}')
            else:
                session = requests.Session()
                cookie = r.cookies.get('session')
                session.cookies.set('session', cookie)
                print("\ttesting test_path route")
                r = session.get(f'{URL}/test_path')
                response = r.json()
                message = response.get('message')
                print(f'\t{message}')
                username = response.get('username')
                session.close()
                self.assertEqual(username, params['username'])

    def test_profile(self):
        """tests the profile route"""
        params = TestModel().to_json()
        r = requests.post(f'{auth_url}/register', json=params)
        if r.status_code == 400:
            self.assertEqual(r.status_code) == 400
        else:
            self.assertEqual(r.status_code, 201)
            print("\n\tregistration successful")
            r = requests.post(f'{auth_url}/login', json={'data': params['username'], 'password': params['password']})
            if r.status_code != 200:
                response = r.json()
                print('\tfailed registration')
                error = response.get('error')
                print(f'\t{error}')
            else:
                session = requests.Session()
                cookie = r.cookies.get('session')
                session.cookies.set('session', cookie)
                print("\ttesting profile route")
                r = session.get(f'{auth_url}/profile')
                response = r.json()
                username = response.get('username')
                print(f'\t{username} is logged in')
                session.close()
                self.assertEqual(username, params['username'])

    def test_logout(self):
        """tests the logout route"""
        params = TestModel().to_json()
        r = requests.post(f'{auth_url}/register', json=params)
        if r.status_code == 400:
            self.assertEqual(r.status_code) == 400
        else:
            self.assertEqual(r.status_code, 201)
            print("\n\tregistration successful")
            r = requests.post(f'{auth_url}/login', json={'data': params['username'], 'password': params['password']})
            if r.status_code != 200:
                response = r.json()
                print('\tfailed registration')
                error = response.get('error')
                print(f'\t{error}')
            else:
                session = requests.Session()
                cookie = r.cookies.get('session')
                session.cookies.set('session', cookie)
                print("\ttesting logout route")
                r = session.delete(f'{auth_url}/logout')
                self.assertEqual(r.status_code, 200)
                print('\taccessing auth-protected page after logging out')
                r = session.get(f'{auth_url}/profile')
                session.close()
                self.assertEqual(r.status_code, 403)

    def test_delete_user(self):
        """test the delete user rout"""
        params = TestModel().to_json()
        r = requests.post(f'{auth_url}/register', json=params)
        if r.status_code == 400:
            self.assertEqual(r.status_code) == 400
        else:
            self.assertEqual(r.status_code, 201)
            print("\n\tregistration successful")
            r = requests.post(f'{auth_url}/login', json={'data': params['username'], 'password': params['password']})
            if r.status_code != 200:
                response = r.json()
                print('\tfailed registration')
                error = response.get('error')
                print(f'\t{error}')
            else:
                session = requests.Session()
                cookie = r.cookies.get('session')
                session.cookies.set('session', cookie)
                print("\ttesting profile route")
                r = session.get(f'{auth_url}/profile')
                response = r.json()
                username = response.get('username')
                print(f'\t{username} is logged in')
                session.delete(f'{auth_url}/users')
                session.close()
                r = requests.post(f'{auth_url}/login', json={'data': params['username'], 'password': params['password']})
                self.assertEqual(r.status_code, 404)
