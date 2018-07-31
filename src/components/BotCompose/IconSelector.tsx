import React from 'react'
import {View, StyleSheet, Text, ViewStyle} from 'react-native'
import {colors} from '../../constants'
import {width} from '../Global'
import Carousel from 'react-native-snap-carousel'
import {Observer, observer, inject} from 'mobx-react/native'
import {observable, action} from 'mobx'
import {IHomeStore} from '../../store/HomeStore'
import {IBot} from 'wocky-client'
import EmojiSelector from 'react-native-emoji-selector'

const {
  drinks,
  trees,
  heart,
  silverware,
  store,
  plane,
  emoji,
} = require('../../constants/botIcons.json')

const itemSize = 53

type Props = {
  homeStore?: IHomeStore
  style?: ViewStyle
  bot: IBot
}

@inject('homeStore')
@observer
class IconSelector extends React.Component<Props> {
  @observable icons = [undefined, silverware, drinks, trees, plane, store, heart, emoji]
  selector?: any
  @observable index?: number = 0
  @observable emojiSelected = false

  @action
  setIcon = icon => {
    this.props.homeStore.setEditIcon(icon)
    this.props.bot.load({icon})
  }

  @action
  onSnap = (index: number) => {
    this.index = index
    this.emojiSelected = index === this.icons.length - 1
    this.setIcon(this.icons[this.index])
  }

  @action
  onEmojiSelected = emoji => {
    this.icons[this.index] = emoji
    this.setIcon(this.icons[this.index])
    this.emojiSelected = false
  }
  render() {
    return (
      <View style={this.props.style}>
        <Carousel
          ref={r => (this.selector = r)}
          data={this.icons.slice()}
          renderItem={this.renderIcon}
          sliderWidth={width}
          itemWidth={itemSize}
          onBeforeSnapToItem={this.onSnap}
          inactiveSlideOpacity={1}
        />
        {this.emojiSelected && (
          <EmojiSelector onEmojiSelected={this.onEmojiSelected} showSearchBar={false} columns={8} />
        )}
      </View>
    )
  }

  renderIcon = ({item, index}) => {
    return (
      <Observer>
        {() => (
          <View style={[styles.iconWrapper]}>
            <View
              style={[
                styles.shadow,
                {backgroundColor: item ? 'white' : 'transparent'},
                this.index === index && styles.selectedIcon,
              ]}
            >
              {item && <Text style={styles.icon}>{item}</Text>}
            </View>
          </View>
        )}
      </Observer>
    )
  }

  keyExtractor = item => item
}

export default IconSelector

const styles = StyleSheet.create({
  iconWrapper: {
    height: itemSize,
    width: itemSize,
    padding: 3,
  },
  shadow: {
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset: {height: 0, width: 0},
    shadowRadius: 4,
    shadowOpacity: 0.18,
    shadowColor: colors.PINK,
    borderRadius: 4.4,
    flex: 1,
  },
  selectedIcon: {
    shadowOffset: undefined,
    shadowRadius: 0,
    shadowOpacity: 0,
    borderWidth: 2,
    borderColor: colors.PINK,
  },
  icon: {
    fontFamily: 'fontello',
    fontSize: 25,
    color: colors.PINK,
  },
})
