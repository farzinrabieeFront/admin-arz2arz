#!/usr/bin/env bash
IMAGE_NAME=${PWD##*/}
BRANCH=$(git branch | sed -n -e 's/^\* \(.*\)/\1/p')
if [ $BRANCH = "master" ]; then
  TAG_NAME="latest"
else
  TAG_NAME=$BRANCH
fi
ssh -p 5833 -C naradmin@79.175.169.74 docker-compose -f /home/naradmin/compose/frontends.yml down
ssh -p 5833 -C naradmin@79.175.169.74 docker rmi "${1:-$IMAGE_NAME}":"${2:-$TAG_NAME}" --force
docker save "${1:-$IMAGE_NAME}":"${2:-$TAG_NAME}" | pv | ssh -p 5833 -C naradmin@79.175.169.74 docker load
ssh -p 5833 -C naradmin@79.175.169.74 docker-compose -f /home/naradmin/compose/frontends.yml up -d