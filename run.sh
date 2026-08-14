#!/bin/bash

# ==========================================
# UIS Project Startup Script - Linux/macOS
# ==========================================
# This script automatically:
# - Checks and installs dependencies
# - Sets up virtual environment
# - Runs migrations
# - Starts both backend and frontend
# ==========================================

set -e  # Exit on error

PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BACKEND_DIR="$PROJECT_DIR/backend"
FRONTEND_DIR="$PROJECT_DIR/frontend"
VENV_DIR="$BACKEND_DIR/venv"

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}  UIS Project - Starting Both Services${NC}"
echo -e "${BLUE}========================================${NC}\n"

# ==========================================
# Check Prerequisites
# ==========================================

echo -e "${YELLOW}[1/5] Checking prerequisites...${NC}"

# Check Python
if ! command -v python3 &> /dev/null; then
    echo -e "${RED}❌ Python 3 not found! Please install Python 3.11+${NC}"
    exit 1
fi
echo -e "${GREEN}✓ Python 3 found: $(python3 --version)${NC}"

# Check Node.js
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js not found! Please install Node.js${NC}"
    exit 1
fi
echo -e "${GREEN}✓ Node.js found: $(node --version)${NC}"

# Check npm
if ! command -v npm &> /dev/null; then
    echo -e "${RED}❌ npm not found!${NC}"
    exit 1
fi
echo -e "${GREEN}✓ npm found: $(npm --version)${NC}\n"

# ==========================================
# Setup Backend
# ==========================================

echo -e "${YELLOW}[2/5] Setting up Backend...${NC}"

cd "$BACKEND_DIR"

# Create virtual environment if it doesn't exist
if [ ! -d "$VENV_DIR" ]; then
    echo "  Creating virtual environment..."
    python3 -m venv venv
    echo -e "${GREEN}  ✓ Virtual environment created${NC}"
fi

# Activate virtual environment
source "$VENV_DIR/bin/activate"
echo -e "${GREEN}  ✓ Virtual environment activated${NC}"

# Install/Update dependencies
echo "  Installing Python dependencies..."
pip install -q --upgrade pip
pip install -q -r requirements.txt
echo -e "${GREEN}  ✓ Python dependencies installed${NC}"

# Check and create .env if needed
if [ ! -f ".env" ]; then
    echo "  Creating .env file from .env.example..."
    if [ -f ".env.example" ]; then
        cp .env.example .env
        echo -e "${YELLOW}  ⚠ .env created. Please update with your MySQL credentials!${NC}"
    fi
fi

# Run migrations
echo "  Running database migrations..."
python manage.py migrate
echo -e "${GREEN}  ✓ Migrations completed${NC}\n"

# ==========================================
# Setup Frontend
# ==========================================

echo -e "${YELLOW}[3/5] Setting up Frontend...${NC}"

cd "$FRONTEND_DIR"

# Install npm dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "  Installing npm dependencies (this may take a few minutes)..."
    npm install -q
    echo -e "${GREEN}  ✓ npm dependencies installed${NC}"
else
    echo -e "${GREEN}  ✓ npm dependencies already installed${NC}"
fi

echo ""

# ==========================================
# Display Information
# ==========================================

echo -e "${BLUE}========================================${NC}"
echo -e "${GREEN}  ✓ Setup Complete!${NC}"
echo -e "${BLUE}========================================${NC}\n"

echo -e "${YELLOW}Starting services...${NC}\n"

echo -e "${GREEN}Backend will be available at:${NC}  http://localhost:8000"
echo -e "${GREEN}Frontend will be available at:${NC} http://localhost:3000"
echo -e "${GREEN}Django Admin at:${NC}            http://localhost:8000/admin"
echo ""
echo -e "${YELLOW}Note:${NC} You will see logs from both services below."
echo -e "${YELLOW}Note:${NC} Press Ctrl+C to stop both services."
echo -e "${YELLOW}Note:${NC} To stop just one service, open another terminal.\n"

# ==========================================
# Start Backend
# ==========================================

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}  Starting Backend (Django)${NC}"
echo -e "${BLUE}========================================${NC}\n"

cd "$BACKEND_DIR"
source "$VENV_DIR/bin/activate"

# Start backend in background
python manage.py runserver &
BACKEND_PID=$!

# Give backend time to start
sleep 3

# ==========================================
# Start Frontend
# ==========================================

echo -e "\n${BLUE}========================================${NC}"
echo -e "${BLUE}  Starting Frontend (React + Vite)${NC}"
echo -e "${BLUE}========================================${NC}\n"

cd "$FRONTEND_DIR"

# Start frontend in foreground (will show its logs)
npm run dev &
FRONTEND_PID=$!

# ==========================================
# Cleanup on Exit
# ==========================================

trap cleanup EXIT INT TERM

cleanup() {
    echo -e "\n\n${YELLOW}Shutting down services...${NC}"
    kill $BACKEND_PID 2>/dev/null || true
    kill $FRONTEND_PID 2>/dev/null || true
    wait $BACKEND_PID 2>/dev/null || true
    wait $FRONTEND_PID 2>/dev/null || true
    echo -e "${GREEN}✓ Services stopped${NC}"
    exit 0
}

# Keep script running
wait
