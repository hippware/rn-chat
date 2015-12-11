find node_modules -type f -name '.babelrc' | grep -v 'node_modules/react-native/packager/react-packager/.babelrc' | xargs rm
