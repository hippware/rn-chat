import React from 'react'
import {StyleSheet, View, TouchableWithoutFeedback, ViewStyle} from 'react-native'

type Props = {
  onPress?: any
  children: any
  style?: ViewStyle
}

// translucent black background
const ModalContainer = ({children, onPress, style}: Props) => (
  <TouchableWithoutFeedback onPress={onPress}>
    <View style={[styles.container, style]}>{children}</View>
  </TouchableWithoutFeedback>
)

export default ModalContainer

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0,0,0,0.3)',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: '6%',
    shadowColor: 'rgba(104, 104, 104, 0.2)',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowRadius: 15,
    shadowOpacity: 1,
  },
})
