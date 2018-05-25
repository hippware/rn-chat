// @flow

import React from 'react'
import {StyleSheet} from 'react-native'
import ApslButton from 'apsl-react-native-button'
import {k} from './Global'
import {colors} from '../constants'

type Props = {
  style?: any
  buttonStyle?: any
  textStyle?: any
  disabledStyle?: any
  onPress?: any
  children?: any
}

export default (props: Props) => (
  <ApslButton
    {...props}
    style={[styles.style, styles.buttonStyle, props.style, props.buttonStyle]}
    onPress={props.onPress}
    disabledStyle={[styles.style, styles.disabledStyle, props.style, props.disabledStyle]}
    textStyle={[styles.textStyle, props.textStyle]}
  >
    {props.children}
  </ApslButton>
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
