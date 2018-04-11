import React from 'react'
import {View} from 'react-native'

import WelcomeNote from './WelcomeNote'
import ActiveGeoBotBanner from './ActiveGeoBotBanner'

const HomeStreamHeader = props => (
  <View>
    <WelcomeNote />
    <ActiveGeoBotBanner {...props} />
  </View>
)

export default HomeStreamHeader
