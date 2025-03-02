from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import SessionLocal
from app.models.user import User
from app.models.destination import Destination
from app.routes.user import get_current_user
from pydantic import BaseModel
import logging
from sqlalchemy.orm.attributes import flag_modified
from sqlalchemy import text

logging.basicConfig(level=logging.INFO)
router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# User's answer submission model
class AnswerSubmission(BaseModel):
    destination_id: int
    user_answer: str  # User's selected answer

@router.post("/submit")
def submit_answer(data: AnswerSubmission, db: Session = Depends(get_db), user=Depends(get_current_user)):
    if not user:
        raise HTTPException(status_code=401, detail="User not authenticated")
    
    
    # Fetch correct answer
    destination = db.query(Destination).filter(Destination.id == data.destination_id).first()
    if not destination:
        raise HTTPException(status_code=404, detail="Destination not found")

    user = db.query(User).filter(User.id == user.id).first()

    # Compare user's answer with correct answer
    is_correct = data.user_answer.strip().lower() == destination.city.lower()

    if is_correct:
        user.score += 1
        flag_modified(user, "score")
    else:
        user.incorrect_attempts += 1
        flag_modified(user, "incorrect_attempts")

    db.commit()

    fun_fact = destination.fun_fact[0] if is_correct else destination.fun_fact[1]

    return {
        "correct": is_correct,
        "user_score": user.score,
        "incorrect_attempts": user.incorrect_attempts,
        "fun_fact": fun_fact
    }

