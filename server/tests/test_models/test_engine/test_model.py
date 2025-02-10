#!usr/bin/python3
from faker import Faker

fake = Faker()


ranks = [
    "House Officer",
    "Medical Officer",
    "Registrar",
    "Senior Registrar",
    "Consultant",
]


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


message_types = ["delivered", "pending"]

chat_list = [
    [
        "072ec456-b644-4c5e-8531-3d9118ef09c5",
        "aa419f66-a7a0-4274-b7fa-f4ee15b1239d",
        "17abea2e-b8f4-4944-8625-bca2ab26ab90",
        "e48fa429-94c4-4f4b-99c3-3c1f0fcac218",
    ],
    [
        "c325d6b1-12b5-4b40-9041-0eead0ce6fe6",
        "aa8854e1-4f56-4cd1-bae1-d69a5a5b0171",
        "724d2920-efec-4c2f-b80c-b6a7ceb51bee",
        "eee6bbe2-5929-4209-b636-1ce1bb3c4f09",
        "4ac9cd5d-8761-4827-9bfb-011303c4a466",
        "bfc3244e-3bd7-4ddd-b768-02ae77871037",
    ],
]


class MessageModel:
    """porperties for messages"""

    def __init__(self):
        # i, j = (0, 1) if n % 2 == 0 else (1, 0)
        self.text = fake.sentence()
        self.type = fake.random_element(elements=message_types)
        self.sender_id = fake.random_element(elements=chat_list[1])
        self.receiver_id = fake.random_element(elements=chat_list[0])
        self.created_at = fake.date_time_between(start_date="-3d").isoformat(
            timespec="minutes"
        )

    def to_json(self):
        new_dict = self.__dict__.copy()
        return new_dict
