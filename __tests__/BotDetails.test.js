// @flow
/* global test */

import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import BotDetails from '../src/components/BotDetails';
import {Provider} from 'mobx-react/native';
// import {} from 'wocky-client';
import injects from './utils/inject-mocks';

describe('BotDetails', () => {
  test('renders with no data', () => {
    const wocky = {
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

  test('renders with test bot', () => {
    const wocky = {
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
