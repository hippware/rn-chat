import React, {ReactElement, useEffect, useState} from 'react'
import {View, Image, TouchableOpacity, StyleSheet, Animated, Keyboard} from 'react-native'
import {k, minHeight} from '../Global'
import {Actions} from 'react-native-router-flux'
import {colors} from '../../constants'
import {navBarStyle} from '../styles'
import {inject} from 'mobx-react'
import {height} from '../Global'

export type NavConfig = {
  title?: ReactElement<any>
  back?: boolean
  backAction?: () => void
  right?: ReactElement<any>
  left?: ReactElement<any>
}

type Props = {
  config: NavConfig
  scrollY?: Animated.Value
}

export const FADE_NAV_BAR_HEADER_HEIGHT = 64 * minHeight

const NavBarHeader = inject('scrollY')(({config, scrollY}: Props) => {
  if (!config) {
    return null
  }
  const {title, back, backAction, right, left} = config
  const {backButtonImage, navBarButtonColor} = navBarStyle

  const [keyboardHeight, setKeyboardHeight] = useState(0)

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', ({endCoordinates}) =>
      setKeyboardHeight(endCoordinates.height)
    )
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () =>
      setKeyboardHeight(0)
    )

    return function cleanup() {
      keyboardDidShowListener.remove()
      keyboardDidHideListener.remove()
    }
  }, [])

  // todo: need a better way to calculate the height of the popup screen. Maybe a global constant calculated once based on screen height
  const listHeight = height / 2 + keyboardHeight

  const opacity = scrollY!.interpolate({
    inputRange: [-1000, height - listHeight - 160, height - listHeight - 40],
    outputRange: [0, 0, 1],
  })

  return (
    <Animated.View style={[{opacity, position: 'none'}, styles.header]}>
      <View style={{width: 23}}>
        {back ? (
          <TouchableOpacity onPress={() => (backAction ? backAction() : Actions.pop())}>
            <Image
              source={backButtonImage}
              style={{tintColor: navBarButtonColor, width: 13, height: 21, marginLeft: 10}}
            />
          </TouchableOpacity>
        ) : left ? (
          {left}
        ) : null}
      </View>

      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>{title}</View>

      <View style={{marginRight: 10 * k}}>{right}</View>
    </Animated.View>
  )
})

export default NavBarHeader

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    height: FADE_NAV_BAR_HEADER_HEIGHT,
    flex: 1,
    backgroundColor: 'white',
    elevation: 1,
    paddingTop: 20 * minHeight,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 10,
    borderColor: colors.GREY,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
})
