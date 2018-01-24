// @flow
/* global test */

import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import SignUp from '../src/components/SignUp';

describe('Signup', () => {
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
    const tree = renderer.create(<SignUp wocky={wocky} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
