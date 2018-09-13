import React from 'react'
import {View, StyleSheet, Text} from 'react-native'
import {colors} from '../../constants'
import {width} from '../Global'
import Carousel from 'react-native-snap-carousel'
import {Observer, observer, inject} from 'mobx-react/native'
import IconStore from '../../store/IconStore'

const itemSize = 63
type Props = {
  iconStore?: IconStore
  onSnap?: any
}

@inject('iconStore')
@observer
class IconSelector extends React.Component<Props> {
  selector?: any

  render() {
    const {iconStore} = this.props
    return (
      <View>
        <Carousel
          ref={r => (this.selector = r)}
          data={iconStore.iconList.slice()}
          renderItem={this.renderIcon}
          sliderWidth={width}
          itemWidth={itemSize}
          onBeforeSnapToItem={this.onSnap}
          inactiveSlideOpacity={1}
          firstItem={iconStore.index}
          enableMomentum
          decelerationRate={0.1}
        />
        <View
          style={{
            position: 'absolute',
            top: 2,
            bottom: 0,
            left: width / 2 - itemSize / 2 + 2,
            width: itemSize - 4,
            height: itemSize - 4,
            borderWidth: 2,
            borderColor: colors.PINK,
            borderRadius: 4.4,
          }}
        />
      </View>
    )
  }

  onSnap = (index: number) => {
    const {iconStore, onSnap} = this.props
    iconStore.setIndex(index)
    if (onSnap) {
      onSnap(index)
    }
  }

  renderIcon = ({item, index}) => {
    return (
      <Observer>
        {() => (
          <View style={[styles.iconWrapper]}>
            <View style={[styles.shadow, {backgroundColor: item ? 'white' : 'transparent'}]}>
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
  icon: {
    fontFamily: 'fontello',
    fontSize: 25,
    color: colors.PINK,
  },
})
