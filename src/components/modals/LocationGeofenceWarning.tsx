import React, {useEffect} from 'react'
import {View, StyleSheet, Image, TouchableOpacity, Linking} from 'react-native'
import {colors} from '../../constants'
import {k} from '../Global'
import {RText, Separator} from '../common'
import {Actions} from 'react-native-router-flux'
import {autorun} from 'mobx'
import ModalContainer from './ModalContainer'
import {useAnalytics, useLocationStore} from 'src/utils/injectors'
import {observer} from 'mobx-react'

const footprint = require('../../../images/footprint.png')

const LocationGeofenceWarning = observer(() => {
  const {track} = useAnalytics()
  const {alwaysOn} = useLocationStore()

  useEffect(() => {
    const disposer = autorun(() => {
      if (alwaysOn) {
        Actions.pop()
      }
    })
    return disposer
  }, [])

  const cancel = () => {
    track('location_overlay_cancel')
    Actions.pop()
  }

  return (
    <ModalContainer>
      <Image
        source={footprint}
        style={{width: 60, height: 60, marginVertical: 25 * k}}
        resizeMode="contain"
      />
      <RText style={styles.title} size={30} color="white">
        {'Allow Location\r\nAccess'}
      </RText>
      <Separator backgroundColor="white" style={{width: 200 * k}} />
      <RText style={styles.muted} color="white" size={14}>
        Please change your location settings to “always allow” to receive presence updates.
      </RText>
      <View style={{marginVertical: 25 * k, alignSelf: 'stretch', alignItems: 'stretch'}}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            Linking.openURL('app-settings:{1}')
            track('location_overlay_change_settings')
          }}
        >
          <RText color="white" size={17.5}>
            Always Allow
          </RText>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.buttonCancel]} onPress={cancel}>
          <RText color="white" size={17.5}>
            Cancel
          </RText>
        </TouchableOpacity>
      </View>
    </ModalContainer>
  )
})

export default LocationGeofenceWarning

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0,0,0,0.7)',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30 * k,
  },
  title: {
    marginVertical: 15 * k,
    lineHeight: 32 * k,
    textAlign: 'center',
  },
  muted: {
    marginTop: 10 * k,
    textAlign: 'center',
  },
  button: {
    height: 50 * k,
    borderWidth: 0,
    borderRadius: 5 * k,
    backgroundColor: colors.PINK,
    alignItems: 'center',
    margin: 10 * k,
    justifyContent: 'center',
  },
  buttonCancel: {
    backgroundColor: 'transparent',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'white',
  },
})
