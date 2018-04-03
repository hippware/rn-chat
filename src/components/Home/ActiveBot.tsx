import React from 'react'
import {View} from 'react-native'

import {observer, inject} from 'mobx-react/native'
import {observable} from 'mobx'

import BotBubble from '../map/BotBubble'
// import Avatar from '../ProfileAvatar'
import {Avatar} from '../common'
import {IBot, IWocky} from 'wocky-client'

type Props = {
  wocky?: IWocky
  bot: IBot
}

@inject('wocky')
@observer
class ActiveBot extends React.Component<Props> {
  @observable profile: any
  // @observable visitors: any[]

  arr = [1, 2, 3]
  obj = {thing: 1, other: 2}

  async componentWillMount() {
    // console.log('visitors', this.props.bot.visitors)
    this.profile = await this.props.wocky!.getProfile(this.props.bot.owner!.id)
  }

  render() {
    // console.log('active', this.profile && this.profile.toJSON())
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
