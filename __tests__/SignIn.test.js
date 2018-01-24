// @flow
/* global test */

import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import SignIn from '../src/components/SignIn';

// mock autofocus: https://github.com/facebook/jest/issues/3707#issuecomment-311169259
jest.mock('TextInput', () => {
  const RealComponent = require.requireActual('TextInput');
  const React = require('React');
  class TextInput extends React.Component {
    render() {
      delete this.props.autoFocus;
      return React.createElement('TextInput', this.props, this.props.children);
    }
  }
  TextInput.propTypes = RealComponent.propTypes;
  return TextInput;
});

describe('SignIn', () => {
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
    const tree = renderer.create(<SignIn wocky={wocky} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
