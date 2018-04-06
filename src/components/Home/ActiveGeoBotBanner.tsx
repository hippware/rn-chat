import React from 'react'
import {View, FlatList} from 'react-native'
import {observer, inject} from 'mobx-react/native'

import {k} from '../Global'
import {RText} from '../common'
import {colors} from '../../constants'
import ActiveGeofenceBot from './ActiveGeofenceBot'
import HeaderLocationOverlay from './HeaderLocationOverlay'
import {IBot, IWocky} from 'wocky-client'

type Props = {
  wocky?: IWocky
}

@inject('wocky', 'locationStore')
@observer
export default class ActiveGeoBotBanner extends React.Component<Props> {
  render() {
    const {wocky} = this.props
    const {profile} = wocky!
    // console.log('profile', profile)
    // !!profile.activeBots.length
    return profile && profile.handle && !!profile.activeBots.length ? (
      <View style={{backgroundColor: 'white'}}>
        <RText
          size={13}
          weight="Bold"
          color={colors.PINK}
          style={{margin: 15 * k, marginBottom: 10 * k}}
        >
          {"See Who's Here"}
        </RText>
        <FlatList
          data={profile.activeBots}
          horizontal
          keyExtractor={this.keyExtractor}
          renderItem={this.renderActiveBot}
        />
        <HeaderLocationOverlay />
      </View>
    ) : null
  }

  keyExtractor = (item: IBot) => item.id

  renderActiveBot = ({item}: {item: IBot}) => <ActiveGeofenceBot bot={item} />
}
