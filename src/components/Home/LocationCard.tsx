import React from 'react'
import {View, StyleSheet, Image} from 'react-native'
import {IEventBot} from 'wocky-client'
import {RText} from '../common'
import {colors} from '../../constants'
import {k} from '../Global'
import {inject, observer} from 'mobx-react'
// import {width, k} from '../Global'

type Props = {
  item: IEventBot
}

@inject('homeStore')
@observer
export default class LocationCard extends React.Component<Props> {
  render() {
    const {bot} = this.props.item
    return (
      <View style={styles.card}>
        <Image
          style={styles.thumb}
          source={bot.image ? bot.image.thumbnail : null}
          resizeMode="cover"
        />
        <View style={styles.textContainer}>
          <RText size={17} weight="Bold" numberOfLines={1}>
            {bot.title}
          </RText>
          <RText size={13} weight="Bold" color={colors.PINKISH_GREY}>
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
    marginVertical: 5 * k,
    shadowColor: colors.GREY,
    shadowOpacity: 1,
    shadowRadius: 3,
    shadowOffset: {height: 0, width: 0},
  },
  thumb: {
    flex: 1,
    height: undefined,
    width: undefined,
  },
  textContainer: {
    flex: 2,
    padding: 18 * k,
    justifyContent: 'center',
  },
})
