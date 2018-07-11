import React from 'react'
import Switch from './Switch'
import {colors} from '../constants'
import {observer, inject} from 'mobx-react/native'
import {IWocky} from 'wocky-client'
import {Actions} from 'react-native-router-flux'

type Props = {
  wocky?: IWocky
}

@inject('wocky')
@observer
export default class InvisibleSwitch extends React.Component<Props> {
  switch: any

  render() {
    const {profile} = this.props.wocky
    return (
      <Switch
        ref={r => (this.switch = r)}
        top={1}
        buttonRadius={8}
        buttonShadow={{
          shadowColor: '#000',
          shadowOpacity: 0,
          shadowRadius: 0,
          shadowOffset: {height: 0, width: 0},
        }}
        active={profile.hidden.enabled}
        inactiveBackgroundColor={colors.GREY}
        activeBackgroundColor={colors.PINK}
        toggleHeight={16}
        toggleWidth={16}
        switchHeight={25}
        switchWidth={42}
        swipeDisabled
        onPress={() => {
          if (!profile.hidden.enabled) {
            Actions.invisibleExpirationSelector()
          } else {
            profile.hide(false, null)
          }
        }}
        activeButtonColor="white"
        inactiveButtonColor="white"
        activeButtonPressedColor="white"
        inactiveButtonPressedColor="white"
      />
    )
  }
}
