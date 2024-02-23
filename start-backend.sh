#!/bin/bash
   
THIS_SCRIPT_DIR=$(cd "$(dirname "${BASH_SOURCE[0]}")" >/dev/null 2>&1 && pwd)
BACKEND_DIR="$THIS_SCRIPT_DIR/backend_code"
VENV_DIR=$THIS_SCRIPT_DIR/.venv

if [ ! -d "$VENV_DIR" ]; then
  "$THIS_SCRIPT_DIR/create-virtualenv.sh" 
fi

echo ">> Sourcing virtualenv: $VENV_DIR..."
source "$VENV_DIR/bin/activate"

export PYTHONPATH=$THIS_SCRIPT_DIR:$THIS_SCRIPT_DIR/backend_code:$PYTHONPATH

echo ">> Starting backend from: $BACKEND_DIR..."

pushd "$BACKEND_DIR" > /dev/null

python3 app.py

popd >/dev/null
