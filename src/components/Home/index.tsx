import React from 'react'
import {View} from 'react-native'
import Connectivity from '../Connectivity'
import MapHome from './MapHome'
import ActiveGeoBotBanner from './ActiveGeoBotBanner'
import HorizontalCardList from './HorizontalCardList'
import RightPanel from './RightPanel'

class Home extends React.Component<{}> {
  render() {
    return (
      <View style={{flex: 1}} testID="screenHome">
        <MapHome />
        <ActiveGeoBotBanner />
        <HorizontalCardList />
        <RightPanel />
        <Connectivity />
      </View>
    )
  }
}

export default Home
