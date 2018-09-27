// @flow

import 'react-native'
import React from 'react'
import renderer from 'react-test-renderer'
import EventCard from '../src/components/event-cards/EventBotCard'
import {Provider} from 'mobx-react/native'
import {EventBotShare, Bot, Message} from 'wocky-client'
import wocky from './utils/mockWocky'
import mockLocationStore from './utils/mockLocationStore'

describe('EventBotShareCard', () => {
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

    // TODO: create different profile as owner
    const message = Message.create({id: '789', time: 789, archiveId: '789', from: owner.id})
    const shareBot = EventBotShare.create({id: '456', time: 456, bot, message, action: 'share'})
    const toRender = (
      <Provider locationStore={mockLocationStore}>
        <EventCard item={shareBot} />
      </Provider>
    )
    const tree = renderer.create(toRender).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
