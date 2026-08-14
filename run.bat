@echo off
REM ==========================================
REM UIS Project Startup Script - Windows CMD
REM ==========================================
REM This script automatically:
REM - Checks and installs dependencies
REM - Sets up virtual environment
REM - Runs migrations
REM - Starts both backend and frontend
REM ==========================================

setlocal enabledelayedexpansion

set PROJECT_DIR=%~dp0
set BACKEND_DIR=%PROJECT_DIR%backend
set FRONTEND_DIR=%PROJECT_DIR%frontend
set VENV_DIR=%BACKEND_DIR%\venv

cls
echo ==========================================
echo   UIS Project - Starting Both Services
echo ==========================================
echo.

REM ==========================================
REM Check Prerequisites
REM ==========================================

echo [1/5] Checking prerequisites...

REM Check Python
python --version >nul 2>&1
if errorlevel 1 (
    echo.
    echo ERROR: Python not found!
    echo Please install Python 3.11+ from https://www.python.org/
    echo Make sure to check "Add Python to PATH" during installation
    echo.
    pause
    exit /b 1
)

for /f "tokens=*" %%i in ('python --version') do set PYTHON_VERSION=%%i
echo OK: %PYTHON_VERSION%

REM Check Node.js
node --version >nul 2>&1
if errorlevel 1 (
    echo.
    echo ERROR: Node.js not found!
    echo Please install Node.js from https://nodejs.org/
    echo.
    pause
    exit /b 1
)

for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
echo OK: Node.js !NODE_VERSION!

REM Check npm
npm --version >nul 2>&1
if errorlevel 1 (
    echo.
    echo ERROR: npm not found!
    echo.
    pause
    exit /b 1
)

for /f "tokens=*" %%i in ('npm --version') do set NPM_VERSION=%%i
echo OK: npm !NPM_VERSION!
echo.

REM ==========================================
REM Setup Backend
REM ==========================================

echo [2/5] Setting up Backend...

cd /d "%BACKEND_DIR%"

REM Create virtual environment if it doesn't exist
if not exist "%VENV_DIR%" (
    echo   Creating virtual environment...
    python -m venv venv
    if errorlevel 1 (
        echo.
        echo ERROR: Failed to create virtual environment
        echo.
        pause
        exit /b 1
    )
    echo   OK: Virtual environment created
)

REM Activate virtual environment
call "%VENV_DIR%\Scripts\activate.bat"
if errorlevel 1 (
    echo.
    echo ERROR: Failed to activate virtual environment
    echo.
    pause
    exit /b 1
)
echo   OK: Virtual environment activated

REM Install dependencies
echo   Installing Python dependencies...
python -m pip install --upgrade pip >nul 2>&1
pip install -q -r requirements.txt
if errorlevel 1 (
    echo.
    echo ERROR: Failed to install dependencies
    echo Check your internet connection and requirements.txt
    echo.
    pause
    exit /b 1
)
echo   OK: Python dependencies installed

REM Check and create .env if needed
if not exist ".env" (
    echo   Creating .env file from .env.example...
    if exist ".env.example" (
        copy ".env.example" ".env" >nul
        echo   WARNING: .env created. Please update with your MySQL credentials!
    )
)

REM Run migrations
echo   Running database migrations...
python manage.py migrate -q
if errorlevel 1 (
    echo.
    echo ERROR: Migration failed
    echo Make sure MySQL is running and database is configured in .env
    echo.
    pause
    exit /b 1
)
echo   OK: Migrations completed
echo.

REM ==========================================
REM Setup Frontend
REM ==========================================

echo [3/5] Setting up Frontend...

cd /d "%FRONTEND_DIR%"

REM Install npm dependencies if node_modules doesn't exist
if not exist "node_modules" (
    echo   Installing npm dependencies (this may take a few minutes)...
    call npm install -q
    if errorlevel 1 (
        echo.
        echo ERROR: Failed to install npm dependencies
        echo Check your internet connection
        echo.
        pause
        exit /b 1
    )
    echo   OK: npm dependencies installed
) else (
    echo   OK: npm dependencies already installed
)

echo.

REM ==========================================
REM Display Information
REM ==========================================

echo ==========================================
echo   OK: Setup Complete!
echo ==========================================
echo.

echo Starting services...
echo.

echo Backend will be available at:  http://localhost:8000
echo Frontend will be available at: http://localhost:3000
echo Django Admin at:               http://localhost:8000/admin
echo.
echo Note: You will see logs from both services in separate windows.
echo Note: Close the windows to stop the services.
echo Note: To stop just one service, close that specific window.
echo.

REM ==========================================
REM Start Backend
REM ==========================================

echo ==========================================
echo   Starting Backend (Django)
echo ==========================================
echo.

cd /d "%BACKEND_DIR%"
call "%VENV_DIR%\Scripts\activate.bat"

start "UIS Backend" cmd /k python manage.py runserver

REM Give backend time to start
timeout /t 2 /nobreak >nul

REM ==========================================
REM Start Frontend
REM ==========================================

echo.
echo ==========================================
echo   Starting Frontend (React + Vite)
echo ==========================================
echo.

cd /d "%FRONTEND_DIR%"

start "UIS Frontend" cmd /k npm run dev

REM Keep main window open
echo.
echo Both services are starting in separate windows...
echo You can close this window anytime.
echo.
pause
