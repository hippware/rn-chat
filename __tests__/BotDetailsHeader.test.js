// @flow
/* global test */

import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import {Provider} from 'mobx-react/native';
import {Bot} from 'wocky-client';
import './utils/mockMap';
import injects from './utils/inject-mocks';
import mockLocationStore from './utils/mockLocationStore';
import wocky from './utils/mockWocky';

import BotDetailsHeader from '../src/components/BotDetails/BotDetailsHeader';

describe('BotDetailsHeader', () => {
  test('renders with test bot', async () => {
    await wocky.login('user', 'password', 'host');
    const bot = Bot.create({
      id: '1234',
      isSubscribed: false,
      title: 'title',
      server: 'server',
      radius: 30,
      owner: null,
      // image: FileRef,
      // description: types.maybe(types.string),
      // visibility: VISIBILITY_PUBLIC,
      // location: types.maybe(Location),
      // address: '',
      // followersSize: 0,
      // totalItems: 0,
      // addressData: types.optional(Address, {}),
      // subscribers: types.optional(ProfilePaginableList, {}),
      // posts: types.optional(BotPostPaginableList, {}),
      // error: ''
    });
    mockLocationStore.setPosition({
      coords: {longitude: 2, latitude: 2, accuracy: 2},
    });
    const toRender = (
      <Provider wocky={wocky} {...injects} locationStore={mockLocationStore}>
        <BotDetailsHeader bot={bot} scale={0.5} />
      </Provider>
    );
    const tree = renderer.create(toRender).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
