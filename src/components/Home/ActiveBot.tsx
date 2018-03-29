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
import {observable } from 'mobx'
import Swipeable from 'react-native-swipeable'
import LinearGradient from 'react-native-linear-gradient'

import BotBubble from '../map/BotBubble'
import { k } from '../Global'
// import Avatar from '../ProfileAvatar'
import {Avatar} from '../common';

type Props = {
  bot: any
}

@inject('wocky')
@observer
class ActiveBot extends React.Component<Props> {
  @observable profile: any

  async componentWillMount() {
    this.profile = await this.props.wocky.getProfile(this.props.bot.owner.id)
  }

  render() {
    console.log('active', this.profile && this.profile.toJSON())
    return (
      <View style={{ padding: 15 }}>
        <BotBubble bot={this.props.bot} scale={0} />
        {this.profile && <View style={{position: 'absolute', top: 0, right: 0}}><Avatar profile={this.profile} tappable={false} size={20} /></View>}
      </View>
    )
  }
}

export default ActiveBot
