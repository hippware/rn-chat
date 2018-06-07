// @flow

import React from 'react'
import {Animated, StyleSheet, PanResponder} from 'react-native'
import {observer, inject} from 'mobx-react/native'
import {autorun} from 'mobx'
import {k} from './Global'
import {RText} from './common'
import {colors} from '../constants'

type State = {
  top: any
  pan: any
}

@inject('notificationStore')
@observer
class NotificationBanner extends React.Component<any, State> {
  state: State
  _panResponder: any

  constructor(props) {
    super(props)
    this.state = {
      top: new Animated.Value(-100),
      pan: new Animated.ValueXY(),
    }

    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onStartShouldSetPanResponderCapture: () => true,
      // onMoveShouldSetResponderCapture: () => true,
      onMoveShouldSetPanResponderCapture: () => true,

      onPanResponderGrant: () => {
        this.state.pan.setValue({x: 0, y: 0})
      },

      onPanResponderMove: Animated.event([null, {dx: this.state.pan.x, dy: this.state.pan.y}]),

      onPanResponderRelease: () => {
        /**/
      },
    })
  }

  componentDidMount() {
    autorun(() => {
      const {notificationStore} = this.props
      if (notificationStore.current) {
        const {isOpening, isClosing} = notificationStore.current
        if (isOpening) {
          // console.log('& start top', this.state.top);
          Animated.timing(this.state.top, {toValue: 0, duration: 500}).start()
        } else if (isClosing) {
          Animated.timing(this.state.top, {toValue: -100, duration: 500}).start()
        }
      }
    })
  }

  render() {
    const {current} = this.props.notificationStore
    const {top} = this.state
    return current ? (
      <Animated.View
        pointerEvents="none"
        style={[styles.container, {top, backgroundColor: current.color}]}
        {...this._panResponder.panHandlers}
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
    // top: 0,
    justifyContent: 'center',
    backgroundColor: colors.PINK,
    right: 0,
    left: 0,
    paddingTop: 30 * k,
    paddingBottom: 10 * k,
    height: 64, // TODO: export a variable in RNRF that we can use here instead of hardcoding?
  },
})
