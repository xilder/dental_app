"""User class"""

from models.base import BaseModel, Base
from sqlalchemy import Column, String, Text, ForeignKey, Enum


class Message(BaseModel, Base):
    """properties for users"""

    __tablename__ = "messages"

    text = Column(Text)
    sender_id = Column(
        String(40), ForeignKey("users.id"), index=True, nullable=False
    )
    receiver_id = Column(
        String(40), ForeignKey("users.id"), index=True, nullable=False
    )
    type = Column(Enum("delivered", "pending"), default="delivered")
