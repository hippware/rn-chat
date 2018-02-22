// @flow
/* global test */

import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import BotDetails from '../src/components/BotDetails';
import BotDetailsHeader from '../src/components/BotDetails';
import {Provider} from 'mobx-react/native';
import {Bot} from 'wocky-client';
import injects from './utils/inject-mocks';

describe('BotDetails', () => {
  const wocky = {};

  test('renders with no data', () => {
    const toRender = (
      <Provider wocky={wocky} {...injects}>
        <BotDetails />
      </Provider>
    );
    const tree = renderer.create(toRender).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders with test bot', () => {
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
    const toRender = (
      <Provider wocky={wocky} {...injects}>
        <BotDetailsHeader bot={bot} scale={0.5} />
      </Provider>
    );
    const tree = renderer.create(toRender).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
