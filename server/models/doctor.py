"""Doctor Class"""

from sqlalchemy import ARRAY, Column, Enum, String, ForeignKey, Text
from sqlalchemy.ext.mutable import MutableList
from sqlalchemy.orm import relationship
from models.user import User


class Doctor(User):
    __tablename__ = "doctors"

    __mapper_args__ = {
        "polymorphic_identity": "doctors",
    }

    name = Column(String(20), default="doctor")
    id = Column(String(40), ForeignKey("users.id"), primary_key=True)
    rank = Column(
        Enum(
            "House Officer",
            "Medical Officer",
            "Registrar",
            "Senior Registrar",
            "Consultant",
        ),
        nullable=False, default="House Officer"
    )
    about = Column(Text, nullable=True)
    specialities = Column(MutableList.as_mutable(ARRAY(String)))
    appointments = relationship(
        "Appointment", backref="doctor", cascade="delete, delete-orphan"
    )
    diagnoses = relationship("Diagnosis", backref="doctor", cascade="delete")

    def get_name(self):
        return f"Dr. {self.first_name} {self.last_name}"
