import React from 'react'
import {View, StyleSheet, Image, ImageSourcePropType, ImageStyle} from 'react-native'
import {IBot} from 'wocky-client'
import {RText} from '../common'
import {colors} from '../../constants'
import {k} from '../Global'
import {observer} from 'mobx-react'
import Card from './Card'
import {Actions} from 'react-native-router-flux'
import BotIcon from '../common/BotIcon'

type Props = {
  bot: IBot
  isSelected: boolean
}

const BotCard = observer(({bot, isSelected}: Props) => (
  <Card
    profile={isSelected && bot.owner ? bot.owner! : undefined}
    onPress={() => Actions.botDetails({botId: bot.id})}
  >
    <View style={{flex: 1, flexDirection: 'row', zIndex: -1}}>
      {bot.image ? (
        <Image
          style={styles.thumb as ImageStyle}
          source={bot.image.thumbnail! as ImageSourcePropType}
        />
      ) : (
        <View style={{height: '100%', width: 70, alignItems: 'center', justifyContent: 'center'}}>
          <BotIcon size={30} icon={bot.icon} textStyle={{fontSize: 45}} />
        </View>
      )}
      <View style={[styles.textContainer, bot.image && {marginLeft: 18 * k}]}>
        <RText size={17} weight="Bold" color={colors.DARK_PURPLE} numberOfLines={1}>
          {bot.title}
        </RText>
        <RText size={13} weight="Bold" color={colors.PINKISH_GREY} style={{marginTop: 3 * k}}>
          {bot.addressData && bot.addressData.locationShort}
        </RText>
      </View>
    </View>
  </Card>
))

export default BotCard

const styles = StyleSheet.create({
  thumb: {
    aspectRatio: 1,
    resizeMode: 'contain',
    height: undefined,
    width: undefined,
    zIndex: -1,
  },
  textContainer: {
    flex: 1,
    paddingVertical: 18 * k,
    paddingRight: 18 * k,
    justifyContent: 'center',
  },
  avatar: {
    position: 'absolute',
    top: -20 * k,
    left: -20 * k,
    zIndex: 2,
  },
  icon: {
    fontSize: 45,
    color: colors.PINK,
  },
})
