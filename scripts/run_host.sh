#!/bin/bash
cd apps/host && pnpm run dev &
echo "Host application started in the background. Process ID: $!"
