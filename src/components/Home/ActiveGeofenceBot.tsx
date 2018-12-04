import React from 'react'
import {View, StyleSheet, TouchableOpacity, ViewStyle} from 'react-native'

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
          <BotBubble bot={bot} scale={0} onImagePress={this.goToBot} radius={11}>
            {bot.visitor ? (
              <View style={styles.youreHere}>
                <RText
                  size={13}
                  color="white"
                  style={{textAlign: 'center', fontFamily: 'Roboto-Bold'}}
                >
                  You're
                </RText>
                <RText
                  size={13}
                  color="white"
                  style={{textAlign: 'center', fontFamily: 'Roboto-Bold'}}
                >
                  Here
                </RText>
              </View>
            ) : null}
          </BotBubble>
          <TouchableOpacity onPress={this.goToBot}>
            <RText
              size={13}
              style={{textAlign: 'center', marginTop: 2 * minHeight}}
              numberOfLines={1}
              ellipsizeMode="tail"
              color={colors.DARK_GREY}
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

const styles = StyleSheet.create({
  youreHere: {
    borderRadius: 10,
    backgroundColor: 'rgba(0,0,0,0.3)',
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
