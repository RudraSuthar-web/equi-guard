# 🛡️ EquiGuard

**EquiGuard** is a next-generation AI-powered platform designed to detect, analyze, and mitigate bias in automated decision-making systems. Built with a focus on fairness and transparency, EquiGuard helps organizations ensure their AI models (from hiring to loans and healthcare) are equitable for all.

---

## 🚀 Features

- **Bias Detection Dashboard**: Real-time visualization of scoring disparities across demographic groups.
- **Shadow Scoring**: Comparative analysis of model outputs vs. fair-baseline estimates.
- **AI Assistant**: Interactive chat powered by Gemini AI for insights on bias mitigation strategies.
- **Modern UI**: Sleek, high-performance dark theme with glassmorphism aesthetics.
- **Secure Auth**: Integrated Firebase Authentication with Google Sign-In.

---

## 🛠️ Tech Stack

- **Frontend**: [Next.js 15](https://nextjs.org/), [TypeScript](https://www.typescriptlang.org/), [Tailwind CSS](https://tailwindcss.com/), [Shadcn UI](https://ui.shadcn.com/), [Recharts](https://recharts.org/)
- **Backend**: [Python](https://www.python.org/), [FastAPI](https://fastapi.tiangolo.com/), [Uvicorn](https://www.uvicorn.org/)
- **AI Core**: [Google Gemini AI API](https://ai.google.dev/)
- **Infrastructure**: [Firebase](https://firebase.google.com/) (Auth, Firestore, Hosting)

---

## ⚙️ Setup & Installation

### 1. Prerequisites
- Node.js (v18 or higher)
- Python (v3.9 or higher)
- Firebase Account
- Google AI (Gemini) API Key

### 2. Clone the Repository
```bash
git clone https://github.com/yourusername/equi-guard.git
cd equi-guard
```

### 3. Frontend Setup
```bash
cd frontend

# Install dependencies
npm install

# Create environment file
cp .env.local.example .env.local
```
> **Note**: Update `.env.local` with your Firebase configuration.

### 4. Backend Setup
```bash
cd ../backend

# Create virtual environment
python -m venv venv

# Activate venv (Windows)
.\venv\Scripts\activate
# Activate venv (Mac/Linux)
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Create environment file
# Create a .env file and add:
# GEMINI_API_KEY=your_gemini_api_key_here
```

---

## 🏃 Running the Application

To run the project locally, you need to start both the frontend and backend servers.

### Start Backend (Port 8000)
```bash
cd backend
# Ensure venv is activated
uvicorn main:app --reload
```

### Start Frontend (Port 3000)
```bash
cd frontend
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the app in action!

---

## 📂 Project Structure

```text
equi-guard/
├── frontend/           # Next.js application
│   ├── app/            # App router (pages & layouts)
│   ├── components/     # UI components
│   └── lib/            # Shared utilities (firebase, etc.)
├── backend/            # FastAPI application
│   ├── main.py         # API endpoints & Gemini integration
│   └── requirements.txt # Python dependencies
├── firestore.rules     # Database security rules
└── README.md           # You are here
```

---

## 📄 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
