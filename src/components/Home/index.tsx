import React from 'react'
import {View} from 'react-native'
import Connectivity from '../Connectivity'
import MapHome from './MapHome'
import ActiveGeoBotBanner from './ActiveGeoBotBanner'
import HorizontalCardList from './HorizontalCardList'
import RightPanel from './RightPanel'
import BottomMenu from '../BottomMenu'

class Home extends React.Component<{}> {
  render() {
    return (
      <View style={{flex: 1}} testID="screenHome">
        <MapHome />
        <ActiveGeoBotBanner />
        <RightPanel />
        <HorizontalCardList />
        <Connectivity />
        <BottomMenu />
      </View>
    )
  }
}

export default Home
