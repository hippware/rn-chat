#!/usr/bin/env bash

echo "Build ID: $APPCENTER_BUILD_ID"
echo "Branch: $APPCENTER_BRANCH"

if [ "$APPCENTER_BRANCH" == "deploy-stage" ]
then
  echo "Codepush StagingRollback bundle"
  ./node_modules/.bin/appcenter codepush release-react -a hippware/tinyrobot-2 -d StagingRollback --description "rollback to TestFlight version" --token $CODEPUSH_TOKEN_ERIC
fi

if [ "$APPCENTER_BRANCH" == "deploy-stage"  ] || [ "$APPCENTER_BRANCH" == "production" ]
then
  yarn bugsnag $APPCENTER_BUILD_ID
fi
