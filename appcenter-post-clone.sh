#!/usr/bin/env bash

brew uninstall node@6
NODE_VERSION="8.9.4"
curl "https://nodejs.org/dist/v${NODE_VERSION}/node-v${NODE_VERSION}.pkg" > "$HOME/Downloads/node-installer.pkg"
sudo installer -store -pkg "$HOME/Downloads/node-installer.pkg" -target "/"
echo "Node version..."
node --version

yarn
# these tests run on CircleCI
# yarn test

echo "Installing applesimutils"
mkdir simutils
cd simutils
curl https://raw.githubusercontent.com/wix/homebrew-brew/master/AppleSimulatorUtils-0.5.22.tar.gz -o applesimutils.tar.gz
tar xzvf applesimutils.tar.gz
sh buildForBrew.sh 
cd ..
export PATH=$PATH:./simutils/build/Build/Products/Release

echo "Detecting applesimutils"
which applesimutils
npm install -g detox-cli@7.2.0
echo 'Detox install'
set -ex
# TODO: re-enable detox
# yarn detox
