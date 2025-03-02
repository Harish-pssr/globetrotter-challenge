from fastapi import FastAPI
from app.routes import user, destination, game

app = FastAPI()
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change this to your frontend URL (e.g., "http://localhost:5173")
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(user.router, prefix="/user", tags=["User"])
app.include_router(destination.router, prefix="/destination", tags=["Destination"])
app.include_router(game.router, prefix="/game", tags=["Game"])

@app.get("/")
def root():
    return {"message": "Welcome to the Globetrotter API!"}
