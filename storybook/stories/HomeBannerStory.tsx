import React from 'react'
import {Provider} from 'mobx-react'
import HomeBanner from 'src/components/Home/HomeBanner'

const stores = {
  wocky: {
    connected: true,
    profile: {
      locationSharers: {
        list: [
          {
            id: '1',
            sharedWith: {
              avatar: {
                thumbnail: {url: 'https://www.placecage.com/c/300/300'},
              },
              handle: 'nick_cage',
            },
          },
          {
            id: '2',
            sharedWith: {
              avatar: {
                thumbnail: {url: 'https://www.fillmurray.com/300/300'},
              },
              handle: 'bill_murray',
            },
          },
        ],
      },
      hidden: {
        enabled: false,
      },
    },
    activeBots: [],
  } as any,
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
