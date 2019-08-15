#!/usr/bin/env bash

echo "APPCENTER environment variables:"
set | grep '^APPCENTER'

# brew uninstall node@6
# NODE_VERSION="11.3.0"
# curl "https://nodejs.org/dist/v${NODE_VERSION}/node-v${NODE_VERSION}.pkg" > "$HOME/Downloads/node-installer.pkg"
# sudo installer -store -pkg "$HOME/Downloads/node-installer.pkg" -target "/"
# echo "Node version..."
# node --version

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

  echo 'Detox build'
  yarn detox build-framework-cache
  yarn detox build --configuration ios.sim.release
  
  echo 'Detox test'
  yarn detox test --configuration ios.sim.release
fi