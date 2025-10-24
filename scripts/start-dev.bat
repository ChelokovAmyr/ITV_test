@echo off
echo Starting Vue Dashboard Widgets...
echo.

REM Check if node_modules exists
if not exist "node_modules" (
    echo Installing dependencies...
    call npm install
    echo.
)

echo Starting Mock API Server...
start "Mock API Server" cmd /k "npm run server"

timeout /t 2 /nobreak > nul

echo Starting Development Server...
start "Dev Server" cmd /k "npm run dev"

echo.
echo Both servers are starting...
echo Mock API: http://localhost:3000
echo Frontend: http://localhost:5173
echo.

