@echo off
REM Quick start script for DevFlow AI (Windows)

echo.
echo DevFlow AI - Quick Start
echo ================================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo  Node.js is not installed. Please install Node.js first.
    exit /b 1
)

for /f "tokens=*" %%i in ('node -v') do set NODE_VERSION=%%i
echo  Node.js is installed: %NODE_VERSION%
echo.

REM Install backend dependencies
echo  Installing backend dependencies...
cd backend
call npm install
if %ERRORLEVEL% NEQ 0 (
    echo  Backend installation failed
    cd ..
    exit /b 1
)
cd ..
echo Backend dependencies installed
echo.

REM Install frontend dependencies
echo  Installing frontend dependencies...
cd frontend
call npm install
if %ERRORLEVEL% NEQ 0 (
    echo Frontend installation failed
    cd ..
    exit /b 1
)
cd ..
echo  Frontend dependencies installed
echo.

echo  Setup complete!
echo.
echo To start development:
echo.
echo Command Prompt 1 (Backend):
echo   cd backend
echo   npm run dev
echo.
echo Command Prompt 2 (Frontend):
echo   cd frontend
echo   npm run dev
echo.
echo Frontend will be available at: http://localhost:5173
echo Backend will be available at: http://localhost:5000
echo.
pause
