// @flow

// import {NativeModules} from 'react-native';
import 'react-native';
import React from 'react';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

// @TODO: mocks
// NativeModules.RNCarrierInfo = {isoCountryCode: jest.fn()};

import AddBot from '../src/components/BotDetails/AddBot';
// import BotInfo from '../src/components/BotInfo';
import Card from '../src/components/Card';

describe('Testing jest', () => {
  // test('renders correctly', () => {
  //   console.log('&&& ahahhahahah');
  //   const tree = renderer.create(<Onboarding />).toJSON();
  //   // const tree = renderer.create(<SideMenu />).toJSON();
  //   expect(tree).toMatchSnapshot();
  // });

  // test('Privacy', () => {
  //   const tree = renderer.create(<Privacy />).toJSON();
  //   // const tree = renderer.create(<SideMenu />).toJSON();
  //   expect(tree).toMatchSnapshot();
  // });

  test('AddBot', () => {
    const tree = renderer.create(<AddBot />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('Card', () => {
    const tree = renderer.create(<Card />).toJSON();
    // const tree = renderer.create(<SideMenu />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  // jest.mock('Linking', () => {
  //   return {
  //     addEventListener: jest.fn(),
  //     removeEventListener: jest.fn(),
  //     openURL: jest.fn(),
  //     canOpenURL: jest.fn(),
  //     getInitialURL: jest.fn(),
  //   };
  // });
  //
  // jest.mock('NetInfo', () => {
  //   return {
  //     isConnected: {
  //       fetch: () => {
  //         return new Promise((accept, resolve) => {
  //           accept(true);
  //         });
  //       },
  //     },
  //   };
  // });
  //
  // jest.mock('PushNotificationIOS', () => {
  //   return {
  //     getInitialNotification: () => {
  //       return new Promise((accept, resolve) => {
  //         accept(true);
  //       });
  //     },
  //   };
  // });
  // //
  // jest.mock(
  //   'NativeEventEmitter',
  //   () =>
  //     class NEE {
  //       constructor() {}
  //       addListener = jest.fn();
  //     }
  // );
  //
  // test('BotInfo', () => {
  //   const tree = renderer.create(<BotInfo />).toJSON();
  //   expect(tree).toMatchSnapshot();
  // });
});
