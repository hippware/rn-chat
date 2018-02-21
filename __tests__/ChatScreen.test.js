// @flow
/* global test */

import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import ChatScreen from '../src/components/ChatScreen';
import {Provider} from 'mobx-react/native';
import {Chat} from 'wocky-client';

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
      createChat: () => Chat.create({id: 'test'}),
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
    const tree = renderer
      .create(<Provider wocky={wocky}>
        <ChatScreen item='1234' />
      </Provider>)
      .toJSON();
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
