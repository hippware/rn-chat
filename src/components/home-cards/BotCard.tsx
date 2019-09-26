import React from 'react'
import {View, StyleSheet, Image, ImageSourcePropType, ImageStyle} from 'react-native'
import {IBot} from 'wocky-client'
import {RText} from '../common'
import {colors} from '../../constants'
import {k} from '../Global'
import Card from './Card'
import {Actions} from 'react-native-router-flux'
import BotIcon from '../common/BotIcon'
import {useHomeStore} from 'src/utils/injectors'

type Props = {
  bot: IBot
  id: string
}

const BotCard = ({id, bot}: Props) => {
  const {selectedId} = useHomeStore()
  const isSelected = selectedId === id
  return (
    <Card
      profile={isSelected && bot.owner ? bot.owner! : undefined}
      onPress={() => Actions.botDetails({botId: bot.id})}
    >
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          zIndex: -1,
          borderBottomLeftRadius: 3,
          borderBottomRightRadius: 0,
          borderTopLeftRadius: 3,
          borderTopRightRadius: 0,
          overflow: 'hidden',
        }}
      >
        {bot.image ? (
          <Image
            style={styles.thumb as ImageStyle}
            source={bot.image.thumbnail! as ImageSourcePropType}
          />
        ) : (
          <View
            style={{
              height: '100%',
              width: 70,
              alignItems: 'center',
              justifyContent: 'center',
              marginLeft: 10,
            }}
          >
            <BotIcon size={40} icon={bot.icon} textStyle={{fontSize: 45, textAlign: 'center'}} />
          </View>
        )}
        <View style={[styles.textContainer, bot.image && {marginLeft: 18 * k}]}>
          <RText size={17} weight="Bold" color={colors.DARK_PURPLE} numberOfLines={2}>
            {bot.title}
          </RText>
          <RText size={13} weight="Bold" color={colors.PINKISH_GREY} style={{marginTop: 3 * k}}>
            {bot.addressData && bot.addressData.locationShort}
          </RText>
        </View>
      </View>
    </Card>
  )
}

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
  icon: {
    fontSize: 45,
    color: colors.PINK,
  },
})
