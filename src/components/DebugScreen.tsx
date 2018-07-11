import React from 'react'
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacityProps,
  Switch,
  TouchableOpacity,
} from 'react-native'
import BottomPopup from './BottomPopup'
import {Actions} from 'react-native-router-flux'
import {isAlive} from 'mobx-state-tree'
import {colors} from '../constants'
import {observer, inject} from 'mobx-react/native'
import Avatar from './common/Avatar'
import {k} from './Global'
import {IWocky} from 'wocky-client'
import {settings} from '../globals'
import {RText} from './common'

const DebugScreen = inject('store')(
  observer(({store}) => (
    <View style={{flex: 1, padding: 40}}>
      <ScreenLink onPress={Actions.locationDebug}>GO TO LOCATION DEBUG</ScreenLink>
      <ScreenLink
        onPress={async () => {
          // reset nav to 'reload' screen while resetting cache (prevent errors from screens/components listening to MST observables)
          Actions.reset('reload')
          await store.resetCache()
          Actions.reset('root')
        }}
      >
        RESET CACHE
      </ScreenLink>
    </View>
  ))
)

const ScreenLink = ({onPress, children}) => (
  <TouchableOpacity
    onPress={onPress}
    style={{
      marginBottom: 20,
      borderColor: colors.PINK,
      borderWidth: 2,
      borderRadius: 5,
      padding: 10,
    }}
  >
    <RText color={colors.PINK} size={18}>
      {children}
    </RText>
  </TouchableOpacity>
)

export default DebugScreen

const styles = StyleSheet.create({
  text: {
    flex: 1,
    color: colors.DARK_PURPLE,
    fontFamily: 'Roboto-Regular',
    fontSize: 18,
  },
  menuItem: {
    height: 50 * k,
    marginHorizontal: 50 * k,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuImageContainer: {width: 50 * k},
  menuImage: {width: 28, height: 23},
  viewAccount: {
    color: colors.addAlpha(colors.WHITE, 0.57),
    fontFamily: 'Roboto-Regular',
    fontSize: 12,
  },
  displayName: {
    padding: 10,
    color: colors.PINK,
    fontFamily: 'Roboto-Bold',
    fontSize: 16,
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    height: undefined,
    // width: undefined,
  },
})
