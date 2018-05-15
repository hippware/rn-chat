// @flow

import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import MyAccount from '../src/components/MyAccount';
import {Provider} from 'mobx-react/native';

describe('MyAccount', () => {
  it('renders', () => {
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
    const toRender = (
      <Provider wocky={wocky} profileValidationStore={profileValidationStore}>
        <MyAccount />
      </Provider>
    );
    const tree = renderer.create(toRender).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
