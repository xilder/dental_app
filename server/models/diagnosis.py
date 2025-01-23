"""Appointment Class"""

from sqlalchemy import Column, String, ForeignKey
from models.base import BaseModel, Base


class Diagnosis(BaseModel, Base):
    __tablename__ = "diagnoses"
    doctor_id = Column(String(40), ForeignKey("doctors.id"), nullable=False)
    patient_id = Column(String(40), ForeignKey("patients.id"), nullable=False)
    # time =
