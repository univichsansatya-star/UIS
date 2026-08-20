# ==========================================
# UIS Project Startup Script - Windows PowerShell
# ==========================================
# This script automatically:
# - Checks and installs dependencies
# - Sets up virtual environment
# - Runs migrations
# - Starts both backend and frontend
# ==========================================
# Usage: .\run.ps1
# ==========================================

# Enable error handling
$ErrorActionPreference = "Stop"

# Define paths
$PROJECT_DIR = Split-Path -Parent $MyInvocation.MyCommand.Path
$BACKEND_DIR = Join-Path $PROJECT_DIR "backend"
$FRONTEND_DIR = Join-Path $PROJECT_DIR "frontend"
$VENV_DIR = Join-Path $BACKEND_DIR "venv"
$VENV_ACTIVATE = Join-Path $VENV_DIR "Scripts\Activate.ps1"
$POWERSHELL = (Get-Command pwsh -ErrorAction SilentlyContinue).Source
if (-not $POWERSHELL) {
    $POWERSHELL = (Get-Command powershell -ErrorAction Stop).Source
}

# Colors
$GREEN = "`e[32m"
$BLUE = "`e[34m"
$YELLOW = "`e[33m"
$RED = "`e[31m"
$NC = "`e[0m"

Clear-Host
Write-Host "${BLUE}========================================${NC}"
Write-Host "${BLUE}  UIS Project - Starting Both Services${NC}"
Write-Host "${BLUE}========================================${NC}`n"

# ==========================================
# Check Prerequisites
# ==========================================

Write-Host "${YELLOW}[1/5] Checking prerequisites...${NC}"

# Check Python
$python = Get-Command python -ErrorAction SilentlyContinue
if ($python) {
    $python_version = python --version 2>&1
    Write-Host "${GREEN}[OK] Python found: $python_version${NC}"
} else {
    Write-Host "${RED}[ERROR] Python not found!${NC}"
    Write-Host "Please install Python 3.11+ from https://www.python.org/"
    Write-Host "Make sure to check 'Add Python to PATH' during installation`n"
    Read-Host "Press Enter to exit"
    exit 1
}

# Check Node.js
$node = Get-Command node -ErrorAction SilentlyContinue
if ($node) {
    $node_version = node --version
    Write-Host "${GREEN}[OK] Node.js found: $node_version${NC}"
} else {
    Write-Host "${RED}[ERROR] Node.js not found!${NC}"
    Write-Host "Please install Node.js from https://nodejs.org/`n"
    Read-Host "Press Enter to exit"
    exit 1
}

# Check npm
$npm = Get-Command npm -ErrorAction SilentlyContinue
if ($npm) {
    $npm_version = npm --version
    Write-Host "${GREEN}[OK] npm found: $npm_version${NC}`n"
} else {
    Write-Host "${RED}[ERROR] npm not found!`n"
    Read-Host "Press Enter to exit"
    exit 1
}

# ==========================================
# Setup Backend
# ==========================================

Write-Host "${YELLOW}[2/5] Setting up Backend...${NC}"

Push-Location $BACKEND_DIR

# Create virtual environment if it doesn't exist
if (-not (Test-Path $VENV_DIR)) {
    Write-Host "  Creating virtual environment..."
    python -m venv venv
    Write-Host "${GREEN}  [OK] Virtual environment created${NC}"
}

# Activate virtual environment
& $VENV_ACTIVATE

Write-Host "${GREEN}  [OK] Virtual environment activated${NC}"

# Install dependencies
Write-Host "  Installing Python dependencies..."
python -m pip install --upgrade pip | Out-Null
pip install -q -r requirements.txt

if ($LASTEXITCODE -ne 0) {
    Write-Host "${RED}  [ERROR] Failed to install dependencies${NC}"
    Write-Host "  Check your internet connection and requirements.txt`n"
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host "${GREEN}  [OK] Python dependencies installed${NC}"

# Check and create .env if needed
if (-not (Test-Path ".env")) {
    Write-Host "  Creating .env file from .env.example..."
    if (Test-Path ".env.example") {
        Copy-Item ".env.example" ".env"
        Write-Host "${YELLOW}  [WARNING] .env created. Please update with your MySQL credentials!${NC}"
    }
}

# Run migrations
Write-Host "  Running database migrations..."
python manage.py migrate

if ($LASTEXITCODE -ne 0) {
    Write-Host "${RED}  [ERROR] Migration failed${NC}"
    Write-Host "  Make sure MySQL is running and database is configured in .env`n"
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host "${GREEN}  [OK] Migrations completed`n${NC}"

Pop-Location

# ==========================================
# Setup Frontend
# ==========================================

Write-Host "${YELLOW}[3/5] Setting up Frontend...${NC}"

Push-Location $FRONTEND_DIR

# Install npm dependencies if node_modules doesn't exist
if (-not (Test-Path "node_modules")) {
    Write-Host "  Installing npm dependencies (this may take a few minutes)..."
    npm install -q
    
    if ($LASTEXITCODE -ne 0) {
        Write-Host "${RED}  [ERROR] Failed to install npm dependencies${NC}"
        Write-Host "  Check your internet connection`n"
        Read-Host "Press Enter to exit"
        exit 1
    }
    
    Write-Host "${GREEN}  [OK] npm dependencies installed${NC}"
} else {
    Write-Host "${GREEN}  [OK] npm dependencies already installed${NC}"
}

Write-Host ""

Pop-Location

# ==========================================
# Display Information
# ==========================================

Write-Host "${BLUE}========================================${NC}"
Write-Host "${GREEN}  [OK] Setup Complete!${NC}"
Write-Host "${BLUE}========================================`n${NC}"

Write-Host "${YELLOW}Starting services...`n${NC}"

Write-Host "${GREEN}Backend will be available at:${NC}  http://localhost:8000"
Write-Host "${GREEN}Frontend will be available at:${NC} http://localhost:3000"
Write-Host "${GREEN}Django Admin at:${NC}            http://localhost:8000/admin"
Write-Host ""
Write-Host "${YELLOW}Note:${NC} You will see logs from both services in separate windows."
Write-Host "${YELLOW}Note:${NC} Close the windows to stop the services."
Write-Host "${YELLOW}Note:${NC} To stop just one service, close that specific window.`n"

# ==========================================
# Start Backend
# ==========================================

Write-Host "${BLUE}========================================${NC}"
Write-Host "${BLUE}  Starting Backend (Django)${NC}"
Write-Host "${BLUE}========================================`n${NC}"

Push-Location $BACKEND_DIR
& $VENV_ACTIVATE

# Start backend in new window
Start-Process $POWERSHELL -ArgumentList "-NoExit", "-Command", "Set-Location '$BACKEND_DIR'; & '$VENV_ACTIVATE'; python manage.py runserver 0.0.0.0:8000" -WindowStyle Normal -PassThru

# Give backend time to start
Start-Sleep -Seconds 3

# ==========================================
# Start Frontend
# ==========================================

Write-Host "`n${BLUE}========================================${NC}"
Write-Host "${BLUE}  Starting Frontend (React + Vite)${NC}"
Write-Host "${BLUE}========================================`n${NC}"

Push-Location $FRONTEND_DIR

# Start frontend in new window
Start-Process $POWERSHELL -ArgumentList "-NoExit", "-Command", "Set-Location '$FRONTEND_DIR'; npm run dev" -WindowStyle Normal -PassThru

# Done
Write-Host "`n${GREEN}Both services are starting in separate windows...${NC}"
Write-Host "${GREEN}You can close this window anytime.${NC}`n"

Pop-Location
