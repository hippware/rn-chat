import React, {useEffect, useState} from 'react'
import {observer} from 'mobx-react'
import {StyleSheet, TouchableOpacity, View} from 'react-native'
import {RText} from './common'
import {colors} from '../constants'
import Screen from './Screen'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import BackgroundGeolocation from 'react-native-background-geolocation-android'

const BatteryOptimizationDebugScreen = observer(() => {
  const [isIgnoring, assignIsIgnoring] = useState(false)
  const [IBORequest, assignIBORequest] = useState({} as any)
  const [PMRequest, assignPMRequest] = useState({} as any)
  const deviceSettings = BackgroundGeolocation.deviceSettings

  useEffect(() => {
    deviceSettings.isIgnoringBatteryOptimizations().then(value => {
      assignIsIgnoring(value)
    })

    deviceSettings
      .showIgnoreBatteryOptimizations()
      .then(request => {
        assignIBORequest(request)
      })
      .catch(error => {
        assignIBORequest({error})
      })

    deviceSettings
      .showPowerManager()
      .then(request => {
        assignPMRequest(request)
      })
      .catch(error => {
        assignPMRequest({error})
      })
  }, [])

  return (
    <Screen style={{flex: 1, paddingVertical: 10, paddingHorizontal: 20}}>
      <KeyboardAwareScrollView>
        <View
          style={{
            borderBottomWidth: 1,
            borderColor: colors.DARK_GREY,
            paddingBottom: 20,
            marginBottom: 20,
          }}
        >
          <RText size={16} style={{}}>
            {`isIgnoringBatteryOptimizations: ${isIgnoring}`}
          </RText>
        </View>

        <View
          style={{
            borderBottomWidth: 1,
            borderColor: colors.DARK_GREY,
            paddingBottom: 20,
            marginBottom: 20,
          }}
        >
          <RText size={20} style={{marginBottom: 20}}>
            Ignore Battery Optimizations Screen
          </RText>
          <RText
            size={12}
            style={{marginBottom: 20, padding: 10, borderWidth: 1, backgroundColor: colors.GREY}}
          >
            {JSON.stringify(IBORequest, null, 2)}
          </RText>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              if (IBORequest.action) {
                deviceSettings.show(IBORequest)
              }
            }}
          >
            <RText size={16} color={colors.WHITE}>
              Show
            </RText>
          </TouchableOpacity>
        </View>

        <View
          style={{
            borderBottomWidth: 1,
            borderColor: colors.DARK_GREY,
            paddingBottom: 20,
            marginBottom: 20,
          }}
        >
          <RText size={20} style={{marginBottom: 20}}>
            Power Manager Screen
          </RText>
          <RText
            size={12}
            style={{marginBottom: 20, padding: 10, borderWidth: 1, backgroundColor: colors.GREY}}
          >
            {JSON.stringify(PMRequest, null, 2)}
          </RText>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              if (PMRequest.action) {
                deviceSettings.show(PMRequest)
              }
            }}
          >
            <RText size={16} color={colors.WHITE}>
              Show
            </RText>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </Screen>
  )
})

export default BatteryOptimizationDebugScreen

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.PINK,
    padding: 5,
    borderRadius: 2,
    marginHorizontal: 20,
    alignItems: 'center',
  },
})
