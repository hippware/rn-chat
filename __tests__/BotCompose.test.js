// @flow

import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import {Provider} from 'mobx-react/native';

import './utils/mockMap';
import injects from './utils/inject-mocks';
import wocky from './utils/mockWocky';
import './utils/mockTextInput';

import BotCompose from '../src/components/BotCompose';

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

  it('renders with owned bot', async () => {
    await wocky.login('user', 'password', 'host');
    const bot = await wocky.createBot();
    const location = {latitude: 5, longitude: 5, accuracy: 5};
    const profile = await wocky.profiles.get(wocky.profile.id);
    bot.load({location, title: 'title', address: '123 address', owner: profile});
    bot.location.load({isCurrent: false});
    // bot.load({addressData: data.meta, address: data.address});
    const toRender = (
      <Provider wocky={wocky} {...injects}>
        <BotCompose botId={bot.id} />
      </Provider>
    );
    const tree = renderer.create(toRender).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
