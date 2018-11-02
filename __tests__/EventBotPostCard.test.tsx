import 'react-native'
import React from 'react'
import renderer from 'react-test-renderer'
import {Provider} from 'mobx-react/native'
import {EventBotPostCard} from 'src/components/event-cards/EventCard'
import mockStore from './utils/mockStore'
import {Bot, Profile} from 'wocky-client'

describe('EventBotPostCard', () => {
  it('renders', async () => {
    const item = {
      bot: Bot.create({id: '1234'}),
      relativeDateAsString: '1234',
      post: {
        id: '456',
        profile: Profile.create({id: '789'}),
      },
    } as any
    const toRender = (
      <Provider {...mockStore}>
        <EventBotPostCard item={item} />
      </Provider>
    )
    const tree = renderer.create(toRender).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
