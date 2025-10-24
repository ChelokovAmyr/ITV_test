#!/bin/bash

echo "Starting Vue Dashboard Widgets..."
echo ""

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    npm install
    echo ""
fi

# Function to cleanup on exit
cleanup() {
    echo ""
    echo "Shutting down servers..."
    kill $API_PID $DEV_PID 2>/dev/null
    exit
}

trap cleanup INT TERM

echo "Starting Mock API Server..."
npm run server &
API_PID=$!

sleep 2

echo "Starting Development Server..."
npm run dev &
DEV_PID=$!

echo ""
echo "Both servers are running!"
echo "Mock API: http://localhost:3000"
echo "Frontend: http://localhost:5173"
echo ""
echo "Press Ctrl+C to stop all servers"

wait

