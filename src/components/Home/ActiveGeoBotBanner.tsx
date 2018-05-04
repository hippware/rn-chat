import React from 'react'
import {View, FlatList} from 'react-native'
import {observer, inject} from 'mobx-react/native'

import {k} from '../Global'
import {RText} from '../common'
import {colors} from '../../constants'
import ActiveGeofenceBot from './ActiveGeofenceBot'
import HeaderLocationOverlay from './HeaderLocationOverlay'
import FirstLoadOverlay from './FirstLoadOverlay'
import {IBot, IWocky} from 'wocky-client'

type Props = {
  wocky?: IWocky
  onLayout: (nativeEvent: any) => void
}

@inject('wocky', 'locationStore')
@observer
export default class ActiveGeoBotBanner extends React.Component<Props> {
  render() {
    const {wocky, onLayout} = this.props
    const {activeBots} = wocky!
    return !!activeBots.length ? (
      <View style={{backgroundColor: 'white'}} onLayout={onLayout}>
        <RText
          size={13}
          weight="Bold"
          color={colors.PINK}
          style={{margin: 15 * k, marginBottom: 10 * k}}
        >
          {"See Who's Here"}
        </RText>
        <FlatList
          data={activeBots}
          horizontal
          keyExtractor={this.keyExtractor}
          renderItem={this.renderActiveBot}
          showsHorizontalScrollIndicator={false}
        />
        <HeaderLocationOverlay />
        <FirstLoadOverlay />
      </View>
    ) : null
  }

  keyExtractor = (item: IBot) => item.id

  renderActiveBot = ({item}: {item: IBot}) => <ActiveGeofenceBot bot={item} />
}
