// @flow

import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import EventCard from '../src/components/event-cards/EventBotCard';
import {Provider} from 'mobx-react/native';
import {EventBotCreate, Bot} from 'wocky-client';
import wocky from './utils/mockWocky';
import mockLocationStore from './utils/mockLocationStore';

describe('EventBotCard', () => {
  it('renders', async () => {
    await wocky.login('user', 'password', 'host');
    const owner = wocky.profiles.get('user', {handle: 'test', avatar: null});
    const bot = Bot.create({
      id: '1234',
      isSubscribed: false,
      title: 'title',
      server: 'server',
      radius: 30,
      owner,
      // image: FileRef,
      description: 'description',
      visibility: 100,
      location: {latitude: 1, longitude: 1},
      address: 'address',
      followersSize: 0,
      totalItems: 0,
      // addressData: types.optional(Address, {}),
      // subscribers: types.optional(ProfilePaginableList, {}),
      // posts: types.optional(BotPostPaginableList, {}),
      error: '',
    });

    mockLocationStore.setPosition({
      coords: {longitude: 2, latitude: 2, accuracy: 2},
    });

    const botCreate = EventBotCreate.create({id: '123', time: 123, bot, created: true});
    const toRender = (
      <Provider locationStore={mockLocationStore}>
        <EventCard item={botCreate} />
      </Provider>
    );
    const tree = renderer.create(toRender).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
