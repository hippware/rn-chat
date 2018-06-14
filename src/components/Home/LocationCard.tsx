import React from 'react'
import {View, StyleSheet, Image} from 'react-native'
import {IEventBot} from 'wocky-client'
import {RText, Avatar} from '../common'
import {colors} from '../../constants'
import {k} from '../Global'
import {inject, observer} from 'mobx-react'
import {IHomeStore} from '../../store/HomeStore'

type Props = {
  item: IEventBot
  index: number
  homeStore?: IHomeStore
}

@inject('homeStore')
@observer
export default class LocationCard extends React.Component<Props> {
  render() {
    const {item, index, homeStore} = this.props
    const {bot} = item
    return (
      <View style={styles.card}>
        {homeStore.scrollIndex === index && (
          <Avatar profile={bot.owner} size={40} style={styles.avatar} hideDot />
        )}
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
    )
  }
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    flex: 1,
    flexDirection: 'row',
    marginTop: 20 * k,
    shadowColor: colors.GREY,
    shadowOpacity: 1,
    shadowRadius: 3,
    shadowOffset: {height: 0, width: 0},
  },
  thumb: {
    flex: 1,
    height: undefined,
    width: undefined,
    zIndex: -1,
  },
  textContainer: {
    flex: 2,
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
