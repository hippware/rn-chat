import React from 'react'
import {View, TouchableOpacity} from 'react-native'
import {Actions} from 'react-native-router-flux'
import {colors} from '../constants'
import {observer, inject} from 'mobx-react/native'
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
