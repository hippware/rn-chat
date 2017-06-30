// @flow

import {NativeModules} from 'react-native';
import React from 'react';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

// @TODO: mocks
NativeModules.RNCarrierInfo = {isoCountryCode: jest.fn()};

import AddBot from '../src/components/BotDetails/AddBot';

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
    // const tree = renderer.create(<SideMenu />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
