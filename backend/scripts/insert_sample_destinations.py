import json
import sys
import os
# from sqlalchemy.orm import Session
from app.database import SessionLocal
from app.models.destination import Destination

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))
with open("scripts/sample_destinations.json", "r") as file:
    destinations = json.load(file)

db = SessionLocal()
for dest in destinations:
    db.add(Destination(**dest))
db.commit()
db.close()

print("Sample destinations inserted successfully!")
