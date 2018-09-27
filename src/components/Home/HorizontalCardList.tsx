import React from 'react'
import {Animated, StyleSheet, View, TouchableOpacity, Image} from 'react-native'
import {width, k} from '../Global'
import Carousel from 'react-native-snap-carousel'
import BotCard from '../home-cards/BotCard'
import TutorialCard from '../home-cards/TutorialCard'
import YouCard from '../home-cards/YouCard'
import {observer, inject, Observer} from 'mobx-react/native'
import {ICard} from '../../store/HomeStore'
import {getType, isAlive} from 'mobx-state-tree'
import {Actions} from 'react-native-router-flux'
import {colors} from '../../constants'

type Props = {
  enabled: boolean
  setIndex: any
  list: any[]
  index: number
}

type State = {
  translateY: Animated.Value
}

const cardMap = {
  BotCard,
  YouCard,
  TutorialCard,
}

const translateYDefault = -13 * k

const create = require('../../../images/create.png')
const currentLocation = require('../../../images/currentLocationButton.png')
const notificationsButton = require('../../../images/notificationsButton.png')

export default class HorizontalCardList extends React.Component<Props, State> {
  state = {
    translateY: new Animated.Value(translateYDefault),
  }

  list: any

  componentWillReceiveProps(newProps) {
    if (newProps.enabled !== this.props.enabled) {
      Animated.spring(this.state.translateY, {
        toValue: newProps.enabled ? translateYDefault : 160 * k,
      }).start()
    }

    if (newProps.index !== this.props.index && newProps.index !== this.list.currentIndex) {
      this.list.snapToItem(newProps.index, true, false)
    }
  }

  render() {
    const {list, setIndex, index, enabled} = this.props
    const {translateY} = this.state
    return (
      <Animated.View style={[styles.container, {transform: [{translateY}]}]}>
        <ButtonColumn />
        <Carousel
          key={`carousel${enabled}`}
          ref={r => (this.list = r)}
          data={list.filter(x => isAlive(x)).slice()} // avoid problems after bot delete
          renderItem={this.renderItem}
          firstItem={index}
          sliderWidth={width}
          itemWidth={width - 50 * k}
          onSnapToItem={setIndex}
          inactiveSlideOpacity={1}
          initialNumToRender={list.length} // TODO: potential performance bottleneck with many bots
        />
      </Animated.View>
    )
  }

  renderItem = ({item, index}: {item: ICard; index: number}) => {
    const RenderClass = cardMap[getType(item).name]
    return <Observer>{() => <RenderClass {...item} />}</Observer>
  }
}

const ButtonColumn = inject('homeStore', 'navStore', 'locationStore', 'wocky')(
  observer(
    ({homeStore, navStore, locationStore, wocky}) =>
      navStore.scene !== 'botCompose' && (
        <View
          style={{
            position: 'absolute',
            top: -150 * k, // TODO: make this styling more device-specific
            right: 10,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              if (locationStore.location) homeStore.setFocusedLocation(locationStore.location)
            }}
            style={[styles.button, styles.shadow]}
          >
            <Image source={currentLocation} />
          </TouchableOpacity>

          {!homeStore.fullScreenMode && (
            <View>
              <TouchableOpacity
                onPress={() => {
                  Actions.notifications()
                }}
                style={styles.button}
              >
                <View>
                  <Image source={notificationsButton} />
                  {wocky.hasUnreadNotifications && <View style={styles.newDot} />}
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  Actions.createBot()
                }}
                style={styles.button}
              >
                <Image source={create} />
              </TouchableOpacity>
            </View>
          )}
        </View>
      )
  )
)

const dotWidth = 13

const styles = StyleSheet.create({
  container: {
    alignSelf: 'flex-end',
    height: 115 * k,
  },
  button: {
    marginTop: 15 * k,
  },
  shadow: {
    shadowColor: colors.PINK,
    shadowRadius: 5 * k,
    shadowOpacity: 0.5,
    shadowOffset: {width: 0, height: 0},
  },
  newDot: {
    position: 'absolute',
    top: -5,
    right: -5,
    borderColor: 'white',
    borderWidth: 2,
    borderRadius: dotWidth / 2,
    width: 13,
    height: 13,
    backgroundColor: colors.GOLD,
  },
})
