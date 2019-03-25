#!/usr/bin/env bash

echo "Build ID: $APPCENTER_BUILD_ID"
echo "Branch: $APPCENTER_BRANCH"

if [ "$APPCENTER_BRANCH" == "deploy-stage"  ] || [ "$APPCENTER_BRANCH" == "production" ]
then
  yarn bugsnag $APPCENTER_BUILD_ID
fi
