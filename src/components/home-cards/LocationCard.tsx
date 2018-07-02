import React from 'react'
import {View, StyleSheet, Image, TouchableWithoutFeedback} from 'react-native'
import {IBot} from 'wocky-client'
import {RText} from '../common'
import {colors} from '../../constants'
import {k} from '../Global'
import {observer} from 'mobx-react'
import Card from './Card'
import {Actions} from 'react-native-router-flux'

type Props = {
  item: IBot
  index: number
  scrollIndex: number
}

@observer
export default class LocationCard extends React.Component<Props> {
  render() {
    const {item, index, scrollIndex} = this.props
    const bot = item
    return (
      <Card profile={scrollIndex === index && bot.owner}>
        <TouchableWithoutFeedback onPress={() => Actions.locationDetails({botId: bot.id})}>
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
        </TouchableWithoutFeedback>
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
