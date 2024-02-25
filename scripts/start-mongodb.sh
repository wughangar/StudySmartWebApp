#!/bin/bash
   
THIS_SCRIPT_DIR=$(cd "$(dirname "${BASH_SOURCE[0]}")" >/dev/null 2>&1 && pwd)
PROJECT_DIR=$(dirname "$THIS_SCRIPT_DIR")

FRONTEND_DIR="$PROJECT_DIR/frontend_code"
MONGODB_DIR=$PROJECT_DIR/.mongodb_data

# Checking if npm command exists
if ! command -v mongod &> /dev/null; then
    echo ">> mongod does not appear to be installed."
    exit 1
fi

if [ ! -d "$MONGODB_DIR" ]; then
  mkdir -p "$MONGODB_DIR"
fi

mongod --dbpath="$MONGODB_DIR"
