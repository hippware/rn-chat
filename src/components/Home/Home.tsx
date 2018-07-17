import React from 'react'
import {View} from 'react-native'
import {observer} from 'mobx-react/native'
import MapHome from './MapHome'
import HorizontalCardList from './HorizontalCardList'
import ActiveGeoBotBanner from './ActiveGeoBotBanner'

interface IProps {}

@observer
export default class Home extends React.Component<IProps> {
  render() {
    return (
      <View style={{flex: 1, justifyContent: 'space-between'}} testID="screenHome">
        <MapHome />
        <ActiveGeoBotBanner />
        <HorizontalCardList />
      </View>
    )
  }
}
