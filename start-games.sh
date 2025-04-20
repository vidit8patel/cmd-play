#!/bin/bash

# Kill any existing processes on ports 5173, 5174, 5175, 5176, 8080, and 5002
PORTS_TO_KILL="5173 5174 5175 5176 8080 5002"
echo "Checking for existing processes on ports $PORTS_TO_KILL..."
for PORT in $PORTS_TO_KILL; do
  lsof -ti:$PORT | xargs kill -9 2>/dev/null || true
done

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

# Start DataStruct Quest on port 5175
echo "Starting DataStruct Quest server on port 5175..."
cd ../DataStruct-Quest
npm run dev -- --port 5175 &
DATASTRUCT_QUEST_PID=$!

# Start SQL Murder Mystery (backend and frontend)
cd ../sql-murder-mystery
# Start backend proxy
PORT=5001 npm run start:server &
SQL_MURDER_BACKEND_PID=$!
# Wait briefly to ensure backend starts before frontend
sleep 1
# Start frontend
npm run dev -- --port 5176 &
SQL_MURDER_FRONTEND_PID=$!
# Return to root for next game
cd ..

# Wait a moment for the servers to initialize
sleep 3

# Start Game Terminal on port 5173
echo "Starting Game Terminal on port 5173..."
cd game-terminal
npm run dev -- --port 5173 &
GAME_TERMINAL_PID=$!

# Function to handle script termination
cleanup() {
  echo "Shutting down servers..."
  kill $CYBER_CATCHER_PID 2>/dev/null || true
  kill $FLAPPY_BIRD_PID 2>/dev/null || true
  kill $DATASTRUCT_QUEST_PID 2>/dev/null || true
  kill $SQL_MURDER_BACKEND_PID 2>/dev/null || true
  kill $SQL_MURDER_FRONTEND_PID 2>/dev/null || true
  kill $GAME_TERMINAL_PID 2>/dev/null || true
  exit 0
}

# Set up trap to catch termination signals
trap cleanup SIGINT SIGTERM

# Print URLs for easy access
echo ""
echo "====================================="
echo "Game Terminal:        http://localhost:5173"
echo "Cyber Catcher:        http://localhost:5174"
echo "Flappy Bird:          http://localhost:8080"
echo "DataStruct Quest:     http://localhost:5175"
echo "SQL Murder Mystery:   http://localhost:5176"
echo "====================================="
echo ""
echo "All five servers are running. Press Ctrl+C to stop all servers."

# Keep script running
wait
