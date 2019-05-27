#!/usr/bin/env bash

echo "APPCENTER environment variables:"
set | grep '^APPCENTER'

# brew uninstall node@6
# NODE_VERSION="11.3.0"
# curl "https://nodejs.org/dist/v${NODE_VERSION}/node-v${NODE_VERSION}.pkg" > "$HOME/Downloads/node-installer.pkg"
# sudo installer -store -pkg "$HOME/Downloads/node-installer.pkg" -target "/"
# echo "Node version..."
# node --version
