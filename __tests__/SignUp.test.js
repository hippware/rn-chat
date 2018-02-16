// @flow
/* global test */

import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import SignUp from '../src/components/SignUp';
import {Provider} from 'mobx-react/native';

describe('Signup', () => {
  test('renders', () => {
    const wocky = {
      createChat: () => {},
      profile: {
        handle: 'jerkham',
        firstName: 'eric',
        lastName: 'kirkham',
        email: 'eric.kirkham@gmail.com',
        loaded: true,
        updateError: '',
      },
    };
    const analytics = {
      track: () => {},
    };
    const profileValidationStore = {
      setProfile: () => {},
    };
    const tree = renderer
      .create(<Provider wocky={wocky} profileValidationStore={profileValidationStore} analytics={analytics}>
        <SignUp />
      </Provider>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
