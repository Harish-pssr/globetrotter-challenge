from sqlalchemy.ext.declarative import declarative_base

# Create a base class for all models
Base = declarative_base()

# Import models so they are registered with Base.metadata
import app.models.destination
import app.models.user
