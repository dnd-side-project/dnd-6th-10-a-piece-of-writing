#!/usr/bin/env bash

# 387p. 배포할 신규 버젼 스프링 부트 프로젝트를 stop.sh로 종료한 'profile'로 실행

ABSPATH=$(readlink -f $0)
ABSDIR=$(dirname $ABSPATH)
source ${ABSDIR}/profile.sh

REPOSITORY=/home/ec2-user
PROJECT_DIR=dnd-6th-10-a-piece-of-writing/backend
JAR_DIR=build/libs
PROJECT_NAME=backend

echo "> Build 파일 복사"
echo "> cp $REPOSITORY/$PROJECT_DIR/$JAR_DIR/*.jar $REPOSITORY/"

cp $REPOSITORY/$PROJECT_DIR/$JAR_DIR/*.jar $REPOSITORY/

echo "> 새 어플리케이션 배포"
JAR_NAME=$(ls -tr $REPOSITORY/*.jar | tail -n 1)

echo "> JAR Name: $JAR_NAME"

echo "> $JAR_NAME 에 실행권한 추가"

chmod +x $JAR_NAME

echo "> $JAR_NAME 실행"

IDLE_PROFILE=$(find_idle_profile)

echo "> $JAR_NAME 를 profile=$IDLE_PROFILE 로 실행합니다."
nohup java -jar \
    -Dspring.config.location=classpath:/application.properties,classpath:/application-$IDLE_PROFILE.properties,/home/ec2-user/app/application-real-db.properties \
    -Dspring.profiles.active=$IDLE_PROFILE \
    $JAR_NAME > $REPOSITORY/nohup.out 2>&1 &