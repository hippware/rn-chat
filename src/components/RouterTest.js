// @flow

import React from 'react';
import {observer} from 'mobx-react/native';
import {Router, Scene, Stack} from 'react-native-router-flux';

import SignUp from './SignUp';
import MyAccount from './MyAccount';
import ProfileDetail from './ProfileDetail';

const wocky = {
  profile: {
    handle: 'jerkham',
    firstName: 'eric',
    lastName: 'kirkham',
    email: 'eric.kirkham@gmail.com',
    loaded: true,
  },
};

const TinyRobotRouter = () => (
  <Router wrapBy={observer}>
    <Stack key='rootStack' initial hideNavBar>
      <Stack key='root' tabs hideTabBar hideNavBar lazy>
        <Scene key='signUp' component={SignUp} hideNavBar wocky={wocky} />
      </Stack>
      <Scene key='profileDetails' component={ProfileDetail} clone back navTransparent={false} />
      <Scene key='myAccount' component={MyAccount} editMode clone back />
    </Stack>
  </Router>
);

export default TinyRobotRouter;
