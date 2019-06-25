#!/bin/sh -l

(
set -e
sh -c "yarn install"
sh -c "yarn $*"
)
errorCode=$?
if [ $errorCode -ne 0 ]; then
  echo "We have an error"
  curl -X POST -H 'Content-type: application/json' --data "{\"text\":\"Error in Action:\n*action*:$GITHUB_WORKFLOW - $GITHUB_ACTION\n*by*:$GITHUB_ACTOR\n*in*:$GITHUB_REF\"}" \
    PHARAH_SLACK_URL
  exit $errorCode
fi
