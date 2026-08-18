# Universitas Ichsan Satya (UIS) Website - Monorepo

This repository contains both the frontend and backend for the official website of Universitas Ichsan Satya.

## 📁 Project Structure

```
/
├── frontend/        # React 19 + Vite + TypeScript frontend
├── backend/         # Django REST Framework backend
└── README.md        # This file
```

## 🚀 Quick Start

### ⚡ FASTEST METHOD - Automatic Script (Recommended!)

**Run both Backend & Frontend with ONE command. Dependencies install automatically!**

#### Linux / macOS:
```bash
chmod +x run.sh
./run.sh
```

#### Windows (CMD):
```cmd
run.bat
```

#### Windows (PowerShell):
```powershell
.\run.ps1
```

✅ Script will:
- Auto-install all dependencies (npm + pip packages)
- Setup database & run migrations
- Start Backend (port 8000) + Frontend (port 3000) simultaneously
- Show logs from both services

👉 **[See RUN_SCRIPTS.md for detailed instructions](RUN_SCRIPTS.md)**

---

### Manual Setup (If script doesn't work)

#### Frontend

Navigate to the `frontend/` directory:

```bash
cd frontend
npm install
npm run dev
```

The frontend will run at `http://localhost:3000`

See [frontend/README_FRONTEND.md](frontend/README_FRONTEND.md) for more details.

#### Backend

Navigate to the `backend/` directory:

```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

The backend API will run at `http://localhost:8000`

See [backend/README.md](backend/README.md) for detailed setup instructions.

---

### Detailed Setup Guides

- 🐧 **[SETUP_LINUX.md](SETUP_LINUX.md)** - Complete Linux/macOS setup
- 🪟 **[SETUP_WINDOWS.md](SETUP_WINDOWS.md)** - Complete Windows setup

## 📋 API Documentation

All API endpoints are documented in `backend/README.md` once the backend is set up.

API Response Format: **camelCase** JSON keys (e.g., `coverImage`, `publishedAt`)

## 🛠️ Tech Stack

### Frontend
- React 19
- TypeScript
- Vite 6.2.3
- Tailwind CSS 4.1.14
- Lucide React (Icons)
- Motion (Animations)

### Backend
- Django 5.x
- Django REST Framework (DRF)
- MySQL Database
- django-cors-headers
- djangorestframework-camel-case

## 📝 Development Workflow

1. **Frontend Development**: Make changes in `frontend/src/` and the Vite dev server will hot-reload
2. **Backend Development**: Make changes in `backend/` and Django dev server will auto-reload
3. **Database Changes**: Create and run migrations: `python manage.py makemigrations && python manage.py migrate`
4. **Admin Panel**: Access at `http://localhost:8000/admin` (use superuser credentials)

## 🔄 Integration

The frontend's API calls are configured in `frontend/src/lib/api/` files. Once both servers are running:
- Frontend: `http://localhost:3000`
- Backend API: `http://localhost:8000/api`

The backend is configured to allow CORS requests from the frontend during development.

## 📚 Documentation

- **Frontend Setup**: See `frontend/README_FRONTEND.md`
- **Backend Setup**: See `backend/README.md`
- **Build Configuration**: See `frontend/vite.config.ts` and `backend/settings.py`

## 🐛 Troubleshooting

For comprehensive troubleshooting guides:

- **Script Issues?** → See [RUN_SCRIPTS.md - Troubleshooting Scripts](RUN_SCRIPTS.md#-troubleshooting-scripts)
- **Linux/macOS Setup Issues?** → See [SETUP_LINUX.md - Troubleshooting Linux](SETUP_LINUX.md#-troubleshooting-linux)
- **Windows Setup Issues?** → See [SETUP_WINDOWS.md - Troubleshooting Windows](SETUP_WINDOWS.md#-troubleshooting-windows)

### Quick Fixes

#### Port Already in Use?

**Frontend**:
```bash
cd frontend
npm run dev -- --port=3001
```

**Backend**:
```bash
cd backend
python manage.py runserver 8001
```

#### Database Connection Issues?

Check your `.env` file in the `backend/` directory and ensure:
- `DB_HOST` is correct
- `DB_USER` has proper credentials
- `DB_PASSWORD` is set
- Database exists and is running

### CORS Issues?

The backend's CORS configuration in `settings.py` should allow `http://localhost:3000` in development.

## 📞 Support

For issues or questions, refer to the specific README files in `frontend/` and `backend/` directories.
