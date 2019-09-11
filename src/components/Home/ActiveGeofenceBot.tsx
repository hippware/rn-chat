import React from 'react'
import {View, TouchableOpacity} from 'react-native'

import {inject} from 'mobx-react'
import BotBubble from '../map/BotBubble'
import {IBot, IWocky} from 'wocky-client'
import {Actions} from 'react-native-router-flux'
import {RText, ProfileStack} from '../common'
import {isAlive} from 'mobx-state-tree'
import {analyticsGeoWidgetTap} from '../../utils/analytics'
import {colors} from '../../constants'
import {IHomeStore} from '../../store/HomeStore'
import {minHeight} from '../Global'
import {IActiveBannerItem} from './ActiveGeoBotBanner'
import {observer} from 'mobx-react-lite'

interface IProps extends IActiveBannerItem {
  wocky?: IWocky
  bot: IBot
  analytics?: any
  homeStore?: IHomeStore
}

const ActiveGeofenceBot = inject('wocky', 'analytics', 'homeStore')(
  observer(({bot, outerStyle, innerStyle, homeStore, analytics}: IProps) => {
    function goToBot(): void {
      homeStore!.select(bot.id)
      Actions.botDetails({botId: bot.id})
      analytics.track(analyticsGeoWidgetTap)
    }

    return bot && isAlive(bot) ? (
      <View style={outerStyle}>
        <View style={innerStyle}>
          {bot.visitor ? (
            <BotBubble
              youreHere
              bot={bot}
              scale={0}
              onImagePress={goToBot}
              radius={11}
              image={require('../../../images/YoureHere.png')}
            />
          ) : (
            <BotBubble bot={bot} scale={0} onImagePress={goToBot} radius={11} />
          )}
          <TouchableOpacity onPress={goToBot}>
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

          <ProfileStack
            style={{position: 'absolute', top: -15, right: -5}}
            firstProfile={bot.visitors.list[0]}
            stackSize={bot.visitorsSize}
            fontFamily="bold"
          />
        </View>
      </View>
    ) : null
  })
)

export default ActiveGeofenceBot
