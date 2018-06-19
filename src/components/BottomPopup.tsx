import React from 'react'
import {
  View,
  Animated,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
  TouchableWithoutFeedback,
} from 'react-native'

import {width, height} from './Global'

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
      <View style={styles.container}>
        <TouchableOpacity style={{flex: 1}} onPress={this.props.onClose} />
        <Animated.View
          style={[styles.modal, styles.flexCenter, {transform: [{translateY: this.state.offset}]}]}
        >
          <Image style={styles.container} source={require('../../images/bottomPopup.png')} />
          <View style={styles.container}>
            <TouchableOpacity style={styles.close} onPress={this.closeModal}>
              <Image source={require('../../images/popupClose.png')} />
            </TouchableOpacity>
            <View style={{flex: 1}}>{this.props.children}</View>
          </View>
        </Animated.View>
      </View>
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
  flexCenter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: 'transparent',
    position: 'absolute',
    top: height - 394,
    right: 0,
    bottom: 0,
    left: 0,
  },
})
