import React from 'react'
import {Animated, StyleSheet} from 'react-native'
import {observer, inject} from 'mobx-react'
import {autorun} from 'mobx'
import {k} from './Global'
import {RText} from './common'
import {colors} from '../constants'

type State = {
  y: any
}

const height = 100
const duration = 500

@inject('notificationStore')
@observer
class NotificationBanner extends React.Component<any, State> {
  state: State = {
    y: new Animated.Value(0),
  }

  componentDidMount() {
    autorun(() => {
      const {notificationStore} = this.props
      if (notificationStore.current) {
        const {isOpening, isClosing} = notificationStore.current
        if (isOpening) {
          Animated.timing(this.state.y, {
            toValue: height,
            duration,
            useNativeDriver: true,
          }).start()
        } else if (isClosing) {
          Animated.timing(this.state.y, {
            toValue: 0,
            duration,
            useNativeDriver: true,
          }).start()
        }
      }
    })
  }

  render() {
    const {current} = this.props.notificationStore
    return current ? (
      <Animated.View
        pointerEvents="none"
        style={[
          styles.container,
          {backgroundColor: current.color},
          {
            transform: [
              {
                translateY: this.state.y,
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
  }
}

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
