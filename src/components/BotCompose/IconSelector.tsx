import React from 'react'
import {View, StyleSheet, Text, ViewStyle} from 'react-native'
import {colors} from '../../constants'
import {width} from '../Global'
import Carousel from 'react-native-snap-carousel'
import {Observer, inject} from 'mobx-react/native'
import {observable, action} from 'mobx'
import {IHomeStore} from '../../store/HomeStore'
import {IBot} from 'wocky-client'

const {drinks, trees, heart, silverware, store, plane} = require('../../constants/botIcons.json')
const icons = [undefined, silverware, drinks, trees, plane, store, heart]

const itemSize = 53

type Props = {
  homeStore?: IHomeStore
  style?: ViewStyle
  bot: IBot
}

@inject('homeStore')
class IconSelector extends React.Component<Props> {
  selector?: any
  @observable index?: number = 0

  @action
  onSnap = (index: number) => {
    this.index = index
    this.props.homeStore.setEditIcon(icons[index])
    this.props.bot.load({icon: icons[index]})
  }

  render() {
    return (
      <View style={this.props.style}>
        <Carousel
          ref={r => (this.selector = r)}
          data={icons}
          renderItem={this.renderIcon}
          sliderWidth={width}
          itemWidth={itemSize}
          onBeforeSnapToItem={this.onSnap}
          inactiveSlideOpacity={1}
        />
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
