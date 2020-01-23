import React from 'react'
import {StyleSheet, View, TouchableWithoutFeedback, ViewStyle} from 'react-native'

type Props = {
  onPress?: any
  children: any
  style?: ViewStyle
  innerStyle?: ViewStyle
}

// translucent black background
const ModalContainer = ({children, onPress, style, innerStyle}: Props) => (
  <View style={[styles.container, style]}>
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={[styles.container, style]} />
    </TouchableWithoutFeedback>
    <View style={[styles.inner, innerStyle]}>{children}</View>
  </View>
)

export default ModalContainer

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0,0,0,0.3)',
    ...StyleSheet.absoluteFillObject,
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
  inner: {
    width: '80%',
    backgroundColor: 'white',
    overflow: 'hidden',
  },
})
