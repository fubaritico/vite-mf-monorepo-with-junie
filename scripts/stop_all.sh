#!/bin/bash

echo "Stopping all running servers..."

# Find and kill all Vite development server processes
pkill -f "vite"

# Alternative approach: kill by port numbers
echo "Attempting to kill processes on ports 5000, 5001, and 5002..."
lsof -ti:5000 | xargs kill -9 2>/dev/null
lsof -ti:5001 | xargs kill -9 2>/dev/null
lsof -ti:5002 | xargs kill -9 2>/dev/null

echo "All servers have been stopped."
