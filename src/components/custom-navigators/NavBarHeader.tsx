import React, {ReactElement} from 'react'
import {View, Image, TouchableOpacity, StyleSheet} from 'react-native'
import {k} from '../Global'
import {Actions} from 'react-native-router-flux'
import {navBarStyle} from '../Router'
import {colors} from '../../constants'

export type NavConfig = {
  title?: ReactElement<any>
  back?: boolean
  backAction?: () => void
  right?: ReactElement<any>
  left?: ReactElement<any>
}

type Props = {
  config: NavConfig
}

const NavBarHeader = ({config: {title, back, backAction, right, left}}: Props) => {
  const {backButtonImage, navBarButtonColor} = navBarStyle
  return (
    <View style={styles.header}>
      <View style={{width: 23}}>
        {back ? (
          <TouchableOpacity onPress={backAction || Actions.pop}>
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
    </View>
  )
}

export default NavBarHeader

const styles = StyleSheet.create({
  header: {
    height: 64,
    flex: 1,
    backgroundColor: 'white',
    elevation: 1,
    paddingTop: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 10,
    borderColor: colors.GREY,
    borderBottomWidth: 1,
  },
})
