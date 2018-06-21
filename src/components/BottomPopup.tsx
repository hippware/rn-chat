import React from 'react'
import {View, Animated, Image, StyleSheet, TouchableOpacity} from 'react-native'

import {height, width} from './Global'

type Props = {
  onClose: () => void
  children: any
}

export default class BottomPopup extends React.Component<Props> {
  state = {offset: new Animated.Value(height)}
  componentDidMount() {
    Animated.timing(this.state.offset, {
      duration: 100,
      toValue: 0,
    }).start()
  }
  closeModal = () => {
    Animated.timing(this.state.offset, {
      duration: 100,
      toValue: height,
    }).start(this.props.onClose)
  }
  render() {
    return (
      <Animated.View style={[styles.modal, {transform: [{translateY: this.state.offset}]}]}>
        <Image style={styles.container} source={require('../../images/bottomPopup.png')} />
        <View style={styles.container}>
          <TouchableOpacity style={styles.close} onPress={this.closeModal}>
            <Image source={require('../../images/popupClose.png')} />
          </TouchableOpacity>
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
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -30,
    height: 394,
    width,
  },
})
