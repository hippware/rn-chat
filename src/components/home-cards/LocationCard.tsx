import React from 'react'
import {View, StyleSheet, Image} from 'react-native'
import {IEventBot, IBot} from 'wocky-client'
import {RText} from '../common'
import {colors} from '../../constants'
import {k} from '../Global'
import {inject, observer} from 'mobx-react'
import {IHomeStore} from '../../store/HomeStore'
import Card from './Card'
import {getType} from 'mobx-state-tree'

type Props = {
  item: IEventBot | IBot
  index: number
  homeStore?: IHomeStore
}

@inject('homeStore')
@observer
export default class LocationCard extends React.Component<Props> {
  render() {
    const {item, index, homeStore} = this.props
    let bot
    const t = getType(item)
    if (t && t.name === 'Bot') bot = item
    else bot = (item as IEventBot).bot
    return (
      <Card profile={homeStore.scrollIndex === index && bot.owner}>
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
      </Card>
    )
  }
}

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
