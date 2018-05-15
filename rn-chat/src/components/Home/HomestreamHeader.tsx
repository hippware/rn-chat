import React from 'react'
import {View} from 'react-native'

import ActiveGeoBotBanner from './ActiveGeoBotBanner'

const HomeStreamHeader = props => (
  <View>
    <ActiveGeoBotBanner {...props} />
  </View>
)

export default HomeStreamHeader
