// @flow
/* global test */

import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import ChatListScreen from '../src/components/ChatListScreen';

describe('ChatListScreen', () => {
  test('renders with no data', () => {
    const wocky = {
      chats: {
        list: [],
      },
    };
    const tree = renderer.create(<ChatListScreen wocky={wocky} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
