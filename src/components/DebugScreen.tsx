import React from 'react'
import {View, TouchableOpacity} from 'react-native'
import {Actions} from 'react-native-router-flux'
import {colors} from '../constants'
import {observer, inject} from 'mobx-react'
import {RText} from './common'
import codePush from 'react-native-code-push'
import {IStore} from '../store/store'

const DebugScreen = inject('store')(
  observer(({store}: {store: IStore}) => (
    <View style={{flex: 1, padding: 40}}>
      <ScreenLink onPress={Actions.codePush}>GO TO CODEPUSH</ScreenLink>
      <ScreenLink onPress={Actions.locationDebug}>GO TO LOCATION DEBUG</ScreenLink>
      <ScreenLink onPress={Actions.batteryOptimizationDebug}>BATTERY OPTIMIZATION DEBUG</ScreenLink>
      <ScreenLink
        onPress={async () => {
          // reset nav to 'reload' screen while resetting cache (prevent errors from screens/components listening to MST observables)
          Actions.reset('reload')
          await store.resetCache()
          codePush.restartApp()
        }}
      >
        RESET CACHE
      </ScreenLink>
      {/* <ScreenLink
        onPress={async () => {
          await wocky!.triggerSilentPush('2575d406-18ec-11e8-8e4b-0a580a020223') // @333
        }}
      >
        SEND SILENT LOCATION UPDATE NOTIFICATION to @333
      </ScreenLink> */}
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
