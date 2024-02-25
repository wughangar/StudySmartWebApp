#!/bin/bash
   
THIS_SCRIPT_DIR=$(cd "$(dirname "${BASH_SOURCE[0]}")" >/dev/null 2>&1 && pwd)
PROJECT_DIR=$(dirname "$THIS_SCRIPT_DIR")
BACKEND_DIR="$PROJECT_DIR/backend_code"
VENV_DIR=$PROJECT_DIR/.venv

if [ ! -d "$VENV_DIR" ]; then
  "$PROJECT_DIR/create-virtualenv.sh" 
fi

echo ">> Sourcing virtualenv: $VENV_DIR..."
source "$VENV_DIR/bin/activate"

export PYTHONPATH=$PROJECT_DIR:$PROJECT_DIR/backend_code:$PYTHONPATH

echo ">> Starting backend from: $BACKEND_DIR..."

pushd "$BACKEND_DIR" > /dev/null || exit 1

python3 app.py

popd >/dev/null || exit 1
