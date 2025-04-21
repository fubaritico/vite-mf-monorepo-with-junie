#!/bin/bash
cd packages/list && pnpm run dev &
echo "List project started in the background. Process ID: $!"
