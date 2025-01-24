"""Appointment class"""

from datetime import datetime
from models.base import BaseModel, Base
import pytz
from sqlalchemy import (
    Column,
    String,
    ForeignKey,
    DateTime,
    Enum,
    Boolean,
    Text,
)

TIME_FORMAT = "%H:%M:%S %a - %B %d, %Y"
TZ = pytz.timezone("Africa/Lagos")


class Appointment(BaseModel, Base):
    """properties for users"""

    __tablename__ = "appointments"

    patient_id = Column(String(60), ForeignKey("patients.id"), nullable=False)
    doctor_id = Column(String(60), ForeignKey("doctors.id"), nullable=False)
    status = Column(
        Enum("pending", "accepted", "fulfilled", "rejected", "missed"),
        nullable=False,
        default="pending",
    )
    type = Column(
        Enum("Video call", "Voice call", "Chat"),
        nullable=False,
        default="Chat",
    )
    complaints = Column(Text, nullable=True)
    additional_info = Column(Text, nullable=True)
    hypertension = Column(Boolean, default=False)
    diabetes = Column(Boolean, default=False)
    sickle_cell = Column(Boolean, default=False)
    asthma = Column(Boolean, default=False)
    PUD = Column(Boolean, default=False)
    SLE = Column(Boolean, default=False)
    epilepsy = Column(Boolean, default=False)
    allergies = Column(Boolean, default=False)
    allergies_info = Column(Text, nullable=True)
    others = Column(Text, nullable=True)
    appointment_time = Column(DateTime, nullable=True)
    doctor_comment = Column(Text, nullable=True)
    care_given = Column(Text, nullable=True)
    diagnosis = Column(Text, nullable=True)

    def __init__(self, *_, **kwargs):
        """return an instance of the appointment class"""
        super().__init__(**kwargs)
        try:
            if 'appointment_time' in kwargs:
                self.appointment_time = datetime.fromisoformat(kwargs['appointment_time']).astimezone(TZ)
        except Exception:
            self.appointment_time = None
