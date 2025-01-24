"""Patient Class"""

from sqlalchemy import Column, String, ForeignKey
from sqlalchemy.orm import relationship
from models.user import User


class Patient(User):
    __tablename__ = "patients"

    __mapper_args__ = {
        "polymorphic_identity": "patients",
    }

    name = Column(String(20), default="patient")
    id = Column(String(40), ForeignKey("users.id"), primary_key=True)
    appointments = relationship(
        "Appointment", backref="patient", cascade="delete"
    )
    diagnoses = relationship("Diagnosis", backref="patient", cascade="delete")

    def get_name(self):
        return f"{self.first_name} {self.last_name}"
