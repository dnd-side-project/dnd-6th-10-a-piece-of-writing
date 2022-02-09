#!/usr/bin/env bash

REPOSITORY=/home/ec2-user
PROJECT_DIR=dnd-6th-10-a-piece-of-writing/frontend

if [ -d "$REPOSITORY/$PROJECT_DIR/" ]; then
    rm -rf "$REPOSITORY/$PROJECT_DIR/"
fi
mkdir -vp $REPOSITORY/$PROJECT_DIR/
