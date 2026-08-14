# 🚀 Quick Start Scripts

Panduan menggunakan script otomatis untuk menjalankan project Universitas Ichsan Satya (UIS) Website.

## 📋 Apa yang dilakukan script?

Script ini akan **otomatis**:
- ✅ Cek apakah Python, Node.js, dan npm sudah terinstall
- ✅ Membuat virtual environment Python (jika belum ada)
- ✅ Install semua backend dependencies (dari requirements.txt)
- ✅ Install semua frontend dependencies (npm packages)
- ✅ Setup database dan menjalankan migrations
- ✅ **Menjalankan Backend & Frontend secara bersamaan dalam 1 command**

---

## 🐧 Linux / macOS - menggunakan `run.sh`

### Step 1: Beri permission execute

```bash
chmod +x run.sh
```

### Step 2: Jalankan script

```bash
./run.sh
```

**Apa yang terjadi:**
1. Script akan check Python, Node.js, npm
2. Setup backend (venv, install dependencies, migrations)
3. Setup frontend (install npm packages)
4. Jalankan backend di port 8000
5. Jalankan frontend di port 3000
6. Tampilin logs dari kedua service

### Step 3: Akses aplikasi

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:8000/api/
- **Admin Panel:** http://localhost:8000/admin

### Untuk menghentikan:
Tekan `Ctrl+C` di terminal untuk stop kedua service sekaligus.

---

## 🪟 Windows - menggunakan `run.bat` (Recommended untuk Windows)

### Step 1: Buka Command Prompt (CMD) atau PowerShell
- Tekan `Win+R`
- Ketik `cmd`
- Klik OK
- Atau buka PowerShell

### Step 2: Navigate ke project folder

```cmd
cd path\to\project\Uis
```

**Contoh:**
```cmd
cd D:\Users\IT PC\Desktop\projek\Uis
```

### Step 3: Jalankan script

```cmd
run.bat
```

**Apa yang terjadi:**
1. Script akan check prerequisites (Python, Node.js, npm)
2. Setup backend (venv, dependencies, migrations)
3. Setup frontend (npm packages)
4. Buka 2 window baru:
   - Window 1: Backend (Django) di port 8000
   - Window 2: Frontend (React) di port 3000
5. Main window akan tetap terbuka untuk reference

### Step 4: Akses aplikasi

Buka browser dan kunjungi:
- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:8000/api/
- **Admin Panel:** http://localhost:8000/admin

### Untuk menghentikan:
- Tutup window backend (klik X)
- Tutup window frontend (klik X)
- Atau tekan `Ctrl+C` di masing-masing window

---

## 🪟 Windows PowerShell - menggunakan `run.ps1` (Alternative)

### Step 1: Buka PowerShell as Administrator
- Tekan `Win+X`
- Pilih "Windows PowerShell (Admin)" atau "Terminal (Admin)"

### Step 2: Enable script execution (jika belum pernah)

```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

Ketik `Y` dan Enter jika diminta.

### Step 3: Navigate ke project folder

```powershell
cd path\to\project\Uis
```

**Contoh:**
```powershell
cd D:\Users\IT PC\Desktop\projek\Uis
```

### Step 4: Jalankan script

```powershell
.\run.ps1
```

**Apa yang terjadi:**
- Similar dengan `run.bat`, tapi menggunakan PowerShell
- Akan buka 2 window PowerShell baru untuk backend & frontend
- Main window tetap terbuka

### Step 5: Akses aplikasi

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:8000/api/
- **Admin Panel:** http://localhost:8000/admin

---

## ⚡ Troubleshooting Scripts

### ❌ Error: "Command not found: run.sh" (Linux/macOS)

**Solusi:**
```bash
# Pastikan Anda di folder root project
ls -la run.sh

# Jika tidak ada, download/buat dari dokumentasi

# Beri permission execute
chmod +x run.sh

# Jalankan
./run.sh
```

### ❌ Error: "Python not found"

Script akan otomatis detect dan show error message.

**Solusi:**
- Install Python dari https://www.python.org/
- Windows: Pastikan ✓ "Add Python to PATH" saat install
- Restart komputer setelah install
- Jalankan script lagi

### ❌ Error: "Node.js not found"

**Solusi:**
- Install Node.js dari https://nodejs.org/
- Restart komputer setelah install
- Jalankan script lagi

### ❌ Error: "MySQL connection failed" atau "Database error"

**Solusi:**
1. Pastikan MySQL Server sudah running:
   - Windows: Services → cari "MySQL" → Start
   - Linux: `sudo systemctl start mysql`
2. Cek file `.env` di folder backend:
   - `DB_USER=root` (atau username Anda)
   - `DB_PASSWORD=...` (sesuai password MySQL)
   - `DB_NAME=uis_database`
3. Buat database kalau belum ada:
   ```bash
   mysql -u root -p
   CREATE DATABASE uis_database CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
   EXIT;
   ```
4. Jalankan script lagi

### ❌ Error: "Port 3000 / 8000 already in use"

**Solusi:**
Port sudah dipakai aplikasi lain.

**Option 1: Stop aplikasi yang pakai port**
- Windows: Task Manager → cari process yang pakai port
- Linux: `lsof -i :3000` atau `lsof -i :8000`

**Option 2: Ubah port secara manual**

Edit script untuk ubah port:

**Linux (run.sh):**
```bash
# Ubah line:
python manage.py runserver 8001  # Ganti 8000 jadi 8001
npm run dev -- --port 3001        # Ganti 3000 jadi 3001
```

**Windows (run.bat):**
```batch
REM Ubah line di section "Start Backend":
start "UIS Backend" cmd /k python manage.py runserver 8001

REM Ubah line di section "Start Frontend":
start "UIS Frontend" cmd /k npm run dev -- --port 3001
```

---

## 📊 Perbandingan Script

| Feature | run.sh (Linux/macOS) | run.bat (Windows CMD) | run.ps1 (PowerShell) |
|---------|----------------------|----------------------|----------------------|
| OS | Linux, macOS | Windows | Windows |
| Prerequisite Check | ✅ Otomatis | ✅ Otomatis | ✅ Otomatis |
| Install Dependencies | ✅ Otomatis | ✅ Otomatis | ✅ Otomatis |
| Run Migrations | ✅ Otomatis | ✅ Otomatis | ✅ Otomatis |
| Easy to Use | ✅ `./run.sh` | ✅ `run.bat` | ⚠️ Perlu ExecutionPolicy |
| Separate Windows | ❌ Logs in 1 terminal | ✅ 2 windows terpisah | ✅ 2 windows terpisah |
| Error Handling | ✅ Baik | ✅ Baik | ✅ Baik |

---

## 🎯 Daily Workflow dengan Script

**Setiap hari Anda hanya perlu:**

**Linux/macOS:**
```bash
cd path/to/Uis
./run.sh
```

**Windows (CMD):**
```cmd
cd path\to\Uis
run.bat
```

**Windows (PowerShell):**
```powershell
cd path\to\Uis
.\run.ps1
```

Done! Backend dan Frontend sudah running. ✨

---

## 📝 Manual Setup (Jika script error)

Jika script error, Anda bisa manual setup dengan membaca:
- [SETUP_LINUX.md](SETUP_LINUX.md) - Untuk Linux/macOS
- [SETUP_WINDOWS.md](SETUP_WINDOWS.md) - Untuk Windows

---

## 🔧 Customize Script

Jika ingin ubah port atau behavior, edit file script:

**Linux/macOS (run.sh):**
```bash
nano run.sh
```

**Windows (run.bat atau run.ps1):**
- Klik kanan file → Edit dengan Notepad

Common changes:
- Ubah port: cari "8000" atau "3000"
- Ubah timeout: cari "sleep" atau "timeout"
- Add custom commands: Tambah di bagian "# ===================="

---

## ✨ Tips & Tricks

### 1. Save terminal output ke file
**Linux:**
```bash
./run.sh > output.log 2>&1
```

**Windows (CMD):**
```cmd
run.bat > output.log 2>&1
```

### 2. Run script di background (Linux)
```bash
nohup ./run.sh &
```

### 3. Check script syntax (Linux)
```bash
bash -n run.sh
```

### 4. Make script executable for everyone (Linux)
```bash
chmod +x run.sh run.ps1  # jika ada di Linux
```

---

## 📚 Dokumentasi Lengkap

- [README.md](README.md) - Project overview
- [SETUP_LINUX.md](SETUP_LINUX.md) - Detailed Linux setup
- [SETUP_WINDOWS.md](SETUP_WINDOWS.md) - Detailed Windows setup
- [backend/README.md](backend/README.md) - Backend API docs
- [frontend/README_FRONTEND.md](frontend/README_FRONTEND.md) - Frontend docs

---

**Selamat menggunakan! 🚀**

Jika ada masalah, cek troubleshooting di atas atau baca dokumentasi setup yang detail.
