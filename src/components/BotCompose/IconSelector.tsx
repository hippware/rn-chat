import React from 'react'
import {View, StyleSheet, Text, ViewStyle} from 'react-native'
import {colors} from '../../constants'
import {width} from '../Global'
import Carousel from 'react-native-snap-carousel'
import {Observer, observer, inject} from 'mobx-react/native'
import {IBot} from 'wocky-client'
import IconStore from '../../store/IconStore'

const itemSize = 63
type Props = {
  style?: ViewStyle
  bot: IBot
  iconStore?: IconStore
  onSnap?: any
}

@inject('iconStore')
@observer
class IconSelector extends React.Component<Props> {
  selector?: any

  onSnap = (index: number) => {
    const {bot, iconStore, onSnap} = this.props
    if (onSnap) {
      onSnap(index)
    }
    iconStore.setIndex(index)
    bot.load({icon: iconStore.icon})
  }

  render() {
    return (
      <View style={this.props.style}>
        <Carousel
          ref={r => (this.selector = r)}
          data={this.props.iconStore.iconList.slice()}
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
                this.props.iconStore.index === index && styles.selectedIcon,
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
