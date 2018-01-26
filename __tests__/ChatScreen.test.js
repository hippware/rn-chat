// @flow
/* global test */

import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import ChatScreen from '../src/components/ChatScreen';

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

describe('ChatScreen', () => {
  test('renders with no data', () => {
    const wocky = {
      chats: {
        list: [],
        get: () => {
          return {
            id: '1234',
            setActive: () => {},
            messages: [],
          };
        },
      },
    };
    const tree = renderer.create(<ChatScreen wocky={wocky} item='1234' />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  // TODO
  // test('renders with list of chats', () => {
  //   const wocky = {
  //     chats: {
  //       list: [],
  //     },
  //   };
  //   const tree = renderer.create(<ChatListScreen wocky={wocky} />).toJSON();
  //   expect(tree).toMatchSnapshot();
  // });
});
