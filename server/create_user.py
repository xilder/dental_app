# from pprint import pprint
# import secrets
# import json
from tests.test_models.test_engine.test_model import (
    # TestModel,
    # DocModel,
    # AppointmentModel,
    MessageModel
)
from models.engine.db import db_client
# from models.user import User

# params = TestModel().to_json()
# print(params)
# r = requests.post('http://localhost:5000/api/v1/auth/login',
#                   json={'data': 'jeremy', 'password': 'eget'})
# print(r.json())
# MAX = 15
# MUL = 4 

# try:
#     doctors = []
#     patients = []
#     a = 0

#     for i in range(MAX):
#         try:
#             d_params = DocModel().to_json()
#             doctor = db_client.add("doctor", **d_params)
#             d_params['id'] = doctor.id
#             doctors.append(d_params)
#             a += 1
#             for j in range(MUL):
#                 p_params = TestModel().to_json()
#                 patient = db_client.add("patient", **p_params)
#                 p_params['id'] = patient.id
#                 patients.append(p_params)
#                 a += 1
#                 print(a)
#         except Exception:
#             continue


#     with open('info.json', 'w') as f:
#         data = {
#             "doctors": doctors,
#             "patients": patients
#         }
#         docs = json.dumps(data, indent=2)
#         f.write(docs)

#     for i in range(200):
#         a = AppointmentModel().to_json()
#         doctor = doctors[secrets.randbelow(MAX)]
#         patient = patients[secrets.randbelow(MAX * MUL)]
#         appointment = db_client.add('appointment', **a, doctor_id=doctor['id'],     patient_id=patient['id'])
# except Exception as e:
#     print(e)

for i in range(1000):
    mesage = MessageModel().to_json()
    m = db_client.add('message', **mesage)
    print(m.to_json())



# all = db_client.find_obj_by(cls='user').all()
# for a in all:
#     print(f'{a.first_name} {a.last_name} is one of my {a.name}')

# print(all)


# d_params = TestModel().to_json()
# doctor = db_client.add("doctor", **d_params)
# print(doctor.id)