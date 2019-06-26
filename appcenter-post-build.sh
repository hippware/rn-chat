#!/usr/bin/env bash

if [ -z ${APPCENTER_XCODE_SCHEME+x} ]
then
  echo "Android build"
else 
  echo "iOS build! $APPCENTER_XCODE_SCHEME"

  echo "Installing applesimutils"
  brew tap wix/brew
  brew install applesimutils

  echo "Detecting applesimutils"
  which applesimutils

  echo 'Running detox'
  # yarn detox
fi

if [ "$APPCENTER_BRANCH" == "deploy-stage" ] || [ "$APPCENTER_BRANCH" == "production" ]
then
  yarn bugsnag
fi
