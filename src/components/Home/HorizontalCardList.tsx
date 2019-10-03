import React, {useEffect, useState, useRef} from 'react'
import {Animated, StyleSheet, View, TouchableOpacity, Image} from 'react-native'
import {width, k, minHeight, s} from '../Global'
import Carousel from 'react-native-snap-carousel'
import BotCard from '../home-cards/BotCard'
import TutorialCard from '../home-cards/TutorialCard'
import YouCard from '../home-cards/YouCard'
import {inject} from 'mobx-react'
import {Actions} from 'react-native-router-flux'
import {colors} from '../../constants'
import LocationSharerCard from '../home-cards/LocationSharerCard'
import {Card, IHomeStore} from '../../store/HomeStore'
import {observer} from 'mobx-react'
import {useHomeStore} from 'src/utils/injectors'

type Props = {
  enabled: boolean
  setIndex: any
  list: Card[]
  index: number
  homeStore?: IHomeStore
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

const HorizontalCardList = observer(({enabled, setIndex, list, index}: Props) => {
  const [translateY] = useState(new Animated.Value(0))
  const cardList = useRef(null)
  const {mapType} = useHomeStore()

  useEffect(() => {
    Animated.spring(translateY, {
      toValue: enabled ? 0 : totalHeight - buttonPadding,
    }).start()
  }, [enabled])

  useEffect(() => {
    if (index !== (cardList.current! as any).currentIndex) {
      ;(cardList.current! as any).snapToItem(index, true, false)
    }
  }, [index])

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
          ref={cardList}
          data={list}
          renderItem={({item}: {item: Card}) => {
            const RenderClass = cardMap[item.name]
            return <RenderClass {...item} />
          }}
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
})

export default HorizontalCardList

const ButtonColumn = inject('homeStore', 'navStore', 'locationStore', 'wocky')(
  observer(({homeStore, navStore, locationStore, wocky}: any) =>
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
