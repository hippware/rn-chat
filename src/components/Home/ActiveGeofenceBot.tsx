import React from 'react'
import {View, StyleSheet, TouchableOpacity, ViewStyle} from 'react-native'

import {observer, inject} from 'mobx-react/native'

import BotBubble from '../map/BotBubble'
import VisitorHeads from './VisitorHeads'
import {IBot, IWocky} from 'wocky-client'
import {Actions} from 'react-native-router-flux'
import {RText} from '../common'
import {isAlive} from 'mobx-state-tree'
import {analyticsGeoWidgetTap} from '../../utils/analytics'

type Props = {
  wocky?: IWocky
  bot: IBot
  analytics?: any
  outerStyle: ViewStyle
  innerStyle: ViewStyle
}

@inject('wocky', 'analytics')
@observer
class ActiveBot extends React.Component<Props> {
  goToBot = (): void => {
    Actions.locationDetails({botId: this.props.bot.id})
    setTimeout(() => Actions.visitors({item: this.props.bot.id}), 500)
    this.props.analytics.track(analyticsGeoWidgetTap)
  }

  render() {
    const {bot, outerStyle, innerStyle} = this.props
    return bot && isAlive(bot) ? (
      <View style={outerStyle}>
        <View style={innerStyle}>
          <BotBubble bot={bot} scale={0} onImagePress={this.goToBot}>
            {bot.visitor ? (
              <View style={styles.youreHere}>
                <RText
                  size={13}
                  color="white"
                  style={{textAlign: 'center'}}
                >{`You're\r\nHere`}</RText>
              </View>
            ) : null}
          </BotBubble>
          <TouchableOpacity onPress={this.goToBot}>
            <RText size={13} style={{textAlign: 'center'}} numberOfLines={1} ellipsizeMode="tail">
              {bot.title}
            </RText>
          </TouchableOpacity>
          <VisitorHeads bot={bot} />
        </View>
      </View>
    ) : null
  }
}

export default ActiveBot

const styles = StyleSheet.create({
  youreHere: {
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
