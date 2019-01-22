import React from 'react'
import {View, TouchableOpacity, ViewStyle} from 'react-native'

import {observer, inject} from 'mobx-react/native'

import BotBubble from '../map/BotBubble'
import {IBot, IWocky} from 'wocky-client'
import {Actions} from 'react-native-router-flux'
import {RText, ProfileStack} from '../common'
import {isAlive} from 'mobx-state-tree'
import {analyticsGeoWidgetTap} from '../../utils/analytics'
import {colors} from '../../constants'
import {IHomeStore} from '../../store/HomeStore'
import {minHeight} from '../Global'

type Props = {
  wocky?: IWocky
  bot: IBot
  analytics?: any
  outerStyle: ViewStyle
  innerStyle: ViewStyle
  homeStore?: IHomeStore
}

@inject('wocky', 'analytics', 'homeStore')
@observer
class ActiveBot extends React.Component<Props> {
  goToBot = (): void => {
    this.props.homeStore!.selectBot(this.props.bot)
    Actions.botDetails({botId: this.props.bot.id})
    // setTimeout(() => Actions.visitors({item: this.props.bot.id}), 500)
    this.props.analytics.track(analyticsGeoWidgetTap)
  }

  render() {
    const {bot, outerStyle, innerStyle} = this.props
    return bot && isAlive(bot) ? (
      <View style={outerStyle}>
        <View style={innerStyle}>
          {bot.visitor ? (
            <BotBubble
              youreHere={true}
              bot={bot}
              scale={0}
              onImagePress={this.goToBot}
              radius={11}
              image={require('../../../images/YoureHere.png')}
            />
          ) : (
            <BotBubble bot={bot} scale={0} onImagePress={this.goToBot} radius={11} />
          )}
          <TouchableOpacity onPress={this.goToBot}>
            <RText
              size={13}
              style={{textAlign: 'center', marginTop: 2 * minHeight}}
              numberOfLines={1}
              ellipsizeMode="tail"
              color={bot.visitor ? colors.PINK : colors.DARK_GREY}
              weight={'Medium'}
            >
              {bot.title}
            </RText>
          </TouchableOpacity>

          {/* <ProfileStack profiles={bot.visitors.list} /> */}
          <ProfileStack
            style={{position: 'absolute', top: -15, right: -8}}
            firstProfile={bot.visitors.list[0]}
            stackSize={bot.visitorsSize}
            fontFamily="bold"
          />
        </View>
      </View>
    ) : null
  }
}

export default ActiveBot
