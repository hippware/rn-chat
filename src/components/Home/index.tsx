import React from 'react'
import {View} from 'react-native'
import Connectivity from '../Connectivity'
import MapHome from './MapHome'
import ActiveGeoBotBanner from './ActiveGeoBotBanner'

class Home extends React.Component<{}> {
  render() {
    return (
      <View style={{flex: 1}} testID="screenHome">
        <MapHome />
        <ActiveGeoBotBanner />
        <Connectivity />
      </View>
    )
  }
}

export default Home
