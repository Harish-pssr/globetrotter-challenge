### **📌 `README.md` for Globetrotter Challenge Frontend**
<!-- ```markdown -->
# 🌍 Globetrotter Challenge - Frontend

Welcome to the **Globetrotter Challenge**, an interactive game where users test their geography knowledge by guessing destinations! This repository contains the **frontend** code built with **React & Vite**.

## 🚀 Features
✅ **User Authentication**  
   - Register and login to play the game.  
   - Secure authentication using JWT tokens.  

✅ **Game Mechanics**  
   - Receive clues and guess the correct destination.  
   - Get instant feedback (🎉 Correct Answer or 😢 Incorrect Answer).  
   - Track your **total score & accuracy**.  

✅ **Challenge a Friend Feature**  
   - Share an invite link with a **dynamic image preview**.  
   - Invitees can register and start playing immediately.  

✅ **Leaderboard & Progress Tracking**  
   - View your **total correct & incorrect attempts**.  
   - Reset progress anytime.  

✅ **Fully Responsive UI**  
   - Works on **mobile & desktop** devices.  
   - Uses **TailwindCSS for styling**.  

## 🔧 **Installation & Setup**
### **1️⃣ Clone the Repository**
```bash
git clone https://github.com/yourusername/globetrotter-frontend.git
cd globetrotter-frontend
```

### **2️⃣ Install Dependencies**
```bash
npm install
```

### **3️⃣ Start the Development Server**
```bash
npm run dev
```
🔹 Open **`http://localhost:5173`** in your browser if running locally.

---

## 🔌 **Backend API Endpoints Used**
| **Endpoint**            | **Method** | **Purpose** |
|------------------------|-----------|-------------|
| `/user/register`       | `POST`    | Registers a new user |
| `/user/login`          | `POST`    | Logs in and returns a JWT token |
| `/user/details`        | `GET`     | Fetches user details (username & score) |
| `/game/submit`         | `POST`    | Submits an answer and returns if correct |
| `/destination/random`  | `GET`     | Gets a new random destination |

---

## 📜 **How to Play**
1️⃣ **Register or Log In**  
2️⃣ **Guess the Destination**  
3️⃣ **Get Feedback & Score Updates**  
4️⃣ **Challenge a Friend**  

---

## 🏆 **Challenge a Friend Feature**
1. Click **"Challenge a Friend"** in the game screen.  
2. Enter a **friend's username** and generate an invite.  
3. A **custom invite image & message** are created.  
4. **Share it via WhatsApp** (image + link).  
5. Friend **clicks the invite, registers, and joins the game**.  

---

## 🎨 **Technologies Used**
- **React + Vite** (Frontend Framework)
- **TailwindCSS** (Styling)
- **React Router** (Navigation)
- **Axios** (API calls)
- **Canvas API** (Invite Image Generation)

---
🌍 **Enjoy the game & happy exploring!** 🎉🚀
