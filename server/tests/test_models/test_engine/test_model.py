#!usr/bin/python3
from faker import Faker

fake = Faker()


class TestModel:
    """models for testing"""

    def __init__(self):
        self.sex = fake.random_element(elements=["M", "F"])
        self.first_name = (
            fake.first_name_male()
            if self.sex == "M"
            else fake.first_name_female()
        )
        self.last_name = fake.last_name()
        self.email = fake.email()
        self.username = fake.user_name()
        self.password = fake.password(
            length=15,
            lower_case=True,
            upper_case=True,
            special_chars=True,
            digits=True,
        )

    def to_json(self):
        new_dict = self.__dict__.copy()
        return new_dict


ranks = [
    "House Officer",
    "Medical Officer",
    "Registrar",
    "Senior Registrar",
    "Consultant",
]


class DocModel(TestModel):
    def __init__(self):
        super().__init__()
        self.about = fake.paragraph()
        self.rank = fake.random_element(elements=ranks)


class AppointmentModel:
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
