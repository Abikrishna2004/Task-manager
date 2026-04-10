# 🪐 Planify | Strategic Planning Mission Control

Planify is a high-end, futuristic Task Management application designed with a **Mission Control** aesthetic. Leverage **Glassmorphism**, **Strategic Analytics**, and **Intelligence Logging** to manage your objectives with precision.

![Planify Preview](https://via.placeholder.com/800x400.png?text=Planify+Strategic+Mission+Control)

---

## 🚀 Quick Start (Docker)

The fastest way to deploy Planify is via Docker Compose.

```bash
docker-compose up --build
```

- **Frontend (Live)**: [https://plantofly.web.app](https://plantofly.web.app)
- **Frontend (Local)**: [http://localhost:5173](http://localhost:5173)

---

## 🛠️ Manual Installation

### 1. Prerequisites
- **Python 3.10+**
- **Node.js 18+**
- **npm** or **yarn**

### 2. Backend Setup (FastAPI)
Navigate to the backend directory and initialize the intelligence core:

```bash
cd backend
pip install -r requirements.txt
python main.py
```
*The API will be available at `http://localhost:8000`.*

### 3. Frontend Setup (React + Vite)
Navigate to the frontend directory and ignite the engine:

```bash
cd frontend
npm install
npm run dev
```
*The dashboard will be active at `http://localhost:5173`.*

---

## ✨ Strategic Features

- **💎 Glassmorphism UI**: A premium dark-theme interface with backdrop blurs and neon accents.
- **📊 Mission Analytics**: Real-time tracking of total missions, active objectives, and critical threats.
- **⚡ Priority Intelligence**: Categorize tasks into High, Medium, and Low priority with visual neon coding.
- **📝 Mission Debrief**: Record detailed notes on how each objective was concluded.
- **🛡️ Robust API**: Built with FastAPI, Pydantic validation, and SQLAlchemy (SQLite).

---

## 📂 Project Structure

```text
Planify/
├── backend/            # FastAPI intelligence core
│   ├── main.py        # API endpoints & routing
│   ├── models.py      # SQLAlchemy DB models
│   ├── schemas.py     # Pydantic data validation
│   └── database.py    # SQLite configuration
├── frontend/           # React dashboard
│   ├── src/           # Component logic & assets
│   │   ├── assets/    # Branding & logos
│   │   ├── App.jsx    # Primary logic unit
│   │   └── index.css  # Design system
│   └── index.html     # Entry point
└── docker-compose.yml  # Orchestration unit
```

---

## 🛰️ Intelligence Protocols (API)

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/tasks` | Retrieve all missions. |
| `POST` | `/tasks` | Deploy a new mission. |
| `PATCH` | `/tasks/{id}` | Update mission intel or status. |
| `DELETE` | `/tasks/{id}` | Terminate a mission. |

---

Developed with 💜 for **Strategic Professionals**.
