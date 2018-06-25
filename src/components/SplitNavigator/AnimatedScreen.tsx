import React from 'react'
import {View, Animated, StyleSheet} from 'react-native'

type Props = {
  base: any
  show: boolean
  menu: any
  splitHeight: number
}

type State = {
  bottom: Animated.Value
}

class AnimatedScreen extends React.Component<Props, State> {
  state = {
    bottom: new Animated.Value(0),
  }

  componentWillReceiveProps({show}) {
    Animated.spring(this.state.bottom, {
      toValue: show ? -this.props.splitHeight : 0,
    }).start()
  }

  render() {
    const {base, menu, splitHeight, show} = this.props
    const theTransform = {transform: [{translateY: this.state.bottom}]}

    return (
      <View style={{flex: 1}}>
        <Animated.View style={[styles.absolute, {top: 0, bottom: 0}, theTransform]}>
          {base}
        </Animated.View>
        <Animated.View
          style={[
            styles.absolute,
            {
              bottom: -splitHeight,
              height: splitHeight + (show ? 30 : 0),
            },
            theTransform,
          ]}
        >
          {menu}
        </Animated.View>
      </View>
    )
  }
}

export default AnimatedScreen

const styles = StyleSheet.create({
  absolute: {
    position: 'absolute',
    right: 0,
    left: 0,
  },
})
