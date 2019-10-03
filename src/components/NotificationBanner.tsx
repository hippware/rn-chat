import React, {useState, useEffect} from 'react'
import {Animated, StyleSheet} from 'react-native'
import {inject} from 'mobx-react'
import {autorun} from 'mobx'
import {k} from './Global'
import {RText} from './common'
import {colors} from '../constants'
import NotificationStore from 'src/store/NotificationStore'
import {observer} from 'mobx-react'

const height = 100
const duration = 500

type Props = {notificationStore?: NotificationStore}

const NotificationBanner = inject('notificationStore')(
  observer(({notificationStore}: Props) => {
    const [y] = useState(new Animated.Value(0))

    useEffect(() => {
      autorun(() => {
        if (notificationStore!.current) {
          const {isOpening, isClosing} = notificationStore!.current
          if (isOpening) {
            Animated.timing(y, {
              toValue: height,
              duration,
              useNativeDriver: true,
            }).start()
          } else if (isClosing) {
            Animated.timing(y, {
              toValue: 0,
              duration,
              useNativeDriver: true,
            }).start()
          }
        }
      })
    }, [])

    const {current} = notificationStore!

    return current ? (
      <Animated.View
        pointerEvents="none"
        style={[
          styles.container,
          {backgroundColor: current.color},
          {
            transform: [
              {
                translateY: y,
              },
            ],
          },
        ]}
      >
        <RText
          size={15}
          color={colors.addAlpha(colors.WHITE, 0.75)}
          style={{textAlign: 'center', letterSpacing: 0.6}}
        >
          {current.message}
        </RText>
      </Animated.View>
    ) : null
  })
)

export default NotificationBanner

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: -height,
    justifyContent: 'center',
    backgroundColor: colors.PINK,
    right: 0,
    left: 0,
    paddingTop: 30 * k,
    paddingBottom: 10 * k,
    height,
  },
})
