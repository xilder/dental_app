import unittest
import requests
from config import config
from models.engine.auth import Auth


conf = config['dev']
URL = conf.URL
AUTH = Auth()

class TestApp(unittest.TestCase):
    """test the app"""

    @classmethod
    def setUpClass(cls):
        AUTH.reset_database()

    @classmethod
    def tearDownClass(cls):
        AUTH.close_db()

    def test_hello(self):
        """returns a greeting to show server is alive"""
        r = requests.get(f'{URL}/hello')
        response = r.json()
        message = response.get('message')
        self.assertEqual(r.status_code, 200)
        self.assertEqual(message, 'Hello there')

    # def test_page_not_found(self):
    #     """returns error 404 if url invalid"""
    #     r = requests.get(f'{URL}/hello')
    #     response = r.json()
    #     message = response.get('message')
    #     self.assertEqual(r.status_code, 200)
    #     self.assertEqual(message, 'Hello there')
