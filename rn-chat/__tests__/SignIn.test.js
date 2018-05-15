// @flow

import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import SignIn from '../src/components/SignIn';
import './utils/mockTextInput';

describe('SignIn', () => {
  it('renders', () => {
    const firebaseStore = {};
    const tree = renderer.create(<SignIn firebaseStore={firebaseStore} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
