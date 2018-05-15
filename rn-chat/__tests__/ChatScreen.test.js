// @flow

import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import ChatScreen from '../src/components/ChatScreen';
import {Provider} from 'mobx-react/native';
import {Chat} from 'wocky-client';
import './utils/mockTextInput';

describe('ChatScreen', () => {
  it('renders with no data', () => {
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
    const toRender = (
      <Provider wocky={wocky}>
        <ChatScreen item='1234' />
      </Provider>
    );
    const tree = renderer.create(toRender).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
