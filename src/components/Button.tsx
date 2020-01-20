import React from 'react'
import {StyleSheet, TouchableOpacity} from 'react-native'
import {k} from './Global'
import RText from './common/RText'
import {colors} from '../constants'

type Props = {
  style?: any
  buttonStyle?: any
  textStyle?: any
  onPress?: any
  children?: any
}

export default (props: Props) => (
  <TouchableOpacity
    {...props}
    style={[styles.style, styles.buttonStyle, props.style, props.buttonStyle]}
    onPress={props.onPress}
  >
    <RText style={props.textStyle}>{props.children}</RText>
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  style: {
    position: 'absolute',
    bottom: 40 * k,
    left: 30 * k,
    right: 30 * k,
    height: 50 * k,
    borderWidth: 0,
    borderRadius: 2 * k,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonStyle: {backgroundColor: colors.PINK},
  disabledStyle: {backgroundColor: 'rgb(247,166,175)'},
  textStyle: {
    fontSize: 15 * k,
    fontFamily: 'Roboto-Regular',
    color: 'white',
    letterSpacing: 0.8,
  },
})
