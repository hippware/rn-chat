#!/usr/bin/env bash

if [ "$APPCENTER_BRANCH" == "deploy-stage" ] || [ "$APPCENTER_BRANCH" == "production" ]
then
  yarn bugsnag
fi
