#!/usr/bin/env bash

ABSPATH=$(readlink -f $0)
SCRIPT_DIR=$(dirname $ABSPATH)
ROOT_DIR=$(dirname $SCRIPT_DIR)

if test -f "$ROOT_DIR/is-frontend-changed"; then
    chmod +x $SCRIPT_DIR/frontend-start.sh
    bash $SCRIPT_DIR/frontend-start.sh
fi

if test -f "$ROOT_DIR/is-backend-changed"; then
    chmod +x $SCRIPT_DIR/backend-start.sh
    bash $SCRIPT_DIR/backend-start.sh
fi