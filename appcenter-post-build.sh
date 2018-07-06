#!/usr/bin/env bash

echo "Checking for deploy-stage..."
echo $APPCENTER_BRANCH

if [$APPCENTER_BRANCH -eq "deploy-stage"]
then
  echo "Codepush StagingRollback bundle"
  ./node_modules/.bin/appcenter codepush release-react -a hippware/tinyrobot-2 -d StagingRollback --description "rollback to TestFlight version" --token $CODEPUSH_TOKEN_ERIC
fi