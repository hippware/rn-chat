import React from 'react'
import {Animated, StyleSheet, View, TouchableOpacity, Image} from 'react-native'
import {width, k, minHeight, s} from '../Global'
import Carousel from 'react-native-snap-carousel'
import BotCard from '../home-cards/BotCard'
import TutorialCard from '../home-cards/TutorialCard'
import YouCard from '../home-cards/YouCard'
import {observer, inject} from 'mobx-react'
import {Actions} from 'react-native-router-flux'
import {colors} from '../../constants'
import LocationSharerCard from '../home-cards/LocationSharerCard'
import {Card, IHomeStore} from '../../store/HomeStore'

type Props = {
  enabled: boolean
  setIndex: any
  list: Card[]
  index: number
  homeStore?: IHomeStore
}

type State = {
  translateY: Animated.Value
}

const cardMap = {
  BotCard,
  YouCard,
  TutorialCard,
  LocationSharerCard,
}

const create = require('../../../images/create.png')
const currentLocation = require('../../../images/currentLocationButton.png')
const notificationsButton = require('../../../images/notificationsButton.png')
const height = 115 * ((minHeight - 1) * 0.4 + 1)
const marginBottom = 14 * s
const totalHeight = height + marginBottom
const buttonPadding = 10

@inject('homeStore')
@observer
export default class HorizontalCardList extends React.Component<Props, State> {
  state = {
    translateY: new Animated.Value(0),
  }

  list: any

  UNSAFE_componentWillReceiveProps(newProps) {
    if (newProps.enabled !== this.props.enabled) {
      Animated.spring(this.state.translateY, {
        toValue: newProps.enabled ? 0 : totalHeight - buttonPadding,
      }).start()
    }

    if (newProps.index !== this.props.index && newProps.index !== this.list.currentIndex) {
      this.list.snapToItem(newProps.index, true, false)
    }
  }

  render() {
    const {list, setIndex, index, enabled, homeStore} = this.props
    const {mapType} = homeStore!
    const {translateY} = this.state
    return (
      <Animated.View
        style={{alignSelf: 'flex-end', transform: [{translateY}]}}
        pointerEvents="box-none"
      >
        <ButtonColumn />
        <View
          style={[
            styles.carouselContainer,
            {
              shadowColor: mapType === 'hybrid' ? '#333' : colors.GREY,
            },
          ]}
        >
          <Carousel
            key={`carousel${enabled}`}
            ref={r => (this.list = r)}
            data={list}
            renderItem={this.renderItem}
            firstItem={index}
            sliderWidth={width}
            itemWidth={width - 50 * k}
            onSnapToItem={setIndex}
            inactiveSlideOpacity={1}
            initialNumToRender={list.length} // TODO: potential performance bottleneck with many bots
            // contentContainerCustomStyle={{elevation: 3}}
          />
        </View>
      </Animated.View>
    )
  }

  renderItem = ({item, index}: {item: Card; index: number}) => {
    const RenderClass = cardMap[item.name]
    return <RenderClass {...item} />
  }
}

const ButtonColumn = inject('homeStore', 'navStore', 'locationStore', 'wocky')(
  observer(({homeStore, navStore, locationStore, wocky}) =>
    navStore.scene !== 'botCompose' ? (
      <View
        style={{
          alignSelf: 'flex-end',
          paddingRight: buttonPadding,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            homeStore.stopFollowingUserOnMap()
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
                {wocky.notifications.hasUnread && <View style={styles.newDot} />}
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
    ) : null
  )
)

const dotWidth = 13

const styles = StyleSheet.create({
  carouselContainer: {
    height,
    marginBottom,
    shadowOpacity: 1,
    shadowRadius: 8,
    shadowOffset: {height: 0, width: 0},
  },
  button: {
    marginTop: 15,
  },
  shadow: {
    shadowColor: colors.PINK,
    shadowRadius: 5 * k,
    shadowOpacity: 0.5,
    shadowOffset: {width: 0, height: 0},
    borderRadius: 8,
    backgroundColor: 'white',
    elevation: 3,
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
