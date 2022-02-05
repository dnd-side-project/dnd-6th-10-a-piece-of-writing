#!/usr/bin/env bash

REPOSITORY=/home/ec2-user
PROJECT_DIR=dnd-6th-10-a-piece-of-writing/frontend

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion

echo "> 기존 프로세스 중단"
echo "> pm2 kill"
pm2 kill

echo "> 새 어플리케이션 배포"
echo "> pm2 start pm2.config.js"
pm2 start $REPOSITORY/$PROJECT_DIR/pm2.config.js