import React from 'react'
import {StyleSheet, TouchableWithoutFeedback, View} from 'react-native'
import {k} from './Global'
import {observer} from 'mobx-react/native'
import {colors} from '../constants'

type Props = {
  // isDay: boolean,
  style?: any
  innerStyle?: any
  onPress?: any
  footer?: any
  children: any
}

const Card = observer((props: Props) => {
  const {style, children, onPress, footer, innerStyle, ...rest} = props
  const isDay = true
  const backgroundColor = isDay ? colors.backgroundColorCardDay : colors.backgroundColorCardNight
  const inner = (
    <View {...rest} style={[styles.container, style]}>
      <View style={[styles.inner, {backgroundColor}, innerStyle]}>
        {React.Children.map(
          children,
          child => (child && props ? React.cloneElement(child as any, rest) : child)
        )}
      </View>
      {footer}
    </View>
  )
  return onPress ? (
    <TouchableWithoutFeedback onPress={onPress}>{inner}</TouchableWithoutFeedback>
  ) : (
    inner
  )
})

export default Card

const styles = StyleSheet.create({
  container: {
    paddingRight: 15 * k,
    paddingLeft: 15 * k,
    paddingTop: 13 * k,
    paddingBottom: 10 * k,
  },
  inner: {
    borderColor: 'white',
    borderRadius: 2,
    shadowOffset: {height: 1, width: 0},
    shadowRadius: 2,
    shadowOpacity: 0.12,
  },
})
