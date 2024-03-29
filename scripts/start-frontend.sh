#!/bin/bash
   
THIS_SCRIPT_DIR=$(cd "$(dirname "${BASH_SOURCE[0]}")" >/dev/null 2>&1 && pwd)
PROJECT_DIR=$(dirname "$THIS_SCRIPT_DIR")

FRONTEND_DIR="$PROJECT_DIR/frontend_code"

# Checking if npm command exists
if ! command -v npm &> /dev/null; then
    echo ">> npm does not appear to be installed."
    exit 1
fi

pushd "$FRONTEND_DIR" > /dev/null || exit 

npm install

npm start

popd > /dev/null || exit 
