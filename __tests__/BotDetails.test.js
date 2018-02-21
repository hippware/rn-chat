// @flow
/* global test */

import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import BotDetails from '../src/components/BotDetails';
import {Provider} from 'mobx-react/native';
import {EventList, EventBotNote, EventBotPost} from 'wocky-client';
import injects from './utils/inject-mocks';

describe('Home', () => {
  test('renders with no data', () => {
    const wocky = {
      updates: [],
      events: EventList.create({}),
      bots: [],
    };
    const toRender = (
      <Provider wocky={wocky} {...injects}>
        <BotDetails />
      </Provider>
    );
    const tree = renderer.create(toRender).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
