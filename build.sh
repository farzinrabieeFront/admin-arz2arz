#!/usr/bin/env bash
rm -rf build
rm -rf node_modules
npm
npm build
IMAGE_NAME=${PWD##*/}
BRANCH=$(git branch | sed -n -e 's/^\* \(.*\)/\1/p')
if [ $BRANCH = "master" ]; then
  TAG_NAME="latest"
else
  TAG_NAME=$BRANCH
fi
docker rmi $(docker images -q --filter "dangling=true")
docker rmi "${1:-$IMAGE_NAME}":"${2:-$TAG_NAME}" --force
docker build . -t "${1:-$IMAGE_NAME}":"${2:-$TAG_NAME}" --no-cache
