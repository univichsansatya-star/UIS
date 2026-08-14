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
try {
    $python_version = python --version 2>&1
    Write-Host "${GREEN}✓ Python found: $python_version${NC}"
} catch {
    Write-Host "${RED}❌ Python not found!${NC}"
    Write-Host "Please install Python 3.11+ from https://www.python.org/"
    Write-Host "Make sure to check 'Add Python to PATH' during installation`n"
    Read-Host "Press Enter to exit"
    exit 1
}

# Check Node.js
try {
    $node_version = node --version
    Write-Host "${GREEN}✓ Node.js found: $node_version${NC}"
} catch {
    Write-Host "${RED}❌ Node.js not found!${NC}"
    Write-Host "Please install Node.js from https://nodejs.org/`n"
    Read-Host "Press Enter to exit"
    exit 1
}

# Check npm
try {
    $npm_version = npm --version
    Write-Host "${GREEN}✓ npm found: $npm_version${NC}`n"
} catch {
    Write-Host "${RED}❌ npm not found!`n"
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
    Write-Host "${GREEN}  ✓ Virtual environment created${NC}"
}

# Activate virtual environment
& $VENV_ACTIVATE

Write-Host "${GREEN}  ✓ Virtual environment activated${NC}"

# Install dependencies
Write-Host "  Installing Python dependencies..."
python -m pip install --upgrade pip | Out-Null
pip install -q -r requirements.txt

if ($LASTEXITCODE -ne 0) {
    Write-Host "${RED}  ❌ Failed to install dependencies${NC}"
    Write-Host "  Check your internet connection and requirements.txt`n"
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host "${GREEN}  ✓ Python dependencies installed${NC}"

# Check and create .env if needed
if (-not (Test-Path ".env")) {
    Write-Host "  Creating .env file from .env.example..."
    if (Test-Path ".env.example") {
        Copy-Item ".env.example" ".env"
        Write-Host "${YELLOW}  ⚠ .env created. Please update with your MySQL credentials!${NC}"
    }
}

# Run migrations
Write-Host "  Running database migrations..."
python manage.py migrate -q

if ($LASTEXITCODE -ne 0) {
    Write-Host "${RED}  ❌ Migration failed${NC}"
    Write-Host "  Make sure MySQL is running and database is configured in .env`n"
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host "${GREEN}  ✓ Migrations completed`n${NC}"

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
        Write-Host "${RED}  ❌ Failed to install npm dependencies${NC}"
        Write-Host "  Check your internet connection`n"
        Read-Host "Press Enter to exit"
        exit 1
    }
    
    Write-Host "${GREEN}  ✓ npm dependencies installed${NC}"
} else {
    Write-Host "${GREEN}  ✓ npm dependencies already installed${NC}"
}

Write-Host ""

Pop-Location

# ==========================================
# Display Information
# ==========================================

Write-Host "${BLUE}========================================${NC}"
Write-Host "${GREEN}  ✓ Setup Complete!${NC}"
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
Start-Process pwsh -ArgumentList "-NoExit", "-Command", "cd '$BACKEND_DIR'; & '$VENV_ACTIVATE'; python manage.py runserver" -WindowStyle Normal -PassThru

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
Start-Process pwsh -ArgumentList "-NoExit", "-Command", "cd '$FRONTEND_DIR'; npm run dev" -WindowStyle Normal -PassThru

# Done
Write-Host "`n${GREEN}Both services are starting in separate windows...${NC}"
Write-Host "${GREEN}You can close this window anytime.${NC}`n"

Pop-Location
