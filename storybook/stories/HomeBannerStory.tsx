import React from 'react'
import {Provider} from 'mobx-react'
import HomeBanner from 'src/components/Home/HomeBanner'

const stores = {
  wocky: {} as any,
  analytics: {
    track: () => null,
  },
  homeStore: {
    select: () => {},
    setFocusedLocation: () => {},
  },
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
