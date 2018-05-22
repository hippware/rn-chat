import React from 'react'
import {View, Image} from 'react-native'
import {k} from '../Global'
import {colors} from '../../constants'
import {inject, observer} from 'mobx-react/native'
import {RText} from '../common'
import {IBot} from 'wocky-client'
import {ILocationStore} from '../../store/LocationStore'

type Props = {
  bot: IBot
  locationStore?: ILocationStore
}

const locImg = require('../../../images/iconBotLocation3.png')
const heart = require('../../../images/heart.png')
const postCount = require('../../../images/postGrey.png')

const EventBotMetabar = inject('locationStore')(
  observer(({bot, locationStore}: Props) => (
    <View
      style={{
        flexDirection: 'row',
        height: 18 * k,
        alignItems: 'center',
        margin: 10 * k,
        justifyContent: 'space-between',
      }}
    >
      <View style={{flexDirection: 'row'}}>
        <Image source={locImg} style={{marginRight: 5 * k}} resizeMode="contain" />
        <RText color={colors.DARK_GREY} size={13} style={{marginRight: 15 * k}}>
          {bot.addressData && bot.addressData.locationShort} -{' '}
          {locationStore.distanceFromBot(bot.location)}
        </RText>
      </View>

      <View style={{flexDirection: 'row'}}>
        <View
          style={{
            paddingHorizontal: 5 * k,
            flexDirection: 'row',
            borderColor: colors.WARM_GREY,
            borderRightWidth: 1,
          }}
        >
          <Image source={heart} style={{marginRight: 5 * k}} />
          <RText color={colors.DARK_GREY} size={13}>
            {bot.followersSize}
          </RText>
        </View>
        <View style={{paddingHorizontal: 5 * k, flexDirection: 'row'}}>
          <Image source={postCount} style={{marginRight: 5 * k}} />
          <RText color={colors.DARK_GREY} size={13}>
            {bot.totalItems}
          </RText>
        </View>
      </View>
    </View>
  ))
)

export default EventBotMetabar
