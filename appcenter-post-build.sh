#!/usr/bin/env bash

echo "APPCENTER environment variables:"
set | grep '^APPCENTER'

if [ -z ${APPCENTER_XCODE_SCHEME+x} ]
then
  echo "Android build"
else 
  echo "iOS build! $APPCENTER_XCODE_SCHEME"

  # echo "Installing applesimutils"
  # brew tap wix/brew
  # brew install applesimutils

  # echo "Detecting applesimutils"
  # which applesimutils

  # echo 'Detox build'
  # yarn detox build-framework-cache
  # yarn detox build --configuration ios.sim.release
  
  # echo 'Detox test'
  # yarn detox test --configuration ios.sim.release

  if [ "$APPCENTER_BRANCH" == "deploy-stage" ] || [ "$APPCENTER_BRANCH" == "production" ]; then
    echo Running bugsnagDSYMUpload.sh $APPCENTER_SOURCE_DIRECTORY $APPCENTER_OUTPUT_DIRECTORY/../symbols
    /usr/bin/env bash scripts/bugsnagDSYMUpload.sh $APPCENTER_SOURCE_DIRECTORY $APPCENTER_OUTPUT_DIRECTORY/../symbols
  fi
fi

# if [ "$APPCENTER_BRANCH" == "deploy-stage" ]
# then
  yarn bugsnag
# fi
