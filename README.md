### **🌍 Globetrotter Challenge**  
_A fun travel guessing game where users decode cryptic clues to guess famous destinations!_  

🚀 **Live Demo:** [Game Link](https://globetrotter-challenge-ten.vercel.app/)

---

## **📌 Project Overview**
Globetrotter Challenge is a **full-stack web app** where users:  
✅ Get random destination clues  
✅ Guess the correct location  
✅ Unlock fun facts & animations  
✅ Challenge friends with a shareable invite  

---

## **🛠 Tech Stack**
- **Frontend:** React (Vite), TailwindCSS  
- **Backend:** FastAPI, PostgreSQL (Supabase)  
- **Deployment:** Vercel (Frontend) & Render (Backend)  

---

## **🚀 Setup & Run Locally**
1. **Clone the repo**  
   ```bash
   git clone https://github.com/Harish-pssr/globetrotter-challenge.git
   cd globetrotter-challenge
   ```

2. **Backend Setup**  
   ```bash
   cd backend
   pip install -r requirements.txt
   uvicorn app.main:app --reload
   ```

3. **Frontend Setup**  
   ```bash
   cd ../frontend
   npm install
   npm run dev
   ```

---

## **📌 Environment Variables**
Create a `.env` file in both `backend/` and `frontend/` and set:  

#### **Backend (`backend/.env`)**
```
DATABASE_URL=your_database_url
```

#### **Frontend (`frontend/.env`)**
```
VITE_API_BASE_URL=[Backend_url]
```

---

Feel free to contribute & improve the game! 🎉  
💡 **Built with love for travel & tech!** 🌍🚀  