#!/bin/bash
   
THIS_SCRIPT_DIR=$(cd "$(dirname "${BASH_SOURCE[0]}")" >/dev/null 2>&1 && pwd)
FRONTEND_DIR="$THIS_SCRIPT_DIR/frontend_code"
MONGODB_DIR=$THIS_SCRIPT_DIR/.mongodb_data

# Checking if npm command exists
if ! command -v mongod &> /dev/null; then
    echo ">> mongod does not appear to be installed."
    exit 1
fi

if [ ! -d "$MONGODB_DIR" ]; then
  mkdir -p "$MONGODB_DIR"
fi

mongod --dbpath="$MONGODB_DIR"
