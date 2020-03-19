import React, {useEffect, useState} from 'react'
import {observer} from 'mobx-react'
import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native'
import {RText} from './common'
import {colors} from '../constants'
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
    <ScrollView style={{flex: 1, paddingVertical: 10, paddingHorizontal: 20}}>
      <View style={styles.pane}>
        <RText size={16}>{`isIgnoringBatteryOptimizations: ${isIgnoring}`}</RText>
      </View>

      <View style={styles.pane}>
        <RText size={20} style={{marginBottom: 20}}>
          Ignore Battery Optimizations Screen
        </RText>
        <RText size={12} style={styles.code}>
          {JSON.stringify(IBORequest, null, 2)}
        </RText>
        {!!IBORequest.action && (
          <TouchableOpacity style={styles.button} onPress={() => deviceSettings.show(IBORequest)}>
            <RText size={16} color={colors.WHITE}>
              Show
            </RText>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.pane}>
        <RText size={20} style={{marginBottom: 20}}>
          Power Manager Screen
        </RText>
        <RText size={12} style={styles.code}>
          {JSON.stringify(PMRequest, null, 2)}
        </RText>
        {!!PMRequest.action && (
          <TouchableOpacity style={styles.button} onPress={() => deviceSettings.show(PMRequest)}>
            <RText size={16} color={colors.WHITE}>
              Show
            </RText>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  )
})

export default BatteryOptimizationDebugScreen

const styles = StyleSheet.create({
  pane: {
    borderBottomWidth: 1,
    borderColor: colors.DARK_GREY,
    paddingBottom: 20,
    marginBottom: 20,
  },
  code: {
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    backgroundColor: colors.GREY,
  },
  button: {
    backgroundColor: colors.PINK,
    padding: 5,
    borderRadius: 2,
    marginHorizontal: 20,
    alignItems: 'center',
  },
})
