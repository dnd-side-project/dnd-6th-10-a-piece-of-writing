#!/bin/bash

# 새로운 WAS를 띄우는 스크립트

CURRENT_PORT=$(cat /home/ec2-user/service_url.inc | grep -Po '[0-9]+' | tail -1)
TARGET_PORT=0

echo "> Current port of running WAS is ${CURRENT_PORT}."

if [ ${CURRENT_PORT} -eq 8081 ]; then
  TARGET_PORT=8082
elif [ ${CURRENT_PORT} -eq 8082 ]; then
  TARGET_PORT=8081
else
  echo "> No WAS is connected to nginx"
fi

TARGET_PID=$(lsof -Fp -i TCP:${TARGET_PORT} | grep -Po 'p[0-9]+' | grep -Po '[0-9]+')

if [ ! -z ${TARGET_PID} ]; then
  echo "> Kill WAS running at ${TARGET_PORT}."
  sudo kill ${TARGET_PID}
fi

# CI/CD 기본 배포 성공. application.properties, application-real.properties, applicatiton-real-db.properties 적용 전.
#nohup java -jar -Dserver.port=${TARGET_PORT} /home/ec2-user/dnd-6th-10-a-piece-of-writing/backend/build/libs/* > /home/ec2-user/nohup.out 2>&1 &
#echo "> Now new WAS runs at ${TARGET_PORT}."
#exit 0

# application.properties, application-real.properties, applicatiton-real-db.properties 적용.
nohup java -jar \
    -Dspring.config.location=classpath:/application.properties,classpath:/application-real.properties,/home/ec2-user/app/application-real-db.properties \
    -Dspring.profiles.active=real \
#    $JAR_NAME > $REPOSITORY/nohup.out 2>&1 &
    -Dserver.port=${TARGET_PORT} /home/ec2-user/dnd-6th-10-a-piece-of-writing/backend/build/libs/* > /home/ec2-user/nohup.out 2>&1 &
echo "> Now new WAS runs at ${TARGET_PORT}."
exit 0
