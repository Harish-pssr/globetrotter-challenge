from sqlalchemy import Column, Integer, ForeignKey
from sqlalchemy.orm import relationship
from app.models.base import Base

class GameSession(Base):
    __tablename__ = "game_sessions"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    destination_id = Column(Integer, ForeignKey("destinations.id"))
    is_correct = Column(Integer, nullable=False)  # 1 for correct, 0 for incorrect

    # Relationships
    user = relationship("User")
    destination = relationship("Destination")
