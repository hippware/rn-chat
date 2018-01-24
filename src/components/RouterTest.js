// @flow

import React from 'react';
import {observer} from 'mobx-react/native';
import {Router, Scene, Stack} from 'react-native-router-flux';

import SignUp from './SignUp';
import MyAccount from './MyAccount';
import ProfileDetail from './ProfileDetail';
import SignIn from './SignIn';

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
    <Stack key='rootStack' initial>
      {/* <Scene key='signIn' component={SignIn} back /> */}
      <Scene key='myAccount' component={MyAccount} wocky={wocky} title='My Account' />
      <Scene key='signUp' component={SignUp} wocky={wocky} />
      <Scene key='profileDetails' component={ProfileDetail} clone back navTransparent={false} />
    </Stack>
  </Router>
);

export default TinyRobotRouter;
