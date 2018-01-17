import React from 'react';
import {Router, Scene, Stack} from 'react-native-router-flux';
import TestRegister, {Success} from './components/TestRegister';
import Launch from './components/Launch';
import store, {service} from './storeV2';
import {observer} from 'mobx-react/native';

const App = () => (
  <Router wrapBy={observer}>
    <Stack key='root' tabs hideTabBar hideNavBar lazy>
      <Stack key='launch' hideNavBar lightbox type='replace'>
        <Scene key='load' component={Launch} on={service.hydrate} success='connect' failure='testRegisterScene' />
        <Scene key='connect' on={() => service.login()} success='checkProfile' failure='testRegisterScene' />
        <Scene key='checkProfile' on={() => service.profile} success='checkHandle' failure='testRegisterScene' />
        <Scene key='checkHandle' on={() => service.profile.handle} success='success' failure='testRegisterScene' />
      </Stack>
      <Scene key='testRegisterScene' component={TestRegister} />
      <Scene key='success' component={Success} />
    </Stack>
  </Router>
);

export default App;
