import React, { Component } from 'react'
import {
  TouchableOpacity,
  View,
  FlatList,
  StyleSheet,
  Text,
  Image
} from 'react-native'
import { observer, inject } from 'mobx-react/native'

import { k } from '../Global'
import {RText} from '../common'
import {colors} from '../../constants'
import ActiveBot from './ActiveBot'
import WelcomeNote from './WelcomeNote'

type Props = {
  wocky?: any
  locationStore?: any
  visible: boolean
}

@inject('wocky', 'locationStore')
@observer
class ActiveBotBanner extends React.Component<{wocky?: any, locationStore?: any}> {
  render() {
    const {wocky, locationStore} = this.props
    const {profile} = wocky
    // !!profile.activeBots.length
    if (locationStore.alwaysOn && profile && !!profile.subscribedBots.length) {
      return (
        <View style={{padding: 10 * k, backgroundColor: 'white'}}>
          <RText size={13} weight='Bold' color={colors.PINK}>{"See Who's Here"}</RText>
          <FlatList
            data={wocky.profile.subscribedBots.list}
            horizontal
            style={{ height: 90 }}
            keyExtractor={this.keyExtractor}
            renderItem={this.renderActiveBot}
          />
        </View>
      )
    }
    return null
  }

  keyExtractor = item => item.id

  renderActiveBot = ({item}) => <ActiveBot bot={item} />
}

const HomeStreamHeader = ({ visible }: { visible: boolean }) => (
  <View>
    <WelcomeNote visible={visible} />
    <ActiveBotBanner />
  </View>
)

export default HomeStreamHeader
