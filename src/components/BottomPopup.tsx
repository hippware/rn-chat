import React from 'react'
import {View, Animated, Image, StyleSheet, TouchableOpacity} from 'react-native'

import {height} from './Global'

type Props = {
  onClose: () => void
  children: any
  animated?: boolean
}

export default class BottomPopup extends React.Component<Props> {
  static defaultProps = {
    animated: false,
  }
  state = {offset: new Animated.Value(height)}
  componentDidMount() {
    if (this.props.animated) {
      Animated.timing(this.state.offset, {
        duration: 250,
        toValue: 0,
      }).start()
    }
  }
  closeModal = () => {
    if (this.props.animated) {
      Animated.timing(this.state.offset, {
        duration: 250,
        toValue: height,
      }).start(this.props.onClose)
    } else {
      this.props.onClose()
    }
  }
  render() {
    return (
      <Animated.View
        style={[
          styles.modal,
          this.props.animated && {transform: [{translateY: this.state.offset}]},
        ]}
      >
        <Image style={styles.container} source={require('../../images/bottomPopup.png')} />
        <View style={styles.container}>
          <TouchableOpacity style={styles.close} onPress={this.closeModal}>
            <Image source={require('../../images/popupClose.png')} />
          </TouchableOpacity>x
          <View style={{flex: 1}}>{this.props.children}</View>
        </View>
      </Animated.View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
  close: {
    width: 375,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  modal: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    height: 394,
  },
})
