#!/usr/bin/env bash

react-native bundle --platform ios --entry-file index.ios.js --dev false --bundle-output ./ios/main.jsbundle --sourcemap-output ./sourcemap.js
curl https://upload.bugsnag.com/ \
  -F apiKey=f108fb997359e5519815d5fc58c79ad3 \
  -F appVersion=1.21 \
  -F minifiedUrl="main.jsbundle" \
  -F sourceMap=@./sourcemap.js \
  -F minifiedFile=@./ios/main.jsbundle \
  -F overwrite=true
