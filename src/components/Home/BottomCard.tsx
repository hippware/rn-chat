import React, {useEffect, useState} from 'react'
import {Animated, StyleSheet, View, TouchableOpacity, Image} from 'react-native'
import {k, minHeight, s} from '../Global'
import {inject} from 'mobx-react'
import {Actions} from 'react-native-router-flux'
import {colors} from '../../constants'
import {Card, IHomeStore} from '../../store/HomeStore'
import {observer} from 'mobx-react'

type Props = {
  enabled: boolean
  setIndex: any
  list: Card[]
  index: number
  homeStore?: IHomeStore
}

const create = require('../../../images/create.png')
const mapOptionsButton = require('../../../images/mapOptions.png')
const height = 115 * ((minHeight - 1) * 0.4 + 1)
const marginBottom = 14 * s
const totalHeight = height + marginBottom
const buttonPadding = 10

const HorizontalCardList = observer(({enabled}: Props) => {
  const [translateY] = useState(new Animated.Value(0))

  useEffect(() => {
    Animated.spring(translateY, {
      toValue: enabled ? 0 : totalHeight - buttonPadding,
    }).start()
  }, [enabled])

  return (
    <Animated.View
      style={{alignSelf: 'flex-end', transform: [{translateY}]}}
      pointerEvents="box-none"
    >
      <ButtonColumn />
    </Animated.View>
  )
})

export default HorizontalCardList

const ButtonColumn = inject('homeStore', 'navStore')(
  observer(({homeStore, navStore}: any) =>
    navStore.scene !== 'botCompose' ? (
      <View
        style={{
          alignSelf: 'flex-end',
          paddingRight: buttonPadding,
        }}
      >
        {!homeStore.fullScreenMode && (
          <View>
            <TouchableOpacity onPress={Actions.mapOptions} style={styles.button}>
              <View>
                <Image source={mapOptionsButton} />
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
