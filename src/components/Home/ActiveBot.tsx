import React, {Component} from 'react'
import {TouchableOpacity, View, FlatList, StyleSheet, Text, Image} from 'react-native'

import {observer, inject} from 'mobx-react/native'
import {observable} from 'mobx'
import Swipeable from 'react-native-swipeable'
import LinearGradient from 'react-native-linear-gradient'

import BotBubble from '../map/BotBubble'
import {k} from '../Global'
// import Avatar from '../ProfileAvatar'
import {Avatar} from '../common'

@inject('wocky')
@observer
class ActiveBot extends React.Component<{bot: any}> {
  @observable profile: any
  @observable visitors: Array<any>

  arr = [1, 2, 3]
  obj = {thing: 1, other: 2}

  async componentWillMount() {
    console.log('visitors', this.props.bot.visitors)
    this.profile = await this.props.wocky.getProfile(this.props.bot.owner.id)
  }

  render() {
    console.log('active', this.profile && this.profile.toJSON())
    return (
      <View style={{padding: 15}}>
        <BotBubble bot={this.props.bot} scale={0} />
        {/* <VisitorHeads /> */}
        {this.profile && (
          <View style={{position: 'absolute', top: 0, right: 0}}>
            <Avatar profile={this.profile} tappable={false} size={20} />
          </View>
        )}
      </View>
    )
  }
}

export default ActiveBot
