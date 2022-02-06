#!/usr/bin/env bash

# 387p. 기존 엔진엑스에 연결되어 있지는 않지만, 실행 중이던 스프링 부트 종료

echo "> stop.sh 스크립트 실행"

ABSPATH=$(readlink -f $0)
ABSDIR=$(dirname $ABSPATH)
source ${ABSDIR}/profile.sh

IDLE_PORT=$(find_idle_port)


ROOT_DIR=$(dirname $ABSDIR)

if ! test -f "$ROOT_DIR/is-backend-changed"; then
    echo "> 백엔드에 변경사항이 없으므로 stop 하지 않습니다."
    exit 0;
fi

echo "> $IDLE_PORT 에서 구동중인 애플리케이션 pid 확인"
IDLE_PID=$(lsof -ti tcp:${IDLE_PORT})

if [ -z ${IDLE_PID} ]
then
  echo "> 현재 구동중인 애플리케이션이 없으므로 종료하지 않습니다."
else
  echo "> kill -15 $IDLE_PID"
  kill -15 ${IDLE_PID}
  sleep 5
fi