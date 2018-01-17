// @flow

import React from 'react';
import {View, Text} from 'react-native';
import {Actions, Router, Scene, Stack, Lightbox, Drawer, Modal, Tabs} from 'react-native-router-flux';
import {observer, Provider, inject} from 'mobx-react/native';
import {CubeNavigator} from 'react-native-cube-transition';

import store from './storeV2';

import TestRegister from './components/TestRegister';
import Launch from './components/Launch';
import OnboardingSlideshow from './components/OnboardingSlideshowScene';
import SignIn from './components/SignIn';
import VerifyCode from './components/VerifyCode';
// import SignUp from './components/SignUp';
import SideMenu from './components/SideMenu';
// import Home from './components/Home';

const Success = inject('store')(({store: theStore}) => {
  console.log('Success! Injected store is', theStore);
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text style={{fontSize: 32}}>SUCCESS!!</Text>
    </View>
  );
});

const App2 = () => (
  <Provider store={store}>
    <Router wrapBy={observer}>
      <Lightbox>
        <Stack key='rootStack' initial hideNavBar>
          <Stack key='root' tabs hideTabBar hideNavBar lazy>
            <Stack key='launch' hideNavBar lightbox type='replace'>
              <Scene key='load' component={Launch} on={store.hydrate} success='checkProfile' failure='testRegisterScene' />
              <Scene key='connect' on={() => store.login()} success='checkProfile' failure='testRegisterScene' />
              {/* TODO: Need a timeout for checkProfile? */}
              <Scene key='checkProfile' on={() => store.profile} success='checkHandle' failure='testRegisterScene' />
              <Scene key='checkHandle' on={() => store.profile.handle} success='logged' failure='testRegisterScene' />
              <Scene key='testRegister' on={store.testRegister} success='connect' failure='testRegisterScene' />
              {/* <Scene key='confirmCode' on={firebaseStore.confirmCode} success='register' failure='onboarding' />
              <Scene key='register' on={profileStore.firebaseRegister} success='connect' failure='signUp' />
              <Scene key='logout' on={profileStore.logout} success='onboarding' /> */}
            </Stack>
            <Stack key='onboarding' navTransparent>
              <Scene key='slideshow' component={OnboardingSlideshow} onSignIn='signIn' onBypass='testRegisterScene' />
              <Scene key='signIn' component={SignIn} back />
              <Scene key='verifyCode' component={VerifyCode} />
              <Scene key='testRegisterScene' component={TestRegister} success='connect' />
            </Stack>
            {/* <Scene key='signUp' component={SignUp} hideNavBar /> */}
            <Drawer
              key='logged'
              type='replace'
              hideNavBar
              contentComponent={SideMenu}
              drawerImage={require('../images/iconMenu.png')}
              // onRight={() => Actions.messaging()}
              // rightButtonImage={() => (model.chats.unread > 0 ? newMessagesIcon : baseMessagesIcon)}
              // rightButtonTintColor={settings.isStaging ? STAGING_COLOR : colors.PINK}
            >
              <Modal key='modal' hideNavBar>
                <Tabs key='cube' navigator={CubeNavigator} hideTabBar lazy>
                  <Tabs key='main' hideTabBar lazy>
                    <Scene key='home' component={Success} title='TinyRobot' />
                  </Tabs>
                </Tabs>
              </Modal>
            </Drawer>
          </Stack>
        </Stack>
      </Lightbox>
    </Router>
  </Provider>
);

export default App2;
