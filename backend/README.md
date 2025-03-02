# **Globetrotter Backend - README**

## **📌 Project Overview**

Globetrotter is a travel-based trivia game where users receive clues about famous places and guess the correct destination. This backend, built using **FastAPI** and **PostgreSQL (Supabase)**, manages authentication, game logic, and progress tracking.

---

## **📂 Folder Structure**

```
backend/
│── app/
│   │── models/         # Database models (SQLAlchemy)
│   │   │── base.py     # Base model for inheritance
│   │   │── destination.py  # Destination model (clues, trivia, answers)
│   │   │── user.py     # User model (username, score, incorrect attempts)
│   │   │── game.py     # Game session model (tracking answers)
│   │── routes/         # API endpoints
│   │── database.py     # Database connection
│   │── main.py         # FastAPI entry point
│
│── scripts/            # Utility scripts (e.g., data insertion)
│── requirements.txt    # Python dependencies
│── README.md          # Documentation
```

---

## **🛠 Setup & Installation**

### **1️⃣ Clone the Repository**

```bash
git clone https://github.com/your-repo/globetrotter-backend.git
cd globetrotter-backend
```

### **2️⃣ Create & Activate Virtual Environment**

```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

### **3️⃣ Install Dependencies**

```bash
pip install -r requirements.txt
```

### **4️⃣ Configure Environment Variables**

Create a `.env` file in the root directory and add:

```ini
DATABASE_URL=postgresql://user:password@db.your-supabase-url.com:5432/postgres
```

### **5️⃣ Run Database Migrations**

```bash
alembic upgrade head
```

### **6️⃣ Start the FastAPI Server**

```bash
uvicorn app.main:app --reload
```

Swagger UI available at: [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)

---

## **🔹 API Endpoints**

### **1️⃣ User Authentication**

| Method | Endpoint                 | Description                         |
| ------ | ------------------------ | ----------------------------------- |
| `POST` | `/user/register`         | Register a new user                 |
| `POST` | `/user/login`            | Authenticate user and get JWT token |
| `GET`  | `/user/details`          | Get user’s current score            |

### **2️⃣ Game Logic**

| Method | Endpoint              | Description                                   |
| ------ | --------------------- | --------------------------------------------- |
| `GET`  | `/destination/random` | Fetch a random destination (avoiding repeats) |
| `POST` | `/game/submit`        | Submit an answer and update user score        |

---

## **📌 Database Models**

### **User Model**

```python
class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(50), unique=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    score = Column(Integer, default=0)
    incorrect_attempts = Column(Integer, default=0)
    played_destinations = Column(JSON, default=[])
```

### **Destination Model**

```python
class Destination(Base):
    __tablename__ = "destinations"
    id = Column(Integer, primary_key=True, index=True)
    city = Column(String(100), unique=True, nullable=False)
    country = Column(String(100), nullable=False)
    clues = Column(JSON, nullable=False)
    fun_fact = Column(JSON, nullable=False)
    trivia = Column(JSON, nullable=False)
```




🚀 **Happy coding! Let me know if you need any refinements.** 🔥

