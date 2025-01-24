#!usr/bin/python3
from faker import Faker
fake = Faker()

class TestModel:
    """models for testing"""
    def __init__(self):
        self.first_name = fake.first_name()
        self.last_name = fake.last_name()
        self.email = fake.email()
        self.username = fake.user_name()
        self.password = fake.password(length=15, lower_case=True, upper_case=True, special_chars=True, digits=True)

    def to_json(self):
        new_dict = self.__dict__.copy()
        return new_dict


class AppointmentModel():
    """properties for users"""
    def __init__(self):
        self.complaints = fake.sentence()
        self.additional_info = fake.sentence()
        self.hypertension = fake.boolean()
        self.diabetes = fake.boolean()
        self.sickle_cell = fake.boolean()
        self.asthma = fake.boolean()
        self.PUD = fake.boolean()
        self.SLE = fake.boolean()
        self.epilepsy = fake.boolean()
        self.allergies = fake.boolean()
        if self.allergies:
            self.allergies_info = fake.sentence()
        self.others = fake.sentence()
        self.appointment_time = fake.date_time_this_month().isoformat()

    def to_json(self):
        new_dict = self.__dict__.copy()
        return new_dict