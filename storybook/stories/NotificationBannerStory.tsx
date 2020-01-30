import React from 'react'
import Notification from '../../src/store/Notification'
import {NotificationBannerInner} from '../../src/components/NotificationBanner'
import {Animated} from 'react-native'

const profile: any = {
  id: 1,
  handle: 'test',
  avatar: {
    id: 'fill_murray_avatar',
    thumbnail: {
      uri: 'https://www.fillmurray.com/300/300',
    },
  },
}

export default () => {
  const params = {
    current: new Notification({
      message: 'joe and you are sharing location.',
      profile,
    }),
    y: new Animated.Value(100),
  }

  return <NotificationBannerInner {...params} />
}
