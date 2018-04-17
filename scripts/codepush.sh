#!/usr/bin/env bash
# Usage: ./codepush.sh [version number] [deployment name] [description]

RELEASE_ID=$1
DEPLOYMENT_NAME=$2
DESCRIPTION=$3
BUILD_DIR=cpbuild
BUGSNAG_API_KEY=f108fb997359e5519815d5fc58c79ad3

# TODO: set BUGSNAG_API_KEY externally
# if [ -z "$BUGSNAG_API_KEY" ]; then
#     echo "Please set the BUGSNAG_API_KEY environment variable to continue."
#     exit 1
# fi

if [ -z "$RELEASE_ID" ]; then
    echo "No version number specified"
    echo "Usage: $0 [version number] [deploymentName] [description]"
    exit 1
fi

if [ -z "$DEPLOYMENT_NAME" ]; then
    echo "No deployment name (e.g. StagingPavel) specified"
    echo "Usage: $0 [version number] [deploymentName] [description]"
    exit 1
fi

if [ -z "$DESCRIPTION" ]; then
    echo "No description specified"
    echo "Usage: $0 [version number] [deploymentName] [description]"
    exit 1
fi

# Insert release identifier into the Bugsnag configuration
# (using macOS-specific sed arguments)
sed -e "2s/.*/const codeBundleId = \"$RELEASE_ID\"/" -i '' src/utils/bugsnagConfig.js

# Release iOS App
## Release JS bundle via Code Push

# below didn't write anything to output-dir
# appcenter codepush release-react -a southerneer/tinyrobot \
#     -d $DEPLOYMENT_NAME \
#     --description "$DESCRIPTION" \
#     --output-dir $BUILD_DIR

code-push release-react tinyrobot ios \
    --outputDir $BUILD_DIR \
    --deploymentName $DEPLOYMENT_NAME \
    --description "$DESCRIPTION" \

## Upload source map and sources to Bugsnag
yarn bugsnag-sourcemaps upload \
    --api-key $BUGSNAG_API_KEY \
    --code-bundle-id $RELEASE_ID \
    --source-map $BUILD_DIR/main.jsbundle.map \
    --minified-file $BUILD_DIR/main.jsbundle \
    --minified-url main.jsbundle \
    --upload-sources \
    --add-wildcard-prefix

rm -rf $BUILD_DIR