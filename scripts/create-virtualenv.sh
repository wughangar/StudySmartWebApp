#!/bin/bash
   
THIS_SCRIPT_DIR=$(cd "$(dirname "${BASH_SOURCE[0]}")" >/dev/null 2>&1 && pwd)
PROJECT_DIR=$(dirname "$THIS_SCRIPT_DIR")
BACKEND_DIR="$PROJECT_DIR/backend_code"
VENV_DIR=$PROJECT_DIR/.venv

if [ ! -d "$VENV_DIR" ]; then
  echo ">> Creating virtualenv..."
  python3 -m venv "$VENV_DIR"
fi

source "$VENV_DIR/bin/activate"

python3 -m pip install -r "$BACKEND_DIR/requirements.txt"

  
