# 🪟 Setup Project UIS di Windows

Panduan lengkap untuk menjalankan Universitas Ichsan Satya (UIS) Website Monorepo di Windows.

## 📋 Prasyarat

Sebelum memulai, pastikan Anda sudah install:

### 1. **Node.js & npm**

**Download & Install:**
1. Kunjungi https://nodejs.org/ (versi LTS recommended)
2. Download installer `.msi`
3. Jalankan installer, ikuti wizard (default settings OK)
4. Restart komputer

**Verifikasi:**
- Buka Command Prompt (CMD) atau PowerShell
- Ketik:
```cmd
node --version
npm --version
```

### 2. **Python 3.11+**

**Download & Install:**
1. Kunjungi https://www.python.org/downloads/
2. Download Python 3.11 atau lebih baru
3. ⚠️ **PENTING:** Centang ✓ "Add Python to PATH" saat install
4. Jalankan installer, klik "Install Now"

**Verifikasi:**
```cmd
python --version
pip --version
```

### 3. **MySQL Server**

**Option A: MySQL Community Server (Recommended)**
1. Download dari https://dev.mysql.com/downloads/mysql/
2. Pilih "MySQL Community Server"
3. Download MSI Installer (versi latest)
4. Jalankan installer:
   - Setup Type: "Developer Default" atau "Server only"
   - MySQL Port: 3306 (default)
   - MySQL Root Password: `root` (atau sesuai preference)
5. Finish installation

**Option B: MySQL via Chocolatey (Jika sudah install Chocolatey)**
```cmd
choco install mysql
```

**Verifikasi:**
- Buka Command Prompt
- Ketik:
```cmd
mysql --version
```

### 4. **Git** (Opsional tapi Recommended)
1. Download dari https://git-scm.com/download/win
2. Jalankan installer, ikuti default
3. Verifikasi di CMD:
```cmd
git --version
```

---

## 🚀 Setup Backend (Django)

### Step 1: Buka Command Prompt / PowerShell
- Klik tombol Windows
- Cari "cmd" atau "PowerShell"
- Klik kanan → Run as Administrator

### Step 2: Navigasi ke folder backend
```cmd
cd path\to\project\Uis
cd backend
```

**Contoh path lengkap:**
```cmd
cd D:\Users\IT PC\Desktop\projek\Uis\backend
```

### Step 3: Buat Virtual Environment
```cmd
python -m venv venv
```

### Step 4: Activate Virtual Environment

**Windows CMD:**
```cmd
venv\Scripts\activate
```

**Windows PowerShell:**
```powershell
venv\Scripts\Activate.ps1
```

⚠️ Jika PowerShell error "ExecutionPolicy", jalankan:
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

Setelah dijalankan, prompt akan menunjukkan `(venv)` di depan.

### Step 5: Install Dependencies
```cmd
pip install --upgrade pip
pip install -r requirements.txt
```

⏳ Proses ini memakan waktu 3-10 menit (tergantung internet).

### Step 6: Setup Database

**a. Buka Command Prompt baru (admin mode):**
```cmd
mysql -u root -p
```

Masukkan MySQL root password Anda.

**b. Di dalam MySQL prompt, jalankan:**
```sql
CREATE DATABASE uis_database CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
EXIT;
```

### Step 7: Setup Environment Variables

**a. Copy .env.example ke .env:**
```cmd
copy .env.example .env
```

**b. Edit .env dengan Notepad:**
```cmd
notepad .env
```

**Paste konfigurasi ini:**
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

**Ganti `your-mysql-password` dengan password MySQL Anda.**

Simpan file (Ctrl+S), tutup Notepad.

### Step 8: Run Migrations

Di Command Prompt yang sudah activate venv:
```cmd
python manage.py migrate
```

### Step 9: Buat Superuser (Admin)
```cmd
python manage.py createsuperuser
```

Ikuti prompt untuk input:
- Username: (misal: admin)
- Email: (misal: admin@uis.ac.id)
- Password: (misal: password123)

### Step 10: Jalankan Backend Server
```cmd
python manage.py runserver
```

**Output yang diharapkan:**
```
Starting development server at http://127.0.0.1:8000/
```

✅ Backend sudah running! Jangan tutup window ini.

---

## 🎨 Setup Frontend (React + Vite)

### Step 1: Buka Command Prompt Baru (Jangan tutup backend!)
- Tekan `Win+R`
- Ketik `cmd`
- Klik OK

### Step 2: Navigasi ke frontend folder
```cmd
cd path\to\project\Uis\frontend
```

**Contoh:**
```cmd
cd D:\Users\IT PC\Desktop\projek\Uis\frontend
```

### Step 3: Install Dependencies
```cmd
npm install
```

⏳ Ini memakan waktu 2-5 menit.

### Step 4: Jalankan Frontend Development Server
```cmd
npm run dev
```

**Output yang diharapkan:**
```
VITE v6.2.3  ready in XXX ms

➜  Local:   http://localhost:3000/
➜  press h to show help
```

✅ Frontend sudah running!

---

## ✅ Verifikasi Setup

Buka browser (Chrome / Firefox / Edge) dan kunjungi:

### 1. **Frontend Website**
```
http://localhost:3000
```
Anda akan melihat homepage UIS dengan tampilan lengkap.

### 2. **Backend API Root**
```
http://localhost:8000/api/
```
Akan menampilkan DRF API root interface.

### 3. **Django Admin Panel**
```
http://localhost:8000/admin
```
- Masukkan username & password superuser yang sudah dibuat
- Anda bisa manage semua data melalui admin interface

---

## 🎯 Project Structure

```
D:\Users\IT PC\Desktop\projek\Uis\
├── backend/              # Django REST API
│   ├── manage.py
│   ├── requirements.txt
│   ├── venv/             # Virtual environment
│   ├── .env              # Configuration
│   ├── config/
│   ├── academics/
│   ├── admissions/
│   ├── content/
│   ├── news/
│   └── programs_public/
│
├── frontend/             # React + Vite
│   ├── package.json
│   ├── vite.config.ts
│   ├── node_modules/     # npm packages
│   ├── src/
│   │   ├── components/
│   │   ├── lib/
│   │   └── main.tsx
│   └── index.html
│
└── README.md
```

---

## 🛠️ Troubleshooting Windows

### ❌ Error: "Command not found: python"

**Solusi:**
1. Python belum di-PATH
2. Reinstall Python dengan ✓ "Add Python to PATH"
3. Atau gunakan full path:
```cmd
C:\Users\YourUsername\AppData\Local\Programs\Python\Python311\python.exe --version
```

### ❌ Error: "Python command 'venv' not found"

**Solusi:**
```cmd
python -m venv venv
```

### ❌ Error: "venv\Scripts\activate" is not recognized

**Solusi di PowerShell:**
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
venv\Scripts\Activate.ps1
```

### ❌ Error: "MySQL connection failed"

**Solusi:**
1. Pastikan MySQL Service running:
   - Buka Services (Win+R → services.msc)
   - Cari "MySQL80" atau "MySQL" (nama bisa berbeda)
   - Klik kanan → Start

2. Verifikasi password MySQL di `.env`

3. Test koneksi:
```cmd
mysql -u root -p
```

### ❌ Error: "Port 3000 / 8000 already in use"

**Untuk Backend (port 8000):**
```cmd
python manage.py runserver 8001
```

**Untuk Frontend (port 3000):**
```cmd
npm run dev -- --port 3001
```

### ❌ Error: "npm: command not found"

**Solusi:**
1. Reinstall Node.js dari https://nodejs.org/
2. Restart komputer setelah install
3. Verifikasi:
```cmd
npm --version
```

### ❌ Error: "'node_modules' not found"

**Solusi:**
```cmd
cd frontend
npm install
```

### ❌ Error: "Module not found: dependencies"

**Backend:**
```cmd
cd backend
venv\Scripts\activate
pip install -r requirements.txt
```

**Frontend:**
```cmd
cd frontend
npm install
```

---

## 🔄 Daily Workflow

Setiap kali Anda mau development:

### **Terminal 1 - Backend:**
```cmd
cd backend
venv\Scripts\activate
python manage.py runserver
```

### **Terminal 2 - Frontend:**
```cmd
cd frontend
npm run dev
```

Buka browser di `http://localhost:3000`

Kedua server akan auto-reload ketika ada perubahan file.

---

## 📝 Useful Commands

### Backend Commands (di folder backend dengan venv active)

```cmd
# Lihat status migrations
python manage.py showmigrations

# Buat migration baru (setelah edit models.py)
python manage.py makemigrations

# Apply migrations ke database
python manage.py migrate

# Django interactive shell
python manage.py shell

# Run tests
python manage.py test

# Reset database (HATI-HATI!)
python manage.py flush

# Collect static files (production)
python manage.py collectstatic --noinput
```

### Frontend Commands (di folder frontend)

```cmd
# Development server
npm run dev

# Production build
npm run build

# Preview production build
npm run preview

# Type checking
npm run lint

# Clean build
npm run clean
```

---

## 🐛 Debugging

### 1. Cek MySQL Database
```cmd
mysql -u root -p
USE uis_database;
SHOW TABLES;
SELECT * FROM table_name;
EXIT;
```

### 2. Test API dengan curl (atau Postman)
```cmd
# GET request
curl http://localhost:8000/api/contact-info/

# POST request
curl -X POST http://localhost:8000/api/pmb/register/ ^
  -H "Content-Type: application/json" ^
  -d "{\"fullName\": \"Test\"}"
```

### 3. Lihat Logs
- Backend: Lihat output di terminal backend
- Frontend: Buka browser DevTools (F12 → Console)

---

## 📦 Production Build

### Build Frontend
```cmd
cd frontend
npm run build
```

Output di `frontend\dist\`

### Collect Static Files (Backend)
```cmd
cd backend
venv\Scripts\activate
python manage.py collectstatic --noinput
```

---

## ✨ Environment Variables Reference

File `.env` di folder `backend\`:

```env
# ========================
# Django Configuration
# ========================
SECRET_KEY=your-unique-secret-key-here
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1,0.0.0.0

# ========================
# Database (MySQL)
# ========================
DB_ENGINE=mysql
DB_NAME=uis_database
DB_USER=root
DB_PASSWORD=your-mysql-password
DB_HOST=localhost
DB_PORT=3306

# ========================
# CORS
# ========================
CORS_ALLOWED_ORIGINS=http://localhost:3000,http://127.0.0.1:3000

# ========================
# File Storage
# ========================
STATIC_URL=/static/
MEDIA_URL=/media/
STATIC_ROOT=staticfiles
MEDIA_ROOT=media
```

---

## 🎯 Checklist Setup

- [ ] Node.js & npm installed
- [ ] Python 3.11+ installed
- [ ] MySQL Server installed & running
- [ ] Backend venv created & activated
- [ ] Backend dependencies installed
- [ ] Database `uis_database` created
- [ ] `.env` configured
- [ ] Migrations ran (`python manage.py migrate`)
- [ ] Superuser created
- [ ] Backend running di port 8000
- [ ] Frontend dependencies installed
- [ ] Frontend running di port 3000
- [ ] Bisa akses http://localhost:3000
- [ ] Bisa akses http://localhost:8000/admin

---

## 📚 Dokumentasi Lengkap

- [README.md](README.md) - Pengenalan project
- [backend/README.md](backend/README.md) - Backend API documentation
- [frontend/README_FRONTEND.md](frontend/README_FRONTEND.md) - Frontend documentation
- [PROMPT_DJANGO_BACKEND_UIS.md](PROMPT_DJANGO_BACKEND_UIS.md) - Requirements detail

---

## 💡 Tips & Tricks

### Menggunakan Visual Studio Code
1. Download dari https://code.visualstudio.com/
2. Install extensions:
   - Python (Microsoft)
   - Django (Baptiste Darthenay)
   - ES7+ React/Redux/React-Native snippets
   - Prettier - Code formatter
3. Buka folder project di VSCode
4. Terminal terintegrasi (`Ctrl+`` `)

### Menggunakan Postman untuk Test API
1. Download dari https://www.postman.com/
2. Import requests untuk testing
3. Mudah debug API responses

### Database Management dengan MySQL Workbench
1. Download dari https://www.mysql.com/products/workbench/
2. Connect ke MySQL local
3. Visual management database

---

**Happy Coding! 🚀**

Jika ada masalah, cek troubleshooting atau baca dokumentasi di atas.
