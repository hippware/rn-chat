#!/usr/bin/env bash
# Usage: ./codepush.sh [deployment name] [description] [bugsnag unique id] 

DEPLOYMENT_NAME=$1
DESCRIPTION=$2
RELEASE_ID=`date +"%Y-%m-%d_%H-%M-%S"`
BUILD_DIR=cpbuild
BUGSNAG_API_KEY=f108fb997359e5519815d5fc58c79ad3

if [ -z "$DEPLOYMENT_NAME" ]; then
    echo "No deployment name (e.g. StagingPavel) specified"
    echo "Usage: yarn codepush [deployment name] [description] [bugsnag unique id]"
    exit 1
fi

if [ -z "$DESCRIPTION" ]; then
    echo "No description specified"
    echo "Usage: yarn codepush [deployment name] [description] [bugsnag unique id]"
    exit 1
fi

# if [ -z "$RELEASE_ID" ]; then
#     echo "No bugsnag unique id specified"
#     echo "Usage: yarn codepush [deployment name] [description] [bugsnag unique id]"
#     exit 1
# fi

# Insert release identifier into the Bugsnag configuration
# (using macOS-specific sed arguments)
sed -e "2s/.*/const codeBundleId = \"$RELEASE_ID\"/" -i '' src/utils/bugsnagConfig.js

# Release iOS App
## Release JS bundle via Code Push

./node_modules/.bin/appcenter codepush release-react -a hippware/tinyrobot-2 -d $DEPLOYMENT_NAME --description "$DESCRIPTION" --output-dir $BUILD_DIR


## Upload source map and sources to Bugsnag
yarn bugsnag-sourcemaps upload \
    --api-key $BUGSNAG_API_KEY \
    --code-bundle-id $RELEASE_ID \
    --source-map $BUILD_DIR/CodePush/main.jsbundle.map \
    --minified-file $BUILD_DIR/CodePush/main.jsbundle \
    --minified-url main.jsbundle \
    --upload-sources \
    --add-wildcard-prefix

echo 'bugsnag id =' $RELEASE_ID

rm -rf $BUILD_DIR

# discard changes to bugsnagConfig.js
git checkout -- src/utils/bugsnagConfig.js
