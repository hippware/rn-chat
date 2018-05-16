#!/bin/sh

cd $NEVERCODE_BUILD_DIR
set -e	# exit on first failed command
set -x  # print all executed commands to the terminal

npm install react-native-cli yarn detox-cli -g
yarn
date
yarn test

# DETOX
brew tap wix/brew
brew install applesimutils
# we don't need to pod install as long as we're keeping pods checked into git
# - run: pod install --project-directory=./ios
#detox build --configuration ios.sim.release
#detox clean-framework-cache && detox build-framework-cache
#detox test --configuration ios.sim.release --cleanup

# gem uninstall -a -x cocoapods
# gem install cocoapods -v 1.3.1
# pod repo update
date
