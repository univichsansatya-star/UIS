# 🐧 Setup Project UIS di Linux

Panduan lengkap untuk menjalankan Universitas Ichsan Satya (UIS) Website Monorepo di Linux.

## 📋 Prasyarat

Sebelum memulai, pastikan Anda sudah install:

### 1. **Node.js & npm**
```bash
# Cek apakah sudah terinstall
node --version
npm --version

# Jika belum, install menggunakan nvm (recommended):
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
source ~/.bashrc
nvm install 18
nvm use 18
```

### 2. **Python 3.11+**
```bash
# Cek versi Python
python3 --version

# Jika belum terinstall, gunakan apt:
sudo apt update
sudo apt install python3.11 python3.11-venv python3.11-dev python3-pip
```

### 3. **MySQL Server**
```bash
# Install MySQL Server
sudo apt install mysql-server

# Start MySQL service
sudo systemctl start mysql
sudo systemctl enable mysql

# Verifikasi instalasi
mysql --version
```

### 4. **Git** (opsional, tapi recommended)
```bash
sudo apt install git
git --version
```

---

## 🚀 Setup Backend (Django)

### Step 1: Navigasi ke folder backend
```bash
cd backend
```

### Step 2: Buat Virtual Environment
```bash
python3 -m venv venv
source venv/bin/activate
```

Setelah dijalankan, command line akan menunjukkan `(venv)` di depan.

### Step 3: Install Dependencies
```bash
pip install --upgrade pip
pip install -r requirements.txt
```

### Step 4: Setup Database

**a. Login ke MySQL:**
```bash
mysql -u root -p
# Masukkan password MySQL Anda
```

**b. Di dalam MySQL shell, jalankan:**
```sql
CREATE DATABASE uis_database CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
EXIT;
```

### Step 5: Setup Environment Variables
```bash
# Copy .env.example ke .env
cp .env.example .env

# Edit .env dengan text editor
nano .env
```

**Pastikan konfigurasi ini:**
```env
# Django
SECRET_KEY=your-secret-key-here-change-this-in-production
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1

# Database
DB_NAME=uis_database
DB_USER=root
DB_PASSWORD=your-mysql-password
DB_HOST=localhost
DB_PORT=3306

# CORS
CORS_ALLOWED_ORIGINS=http://localhost:3000

# Static & Media Files
STATIC_URL=/static/
MEDIA_URL=/media/
STATIC_ROOT=staticfiles
MEDIA_ROOT=media
```

Tekan `Ctrl+X`, lalu `Y`, lalu `Enter` untuk save.

### Step 6: Run Migrations
```bash
python manage.py migrate
```

### Step 7: Buat Superuser (Admin)
```bash
python manage.py createsuperuser
```

Ikuti prompt untuk mengisi username, email, dan password.

### Step 8: Jalankan Development Server
```bash
python manage.py runserver
```

**Output yang diharapkan:**
```
Starting development server at http://127.0.0.1:8000/
```

Backend sudah running di `http://localhost:8000`

---

## 🎨 Setup Frontend (React + Vite)

### Step 1: Buka Terminal Baru (Jangan tutup backend!)
```bash
# Dari root project
cd frontend
```

### Step 2: Install Dependencies
```bash
npm install
```

Proses ini akan mengunduh semua npm packages (mungkin memakan waktu 2-5 menit).

### Step 3: Jalankan Development Server
```bash
npm run dev
```

**Output yang diharapkan:**
```
VITE v6.2.3  ready in XXX ms

➜  Local:   http://localhost:3000/
➜  press h to show help
```

Frontend sudah running di `http://localhost:3000`

---

## ✅ Verifikasi Setup

Buka browser dan kunjungi:

1. **Frontend:** `http://localhost:3000`
   - Anda akan melihat website UIS dengan tampilan lengkap

2. **Backend API:** `http://localhost:8000/api/`
   - Akan menampilkan API root view

3. **Django Admin:** `http://localhost:8000/admin`
   - Login dengan credentials superuser yang sudah dibuat
   - Kelola semua data melalui admin panel

---

## 📁 Project Structure

```
/
├── backend/              # Django REST API
│   ├── manage.py
│   ├── requirements.txt
│   ├── .env              # Environment config
│   ├── config/           # Project settings
│   ├── academics/        # Academics app
│   ├── admissions/       # Admissions app
│   ├── content/          # Content/CMS app
│   ├── news/             # News app
│   └── programs_public/  # Public programs app
│
├── frontend/             # React + Vite
│   ├── package.json
│   ├── vite.config.ts
│   ├── tsconfig.json
│   ├── src/
│   │   ├── components/   # React components
│   │   ├── lib/api/      # API wrappers
│   │   ├── types/        # TypeScript types
│   │   └── main.tsx
│   └── index.html
│
└── README.md
```

---

## 🛠️ Troubleshooting Linux

### ❌ Error: "Command not found: python3"
```bash
# Install Python
sudo apt install python3 python3-pip python3.11-venv
```

### ❌ Error: "MySQL connection failed"
```bash
# Pastikan MySQL service running
sudo systemctl status mysql

# Jika tidak, start MySQL
sudo systemctl start mysql

# Cek MySQL listening di port 3306
sudo netstat -tlnp | grep mysql
```

### ❌ Error: "Port 3000 / 8000 already in use"

**Untuk backend (port 8000):**
```bash
python manage.py runserver 8001
```

**Untuk frontend (port 3000):**
```bash
npm run dev -- --port 3001
```

### ❌ Error: "pip install failed"
```bash
# Update pip
pip install --upgrade pip

# Coba install requirements lagi
pip install -r requirements.txt
```

### ❌ Error: "ModuleNotFoundError"
```bash
# Pastikan virtual environment sudah aktif
source venv/bin/activate

# Reinstall requirements
pip install -r requirements.txt
```

---

## 🔄 Daily Workflow

Setiap kali Anda ingin menjalankan project:

### Terminal 1 (Backend):
```bash
cd backend
source venv/bin/activate      # Activate venv
python manage.py runserver
```

### Terminal 2 (Frontend):
```bash
cd frontend
npm run dev
```

Kedua server akan auto-reload ketika ada perubahan file.

---

## 📦 Production Build (Opsional)

### Build Frontend
```bash
cd frontend
npm run build
```

Output akan tersimpan di `frontend/dist/`

### Collect Static Files (Backend)
```bash
cd backend
python manage.py collectstatic --noinput
```

---

## 🐛 Debugging Tips

### 1. Lihat Database
```bash
mysql -u root -p
USE uis_database;
SHOW TABLES;
SELECT * FROM nama_table;
EXIT;
```

### 2. Check Django Logs
Cek output di terminal backend untuk error messages.

### 3. Check Frontend Console
Buka browser DevTools (`F12`) → Console tab untuk JavaScript errors.

### 4. Test API Endpoints
```bash
# Contoh GET request
curl http://localhost:8000/api/contact-info/

# Contoh POST request
curl -X POST http://localhost:8000/api/pmb/register/ \
  -H "Content-Type: application/json" \
  -d '{"fullName": "Test"}'
```

---

## 📚 Useful Commands

### Backend Commands
```bash
# List semua apps
python manage.py showmigrations

# Buat migration baru
python manage.py makemigrations

# Apply migrations
python manage.py migrate

# Reset database (HATI-HATI!)
python manage.py flush

# Shell interaktif Django
python manage.py shell

# Run specific app tests
python manage.py test academics
```

### Frontend Commands
```bash
# Development server
npm run dev

# Production build
npm run build

# Preview production build
npm run preview

# Type checking
npm run lint

# Clean build files
npm run clean
```

---

## ✨ Environment Variables Reference

Buat file `.env` di folder `backend/` dengan format ini:

```env
# ====================
# Django Configuration
# ====================
SECRET_KEY=django-insecure-your-secret-key-here
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1,0.0.0.0

# ====================
# Database (MySQL)
# ====================
DB_ENGINE=mysql
DB_NAME=uis_database
DB_USER=root
DB_PASSWORD=your-mysql-password
DB_HOST=localhost
DB_PORT=3306

# ====================
# CORS Configuration
# ====================
CORS_ALLOWED_ORIGINS=http://localhost:3000,http://127.0.0.1:3000

# ====================
# File Storage
# ====================
STATIC_URL=/static/
MEDIA_URL=/media/
STATIC_ROOT=staticfiles
MEDIA_ROOT=media

# ====================
# Email (Optional)
# ====================
EMAIL_BACKEND=django.core.mail.backends.console.EmailBackend
```

---

## 🎯 Next Steps

1. ✅ Setup kedua platform (backend + frontend)
2. ✅ Verifikasi semua running dengan baik
3. 📝 Baca dokumentasi API di [backend/README.md](backend/README.md)
4. 🧪 Tes API endpoints menggunakan Postman atau curl
5. 🚀 Mulai develop features

---

**Happy Coding! 🚀**

Jika ada pertanyaan, baca [README.md](README.md) atau dokumentasi backend di [backend/README.md](backend/README.md)
