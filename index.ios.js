// import React from 'react-native';

// const {AppRegistry} = React;
// import App from './src/App';

// in case isolated work, comment line above and uncomment lines below
import React from 'react';
import {Text, AppRegistry, View} from 'react-native';
import {Router, Scene, Stack} from 'react-native-router-flux';
import TestRegister from './src/components/TestRegister';

const App = () => (
  <Router>
    <Stack key='root' tabs hideTabBar hideNavBar lazy>
      <Scene key='testRegisterScene' component={TestRegister} />
    </Stack>
  </Router>
);

AppRegistry.registerComponent('App', () => App);
