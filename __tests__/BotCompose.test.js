// @flow

import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import BotCompose from '../src/components/BotCompose';
import {Provider} from 'mobx-react/native';
// import {} from 'wocky-client';
import injects from './utils/inject-mocks';
import wocky from './utils/mockWocky';

describe('BotCompose', () => {
  it('renders with no data', async () => {
    await wocky.login('user', 'password', 'host');
    const toRender = (
      <Provider wocky={wocky} {...injects}>
        <BotCompose />
      </Provider>
    );
    const tree = renderer.create(toRender).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
