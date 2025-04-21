#!/bin/bash

# Load environment variables from .env file
if [ -f .env ]; then
  export $(grep -v '^#' .env | xargs)
fi

# Load local environment variables from .env file
if [ -f .env.local ]; then
  export $(grep -v '^#' .env.local | xargs)
fi

# Start the list and detail packages first
echo "Starting list package..."
cd packages/list && pnpm run dev &
LIST_PID=$!
echo "List package started with PID: $LIST_PID"

# Wait a moment to ensure the list package has started
sleep 2

echo "Starting detail package..."
cd packages/detail && pnpm run dev &
DETAIL_PID=$!
echo "Detail package started with PID: $DETAIL_PID"

# Wait a moment to ensure the detail package has started
sleep 2

# Start the host application last
echo "Starting host application..."
cd apps/host && pnpm run dev &
HOST_PID=$!
echo "Host application started with PID: $HOST_PID"

echo "All applications started. Press Ctrl+C to stop all."

# Wait for user to press Ctrl+C
wait
