#!/usr/bin/env bash

REPOSITORY=/home/ec2-user
PROJECT_DIR=dnd-6th-10-a-piece-of-writing/frontend

echo "> 빌드된 경로로 이동"
echo "> cd $REPOSITORY/$PROJECT_DIR"
cd $REPOSITORY/$PROJECT_DIR

echo "> 기존 프로세스 중단"
echo "> pm2 kill"
pm2 kill

echo "> 새 어플리케이션 배포"
echo "> pm2 start pm2.config.json"
pm2 start pm2.config.json