// @flow
/* global test */
jest.useFakeTimers(); // according to https://facebook.github.io/jest/docs/en/timer-mocks.html
import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import Home from '../src/components/Home';
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
        <Home />
      </Provider>
    );
    const tree = renderer.create(toRender).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders with a couple items', () => {
    const wocky = {
      updates: [],
      events: EventList.create({}),
      bots: [],
    };
    const eventNote = EventBotNote.create({id: '1', bot: '1234', note: 'Wow!', time: 1519253818707});
    const eventBotPost = EventBotPost.create({id: '2', bot: '5678', time: 1519253818707, post: {id: '1', content: 'Really?', profile: null, time: 1519253818707}});
    wocky.events.add(eventNote);
    wocky.events.add(eventBotPost);

    const toRender = (
      <Provider wocky={wocky} {...injects}>
        <Home />
      </Provider>
    );

    const tree = renderer.create(toRender).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
