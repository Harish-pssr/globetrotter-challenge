from sqlalchemy import Column, Integer, String
from sqlalchemy.dialects.postgresql import JSONB
from app.models.base import Base

class Destination(Base):
    __tablename__ = "destinations"

    id = Column(Integer, primary_key=True, index=True)
    city = Column(String(100), unique=True, nullable=False)
    country = Column(String(100), nullable=False)
    clues = Column(JSONB, nullable=False)  # Store as JSONB array
    fun_fact = Column(JSONB, nullable=False)  # Store as JSONB array
    trivia = Column(JSONB, nullable=False)  # Store as JSONB array
