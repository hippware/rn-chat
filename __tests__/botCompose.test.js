// @flow
/* global test */

import 'react-native';
import React from 'react';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import Bot from '../src/model/Bot';

require('./utils/mocks');

// @TODO: mocks
import BotCompose from '../src/components/BotCompose';
import Card from '../src/components/Card';

describe('BotCompose', () => {
  // test('Card', () => {
  //   const tree = renderer.create(<Card />).toJSON();
  //   expect(tree).toMatchSnapshot();
  // });

  test('empty', () => {
    const tree = renderer.create(<BotCompose />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  // test('normal', () => {
  //   const bot = new Bot();
  //   bot.load({
  //     id: '123',
  //     jid: '456',
  //     fullId: '789',
  //     server: 'test',
  //     owner: null,
  //   });
  //   const tree = renderer.create(<BotCompose bot={bot} />).toJSON();
  //   expect(tree).toMatchSnapshot();
  // });
});
