import React from 'react'
import {View} from 'react-native'

import WelcomeNote from './WelcomeNote'
import ActiveGeoBotBanner from './ActiveGeoBotBanner'

const HomeStreamHeader = () => (
  <View>
    <WelcomeNote />
    <ActiveGeoBotBanner />
  </View>
)

export default HomeStreamHeader
