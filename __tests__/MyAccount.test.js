// @flow
/* global test */

import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import MyAccount from '../src/components/MyAccount';
import {Provider} from 'mobx-react/native';

describe('MyAccount', () => {
  test('renders', () => {
    const wocky = {
      profile: {
        handle: 'jerkham',
        firstName: 'eric',
        lastName: 'kirkham',
        email: 'eric.kirkham@gmail.com',
        loaded: true,
      },
    };
    const profileValidationStore = {
      setProfile: () => {},
    };
    const tree = renderer
      .create(<Provider wocky={wocky} profileValidationStore={profileValidationStore}>
        <MyAccount />
      </Provider>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
