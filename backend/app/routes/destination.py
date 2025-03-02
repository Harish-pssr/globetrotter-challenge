from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import SessionLocal
from app.models.destination import Destination
from app.routes.user import get_current_user
from app.models.user import User
import random
from sqlalchemy.orm.attributes import flag_modified

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/random")
def get_random_destination(db: Session = Depends(get_db), user=Depends(get_current_user)):
    if not user:
        raise HTTPException(status_code=401, detail="User not authenticated")

    # Get already played destinations
    played_ids = user.played_destinations if user.played_destinations else []

    # Fetch unplayed destinations
    unplayed_destinations = db.query(Destination).filter(~Destination.id.in_(played_ids)).all()

    if not unplayed_destinations:
        return {"status":"completed","message": "You've played all available destinations!"}

    # Select a new random destination
    correct_destination = random.choice(unplayed_destinations)

    # Fetch 3 incorrect answers
    incorrect_destinations = random.sample(
        db.query(Destination).filter(Destination.id != correct_destination.id).all(), 3
    )

    # Combine and shuffle answers
    answer_options = [correct_destination.city] + [d.city for d in incorrect_destinations]
    random.shuffle(answer_options)

    # Update user's played destinations
    user = db.query(User).filter(User.id == user.id).first()
    user.played_destinations.append(correct_destination.id)
    flag_modified(user, "played_destinations")
    db.commit()

    return {
        "id": correct_destination.id,
        "clues": correct_destination.clues,  # List of clues
        "answer_options": answer_options
    }
