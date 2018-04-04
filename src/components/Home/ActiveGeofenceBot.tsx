import React from 'react'
import {View} from 'react-native'

import {observer, inject} from 'mobx-react/native'
import {observable} from 'mobx'

import BotBubble from '../map/BotBubble'
import VisitorHeads from './VisitorHeads'
import {IBot, IWocky, IProfile} from 'wocky-client'
import {Actions} from 'react-native-router-flux'

type Props = {
  wocky?: IWocky
  bot: IBot
}

@inject('wocky')
@observer
class ActiveBot extends React.Component<Props> {
  @observable profile?: IProfile

  async componentWillMount() {
    this.profile = await this.props.wocky!.getProfile(this.props.bot.owner!.id)
  }

  goToBot = (): void => {
    Actions.botDetails({item: this.props.bot.id})
    setTimeout(() => Actions.visitors({item: this.props.bot.id}), 500)
  }

  render() {
    return (
      <View style={{padding: 15}}>
        <BotBubble bot={this.props.bot} scale={0} onImagePress={this.goToBot} />
        <VisitorHeads bot={this.props.bot} />
      </View>
    )
  }
}

export default ActiveBot
