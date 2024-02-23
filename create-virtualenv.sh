#!/bin/bash
   
THIS_SCRIPT_DIR=$(cd "$(dirname "${BASH_SOURCE[0]}")" >/dev/null 2>&1 && pwd)

VENV_DIR=$THIS_SCRIPT_DIR/.venv

if [ ! -d "$VENV_DIR" ]; then
  echo ">> Creating virtualenv..."
  python3 -m venv "$VENV_DIR"
fi

source "$VENV_DIR/bin/activate"

python3 -m pip install -r "$THIS_SCRIPT_DIR/requirements.txt"

  