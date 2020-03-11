import React, {useState, useEffect} from 'react'
import {Animated, StyleSheet, View} from 'react-native'
import {inject} from 'mobx-react'
import {autorun} from 'mobx'
import {RText, Avatar} from './common'
import {colors} from '../constants'
import NotificationStore from 'src/store/NotificationStore'
import {observer} from 'mobx-react'
import Notification from '../store/Notification'

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

    return current ? <NotificationBannerInner current={current} y={y} /> : null
  })
)

export const NotificationBannerInner = ({
  current,
  y,
}: {
  current: Notification
  y: Animated.Value
}) => (
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
    {current.profile && (
      <View style={{paddingRight: 10}}>
        <Avatar profile={current.profile} size={40} hideDot borderWidth={2} borderColor="white" />
      </View>
    )}
    <RText
      size={15}
      color={colors.addAlpha(colors.WHITE, 0.75)}
      style={{textAlign: 'center', letterSpacing: 0.6}}
      weight="Medium"
    >
      {current.message}
    </RText>
  </Animated.View>
)

export default NotificationBanner

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: -height,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: colors.PINK,
    right: 0,
    left: 0,
    paddingTop: 42,
    height,
  },
})
