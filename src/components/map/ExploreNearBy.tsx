import React from 'react'
import {View} from 'react-native'
import Map from './Map'
import BotButton from '../BotButton'
// import SnapScroller from './SnapScroller'

class FullMap extends React.Component<{}> {
  render() {
    return (
      <View style={{flex: 1}}>
        <Map fullMap followUser>
          <BotButton />
          {/* <SnapScroller /> */}
        </Map>
      </View>
    )
  }
}

export default FullMap
