import React from 'react'
import {View, TouchableOpacity} from 'react-native'
import BotBubble from '../map/BotBubble'
import {IBot} from 'wocky-client'
import {Actions} from 'react-native-router-flux'
import {RText, ProfileStack} from '../common'
import {isAlive} from 'mobx-state-tree'
import {analyticsGeoWidgetTap} from '../../utils/analytics'
import {colors} from '../../constants'
import {minHeight} from '../Global'
import {IActiveBannerItem} from './HomeBanner'
import {useHomeStore, useAnalytics} from 'src/utils/injectors'
import {observer} from 'mobx-react'

interface IProps extends IActiveBannerItem {
  bot: IBot
}

const ActiveGeofenceBot = observer(({bot, outerStyle, innerStyle}: IProps) => {
  const {select} = useHomeStore()
  const {track} = useAnalytics()
  function goToBot(): void {
    select(bot.id)
    Actions.botDetails({botId: bot.id, preview: false})
    track(analyticsGeoWidgetTap)
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

export default ActiveGeofenceBot
