import React from 'react'
import {View, StyleSheet, Image} from 'react-native'
import {IBot} from 'wocky-client'
import {RText} from '../common'
import {colors} from '../../constants'
import {k} from '../Global'
import {observer} from 'mobx-react'
import Card from './Card'
import {Actions} from 'react-native-router-flux'

type Props = {
  bot: IBot
  isSelected: boolean
  // index: number
  // scrollIndex: number
}

const LocationCard = ({bot, isSelected}: Props) => (
  // TODO: show profile only if focused
  // <Card profile={scrollIndex === index && bot.owner}>
  <Card profile={isSelected && bot.owner} onPress={() => Actions.locationDetails({botId: bot.id})}>
    <View style={{flex: 1, flexDirection: 'row', zIndex: -1}}>
      <Image
        style={styles.thumb}
        source={bot.image ? bot.image.thumbnail : null}
        resizeMode="cover"
      />
      <View style={styles.textContainer}>
        <RText size={17} weight="Bold" color={colors.DARK_PURPLE} numberOfLines={1}>
          {bot.title}
        </RText>
        <RText size={13} weight="Bold" color={colors.PINKISH_GREY} style={{marginTop: 3 * k}}>
          {bot.addressData && bot.addressData.locationShort}
        </RText>
      </View>
    </View>
  </Card>
)

export default observer(LocationCard)

const styles = StyleSheet.create({
  thumb: {
    flex: 1,
    height: undefined,
    width: undefined,
    zIndex: -1,
  },
  textContainer: {
    flex: 3,
    padding: 18 * k,
    justifyContent: 'center',
  },
  avatar: {
    position: 'absolute',
    top: -20 * k,
    left: -20 * k,
    zIndex: 2,
  },
})
