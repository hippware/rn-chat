import {AppRegistry} from 'react-native'
import {getStorybookUI, configure} from '@storybook/react-native'

// import './rn-addons'

// TODO: figure out how to do this with babel config: https://github.com/storybooks/storybook/pull/4077
// currently importing this causes packager error "bundling failed: Error: Couldn't find preset "./.babelrc.js" relative to directory "/Users/kirkham/dev/rn-chat/node_modules/react-split-pane""
// import './addons'

// import stories
configure(() => {
  require('./stories')
}, module)

// Refer to https://github.com/storybooks/storybook/tree/master/app/react-native#start-command-parameters
// To find allowed options for getStorybookUI
const StorybookUIRoot = getStorybookUI({shouldPersistSelection: true})

// If you are using React Native vanilla and after installation you don't see your app name here, write it manually.
// If you use Expo you can safely remove this line.
AppRegistry.registerComponent('App', () => StorybookUIRoot)

export default StorybookUIRoot
