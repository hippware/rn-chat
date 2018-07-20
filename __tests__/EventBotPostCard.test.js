// @flow

import 'react-native'
import React from 'react'
import renderer from 'react-test-renderer'
import EventCard from '../src/components/event-cards/EventBotCard'
import {Provider} from 'mobx-react/native'
import {EventBotPost, Bot, BotPost} from 'wocky-client'
import wocky from './utils/mockWocky'
import mockLocationStore from './utils/mockLocationStore'

describe('EventBotPostCard', () => {
  it('renders', async () => {
    await wocky.login('user', 'password', 'host')
    const owner = wocky.profiles.get('user', {handle: 'test', avatar: null})
    const bot = Bot.create({
      id: '1234',
      isSubscribed: false,
      title: 'title',
      server: 'server',
      radius: 30,
      owner,
      // image: FileRef,
      description: 'description',
      public: true,
      location: {latitude: 1, longitude: 1},
      address: 'address',
      followersSize: 0,
      totalItems: 0,
      // addressData: types.optional(Address, {}),
      // subscribers: types.optional(ProfilePaginableList, {}),
      // posts: types.optional(BotPostPaginableList, {}),
      error: '',
    })

    mockLocationStore.setPosition({longitude: 2, latitude: 2, accuracy: 2})

    const post = BotPost.create({
      id: '123',
      time: 123,
      loaded: true,
      content: 'some content',
      title: 'a title',
      profile: owner,
    })
    const botPost = EventBotPost.create({id: '123', time: 123, bot, post})
    const toRender = (
      <Provider locationStore={mockLocationStore}>
        <EventCard item={botPost} />
      </Provider>
    )
    const tree = renderer.create(toRender).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
