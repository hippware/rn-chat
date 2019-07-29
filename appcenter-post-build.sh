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
  yarn detox

  if [ "$APPCENTER_BRANCH" == "deploy-stage" ] || [ "$APPCENTER_BRANCH" == "bt-appcenter-testing" ]; then
    /usr/bin/env bash scripts/bugsnagDSYMUpload.sh $APPCENTER_SOURCE_DIRECTORY $APPCENTER_OUTPUT_DIRECTORY
  fi
fi

if [ "$APPCENTER_BRANCH" == "deploy-stage" ]
then
  yarn bugsnag
fi
