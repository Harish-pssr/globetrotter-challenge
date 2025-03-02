from sqlalchemy import Column, Integer, String
from sqlalchemy.dialects.postgresql import JSONB
from app.models.base import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(50), unique=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    score = Column(Integer, default=0)
    incorrect_attempts = Column(Integer, default=0)  # Tracks incorrect answers
    played_destinations = Column(JSONB, default=[])  # Store played destination IDs as a JSON array
