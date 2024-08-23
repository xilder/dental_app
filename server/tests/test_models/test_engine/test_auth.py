#!usr/bin/python3

from models.engine.auth import Auth
import unittest
from parameterized import parameterized
from models.user import User
from tests.test_models.test_engine.test_model import TestModel


AUTH = Auth()

class TestAuth(unittest.TestCase):
    """test cases for class Auth"""

    @classmethod
    def setUpClass(cls):
        AUTH.reset_database()

    @classmethod
    def tearDownClass(cls):
        AUTH.close_db()

    excluded_paths = ['/hello', '/api/v1/auth/login', '/api/v1/auth/register']

    @parameterized.expand(
        [
            ('hello', False),
            ('api/v1/auth/login', False),
            ('api/v1/auth/register', False),
            ('api/v1/auth/profile', True),
            ('api/v1/auth/profile/dami', True),
            ('awa', True)
        ]
    )
    def test_require_auth(self, path: str, result: bool):
        """tests the auth protected routes"""
        self.assertIs(AUTH.require_auth(f'/{path}', self.excluded_paths), result)

    def test_register_user(self):
        """check if a user is registered"""
        params = TestModel().to_json()
        try:
            user = AUTH.register_user(**params)
            self.assertIs(type(user), User)
            self.assertRaises(ValueError, lambda: AUTH.register_user(**params))
        except ValueError:
            self.assertRaises(ValueError, lambda: AUTH.register_user(**params))

    def test_valid_login(self):
        """checks the valid_login"""
        params = TestModel().to_json()
        try:
            _ = AUTH.register_user(**params)
            email = params.get('email')
            password = params.get('password')
            user1 = AUTH.valid_login(email=email, password='abc')
            self.assertIsNone(user1)
            user2 = AUTH.valid_login(email=email, password=password)
            self.assertEqual(user2.email, email)
        except ValueError:
            pass

    def test_delete_user(self):
        """tests if a user is deleted"""
        params = TestModel().to_json()
        try:
            _ = AUTH.register_user(**params)
            email = params.get('email')
            password = params.get('password')
            user = AUTH.valid_login(email=email, password=password)
            self.assertIs(type(user), User)
            AUTH.delete_user(user.id)
            user1 = AUTH.valid_login(email=email, password=password)
            self.assertIsNone(user1)
        except ValueError:
            pass

if __name__ == "__main__":
    unittest.main()
