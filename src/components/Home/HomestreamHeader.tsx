import React from 'react'
import {View, FlatList} from 'react-native'
import {observer, inject} from 'mobx-react/native'

import {k} from '../Global'
import {RText} from '../common'
import {colors} from '../../constants'
import ActiveGeofenceBot from './ActiveGeofenceBot'
import WelcomeNote from './WelcomeNote'
import HeaderLocationOverlay from './HeaderLocationOverlay'
import {IBot, IWocky} from 'wocky-client'

type Props = {
  wocky?: IWocky
}

@inject('wocky', 'locationStore')
@observer
class ActiveBotBanner extends React.Component<Props> {
  render() {
    const {wocky} = this.props
    const {profile} = wocky!
    // !!profile.activeBots.length
    return profile && !!profile.subscribedBots.length ? (
      <View style={{padding: 10 * k, backgroundColor: 'white'}}>
        <RText size={13} weight="Bold" color={colors.PINK}>
          {"See Who's Here"}
        </RText>
        <FlatList
          data={profile.subscribedBots.list}
          horizontal
          style={{height: 90}}
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

const HomeStreamHeader = () => (
  <View>
    <WelcomeNote />
    <ActiveBotBanner />
  </View>
)

export default HomeStreamHeader
