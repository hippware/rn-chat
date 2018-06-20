import React from 'react'
import {View, Animated, Image, StyleSheet, TouchableOpacity} from 'react-native'
import {height} from './Global'
import {BOTTOM_MENU_HEIGHT, IHomeStore} from '../store/HomeStore'
import {inject, observer} from 'mobx-react'

type Props = {
  // onClose: () => void
  children: any
  show: boolean
  homeStore?: IHomeStore
}

@inject('homeStore')
@observer
export default class BottomPopup extends React.Component<Props> {
  state = {offset: new Animated.Value(height)}

  componentWillReceiveProps(newProps) {
    Animated.spring(this.state.offset, {
      toValue: newProps.show ? 0 : height,
      // overshootClamping: true,
    }).start()
  }

  render() {
    return (
      <Animated.View
        style={[styles.modal, styles.flexCenter, {transform: [{translateY: this.state.offset}]}]}
      >
        <TouchableOpacity style={{flex: 1}} onPress={this.props.homeStore.toggleBottomMenu} />
        <Image style={styles.absolute} source={require('../../images/bottomPopup.png')} />
        <View style={styles.absolute}>
          <TouchableOpacity style={styles.close} onPress={this.props.homeStore.toggleBottomMenu}>
            <Image source={require('../../images/popupClose.png')} />
          </TouchableOpacity>
          <View style={{flex: 1}}>{this.props.children}</View>
        </View>
      </Animated.View>
    )
  }
}

const styles = StyleSheet.create({
  absolute: {
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
    top: BOTTOM_MENU_HEIGHT,
    right: 0,
    bottom: 0,
    left: 0,
  },
})
