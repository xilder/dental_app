import requests
from tests.test_models.test_engine.test_model import TestModel

# params = TestModel().to_json()
# print(params)
r = requests.post('http://localhost:5000/api/v1/auth/login',
                  json={'data': 'jeremy', 'password': 'eget'})
print(r.json())