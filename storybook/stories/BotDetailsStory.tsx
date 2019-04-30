import React from 'react'
import BotDetails from 'src/components/BotDetails/BotDetails'
import {Provider} from 'mobx-react/native'
import {Bot, IBot} from 'wocky-client'

const stores = {
  wocky: {
    getBot: (): IBot =>
      Bot.create({
        id: '1234',
        title: 'title',
        addressData: {
          city: 'Mooreland',
          // country: '',
          state: 'OK',
          // county: '',
          locationShort: 'Mooreland, OK',
        } as any,
        posts: {
          list: [
            {id: '1', title: 'post1', content: 'this is a post'},
            {id: '2', title: 'post2', content: 'this is another post'},
          ],
        } as any,
      }),
    loadBot: async () => null,
  } as any,
  analytics: {
    track: () => null,
  },
  notificationStore: {},
  homeStore: {
    select: () => {},
    setFocusedLocation: () => {},
  },
  locationStore: {
    distanceFromBot: () => '0.0mi',
  },
  navStore: {},
}

const props = {
  botId: '1234',
  navigation: {state: {params: {}}},
}

export default () => (
  <Provider {...stores}>
    <BotDetails {...props} />
  </Provider>
)