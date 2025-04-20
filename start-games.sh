#!/bin/bash

# Kill any existing processes on ports 5173, 5174, and 8080
echo "Checking for existing processes on ports 5173, 5174, and 8080..."
lsof -ti:5173 | xargs kill -9 2>/dev/null || true
lsof -ti:5174 | xargs kill -9 2>/dev/null || true
lsof -ti:8080 | xargs kill -9 2>/dev/null || true

# Start Cyber Catcher on port 5174
echo "Starting Cyber Catcher server on port 5174..."
cd cyber-catcher-vite
npm run dev -- --port 5174 &
CYBER_CATCHER_PID=$!

# Start Flappy Bird on port 8080
echo "Starting Flappy Bird server on port 8080..."
cd ../Flappy-Bird
http-server -p 8080 &
FLAPPY_BIRD_PID=$!

# Wait a moment for the first servers to initialize
sleep 3

# Start Game Terminal on port 5173
echo "Starting Game Terminal on port 5173..."
cd ../game-terminal
npm run dev -- --port 5173 &
GAME_TERMINAL_PID=$!

# Function to handle script termination
cleanup() {
  echo "Shutting down servers..."
  kill $CYBER_CATCHER_PID 2>/dev/null || true
  kill $FLAPPY_BIRD_PID 2>/dev/null || true
  kill $GAME_TERMINAL_PID 2>/dev/null || true
  exit 0
}

# Set up trap to catch termination signals
trap cleanup SIGINT SIGTERM

# Print URLs for easy access
echo ""
echo "====================================="
echo "Game Terminal: http://localhost:5173"
echo "Cyber Catcher: http://localhost:5174"
echo "Flappy Bird:   http://localhost:8080"
echo "====================================="
echo ""
echo "All three servers are running. Press Ctrl+C to stop all servers."

# Keep script running
wait
