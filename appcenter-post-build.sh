#!/usr/bin/env bash

echo "Installing applesimutils"
brew tap wix/brew
brew install applesimutils

echo "Detecting applesimutils"
which applesimutils
# npm install -g detox-cli
echo 'Running detox'
yarn detox


if [ "$APPCENTER_BRANCH" == "deploy-stage" ] || [ "$APPCENTER_BRANCH" == "production" ]
then
  yarn bugsnag
fi
