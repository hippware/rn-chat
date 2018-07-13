import React from 'react'
import {StyleSheet, View, ViewStyle, TouchableOpacity, Image} from 'react-native'
import {BlurView} from 'react-native-blur'
import {Actions} from 'react-native-router-flux'
import {k} from '../Global'

type Props = {
  containerStyle?: ViewStyle
  children: any
  showCloseButton?: boolean
}

const closeImg = require('../../../images/iconClose.png')

const PopupBlur = ({children, containerStyle, showCloseButton}: Props) => (
  <BlurView blurType="light" blurAmount={25} style={styles.absolute}>
    <View style={[styles.container, containerStyle]}>{children}</View>
    {showCloseButton && (
      <TouchableOpacity onPress={() => Actions.pop()} style={styles.closeButton}>
        <Image source={closeImg} />
      </TouchableOpacity>
    )}
  </BlurView>
)

export default PopupBlur

const styles = StyleSheet.create({
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  container: {
    backgroundColor: 'transparent',
    marginHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  closeButton: {
    position: 'absolute',
    top: 35 * k,
    left: 13 * k,
  },
})
