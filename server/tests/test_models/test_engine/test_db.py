#!usr/bin/python3
from models.engine.db import db_client
from models.user import User
from tests.test_models.test_engine.test_model import TestModel
import unittest


class TestDB(unittest.TestCase):

    def setUp(self) -> None:
        """reset database for each test"""
        db_client.reset_database()

    def tearDown(self) -> None:
        """closes database"""
        db_client.close()

    def test_create(self):
        """test cases for creating objects"""
        params = TestModel().to_json()
        user = User(**params)
        db_client.add(user)
        obj = db_client.find_obj_by('user', id=user.id).first()
        if obj is not None:
            self.assertEqual(type(obj), User)

    def test_update(self):
        """test cases for updating object"""
        params = TestModel().to_json()
        user = User(**params)

        db_client.add(user)
        db_client.update('user', user.id, first_name='dam')
        updated_user = db_client.find_obj_by('user', id=user.id).first()
        if updated_user is not None:
            self.assertEqual(updated_user.first_name, 'dam')

    def test_delete(self):
        """delete objects"""
        params = TestModel().to_json()
        user = User(**params)
        db_client.add(user)
        user1 = db_client.find_obj_by('user', id=user.id).first()
        if user1 is not None:
            self.assertEqual(user, user1)
            db_client.delete_obj(user.id)
            user2 = db_client.find_obj_by('user', id=user.id).first()
            self.assertIsNone(user2)

    # def test_delete_all(self):
    #     db_client.drop_all()
    #     doctor1 = db_client.find_obj_by('user')
    #     self.assertIsNone(user)

if __name__ == "__main__":
    unittest.main()
