#!/bin/sh

cd $NEVERCODE_BUILD_DIR
set -e	# exit on first failed command
set -x  # print all executed commands to the terminal

npm install react-native-cli yarn -g
yarn
date
yarn test
npm run bugsnag

#cd ../..
#react-native bundle --minify --dev false --entry-file index.ios.js --platform ios --assets-dest ios.bundle --bundle-output ios.bundle/main.jsbundle
#zip -r os.bundle.zip ios.bundle
#npm run sign os.bundle.zip
#zip main.zip ios.bundle.zip  signature.txt
#find node_modules -type f -name '.babelrc' | grep -v 'node_modules/react-native/packager/react-packager/.babelrc' | xargs rm
