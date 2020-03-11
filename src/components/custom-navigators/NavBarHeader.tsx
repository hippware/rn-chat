import React, {ReactElement} from 'react'
import {View, Image, TouchableOpacity, StyleSheet, Animated} from 'react-native'
import {minHeight} from '../Global'
import {Actions} from 'react-native-router-flux'
import {colors} from '../../constants'
import {navBarStyle} from '../styles'

export const FULL_SCREEN_POS = 10

export type NavConfig = {
  title?: ReactElement<any>
  backAction?: () => void
}

type Props = {
  config: NavConfig
  scrollY?: Animated.Value | Animated.AnimatedInterpolation
  enabled: boolean
}

export const FADE_NAV_BAR_HEADER_HEIGHT = 64 * minHeight

const NavBarHeader = ({scrollY, config, enabled}: Props) => {
  const {backAction, title} = config
  const {backButtonImage, navBarButtonColor} = navBarStyle

  const opacity = scrollY!.interpolate({
    inputRange: [FADE_NAV_BAR_HEADER_HEIGHT + 50, FADE_NAV_BAR_HEADER_HEIGHT + 51],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  })

  // todo: add logic to ignore pointerEvents until the view has opacity > 0
  return (
    <Animated.View style={[{opacity}, styles.header]} pointerEvents={enabled ? 'auto' : 'none'}>
      <TouchableOpacity onPress={() => (backAction ? backAction() : Actions.pop())}>
        <Image
          source={backButtonImage}
          style={{tintColor: navBarButtonColor, width: 13, height: 21, marginLeft: 10}}
        />
      </TouchableOpacity>

      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>{title}</View>
    </Animated.View>
  )
}

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
