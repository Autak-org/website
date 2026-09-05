#!/bin/bash

# Create a virtual environment (if not already created)
[ ! -d ".venv" ] && IS_FIRST_RUN=true || IS_FIRST_RUN=false
if $IS_FIRST_RUN; then
    echo "This is first time running the translation script. Setting up a python virtual environment..."
    python3 -m venv .venv
fi

# Activate the virtual environment
source .venv/bin/activate

if $IS_FIRST_RUN; then
    pip install -r requirements.txt
fi

# Run the translation script
python scripts/translate/main.py "$@"

# Deactivate the virtual environment
deactivate
