import React from 'react'
import {Provider} from 'mobx-react'
import HomeBanner from 'src/components/Home/HomeBanner'
import {Profile, OwnProfile, File, Transport, Bot, SERVICE_NAME, createFactory} from 'wocky-client'
import {types} from 'mobx-state-tree'

const FakeWockyStore = types
  .model({
    profiles: types.array(Profile),
    files: types.optional(createFactory(File), {}),
    profile: OwnProfile,
    activeBots: types.array(Bot),
    connected: true,
  })
  .named(SERVICE_NAME)
  .actions(() => ({
    _loadSubscribedBots() {},
  }))

const wocky = FakeWockyStore.create(
  {
    profiles: [
      {
        id: '1',
        handle: 'nic_cage',
      },
      {
        id: '2',
        handle: 'fill_murray',
      },
    ],
    profile: {
      id: '100',
    },
    activeBots: [],
  },
  {
    transport: new Transport('mock', console),
  }
)

wocky.profiles[0].load({
  avatar: {
    id: 'place_cage_avatar',
    thumbnail: {
      uri: 'https://www.placecage.com/c/300/300',
    },
  },
})

wocky.profiles[1].load({
  avatar: {
    id: 'fill_murray_avatar',
    thumbnail: {
      uri: 'https://www.fillmurray.com/300/300',
    },
  },
})

const stores = {
  wocky,
  analytics: {
    track: () => null,
  },
  homeStore: {},
  navStore: {},
  locationStore: {
    alwaysOn: true,
  },
}

export default () => (
  <Provider {...stores}>
    <HomeBanner enabled={true} />
  </Provider>
)
